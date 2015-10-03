# Image Map Resize V0.6 for IE8
[![Bower version](https://badge.fury.io/bo/image-map-resizer.svg)](http://badge.fury.io/bo/image-map-resizer)
[![npm version](https://badge.fury.io/js/image-map-resizer.svg)](http://badge.fury.io/js/image-map-resizer)
[![Code Climate](https://codeclimate.com/github/davidjbradshaw/image-map-resizer/badges/gpa.svg)](https://codeclimate.com/github/davidjbradshaw/image-map-resizer)
![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)


*This is a simple library that makes HTML Image Maps responsive, so that they automagically stay scaled to the size of the image they are attached to. It detects the window being resized and updates the co-ordinates of the image map accordingly.*

This version of image-map-resizer includes support for IE8, if you only support newer browsers, then you should use the [latest version](https://github.com/davidjbradshaw/image-map-resizer). You will need to ensure that IE8 is running in "[Standards mode](http://en.wikipedia.org/wiki/Internet_Explorer_8#Standards_mode)". This can be done by adding the following to your HTML head section.

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

## Usage

This library can be used with native JavaScript or via jQuery.

### Native JS

Inclued the [imageMapResizer.min.js](https://raw.github.com/davidjbradshaw/imagemap-resizer/master/js/imageMapResizer.min.js) script then add the following call to the bottom of your page:

```js
imageMapResize();
```

Optionally you can pass a CSS selector that returns a collection of map tags, for example 'map.myMap'. Or a direct reference to a map object in the DOM.


### jQuery

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


###Example
http://davidjbradshaw.com/imagemap-resizer/example/


### License
Copyright &copy; 2014 [David J. Bradshaw](https://github.com/davidjbradshaw).
Licensed under the [MIT license](http://opensource.org/licenses/MIT).

[![NPM](https://nodei.co/npm/image-map-resizer.png)](https://nodei.co/npm/image-map-resizer/)
