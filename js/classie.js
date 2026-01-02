/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// quick element guard
function isElement(elem) {
  return !!elem && (elem.nodeType === 1 || (typeof Element !== 'undefined' && elem instanceof Element));
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    if (!isElement(elem)) { return false; }
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    if (!isElement(elem)) { return; }
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    if (!isElement(elem)) { return; }
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    if (!isElement(elem)) { return false; }
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if (!isElement(elem)) { return; }
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    if (!isElement(elem)) { return; }
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  if (!isElement(elem)) { return; }
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );