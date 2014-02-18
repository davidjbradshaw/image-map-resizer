# Image Map Resize

*This is a simple jQuery plugin to keep HTML Image Maps scaled to the size of an image. It detects the window being resized and updates the co-ordinates of the image map.*

### Usage

Inclue [jQuery](http://jquery.com) and [jquery.imageMapResizer.min.js](https://raw2.github.com/davidjbradshaw/imagemap-resizer/master/js/jquery.imageMapResizer.min.js) on your page and then add the following call to the bottom of your page:

```js
$('map').imageMapResize();
```

Or you may want to wrap it in a `$(document).ready()` function:

```js
$(document).ready(function() {
    $('map').imageMapResize();
});
```

###Example
http://davidjbradshaw.com/imagemap-resizer/example/

### A note on IE8 and below

This code uses JavaScripts native `Array.map()` function, which is not supported in IE8 and below. To work around this you can use the [Array.prototype.map Polyfil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) or use the following code to map the jQuery map function to the native one.

```js
//PolyFil for IE8 and below
//Map jQuery.map to native Array.map
if (!Array.prototype.map){
  Array.prototype.map = function(func) {
    return jQuery.map(this,func);
  };
}
```

This code needs to be run before the `$('map').imageMapResize();` call.

### Bower

This plugin can be installed via the [Bower](http://bower.io) front-end package management system.

    bower instal imagemap-resizer

### License
Copyright &copy; 2014 [David J. Bradshaw](https://github.com/davidjbradshaw)
Licensed under the [MIT license](http://opensource.org/licenses/MIT).