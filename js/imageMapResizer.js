/*! Image Map Resizer
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014-15 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

(function(){
    'use strict';

    function scaleImageMap(){

        function resizeMap() {
            function resizeAreaTag(cachedAreaCoords){
                function scaleCoord(e){
                    return e * scallingFactor[(1===(isWidth = 1-isWidth) ? 'width' : 'height')];
                }

                var isWidth = 0;

                return cachedAreaCoords.split(',').map(Number).map(scaleCoord).map(Math.floor).join(',');
            }

            var scallingFactor = {
                width  : displayedImage.width  / sourceImage.width,
                height : displayedImage.height / sourceImage.height
            };

            for (var i=0; i < areasLen ; i++) {
                areas[i].coords = resizeAreaTag(cachedAreaCoordsArray[i]);
            }
        }

        function start(){
            var
                displayedWidth  = null,
                displayedHeight = null;

            //WebKit asyncs image loading, so we have to catch the load event.
            sourceImage.onload = function sourceImageOnLoadF(){
                displayedWidth = displayedImage.width;
                displayedHeight = displayedImage.height;

                if ((displayedWidth !== sourceImage.width) || (displayedHeight !== sourceImage.height)) {
                    resizeMap();
                }
            };

            //IE11 can late load this image, so make sure we have the correct sizes (#10)
            displayedImage.onload = function() {
                if (null !== displayedWidth && displayedImage.width !== displayedWidth) {
                    resizeMap();
                }
            };

            //Make copy of image, so we can get the actual size measurements
            sourceImage.src = displayedImage.src;
        }

        function listenForResize(){
            function debounce() {
                clearTimeout(timer);
                timer = setTimeout(resizeMap, 250);
            }
            if (window.removeEventListener) { window.removeEventListener('focus', debounce, false); }
            else if (window.detachEvent) { window.detachEvent('onfocus', debounce); }

            if (window.addEventListener) { window.addEventListener('resize', debounce, false); }
            else if (window.attachEvent) { window.attachEvent('onresize', debounce); }
        }

        function listenForFocus(){
            if (window.removeEventListener) { window.removeEventListener('focus', resizeMap, false); }
            else if (window.detachEvent) { window.detachEvent('onfocus', resizeMap); }

            if (window.addEventListener) { window.addEventListener('focus', resizeMap, false); }
            else if (window.attachEvent) { window.attachEvent('onfocus', resizeMap); }
        }

        function getCoords(e){
            // normalize coord-string to csv format without any space chars
            return e.coords.replace(/ *, */g,',').replace(/ +/g,',');
        }
        function isInt(n) {
          return n % 1 === 0;
        }

        var
            /*jshint validthis:true */
            map                   = this,
            areas                 = map.getElementsByTagName('area'),
            areasLen              = areas.length,
            cachedAreaCoordsArray = null,
            displayedImage        = document.querySelector('img[usemap="#'+map.name+'"]'),
            sourceImage           = new Image(),
            timer                 = null,
            coords                = '',
            test = 0;

        /* reset */
        for (var area in areas) {
          if(isInt(area)) {
            coords = areas[area].getAttribute('data-coords');
            if(coords !== null)
              areas[area].coords = coords;
            else areas[area].setAttribute('data-coords',areas[area].coords);
          }
        }

        cachedAreaCoordsArray = Array.prototype.map.call(areas, getCoords);

        start();
        listenForResize();
        listenForFocus();
    }



    function factory(){
        function init(element){
            if(!element.tagName) {
                throw new TypeError('Object is not a valid DOM element');
            } else if ('MAP' !== element.tagName.toUpperCase()) {
                throw new TypeError('Expected <MAP> tag, found <'+element.tagName+'>.');
            }

            scaleImageMap.call(element);
        }

        return function imageMapResizeF(target){
            switch (typeof(target)){
                case 'undefined':
                case 'string':
                    Array.prototype.forEach.call(document.querySelectorAll(target||'map'),init);
                    break;
                case 'object':
                    init(target);
                    break;
                default:
                    throw new TypeError('Unexpected data type ('+typeof(target)+').');
            }
        };
    }

    window.imageMapResize = null;
    if (typeof define === 'function' && define.amd) {
        define([],factory);
    } else if (typeof exports === 'object') { //Node for browserfy
        module.exports = factory();
    } else {
        window.imageMapResize = factory();
    }


    if('jQuery' in window) {
        jQuery.fn.imageMapResize = null;
        jQuery.fn.imageMapResize = function $imageMapResizeF(){
            return this.filter('map').each(scaleImageMap).end();
        };
    }

})();
