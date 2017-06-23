/*! Image Map Resizer
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014-15 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

(function(){
    'use strict';

    function scaleImageMap(){

        function get_image() {
            var imageList = document.querySelectorAll('img[usemap="#'+map.name+'"]');
            var count = imageList.length;
            for (var i = 0; i < count; i++){
                var cImage = imageList[i].offsetParent;
                if (typeof cImage != undefined && cImage) {
                    return imageList[i];
                }
            }
        }

        function resizeMap() {
            function resizeAreaTag(cachedAreaCoords,idx){
                function scale(coord){
                    var dimension = ( 1 === (isWidth = 1-isWidth) ? 'width' : 'height' );
                    return Math.floor(Number(coord) * scallingFactor[dimension]);
                }

                var isWidth = 0;

                areas[idx].coords = cachedAreaCoords.split(',').map(scale).join(',');
            }

            var scallingFactor = {
                width  : image.width  / image.naturalWidth,
                height : image.height / image.naturalHeight
            };

            cachedAreaCoordsArray.forEach(resizeAreaTag);
        }

        function getCoords(e){
            //Normalize coord-string to csv format without any space chars
            return e.coords.replace(/ *, */g,',').replace(/ +/g,',');
        }

        function debounce() {
            clearTimeout(timer);
            timer = setTimeout(resizeMap, 250);
        }

        function start(){
            if ((image.width !== image.naturalWidth) || (image.height !== image.naturalHeight)) {
                resizeMap();
            }
        }

        function addEventListeners(){
            image.addEventListener('load',  resizeMap, false); //Detect late image loads in IE11
            window.addEventListener('focus',  resizeMap, false); //Cope with window being resized whilst on another tab
            window.addEventListener('resize', debounce,  false);
            window.addEventListener('readystatechange', resizeMap,  false);
            document.addEventListener('fullscreenchange', resizeMap,  false);
        }

        function beenHere(){
            return ('function' === typeof map._resize);
        }

        function setup(){
            areas                 = map.getElementsByTagName('area');
            cachedAreaCoordsArray = Array.prototype.map.call(areas, getCoords);
            image                 = document.querySelector('img[usemap="#'+map.name+'"]');
            map._resize           = resizeMap; //Bind resize method to HTML map element
        }

        var
            /*jshint validthis:true */
            map   = this,
            areas = null, cachedAreaCoordsArray = null, image = null, timer = null;

        if (!beenHere()){
            setup();
            addEventListeners();
            start();
        } else {
            map._resize(); //Already setup, so just resize map
        }
    }



    function factory(){
        function chkMap(element){
            if(!element.tagName) {
                throw new TypeError('Object is not a valid DOM element');
            } else if ('MAP' !== element.tagName.toUpperCase()) {
                throw new TypeError('Expected <MAP> tag, found <'+element.tagName+'>.');
            }
        }

        function init(element){
            if (element){
                chkMap(element);
                scaleImageMap.call(element);
                maps.push(element);
            }
        }

        var maps;

        return function imageMapResizeF(target){
            maps = [];  // Only return maps from this call

            switch (typeof(target)){
                case 'undefined':
                case 'string':
                    Array.prototype.forEach.call(document.querySelectorAll(target||'map'),init);
                    break;
                case 'object':
                    init(target);
                    break;
                default:
                    throw new TypeError('Unexpected data type ('+typeof target+').');
            }

            return maps;
        };
    }


    if (typeof define === 'function' && define.amd) {
        define([],factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = factory(); //Node for browserfy
    } else {
        window.imageMapResize = factory();
    }


    if('jQuery' in window) {
        jQuery.fn.imageMapResize = function $imageMapResizeF(){
            return this.filter('map').each(scaleImageMap).end();
        };
    }

})();
