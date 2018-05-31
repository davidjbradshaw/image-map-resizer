# Image Map Resize
[![Bower version](https://badge.fury.io/bo/image-map-resizer.svg)](http://badge.fury.io/bo/image-map-resizer)
[![npm version](https://badge.fury.io/js/image-map-resizer.svg)](http://badge.fury.io/js/image-map-resizer)
[![CDNJS version](https://img.shields.io/cdnjs/v/image-map-resizer.svg)](https://cdnjs.com/libraries/image-map-resizer)
![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)


*This is a simple library that makes HTML Image Maps responsive, so that they automagically stay scaled to the size of the image they are attached to. It detects the window being resized and updates the co-ordinates of the image map accordingly.*

*This library can be used with or without jQuery.*

### Native JS Usage

Inclued the [imageMapResizer.min.js](https://raw.github.com/davidjbradshaw/imagemap-resizer/master/js/imageMapResizer.min.js) script then add the following call to the bottom of your page:

```js
imageMapResize();
```

Optionally you can pass a CSS selector that returns a collection of map tags, for example 'map.myMap'. Or a direct reference to a map object in the DOM. This function returns an array of map elements that it has been bound to.


### jQuery Usage

Inclue [jQuery](http://jquery.com) and the [imageMapResizer.min.js](https://raw.github.com/davidjbradshaw/imagemap-resizer/master/js/imageMapResizer.min.js) script and then add the following call to the bottom of your page:

```js
$('map').imageMapResize();
```

Or you may want to wrap it in a `$(document).ready()` function:

```js
$(document).ready(function() {
    $('map').imageMapResize();
});
```

### Example
http://davidjbradshaw.com/imagemap-resizer/example/

### WordPress
There is a port of this library to WordPress made by @iankevinmcdonald
https://wordpress.org/plugins/add-image-maps/

### IE8 Support

Version 1.0 of this project is optimised for IE9 and above. If you still require support for IE8 then please use [V0.6.x](https://github.com/davidjbradshaw/image-map-resizer/tree/v0.6.x). Both versions are functionally equivalent.

### License
Copyright &copy; 2014-15 [David J. Bradshaw](https://github.com/davidjbradshaw).
Licensed under the [MIT license](http://opensource.org/licenses/MIT).

[![NPM](https://nodei.co/npm/image-map-resizer.png)](https://nodei.co/npm/image-map-resizer/)
