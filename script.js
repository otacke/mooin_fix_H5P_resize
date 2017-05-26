/*
 * Just a hack of a hack for mooin to allow vertical resizing of H5P content
 * On a mooin course page that contains H5P content, copy this script into a
 * new text area in source mode and enclose it with <script> at the top and with
 * </script> at the bottom.
 */

/**
 * Wait for iframes to have loaded, then resize wrappers.
 */
function eeInit() {
	var iframeWrappers = document.getElementsByClassName('hvp-iframe');
	for (var i = 0; i < iframeWrappers.length; i++) {
		var iframe = iframeWrappers[i].firstChild;
		iframe.id = i;
		iframe.addEventListener('load', eeResizeElement);
	}
}

/**
 * Resize a wrapper of H5P content.
 *
 * @param {event|number} e - Numerical ID of the wrapper to be changed.
 */
function eeResizeElement(e) {
	var id = (typeof e !== 'number') ? e.target.id : e;
	setTimeout(function() {
		var iframeWrappers = document.getElementsByClassName('hvp-iframe');
		var height = iframeWrappers[id].firstChild.contentWindow.document.getElementsByClassName('h5p-iframe')[0].offsetHeight;
		iframeWrappers[id].firstChild.setAttribute('height', height);
		iframeWrappers[id].firstChild.style.height = height + 'px';
		iframeWrappers[id].style.cssText = 'padding: 0 !important; overflow: hidden;';
		iframeWrappers[id].style.height = height + 'px';
	}, 250); // UGLY HACK TO FIX SOMEONE ELSE'S UGLY HACK, should wait for DOM ...
}

window.addEventListener('resize', function() {
	var iframeWrappers = document.getElementsByClassName('hvp-iframe');
	for (var i = 0; i < iframeWrappers.length; i++) {
		eeResizeElement(i);
	}
});

eeInit();
