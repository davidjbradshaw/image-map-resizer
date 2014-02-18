/*! Image Map Resizer
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */


(function($){

    'use strict';

    $.fn.imageMapResize = function(options){

        return this.each(function(){
            function getCoords(){
                cachedAreaCoordArray = Array.prototype.map.call(areas,function (e) { 
                    return e.coords;
                });
            }

            function getSourceImageDimensionsAndThenResizeMap(){
                $mapImg.each(function(){
                    var
                        sourceImage = this,
                        testImage = new Image();

                    testImage.onload = function(){
                        sourceImageWidth  = testImage.width;
                        sourceImageHeight = testImage.height;
                        if ((sourceImage.width !== sourceImageWidth) || (sourceImage.height !== sourceImageHeight))
                            resizeMap();
                    };

                    testImage.src = sourceImage.src;
                });
            }

            function resizeMap() {

                function resizeAreaTag(cachedAreaCoords){

                    function toInt(i) { return parseInt(i,10); }

                    function processCoord(e){
                        return e * (1===(isWidth = 1-isWidth) ? scallingFactorWidth : scallingFactorHeight);
                    }

                    var isWidth = 0;

                    return cachedAreaCoords.split(',').map(toInt).map(processCoord).join(',');
                }

                var
                    scallingFactorWidth  = $mapImg.width()  / sourceImageWidth,
                    scallingFactorHeight = $mapImg.height() / sourceImageHeight;

                for (var i=0; i < areasLen ; i++)
                    areas[i].coords = resizeAreaTag(cachedAreaCoordArray[i]);
            }

            var
                map      = this,
                $mapImg  = $('img[usemap=#'+$(map).attr('name')+']'),
                areas    = map.getElementsByTagName('area'),
                areasLen = areas.length,
                cachedAreaCoordArray = [],
                sourceImageWidth,
                sourceImageHeight;
            
            getCoords();
            getSourceImageDimensionsAndThenResizeMap();
            
            $(window).on('resize', resizeMap);
        });
    };

})(window.jQuery);
