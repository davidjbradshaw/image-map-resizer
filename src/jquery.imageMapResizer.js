/*! Image Map Resizer
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */


(function($){

    'use strict';

    var defaults = {
        debug: false
    };

    $.fn.imageMapResize = function(options){
        var settings = $.extend( {}, defaults, options );

        return this.each(function(){
            function getCoords(){
                for (var i = 0; i < len; i++) {
                    coords[i] = areas[i].coords.split(',');
                }
            }

            function getSourceImageWidthAndThenResizeMap(){
                $mapImg.each(function(){
                    var
                        sourceImage = this,
                        testImage = new Image();

                    testImage.onload = function(){
                        imageWidth  = testImage.width;
                        imageHeight = testImage.height;
                        if ((sourceImage.width !== imageWidth) || (sourceImage.height !== imageHeight))
                            resizeMap();
                    };

                    testImage.src = sourceImage.src;
                });
            }

            function getCurrentImageWidth(){
                return $mapImg.width();
            }

            function getCurrentImageHeight(){
                return $mapImg.height();
            }

            function resizeMap() {
                var
                    i, j, clen,
                    newCoords = [],
                    sizeFactorWidth  = getCurrentImageWidth() / imageWidth,
                    sizeFactorHeight = getCurrentImageHeight() / imageHeight;

                for (i = 0; i < len; i++) {
                    clen = coords[i].length;
                    newCoords[i] = [];

                    for (j = 0; j < clen; j+=2) {
                        newCoords[i][j]   = parseInt(coords[i][j]   * sizeFactorWidth,  10);
                        newCoords[i][j+1] = parseInt(coords[i][j+1] * sizeFactorHeight, 10);
                    }

                    areas[i].coords = newCoords[i].join(',');
                    if (settings.debug) console.debug('['+areas[i].alt+'] '+ areas[i].coords);
                }
            }

            var
                map        = this,
                $mapImg    = $('img[usemap=#'+$(map).attr('name')+']'),
                areas      = map.getElementsByTagName('area'),
                len        = areas.length,
                coords     = [],
                imageWidth,
                imageHeight;
            
            getCoords();
            getSourceImageWidthAndThenResizeMap();
            
            $(window).on('resize', resizeMap);
        });
    };

})(window.jQuery);