// - global vars
var app, stage, lib = {}, canvas, loader;


// - entry point called from body on load
function entryPoint()
{
  app = new AppController();

  // for non EB:
  // app.init();

  app.initEB();
}


// - Utils
function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

// - IE 11 polyfill for custom event
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

// - helper method for prototype inheritence
var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};


function getByValueForKey(arr, key, value)
{
  for (var i=0, iLen=arr.length; i<iLen; i++)
  {
    if (arr[i][key] == value) return arr[i];
  }
}
