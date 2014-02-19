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
                    return e * (1===(isWidth = 1-isWidth) ? scallingFactorWidth : scallingFactorHeight);
                }

                var isWidth = 0;

                return cachedAreaCoords.split(',').map(parseFloat).map(scaleCoord).join(',');
            }

            var
                scallingFactorWidth  = displayedImage.width  / sourceImageWidth,
                scallingFactorHeight = displayedImage.height / sourceImageHeight;

            for (var i=0; i < areasLen ; i++)
                areas[i].coords = resizeAreaTag(cachedAreaCoordsArray[i]);
        }

        if('MAP' !== map.tagName) throw new TypeError('Expected <map> tag, found <'+map.tagName+'>.');

        var
            areas                 = map.getElementsByTagName('area'),
            areasLen              = areas.length,
            cachedAreaCoordsArray = Array.prototype.map.call(areas,function (e) { return e.coords; }),
            displayedImage        = document.querySelector('img[usemap="#'+map.name+'"]'),
            testImage             = new Image(),
            sourceImageWidth,
            sourceImageHeight;
        
        testImage.onload = function(){
            sourceImageWidth  = testImage.width;
            sourceImageHeight = testImage.height;

            if ((displayedImage.width !== sourceImageWidth) || (displayedImage.height !== sourceImageHeight))
                resizeMap();
            
            if (window.addEventListener) window.addEventListener('resize', resizeMap, false);
            else if (window.attachEvent) window.attachEvent('onresize', resizeMap);
        };

        testImage.src = displayedImage.src;
    }

    window.imageMapResize = function(selector){
        Array.prototype.forEach.call(document.querySelectorAll(selector||'map'),scaleImageMap);
    };

    if(window.jQuery)
        jQuery.fn.imageMapResize = function(){
            return this.each(function(){ scaleImageMap(this); });
        };

})();
