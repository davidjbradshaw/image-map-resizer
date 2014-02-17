# Image Map Resize

*This is a simple jQuery plugin to keep HTML Image Maps scaled to the size of an image. It detects the window being resized and updates the co-ordinates of the image map.*

### Usage

Inclue [jQuery](http://jquery.com) and [jquery.imageMapResizer.js](https://raw2.github.com/davidjbradshaw/imagemap-resizer/master/js/jquery.imageMapResizer.min.js) on your page and then add the following call to the bottom of your page:

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

## Bower

This library can be install via the [Bower](http://bower.io) front-end package management system.

    bower instal imagemap-resizer

### License
Copyright &copy; 2014 [David J. Bradshaw](https://github.com/davidjbradshaw)
Licensed under the MIT license.