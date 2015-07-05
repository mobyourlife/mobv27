var addListener = function(element, event, fn) {
	// Use addEventListener if available
	if (element.addEventListener) {
		element.addEventListener(event, fn, false);

		// Otherwise use attachEvent, set this and event
	} else if (element.attachEvent) {
		element.attachEvent('on' + event, (function(el) {
			return function() {
				fn.call(el, window.event);
			};
		}(element)));

		// Break closure and primary circular reference to element
		element = null;
	}
}

window.appendScript = function (id, src) {
	var js;
	if (document.getElementById(id)) {
		return;
	}
	js = document.createElement('script');
	js.id = id;
	js.src = src;
	document.body.appendChild(js);
}

var preloadScript = function(id, src, callback) {
	var js;
	if (document.getElementById(id)) {
		if (callback) {
			callback();
		}
		return;
	}
	js = document.createElement('script');
	js.id = id;
	js.src = src;

	if (callback) {
		addListener(js, 'load', function () {
			callback();
		});
	}

	addListener(js, 'error', function () {
		preloadScript(id, src, callback);
	});

	document.body.appendChild(js);
}

window.loadEditor = function (callback) {
	preloadScript('jquery', '//code.jquery.com/jquery-1.11.3.min.js', function () {
		preloadScript('jquery-hotkeys', '/js/jquery.hotkeys.js', function () {
			preloadScript('bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js', function () {
				preloadScript('bootstrap-wysiwyg', '/js/bootstrap-wysiwyg.js', function () {
					if (callback) {
						callback();
					}
				});
			});
		});
	});
}