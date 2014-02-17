/*
 *  Scale html images maps to match scaled images.
 */

(function($){

    function setUpImageMaps(){
        function getCoords(){
            for (var i = 0; i < len; i++) {
                coords[i] = areas[i].coords.split(',');
            }
        }

        function getSourceImageWidthAndThenResizeMap(){
            var
                sourceImage = this,
                testImage = new Image();

            testImage.onload = function(){
                imageWidth = testImage.width;
                if (sourceImage.width !== imageWidth){
                    resizeMap();
                }
            };

            testImage.src = sourceImage.src;
        }

        function init(){
            getCoords();
            $mapImg.each(getSourceImageWidthAndThenResizeMap);
            $(window).on('resize', resizeMap);
        }

        function getCurrentImageWidth(){
            return $mapImg.width();
        }

        function resizeMap() {
            var
                i, j, clen,
                newCoords = [],
                sizeFactor = getCurrentImageWidth() / imageWidth;

            for (i = 0; i < len; i++) {
                clen = coords[i].length;
                newCoords[i] = [];

                for (j = 0; j < clen; j++) {
                    newCoords[i][j] = parseInt(coords[i][j] * sizeFactor,10);
                }

                areas[i].coords = newCoords[i].join(',');
                console.debug('['+areas[i].alt+'] '+ areas[i].coords);
            }
        }

        var
            map        = this,
            $mapImg    = $('img[usemap=#'+$(map).attr('name')+']'),
            areas      = map.getElementsByTagName('area'),
            len        = areas.length,
            coords     = [],
            imageWidth;

        init();
    }

    $.fn.imageMapResize = function(){
        return this.each(setUpImageMaps);
    };

})(window.jQuery);