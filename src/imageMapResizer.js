/*! Image Map Resizer
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

(function(){
    'use strict';

    function scaleImageMap(map){
        function resizeMap() {
            function resizeAreaTag(cachedAreaCoords){
                function scaleCoord(e){
                    return e * scallingFactor[(1===(isWidth = 1-isWidth) ? 'width' : 'height')];
                }

                var isWidth = 0;

                return cachedAreaCoords.split(',').map(parseFloat).map(scaleCoord).map(Math.floor).join(',');
            }

            var scallingFactor = {
                width  : displayedImage.width  / sourceImage.width,
                height : displayedImage.height / sourceImage.height
            };

            for (var i=0; i < areasLen ; i++)
                areas[i].coords = resizeAreaTag(cachedAreaCoordsArray[i]);
        }

        function start(){
            sourceImage.onload = function sourceImageOnLoadF(){
                if ((displayedImage.width !== sourceImage.width) || (displayedImage.height !== sourceImage.height))
                    resizeMap();
            };
            sourceImage.src = displayedImage.src;
        }

        function listenForResize(){
            function debounce() {
                clearTimeout(timer);
                timer = setTimeout(resizeMap, 250);
            }
            if (window.addEventListener) window.addEventListener('resize', debounce, false);
            else if (window.attachEvent) window.attachEvent('onresize', debounce);
        }

        if('MAP' !== map.tagName) throw new TypeError('Expected <map> tag, found <'+map.tagName+'>.');

        var
            areas                 = map.getElementsByTagName('area'),
            areasLen              = areas.length,
            cachedAreaCoordsArray = Array.prototype.map.call(areas,function (e) { return e.coords; }),
            displayedImage        = document.querySelector('img[usemap="#'+map.name+'"]'),
            sourceImage           = new Image(),
            timer                 = null;
        
        start();
        listenForResize();
    }

    window.imageMapResize = function imageMapResizeF(selector){
        Array.prototype.forEach.call(document.querySelectorAll(selector||'map'),scaleImageMap);
    };

    if(window.jQuery)
        jQuery.fn.imageMapResize = function $imageMapResizeF(){
            return this.filter('map').each(function $imageMapResizeF2(){ scaleImageMap(this); });
        };

})();
