
    (function (global) {
      try {
        var ls = global.localStorage
        var scrollPos = ls.getItem('slater-scroll')

        if (scrollPos) global.scrollTo(0, scrollPos)

        const socketio = document.createElement('script')
        socketio.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.slim.js'
        socketio.onload = function init () {
          var disconnected = false
          var socket = io('https://localhost:4000', {
            reconnectionAttempts: 1
          })
          socket.on('connect', function connect () {
            console.log('slater connected')
          })
          socket.on('refresh', function refresh () {
            ls.setItem('slater-scroll', global.scrollY)
            global.location.reload()
          })
          socket.on('disconnect', function disconnect () {
            disconnected = true
          })
          socket.on('reconnect_failed', function reconnectFailed (e) {
            if (disconnected) return
            console.group("slater - %cconnection to server at 4000 failed", "color: red")
            console.info("try visiting https://localhost:4000 and creating a security exception")
            console.log("for more info see https://github.com/the-couch/slater#live-reloading--https")
            console.groupEnd()
          })
        }
        document.head.appendChild(socketio)
      } catch (e) {}
    })(this);
  
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"ffc": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".chunk.js?v=9153100609&enable_js_minification=1"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/resources/scripts/ffc.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/evx/dist/evx.es.js":
/*!*****************************************!*\
  !*** ./node_modules/evx/dist/evx.es.js ***!
  \*****************************************/
/*! exports provided: on, emit, hydrate, getState, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emit", function() { return r; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return o; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getState", function() { return u; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return a; });
var n=function(n){if("object"!=typeof(t=n)||Array.isArray(t))throw"state should be an object";var t},t=function(n,t,e,c){return(r=n,r.reduce(function(n,t,e){return n.indexOf(t)>-1?n:n.concat(t)},[])).reduce(function(n,e){return n.concat(t[e]||[])},[]).map(function(n){return n(e,c)});var r},e=a(),c=e.on,r=e.emit,o=e.hydrate,u=e.getState;function a(e){void 0===e&&(e={});var c={};return{getState:function(){return Object.assign({},e)},hydrate:function(r){return n(r),Object.assign(e,r),function(){var n=["*"].concat(Object.keys(r));t(n,c,e)}},on:function(n,t){return(n=[].concat(n)).map(function(n){return c[n]=(c[n]||[]).concat(t)}),function(){return n.map(function(n){return c[n].splice(c[n].indexOf(t),1)})}},emit:function(r,o,u){var a=("*"===r?[]:["*"]).concat(r);(o="function"==typeof o?o(e):o)&&(n(o),Object.assign(e,o),a=a.concat(Object.keys(o))),t(a,c,e,u)}}}
//# sourceMappingURL=evx.es.js.map


/***/ }),

/***/ "./node_modules/js-cookie/src/js.cookie.js":
/*!*************************************************!*\
  !*** ./node_modules/js-cookie/src/js.cookie.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ "./node_modules/overlayscrollbars/js/OverlayScrollbars.js":
/*!****************************************************************!*\
  !*** ./node_modules/overlayscrollbars/js/OverlayScrollbars.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.0
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 02.08.2020
 */

(function (global, factory) {
    if (true)
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return factory(global, global.document, undefined); }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    else {}
}(typeof window !== 'undefined' ? window : this,
    function (window, document, undefined) {
        'use strict';
        var PLUGINNAME = 'OverlayScrollbars';
        var TYPES = {
            o: 'object',
            f: 'function',
            a: 'array',
            s: 'string',
            b: 'boolean',
            n: 'number',
            u: 'undefined',
            z: 'null'
            //d : 'date',
            //e : 'error',
            //r : 'regexp',
            //y : 'symbol'
        };
        var LEXICON = {
            c: 'class',
            s: 'style',
            i: 'id',
            l: 'length',
            p: 'prototype',
            ti: 'tabindex',
            oH: 'offsetHeight',
            cH: 'clientHeight',
            sH: 'scrollHeight',
            oW: 'offsetWidth',
            cW: 'clientWidth',
            sW: 'scrollWidth',
            hOP: 'hasOwnProperty',
            bCR: 'getBoundingClientRect'
        };
        var VENDORS = (function () {
            //https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix
            var jsCache = {};
            var cssCache = {};
            var cssPrefixes = ['-webkit-', '-moz-', '-o-', '-ms-'];
            var jsPrefixes = ['WebKit', 'Moz', 'O', 'MS'];
            function firstLetterToUpper(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            return {
                _cssPrefixes: cssPrefixes,
                _jsPrefixes: jsPrefixes,
                _cssProperty: function (name) {
                    var result = cssCache[name];

                    if (cssCache[LEXICON.hOP](name))
                        return result;

                    var uppercasedName = firstLetterToUpper(name);
                    var elmStyle = document.createElement('div')[LEXICON.s];
                    var resultPossibilities;
                    var i = 0;
                    var v;
                    var currVendorWithoutDashes;

                    for (; i < cssPrefixes.length; i++) {
                        currVendorWithoutDashes = cssPrefixes[i].replace(/-/g, '');
                        resultPossibilities = [
                            name, //transition
                            cssPrefixes[i] + name, //-webkit-transition
                            currVendorWithoutDashes + uppercasedName, //webkitTransition
                            firstLetterToUpper(currVendorWithoutDashes) + uppercasedName //WebkitTransition
                        ];
                        for (v = 0; v < resultPossibilities[LEXICON.l]; v++) {
                            if (elmStyle[resultPossibilities[v]] !== undefined) {
                                result = resultPossibilities[v];
                                break;
                            }
                        }
                    }

                    cssCache[name] = result;
                    return result;
                },
                _cssPropertyValue: function (property, values, suffix) {
                    var name = property + ' ' + values;
                    var result = cssCache[name];

                    if (cssCache[LEXICON.hOP](name))
                        return result;

                    var dummyStyle = document.createElement('div')[LEXICON.s];
                    var possbleValues = values.split(' ');
                    var preparedSuffix = suffix || '';
                    var i = 0;
                    var v = -1;
                    var prop;

                    for (; i < possbleValues[LEXICON.l]; i++) {
                        for (; v < VENDORS._cssPrefixes[LEXICON.l]; v++) {
                            prop = v < 0 ? possbleValues[i] : VENDORS._cssPrefixes[v] + possbleValues[i];
                            dummyStyle.cssText = property + ':' + prop + preparedSuffix;
                            if (dummyStyle[LEXICON.l]) {
                                result = prop;
                                break;
                            }
                        }
                    }

                    cssCache[name] = result;
                    return result;
                },
                _jsAPI: function (name, isInterface, fallback) {
                    var i = 0;
                    var result = jsCache[name];

                    if (!jsCache[LEXICON.hOP](name)) {
                        result = window[name];
                        for (; i < jsPrefixes[LEXICON.l]; i++)
                            result = result || window[(isInterface ? jsPrefixes[i] : jsPrefixes[i].toLowerCase()) + firstLetterToUpper(name)];
                        jsCache[name] = result;
                    }
                    return result || fallback;
                }
            }
        })();
        var COMPATIBILITY = (function () {
            function windowSize(x) {
                return x ? window.innerWidth || document.documentElement[LEXICON.cW] || document.body[LEXICON.cW] : window.innerHeight || document.documentElement[LEXICON.cH] || document.body[LEXICON.cH];
            }
            function bind(func, thisObj) {
                if (typeof func != TYPES.f) {
                    throw "Can't bind function!";
                    // closest thing possible to the ECMAScript 5
                    // internal IsCallable function
                    //throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }
                var proto = LEXICON.p;
                var aArgs = Array[proto].slice.call(arguments, 2);
                var fNOP = function () { };
                var fBound = function () { return func.apply(this instanceof fNOP ? this : thisObj, aArgs.concat(Array[proto].slice.call(arguments))); };

                if (func[proto])
                    fNOP[proto] = func[proto]; // Function.prototype doesn't have a prototype property
                fBound[proto] = new fNOP();

                return fBound;
            }

            return {
                /**
                 * Gets the current window width.
                 * @returns {Number|number} The current window width in pixel.
                 */
                wW: bind(windowSize, 0, true),

                /**
                 * Gets the current window height.
                 * @returns {Number|number} The current window height in pixel.
                 */
                wH: bind(windowSize, 0),

                /**
                 * Gets the MutationObserver Object or undefined if not supported.
                 * @returns {MutationObserver|*|undefined} The MutationsObserver Object or undefined.
                 */
                mO: bind(VENDORS._jsAPI, 0, 'MutationObserver', true),

                /**
                 * Gets the ResizeObserver Object or undefined if not supported.
                 * @returns {MutationObserver|*|undefined} The ResizeObserver Object or undefined.
                 */
                rO: bind(VENDORS._jsAPI, 0, 'ResizeObserver', true),

                /**
                 * Gets the RequestAnimationFrame method or it's corresponding polyfill.
                 * @returns {*|Function} The RequestAnimationFrame method or it's corresponding polyfill.
                 */
                rAF: bind(VENDORS._jsAPI, 0, 'requestAnimationFrame', false, function (func) { return window.setTimeout(func, 1000 / 60); }),

                /**
                 * Gets the CancelAnimationFrame method or it's corresponding polyfill.
                 * @returns {*|Function} The CancelAnimationFrame method or it's corresponding polyfill.
                 */
                cAF: bind(VENDORS._jsAPI, 0, 'cancelAnimationFrame', false, function (id) { return window.clearTimeout(id); }),

                /**
                 * Gets the current time.
                 * @returns {number} The current time.
                 */
                now: function () {
                    return Date.now && Date.now() || new Date().getTime();
                },

                /**
                 * Stops the propagation of the given event.
                 * @param event The event of which the propagation shall be stoped.
                 */
                stpP: function (event) {
                    if (event.stopPropagation)
                        event.stopPropagation();
                    else
                        event.cancelBubble = true;
                },

                /**
                 * Prevents the default action of the given event.
                 * @param event The event of which the default action shall be prevented.
                 */
                prvD: function (event) {
                    if (event.preventDefault && event.cancelable)
                        event.preventDefault();
                    else
                        event.returnValue = false;
                },

                /**
                 * Gets the pageX and pageY values of the given mouse event.
                 * @param event The mouse event of which the pageX and pageX shall be got.
                 * @returns {{x: number, y: number}} x = pageX value, y = pageY value.
                 */
                page: function (event) {
                    event = event.originalEvent || event;

                    var strPage = 'page';
                    var strClient = 'client';
                    var strX = 'X';
                    var strY = 'Y';
                    var target = event.target || event.srcElement || document;
                    var eventDoc = target.ownerDocument || document;
                    var doc = eventDoc.documentElement;
                    var body = eventDoc.body;

                    //if touch event return return pageX/Y of it
                    if (event.touches !== undefined) {
                        var touch = event.touches[0];
                        return {
                            x: touch[strPage + strX],
                            y: touch[strPage + strY]
                        }
                    }

                    // Calculate pageX/Y if not native supported
                    if (!event[strPage + strX] && event[strClient + strX] && event[strClient + strX] != null) {

                        return {
                            x: event[strClient + strX] +
                                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                                (doc && doc.clientLeft || body && body.clientLeft || 0),
                            y: event[strClient + strY] +
                                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                                (doc && doc.clientTop || body && body.clientTop || 0)
                        }
                    }
                    return {
                        x: event[strPage + strX],
                        y: event[strPage + strY]
                    };
                },

                /**
                 * Gets the clicked mouse button of the given mouse event.
                 * @param event The mouse event of which the clicked button shal be got.
                 * @returns {number} The number of the clicked mouse button. (0 : none | 1 : leftButton | 2 : middleButton | 3 : rightButton)
                 */
                mBtn: function (event) {
                    var button = event.button;
                    if (!event.which && button !== undefined)
                        return (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                    else
                        return event.which;
                },

                /**
                 * Checks whether a item is in the given array and returns its index.
                 * @param item The item of which the position in the array shall be determined.
                 * @param arr The array.
                 * @returns {number} The zero based index of the item or -1 if the item isn't in the array.
                 */
                inA: function (item, arr) {
                    for (var i = 0; i < arr[LEXICON.l]; i++)
                        //Sometiems in IE a "SCRIPT70" Permission denied error occurs if HTML elements in a iFrame are compared
                        try {
                            if (arr[i] === item)
                                return i;
                        }
                        catch (e) { }
                    return -1;
                },

                /**
                 * Returns true if the given value is a array.
                 * @param arr The potential array.
                 * @returns {boolean} True if the given value is a array, false otherwise.
                 */
                isA: function (arr) {
                    var def = Array.isArray;
                    return def ? def(arr) : this.type(arr) == TYPES.a;
                },

                /**
                 * Determine the internal JavaScript [[Class]] of the given object.
                 * @param obj The object of which the type shall be determined.
                 * @returns {string} The type of the given object.
                 */
                type: function (obj) {
                    if (obj === undefined)
                        return obj + '';
                    if (obj === null)
                        return obj + '';
                    return Object[LEXICON.p].toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
                },


                bind: bind

                /**
                 * Gets the vendor-prefixed CSS property by the given name.
                 * For example the given name is "transform" and you're using a old Firefox browser then the returned value would be "-moz-transform".
                 * If the browser doesn't need a vendor-prefix, then the returned string is the given name.
                 * If the browser doesn't support the given property name at all (not even with a vendor-prefix) the returned value is null.
                 * @param propName The unprefixed CSS property name.
                 * @returns {string|null} The vendor-prefixed CSS property or null if the browser doesn't support the given CSS property.

                cssProp: function(propName) {
                    return VENDORS._cssProperty(propName);
                }
                */
            }
        })();


        var MATH = Math;
        var JQUERY = window.jQuery;
        var EASING = (function () {
            var _easingsMath = {
                p: MATH.PI,
                c: MATH.cos,
                s: MATH.sin,
                w: MATH.pow,
                t: MATH.sqrt,
                n: MATH.asin,
                a: MATH.abs,
                o: 1.70158
            };

            /*
             x : current percent (0 - 1),
             t : current time (duration * percent),
             b : start value (from),
             c : end value (to),
             d : duration

             easingName : function(x, t, b, c, d) { return easedValue; }
             */

            return {
                swing: function (x, t, b, c, d) {
                    return 0.5 - _easingsMath.c(x * _easingsMath.p) / 2;
                },
                linear: function (x, t, b, c, d) {
                    return x;
                },
                easeInQuad: function (x, t, b, c, d) {
                    return c * (t /= d) * t + b;
                },
                easeOutQuad: function (x, t, b, c, d) {
                    return -c * (t /= d) * (t - 2) + b;
                },
                easeInOutQuad: function (x, t, b, c, d) {
                    return ((t /= d / 2) < 1) ? c / 2 * t * t + b : -c / 2 * ((--t) * (t - 2) - 1) + b;
                },
                easeInCubic: function (x, t, b, c, d) {
                    return c * (t /= d) * t * t + b;
                },
                easeOutCubic: function (x, t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t + 1) + b;
                },
                easeInOutCubic: function (x, t, b, c, d) {
                    return ((t /= d / 2) < 1) ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
                },
                easeInQuart: function (x, t, b, c, d) {
                    return c * (t /= d) * t * t * t + b;
                },
                easeOutQuart: function (x, t, b, c, d) {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                },
                easeInOutQuart: function (x, t, b, c, d) {
                    return ((t /= d / 2) < 1) ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                },
                easeInQuint: function (x, t, b, c, d) {
                    return c * (t /= d) * t * t * t * t + b;
                },
                easeOutQuint: function (x, t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                },
                easeInOutQuint: function (x, t, b, c, d) {
                    return ((t /= d / 2) < 1) ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                },
                easeInSine: function (x, t, b, c, d) {
                    return -c * _easingsMath.c(t / d * (_easingsMath.p / 2)) + c + b;
                },
                easeOutSine: function (x, t, b, c, d) {
                    return c * _easingsMath.s(t / d * (_easingsMath.p / 2)) + b;
                },
                easeInOutSine: function (x, t, b, c, d) {
                    return -c / 2 * (_easingsMath.c(_easingsMath.p * t / d) - 1) + b;
                },
                easeInExpo: function (x, t, b, c, d) {
                    return (t == 0) ? b : c * _easingsMath.w(2, 10 * (t / d - 1)) + b;
                },
                easeOutExpo: function (x, t, b, c, d) {
                    return (t == d) ? b + c : c * (-_easingsMath.w(2, -10 * t / d) + 1) + b;
                },
                easeInOutExpo: function (x, t, b, c, d) {
                    if (t == 0) return b;
                    if (t == d) return b + c;
                    if ((t /= d / 2) < 1) return c / 2 * _easingsMath.w(2, 10 * (t - 1)) + b;
                    return c / 2 * (-_easingsMath.w(2, -10 * --t) + 2) + b;
                },
                easeInCirc: function (x, t, b, c, d) {
                    return -c * (_easingsMath.t(1 - (t /= d) * t) - 1) + b;
                },
                easeOutCirc: function (x, t, b, c, d) {
                    return c * _easingsMath.t(1 - (t = t / d - 1) * t) + b;
                },
                easeInOutCirc: function (x, t, b, c, d) {
                    return ((t /= d / 2) < 1) ? -c / 2 * (_easingsMath.t(1 - t * t) - 1) + b : c / 2 * (_easingsMath.t(1 - (t -= 2) * t) + 1) + b;
                },
                easeInElastic: function (x, t, b, c, d) {
                    var s = _easingsMath.o; var p = 0; var a = c;
                    if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
                    if (a < _easingsMath.a(c)) { a = c; s = p / 4; }
                    else s = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);
                    return -(a * _easingsMath.w(2, 10 * (t -= 1)) * _easingsMath.s((t * d - s) * (2 * _easingsMath.p) / p)) + b;
                },
                easeOutElastic: function (x, t, b, c, d) {
                    var s = _easingsMath.o; var p = 0; var a = c;
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    if (!p) p = d * .3;
                    if (a < _easingsMath.a(c)) { a = c; s = p / 4; }
                    else s = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);
                    return a * _easingsMath.w(2, -10 * t) * _easingsMath.s((t * d - s) * (2 * _easingsMath.p) / p) + c + b;
                },
                easeInOutElastic: function (x, t, b, c, d) {
                    var s = _easingsMath.o; var p = 0; var a = c;
                    if (t == 0) return b;
                    if ((t /= d / 2) == 2) return b + c;
                    if (!p) p = d * (.3 * 1.5);
                    if (a < _easingsMath.a(c)) { a = c; s = p / 4; }
                    else s = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);
                    if (t < 1) return -.5 * (a * _easingsMath.w(2, 10 * (t -= 1)) * _easingsMath.s((t * d - s) * (2 * _easingsMath.p) / p)) + b;
                    return a * _easingsMath.w(2, -10 * (t -= 1)) * _easingsMath.s((t * d - s) * (2 * _easingsMath.p) / p) * .5 + c + b;
                },
                easeInBack: function (x, t, b, c, d, s) {
                    s = s || _easingsMath.o;
                    return c * (t /= d) * t * ((s + 1) * t - s) + b;
                },
                easeOutBack: function (x, t, b, c, d, s) {
                    s = s || _easingsMath.o;
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                },
                easeInOutBack: function (x, t, b, c, d, s) {
                    s = s || _easingsMath.o;
                    return ((t /= d / 2) < 1) ? c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b : c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                },
                easeInBounce: function (x, t, b, c, d) {
                    return c - this.easeOutBounce(x, d - t, 0, c, d) + b;
                },
                easeOutBounce: function (x, t, b, c, d) {
                    var o = 7.5625;
                    if ((t /= d) < (1 / 2.75)) {
                        return c * (o * t * t) + b;
                    } else if (t < (2 / 2.75)) {
                        return c * (o * (t -= (1.5 / 2.75)) * t + .75) + b;
                    } else if (t < (2.5 / 2.75)) {
                        return c * (o * (t -= (2.25 / 2.75)) * t + .9375) + b;
                    } else {
                        return c * (o * (t -= (2.625 / 2.75)) * t + .984375) + b;
                    }
                },
                easeInOutBounce: function (x, t, b, c, d) {
                    return (t < d / 2) ? this.easeInBounce(x, t * 2, 0, c, d) * .5 + b : this.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            };
            /*
             *
             * TERMS OF USE - EASING EQUATIONS
             * 
             * Open source under the BSD License. 
             * 
             * Copyright Â© 2001 Robert Penner
             * All rights reserved.
             * 
             * Redistribution and use in source and binary forms, with or without modification, 
             * are permitted provided that the following conditions are met:
             * 
             * Redistributions of source code must retain the above copyright notice, this list of 
             * conditions and the following disclaimer.
             * Redistributions in binary form must reproduce the above copyright notice, this list 
             * of conditions and the following disclaimer in the documentation and/or other materials 
             * provided with the distribution.
             * 
             * Neither the name of the author nor the names of contributors may be used to endorse 
             * or promote products derived from this software without specific prior written permission.
             * 
             * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
             * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
             * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
             *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
             *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
             *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
             * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
             *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
             * OF THE POSSIBILITY OF SUCH DAMAGE. 
             *
             */
        })();
        var FRAMEWORK = (function () {
            var _rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
            var _strSpace = ' ';
            var _strEmpty = '';
            var _strScrollLeft = 'scrollLeft';
            var _strScrollTop = 'scrollTop';
            var _animations = [];
            var _type = COMPATIBILITY.type;
            var _cssNumber = {
                animationIterationCount: true,
                columnCount: true,
                fillOpacity: true,
                flexGrow: true,
                flexShrink: true,
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                order: true,
                orphans: true,
                widows: true,
                zIndex: true,
                zoom: true
            };

            function extend() {
                var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
                    i = 1,
                    length = arguments[LEXICON.l],
                    deep = false;

                // Handle a deep copy situation
                if (_type(target) == TYPES.b) {
                    deep = target;
                    target = arguments[1] || {};
                    // skip the boolean and the target
                    i = 2;
                }

                // Handle case when target is a string or something (possible in deep copy)
                if (_type(target) != TYPES.o && !_type(target) == TYPES.f) {
                    target = {};
                }

                // extend jQuery itself if only one argument is passed
                if (length === i) {
                    target = FakejQuery;
                    --i;
                }

                for (; i < length; i++) {
                    // Only deal with non-null/undefined values
                    if ((options = arguments[i]) != null) {
                        // Extend the base object
                        for (name in options) {
                            src = target[name];
                            copy = options[name];

                            // Prevent never-ending loop
                            if (target === copy) {
                                continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if (deep && copy && (isPlainObject(copy) || (copyIsArray = COMPATIBILITY.isA(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && COMPATIBILITY.isA(src) ? src : [];

                                } else {
                                    clone = src && isPlainObject(src) ? src : {};
                                }

                                // Never move original objects, clone them
                                target[name] = extend(deep, clone, copy);

                                // Don't bring in undefined values
                            } else if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }

                // Return the modified object
                return target;
            };

            function inArray(item, arr, fromIndex) {
                for (var i = fromIndex || 0; i < arr[LEXICON.l]; i++)
                    if (arr[i] === item)
                        return i;
                return -1;
            }

            function isFunction(obj) {
                return _type(obj) == TYPES.f;
            };

            function isEmptyObject(obj) {
                for (var name in obj)
                    return false;
                return true;
            };

            function isPlainObject(obj) {
                if (!obj || _type(obj) != TYPES.o)
                    return false;

                var key;
                var proto = LEXICON.p;
                var hasOwnProperty = Object[proto].hasOwnProperty;
                var hasOwnConstructor = hasOwnProperty.call(obj, 'constructor');
                var hasIsPrototypeOf = obj.constructor && obj.constructor[proto] && hasOwnProperty.call(obj.constructor[proto], 'isPrototypeOf');

                if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
                    return false;
                }


                for (key in obj) { /**/ }

                return _type(key) == TYPES.u || hasOwnProperty.call(obj, key);
            };

            function each(obj, callback) {
                var i = 0;

                if (isArrayLike(obj)) {
                    for (; i < obj[LEXICON.l]; i++) {
                        if (callback.call(obj[i], i, obj[i]) === false)
                            break;
                    }
                }
                else {
                    for (i in obj) {
                        if (callback.call(obj[i], i, obj[i]) === false)
                            break;
                    }
                }

                return obj;
            };

            function isArrayLike(obj) {
                var length = !!obj && [LEXICON.l] in obj && obj[LEXICON.l];
                var t = _type(obj);
                return isFunction(t) ? false : (t == TYPES.a || length === 0 || _type(length) == TYPES.n && length > 0 && (length - 1) in obj);
            }

            function stripAndCollapse(value) {
                var tokens = value.match(_rnothtmlwhite) || [];
                return tokens.join(_strSpace);
            }

            function matches(elem, selector) {
                var nodeList = (elem.parentNode || document).querySelectorAll(selector) || [];
                var i = nodeList[LEXICON.l];

                while (i--)
                    if (nodeList[i] == elem)
                        return true;

                return false;
            }

            function insertAdjacentElement(el, strategy, child) {
                if (COMPATIBILITY.isA(child)) {
                    for (var i = 0; i < child[LEXICON.l]; i++)
                        insertAdjacentElement(el, strategy, child[i]);
                }
                else if (_type(child) == TYPES.s)
                    el.insertAdjacentHTML(strategy, child);
                else
                    el.insertAdjacentElement(strategy, child.nodeType ? child : child[0]);
            }

            function setCSSVal(el, prop, val) {
                try {
                    if (el[LEXICON.s][prop] !== undefined)
                        el[LEXICON.s][prop] = parseCSSVal(prop, val);
                } catch (e) { }
            }

            function parseCSSVal(prop, val) {
                if (!_cssNumber[prop.toLowerCase()] && _type(val) == TYPES.n)
                    val += 'px';
                return val;
            }

            function startNextAnimationInQ(animObj, removeFromQ) {
                var index;
                var nextAnim;
                if (removeFromQ !== false)
                    animObj.q.splice(0, 1);
                if (animObj.q[LEXICON.l] > 0) {
                    nextAnim = animObj.q[0];
                    animate(animObj.el, nextAnim.props, nextAnim.duration, nextAnim.easing, nextAnim.complete, true);
                }
                else {
                    index = inArray(animObj, _animations);
                    if (index > -1)
                        _animations.splice(index, 1);
                }
            }

            function setAnimationValue(el, prop, value) {
                if (prop === _strScrollLeft || prop === _strScrollTop)
                    el[prop] = value;
                else
                    setCSSVal(el, prop, value);
            }

            function animate(el, props, options, easing, complete, guaranteedNext) {
                var hasOptions = isPlainObject(options);
                var from = {};
                var to = {};
                var i = 0;
                var key;
                var animObj;
                var start;
                var progress;
                var step;
                var specialEasing;
                var duration;
                if (hasOptions) {
                    easing = options.easing;
                    start = options.start;
                    progress = options.progress;
                    step = options.step;
                    specialEasing = options.specialEasing;
                    complete = options.complete;
                    duration = options.duration;
                }
                else
                    duration = options;
                specialEasing = specialEasing || {};
                duration = duration || 400;
                easing = easing || 'swing';
                guaranteedNext = guaranteedNext || false;

                for (; i < _animations[LEXICON.l]; i++) {
                    if (_animations[i].el === el) {
                        animObj = _animations[i];
                        break;
                    }
                }

                if (!animObj) {
                    animObj = {
                        el: el,
                        q: []
                    };
                    _animations.push(animObj);
                }

                for (key in props) {
                    if (key === _strScrollLeft || key === _strScrollTop)
                        from[key] = el[key];
                    else
                        from[key] = FakejQuery(el).css(key);
                }

                for (key in from) {
                    if (from[key] !== props[key] && props[key] !== undefined)
                        to[key] = props[key];
                }

                if (!isEmptyObject(to)) {
                    var timeNow;
                    var end;
                    var percent;
                    var fromVal;
                    var toVal;
                    var easedVal;
                    var timeStart;
                    var frame;
                    var elapsed;
                    var qPos = guaranteedNext ? 0 : inArray(qObj, animObj.q);
                    var qObj = {
                        props: to,
                        duration: hasOptions ? options : duration,
                        easing: easing,
                        complete: complete
                    };
                    if (qPos === -1) {
                        qPos = animObj.q[LEXICON.l];
                        animObj.q.push(qObj);
                    }

                    if (qPos === 0) {
                        if (duration > 0) {
                            timeStart = COMPATIBILITY.now();
                            frame = function () {
                                timeNow = COMPATIBILITY.now();
                                elapsed = (timeNow - timeStart);
                                end = qObj.stop || elapsed >= duration;
                                percent = 1 - ((MATH.max(0, timeStart + duration - timeNow) / duration) || 0);

                                for (key in to) {
                                    fromVal = parseFloat(from[key]);
                                    toVal = parseFloat(to[key]);
                                    easedVal = (toVal - fromVal) * EASING[specialEasing[key] || easing](percent, percent * duration, 0, 1, duration) + fromVal;
                                    setAnimationValue(el, key, easedVal);
                                    if (isFunction(step)) {
                                        step(easedVal, {
                                            elem: el,
                                            prop: key,
                                            start: fromVal,
                                            now: easedVal,
                                            end: toVal,
                                            pos: percent,
                                            options: {
                                                easing: easing,
                                                speacialEasing: specialEasing,
                                                duration: duration,
                                                complete: complete,
                                                step: step
                                            },
                                            startTime: timeStart
                                        });
                                    }
                                }

                                if (isFunction(progress))
                                    progress({}, percent, MATH.max(0, duration - elapsed));

                                if (end) {
                                    startNextAnimationInQ(animObj);
                                    if (isFunction(complete))
                                        complete();
                                }
                                else
                                    qObj.frame = COMPATIBILITY.rAF()(frame);
                            };
                            qObj.frame = COMPATIBILITY.rAF()(frame);
                        }
                        else {
                            for (key in to)
                                setAnimationValue(el, key, to[key]);
                            startNextAnimationInQ(animObj);
                        }
                    }
                }
                else if (guaranteedNext)
                    startNextAnimationInQ(animObj);
            }

            function stop(el, clearQ, jumpToEnd) {
                var animObj;
                var qObj;
                var key;
                var i = 0;
                for (; i < _animations[LEXICON.l]; i++) {
                    animObj = _animations[i];
                    if (animObj.el === el) {
                        if (animObj.q[LEXICON.l] > 0) {
                            qObj = animObj.q[0];
                            qObj.stop = true;
                            COMPATIBILITY.cAF()(qObj.frame);
                            animObj.q.splice(0, 1);

                            if (jumpToEnd)
                                for (key in qObj.props)
                                    setAnimationValue(el, key, qObj.props[key]);

                            if (clearQ)
                                animObj.q = [];
                            else
                                startNextAnimationInQ(animObj, false);
                        }
                        break;
                    }
                }
            }

            function elementIsVisible(el) {
                return !!(el[LEXICON.oW] || el[LEXICON.oH] || el.getClientRects()[LEXICON.l]);
            }

            function FakejQuery(selector) {
                if (arguments[LEXICON.l] === 0)
                    return this;

                var base = new FakejQuery();
                var elements = selector;
                var i = 0;
                var elms;
                var el;

                if (_type(selector) == TYPES.s) {
                    elements = [];
                    if (selector.charAt(0) === '<') {
                        el = document.createElement('div');
                        el.innerHTML = selector;
                        elms = el.children;
                    }
                    else {
                        elms = document.querySelectorAll(selector);
                    }

                    for (; i < elms[LEXICON.l]; i++)
                        elements.push(elms[i]);
                }

                if (elements) {
                    if (_type(elements) != TYPES.s && (!isArrayLike(elements) || elements === window || elements === elements.self))
                        elements = [elements];

                    for (i = 0; i < elements[LEXICON.l]; i++)
                        base[i] = elements[i];

                    base[LEXICON.l] = elements[LEXICON.l];
                }

                return base;
            };

            FakejQuery[LEXICON.p] = {

                //EVENTS:

                on: function (eventName, handler) {
                    eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];

                    var eventNameLength = eventName[LEXICON.l];
                    var i = 0;
                    var el;
                    return this.each(function () {
                        el = this;
                        try {
                            if (el.addEventListener) {
                                for (; i < eventNameLength; i++)
                                    el.addEventListener(eventName[i], handler);
                            }
                            else if (el.detachEvent) {
                                for (; i < eventNameLength; i++)
                                    el.attachEvent('on' + eventName[i], handler);
                            }
                        } catch (e) { }
                    });
                },

                off: function (eventName, handler) {
                    eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];

                    var eventNameLength = eventName[LEXICON.l];
                    var i = 0;
                    var el;
                    return this.each(function () {
                        el = this;
                        try {
                            if (el.removeEventListener) {
                                for (; i < eventNameLength; i++)
                                    el.removeEventListener(eventName[i], handler);
                            }
                            else if (el.detachEvent) {
                                for (; i < eventNameLength; i++)
                                    el.detachEvent('on' + eventName[i], handler);
                            }
                        } catch (e) { }
                    });
                },

                one: function (eventName, handler) {
                    eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];
                    return this.each(function () {
                        var el = FakejQuery(this);
                        FakejQuery.each(eventName, function (i, oneEventName) {
                            var oneHandler = function (e) {
                                handler.call(this, e);
                                el.off(oneEventName, oneHandler);
                            };
                            el.on(oneEventName, oneHandler);
                        });
                    });
                },

                trigger: function (eventName) {
                    var el;
                    var event;
                    return this.each(function () {
                        el = this;
                        if (document.createEvent) {
                            event = document.createEvent('HTMLEvents');
                            event.initEvent(eventName, true, false);
                            el.dispatchEvent(event);
                        }
                        else {
                            el.fireEvent('on' + eventName);
                        }
                    });
                },

                //DOM NODE INSERTING / REMOVING:

                append: function (child) {
                    return this.each(function () { insertAdjacentElement(this, 'beforeend', child); });
                },

                prepend: function (child) {
                    return this.each(function () { insertAdjacentElement(this, 'afterbegin', child); });
                },

                before: function (child) {
                    return this.each(function () { insertAdjacentElement(this, 'beforebegin', child); });
                },

                after: function (child) {
                    return this.each(function () { insertAdjacentElement(this, 'afterend', child); });
                },

                remove: function () {
                    return this.each(function () {
                        var el = this;
                        var parentNode = el.parentNode;
                        if (parentNode != null)
                            parentNode.removeChild(el);
                    });
                },

                unwrap: function () {
                    var parents = [];
                    var i;
                    var el;
                    var parent;

                    this.each(function () {
                        parent = this.parentNode;
                        if (inArray(parent, parents) === - 1)
                            parents.push(parent);
                    });

                    for (i = 0; i < parents[LEXICON.l]; i++) {
                        el = parents[i];
                        parent = el.parentNode;
                        while (el.firstChild)
                            parent.insertBefore(el.firstChild, el);
                        parent.removeChild(el);
                    }

                    return this;
                },

                wrapAll: function (wrapperHTML) {
                    var i;
                    var nodes = this;
                    var wrapper = FakejQuery(wrapperHTML)[0];
                    var deepest = wrapper;
                    var parent = nodes[0].parentNode;
                    var previousSibling = nodes[0].previousSibling;
                    while (deepest.childNodes[LEXICON.l] > 0)
                        deepest = deepest.childNodes[0];

                    for (i = 0; nodes[LEXICON.l] - i; deepest.firstChild === nodes[0] && i++)
                        deepest.appendChild(nodes[i]);

                    var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
                    parent.insertBefore(wrapper, nextSibling);

                    return this;
                },

                wrapInner: function (wrapperHTML) {
                    return this.each(function () {
                        var el = FakejQuery(this);
                        var contents = el.contents();

                        if (contents[LEXICON.l])
                            contents.wrapAll(wrapperHTML);
                        else
                            el.append(wrapperHTML);
                    });
                },

                wrap: function (wrapperHTML) {
                    return this.each(function () { FakejQuery(this).wrapAll(wrapperHTML); });
                },


                //DOM NODE MANIPULATION / INFORMATION:

                css: function (styles, val) {
                    var el;
                    var key;
                    var cptStyle;
                    var getCptStyle = window.getComputedStyle;
                    if (_type(styles) == TYPES.s) {
                        if (val === undefined) {
                            el = this[0];
                            cptStyle = getCptStyle ? getCptStyle(el, null) : el.currentStyle[styles];

                            //https://bugzilla.mozilla.org/show_bug.cgi?id=548397 can be null sometimes if iframe with display: none (firefox only!)
                            return getCptStyle ? cptStyle != null ? cptStyle.getPropertyValue(styles) : el[LEXICON.s][styles] : cptStyle;
                        }
                        else {
                            return this.each(function () {
                                setCSSVal(this, styles, val);
                            });
                        }
                    }
                    else {
                        return this.each(function () {
                            for (key in styles)
                                setCSSVal(this, key, styles[key]);
                        });
                    }
                },

                hasClass: function (className) {
                    var elem, i = 0;
                    var classNamePrepared = _strSpace + className + _strSpace;
                    var classList;

                    while ((elem = this[i++])) {
                        classList = elem.classList;
                        if (classList && classList.contains(className))
                            return true;
                        else if (elem.nodeType === 1 && (_strSpace + stripAndCollapse(elem.className + _strEmpty) + _strSpace).indexOf(classNamePrepared) > -1)
                            return true;
                    }

                    return false;
                },

                addClass: function (className) {
                    var classes;
                    var elem;
                    var cur;
                    var curValue;
                    var clazz;
                    var finalValue;
                    var supportClassList;
                    var elmClassList;
                    var i = 0;
                    var v = 0;

                    if (className) {
                        classes = className.match(_rnothtmlwhite) || [];

                        while ((elem = this[i++])) {
                            elmClassList = elem.classList;
                            if (supportClassList === undefined)
                                supportClassList = elmClassList !== undefined;

                            if (supportClassList) {
                                while ((clazz = classes[v++]))
                                    elmClassList.add(clazz);
                            }
                            else {
                                curValue = elem.className + _strEmpty;
                                cur = elem.nodeType === 1 && (_strSpace + stripAndCollapse(curValue) + _strSpace);

                                if (cur) {
                                    while ((clazz = classes[v++]))
                                        if (cur.indexOf(_strSpace + clazz + _strSpace) < 0)
                                            cur += clazz + _strSpace;

                                    finalValue = stripAndCollapse(cur);
                                    if (curValue !== finalValue)
                                        elem.className = finalValue;
                                }
                            }
                        }
                    }

                    return this;
                },

                removeClass: function (className) {
                    var classes;
                    var elem;
                    var cur;
                    var curValue;
                    var clazz;
                    var finalValue;
                    var supportClassList;
                    var elmClassList;
                    var i = 0;
                    var v = 0;

                    if (className) {
                        classes = className.match(_rnothtmlwhite) || [];

                        while ((elem = this[i++])) {
                            elmClassList = elem.classList;
                            if (supportClassList === undefined)
                                supportClassList = elmClassList !== undefined;

                            if (supportClassList) {
                                while ((clazz = classes[v++]))
                                    elmClassList.remove(clazz);
                            }
                            else {
                                curValue = elem.className + _strEmpty;
                                cur = elem.nodeType === 1 && (_strSpace + stripAndCollapse(curValue) + _strSpace);

                                if (cur) {
                                    while ((clazz = classes[v++]))
                                        while (cur.indexOf(_strSpace + clazz + _strSpace) > -1)
                                            cur = cur.replace(_strSpace + clazz + _strSpace, _strSpace);

                                    finalValue = stripAndCollapse(cur);
                                    if (curValue !== finalValue)
                                        elem.className = finalValue;
                                }
                            }
                        }
                    }

                    return this;
                },

                hide: function () {
                    return this.each(function () { this[LEXICON.s].display = 'none'; });
                },

                show: function () {
                    return this.each(function () { this[LEXICON.s].display = 'block'; });
                },

                attr: function (attrName, value) {
                    var i = 0;
                    var el;
                    while (el = this[i++]) {
                        if (value === undefined)
                            return el.getAttribute(attrName);
                        el.setAttribute(attrName, value);
                    }
                    return this;
                },

                removeAttr: function (attrName) {
                    return this.each(function () { this.removeAttribute(attrName); });
                },

                offset: function () {
                    var el = this[0];
                    var rect = el[LEXICON.bCR]();
                    var scrollLeft = window.pageXOffset || document.documentElement[_strScrollLeft];
                    var scrollTop = window.pageYOffset || document.documentElement[_strScrollTop];
                    return {
                        top: rect.top + scrollTop,
                        left: rect.left + scrollLeft
                    };
                },

                position: function () {
                    var el = this[0];
                    return {
                        top: el.offsetTop,
                        left: el.offsetLeft
                    };
                },

                scrollLeft: function (value) {
                    var i = 0;
                    var el;
                    while (el = this[i++]) {
                        if (value === undefined)
                            return el[_strScrollLeft];
                        el[_strScrollLeft] = value;
                    }
                    return this;
                },

                scrollTop: function (value) {
                    var i = 0;
                    var el;
                    while (el = this[i++]) {
                        if (value === undefined)
                            return el[_strScrollTop];
                        el[_strScrollTop] = value;
                    }
                    return this;
                },

                val: function (value) {
                    var el = this[0];
                    if (!value)
                        return el.value;
                    el.value = value;
                    return this;
                },


                //DOM TRAVERSAL / FILTERING:

                first: function () {
                    return this.eq(0);
                },

                last: function () {
                    return this.eq(-1);
                },

                eq: function (index) {
                    return FakejQuery(this[index >= 0 ? index : this[LEXICON.l] + index]);
                },

                find: function (selector) {
                    var children = [];
                    var i;
                    this.each(function () {
                        var el = this;
                        var ch = el.querySelectorAll(selector);
                        for (i = 0; i < ch[LEXICON.l]; i++)
                            children.push(ch[i]);
                    });
                    return FakejQuery(children);
                },

                children: function (selector) {
                    var children = [];
                    var el;
                    var ch;
                    var i;

                    this.each(function () {
                        ch = this.children;
                        for (i = 0; i < ch[LEXICON.l]; i++) {
                            el = ch[i];
                            if (selector) {
                                if ((el.matches && el.matches(selector)) || matches(el, selector))
                                    children.push(el);
                            }
                            else
                                children.push(el);
                        }
                    });
                    return FakejQuery(children);
                },

                parent: function (selector) {
                    var parents = [];
                    var parent;
                    this.each(function () {
                        parent = this.parentNode;
                        if (selector ? FakejQuery(parent).is(selector) : true)
                            parents.push(parent);
                    });
                    return FakejQuery(parents);
                },

                is: function (selector) {

                    var el;
                    var i;
                    for (i = 0; i < this[LEXICON.l]; i++) {
                        el = this[i];
                        if (selector === ':visible')
                            return elementIsVisible(el);
                        if (selector === ':hidden')
                            return !elementIsVisible(el);
                        if ((el.matches && el.matches(selector)) || matches(el, selector))
                            return true;
                    }
                    return false;
                },

                contents: function () {
                    var contents = [];
                    var childs;
                    var i;

                    this.each(function () {
                        childs = this.childNodes;
                        for (i = 0; i < childs[LEXICON.l]; i++)
                            contents.push(childs[i]);
                    });

                    return FakejQuery(contents);
                },

                each: function (callback) {
                    return each(this, callback);
                },


                //ANIMATION:

                animate: function (props, duration, easing, complete) {
                    return this.each(function () { animate(this, props, duration, easing, complete); });
                },

                stop: function (clearQ, jump) {
                    return this.each(function () { stop(this, clearQ, jump); });
                }
            };

            extend(FakejQuery, {
                extend: extend,
                inArray: inArray,
                isEmptyObject: isEmptyObject,
                isPlainObject: isPlainObject,
                each: each
            });

            return FakejQuery;
        })();
        var INSTANCES = (function () {
            var _targets = [];
            var _instancePropertyString = '__overlayScrollbars__';

            /**
             * Register, unregister or get a certain (or all) instances.
             * Register: Pass the target and the instance.
             * Unregister: Pass the target and null.
             * Get Instance: Pass the target from which the instance shall be got.
             * Get Targets: Pass no arguments.
             * @param target The target to which the instance shall be registered / from which the instance shall be unregistered / the instance shall be got
             * @param instance The instance.
             * @returns {*|void} Returns the instance from the given target.
             */
            return function (target, instance) {
                var argLen = arguments[LEXICON.l];
                if (argLen < 1) {
                    //return all targets
                    return _targets;
                }
                else {
                    if (instance) {
                        //register instance
                        target[_instancePropertyString] = instance;
                        _targets.push(target);
                    }
                    else {
                        var index = COMPATIBILITY.inA(target, _targets);
                        if (index > -1) {
                            if (argLen > 1) {
                                //unregister instance
                                delete target[_instancePropertyString];
                                _targets.splice(index, 1);
                            }
                            else {
                                //get instance from target
                                return _targets[index][_instancePropertyString];
                            }
                        }
                    }
                }
            }
        })();
        var PLUGIN = (function () {
            var _plugin;
            var _pluginsGlobals;
            var _pluginsAutoUpdateLoop;
            var _pluginsExtensions = [];
            var _pluginsOptions = (function () {
                var type = COMPATIBILITY.type;
                var possibleTemplateTypes = [
                    TYPES.b, //boolean
                    TYPES.n, //number
                    TYPES.s, //string
                    TYPES.a, //array
                    TYPES.o, //object
                    TYPES.f, //function
                    TYPES.z  //null
                ];
                var restrictedStringsSplit = ' ';
                var restrictedStringsPossibilitiesSplit = ':';
                var classNameAllowedValues = [TYPES.z, TYPES.s];
                var numberAllowedValues = TYPES.n;
                var booleanNullAllowedValues = [TYPES.z, TYPES.b];
                var booleanTrueTemplate = [true, TYPES.b];
                var booleanFalseTemplate = [false, TYPES.b];
                var callbackTemplate = [null, [TYPES.z, TYPES.f]];
                var updateOnLoadTemplate = [['img'], [TYPES.s, TYPES.a, TYPES.z]];
                var inheritedAttrsTemplate = [['style', 'class'], [TYPES.s, TYPES.a, TYPES.z]];
                var resizeAllowedValues = 'n:none b:both h:horizontal v:vertical';
                var overflowBehaviorAllowedValues = 'v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden';
                var scrollbarsVisibilityAllowedValues = 'v:visible h:hidden a:auto';
                var scrollbarsAutoHideAllowedValues = 'n:never s:scroll l:leave m:move';
                var optionsDefaultsAndTemplate = {
                    className: ['os-theme-dark', classNameAllowedValues],                //null || string
                    resize: ['none', resizeAllowedValues],                               //none || both  || horizontal || vertical || n || b || h || v
                    sizeAutoCapable: booleanTrueTemplate,                                //true || false
                    clipAlways: booleanTrueTemplate,                                     //true || false
                    normalizeRTL: booleanTrueTemplate,                                   //true || false
                    paddingAbsolute: booleanFalseTemplate,                               //true || false
                    autoUpdate: [null, booleanNullAllowedValues],                        //true || false || null
                    autoUpdateInterval: [33, numberAllowedValues],                       //number
                    updateOnLoad: updateOnLoadTemplate,                                  //string || array || null
                    nativeScrollbarsOverlaid: {
                        showNativeScrollbars: booleanFalseTemplate,                      //true || false
                        initialize: booleanTrueTemplate                                  //true || false
                    },
                    overflowBehavior: {
                        x: ['scroll', overflowBehaviorAllowedValues],                    //visible-hidden  || visible-scroll || hidden || scroll || v-h || v-s || h || s
                        y: ['scroll', overflowBehaviorAllowedValues]                     //visible-hidden  || visible-scroll || hidden || scroll || v-h || v-s || h || s
                    },
                    scrollbars: {
                        visibility: ['auto', scrollbarsVisibilityAllowedValues],         //visible || hidden || auto || v || h || a
                        autoHide: ['never', scrollbarsAutoHideAllowedValues],            //never || scroll || leave || move || n || s || l || m
                        autoHideDelay: [800, numberAllowedValues],                       //number
                        dragScrolling: booleanTrueTemplate,                              //true || false
                        clickScrolling: booleanFalseTemplate,                            //true || false
                        touchSupport: booleanTrueTemplate,                               //true || false
                        snapHandle: booleanFalseTemplate                                 //true || false
                    },
                    textarea: {
                        dynWidth: booleanFalseTemplate,                                  //true || false
                        dynHeight: booleanFalseTemplate,                                 //true || false
                        inheritedAttrs: inheritedAttrsTemplate                           //string || array || null
                    },
                    callbacks: {
                        onInitialized: callbackTemplate,                                 //null || function
                        onInitializationWithdrawn: callbackTemplate,                     //null || function
                        onDestroyed: callbackTemplate,                                   //null || function
                        onScrollStart: callbackTemplate,                                 //null || function
                        onScroll: callbackTemplate,                                      //null || function
                        onScrollStop: callbackTemplate,                                  //null || function
                        onOverflowChanged: callbackTemplate,                             //null || function
                        onOverflowAmountChanged: callbackTemplate,                       //null || function
                        onDirectionChanged: callbackTemplate,                            //null || function
                        onContentSizeChanged: callbackTemplate,                          //null || function
                        onHostSizeChanged: callbackTemplate,                             //null || function
                        onUpdated: callbackTemplate                                      //null || function
                    }
                };
                var convert = function (template) {
                    var recursive = function (obj) {
                        var key;
                        var val;
                        var valType;
                        for (key in obj) {
                            if (!obj[LEXICON.hOP](key))
                                continue;
                            val = obj[key];
                            valType = type(val);
                            if (valType == TYPES.a)
                                obj[key] = val[template ? 1 : 0];
                            else if (valType == TYPES.o)
                                obj[key] = recursive(val);
                        }
                        return obj;
                    };
                    return recursive(FRAMEWORK.extend(true, {}, optionsDefaultsAndTemplate));
                };

                return {
                    _defaults: convert(),

                    _template: convert(true),

                    /**
                     * Validates the passed object by the passed template.
                     * @param obj The object which shall be validated.
                     * @param template The template which defines the allowed values and types.
                     * @param writeErrors True if errors shall be logged to the console.
                     * @param diffObj If a object is passed then only valid differences to this object will be returned.
                     * @returns {{}} A object which contains two objects called "default" and "prepared" which contains only the valid properties of the passed original object and discards not different values compared to the passed diffObj.
                     */
                    _validate: function (obj, template, writeErrors, diffObj) {
                        var validatedOptions = {};
                        var validatedOptionsPrepared = {};
                        var objectCopy = FRAMEWORK.extend(true, {}, obj);
                        var inArray = FRAMEWORK.inArray;
                        var isEmptyObj = FRAMEWORK.isEmptyObject;
                        var checkObjectProps = function (data, template, diffData, validatedOptions, validatedOptionsPrepared, prevPropName) {
                            for (var prop in template) {
                                if (template[LEXICON.hOP](prop) && data[LEXICON.hOP](prop)) {
                                    var isValid = false;
                                    var isDiff = false;
                                    var templateValue = template[prop];
                                    var templateValueType = type(templateValue);
                                    var templateIsComplex = templateValueType == TYPES.o;
                                    var templateTypes = !COMPATIBILITY.isA(templateValue) ? [templateValue] : templateValue;
                                    var dataDiffValue = diffData[prop];
                                    var dataValue = data[prop];
                                    var dataValueType = type(dataValue);
                                    var propPrefix = prevPropName ? prevPropName + '.' : '';
                                    var error = "The option \"" + propPrefix + prop + "\" wasn't set, because";
                                    var errorPossibleTypes = [];
                                    var errorRestrictedStrings = [];
                                    var restrictedStringValuesSplit;
                                    var restrictedStringValuesPossibilitiesSplit;
                                    var isRestrictedValue;
                                    var mainPossibility;
                                    var currType;
                                    var i;
                                    var v;
                                    var j;

                                    dataDiffValue = dataDiffValue === undefined ? {} : dataDiffValue;

                                    //if the template has a object as value, it means that the options are complex (verschachtelt)
                                    if (templateIsComplex && dataValueType == TYPES.o) {
                                        validatedOptions[prop] = {};
                                        validatedOptionsPrepared[prop] = {};
                                        checkObjectProps(dataValue, templateValue, dataDiffValue, validatedOptions[prop], validatedOptionsPrepared[prop], propPrefix + prop);
                                        FRAMEWORK.each([data, validatedOptions, validatedOptionsPrepared], function (index, value) {
                                            if (isEmptyObj(value[prop])) {
                                                delete value[prop];
                                            }
                                        });
                                    }
                                    else if (!templateIsComplex) {
                                        for (i = 0; i < templateTypes[LEXICON.l]; i++) {
                                            currType = templateTypes[i];
                                            templateValueType = type(currType);
                                            //if currtype is string and starts with restrictedStringPrefix and end with restrictedStringSuffix
                                            isRestrictedValue = templateValueType == TYPES.s && inArray(currType, possibleTemplateTypes) === -1;
                                            if (isRestrictedValue) {
                                                errorPossibleTypes.push(TYPES.s);

                                                //split it into a array which contains all possible values for example: ["y:yes", "n:no", "m:maybe"]
                                                restrictedStringValuesSplit = currType.split(restrictedStringsSplit);
                                                errorRestrictedStrings = errorRestrictedStrings.concat(restrictedStringValuesSplit);
                                                for (v = 0; v < restrictedStringValuesSplit[LEXICON.l]; v++) {
                                                    //split the possible values into their possibiliteis for example: ["y", "yes"] -> the first is always the mainPossibility
                                                    restrictedStringValuesPossibilitiesSplit = restrictedStringValuesSplit[v].split(restrictedStringsPossibilitiesSplit);
                                                    mainPossibility = restrictedStringValuesPossibilitiesSplit[0];
                                                    for (j = 0; j < restrictedStringValuesPossibilitiesSplit[LEXICON.l]; j++) {
                                                        //if any possibility matches with the dataValue, its valid
                                                        if (dataValue === restrictedStringValuesPossibilitiesSplit[j]) {
                                                            isValid = true;
                                                            break;
                                                        }
                                                    }
                                                    if (isValid)
                                                        break;
                                                }
                                            }
                                            else {
                                                errorPossibleTypes.push(currType);

                                                if (dataValueType === currType) {
                                                    isValid = true;
                                                    break;
                                                }
                                            }
                                        }

                                        if (isValid) {
                                            isDiff = dataValue !== dataDiffValue;

                                            if (isDiff)
                                                validatedOptions[prop] = dataValue;

                                            if (isRestrictedValue ? inArray(dataDiffValue, restrictedStringValuesPossibilitiesSplit) < 0 : isDiff)
                                                validatedOptionsPrepared[prop] = isRestrictedValue ? mainPossibility : dataValue;
                                        }
                                        else if (writeErrors) {
                                            console.warn(error + " it doesn't accept the type [ " + dataValueType.toUpperCase() + " ] with the value of \"" + dataValue + "\".\r\n" +
                                                "Accepted types are: [ " + errorPossibleTypes.join(', ').toUpperCase() + " ]." +
                                                (errorRestrictedStrings[length] > 0 ? "\r\nValid strings are: [ " + errorRestrictedStrings.join(', ').split(restrictedStringsPossibilitiesSplit).join(', ') + " ]." : ''));
                                        }
                                        delete data[prop];
                                    }
                                }
                            }
                        };
                        checkObjectProps(objectCopy, template, diffObj || {}, validatedOptions, validatedOptionsPrepared);

                        //add values which aren't specified in the template to the finished validated object to prevent them from being discarded
                        /*
                        if(keepForeignProps) {
                            FRAMEWORK.extend(true, validatedOptions, objectCopy);
                            FRAMEWORK.extend(true, validatedOptionsPrepared, objectCopy);
                        }
                        */

                        if (!isEmptyObj(objectCopy) && writeErrors)
                            console.warn('The following options are discarded due to invalidity:\r\n' + window.JSON.stringify(objectCopy, null, 2));

                        return {
                            _default: validatedOptions,
                            _prepared: validatedOptionsPrepared
                        };
                    }
                }
            }());

            /**
             * Initializes the object which contains global information about the plugin and each instance of it.
             */
            function initOverlayScrollbarsStatics() {
                if (!_pluginsGlobals)
                    _pluginsGlobals = new OverlayScrollbarsGlobals(_pluginsOptions._defaults);
                if (!_pluginsAutoUpdateLoop)
                    _pluginsAutoUpdateLoop = new OverlayScrollbarsAutoUpdateLoop(_pluginsGlobals);
            }

            /**
             * The global object for the OverlayScrollbars objects. It contains resources which every OverlayScrollbars object needs. This object is initialized only once: if the first OverlayScrollbars object gets initialized.
             * @param defaultOptions
             * @constructor
             */
            function OverlayScrollbarsGlobals(defaultOptions) {
                var _base = this;
                var strOverflow = 'overflow';
                var strHidden = 'hidden';
                var strScroll = 'scroll';
                var bodyElement = FRAMEWORK('body');
                var scrollbarDummyElement = FRAMEWORK('<div id="os-dummy-scrollbar-size"><div></div></div>');
                var scrollbarDummyElement0 = scrollbarDummyElement[0];
                var dummyContainerChild = FRAMEWORK(scrollbarDummyElement.children('div').eq(0));

                bodyElement.append(scrollbarDummyElement);
                scrollbarDummyElement.hide().show(); //fix IE8 bug (incorrect measuring)

                var nativeScrollbarSize = calcNativeScrollbarSize(scrollbarDummyElement0);
                var nativeScrollbarIsOverlaid = {
                    x: nativeScrollbarSize.x === 0,
                    y: nativeScrollbarSize.y === 0
                };
                var msie = (function () {
                    var ua = window.navigator.userAgent;
                    var strIndexOf = 'indexOf';
                    var strSubString = 'substring';
                    var msie = ua[strIndexOf]('MSIE ');
                    var trident = ua[strIndexOf]('Trident/');
                    var edge = ua[strIndexOf]('Edge/');
                    var rv = ua[strIndexOf]('rv:');
                    var result;
                    var parseIntFunc = parseInt;

                    // IE 10 or older => return version number
                    if (msie > 0)
                        result = parseIntFunc(ua[strSubString](msie + 5, ua[strIndexOf]('.', msie)), 10);

                    // IE 11 => return version number
                    else if (trident > 0)
                        result = parseIntFunc(ua[strSubString](rv + 3, ua[strIndexOf]('.', rv)), 10);

                    // Edge (IE 12+) => return version number
                    else if (edge > 0)
                        result = parseIntFunc(ua[strSubString](edge + 5, ua[strIndexOf]('.', edge)), 10);

                    // other browser
                    return result;
                })();

                FRAMEWORK.extend(_base, {
                    defaultOptions: defaultOptions,
                    msie: msie,
                    autoUpdateLoop: false,
                    autoUpdateRecommended: !COMPATIBILITY.mO(),
                    nativeScrollbarSize: nativeScrollbarSize,
                    nativeScrollbarIsOverlaid: nativeScrollbarIsOverlaid,
                    nativeScrollbarStyling: (function () {
                        var result = false;
                        scrollbarDummyElement.addClass('os-viewport-native-scrollbars-invisible');
                        try {
                            result = (scrollbarDummyElement.css('scrollbar-width') === 'none' && (msie > 9 || !msie)) || window.getComputedStyle(scrollbarDummyElement0, '::-webkit-scrollbar').getPropertyValue('display') === 'none';
                        } catch (ex) { }

                        //fix opera bug: scrollbar styles will only appear if overflow value is scroll or auto during the activation of the style.
                        //and set overflow to scroll
                        //scrollbarDummyElement.css(strOverflow, strHidden).hide().css(strOverflow, strScroll).show();
                        //return (scrollbarDummyElement0[LEXICON.oH] - scrollbarDummyElement0[LEXICON.cH]) === 0 && (scrollbarDummyElement0[LEXICON.oW] - scrollbarDummyElement0[LEXICON.cW]) === 0;

                        return result;
                    })(),
                    overlayScrollbarDummySize: { x: 30, y: 30 },
                    cssCalc: VENDORS._cssPropertyValue('width', 'calc', '(1px)') || null,
                    restrictedMeasuring: (function () {
                        //https://bugzilla.mozilla.org/show_bug.cgi?id=1439305
                        //since 1.11.0 always false -> fixed via CSS (hopefully)
                        scrollbarDummyElement.css(strOverflow, strHidden);
                        var scrollSize = {
                            w: scrollbarDummyElement0[LEXICON.sW],
                            h: scrollbarDummyElement0[LEXICON.sH]
                        };
                        scrollbarDummyElement.css(strOverflow, 'visible');
                        var scrollSize2 = {
                            w: scrollbarDummyElement0[LEXICON.sW],
                            h: scrollbarDummyElement0[LEXICON.sH]
                        };
                        return (scrollSize.w - scrollSize2.w) !== 0 || (scrollSize.h - scrollSize2.h) !== 0;
                    })(),
                    rtlScrollBehavior: (function () {
                        scrollbarDummyElement.css({ 'overflow-y': strHidden, 'overflow-x': strScroll, 'direction': 'rtl' }).scrollLeft(0);
                        var dummyContainerOffset = scrollbarDummyElement.offset();
                        var dummyContainerChildOffset = dummyContainerChild.offset();
                        //https://github.com/KingSora/OverlayScrollbars/issues/187
                        scrollbarDummyElement.scrollLeft(-999);
                        var dummyContainerChildOffsetAfterScroll = dummyContainerChild.offset();
                        return {
                            //origin direction = determines if the zero scroll position is on the left or right side
                            //'i' means 'invert' (i === true means that the axis must be inverted to be correct)
                            //true = on the left side
                            //false = on the right side
                            i: dummyContainerOffset.left === dummyContainerChildOffset.left,
                            //negative = determines if the maximum scroll is positive or negative
                            //'n' means 'negate' (n === true means that the axis must be negated to be correct)
                            //true = negative
                            //false = positive
                            n: dummyContainerChildOffset.left !== dummyContainerChildOffsetAfterScroll.left
                        };
                    })(),
                    supportTransform: !!VENDORS._cssProperty('transform'),
                    supportTransition: !!VENDORS._cssProperty('transition'),
                    supportPassiveEvents: (function () {
                        var supportsPassive = false;
                        try {
                            window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
                                get: function () {
                                    supportsPassive = true;
                                }
                            }));
                        } catch (e) { }
                        return supportsPassive;
                    })(),
                    supportResizeObserver: !!COMPATIBILITY.rO(),
                    supportMutationObserver: !!COMPATIBILITY.mO()
                });

                scrollbarDummyElement.removeAttr(LEXICON.s).remove();

                //Catch zoom event:
                (function () {
                    if (nativeScrollbarIsOverlaid.x && nativeScrollbarIsOverlaid.y)
                        return;

                    var abs = MATH.abs;
                    var windowWidth = COMPATIBILITY.wW();
                    var windowHeight = COMPATIBILITY.wH();
                    var windowDpr = getWindowDPR();
                    var onResize = function () {
                        if (INSTANCES().length > 0) {
                            var newW = COMPATIBILITY.wW();
                            var newH = COMPATIBILITY.wH();
                            var deltaW = newW - windowWidth;
                            var deltaH = newH - windowHeight;

                            if (deltaW === 0 && deltaH === 0)
                                return;

                            var deltaWRatio = MATH.round(newW / (windowWidth / 100.0));
                            var deltaHRatio = MATH.round(newH / (windowHeight / 100.0));
                            var absDeltaW = abs(deltaW);
                            var absDeltaH = abs(deltaH);
                            var absDeltaWRatio = abs(deltaWRatio);
                            var absDeltaHRatio = abs(deltaHRatio);
                            var newDPR = getWindowDPR();

                            var deltaIsBigger = absDeltaW > 2 && absDeltaH > 2;
                            var difference = !differenceIsBiggerThanOne(absDeltaWRatio, absDeltaHRatio);
                            var dprChanged = newDPR !== windowDpr && windowDpr > 0;
                            var isZoom = deltaIsBigger && difference && dprChanged;
                            var oldScrollbarSize = _base.nativeScrollbarSize;
                            var newScrollbarSize;

                            if (isZoom) {
                                bodyElement.append(scrollbarDummyElement);
                                newScrollbarSize = _base.nativeScrollbarSize = calcNativeScrollbarSize(scrollbarDummyElement[0]);
                                scrollbarDummyElement.remove();
                                if (oldScrollbarSize.x !== newScrollbarSize.x || oldScrollbarSize.y !== newScrollbarSize.y) {
                                    FRAMEWORK.each(INSTANCES(), function () {
                                        if (INSTANCES(this))
                                            INSTANCES(this).update('zoom');
                                    });
                                }
                            }

                            windowWidth = newW;
                            windowHeight = newH;
                            windowDpr = newDPR;
                        }
                    };

                    function differenceIsBiggerThanOne(valOne, valTwo) {
                        var absValOne = abs(valOne);
                        var absValTwo = abs(valTwo);
                        return !(absValOne === absValTwo || absValOne + 1 === absValTwo || absValOne - 1 === absValTwo);
                    }

                    function getWindowDPR() {
                        var dDPI = window.screen.deviceXDPI || 0;
                        var sDPI = window.screen.logicalXDPI || 1;
                        return window.devicePixelRatio || (dDPI / sDPI);
                    }

                    FRAMEWORK(window).on('resize', onResize);
                })();

                function calcNativeScrollbarSize(measureElement) {
                    return {
                        x: measureElement[LEXICON.oH] - measureElement[LEXICON.cH],
                        y: measureElement[LEXICON.oW] - measureElement[LEXICON.cW]
                    };
                }
            }

            /**
             * The object which manages the auto update loop for all OverlayScrollbars objects. This object is initialized only once: if the first OverlayScrollbars object gets initialized.
             * @constructor
             */
            function OverlayScrollbarsAutoUpdateLoop(globals) {
                var _base = this;
                var _inArray = FRAMEWORK.inArray;
                var _getNow = COMPATIBILITY.now;
                var _strAutoUpdate = 'autoUpdate';
                var _strAutoUpdateInterval = _strAutoUpdate + 'Interval';
                var _strLength = LEXICON.l;
                var _loopingInstances = [];
                var _loopingInstancesIntervalCache = [];
                var _loopIsActive = false;
                var _loopIntervalDefault = 33;
                var _loopInterval = _loopIntervalDefault;
                var _loopTimeOld = _getNow();
                var _loopID;


                /**
                 * The auto update loop which will run every 50 milliseconds or less if the update interval of a instance is lower than 50 milliseconds.
                 */
                var loop = function () {
                    if (_loopingInstances[_strLength] > 0 && _loopIsActive) {
                        _loopID = COMPATIBILITY.rAF()(function () {
                            loop();
                        });
                        var timeNew = _getNow();
                        var timeDelta = timeNew - _loopTimeOld;
                        var lowestInterval;
                        var instance;
                        var instanceOptions;
                        var instanceAutoUpdateAllowed;
                        var instanceAutoUpdateInterval;
                        var now;

                        if (timeDelta > _loopInterval) {
                            _loopTimeOld = timeNew - (timeDelta % _loopInterval);
                            lowestInterval = _loopIntervalDefault;
                            for (var i = 0; i < _loopingInstances[_strLength]; i++) {
                                instance = _loopingInstances[i];
                                if (instance !== undefined) {
                                    instanceOptions = instance.options();
                                    instanceAutoUpdateAllowed = instanceOptions[_strAutoUpdate];
                                    instanceAutoUpdateInterval = MATH.max(1, instanceOptions[_strAutoUpdateInterval]);
                                    now = _getNow();

                                    if ((instanceAutoUpdateAllowed === true || instanceAutoUpdateAllowed === null) && (now - _loopingInstancesIntervalCache[i]) > instanceAutoUpdateInterval) {
                                        instance.update('auto');
                                        _loopingInstancesIntervalCache[i] = new Date(now += instanceAutoUpdateInterval);
                                    }

                                    lowestInterval = MATH.max(1, MATH.min(lowestInterval, instanceAutoUpdateInterval));
                                }
                            }
                            _loopInterval = lowestInterval;
                        }
                    } else {
                        _loopInterval = _loopIntervalDefault;
                    }
                };

                /**
                 * Add OverlayScrollbars instance to the auto update loop. Only successful if the instance isn't already added.
                 * @param instance The instance which shall be updated in a loop automatically.
                 */
                _base.add = function (instance) {
                    if (_inArray(instance, _loopingInstances) === -1) {
                        _loopingInstances.push(instance);
                        _loopingInstancesIntervalCache.push(_getNow());
                        if (_loopingInstances[_strLength] > 0 && !_loopIsActive) {
                            _loopIsActive = true;
                            globals.autoUpdateLoop = _loopIsActive;
                            loop();
                        }
                    }
                };

                /**
                 * Remove OverlayScrollbars instance from the auto update loop. Only successful if the instance was added before.
                 * @param instance The instance which shall be updated in a loop automatically.
                 */
                _base.remove = function (instance) {
                    var index = _inArray(instance, _loopingInstances);
                    if (index > -1) {
                        //remove from loopingInstances list
                        _loopingInstancesIntervalCache.splice(index, 1);
                        _loopingInstances.splice(index, 1);

                        //correct update loop behavior
                        if (_loopingInstances[_strLength] === 0 && _loopIsActive) {
                            _loopIsActive = false;
                            globals.autoUpdateLoop = _loopIsActive;
                            if (_loopID !== undefined) {
                                COMPATIBILITY.cAF()(_loopID);
                                _loopID = -1;
                            }
                        }
                    }
                };
            }

            /**
             * A object which manages the scrollbars visibility of the target element.
             * @param pluginTargetElement The element from which the scrollbars shall be hidden.
             * @param options The custom options.
             * @param extensions The custom extensions.
             * @param globals
             * @param autoUpdateLoop
             * @returns {*}
             * @constructor
             */
            function OverlayScrollbarsInstance(pluginTargetElement, options, extensions, globals, autoUpdateLoop) {
                //shortcuts
                var type = COMPATIBILITY.type;
                var inArray = FRAMEWORK.inArray;
                var each = FRAMEWORK.each;

                //make correct instanceof
                var _base = new _plugin();
                var _frameworkProto = FRAMEWORK[LEXICON.p];

                //if passed element is no HTML element: skip and return
                if (!isHTMLElement(pluginTargetElement))
                    return;

                //if passed element is already initialized: set passed options if there are any and return its instance
                if (INSTANCES(pluginTargetElement)) {
                    var inst = INSTANCES(pluginTargetElement);
                    inst.options(options);
                    return inst;
                }

                //globals:
                var _nativeScrollbarIsOverlaid;
                var _overlayScrollbarDummySize;
                var _rtlScrollBehavior;
                var _autoUpdateRecommended;
                var _msieVersion;
                var _nativeScrollbarStyling;
                var _cssCalc;
                var _nativeScrollbarSize;
                var _supportTransition;
                var _supportTransform;
                var _supportPassiveEvents;
                var _supportResizeObserver;
                var _supportMutationObserver;
                var _restrictedMeasuring;

                //general readonly:
                var _initialized;
                var _destroyed;
                var _isTextarea;
                var _isBody;
                var _documentMixed;
                var _domExists;

                //general:
                var _isBorderBox;
                var _sizeAutoObserverAdded;
                var _paddingX;
                var _paddingY;
                var _borderX;
                var _borderY;
                var _marginX;
                var _marginY;
                var _isRTL;
                var _sleeping;
                var _contentBorderSize = {};
                var _scrollHorizontalInfo = {};
                var _scrollVerticalInfo = {};
                var _viewportSize = {};
                var _nativeScrollbarMinSize = {};

                //naming:	
                var _strMinusHidden = '-hidden';
                var _strMarginMinus = 'margin-';
                var _strPaddingMinus = 'padding-';
                var _strBorderMinus = 'border-';
                var _strTop = 'top';
                var _strRight = 'right';
                var _strBottom = 'bottom';
                var _strLeft = 'left';
                var _strMinMinus = 'min-';
                var _strMaxMinus = 'max-';
                var _strWidth = 'width';
                var _strHeight = 'height';
                var _strFloat = 'float';
                var _strEmpty = '';
                var _strAuto = 'auto';
                var _strSync = 'sync';
                var _strScroll = 'scroll';
                var _strHundredPercent = '100%';
                var _strX = 'x';
                var _strY = 'y';
                var _strDot = '.';
                var _strSpace = ' ';
                var _strScrollbar = 'scrollbar';
                var _strMinusHorizontal = '-horizontal';
                var _strMinusVertical = '-vertical';
                var _strScrollLeft = _strScroll + 'Left';
                var _strScrollTop = _strScroll + 'Top';
                var _strMouseTouchDownEvent = 'mousedown touchstart';
                var _strMouseTouchUpEvent = 'mouseup touchend touchcancel';
                var _strMouseTouchMoveEvent = 'mousemove touchmove';
                var _strMouseEnter = 'mouseenter';
                var _strMouseLeave = 'mouseleave';
                var _strKeyDownEvent = 'keydown';
                var _strKeyUpEvent = 'keyup';
                var _strSelectStartEvent = 'selectstart';
                var _strTransitionEndEvent = 'transitionend webkitTransitionEnd oTransitionEnd';
                var _strResizeObserverProperty = '__overlayScrollbarsRO__';

                //class names:	
                var _cassNamesPrefix = 'os-';
                var _classNameHTMLElement = _cassNamesPrefix + 'html';
                var _classNameHostElement = _cassNamesPrefix + 'host';
                var _classNameHostElementForeign = _classNameHostElement + '-foreign';
                var _classNameHostTextareaElement = _classNameHostElement + '-textarea';
                var _classNameHostScrollbarHorizontalHidden = _classNameHostElement + '-' + _strScrollbar + _strMinusHorizontal + _strMinusHidden;
                var _classNameHostScrollbarVerticalHidden = _classNameHostElement + '-' + _strScrollbar + _strMinusVertical + _strMinusHidden;
                var _classNameHostTransition = _classNameHostElement + '-transition';
                var _classNameHostRTL = _classNameHostElement + '-rtl';
                var _classNameHostResizeDisabled = _classNameHostElement + '-resize-disabled';
                var _classNameHostScrolling = _classNameHostElement + '-scrolling';
                var _classNameHostOverflow = _classNameHostElement + '-overflow';
                var _classNameHostOverflow = _classNameHostElement + '-overflow';
                var _classNameHostOverflowX = _classNameHostOverflow + '-x';
                var _classNameHostOverflowY = _classNameHostOverflow + '-y';
                var _classNameTextareaElement = _cassNamesPrefix + 'textarea';
                var _classNameTextareaCoverElement = _classNameTextareaElement + '-cover';
                var _classNamePaddingElement = _cassNamesPrefix + 'padding';
                var _classNameViewportElement = _cassNamesPrefix + 'viewport';
                var _classNameViewportNativeScrollbarsInvisible = _classNameViewportElement + '-native-scrollbars-invisible';
                var _classNameViewportNativeScrollbarsOverlaid = _classNameViewportElement + '-native-scrollbars-overlaid';
                var _classNameContentElement = _cassNamesPrefix + 'content';
                var _classNameContentArrangeElement = _cassNamesPrefix + 'content-arrange';
                var _classNameContentGlueElement = _cassNamesPrefix + 'content-glue';
                var _classNameSizeAutoObserverElement = _cassNamesPrefix + 'size-auto-observer';
                var _classNameResizeObserverElement = _cassNamesPrefix + 'resize-observer';
                var _classNameResizeObserverItemElement = _cassNamesPrefix + 'resize-observer-item';
                var _classNameResizeObserverItemFinalElement = _classNameResizeObserverItemElement + '-final';
                var _classNameTextInherit = _cassNamesPrefix + 'text-inherit';
                var _classNameScrollbar = _cassNamesPrefix + _strScrollbar;
                var _classNameScrollbarTrack = _classNameScrollbar + '-track';
                var _classNameScrollbarTrackOff = _classNameScrollbarTrack + '-off';
                var _classNameScrollbarHandle = _classNameScrollbar + '-handle';
                var _classNameScrollbarHandleOff = _classNameScrollbarHandle + '-off';
                var _classNameScrollbarUnusable = _classNameScrollbar + '-unusable';
                var _classNameScrollbarAutoHidden = _classNameScrollbar + '-' + _strAuto + _strMinusHidden;
                var _classNameScrollbarCorner = _classNameScrollbar + '-corner';
                var _classNameScrollbarCornerResize = _classNameScrollbarCorner + '-resize';
                var _classNameScrollbarCornerResizeB = _classNameScrollbarCornerResize + '-both';
                var _classNameScrollbarCornerResizeH = _classNameScrollbarCornerResize + _strMinusHorizontal;
                var _classNameScrollbarCornerResizeV = _classNameScrollbarCornerResize + _strMinusVertical;
                var _classNameScrollbarHorizontal = _classNameScrollbar + _strMinusHorizontal;
                var _classNameScrollbarVertical = _classNameScrollbar + _strMinusVertical;
                var _classNameDragging = _cassNamesPrefix + 'dragging';
                var _classNameThemeNone = _cassNamesPrefix + 'theme-none';
                var _classNamesDynamicDestroy = [
                    _classNameViewportNativeScrollbarsInvisible,
                    _classNameViewportNativeScrollbarsOverlaid,
                    _classNameScrollbarTrackOff,
                    _classNameScrollbarHandleOff,
                    _classNameScrollbarUnusable,
                    _classNameScrollbarAutoHidden,
                    _classNameScrollbarCornerResize,
                    _classNameScrollbarCornerResizeB,
                    _classNameScrollbarCornerResizeH,
                    _classNameScrollbarCornerResizeV,
                    _classNameDragging].join(_strSpace);

                //callbacks:	
                var _callbacksInitQeueue = [];

                //attrs viewport shall inherit from target	
                var _viewportAttrsFromTarget = [LEXICON.ti];

                //options:	
                var _defaultOptions;
                var _currentOptions;
                var _currentPreparedOptions;

                //extensions:	
                var _extensions = {};
                var _extensionsPrivateMethods = 'added removed on contract';

                //update	
                var _lastUpdateTime;
                var _swallowedUpdateHints = {};
                var _swallowedUpdateTimeout;
                var _swallowUpdateLag = 42;
                var _updateOnLoadEventName = 'load';
                var _updateOnLoadElms = [];

                //DOM elements:	
                var _windowElement;
                var _documentElement;
                var _htmlElement;
                var _bodyElement;
                var _targetElement;                     //the target element of this OverlayScrollbars object	
                var _hostElement;                       //the host element of this OverlayScrollbars object -> may be the same as targetElement	
                var _sizeAutoObserverElement;           //observes size auto changes	
                var _sizeObserverElement;               //observes size and padding changes	
                var _paddingElement;                    //manages the padding	
                var _viewportElement;                   //is the viewport of our scrollbar model	
                var _contentElement;                    //the element which holds the content	
                var _contentArrangeElement;             //is needed for correct sizing of the content element (only if native scrollbars are overlays)	
                var _contentGlueElement;                //has always the size of the content element	
                var _textareaCoverElement;              //only applied if target is a textarea element. Used for correct size calculation and for prevention of uncontrolled scrolling	
                var _scrollbarCornerElement;
                var _scrollbarHorizontalElement;
                var _scrollbarHorizontalTrackElement;
                var _scrollbarHorizontalHandleElement;
                var _scrollbarVerticalElement;
                var _scrollbarVerticalTrackElement;
                var _scrollbarVerticalHandleElement;
                var _windowElementNative;
                var _documentElementNative;
                var _targetElementNative;
                var _hostElementNative;
                var _sizeAutoObserverElementNative;
                var _sizeObserverElementNative;
                var _paddingElementNative;
                var _viewportElementNative;
                var _contentElementNative;

                //Cache:	
                var _hostSizeCache;
                var _contentScrollSizeCache;
                var _arrangeContentSizeCache;
                var _hasOverflowCache;
                var _hideOverflowCache;
                var _widthAutoCache;
                var _heightAutoCache;
                var _cssBoxSizingCache;
                var _cssPaddingCache;
                var _cssBorderCache;
                var _cssMarginCache;
                var _cssDirectionCache;
                var _cssDirectionDetectedCache;
                var _paddingAbsoluteCache;
                var _clipAlwaysCache;
                var _contentGlueSizeCache;
                var _overflowBehaviorCache;
                var _overflowAmountCache;
                var _ignoreOverlayScrollbarHidingCache;
                var _autoUpdateCache;
                var _sizeAutoCapableCache;
                var _contentElementScrollSizeChangeDetectedCache;
                var _hostElementSizeChangeDetectedCache;
                var _scrollbarsVisibilityCache;
                var _scrollbarsAutoHideCache;
                var _scrollbarsClickScrollingCache;
                var _scrollbarsDragScrollingCache;
                var _resizeCache;
                var _normalizeRTLCache;
                var _classNameCache;
                var _oldClassName;
                var _textareaAutoWrappingCache;
                var _textareaInfoCache;
                var _textareaSizeCache;
                var _textareaDynHeightCache;
                var _textareaDynWidthCache;
                var _bodyMinSizeCache;
                var _updateAutoCache = {};

                //MutationObserver:	
                var _mutationObserverHost;
                var _mutationObserverContent;
                var _mutationObserverHostCallback;
                var _mutationObserverContentCallback;
                var _mutationObserversConnected;
                var _mutationObserverAttrsTextarea = ['wrap', 'cols', 'rows'];
                var _mutationObserverAttrsHost = [LEXICON.i, LEXICON.c, LEXICON.s, 'open'].concat(_viewportAttrsFromTarget);

                //events:	
                var _destroyEvents = [];

                //textarea:	
                var _textareaHasFocus;

                //scrollbars:	
                var _scrollbarsAutoHideTimeoutId;
                var _scrollbarsAutoHideMoveTimeoutId;
                var _scrollbarsAutoHideDelay;
                var _scrollbarsAutoHideNever;
                var _scrollbarsAutoHideScroll;
                var _scrollbarsAutoHideMove;
                var _scrollbarsAutoHideLeave;
                var _scrollbarsHandleHovered;
                var _scrollbarsHandlesDefineScrollPos;

                //resize	
                var _resizeNone;
                var _resizeBoth;
                var _resizeHorizontal;
                var _resizeVertical;


                //==== Event Listener ====//	

                /**	
                 * Adds or removes a event listener from the given element. 	
                 * @param element The element to which the event listener shall be applied or removed.	
                 * @param eventNames The name(s) of the events.	
                 * @param listener The method which shall be called.	
                 * @param remove True if the handler shall be removed, false or undefined if the handler shall be added.	
                 * @param passiveOrOptions The options for the event.
                 */
                function setupResponsiveEventListener(element, eventNames, listener, remove, passiveOrOptions) {
                    var collected = COMPATIBILITY.isA(eventNames) && COMPATIBILITY.isA(listener);
                    var method = remove ? 'removeEventListener' : 'addEventListener';
                    var onOff = remove ? 'off' : 'on';
                    var events = collected ? false : eventNames.split(_strSpace)
                    var i = 0;

                    var passiveOrOptionsIsObj = FRAMEWORK.isPlainObject(passiveOrOptions);
                    var passive = (_supportPassiveEvents && (passiveOrOptionsIsObj ? (passiveOrOptions._passive) : passiveOrOptions)) || false;
                    var capture = passiveOrOptionsIsObj && (passiveOrOptions._capture || false);
                    var nativeParam = _supportPassiveEvents ? {
                        passive: passive,
                        capture: capture,
                    } : capture;

                    if (collected) {
                        for (; i < eventNames[LEXICON.l]; i++)
                            setupResponsiveEventListener(element, eventNames[i], listener[i], remove, passiveOrOptions);
                    }
                    else {
                        for (; i < events[LEXICON.l]; i++) {
                            if(_supportPassiveEvents) {
                                element[0][method](events[i], listener, nativeParam);
                            }
                            else {
                                element[onOff](events[i], listener);
                            }     
                        }
                    }
                }


                function addDestroyEventListener(element, eventNames, listener, passive) {
                    setupResponsiveEventListener(element, eventNames, listener, false, passive);
                    _destroyEvents.push(COMPATIBILITY.bind(setupResponsiveEventListener, 0, element, eventNames, listener, true, passive));
                }

                //==== Resize Observer ====//

                /**
                 * Adds or removes a resize observer from the given element.
                 * @param targetElement The element to which the resize observer shall be added or removed.
                 * @param onElementResizedCallback The callback which is fired every time the resize observer registers a size change or false / undefined if the resizeObserver shall be removed.
                 */
                function setupResizeObserver(targetElement, onElementResizedCallback) {
                    if (targetElement) {
                        var resizeObserver = COMPATIBILITY.rO();
                        var strAnimationStartEvent = 'animationstart mozAnimationStart webkitAnimationStart MSAnimationStart';
                        var strChildNodes = 'childNodes';
                        var constScroll = 3333333;
                        var callback = function () {
                            targetElement[_strScrollTop](constScroll)[_strScrollLeft](_isRTL ? _rtlScrollBehavior.n ? -constScroll : _rtlScrollBehavior.i ? 0 : constScroll : constScroll);
                            onElementResizedCallback();
                        };
                        //add resize observer:
                        if (onElementResizedCallback) {
                            if (_supportResizeObserver) {
                                var element = targetElement.addClass('observed').append(generateDiv(_classNameResizeObserverElement)).contents()[0];
                                var observer = element[_strResizeObserverProperty] = new resizeObserver(callback);
                                observer.observe(element);
                            }
                            else {
                                if (_msieVersion > 9 || !_autoUpdateRecommended) {
                                    targetElement.prepend(
                                        generateDiv(_classNameResizeObserverElement,
                                            generateDiv({ c: _classNameResizeObserverItemElement, dir: 'ltr' },
                                                generateDiv(_classNameResizeObserverItemElement,
                                                    generateDiv(_classNameResizeObserverItemFinalElement)
                                                ) +
                                                generateDiv(_classNameResizeObserverItemElement,
                                                    generateDiv({ c: _classNameResizeObserverItemFinalElement, style: 'width: 200%; height: 200%' })
                                                )
                                            )
                                        )
                                    );

                                    var observerElement = targetElement[0][strChildNodes][0][strChildNodes][0];
                                    var shrinkElement = FRAMEWORK(observerElement[strChildNodes][1]);
                                    var expandElement = FRAMEWORK(observerElement[strChildNodes][0]);
                                    var expandElementChild = FRAMEWORK(expandElement[0][strChildNodes][0]);
                                    var widthCache = observerElement[LEXICON.oW];
                                    var heightCache = observerElement[LEXICON.oH];
                                    var isDirty;
                                    var rAFId;
                                    var currWidth;
                                    var currHeight;
                                    var factor = 2;
                                    var nativeScrollbarSize = globals.nativeScrollbarSize; //care don't make changes to this object!!!
                                    var reset = function () {
                                        /*
                                         var sizeResetWidth = observerElement[LEXICON.oW] + nativeScrollbarSize.x * factor + nativeScrollbarSize.y * factor + _overlayScrollbarDummySize.x + _overlayScrollbarDummySize.y;
                                         var sizeResetHeight = observerElement[LEXICON.oH] + nativeScrollbarSize.x * factor + nativeScrollbarSize.y * factor + _overlayScrollbarDummySize.x + _overlayScrollbarDummySize.y;
                                         var expandChildCSS = {};
                                         expandChildCSS[_strWidth] = sizeResetWidth;
                                         expandChildCSS[_strHeight] = sizeResetHeight;
                                         expandElementChild.css(expandChildCSS);


                                         expandElement[_strScrollLeft](sizeResetWidth)[_strScrollTop](sizeResetHeight);
                                         shrinkElement[_strScrollLeft](sizeResetWidth)[_strScrollTop](sizeResetHeight);
                                         */
                                        expandElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll);
                                        shrinkElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll);
                                    };
                                    var onResized = function () {
                                        rAFId = 0;
                                        if (!isDirty)
                                            return;

                                        widthCache = currWidth;
                                        heightCache = currHeight;
                                        callback();
                                    };
                                    var onScroll = function (event) {
                                        currWidth = observerElement[LEXICON.oW];
                                        currHeight = observerElement[LEXICON.oH];
                                        isDirty = currWidth != widthCache || currHeight != heightCache;

                                        if (event && isDirty && !rAFId) {
                                            COMPATIBILITY.cAF()(rAFId);
                                            rAFId = COMPATIBILITY.rAF()(onResized);
                                        }
                                        else if (!event)
                                            onResized();

                                        reset();
                                        if (event) {
                                            COMPATIBILITY.prvD(event);
                                            COMPATIBILITY.stpP(event);
                                        }
                                        return false;
                                    };
                                    var expandChildCSS = {};
                                    var observerElementCSS = {};

                                    setTopRightBottomLeft(observerElementCSS, _strEmpty, [
                                        -((nativeScrollbarSize.y + 1) * factor),
                                        nativeScrollbarSize.x * -factor,
                                        nativeScrollbarSize.y * -factor,
                                        -((nativeScrollbarSize.x + 1) * factor)
                                    ]);

                                    FRAMEWORK(observerElement).css(observerElementCSS);
                                    expandElement.on(_strScroll, onScroll);
                                    shrinkElement.on(_strScroll, onScroll);
                                    targetElement.on(strAnimationStartEvent, function () {
                                        onScroll(false);
                                    });
                                    //lets assume that the divs will never be that large and a constant value is enough
                                    expandChildCSS[_strWidth] = constScroll;
                                    expandChildCSS[_strHeight] = constScroll;
                                    expandElementChild.css(expandChildCSS);

                                    reset();
                                }
                                else {
                                    var attachEvent = _documentElementNative.attachEvent;
                                    var isIE = _msieVersion !== undefined;
                                    if (attachEvent) {
                                        targetElement.prepend(generateDiv(_classNameResizeObserverElement));
                                        findFirst(targetElement, _strDot + _classNameResizeObserverElement)[0].attachEvent('onresize', callback);
                                    }
                                    else {
                                        var obj = _documentElementNative.createElement(TYPES.o);
                                        obj.setAttribute(LEXICON.ti, '-1');
                                        obj.setAttribute(LEXICON.c, _classNameResizeObserverElement);
                                        obj.onload = function () {
                                            var wnd = this.contentDocument.defaultView;
                                            wnd.addEventListener('resize', callback);
                                            wnd.document.documentElement.style.display = 'none';
                                        };
                                        obj.type = 'text/html';
                                        if (isIE)
                                            targetElement.prepend(obj);
                                        obj.data = 'about:blank';
                                        if (!isIE)
                                            targetElement.prepend(obj);
                                        targetElement.on(strAnimationStartEvent, callback);
                                    }
                                }
                            }

                            if (targetElement[0] === _sizeObserverElementNative) {
                                var directionChanged = function () {
                                    var dir = _hostElement.css('direction');
                                    var css = {};
                                    var scrollLeftValue = 0;
                                    var result = false;
                                    if (dir !== _cssDirectionDetectedCache) {
                                        if (dir === 'ltr') {
                                            css[_strLeft] = 0;
                                            css[_strRight] = _strAuto;
                                            scrollLeftValue = constScroll;
                                        }
                                        else {
                                            css[_strLeft] = _strAuto;
                                            css[_strRight] = 0;
                                            scrollLeftValue = _rtlScrollBehavior.n ? -constScroll : _rtlScrollBehavior.i ? 0 : constScroll;
                                        }
                                        //execution order is important for IE!!!
                                        _sizeObserverElement.children().eq(0).css(css);
                                        _sizeObserverElement[_strScrollLeft](scrollLeftValue)[_strScrollTop](constScroll);
                                        _cssDirectionDetectedCache = dir;
                                        result = true;
                                    }
                                    return result;
                                };
                                directionChanged();
                                addDestroyEventListener(targetElement, _strScroll, function (event) {
                                    if (directionChanged())
                                        update();
                                    COMPATIBILITY.prvD(event);
                                    COMPATIBILITY.stpP(event);
                                    return false;
                                });
                            }
                        }
                        //remove resize observer:
                        else {
                            if (_supportResizeObserver) {
                                var element = targetElement.contents()[0];
                                var resizeObserverObj = element[_strResizeObserverProperty];
                                if (resizeObserverObj) {
                                    resizeObserverObj.disconnect();
                                    delete element[_strResizeObserverProperty];
                                }
                            }
                            else {
                                remove(targetElement.children(_strDot + _classNameResizeObserverElement).eq(0));
                            }
                        }
                    }
                }

                /**
                 * Freezes or unfreezes the given resize observer.
                 * @param targetElement The element to which the target resize observer is applied.
                 * @param freeze True if the resize observer shall be frozen, false otherwise.
                 
                function freezeResizeObserver(targetElement, freeze) {
                    if (targetElement !== undefined) {
                        if(freeze) {
                            if (_supportResizeObserver) {
                                var element = targetElement.contents()[0];
                                element[_strResizeObserverProperty].unobserve(element);
                            }
                            else {
                                targetElement = targetElement.children(_strDot + _classNameResizeObserverElement).eq(0);
                                var w = targetElement.css(_strWidth);
                                var h = targetElement.css(_strHeight);
                                var css = {};
                                css[_strWidth] = w;
                                css[_strHeight] = h;
                                targetElement.css(css);
                            }
                        }
                        else {
                            if (_supportResizeObserver) {
                                var element = targetElement.contents()[0];
                                element[_strResizeObserverProperty].observe(element);
                            }
                            else {
                                var css = { };
                                css[_strHeight] = _strEmpty;
                                css[_strWidth] = _strEmpty;
                                targetElement.children(_strDot + _classNameResizeObserverElement).eq(0).css(css);
                            }
                        }
                    }
                }
                */


                //==== Mutation Observers ====//

                /**
                 * Creates MutationObservers for the host and content Element if they are supported.
                 */
                function createMutationObservers() {
                    if (_supportMutationObserver) {
                        var mutationObserverContentLag = 11;
                        var mutationObserver = COMPATIBILITY.mO();
                        var contentLastUpdate = COMPATIBILITY.now();
                        var mutationTarget;
                        var mutationAttrName;
                        var mutationIsClass;
                        var oldMutationVal;
                        var newClassVal;
                        var hostClassNameRegex;
                        var contentTimeout;
                        var now;
                        var sizeAuto;
                        var action;

                        _mutationObserverHostCallback = function (mutations) {

                            var doUpdate = false;
                            var doUpdateForce = false;
                            var mutation;
                            var mutatedAttrs = [];

                            if (_initialized && !_sleeping) {
                                each(mutations, function () {
                                    mutation = this;
                                    mutationTarget = mutation.target;
                                    mutationAttrName = mutation.attributeName;
                                    mutationIsClass = mutationAttrName === LEXICON.c;
                                    oldMutationVal = mutation.oldValue;
                                    newClassVal = mutationTarget.className;

                                    if (_domExists && mutationIsClass && !doUpdateForce) {
                                        // if old class value contains _classNameHostElementForeign and new class value doesn't
                                        if (oldMutationVal.indexOf(_classNameHostElementForeign) > -1 && newClassVal.indexOf(_classNameHostElementForeign) < 0) {
                                            hostClassNameRegex = createHostClassNameRegExp(true);
                                            _hostElementNative.className = newClassVal.split(_strSpace).concat(oldMutationVal.split(_strSpace).filter(function (name) {
                                                return name.match(hostClassNameRegex);
                                            })).join(_strSpace);
                                            doUpdate = doUpdateForce = true;
                                        }
                                    }

                                    if (!doUpdate) {
                                        doUpdate = mutationIsClass
                                            ? hostClassNamesChanged(oldMutationVal, newClassVal)
                                            : mutationAttrName === LEXICON.s
                                                ? oldMutationVal !== mutationTarget[LEXICON.s].cssText
                                                : true;
                                    }

                                    mutatedAttrs.push(mutationAttrName);
                                });

                                updateViewportAttrsFromTarget(mutatedAttrs);

                                if (doUpdate)
                                    _base.update(doUpdateForce || _strAuto);
                            }
                            return doUpdate;
                        };
                        _mutationObserverContentCallback = function (mutations) {
                            var doUpdate = false;
                            var mutation;

                            if (_initialized && !_sleeping) {
                                each(mutations, function () {
                                    mutation = this;
                                    doUpdate = isUnknownMutation(mutation);
                                    return !doUpdate;
                                });

                                if (doUpdate) {
                                    now = COMPATIBILITY.now();
                                    sizeAuto = (_heightAutoCache || _widthAutoCache);
                                    action = function () {
                                        if (!_destroyed) {
                                            contentLastUpdate = now;

                                            //if cols, rows or wrap attr was changed
                                            if (_isTextarea)
                                                textareaUpdate();

                                            if (sizeAuto)
                                                update();
                                            else
                                                _base.update(_strAuto);
                                        }
                                    };
                                    clearTimeout(contentTimeout);
                                    if (mutationObserverContentLag <= 0 || now - contentLastUpdate > mutationObserverContentLag || !sizeAuto)
                                        action();
                                    else
                                        contentTimeout = setTimeout(action, mutationObserverContentLag);
                                }
                            }
                            return doUpdate;
                        }

                        _mutationObserverHost = new mutationObserver(_mutationObserverHostCallback);
                        _mutationObserverContent = new mutationObserver(_mutationObserverContentCallback);
                    }
                }

                /**
                 * Connects the MutationObservers if they are supported.
                 */
                function connectMutationObservers() {
                    if (_supportMutationObserver && !_mutationObserversConnected) {
                        _mutationObserverHost.observe(_hostElementNative, {
                            attributes: true,
                            attributeOldValue: true,
                            attributeFilter: _mutationObserverAttrsHost
                        });

                        _mutationObserverContent.observe(_isTextarea ? _targetElementNative : _contentElementNative, {
                            attributes: true,
                            attributeOldValue: true,
                            subtree: !_isTextarea,
                            childList: !_isTextarea,
                            characterData: !_isTextarea,
                            attributeFilter: _isTextarea ? _mutationObserverAttrsTextarea : _mutationObserverAttrsHost
                        });

                        _mutationObserversConnected = true;
                    }
                }

                /**
                 * Disconnects the MutationObservers if they are supported.
                 */
                function disconnectMutationObservers() {
                    if (_supportMutationObserver && _mutationObserversConnected) {
                        _mutationObserverHost.disconnect();
                        _mutationObserverContent.disconnect();

                        _mutationObserversConnected = false;
                    }
                }


                //==== Events of elements ====//

                /**
                 * This method gets called every time the host element gets resized. IMPORTANT: Padding changes are detected too!!
                 * It refreshes the hostResizedEventArgs and the hostSizeResizeCache.
                 * If there are any size changes, the update method gets called.
                 */
                function hostOnResized() {
                    if (!_sleeping) {
                        var changed;
                        var hostSize = {
                            w: _sizeObserverElementNative[LEXICON.sW],
                            h: _sizeObserverElementNative[LEXICON.sH]
                        };

                        changed = checkCache(hostSize, _hostElementSizeChangeDetectedCache);
                        _hostElementSizeChangeDetectedCache = hostSize;
                        if (changed)
                            update({ _hostSizeChanged: true });
                    }
                }

                /**
                 * The mouse enter event of the host element. This event is only needed for the autoHide feature.
                 */
                function hostOnMouseEnter() {
                    if (_scrollbarsAutoHideLeave)
                        refreshScrollbarsAutoHide(true);
                }

                /**
                 * The mouse leave event of the host element. This event is only needed for the autoHide feature.
                 */
                function hostOnMouseLeave() {
                    if (_scrollbarsAutoHideLeave && !_bodyElement.hasClass(_classNameDragging))
                        refreshScrollbarsAutoHide(false);
                }

                /**
                 * The mouse move event of the host element. This event is only needed for the autoHide "move" feature.
                 */
                function hostOnMouseMove() {
                    if (_scrollbarsAutoHideMove) {
                        refreshScrollbarsAutoHide(true);
                        clearTimeout(_scrollbarsAutoHideMoveTimeoutId);
                        _scrollbarsAutoHideMoveTimeoutId = setTimeout(function () {
                            if (_scrollbarsAutoHideMove && !_destroyed)
                                refreshScrollbarsAutoHide(false);
                        }, 100);
                    }
                }

                /**
                 * Prevents text from deselection if attached to the document element on the mousedown event of a DOM element.
                 * @param event The select start event.
                 */
                function documentOnSelectStart(event) {
                    COMPATIBILITY.prvD(event);
                    return false;
                }

                /**	
                 * A callback which will be called after a element has loaded.	
                 */
                function updateOnLoadCallback(event) {
                    var elm = FRAMEWORK(event.target);

                    eachUpdateOnLoad(function (i, updateOnLoadSelector) {
                        if (elm.is(updateOnLoadSelector)) {
                            update({ _contentSizeChanged: true });
                        }
                    });
                }

                /**
                * Adds or removes mouse & touch events of the host element. (for handling auto-hiding of the scrollbars)
                * @param destroy Indicates whether the events shall be added or removed.
                */
                function setupHostMouseTouchEvents(destroy) {
                    if (!destroy)
                        setupHostMouseTouchEvents(true);

                    setupResponsiveEventListener(_hostElement,
                        _strMouseTouchMoveEvent.split(_strSpace)[0],
                        hostOnMouseMove,
                        (!_scrollbarsAutoHideMove || destroy), true);
                    setupResponsiveEventListener(_hostElement,
                        [_strMouseEnter, _strMouseLeave],
                        [hostOnMouseEnter, hostOnMouseLeave],
                        (!_scrollbarsAutoHideLeave || destroy), true);

                    //if the plugin is initialized and the mouse is over the host element, make the scrollbars visible
                    if (!_initialized && !destroy)
                        _hostElement.one('mouseover', hostOnMouseEnter);
                }


                //==== Update Detection ====//

                /**
                 * Measures the min width and min height of the body element and refreshes the related cache.
                 * @returns {boolean} True if the min width or min height has changed, false otherwise.
                 */
                function bodyMinSizeChanged() {
                    var bodyMinSize = {};
                    if (_isBody && _contentArrangeElement) {
                        bodyMinSize.w = parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strWidth));
                        bodyMinSize.h = parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strHeight));
                        bodyMinSize.c = checkCache(bodyMinSize, _bodyMinSizeCache);
                        bodyMinSize.f = true; //flag for "measured at least once"
                    }
                    _bodyMinSizeCache = bodyMinSize;
                    return !!bodyMinSize.c;
                }

                /**
                 * Returns true if the class names really changed (new class without plugin host prefix)
                 * @param oldClassNames The old ClassName string or array.
                 * @param newClassNames The new ClassName string or array.
                 * @returns {boolean} True if the class names has really changed, false otherwise.
                 */
                function hostClassNamesChanged(oldClassNames, newClassNames) {
                    var currClasses = typeof newClassNames == TYPES.s ? newClassNames.split(_strSpace) : [];
                    var oldClasses = typeof oldClassNames == TYPES.s ? oldClassNames.split(_strSpace) : [];
                    var diff = getArrayDifferences(oldClasses, currClasses);

                    // remove none theme from diff list to prevent update
                    var idx = inArray(_classNameThemeNone, diff);
                    var i;
                    var regex;

                    if (idx > -1)
                        diff.splice(idx, 1);

                    if (diff[LEXICON.l] > 0) {
                        regex = createHostClassNameRegExp(true, true);
                        for (i = 0; i < diff.length; i++) {
                            if (!diff[i].match(regex)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                /**
                 * Returns true if the given mutation is not from a from the plugin generated element. If the target element is a textarea the mutation is always unknown.
                 * @param mutation The mutation which shall be checked.
                 * @returns {boolean} True if the mutation is from a unknown element, false otherwise.
                 */
                function isUnknownMutation(mutation) {
                    var attributeName = mutation.attributeName;
                    var mutationTarget = mutation.target;
                    var mutationType = mutation.type;
                    var strClosest = 'closest';

                    if (mutationTarget === _contentElementNative)
                        return attributeName === null;
                    if (mutationType === 'attributes' && (attributeName === LEXICON.c || attributeName === LEXICON.s) && !_isTextarea) {
                        //ignore className changes by the plugin	
                        if (attributeName === LEXICON.c && FRAMEWORK(mutationTarget).hasClass(_classNameHostElement))
                            return hostClassNamesChanged(mutation.oldValue, mutationTarget.className);

                        //only do it of browser support it natively	
                        if (typeof mutationTarget[strClosest] != TYPES.f)
                            return true;
                        if (mutationTarget[strClosest](_strDot + _classNameResizeObserverElement) !== null ||
                            mutationTarget[strClosest](_strDot + _classNameScrollbar) !== null ||
                            mutationTarget[strClosest](_strDot + _classNameScrollbarCorner) !== null)
                            return false;
                    }
                    return true;
                }

                /**
                 * Returns true if the content size was changed since the last time this method was called.
                 * @returns {boolean} True if the content size was changed, false otherwise.
                 */
                function updateAutoContentSizeChanged() {
                    if (_sleeping)
                        return false;

                    var contentMeasureElement = getContentMeasureElement();
                    var textareaValueLength = _isTextarea && _widthAutoCache && !_textareaAutoWrappingCache ? _targetElement.val().length : 0;
                    var setCSS = !_mutationObserversConnected && _widthAutoCache && !_isTextarea;
                    var css = {};
                    var float;
                    var bodyMinSizeC;
                    var changed;
                    var contentElementScrollSize;

                    if (setCSS) {
                        float = _contentElement.css(_strFloat);
                        css[_strFloat] = _isRTL ? _strRight : _strLeft;
                        css[_strWidth] = _strAuto;
                        _contentElement.css(css);
                    }
                    contentElementScrollSize = {
                        w: contentMeasureElement[LEXICON.sW] + textareaValueLength,
                        h: contentMeasureElement[LEXICON.sH] + textareaValueLength
                    };
                    if (setCSS) {
                        css[_strFloat] = float;
                        css[_strWidth] = _strHundredPercent;
                        _contentElement.css(css);
                    }

                    bodyMinSizeC = bodyMinSizeChanged();
                    changed = checkCache(contentElementScrollSize, _contentElementScrollSizeChangeDetectedCache);

                    _contentElementScrollSizeChangeDetectedCache = contentElementScrollSize;

                    return changed || bodyMinSizeC;
                }

                /**
                 * Returns true when a attribute which the MutationObserver would observe has changed.  
                 * @returns {boolean} True if one of the attributes which a MutationObserver would observe has changed, false or undefined otherwise.
                 */
                function meaningfulAttrsChanged() {
                    if (_sleeping || _mutationObserversConnected)
                        return;

                    var elem;
                    var curr;
                    var cache;
                    var changedAttrs = [];
                    var checks = [
                        {
                            _elem: _hostElement,
                            _attrs: _mutationObserverAttrsHost.concat(':visible')
                        },
                        {
                            _elem: _isTextarea ? _targetElement : undefined,
                            _attrs: _mutationObserverAttrsTextarea
                        }
                    ];

                    each(checks, function (index, check) {
                        elem = check._elem;
                        if (elem) {
                            each(check._attrs, function (index, attr) {
                                curr = attr.charAt(0) === ':' ? elem.is(attr) : elem.attr(attr);
                                cache = _updateAutoCache[attr];

                                if (checkCache(curr, cache)) {
                                    changedAttrs.push(attr);
                                }

                                _updateAutoCache[attr] = curr;
                            });
                        }
                    });

                    updateViewportAttrsFromTarget(changedAttrs);

                    return changedAttrs[LEXICON.l] > 0;
                }

                /**
                 * Checks is a CSS Property of a child element is affecting the scroll size of the content.
                 * @param propertyName The CSS property name.
                 * @returns {boolean} True if the property is affecting the content scroll size, false otherwise.
                 */
                function isSizeAffectingCSSProperty(propertyName) {
                    if (!_initialized)
                        return true;
                    var flexGrow = 'flex-grow';
                    var flexShrink = 'flex-shrink';
                    var flexBasis = 'flex-basis';
                    var affectingPropsX = [
                        _strWidth,
                        _strMinMinus + _strWidth,
                        _strMaxMinus + _strWidth,
                        _strMarginMinus + _strLeft,
                        _strMarginMinus + _strRight,
                        _strLeft,
                        _strRight,
                        'font-weight',
                        'word-spacing',
                        flexGrow,
                        flexShrink,
                        flexBasis
                    ];
                    var affectingPropsXContentBox = [
                        _strPaddingMinus + _strLeft,
                        _strPaddingMinus + _strRight,
                        _strBorderMinus + _strLeft + _strWidth,
                        _strBorderMinus + _strRight + _strWidth
                    ];
                    var affectingPropsY = [
                        _strHeight,
                        _strMinMinus + _strHeight,
                        _strMaxMinus + _strHeight,
                        _strMarginMinus + _strTop,
                        _strMarginMinus + _strBottom,
                        _strTop,
                        _strBottom,
                        'line-height',
                        flexGrow,
                        flexShrink,
                        flexBasis
                    ];
                    var affectingPropsYContentBox = [
                        _strPaddingMinus + _strTop,
                        _strPaddingMinus + _strBottom,
                        _strBorderMinus + _strTop + _strWidth,
                        _strBorderMinus + _strBottom + _strWidth
                    ];
                    var _strS = 's';
                    var _strVS = 'v-s';
                    var checkX = _overflowBehaviorCache.x === _strS || _overflowBehaviorCache.x === _strVS;
                    var checkY = _overflowBehaviorCache.y === _strS || _overflowBehaviorCache.y === _strVS;
                    var sizeIsAffected = false;
                    var checkPropertyName = function (arr, name) {
                        for (var i = 0; i < arr[LEXICON.l]; i++) {
                            if (arr[i] === name)
                                return true;
                        }
                        return false;
                    };

                    if (checkY) {
                        sizeIsAffected = checkPropertyName(affectingPropsY, propertyName);
                        if (!sizeIsAffected && !_isBorderBox)
                            sizeIsAffected = checkPropertyName(affectingPropsYContentBox, propertyName);
                    }
                    if (checkX && !sizeIsAffected) {
                        sizeIsAffected = checkPropertyName(affectingPropsX, propertyName);
                        if (!sizeIsAffected && !_isBorderBox)
                            sizeIsAffected = checkPropertyName(affectingPropsXContentBox, propertyName);
                    }
                    return sizeIsAffected;
                }


                //==== Update ====//

                /**
                 * Sets the attribute values of the viewport element to the values from the target element.
                 * The value of a attribute is only set if the attribute is whitelisted.
                 * @attrs attrs The array of attributes which shall be set or undefined if all whitelisted shall be set.
                 */
                function updateViewportAttrsFromTarget(attrs) {
                    attrs = attrs || _viewportAttrsFromTarget;
                    each(attrs, function (index, attr) {
                        if (COMPATIBILITY.inA(attr, _viewportAttrsFromTarget) > -1) {
                            var targetAttr = _targetElement.attr(attr);
                            if (type(targetAttr) == TYPES.s) {
                                _viewportElement.attr(attr, targetAttr);
                            }
                            else {
                                _viewportElement.removeAttr(attr);
                            }
                        }
                    });
                }

                /**
                 * Updates the variables and size of the textarea element, and manages the scroll on new line or new character.
                 */
                function textareaUpdate() {
                    if (!_sleeping) {
                        var wrapAttrOff = !_textareaAutoWrappingCache;
                        var minWidth = _viewportSize.w;
                        var minHeight = _viewportSize.h;
                        var css = {};
                        var doMeasure = _widthAutoCache || wrapAttrOff;
                        var origWidth;
                        var width;
                        var origHeight;
                        var height;

                        //reset min size
                        css[_strMinMinus + _strWidth] = _strEmpty;
                        css[_strMinMinus + _strHeight] = _strEmpty;

                        //set width auto
                        css[_strWidth] = _strAuto;
                        _targetElement.css(css);

                        //measure width
                        origWidth = _targetElementNative[LEXICON.oW];
                        width = doMeasure ? MATH.max(origWidth, _targetElementNative[LEXICON.sW] - 1) : 1;
                        /*width += (_widthAutoCache ? _marginX + (!_isBorderBox ? wrapAttrOff ? 0 : _paddingX + _borderX : 0) : 0);*/

                        //set measured width
                        css[_strWidth] = _widthAutoCache ? _strAuto /*width*/ : _strHundredPercent;
                        css[_strMinMinus + _strWidth] = _strHundredPercent;

                        //set height auto
                        css[_strHeight] = _strAuto;
                        _targetElement.css(css);

                        //measure height
                        origHeight = _targetElementNative[LEXICON.oH];
                        height = MATH.max(origHeight, _targetElementNative[LEXICON.sH] - 1);

                        //append correct size values
                        css[_strWidth] = width;
                        css[_strHeight] = height;
                        _textareaCoverElement.css(css);

                        //apply min width / min height to prevent textarea collapsing
                        css[_strMinMinus + _strWidth] = minWidth /*+ (!_isBorderBox && _widthAutoCache ? _paddingX + _borderX : 0)*/;
                        css[_strMinMinus + _strHeight] = minHeight /*+ (!_isBorderBox && _heightAutoCache ? _paddingY + _borderY : 0)*/;
                        _targetElement.css(css);

                        return {
                            _originalWidth: origWidth,
                            _originalHeight: origHeight,
                            _dynamicWidth: width,
                            _dynamicHeight: height
                        };
                    }
                }

                /**
                 * Updates the plugin and DOM to the current options.
                 * This method should only be called if a update is 100% required.
                 * @param updateHints A objects which contains hints for this update:
                 * {
                 *   _hostSizeChanged : boolean,
                 *   _contentSizeChanged : boolean,
                 *   _force : boolean,                             == preventSwallowing
                 *   _changedOptions : { },                        == preventSwallowing && preventSleep
                *  }
                 */
                function update(updateHints) {
                    clearTimeout(_swallowedUpdateTimeout);
                    updateHints = updateHints || {};
                    _swallowedUpdateHints._hostSizeChanged |= updateHints._hostSizeChanged;
                    _swallowedUpdateHints._contentSizeChanged |= updateHints._contentSizeChanged;
                    _swallowedUpdateHints._force |= updateHints._force;

                    var now = COMPATIBILITY.now();
                    var hostSizeChanged = !!_swallowedUpdateHints._hostSizeChanged;
                    var contentSizeChanged = !!_swallowedUpdateHints._contentSizeChanged;
                    var force = !!_swallowedUpdateHints._force;
                    var changedOptions = updateHints._changedOptions;
                    var swallow = _swallowUpdateLag > 0 && _initialized && !_destroyed && !force && !changedOptions && (now - _lastUpdateTime) < _swallowUpdateLag && (!_heightAutoCache && !_widthAutoCache);
                    var displayIsHidden;

                    if (swallow)
                        _swallowedUpdateTimeout = setTimeout(update, _swallowUpdateLag);

                    //abort update due to:
                    //destroyed
                    //swallowing
                    //sleeping
                    //host is hidden or has false display
                    if (_destroyed || swallow || (_sleeping && !changedOptions) || (_initialized && !force && (displayIsHidden = _hostElement.is(':hidden'))) || _hostElement.css('display') === 'inline')
                        return;

                    _lastUpdateTime = now;
                    _swallowedUpdateHints = {};

                    //if scrollbar styling is possible and native scrollbars aren't overlaid the scrollbar styling will be applied which hides the native scrollbars completely.
                    if (_nativeScrollbarStyling && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
                        //native scrollbars are hidden, so change the values to zero
                        _nativeScrollbarSize.x = 0;
                        _nativeScrollbarSize.y = 0;
                    }
                    else {
                        //refresh native scrollbar size (in case of zoom)
                        _nativeScrollbarSize = extendDeep({}, globals.nativeScrollbarSize);
                    }

                    // Scrollbar padding is needed for firefox, because firefox hides scrollbar automatically if the size of the div is too small.
                    // The calculation: [scrollbar size +3 *3]
                    // (+3 because of possible decoration e.g. borders, margins etc., but only if native scrollbar is NOT a overlaid scrollbar)
                    // (*3 because (1)increase / (2)decrease -button and (3)resize handle)
                    _nativeScrollbarMinSize = {
                        x: (_nativeScrollbarSize.x + (_nativeScrollbarIsOverlaid.x ? 0 : 3)) * 3,
                        y: (_nativeScrollbarSize.y + (_nativeScrollbarIsOverlaid.y ? 0 : 3)) * 3
                    };

                    changedOptions = changedOptions || {};
                    //freezeResizeObserver(_sizeObserverElement, true);
                    //freezeResizeObserver(_sizeAutoObserverElement, true);

                    var checkCacheAutoForce = function () {
                        return checkCache.apply(this, [].slice.call(arguments).concat([force]));
                    };

                    //save current scroll offset
                    var currScroll = {
                        x: _viewportElement[_strScrollLeft](),
                        y: _viewportElement[_strScrollTop]()
                    };

                    var currentPreparedOptionsScrollbars = _currentPreparedOptions.scrollbars;
                    var currentPreparedOptionsTextarea = _currentPreparedOptions.textarea;

                    //scrollbars visibility:
                    var scrollbarsVisibility = currentPreparedOptionsScrollbars.visibility;
                    var scrollbarsVisibilityChanged = checkCacheAutoForce(scrollbarsVisibility, _scrollbarsVisibilityCache);

                    //scrollbars autoHide:
                    var scrollbarsAutoHide = currentPreparedOptionsScrollbars.autoHide;
                    var scrollbarsAutoHideChanged = checkCacheAutoForce(scrollbarsAutoHide, _scrollbarsAutoHideCache);

                    //scrollbars click scrolling
                    var scrollbarsClickScrolling = currentPreparedOptionsScrollbars.clickScrolling;
                    var scrollbarsClickScrollingChanged = checkCacheAutoForce(scrollbarsClickScrolling, _scrollbarsClickScrollingCache);

                    //scrollbars drag scrolling
                    var scrollbarsDragScrolling = currentPreparedOptionsScrollbars.dragScrolling;
                    var scrollbarsDragScrollingChanged = checkCacheAutoForce(scrollbarsDragScrolling, _scrollbarsDragScrollingCache);

                    //className
                    var className = _currentPreparedOptions.className;
                    var classNameChanged = checkCacheAutoForce(className, _classNameCache);

                    //resize
                    var resize = _currentPreparedOptions.resize;
                    var resizeChanged = checkCacheAutoForce(resize, _resizeCache) && !_isBody; //body can't be resized since the window itself acts as resize possibility.

                    //paddingAbsolute
                    var paddingAbsolute = _currentPreparedOptions.paddingAbsolute;
                    var paddingAbsoluteChanged = checkCacheAutoForce(paddingAbsolute, _paddingAbsoluteCache);

                    //clipAlways
                    var clipAlways = _currentPreparedOptions.clipAlways;
                    var clipAlwaysChanged = checkCacheAutoForce(clipAlways, _clipAlwaysCache);

                    //sizeAutoCapable
                    var sizeAutoCapable = _currentPreparedOptions.sizeAutoCapable && !_isBody; //body can never be size auto, because it shall be always as big as the viewport.
                    var sizeAutoCapableChanged = checkCacheAutoForce(sizeAutoCapable, _sizeAutoCapableCache);

                    //showNativeScrollbars
                    var ignoreOverlayScrollbarHiding = _currentPreparedOptions.nativeScrollbarsOverlaid.showNativeScrollbars;
                    var ignoreOverlayScrollbarHidingChanged = checkCacheAutoForce(ignoreOverlayScrollbarHiding, _ignoreOverlayScrollbarHidingCache);

                    //autoUpdate
                    var autoUpdate = _currentPreparedOptions.autoUpdate;
                    var autoUpdateChanged = checkCacheAutoForce(autoUpdate, _autoUpdateCache);

                    //overflowBehavior
                    var overflowBehavior = _currentPreparedOptions.overflowBehavior;
                    var overflowBehaviorChanged = checkCacheAutoForce(overflowBehavior, _overflowBehaviorCache, force);

                    //dynWidth:
                    var textareaDynWidth = currentPreparedOptionsTextarea.dynWidth;
                    var textareaDynWidthChanged = checkCacheAutoForce(_textareaDynWidthCache, textareaDynWidth);

                    //dynHeight:
                    var textareaDynHeight = currentPreparedOptionsTextarea.dynHeight;
                    var textareaDynHeightChanged = checkCacheAutoForce(_textareaDynHeightCache, textareaDynHeight);

                    //scrollbars visibility
                    _scrollbarsAutoHideNever = scrollbarsAutoHide === 'n';
                    _scrollbarsAutoHideScroll = scrollbarsAutoHide === 's';
                    _scrollbarsAutoHideMove = scrollbarsAutoHide === 'm';
                    _scrollbarsAutoHideLeave = scrollbarsAutoHide === 'l';

                    //scrollbars autoHideDelay
                    _scrollbarsAutoHideDelay = currentPreparedOptionsScrollbars.autoHideDelay;

                    //old className
                    _oldClassName = _classNameCache;

                    //resize
                    _resizeNone = resize === 'n';
                    _resizeBoth = resize === 'b';
                    _resizeHorizontal = resize === 'h';
                    _resizeVertical = resize === 'v';

                    //normalizeRTL
                    _normalizeRTLCache = _currentPreparedOptions.normalizeRTL;

                    //ignore overlay scrollbar hiding
                    ignoreOverlayScrollbarHiding = ignoreOverlayScrollbarHiding && (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y);

                    //refresh options cache
                    _scrollbarsVisibilityCache = scrollbarsVisibility;
                    _scrollbarsAutoHideCache = scrollbarsAutoHide;
                    _scrollbarsClickScrollingCache = scrollbarsClickScrolling;
                    _scrollbarsDragScrollingCache = scrollbarsDragScrolling;
                    _classNameCache = className;
                    _resizeCache = resize;
                    _paddingAbsoluteCache = paddingAbsolute;
                    _clipAlwaysCache = clipAlways;
                    _sizeAutoCapableCache = sizeAutoCapable;
                    _ignoreOverlayScrollbarHidingCache = ignoreOverlayScrollbarHiding;
                    _autoUpdateCache = autoUpdate;
                    _overflowBehaviorCache = extendDeep({}, overflowBehavior);
                    _textareaDynWidthCache = textareaDynWidth;
                    _textareaDynHeightCache = textareaDynHeight;
                    _hasOverflowCache = _hasOverflowCache || { x: false, y: false };

                    //set correct class name to the host element
                    if (classNameChanged) {
                        removeClass(_hostElement, _oldClassName + _strSpace + _classNameThemeNone);
                        addClass(_hostElement, className !== undefined && className !== null && className.length > 0 ? className : _classNameThemeNone);
                    }

                    //set correct auto Update
                    if (autoUpdateChanged) {
                        if (autoUpdate === true || (autoUpdate === null && _autoUpdateRecommended)) {
                            disconnectMutationObservers();
                            autoUpdateLoop.add(_base);
                        }
                        else {
                            autoUpdateLoop.remove(_base);
                            connectMutationObservers();
                        }
                    }

                    //activate or deactivate size auto capability
                    if (sizeAutoCapableChanged) {
                        if (sizeAutoCapable) {
                            if (_contentGlueElement) {
                                _contentGlueElement.show();
                            }
                            else {
                                _contentGlueElement = FRAMEWORK(generateDiv(_classNameContentGlueElement));
                                _paddingElement.before(_contentGlueElement);
                            }
                            if (_sizeAutoObserverAdded) {
                                _sizeAutoObserverElement.show();
                            }
                            else {
                                _sizeAutoObserverElement = FRAMEWORK(generateDiv(_classNameSizeAutoObserverElement));
                                _sizeAutoObserverElementNative = _sizeAutoObserverElement[0];

                                _contentGlueElement.before(_sizeAutoObserverElement);
                                var oldSize = { w: -1, h: -1 };
                                setupResizeObserver(_sizeAutoObserverElement, function () {
                                    var newSize = {
                                        w: _sizeAutoObserverElementNative[LEXICON.oW],
                                        h: _sizeAutoObserverElementNative[LEXICON.oH]
                                    };
                                    if (checkCache(newSize, oldSize)) {
                                        if (_initialized && (_heightAutoCache && newSize.h > 0) || (_widthAutoCache && newSize.w > 0)) {
                                            update();
                                        }
                                        else if (_initialized && (!_heightAutoCache && newSize.h === 0) || (!_widthAutoCache && newSize.w === 0)) {
                                            update();
                                        }
                                    }
                                    oldSize = newSize;
                                });
                                _sizeAutoObserverAdded = true;
                                //fix heightAuto detector bug if height is fixed but contentHeight is 0.
                                //the probability this bug will ever happen is very very low, thats why its ok if we use calc which isn't supported in IE8.
                                if (_cssCalc !== null)
                                    _sizeAutoObserverElement.css(_strHeight, _cssCalc + '(100% + 1px)');
                            }
                        }
                        else {
                            if (_sizeAutoObserverAdded)
                                _sizeAutoObserverElement.hide();
                            if (_contentGlueElement)
                                _contentGlueElement.hide();
                        }
                    }

                    //if force, update all resizeObservers too
                    if (force) {
                        _sizeObserverElement.find('*').trigger(_strScroll);
                        if (_sizeAutoObserverAdded)
                            _sizeAutoObserverElement.find('*').trigger(_strScroll);
                    }

                    //display hidden:
                    displayIsHidden = displayIsHidden === undefined ? _hostElement.is(':hidden') : displayIsHidden;

                    //textarea AutoWrapping:
                    var textareaAutoWrapping = _isTextarea ? _targetElement.attr('wrap') !== 'off' : false;
                    var textareaAutoWrappingChanged = checkCacheAutoForce(textareaAutoWrapping, _textareaAutoWrappingCache);

                    //detect direction:
                    var cssDirection = _hostElement.css('direction');
                    var cssDirectionChanged = checkCacheAutoForce(cssDirection, _cssDirectionCache);

                    //detect box-sizing:
                    var boxSizing = _hostElement.css('box-sizing');
                    var boxSizingChanged = checkCacheAutoForce(boxSizing, _cssBoxSizingCache);

                    //detect padding:
                    var padding = getTopRightBottomLeftHost(_strPaddingMinus);

                    //width + height auto detecting var:
                    var sizeAutoObserverElementBCRect;
                    //exception occurs in IE8 sometimes (unknown exception)
                    try {
                        sizeAutoObserverElementBCRect = _sizeAutoObserverAdded ? _sizeAutoObserverElementNative[LEXICON.bCR]() : null;
                    } catch (ex) {
                        return;
                    }

                    _isRTL = cssDirection === 'rtl';
                    _isBorderBox = (boxSizing === 'border-box');
                    var isRTLLeft = _isRTL ? _strLeft : _strRight;
                    var isRTLRight = _isRTL ? _strRight : _strLeft;

                    //detect width auto:
                    var widthAutoResizeDetection = false;
                    var widthAutoObserverDetection = (_sizeAutoObserverAdded && (_hostElement.css(_strFloat) !== 'none' /*|| _isTextarea */)) ? (MATH.round(sizeAutoObserverElementBCRect.right - sizeAutoObserverElementBCRect.left) === 0) && (!paddingAbsolute ? (_hostElementNative[LEXICON.cW] - _paddingX) > 0 : true) : false;
                    if (sizeAutoCapable && !widthAutoObserverDetection) {
                        var tmpCurrHostWidth = _hostElementNative[LEXICON.oW];
                        var tmpCurrContentGlueWidth = _contentGlueElement.css(_strWidth);
                        _contentGlueElement.css(_strWidth, _strAuto);

                        var tmpNewHostWidth = _hostElementNative[LEXICON.oW];
                        _contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);
                        widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
                        if (!widthAutoResizeDetection) {
                            _contentGlueElement.css(_strWidth, tmpCurrHostWidth + 1);
                            tmpNewHostWidth = _hostElementNative[LEXICON.oW];
                            _contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);
                            widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
                        }
                    }
                    var widthAuto = (widthAutoObserverDetection || widthAutoResizeDetection) && sizeAutoCapable && !displayIsHidden;
                    var widthAutoChanged = checkCacheAutoForce(widthAuto, _widthAutoCache);
                    var wasWidthAuto = !widthAuto && _widthAutoCache;

                    //detect height auto:
                    var heightAuto = _sizeAutoObserverAdded && sizeAutoCapable && !displayIsHidden ? (MATH.round(sizeAutoObserverElementBCRect.bottom - sizeAutoObserverElementBCRect.top) === 0) /* && (!paddingAbsolute && (_msieVersion > 9 || !_msieVersion) ? true : true) */ : false;
                    var heightAutoChanged = checkCacheAutoForce(heightAuto, _heightAutoCache);
                    var wasHeightAuto = !heightAuto && _heightAutoCache;

                    //detect border:
                    //we need the border only if border box and auto size
                    var updateBorderX = (widthAuto && _isBorderBox) || !_isBorderBox;
                    var updateBorderY = (heightAuto && _isBorderBox) || !_isBorderBox;
                    var border = getTopRightBottomLeftHost(_strBorderMinus, '-' + _strWidth, !updateBorderX, !updateBorderY)

                    //detect margin:
                    var margin = getTopRightBottomLeftHost(_strMarginMinus);

                    //vars to apply correct css
                    var contentElementCSS = {};
                    var contentGlueElementCSS = {};

                    //funcs
                    var getHostSize = function () {
                        //has to be clientSize because offsetSize respect borders
                        return {
                            w: _hostElementNative[LEXICON.cW],
                            h: _hostElementNative[LEXICON.cH]
                        };
                    };
                    var getViewportSize = function () {
                        //viewport size is padding container because it never has padding, margin and a border
                        //determine zoom rounding error -> sometimes scrollWidth/Height is smaller than clientWidth/Height
                        //if this happens add the difference to the viewportSize to compensate the rounding error
                        return {
                            w: _paddingElementNative[LEXICON.oW] + MATH.max(0, _contentElementNative[LEXICON.cW] - _contentElementNative[LEXICON.sW]),
                            h: _paddingElementNative[LEXICON.oH] + MATH.max(0, _contentElementNative[LEXICON.cH] - _contentElementNative[LEXICON.sH])
                        };
                    };

                    //set info for padding
                    var paddingAbsoluteX = _paddingX = padding.l + padding.r;
                    var paddingAbsoluteY = _paddingY = padding.t + padding.b;
                    paddingAbsoluteX *= paddingAbsolute ? 1 : 0;
                    paddingAbsoluteY *= paddingAbsolute ? 1 : 0;
                    padding.c = checkCacheAutoForce(padding, _cssPaddingCache);

                    //set info for border
                    _borderX = border.l + border.r;
                    _borderY = border.t + border.b;
                    border.c = checkCacheAutoForce(border, _cssBorderCache);

                    //set info for margin
                    _marginX = margin.l + margin.r;
                    _marginY = margin.t + margin.b;
                    margin.c = checkCacheAutoForce(margin, _cssMarginCache);

                    //refresh cache
                    _textareaAutoWrappingCache = textareaAutoWrapping;
                    _cssDirectionCache = cssDirection;
                    _cssBoxSizingCache = boxSizing;
                    _widthAutoCache = widthAuto;
                    _heightAutoCache = heightAuto;
                    _cssPaddingCache = padding;
                    _cssBorderCache = border;
                    _cssMarginCache = margin;

                    //IEFix direction changed
                    if (cssDirectionChanged && _sizeAutoObserverAdded)
                        _sizeAutoObserverElement.css(_strFloat, isRTLRight);

                    //apply padding:
                    if (padding.c || cssDirectionChanged || paddingAbsoluteChanged || widthAutoChanged || heightAutoChanged || boxSizingChanged || sizeAutoCapableChanged) {
                        var paddingElementCSS = {};
                        var textareaCSS = {};
                        var paddingValues = [padding.t, padding.r, padding.b, padding.l];

                        setTopRightBottomLeft(contentGlueElementCSS, _strMarginMinus, [-padding.t, -padding.r, -padding.b, -padding.l]);
                        if (paddingAbsolute) {
                            setTopRightBottomLeft(paddingElementCSS, _strEmpty, paddingValues);
                            setTopRightBottomLeft(_isTextarea ? textareaCSS : contentElementCSS, _strPaddingMinus);
                        }
                        else {
                            setTopRightBottomLeft(paddingElementCSS, _strEmpty);
                            setTopRightBottomLeft(_isTextarea ? textareaCSS : contentElementCSS, _strPaddingMinus, paddingValues);
                        }

                        _paddingElement.css(paddingElementCSS);
                        _targetElement.css(textareaCSS);
                    }

                    //viewport size is padding container because it never has padding, margin and a border.
                    _viewportSize = getViewportSize();

                    //update Textarea
                    var textareaSize = _isTextarea ? textareaUpdate() : false;
                    var textareaSizeChanged = _isTextarea && checkCacheAutoForce(textareaSize, _textareaSizeCache);
                    var textareaDynOrigSize = _isTextarea && textareaSize ? {
                        w: textareaDynWidth ? textareaSize._dynamicWidth : textareaSize._originalWidth,
                        h: textareaDynHeight ? textareaSize._dynamicHeight : textareaSize._originalHeight
                    } : {};
                    _textareaSizeCache = textareaSize;

                    //fix height auto / width auto in cooperation with current padding & boxSizing behavior:
                    if (heightAuto && (heightAutoChanged || paddingAbsoluteChanged || boxSizingChanged || padding.c || border.c)) {
                        contentElementCSS[_strHeight] = _strAuto;
                    }
                    else if (heightAutoChanged || paddingAbsoluteChanged) {
                        contentElementCSS[_strHeight] = _strHundredPercent;
                    }
                    if (widthAuto && (widthAutoChanged || paddingAbsoluteChanged || boxSizingChanged || padding.c || border.c || cssDirectionChanged)) {
                        contentElementCSS[_strWidth] = _strAuto;
                        contentGlueElementCSS[_strMaxMinus + _strWidth] = _strHundredPercent; //IE Fix
                    }
                    else if (widthAutoChanged || paddingAbsoluteChanged) {
                        contentElementCSS[_strWidth] = _strHundredPercent;
                        contentElementCSS[_strFloat] = _strEmpty;
                        contentGlueElementCSS[_strMaxMinus + _strWidth] = _strEmpty; //IE Fix
                    }
                    if (widthAuto) {
                        //textareaDynOrigSize.w || _strAuto :: doesnt works because applied margin will shift width
                        contentGlueElementCSS[_strWidth] = _strAuto;

                        contentElementCSS[_strWidth] = VENDORS._cssPropertyValue(_strWidth, 'max-content intrinsic') || _strAuto;
                        contentElementCSS[_strFloat] = isRTLRight;
                    }
                    else {
                        contentGlueElementCSS[_strWidth] = _strEmpty;
                    }
                    if (heightAuto) {
                        //textareaDynOrigSize.h || _contentElementNative[LEXICON.cH] :: use for anti scroll jumping
                        contentGlueElementCSS[_strHeight] = textareaDynOrigSize.h || _contentElementNative[LEXICON.cH];
                    }
                    else {
                        contentGlueElementCSS[_strHeight] = _strEmpty;
                    }
                    if (sizeAutoCapable)
                        _contentGlueElement.css(contentGlueElementCSS);
                    _contentElement.css(contentElementCSS);

                    //CHECKPOINT HERE ~
                    contentElementCSS = {};
                    contentGlueElementCSS = {};

                    //if [content(host) client / scroll size, or target element direction, or content(host) max-sizes] changed, or force is true
                    if (hostSizeChanged || contentSizeChanged || textareaSizeChanged || cssDirectionChanged || boxSizingChanged || paddingAbsoluteChanged || widthAutoChanged || widthAuto || heightAutoChanged || heightAuto || ignoreOverlayScrollbarHidingChanged || overflowBehaviorChanged || clipAlwaysChanged || resizeChanged || scrollbarsVisibilityChanged || scrollbarsAutoHideChanged || scrollbarsDragScrollingChanged || scrollbarsClickScrollingChanged || textareaDynWidthChanged || textareaDynHeightChanged || textareaAutoWrappingChanged) {
                        var strOverflow = 'overflow';
                        var strOverflowX = strOverflow + '-x';
                        var strOverflowY = strOverflow + '-y';
                        var strHidden = 'hidden';
                        var strVisible = 'visible';

                        //Reset the viewport (very important for natively overlaid scrollbars and zoom change
                        //don't change the overflow prop as it is very expensive and affects performance !A LOT!
                        if (!_nativeScrollbarStyling) {
                            var viewportElementResetCSS = {};
                            var resetXTmp = _hasOverflowCache.y && _hideOverflowCache.ys && !ignoreOverlayScrollbarHiding ? (_nativeScrollbarIsOverlaid.y ? _viewportElement.css(isRTLLeft) : -_nativeScrollbarSize.y) : 0;
                            var resetBottomTmp = _hasOverflowCache.x && _hideOverflowCache.xs && !ignoreOverlayScrollbarHiding ? (_nativeScrollbarIsOverlaid.x ? _viewportElement.css(_strBottom) : -_nativeScrollbarSize.x) : 0;
                            setTopRightBottomLeft(viewportElementResetCSS, _strEmpty);
                            _viewportElement.css(viewportElementResetCSS);
                        }

                        //measure several sizes:
                        var contentMeasureElement = getContentMeasureElement();
                        //in Firefox content element has to have overflow hidden, else element margins aren't calculated properly, this element prevents this bug, but only if scrollbars aren't overlaid
                        var contentSize = {
                            //use clientSize because natively overlaidScrollbars add borders
                            w: textareaDynOrigSize.w || contentMeasureElement[LEXICON.cW],
                            h: textareaDynOrigSize.h || contentMeasureElement[LEXICON.cH]
                        };
                        var scrollSize = {
                            w: contentMeasureElement[LEXICON.sW],
                            h: contentMeasureElement[LEXICON.sH]
                        };

                        //apply the correct viewport style and measure viewport size
                        if (!_nativeScrollbarStyling) {
                            viewportElementResetCSS[_strBottom] = wasHeightAuto ? _strEmpty : resetBottomTmp;
                            viewportElementResetCSS[isRTLLeft] = wasWidthAuto ? _strEmpty : resetXTmp;
                            _viewportElement.css(viewportElementResetCSS);
                        }
                        _viewportSize = getViewportSize();

                        //measure and correct several sizes
                        var hostSize = getHostSize();
                        var hostAbsoluteRectSize = {
                            w: hostSize.w - _marginX - _borderX - (_isBorderBox ? 0 : _paddingX),
                            h: hostSize.h - _marginY - _borderY - (_isBorderBox ? 0 : _paddingY)
                        };
                        var contentGlueSize = {
                            //client/scrollSize + AbsolutePadding -> because padding is only applied to the paddingElement if its absolute, so you have to add it manually
                            //hostSize is clientSize -> so padding should be added manually, right? FALSE! Because content glue is inside hostElement, so we don't have to worry about padding
                            w: MATH.max((widthAuto ? contentSize.w : scrollSize.w) + paddingAbsoluteX, hostAbsoluteRectSize.w),
                            h: MATH.max((heightAuto ? contentSize.h : scrollSize.h) + paddingAbsoluteY, hostAbsoluteRectSize.h)
                        };
                        contentGlueSize.c = checkCacheAutoForce(contentGlueSize, _contentGlueSizeCache);
                        _contentGlueSizeCache = contentGlueSize;

                        //apply correct contentGlue size
                        if (sizeAutoCapable) {
                            //size contentGlue correctly to make sure the element has correct size if the sizing switches to auto
                            if (contentGlueSize.c || (heightAuto || widthAuto)) {
                                contentGlueElementCSS[_strWidth] = contentGlueSize.w;
                                contentGlueElementCSS[_strHeight] = contentGlueSize.h;

                                //textarea-sizes are already calculated correctly at this point
                                if (!_isTextarea) {
                                    contentSize = {
                                        //use clientSize because natively overlaidScrollbars add borders
                                        w: contentMeasureElement[LEXICON.cW],
                                        h: contentMeasureElement[LEXICON.cH]
                                    };
                                }
                            }
                            var textareaCoverCSS = {};
                            var setContentGlueElementCSSfunction = function (horizontal) {
                                var scrollbarVars = getScrollbarVars(horizontal);
                                var wh = scrollbarVars._w_h;
                                var strWH = scrollbarVars._width_height;
                                var autoSize = horizontal ? widthAuto : heightAuto;
                                var borderSize = horizontal ? _borderX : _borderY;
                                var paddingSize = horizontal ? _paddingX : _paddingY;
                                var marginSize = horizontal ? _marginX : _marginY;
                                var viewportSize = _viewportSize[wh] - borderSize - marginSize - (_isBorderBox ? 0 : paddingSize);

                                //make contentGlue size -1 if element is not auto sized, to make sure that a resize event happens when the element shrinks
                                if (!autoSize || (!autoSize && border.c))
                                    contentGlueElementCSS[strWH] = hostAbsoluteRectSize[wh] - 1;

                                //if size is auto and host is smaller than size as min size, make content glue size -1 to make sure size changes will be detected (this is only needed if padding is 0)
                                if (autoSize && (contentSize[wh] < viewportSize) && (horizontal && _isTextarea ? !textareaAutoWrapping : true)) {
                                    if (_isTextarea)
                                        textareaCoverCSS[strWH] = parseToZeroOrNumber(_textareaCoverElement.css(strWH)) - 1;
                                    contentGlueElementCSS[strWH] -= 1;
                                }

                                //make sure content glue size is at least 1
                                if (contentSize[wh] > 0)
                                    contentGlueElementCSS[strWH] = MATH.max(1, contentGlueElementCSS[strWH]);
                            };
                            setContentGlueElementCSSfunction(true);
                            setContentGlueElementCSSfunction(false);

                            if (_isTextarea)
                                _textareaCoverElement.css(textareaCoverCSS);
                            _contentGlueElement.css(contentGlueElementCSS);
                        }
                        if (widthAuto)
                            contentElementCSS[_strWidth] = _strHundredPercent;
                        if (widthAuto && !_isBorderBox && !_mutationObserversConnected)
                            contentElementCSS[_strFloat] = 'none';

                        //apply and reset content style
                        _contentElement.css(contentElementCSS);
                        contentElementCSS = {};

                        //measure again, but this time all correct sizes:
                        var contentScrollSize = {
                            w: contentMeasureElement[LEXICON.sW],
                            h: contentMeasureElement[LEXICON.sH],
                        };
                        contentScrollSize.c = contentSizeChanged = checkCacheAutoForce(contentScrollSize, _contentScrollSizeCache);
                        _contentScrollSizeCache = contentScrollSize;

                        //refresh viewport size after correct measuring
                        _viewportSize = getViewportSize();

                        hostSize = getHostSize();
                        hostSizeChanged = checkCacheAutoForce(hostSize, _hostSizeCache);
                        _hostSizeCache = hostSize;

                        var hideOverflowForceTextarea = _isTextarea && (_viewportSize.w === 0 || _viewportSize.h === 0);
                        var previousOverflowAmount = _overflowAmountCache;
                        var overflowBehaviorIsVS = {};
                        var overflowBehaviorIsVH = {};
                        var overflowBehaviorIsS = {};
                        var overflowAmount = {};
                        var hasOverflow = {};
                        var hideOverflow = {};
                        var canScroll = {};
                        var viewportRect = _paddingElementNative[LEXICON.bCR]();
                        var setOverflowVariables = function (horizontal) {
                            var scrollbarVars = getScrollbarVars(horizontal);
                            var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                            var xyI = scrollbarVarsInverted._x_y;
                            var xy = scrollbarVars._x_y;
                            var wh = scrollbarVars._w_h;
                            var widthHeight = scrollbarVars._width_height;
                            var scrollMax = _strScroll + scrollbarVars._Left_Top + 'Max';
                            var fractionalOverflowAmount = viewportRect[widthHeight] ? MATH.abs(viewportRect[widthHeight] - _viewportSize[wh]) : 0;
                            var checkFractionalOverflowAmount = previousOverflowAmount && previousOverflowAmount[xy] > 0 && _viewportElementNative[scrollMax] === 0;
                            overflowBehaviorIsVS[xy] = overflowBehavior[xy] === 'v-s';
                            overflowBehaviorIsVH[xy] = overflowBehavior[xy] === 'v-h';
                            overflowBehaviorIsS[xy] = overflowBehavior[xy] === 's';
                            overflowAmount[xy] = MATH.max(0, MATH.round((contentScrollSize[wh] - _viewportSize[wh]) * 100) / 100);
                            overflowAmount[xy] *= (hideOverflowForceTextarea || (checkFractionalOverflowAmount && fractionalOverflowAmount > 0 && fractionalOverflowAmount < 1)) ? 0 : 1;
                            hasOverflow[xy] = overflowAmount[xy] > 0;

                            //hideOverflow:
                            //x || y : true === overflow is hidden by "overflow: scroll" OR "overflow: hidden"
                            //xs || ys : true === overflow is hidden by "overflow: scroll"
                            hideOverflow[xy] = overflowBehaviorIsVS[xy] || overflowBehaviorIsVH[xy] ? (hasOverflow[xyI] && !overflowBehaviorIsVS[xyI] && !overflowBehaviorIsVH[xyI]) : hasOverflow[xy];
                            hideOverflow[xy + 's'] = hideOverflow[xy] ? (overflowBehaviorIsS[xy] || overflowBehaviorIsVS[xy]) : false;

                            canScroll[xy] = hasOverflow[xy] && hideOverflow[xy + 's'];
                        };
                        setOverflowVariables(true);
                        setOverflowVariables(false);

                        overflowAmount.c = checkCacheAutoForce(overflowAmount, _overflowAmountCache);
                        _overflowAmountCache = overflowAmount;
                        hasOverflow.c = checkCacheAutoForce(hasOverflow, _hasOverflowCache);
                        _hasOverflowCache = hasOverflow;
                        hideOverflow.c = checkCacheAutoForce(hideOverflow, _hideOverflowCache);
                        _hideOverflowCache = hideOverflow;

                        //if native scrollbar is overlay at x OR y axis, prepare DOM
                        if (_nativeScrollbarIsOverlaid.x || _nativeScrollbarIsOverlaid.y) {
                            var borderDesign = 'px solid transparent';
                            var contentArrangeElementCSS = {};
                            var arrangeContent = {};
                            var arrangeChanged = force;
                            var setContentElementCSS;

                            if (hasOverflow.x || hasOverflow.y) {
                                arrangeContent.w = _nativeScrollbarIsOverlaid.y && hasOverflow.y ? contentScrollSize.w + _overlayScrollbarDummySize.y : _strEmpty;
                                arrangeContent.h = _nativeScrollbarIsOverlaid.x && hasOverflow.x ? contentScrollSize.h + _overlayScrollbarDummySize.x : _strEmpty;
                                arrangeChanged = checkCacheAutoForce(arrangeContent, _arrangeContentSizeCache);
                                _arrangeContentSizeCache = arrangeContent;
                            }

                            if (hasOverflow.c || hideOverflow.c || contentScrollSize.c || cssDirectionChanged || widthAutoChanged || heightAutoChanged || widthAuto || heightAuto || ignoreOverlayScrollbarHidingChanged) {
                                contentElementCSS[_strMarginMinus + isRTLRight] = contentElementCSS[_strBorderMinus + isRTLRight] = _strEmpty;
                                setContentElementCSS = function (horizontal) {
                                    var scrollbarVars = getScrollbarVars(horizontal);
                                    var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                                    var xy = scrollbarVars._x_y;
                                    var strDirection = horizontal ? _strBottom : isRTLLeft;
                                    var invertedAutoSize = horizontal ? heightAuto : widthAuto;

                                    if (_nativeScrollbarIsOverlaid[xy] && hasOverflow[xy] && hideOverflow[xy + 's']) {
                                        contentElementCSS[_strMarginMinus + strDirection] = invertedAutoSize ? (ignoreOverlayScrollbarHiding ? _strEmpty : _overlayScrollbarDummySize[xy]) : _strEmpty;
                                        contentElementCSS[_strBorderMinus + strDirection] = ((horizontal ? !invertedAutoSize : true) && !ignoreOverlayScrollbarHiding) ? (_overlayScrollbarDummySize[xy] + borderDesign) : _strEmpty;
                                    }
                                    else {
                                        arrangeContent[scrollbarVarsInverted._w_h] =
                                            contentElementCSS[_strMarginMinus + strDirection] =
                                            contentElementCSS[_strBorderMinus + strDirection] = _strEmpty;
                                        arrangeChanged = true;
                                    }
                                };

                                if (_nativeScrollbarStyling) {
                                    addRemoveClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible, !ignoreOverlayScrollbarHiding)
                                }
                                else {
                                    setContentElementCSS(true);
                                    setContentElementCSS(false);
                                }
                            }
                            if (ignoreOverlayScrollbarHiding) {
                                arrangeContent.w = arrangeContent.h = _strEmpty;
                                arrangeChanged = true;
                            }
                            if (arrangeChanged && !_nativeScrollbarStyling) {
                                contentArrangeElementCSS[_strWidth] = hideOverflow.y ? arrangeContent.w : _strEmpty;
                                contentArrangeElementCSS[_strHeight] = hideOverflow.x ? arrangeContent.h : _strEmpty;

                                if (!_contentArrangeElement) {
                                    _contentArrangeElement = FRAMEWORK(generateDiv(_classNameContentArrangeElement));
                                    _viewportElement.prepend(_contentArrangeElement);
                                }
                                _contentArrangeElement.css(contentArrangeElementCSS);
                            }
                            _contentElement.css(contentElementCSS);
                        }

                        var viewportElementCSS = {};
                        var paddingElementCSS = {};
                        var setViewportCSS;
                        if (hostSizeChanged || hasOverflow.c || hideOverflow.c || contentScrollSize.c || overflowBehaviorChanged || boxSizingChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged || clipAlwaysChanged || heightAutoChanged) {
                            viewportElementCSS[isRTLRight] = _strEmpty;
                            setViewportCSS = function (horizontal) {
                                var scrollbarVars = getScrollbarVars(horizontal);
                                var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                                var xy = scrollbarVars._x_y;
                                var XY = scrollbarVars._X_Y;
                                var strDirection = horizontal ? _strBottom : isRTLLeft;

                                var reset = function () {
                                    viewportElementCSS[strDirection] = _strEmpty;
                                    _contentBorderSize[scrollbarVarsInverted._w_h] = 0;
                                };
                                if (hasOverflow[xy] && hideOverflow[xy + 's']) {
                                    viewportElementCSS[strOverflow + XY] = _strScroll;
                                    if (ignoreOverlayScrollbarHiding || _nativeScrollbarStyling) {
                                        reset();
                                    }
                                    else {
                                        viewportElementCSS[strDirection] = -(_nativeScrollbarIsOverlaid[xy] ? _overlayScrollbarDummySize[xy] : _nativeScrollbarSize[xy]);
                                        _contentBorderSize[scrollbarVarsInverted._w_h] = _nativeScrollbarIsOverlaid[xy] ? _overlayScrollbarDummySize[scrollbarVarsInverted._x_y] : 0;
                                    }
                                } else {
                                    viewportElementCSS[strOverflow + XY] = _strEmpty;
                                    reset();
                                }
                            };
                            setViewportCSS(true);
                            setViewportCSS(false);

                            // if the scroll container is too small and if there is any overflow with no overlay scrollbar (and scrollbar styling isn't possible), 
                            // make viewport element greater in size (Firefox hide Scrollbars fix)
                            // because firefox starts hiding scrollbars on too small elements
                            // with this behavior the overflow calculation may be incorrect or the scrollbars would appear suddenly
                            // https://bugzilla.mozilla.org/show_bug.cgi?id=292284
                            if (!_nativeScrollbarStyling
                                && (_viewportSize.h < _nativeScrollbarMinSize.x || _viewportSize.w < _nativeScrollbarMinSize.y)
                                && ((hasOverflow.x && hideOverflow.x && !_nativeScrollbarIsOverlaid.x) || (hasOverflow.y && hideOverflow.y && !_nativeScrollbarIsOverlaid.y))) {
                                viewportElementCSS[_strPaddingMinus + _strTop] = _nativeScrollbarMinSize.x;
                                viewportElementCSS[_strMarginMinus + _strTop] = -_nativeScrollbarMinSize.x;

                                viewportElementCSS[_strPaddingMinus + isRTLRight] = _nativeScrollbarMinSize.y;
                                viewportElementCSS[_strMarginMinus + isRTLRight] = -_nativeScrollbarMinSize.y;
                            }
                            else {
                                viewportElementCSS[_strPaddingMinus + _strTop] =
                                    viewportElementCSS[_strMarginMinus + _strTop] =
                                    viewportElementCSS[_strPaddingMinus + isRTLRight] =
                                    viewportElementCSS[_strMarginMinus + isRTLRight] = _strEmpty;
                            }
                            viewportElementCSS[_strPaddingMinus + isRTLLeft] =
                                viewportElementCSS[_strMarginMinus + isRTLLeft] = _strEmpty;

                            //if there is any overflow (x OR y axis) and this overflow shall be hidden, make overflow hidden, else overflow visible
                            if ((hasOverflow.x && hideOverflow.x) || (hasOverflow.y && hideOverflow.y) || hideOverflowForceTextarea) {
                                //only hide if is Textarea
                                if (_isTextarea && hideOverflowForceTextarea) {
                                    paddingElementCSS[strOverflowX] =
                                        paddingElementCSS[strOverflowY] = strHidden;
                                }
                            }
                            else {
                                if (!clipAlways || (overflowBehaviorIsVH.x || overflowBehaviorIsVS.x || overflowBehaviorIsVH.y || overflowBehaviorIsVS.y)) {
                                    //only un-hide if Textarea
                                    if (_isTextarea) {
                                        paddingElementCSS[strOverflowX] =
                                            paddingElementCSS[strOverflowY] = _strEmpty;
                                    }
                                    viewportElementCSS[strOverflowX] =
                                        viewportElementCSS[strOverflowY] = strVisible;
                                }
                            }

                            _paddingElement.css(paddingElementCSS);
                            _viewportElement.css(viewportElementCSS);
                            viewportElementCSS = {};

                            //force soft redraw in webkit because without the scrollbars will may appear because DOM wont be redrawn under special conditions
                            if ((hasOverflow.c || boxSizingChanged || widthAutoChanged || heightAutoChanged) && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
                                var elementStyle = _contentElementNative[LEXICON.s];
                                var dump;
                                elementStyle.webkitTransform = 'scale(1)';
                                elementStyle.display = 'run-in';
                                dump = _contentElementNative[LEXICON.oH];
                                elementStyle.display = _strEmpty; //|| dump; //use dump to prevent it from deletion if minify
                                elementStyle.webkitTransform = _strEmpty;
                            }
                            /*
                            //force hard redraw in webkit if native overlaid scrollbars shall appear
                            if (ignoreOverlayScrollbarHidingChanged && ignoreOverlayScrollbarHiding) {
                                _hostElement.hide();
                                var dump = _hostElementNative[LEXICON.oH];
                                _hostElement.show();
                            }
                            */
                        }

                        //change to direction RTL and width auto Bugfix in Webkit
                        //without this fix, the DOM still thinks the scrollbar is LTR and thus the content is shifted to the left
                        contentElementCSS = {};
                        if (cssDirectionChanged || widthAutoChanged || heightAutoChanged) {
                            if (_isRTL && widthAuto) {
                                var floatTmp = _contentElement.css(_strFloat);
                                var posLeftWithoutFloat = MATH.round(_contentElement.css(_strFloat, _strEmpty).css(_strLeft, _strEmpty).position().left);
                                _contentElement.css(_strFloat, floatTmp);
                                var posLeftWithFloat = MATH.round(_contentElement.position().left);

                                if (posLeftWithoutFloat !== posLeftWithFloat)
                                    contentElementCSS[_strLeft] = posLeftWithoutFloat;
                            }
                            else {
                                contentElementCSS[_strLeft] = _strEmpty;
                            }
                        }
                        _contentElement.css(contentElementCSS);

                        //handle scroll position
                        if (_isTextarea && contentSizeChanged) {
                            var textareaInfo = getTextareaInfo();
                            if (textareaInfo) {
                                var textareaRowsChanged = _textareaInfoCache === undefined ? true : textareaInfo._rows !== _textareaInfoCache._rows;
                                var cursorRow = textareaInfo._cursorRow;
                                var cursorCol = textareaInfo._cursorColumn;
                                var widestRow = textareaInfo._widestRow;
                                var lastRow = textareaInfo._rows;
                                var lastCol = textareaInfo._columns;
                                var cursorPos = textareaInfo._cursorPosition;
                                var cursorMax = textareaInfo._cursorMax;
                                var cursorIsLastPosition = (cursorPos >= cursorMax && _textareaHasFocus);
                                var textareaScrollAmount = {
                                    x: (!textareaAutoWrapping && (cursorCol === lastCol && cursorRow === widestRow)) ? _overflowAmountCache.x : -1,
                                    y: (textareaAutoWrapping ? cursorIsLastPosition || textareaRowsChanged && (previousOverflowAmount ? (currScroll.y === previousOverflowAmount.y) : false) : (cursorIsLastPosition || textareaRowsChanged) && cursorRow === lastRow) ? _overflowAmountCache.y : -1
                                };
                                currScroll.x = textareaScrollAmount.x > -1 ? (_isRTL && _normalizeRTLCache && _rtlScrollBehavior.i ? 0 : textareaScrollAmount.x) : currScroll.x; //if inverted, scroll to 0 -> normalized this means to max scroll offset.
                                currScroll.y = textareaScrollAmount.y > -1 ? textareaScrollAmount.y : currScroll.y;
                            }
                            _textareaInfoCache = textareaInfo;
                        }
                        if (_isRTL && _rtlScrollBehavior.i && _nativeScrollbarIsOverlaid.y && hasOverflow.x && _normalizeRTLCache)
                            currScroll.x += _contentBorderSize.w || 0;
                        if (widthAuto)
                            _hostElement[_strScrollLeft](0);
                        if (heightAuto)
                            _hostElement[_strScrollTop](0);
                        _viewportElement[_strScrollLeft](currScroll.x)[_strScrollTop](currScroll.y);

                        //scrollbars management:
                        var scrollbarsVisibilityVisible = scrollbarsVisibility === 'v';
                        var scrollbarsVisibilityHidden = scrollbarsVisibility === 'h';
                        var scrollbarsVisibilityAuto = scrollbarsVisibility === 'a';
                        var refreshScrollbarsVisibility = function (showX, showY) {
                            showY = showY === undefined ? showX : showY;
                            refreshScrollbarAppearance(true, showX, canScroll.x)
                            refreshScrollbarAppearance(false, showY, canScroll.y)
                        };

                        //manage class name which indicates scrollable overflow
                        addRemoveClass(_hostElement, _classNameHostOverflow, hideOverflow.x || hideOverflow.y);
                        addRemoveClass(_hostElement, _classNameHostOverflowX, hideOverflow.x);
                        addRemoveClass(_hostElement, _classNameHostOverflowY, hideOverflow.y);

                        //add or remove rtl class name for styling purposes except when its body, then the scrollbar stays
                        if (cssDirectionChanged && !_isBody) {
                            addRemoveClass(_hostElement, _classNameHostRTL, _isRTL);
                        }

                        //manage the resize feature (CSS3 resize "polyfill" for this plugin)
                        if (_isBody)
                            addClass(_hostElement, _classNameHostResizeDisabled);
                        if (resizeChanged) {
                            addRemoveClass(_hostElement, _classNameHostResizeDisabled, _resizeNone);
                            addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResize, !_resizeNone);
                            addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeB, _resizeBoth);
                            addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeH, _resizeHorizontal);
                            addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeV, _resizeVertical);
                        }

                        //manage the scrollbars general visibility + the scrollbar interactivity (unusable class name)
                        if (scrollbarsVisibilityChanged || overflowBehaviorChanged || hideOverflow.c || hasOverflow.c || ignoreOverlayScrollbarHidingChanged) {
                            if (ignoreOverlayScrollbarHiding) {
                                if (ignoreOverlayScrollbarHidingChanged) {
                                    removeClass(_hostElement, _classNameHostScrolling);
                                    if (ignoreOverlayScrollbarHiding) {
                                        refreshScrollbarsVisibility(false);
                                    }
                                }
                            }
                            else if (scrollbarsVisibilityAuto) {
                                refreshScrollbarsVisibility(canScroll.x, canScroll.y);
                            }
                            else if (scrollbarsVisibilityVisible) {
                                refreshScrollbarsVisibility(true);
                            }
                            else if (scrollbarsVisibilityHidden) {
                                refreshScrollbarsVisibility(false);
                            }
                        }

                        //manage the scrollbars auto hide feature (auto hide them after specific actions)
                        if (scrollbarsAutoHideChanged || ignoreOverlayScrollbarHidingChanged) {
                            setupHostMouseTouchEvents(!_scrollbarsAutoHideLeave && !_scrollbarsAutoHideMove);
                            refreshScrollbarsAutoHide(_scrollbarsAutoHideNever, !_scrollbarsAutoHideNever);
                        }

                        //manage scrollbars handle length & offset - don't remove!
                        if (hostSizeChanged || overflowAmount.c || heightAutoChanged || widthAutoChanged || resizeChanged || boxSizingChanged || paddingAbsoluteChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged) {
                            refreshScrollbarHandleLength(true);
                            refreshScrollbarHandleOffset(true);
                            refreshScrollbarHandleLength(false);
                            refreshScrollbarHandleOffset(false);
                        }

                        //manage interactivity
                        if (scrollbarsClickScrollingChanged)
                            refreshScrollbarsInteractive(true, scrollbarsClickScrolling);
                        if (scrollbarsDragScrollingChanged)
                            refreshScrollbarsInteractive(false, scrollbarsDragScrolling);

                        //callbacks:
                        dispatchCallback('onDirectionChanged', {
                            isRTL: _isRTL,
                            dir: cssDirection
                        }, cssDirectionChanged);
                        dispatchCallback('onHostSizeChanged', {
                            width: _hostSizeCache.w,
                            height: _hostSizeCache.h
                        }, hostSizeChanged);
                        dispatchCallback('onContentSizeChanged', {
                            width: _contentScrollSizeCache.w,
                            height: _contentScrollSizeCache.h
                        }, contentSizeChanged);
                        dispatchCallback('onOverflowChanged', {
                            x: hasOverflow.x,
                            y: hasOverflow.y,
                            xScrollable: hideOverflow.xs,
                            yScrollable: hideOverflow.ys,
                            clipped: hideOverflow.x || hideOverflow.y
                        }, hasOverflow.c || hideOverflow.c);
                        dispatchCallback('onOverflowAmountChanged', {
                            x: overflowAmount.x,
                            y: overflowAmount.y
                        }, overflowAmount.c);
                    }

                    //fix body min size
                    if (_isBody && _bodyMinSizeCache && (_hasOverflowCache.c || _bodyMinSizeCache.c)) {
                        //its possible that no min size was measured until now, because the content arrange element was just added now, in this case, measure now the min size.
                        if (!_bodyMinSizeCache.f)
                            bodyMinSizeChanged();
                        if (_nativeScrollbarIsOverlaid.y && _hasOverflowCache.x)
                            _contentElement.css(_strMinMinus + _strWidth, _bodyMinSizeCache.w + _overlayScrollbarDummySize.y);
                        if (_nativeScrollbarIsOverlaid.x && _hasOverflowCache.y)
                            _contentElement.css(_strMinMinus + _strHeight, _bodyMinSizeCache.h + _overlayScrollbarDummySize.x);
                        _bodyMinSizeCache.c = false;
                    }

                    if (_initialized && changedOptions.updateOnLoad) {
                        updateElementsOnLoad();
                    }

                    //freezeResizeObserver(_sizeObserverElement, false);
                    //freezeResizeObserver(_sizeAutoObserverElement, false);

                    dispatchCallback('onUpdated', { forced: force });
                }

                /**
                 * Updates the found elements of which the load event shall be handled.
                 */
                function updateElementsOnLoad() {
                    if (!_isTextarea) {
                        eachUpdateOnLoad(function (i, updateOnLoadSelector) {
                            _contentElement.find(updateOnLoadSelector).each(function (i, el) {
                                // if element doesn't have a updateOnLoadCallback applied
                                if (COMPATIBILITY.inA(el, _updateOnLoadElms) < 0) {
                                    _updateOnLoadElms.push(el);
                                    FRAMEWORK(el)
                                        .off(_updateOnLoadEventName, updateOnLoadCallback)
                                        .on(_updateOnLoadEventName, updateOnLoadCallback);
                                }
                            });
                        });
                    }
                }

                //==== Options ====//

                /**
                 * Sets new options but doesn't call the update method.
                 * @param newOptions The object which contains the new options.
                 * @returns {*} A object which contains the changed options.
                 */
                function setOptions(newOptions) {
                    var validatedOpts = _pluginsOptions._validate(newOptions, _pluginsOptions._template, true, _currentOptions)

                    _currentOptions = extendDeep({}, _currentOptions, validatedOpts._default);
                    _currentPreparedOptions = extendDeep({}, _currentPreparedOptions, validatedOpts._prepared);

                    return validatedOpts._prepared;
                }


                //==== Structure ====//

                /**
                 * Builds or destroys the wrapper and helper DOM elements.
                 * @param destroy Indicates whether the DOM shall be build or destroyed.
                 */
                /**
                 * Builds or destroys the wrapper and helper DOM elements.
                 * @param destroy Indicates whether the DOM shall be build or destroyed.
                 */
                function setupStructureDOM(destroy) {
                    var strParent = 'parent';
                    var classNameResizeObserverHost = 'os-resize-observer-host';
                    var classNameTextareaElementFull = _classNameTextareaElement + _strSpace + _classNameTextInherit;
                    var textareaClass = _isTextarea ? _strSpace + _classNameTextInherit : _strEmpty;
                    var adoptAttrs = _currentPreparedOptions.textarea.inheritedAttrs;
                    var adoptAttrsMap = {};
                    var applyAdoptedAttrs = function () {
                        var applyAdoptedAttrsElm = destroy ? _targetElement : _hostElement;
                        each(adoptAttrsMap, function (key, value) {
                            if (type(value) == TYPES.s) {
                                if (key == LEXICON.c)
                                    applyAdoptedAttrsElm.addClass(value);
                                else
                                    applyAdoptedAttrsElm.attr(key, value);
                            }
                        });
                    };
                    var hostElementClassNames = [
                        _classNameHostElement,
                        _classNameHostElementForeign,
                        _classNameHostTextareaElement,
                        _classNameHostResizeDisabled,
                        _classNameHostRTL,
                        _classNameHostScrollbarHorizontalHidden,
                        _classNameHostScrollbarVerticalHidden,
                        _classNameHostTransition,
                        _classNameHostScrolling,
                        _classNameHostOverflow,
                        _classNameHostOverflowX,
                        _classNameHostOverflowY,
                        _classNameThemeNone,
                        _classNameTextareaElement,
                        _classNameTextInherit,
                        _classNameCache].join(_strSpace);
                    var hostElementCSS = {};

                    //get host element as first element, because that's the most upper element and required for the other elements
                    _hostElement = _hostElement || (_isTextarea ? (_domExists ? _targetElement[strParent]()[strParent]()[strParent]()[strParent]() : FRAMEWORK(generateDiv(_classNameHostTextareaElement))) : _targetElement);
                    _contentElement = _contentElement || selectOrGenerateDivByClass(_classNameContentElement + textareaClass);
                    _viewportElement = _viewportElement || selectOrGenerateDivByClass(_classNameViewportElement + textareaClass);
                    _paddingElement = _paddingElement || selectOrGenerateDivByClass(_classNamePaddingElement + textareaClass);
                    _sizeObserverElement = _sizeObserverElement || selectOrGenerateDivByClass(classNameResizeObserverHost);
                    _textareaCoverElement = _textareaCoverElement || (_isTextarea ? selectOrGenerateDivByClass(_classNameTextareaCoverElement) : undefined);

                    //add this class to workaround class changing issues with UI frameworks especially Vue
                    if (_domExists)
                        addClass(_hostElement, _classNameHostElementForeign);

                    //on destroy, remove all generated class names from the host element before collecting the adopted attributes 
                    //to prevent adopting generated class names
                    if (destroy)
                        removeClass(_hostElement, hostElementClassNames);

                    //collect all adopted attributes
                    adoptAttrs = type(adoptAttrs) == TYPES.s ? adoptAttrs.split(_strSpace) : adoptAttrs;
                    if (COMPATIBILITY.isA(adoptAttrs) && _isTextarea) {
                        each(adoptAttrs, function (i, v) {
                            if (type(v) == TYPES.s) {
                                adoptAttrsMap[v] = destroy ? _hostElement.attr(v) : _targetElement.attr(v);
                            }
                        });
                    }

                    if (!destroy) {
                        if (_isTextarea) {
                            if (!_currentPreparedOptions.sizeAutoCapable) {
                                hostElementCSS[_strWidth] = _targetElement.css(_strWidth);
                                hostElementCSS[_strHeight] = _targetElement.css(_strHeight);
                            }

                            if (!_domExists)
                                _targetElement.addClass(_classNameTextInherit).wrap(_hostElement);

                            //jQuery clones elements in wrap functions, so we have to select them again
                            _hostElement = _targetElement[strParent]().css(hostElementCSS);
                        }

                        if (!_domExists) {
                            //add the correct class to the target element
                            addClass(_targetElement, _isTextarea ? classNameTextareaElementFull : _classNameHostElement);

                            //wrap the content into the generated elements to create the required DOM
                            _hostElement.wrapInner(_contentElement)
                                .wrapInner(_viewportElement)
                                .wrapInner(_paddingElement)
                                .prepend(_sizeObserverElement);

                            //jQuery clones elements in wrap functions, so we have to select them again
                            _contentElement = findFirst(_hostElement, _strDot + _classNameContentElement);
                            _viewportElement = findFirst(_hostElement, _strDot + _classNameViewportElement);
                            _paddingElement = findFirst(_hostElement, _strDot + _classNamePaddingElement);

                            if (_isTextarea) {
                                _contentElement.prepend(_textareaCoverElement);
                                applyAdoptedAttrs();
                            }
                        }

                        if (_nativeScrollbarStyling)
                            addClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible);
                        if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)
                            addClass(_viewportElement, _classNameViewportNativeScrollbarsOverlaid);
                        if (_isBody)
                            addClass(_htmlElement, _classNameHTMLElement);

                        _sizeObserverElementNative = _sizeObserverElement[0];
                        _hostElementNative = _hostElement[0];
                        _paddingElementNative = _paddingElement[0];
                        _viewportElementNative = _viewportElement[0];
                        _contentElementNative = _contentElement[0];

                        updateViewportAttrsFromTarget();
                    }
                    else {
                        if (_domExists && _initialized) {
                            //clear size observer
                            _sizeObserverElement.children().remove();

                            //remove the style property and classes from already generated elements
                            each([_paddingElement, _viewportElement, _contentElement, _textareaCoverElement], function (i, elm) {
                                if (elm) {
                                    removeClass(elm.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
                                }
                            });

                            //add classes to the host element which was removed previously to match the expected DOM
                            addClass(_hostElement, _isTextarea ? _classNameHostTextareaElement : _classNameHostElement);
                        }
                        else {
                            //remove size observer
                            remove(_sizeObserverElement);

                            //unwrap the content to restore DOM
                            _contentElement.contents()
                                .unwrap()
                                .unwrap()
                                .unwrap();

                            if (_isTextarea) {
                                _targetElement.unwrap();
                                remove(_hostElement);
                                remove(_textareaCoverElement);
                                applyAdoptedAttrs();
                            }
                        }

                        if (_isTextarea)
                            _targetElement.removeAttr(LEXICON.s);

                        if (_isBody)
                            removeClass(_htmlElement, _classNameHTMLElement);
                    }
                }

                /**
                 * Adds or removes all wrapper elements interactivity events.
                 * @param destroy Indicates whether the Events shall be added or removed.
                 */
                function setupStructureEvents() {
                    var textareaKeyDownRestrictedKeyCodes = [
                        112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 123,    //F1 to F12
                        33, 34,                                                   //page up, page down
                        37, 38, 39, 40,                                           //left, up, right, down arrows
                        16, 17, 18, 19, 20, 144                                   //Shift, Ctrl, Alt, Pause, CapsLock, NumLock
                    ];
                    var textareaKeyDownKeyCodesList = [];
                    var textareaUpdateIntervalID;
                    var scrollStopTimeoutId;
                    var scrollStopDelay = 175;
                    var strFocus = 'focus';

                    function updateTextarea(doClearInterval) {
                        textareaUpdate();
                        _base.update(_strAuto);
                        if (doClearInterval && _autoUpdateRecommended)
                            clearInterval(textareaUpdateIntervalID);
                    }
                    function textareaOnScroll(event) {
                        _targetElement[_strScrollLeft](_rtlScrollBehavior.i && _normalizeRTLCache ? 9999999 : 0);
                        _targetElement[_strScrollTop](0);
                        COMPATIBILITY.prvD(event);
                        COMPATIBILITY.stpP(event);
                        return false;
                    }
                    function textareaOnDrop(event) {
                        setTimeout(function () {
                            if (!_destroyed)
                                updateTextarea();
                        }, 50);
                    }
                    function textareaOnFocus() {
                        _textareaHasFocus = true;
                        addClass(_hostElement, strFocus);
                    }
                    function textareaOnFocusout() {
                        _textareaHasFocus = false;
                        textareaKeyDownKeyCodesList = [];
                        removeClass(_hostElement, strFocus);
                        updateTextarea(true);
                    }
                    function textareaOnKeyDown(event) {
                        var keyCode = event.keyCode;

                        if (inArray(keyCode, textareaKeyDownRestrictedKeyCodes) < 0) {
                            if (!textareaKeyDownKeyCodesList[LEXICON.l]) {
                                updateTextarea();
                                textareaUpdateIntervalID = setInterval(updateTextarea, 1000 / 60);
                            }
                            if (inArray(keyCode, textareaKeyDownKeyCodesList) < 0)
                                textareaKeyDownKeyCodesList.push(keyCode);
                        }
                    }
                    function textareaOnKeyUp(event) {
                        var keyCode = event.keyCode;
                        var index = inArray(keyCode, textareaKeyDownKeyCodesList);

                        if (inArray(keyCode, textareaKeyDownRestrictedKeyCodes) < 0) {
                            if (index > -1)
                                textareaKeyDownKeyCodesList.splice(index, 1);
                            if (!textareaKeyDownKeyCodesList[LEXICON.l])
                                updateTextarea(true);
                        }
                    }
                    function contentOnTransitionEnd(event) {
                        if (_autoUpdateCache === true)
                            return;
                        event = event.originalEvent || event;
                        if (isSizeAffectingCSSProperty(event.propertyName))
                            _base.update(_strAuto);
                    }
                    function viewportOnScroll(event) {
                        if (!_sleeping) {
                            if (scrollStopTimeoutId !== undefined)
                                clearTimeout(scrollStopTimeoutId);
                            else {
                                if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                                    refreshScrollbarsAutoHide(true);

                                if (!nativeOverlayScrollbarsAreActive())
                                    addClass(_hostElement, _classNameHostScrolling);

                                dispatchCallback('onScrollStart', event);
                            }

                            //if a scrollbars handle gets dragged, the mousemove event is responsible for refreshing the handle offset
                            //because if CSS scroll-snap is used, the handle offset gets only refreshed on every snap point
                            //this looks laggy & clunky, it looks much better if the offset refreshes with the mousemove
                            if (!_scrollbarsHandlesDefineScrollPos) {
                                refreshScrollbarHandleOffset(true);
                                refreshScrollbarHandleOffset(false);
                            }
                            dispatchCallback('onScroll', event);

                            scrollStopTimeoutId = setTimeout(function () {
                                if (!_destroyed) {
                                    //OnScrollStop:
                                    clearTimeout(scrollStopTimeoutId);
                                    scrollStopTimeoutId = undefined;

                                    if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                                        refreshScrollbarsAutoHide(false);

                                    if (!nativeOverlayScrollbarsAreActive())
                                        removeClass(_hostElement, _classNameHostScrolling);

                                    dispatchCallback('onScrollStop', event);
                                }
                            }, scrollStopDelay);
                        }
                    }


                    if (_isTextarea) {
                        if (_msieVersion > 9 || !_autoUpdateRecommended) {
                            addDestroyEventListener(_targetElement, 'input', updateTextarea);
                        }
                        else {
                            addDestroyEventListener(_targetElement,
                                [_strKeyDownEvent, _strKeyUpEvent],
                                [textareaOnKeyDown, textareaOnKeyUp]);
                        }

                        addDestroyEventListener(_targetElement,
                            [_strScroll, 'drop', strFocus, strFocus + 'out'],
                            [textareaOnScroll, textareaOnDrop, textareaOnFocus, textareaOnFocusout]);
                    }
                    else {
                        addDestroyEventListener(_contentElement, _strTransitionEndEvent, contentOnTransitionEnd);
                    }
                    addDestroyEventListener(_viewportElement, _strScroll, viewportOnScroll, true);
                }


                //==== Scrollbars ====//

                /**
                 * Builds or destroys all scrollbar DOM elements (scrollbar, track, handle)
                 * @param destroy Indicates whether the DOM shall be build or destroyed.
                 */
                function setupScrollbarsDOM(destroy) {
                    var selectOrGenerateScrollbarDOM = function (isHorizontal) {
                        var scrollbarClassName = isHorizontal ? _classNameScrollbarHorizontal : _classNameScrollbarVertical;
                        var scrollbar = selectOrGenerateDivByClass(_classNameScrollbar + _strSpace + scrollbarClassName, true);
                        var track = selectOrGenerateDivByClass(_classNameScrollbarTrack, scrollbar);
                        var handle = selectOrGenerateDivByClass(_classNameScrollbarHandle, scrollbar);

                        if (!_domExists && !destroy) {
                            scrollbar.append(track);
                            track.append(handle);
                        }

                        return {
                            _scrollbar: scrollbar,
                            _track: track,
                            _handle: handle
                        };
                    };
                    function resetScrollbarDOM(isHorizontal) {
                        var scrollbarVars = getScrollbarVars(isHorizontal);
                        var scrollbar = scrollbarVars._scrollbar;
                        var track = scrollbarVars._track;
                        var handle = scrollbarVars._handle;

                        if (_domExists && _initialized) {
                            each([scrollbar, track, handle], function (i, elm) {
                                removeClass(elm.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
                            });
                        }
                        else {
                            remove(scrollbar || selectOrGenerateScrollbarDOM(isHorizontal)._scrollbar);
                        }
                    }
                    var horizontalElements;
                    var verticalElements;

                    if (!destroy) {
                        horizontalElements = selectOrGenerateScrollbarDOM(true);
                        verticalElements = selectOrGenerateScrollbarDOM();

                        _scrollbarHorizontalElement = horizontalElements._scrollbar;
                        _scrollbarHorizontalTrackElement = horizontalElements._track;
                        _scrollbarHorizontalHandleElement = horizontalElements._handle;
                        _scrollbarVerticalElement = verticalElements._scrollbar;
                        _scrollbarVerticalTrackElement = verticalElements._track;
                        _scrollbarVerticalHandleElement = verticalElements._handle;

                        if (!_domExists) {
                            _paddingElement.after(_scrollbarVerticalElement);
                            _paddingElement.after(_scrollbarHorizontalElement);
                        }
                    }
                    else {
                        resetScrollbarDOM(true);
                        resetScrollbarDOM();
                    }
                }

                /**
                 * Initializes all scrollbar interactivity events. (track and handle dragging, clicking, scrolling)
                 * @param isHorizontal True if the target scrollbar is the horizontal scrollbar, false if the target scrollbar is the vertical scrollbar.
                 */
                function setupScrollbarEvents(isHorizontal) {
                    var scrollbarVars = getScrollbarVars(isHorizontal);
                    var scrollbarVarsInfo = scrollbarVars._info;
                    var insideIFrame = _windowElementNative.top !== _windowElementNative;
                    var xy = scrollbarVars._x_y;
                    var XY = scrollbarVars._X_Y;
                    var scroll = _strScroll + scrollbarVars._Left_Top;
                    var strActive = 'active';
                    var strSnapHandle = 'snapHandle';
                    var strClickEvent = 'click';
                    var scrollDurationFactor = 1;
                    var increaseDecreaseScrollAmountKeyCodes = [16, 17]; //shift, ctrl
                    var trackTimeout;
                    var mouseDownScroll;
                    var mouseDownOffset;
                    var mouseDownInvertedScale;

                    function getPointerPosition(event) {
                        return _msieVersion && insideIFrame ? event['screen' + XY] : COMPATIBILITY.page(event)[xy]; //use screen coordinates in EDGE & IE because the page values are incorrect in frames.
                    }
                    function getPreparedScrollbarsOption(name) {
                        return _currentPreparedOptions.scrollbars[name];
                    }
                    function increaseTrackScrollAmount() {
                        scrollDurationFactor = 0.5;
                    }
                    function decreaseTrackScrollAmount() {
                        scrollDurationFactor = 1;
                    }
                    function stopClickEventPropagation(event) {
                        COMPATIBILITY.stpP(event);
                    }
                    function documentKeyDown(event) {
                        if (inArray(event.keyCode, increaseDecreaseScrollAmountKeyCodes) > -1)
                            increaseTrackScrollAmount();
                    }
                    function documentKeyUp(event) {
                        if (inArray(event.keyCode, increaseDecreaseScrollAmountKeyCodes) > -1)
                            decreaseTrackScrollAmount();
                    }
                    function onMouseTouchDownContinue(event) {
                        var originalEvent = event.originalEvent || event;
                        var isTouchEvent = originalEvent.touches !== undefined;
                        return _sleeping || _destroyed || nativeOverlayScrollbarsAreActive() || !_scrollbarsDragScrollingCache || (isTouchEvent && !getPreparedScrollbarsOption('touchSupport')) ? false : COMPATIBILITY.mBtn(event) === 1 || isTouchEvent;
                    }
                    function documentDragMove(event) {
                        if (onMouseTouchDownContinue(event)) {
                            var trackLength = scrollbarVarsInfo._trackLength;
                            var handleLength = scrollbarVarsInfo._handleLength;
                            var scrollRange = scrollbarVarsInfo._maxScroll;
                            var scrollRaw = (getPointerPosition(event) - mouseDownOffset) * mouseDownInvertedScale;
                            var scrollDeltaPercent = scrollRaw / (trackLength - handleLength);
                            var scrollDelta = (scrollRange * scrollDeltaPercent);
                            scrollDelta = isFinite(scrollDelta) ? scrollDelta : 0;
                            if (_isRTL && isHorizontal && !_rtlScrollBehavior.i)
                                scrollDelta *= -1;

                            _viewportElement[scroll](MATH.round(mouseDownScroll + scrollDelta));

                            if (_scrollbarsHandlesDefineScrollPos)
                                refreshScrollbarHandleOffset(isHorizontal, mouseDownScroll + scrollDelta);

                            if (!_supportPassiveEvents)
                                COMPATIBILITY.prvD(event);
                        }
                        else
                            documentMouseTouchUp(event);
                    }
                    function documentMouseTouchUp(event) {
                        event = event || event.originalEvent;

                        setupResponsiveEventListener(_documentElement,
                            [_strMouseTouchMoveEvent, _strMouseTouchUpEvent, _strKeyDownEvent, _strKeyUpEvent, _strSelectStartEvent],
                            [documentDragMove, documentMouseTouchUp, documentKeyDown, documentKeyUp, documentOnSelectStart],
                            true);
                        COMPATIBILITY.rAF()(function() {
                            setupResponsiveEventListener(_documentElement, strClickEvent, stopClickEventPropagation, true, { _capture: true });
                        });
                        
                            
                        if (_scrollbarsHandlesDefineScrollPos)
                            refreshScrollbarHandleOffset(isHorizontal, true);

                        _scrollbarsHandlesDefineScrollPos = false;
                        removeClass(_bodyElement, _classNameDragging);
                        removeClass(scrollbarVars._handle, strActive);
                        removeClass(scrollbarVars._track, strActive);
                        removeClass(scrollbarVars._scrollbar, strActive);

                        mouseDownScroll = undefined;
                        mouseDownOffset = undefined;
                        mouseDownInvertedScale = 1;

                        decreaseTrackScrollAmount();

                        if (trackTimeout !== undefined) {
                            _base.scrollStop();
                            clearTimeout(trackTimeout);
                            trackTimeout = undefined;
                        }

                        if (event) {
                            var rect = _hostElementNative[LEXICON.bCR]();
                            var mouseInsideHost = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;

                            //if mouse is outside host element
                            if (!mouseInsideHost)
                                hostOnMouseLeave();

                            if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                                refreshScrollbarsAutoHide(false);
                        }
                    }
                    function onHandleMouseTouchDown(event) {
                        if (onMouseTouchDownContinue(event))
                            onHandleMouseTouchDownAction(event);
                    }
                    function onHandleMouseTouchDownAction(event) {
                        mouseDownScroll = _viewportElement[scroll]();
                        mouseDownScroll = isNaN(mouseDownScroll) ? 0 : mouseDownScroll;
                        if (_isRTL && isHorizontal && !_rtlScrollBehavior.n || !_isRTL)
                            mouseDownScroll = mouseDownScroll < 0 ? 0 : mouseDownScroll;

                        mouseDownInvertedScale = getHostElementInvertedScale()[xy];
                        mouseDownOffset = getPointerPosition(event);

                        _scrollbarsHandlesDefineScrollPos = !getPreparedScrollbarsOption(strSnapHandle);
                        addClass(_bodyElement, _classNameDragging);
                        addClass(scrollbarVars._handle, strActive);
                        addClass(scrollbarVars._scrollbar, strActive);

                        setupResponsiveEventListener(_documentElement,
                            [_strMouseTouchMoveEvent, _strMouseTouchUpEvent, _strSelectStartEvent],
                            [documentDragMove, documentMouseTouchUp, documentOnSelectStart]);
                        COMPATIBILITY.rAF()(function() {
                            setupResponsiveEventListener(_documentElement, strClickEvent, stopClickEventPropagation, false, { _capture: true });
                        });
                        

                        if (_msieVersion || !_documentMixed)
                            COMPATIBILITY.prvD(event);
                        COMPATIBILITY.stpP(event);
                    }
                    function onTrackMouseTouchDown(event) {
                        if (onMouseTouchDownContinue(event)) {
                            var handleToViewportRatio = scrollbarVars._info._handleLength / Math.round(MATH.min(1, _viewportSize[scrollbarVars._w_h] / _contentScrollSizeCache[scrollbarVars._w_h]) * scrollbarVars._info._trackLength);
                            var scrollDistance = MATH.round(_viewportSize[scrollbarVars._w_h] * handleToViewportRatio);
                            var scrollBaseDuration = 270 * handleToViewportRatio;
                            var scrollFirstIterationDelay = 400 * handleToViewportRatio;
                            var trackOffset = scrollbarVars._track.offset()[scrollbarVars._left_top];
                            var ctrlKey = event.ctrlKey;
                            var instantScroll = event.shiftKey;
                            var instantScrollTransition = instantScroll && ctrlKey;
                            var isFirstIteration = true;
                            var easing = 'linear';
                            var decreaseScroll;
                            var finishedCondition;
                            var scrollActionFinsished = function (transition) {
                                if (_scrollbarsHandlesDefineScrollPos)
                                    refreshScrollbarHandleOffset(isHorizontal, transition);
                            };
                            var scrollActionInstantFinished = function () {
                                scrollActionFinsished();
                                onHandleMouseTouchDownAction(event);
                            };
                            var scrollAction = function () {
                                if (!_destroyed) {
                                    var mouseOffset = (mouseDownOffset - trackOffset) * mouseDownInvertedScale;
                                    var handleOffset = scrollbarVarsInfo._handleOffset;
                                    var trackLength = scrollbarVarsInfo._trackLength;
                                    var handleLength = scrollbarVarsInfo._handleLength;
                                    var scrollRange = scrollbarVarsInfo._maxScroll;
                                    var currScroll = scrollbarVarsInfo._currentScroll;
                                    var scrollDuration = scrollBaseDuration * scrollDurationFactor;
                                    var timeoutDelay = isFirstIteration ? MATH.max(scrollFirstIterationDelay, scrollDuration) : scrollDuration;
                                    var instantScrollPosition = scrollRange * ((mouseOffset - (handleLength / 2)) / (trackLength - handleLength)); // 100% * positionPercent
                                    var rtlIsNormal = _isRTL && isHorizontal && ((!_rtlScrollBehavior.i && !_rtlScrollBehavior.n) || _normalizeRTLCache);
                                    var decreaseScrollCondition = rtlIsNormal ? handleOffset < mouseOffset : handleOffset > mouseOffset;
                                    var scrollObj = {};
                                    var animationObj = {
                                        easing: easing,
                                        step: function (now) {
                                            if (_scrollbarsHandlesDefineScrollPos) {
                                                _viewportElement[scroll](now); //https://github.com/jquery/jquery/issues/4340
                                                refreshScrollbarHandleOffset(isHorizontal, now);
                                            }
                                        }
                                    };
                                    instantScrollPosition = isFinite(instantScrollPosition) ? instantScrollPosition : 0;
                                    instantScrollPosition = _isRTL && isHorizontal && !_rtlScrollBehavior.i ? (scrollRange - instantScrollPosition) : instantScrollPosition;

                                    //_base.scrollStop();

                                    if (instantScroll) {
                                        _viewportElement[scroll](instantScrollPosition); //scroll instantly to new position
                                        if (instantScrollTransition) {
                                            //get the scroll position after instant scroll (in case CSS Snap Points are used) to get the correct snapped scroll position
                                            //and the animation stops at the correct point
                                            instantScrollPosition = _viewportElement[scroll]();
                                            //scroll back to the position before instant scrolling so animation can be performed
                                            _viewportElement[scroll](currScroll);

                                            instantScrollPosition = rtlIsNormal && _rtlScrollBehavior.i ? (scrollRange - instantScrollPosition) : instantScrollPosition;
                                            instantScrollPosition = rtlIsNormal && _rtlScrollBehavior.n ? -instantScrollPosition : instantScrollPosition;

                                            scrollObj[xy] = instantScrollPosition;
                                            _base.scroll(scrollObj, extendDeep(animationObj, {
                                                duration: 130,
                                                complete: scrollActionInstantFinished
                                            }));
                                        }
                                        else
                                            scrollActionInstantFinished();
                                    }
                                    else {
                                        decreaseScroll = isFirstIteration ? decreaseScrollCondition : decreaseScroll;
                                        finishedCondition = rtlIsNormal
                                            ? (decreaseScroll ? handleOffset + handleLength >= mouseOffset : handleOffset <= mouseOffset)
                                            : (decreaseScroll ? handleOffset <= mouseOffset : handleOffset + handleLength >= mouseOffset);

                                        if (finishedCondition) {
                                            clearTimeout(trackTimeout);
                                            _base.scrollStop();
                                            trackTimeout = undefined;
                                            scrollActionFinsished(true);
                                        }
                                        else {
                                            trackTimeout = setTimeout(scrollAction, timeoutDelay);

                                            scrollObj[xy] = (decreaseScroll ? '-=' : '+=') + scrollDistance;
                                            _base.scroll(scrollObj, extendDeep(animationObj, {
                                                duration: scrollDuration
                                            }));
                                        }
                                        isFirstIteration = false;
                                    }
                                }
                            };
                            if (ctrlKey)
                                increaseTrackScrollAmount();

                            mouseDownInvertedScale = getHostElementInvertedScale()[xy];
                            mouseDownOffset = COMPATIBILITY.page(event)[xy];

                            _scrollbarsHandlesDefineScrollPos = !getPreparedScrollbarsOption(strSnapHandle);
                            addClass(_bodyElement, _classNameDragging);
                            addClass(scrollbarVars._track, strActive);
                            addClass(scrollbarVars._scrollbar, strActive);

                            setupResponsiveEventListener(_documentElement,
                                [_strMouseTouchUpEvent, _strKeyDownEvent, _strKeyUpEvent, _strSelectStartEvent],
                                [documentMouseTouchUp, documentKeyDown, documentKeyUp, documentOnSelectStart]);

                            scrollAction();
                            COMPATIBILITY.prvD(event);
                            COMPATIBILITY.stpP(event);
                        }
                    }
                    function onTrackMouseTouchEnter(event) {
                        //make sure both scrollbars will stay visible if one scrollbar is hovered if autoHide is "scroll" or "move".
                        _scrollbarsHandleHovered = true;
                        if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                            refreshScrollbarsAutoHide(true);
                    }
                    function onTrackMouseTouchLeave(event) {
                        _scrollbarsHandleHovered = false;
                        if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                            refreshScrollbarsAutoHide(false);
                    }
                    function onScrollbarMouseTouchDown(event) {
                        COMPATIBILITY.stpP(event);
                    }

                    addDestroyEventListener(scrollbarVars._handle,
                        _strMouseTouchDownEvent,
                        onHandleMouseTouchDown);
                    addDestroyEventListener(scrollbarVars._track,
                        [_strMouseTouchDownEvent, _strMouseEnter, _strMouseLeave],
                        [onTrackMouseTouchDown, onTrackMouseTouchEnter, onTrackMouseTouchLeave]);
                    addDestroyEventListener(scrollbarVars._scrollbar,
                        _strMouseTouchDownEvent,
                        onScrollbarMouseTouchDown);

                    if (_supportTransition) {
                        addDestroyEventListener(scrollbarVars._scrollbar, _strTransitionEndEvent, function (event) {
                            if (event.target !== scrollbarVars._scrollbar[0])
                                return;
                            refreshScrollbarHandleLength(isHorizontal);
                            refreshScrollbarHandleOffset(isHorizontal);
                        });
                    }
                }

                /**
                 * Shows or hides the given scrollbar and applied a class name which indicates if the scrollbar is scrollable or not.
                 * @param isHorizontal True if the horizontal scrollbar is the target, false if the vertical scrollbar is the target.
                 * @param shallBeVisible True if the scrollbar shall be shown, false if hidden.
                 * @param canScroll True if the scrollbar is scrollable, false otherwise.
                 */
                function refreshScrollbarAppearance(isHorizontal, shallBeVisible, canScroll) {
                    var scrollbarHiddenClassName = isHorizontal ? _classNameHostScrollbarHorizontalHidden : _classNameHostScrollbarVerticalHidden;
                    var scrollbarElement = isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement;

                    addRemoveClass(_hostElement, scrollbarHiddenClassName, !shallBeVisible);
                    addRemoveClass(scrollbarElement, _classNameScrollbarUnusable, !canScroll);
                }

                /**
                 * Autoshows / autohides both scrollbars with.
                 * @param shallBeVisible True if the scrollbars shall be autoshown (only the case if they are hidden by a autohide), false if the shall be auto hidden.
                 * @param delayfree True if the scrollbars shall be hidden without a delay, false or undefined otherwise.
                 */
                function refreshScrollbarsAutoHide(shallBeVisible, delayfree) {
                    clearTimeout(_scrollbarsAutoHideTimeoutId);
                    if (shallBeVisible) {
                        //if(_hasOverflowCache.x && _hideOverflowCache.xs)
                        removeClass(_scrollbarHorizontalElement, _classNameScrollbarAutoHidden);
                        //if(_hasOverflowCache.y && _hideOverflowCache.ys)
                        removeClass(_scrollbarVerticalElement, _classNameScrollbarAutoHidden);
                    }
                    else {
                        var anyActive;
                        var strActive = 'active';
                        var hide = function () {
                            if (!_scrollbarsHandleHovered && !_destroyed) {
                                anyActive = _scrollbarHorizontalHandleElement.hasClass(strActive) || _scrollbarVerticalHandleElement.hasClass(strActive);
                                if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove || _scrollbarsAutoHideLeave))
                                    addClass(_scrollbarHorizontalElement, _classNameScrollbarAutoHidden);
                                if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove || _scrollbarsAutoHideLeave))
                                    addClass(_scrollbarVerticalElement, _classNameScrollbarAutoHidden);
                            }
                        };
                        if (_scrollbarsAutoHideDelay > 0 && delayfree !== true)
                            _scrollbarsAutoHideTimeoutId = setTimeout(hide, _scrollbarsAutoHideDelay);
                        else
                            hide();
                    }
                }

                /**
                 * Refreshes the handle length of the given scrollbar.
                 * @param isHorizontal True if the horizontal scrollbar handle shall be refreshed, false if the vertical one shall be refreshed.
                 */
                function refreshScrollbarHandleLength(isHorizontal) {
                    var handleCSS = {};
                    var scrollbarVars = getScrollbarVars(isHorizontal);
                    var scrollbarVarsInfo = scrollbarVars._info;
                    var digit = 1000000;
                    //get and apply intended handle length
                    var handleRatio = MATH.min(1, _viewportSize[scrollbarVars._w_h] / _contentScrollSizeCache[scrollbarVars._w_h]);
                    handleCSS[scrollbarVars._width_height] = (MATH.floor(handleRatio * 100 * digit) / digit) + '%'; //the last * digit / digit is for flooring to the 4th digit

                    if (!nativeOverlayScrollbarsAreActive())
                        scrollbarVars._handle.css(handleCSS);

                    //measure the handle length to respect min & max length
                    scrollbarVarsInfo._handleLength = scrollbarVars._handle[0]['offset' + scrollbarVars._Width_Height];
                    scrollbarVarsInfo._handleLengthRatio = handleRatio;
                }

                /**
                 * Refreshes the handle offset of the given scrollbar.
                 * @param isHorizontal True if the horizontal scrollbar handle shall be refreshed, false if the vertical one shall be refreshed.
                 * @param scrollOrTransition The scroll position of the given scrollbar axis to which the handle shall be moved or a boolean which indicates whether a transition shall be applied. If undefined or boolean if the current scroll-offset is taken. (if isHorizontal ? scrollLeft : scrollTop)
                 */
                function refreshScrollbarHandleOffset(isHorizontal, scrollOrTransition) {
                    var transition = type(scrollOrTransition) == TYPES.b;
                    var transitionDuration = 250;
                    var isRTLisHorizontal = _isRTL && isHorizontal;
                    var scrollbarVars = getScrollbarVars(isHorizontal);
                    var scrollbarVarsInfo = scrollbarVars._info;
                    var strTranslateBrace = 'translate(';
                    var strTransform = VENDORS._cssProperty('transform');
                    var strTransition = VENDORS._cssProperty('transition');
                    var nativeScroll = isHorizontal ? _viewportElement[_strScrollLeft]() : _viewportElement[_strScrollTop]();
                    var currentScroll = scrollOrTransition === undefined || transition ? nativeScroll : scrollOrTransition;

                    //measure the handle length to respect min & max length
                    var handleLength = scrollbarVarsInfo._handleLength;
                    var trackLength = scrollbarVars._track[0]['offset' + scrollbarVars._Width_Height];
                    var handleTrackDiff = trackLength - handleLength;
                    var handleCSS = {};
                    var transformOffset;
                    var translateValue;

                    //DONT use the variable '_contentScrollSizeCache[scrollbarVars._w_h]' instead of '_viewportElement[0]['scroll' + scrollbarVars._Width_Height]'
                    // because its a bit behind during the small delay when content size updates
                    //(delay = mutationObserverContentLag, if its 0 then this var could be used)
                    var maxScroll = (_viewportElementNative[_strScroll + scrollbarVars._Width_Height] - _viewportElementNative['client' + scrollbarVars._Width_Height]) * (_rtlScrollBehavior.n && isRTLisHorizontal ? -1 : 1); //* -1 if rtl scroll max is negative
                    var getScrollRatio = function (base) {
                        return isNaN(base / maxScroll) ? 0 : MATH.max(0, MATH.min(1, base / maxScroll));
                    };
                    var getHandleOffset = function (scrollRatio) {
                        var offset = handleTrackDiff * scrollRatio;
                        offset = isNaN(offset) ? 0 : offset;
                        offset = (isRTLisHorizontal && !_rtlScrollBehavior.i) ? (trackLength - handleLength - offset) : offset;
                        offset = MATH.max(0, offset);
                        return offset;
                    };
                    var scrollRatio = getScrollRatio(nativeScroll);
                    var unsnappedScrollRatio = getScrollRatio(currentScroll);
                    var handleOffset = getHandleOffset(unsnappedScrollRatio);
                    var snappedHandleOffset = getHandleOffset(scrollRatio);

                    scrollbarVarsInfo._maxScroll = maxScroll;
                    scrollbarVarsInfo._currentScroll = nativeScroll;
                    scrollbarVarsInfo._currentScrollRatio = scrollRatio;

                    if (_supportTransform) {
                        transformOffset = isRTLisHorizontal ? -(trackLength - handleLength - handleOffset) : handleOffset; //in px
                        //transformOffset = (transformOffset / trackLength * 100) * (trackLength / handleLength); //in %
                        translateValue = isHorizontal ? strTranslateBrace + transformOffset + 'px, 0)' : strTranslateBrace + '0, ' + transformOffset + 'px)';

                        handleCSS[strTransform] = translateValue;

                        //apply or clear up transition
                        if (_supportTransition)
                            handleCSS[strTransition] = transition && MATH.abs(handleOffset - scrollbarVarsInfo._handleOffset) > 1 ? getCSSTransitionString(scrollbarVars._handle) + ', ' + (strTransform + _strSpace + transitionDuration + 'ms') : _strEmpty;
                    }
                    else
                        handleCSS[scrollbarVars._left_top] = handleOffset;


                    //only apply css if offset has changed and overflow exists.
                    if (!nativeOverlayScrollbarsAreActive()) {
                        scrollbarVars._handle.css(handleCSS);

                        //clear up transition
                        if (_supportTransform && _supportTransition && transition) {
                            scrollbarVars._handle.one(_strTransitionEndEvent, function () {
                                if (!_destroyed)
                                    scrollbarVars._handle.css(strTransition, _strEmpty);
                            });
                        }
                    }

                    scrollbarVarsInfo._handleOffset = handleOffset;
                    scrollbarVarsInfo._snappedHandleOffset = snappedHandleOffset;
                    scrollbarVarsInfo._trackLength = trackLength;
                }

                /**
                 * Refreshes the interactivity of the given scrollbar element.
                 * @param isTrack True if the track element is the target, false if the handle element is the target.
                 * @param value True for interactivity false for no interactivity.
                 */
                function refreshScrollbarsInteractive(isTrack, value) {
                    var action = value ? 'removeClass' : 'addClass';
                    var element1 = isTrack ? _scrollbarHorizontalTrackElement : _scrollbarHorizontalHandleElement;
                    var element2 = isTrack ? _scrollbarVerticalTrackElement : _scrollbarVerticalHandleElement;
                    var className = isTrack ? _classNameScrollbarTrackOff : _classNameScrollbarHandleOff;

                    element1[action](className);
                    element2[action](className);
                }

                /**
                 * Returns a object which is used for fast access for specific variables.
                 * @param isHorizontal True if the horizontal scrollbar vars shall be accessed, false if the vertical scrollbar vars shall be accessed.
                 * @returns {{wh: string, WH: string, lt: string, _wh: string, _lt: string, t: *, h: *, c: {}, s: *}}
                 */
                function getScrollbarVars(isHorizontal) {
                    return {
                        _width_height: isHorizontal ? _strWidth : _strHeight,
                        _Width_Height: isHorizontal ? 'Width' : 'Height',
                        _left_top: isHorizontal ? _strLeft : _strTop,
                        _Left_Top: isHorizontal ? 'Left' : 'Top',
                        _x_y: isHorizontal ? _strX : _strY,
                        _X_Y: isHorizontal ? 'X' : 'Y',
                        _w_h: isHorizontal ? 'w' : 'h',
                        _l_t: isHorizontal ? 'l' : 't',
                        _track: isHorizontal ? _scrollbarHorizontalTrackElement : _scrollbarVerticalTrackElement,
                        _handle: isHorizontal ? _scrollbarHorizontalHandleElement : _scrollbarVerticalHandleElement,
                        _scrollbar: isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement,
                        _info: isHorizontal ? _scrollHorizontalInfo : _scrollVerticalInfo
                    };
                }


                //==== Scrollbar Corner ====//

                /**
                 * Builds or destroys the scrollbar corner DOM element.
                 * @param destroy Indicates whether the DOM shall be build or destroyed.
                 */
                function setupScrollbarCornerDOM(destroy) {
                    _scrollbarCornerElement = _scrollbarCornerElement || selectOrGenerateDivByClass(_classNameScrollbarCorner, true);

                    if (!destroy) {
                        if (!_domExists) {
                            _hostElement.append(_scrollbarCornerElement);
                        }
                    }
                    else {
                        if (_domExists && _initialized) {
                            removeClass(_scrollbarCornerElement.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
                        }
                        else {
                            remove(_scrollbarCornerElement);
                        }
                    }
                }

                /**
                 * Initializes all scrollbar corner interactivity events.
                 */
                function setupScrollbarCornerEvents() {
                    var insideIFrame = _windowElementNative.top !== _windowElementNative;
                    var mouseDownPosition = {};
                    var mouseDownSize = {};
                    var mouseDownInvertedScale = {};
                    var reconnectMutationObserver;

                    function documentDragMove(event) {
                        if (onMouseTouchDownContinue(event)) {
                            var pageOffset = getCoordinates(event);
                            var hostElementCSS = {};
                            if (_resizeHorizontal || _resizeBoth)
                                hostElementCSS[_strWidth] = (mouseDownSize.w + (pageOffset.x - mouseDownPosition.x) * mouseDownInvertedScale.x);
                            if (_resizeVertical || _resizeBoth)
                                hostElementCSS[_strHeight] = (mouseDownSize.h + (pageOffset.y - mouseDownPosition.y) * mouseDownInvertedScale.y);
                            _hostElement.css(hostElementCSS);
                            COMPATIBILITY.stpP(event);
                        }
                        else {
                            documentMouseTouchUp(event);
                        }
                    }
                    function documentMouseTouchUp(event) {
                        var eventIsTrusted = event !== undefined;

                        setupResponsiveEventListener(_documentElement,
                            [_strSelectStartEvent, _strMouseTouchMoveEvent, _strMouseTouchUpEvent],
                            [documentOnSelectStart, documentDragMove, documentMouseTouchUp],
                            true);

                        removeClass(_bodyElement, _classNameDragging);
                        if (_scrollbarCornerElement.releaseCapture)
                            _scrollbarCornerElement.releaseCapture();

                        if (eventIsTrusted) {
                            if (reconnectMutationObserver)
                                connectMutationObservers();
                            _base.update(_strAuto);
                        }
                        reconnectMutationObserver = false;
                    }
                    function onMouseTouchDownContinue(event) {
                        var originalEvent = event.originalEvent || event;
                        var isTouchEvent = originalEvent.touches !== undefined;
                        return _sleeping || _destroyed ? false : COMPATIBILITY.mBtn(event) === 1 || isTouchEvent;
                    }
                    function getCoordinates(event) {
                        return _msieVersion && insideIFrame ? { x: event.screenX, y: event.screenY } : COMPATIBILITY.page(event);
                    }

                    addDestroyEventListener(_scrollbarCornerElement, _strMouseTouchDownEvent, function (event) {
                        if (onMouseTouchDownContinue(event) && !_resizeNone) {
                            if (_mutationObserversConnected) {
                                reconnectMutationObserver = true;
                                disconnectMutationObservers();
                            }

                            mouseDownPosition = getCoordinates(event);

                            mouseDownSize.w = _hostElementNative[LEXICON.oW] - (!_isBorderBox ? _paddingX : 0);
                            mouseDownSize.h = _hostElementNative[LEXICON.oH] - (!_isBorderBox ? _paddingY : 0);
                            mouseDownInvertedScale = getHostElementInvertedScale();

                            setupResponsiveEventListener(_documentElement,
                                [_strSelectStartEvent, _strMouseTouchMoveEvent, _strMouseTouchUpEvent],
                                [documentOnSelectStart, documentDragMove, documentMouseTouchUp]);

                            addClass(_bodyElement, _classNameDragging);
                            if (_scrollbarCornerElement.setCapture)
                                _scrollbarCornerElement.setCapture();

                            COMPATIBILITY.prvD(event);
                            COMPATIBILITY.stpP(event);
                        }
                    });
                }


                //==== Utils ====//

                /**
                 * Calls the callback with the given name. The Context of this callback is always _base (this).
                 * @param name The name of the target which shall be called.
                 * @param args The args with which the callback shall be called.
                 * @param dependent Boolean which decides whether the callback shall be fired, undefined is like a "true" value.
                 */
                function dispatchCallback(name, args, dependent) {
                    if (dependent === false)
                        return;
                    if (_initialized) {
                        var callback = _currentPreparedOptions.callbacks[name];
                        var extensionOnName = name;
                        var ext;

                        if (extensionOnName.substr(0, 2) === 'on')
                            extensionOnName = extensionOnName.substr(2, 1).toLowerCase() + extensionOnName.substr(3);

                        if (type(callback) == TYPES.f)
                            callback.call(_base, args);

                        each(_extensions, function () {
                            ext = this;
                            if (type(ext.on) == TYPES.f)
                                ext.on(extensionOnName, args);
                        });
                    }
                    else if (!_destroyed)
                        _callbacksInitQeueue.push({ n: name, a: args });
                }

                /**
                 * Sets the "top, right, bottom, left" properties, with a given prefix, of the given css object.
                 * @param targetCSSObject The css object to which the values shall be applied.
                 * @param prefix The prefix of the "top, right, bottom, left" css properties. (example: 'padding-' is a valid prefix)
                 * @param values A array of values which shall be applied to the "top, right, bottom, left" -properties. The array order is [top, right, bottom, left].
                 * If this argument is undefined the value '' (empty string) will be applied to all properties.
                 */
                function setTopRightBottomLeft(targetCSSObject, prefix, values) {
                    prefix = prefix || _strEmpty;
                    values = values || [_strEmpty, _strEmpty, _strEmpty, _strEmpty];

                    targetCSSObject[prefix + _strTop] = values[0];
                    targetCSSObject[prefix + _strRight] = values[1];
                    targetCSSObject[prefix + _strBottom] = values[2];
                    targetCSSObject[prefix + _strLeft] = values[3];
                }

                /**
                 * Gets the "top, right, bottom, left" CSS properties of the CSS property with the given prefix from the host element.
                 * @param prefix The prefix of the "top, right, bottom, left" css properties. (example: 'padding-' is a valid prefix)
                 * @param suffix The suffix of the "top, right, bottom, left" css properties. (example: 'border-' is a valid prefix with '-width' is a valid suffix)
                 * @param zeroX True if the x axis shall be 0.
                 * @param zeroY True if the y axis shall be 0.
                 * @returns {{}} The object which contains the numbers of the read CSS properties.
                 */
                function getTopRightBottomLeftHost(prefix, suffix, zeroX, zeroY) {
                    suffix = suffix || _strEmpty;
                    prefix = prefix || _strEmpty;
                    return {
                        t: zeroY ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strTop + suffix)),
                        r: zeroX ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strRight + suffix)),
                        b: zeroY ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strBottom + suffix)),
                        l: zeroX ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strLeft + suffix))
                    };
                }

                /**
                 * Returns the computed CSS transition string from the given element.
                 * @param element The element from which the transition string shall be returned.
                 * @returns {string} The CSS transition string from the given element.
                 */
                function getCSSTransitionString(element) {
                    var transitionStr = VENDORS._cssProperty('transition');
                    var assembledValue = element.css(transitionStr);
                    if (assembledValue)
                        return assembledValue;
                    var regExpString = '\\s*(' + '([^,(]+(\\(.+?\\))?)+' + ')[\\s,]*';
                    var regExpMain = new RegExp(regExpString);
                    var regExpValidate = new RegExp('^(' + regExpString + ')+$');
                    var properties = 'property duration timing-function delay'.split(' ');
                    var result = [];
                    var strResult;
                    var valueArray;
                    var i = 0;
                    var j;
                    var splitCssStyleByComma = function (str) {
                        strResult = [];
                        if (!str.match(regExpValidate))
                            return str;
                        while (str.match(regExpMain)) {
                            strResult.push(RegExp.$1);
                            str = str.replace(regExpMain, _strEmpty);
                        }

                        return strResult;
                    };
                    for (; i < properties[LEXICON.l]; i++) {
                        valueArray = splitCssStyleByComma(element.css(transitionStr + '-' + properties[i]));
                        for (j = 0; j < valueArray[LEXICON.l]; j++)
                            result[j] = (result[j] ? result[j] + _strSpace : _strEmpty) + valueArray[j];
                    }
                    return result.join(', ');
                }

                /**
                 * Generates a Regular Expression which matches with a string which starts with 'os-host'.
                 * @param {boolean} withCurrClassNameOption The Regular Expression also matches if the string is the current ClassName option (multiple values splitted by space possible).
                 * @param {boolean} withOldClassNameOption The Regular Expression also matches if the string is the old ClassName option (multiple values splitted by space possible).
                 */
                function createHostClassNameRegExp(withCurrClassNameOption, withOldClassNameOption) {
                    var i;
                    var split;
                    var appendix;
                    var appendClasses = function (classes, condition) {
                        appendix = '';
                        if (condition && typeof classes == TYPES.s) {
                            split = classes.split(_strSpace);
                            for (i = 0; i < split[LEXICON.l]; i++)
                                appendix += '|' + split[i] + '$';
                            // split[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') for escaping regex characters
                        }
                        return appendix;
                    };

                    return new RegExp(
                        '(^' + _classNameHostElement + '([-_].+|)$)' +
                        appendClasses(_classNameCache, withCurrClassNameOption) +
                        appendClasses(_oldClassName, withOldClassNameOption), 'g');
                }

                /**
                 * Calculates the host-elements inverted scale. (invertedScale = 1 / scale)
                 * @returns {{x: number, y: number}} The scale of the host-element.
                 */
                function getHostElementInvertedScale() {
                    var rect = _paddingElementNative[LEXICON.bCR]();
                    return {
                        x: _supportTransform ? 1 / (MATH.round(rect.width) / _paddingElementNative[LEXICON.oW]) || 1 : 1,
                        y: _supportTransform ? 1 / (MATH.round(rect.height) / _paddingElementNative[LEXICON.oH]) || 1 : 1
                    };
                }

                /**
                 * Checks whether the given object is a HTMLElement.
                 * @param o The object which shall be checked.
                 * @returns {boolean} True the given object is a HTMLElement, false otherwise.
                 */
                function isHTMLElement(o) {
                    var strOwnerDocument = 'ownerDocument';
                    var strHTMLElement = 'HTMLElement';
                    var wnd = o && o[strOwnerDocument] ? (o[strOwnerDocument].parentWindow || window) : window;
                    return (
                        typeof wnd[strHTMLElement] == TYPES.o ? o instanceof wnd[strHTMLElement] : //DOM2
                            o && typeof o == TYPES.o && o !== null && o.nodeType === 1 && typeof o.nodeName == TYPES.s
                    );
                }

                /**
                 * Compares 2 arrays and returns the differences between them as a array.
                 * @param a1 The first array which shall be compared.
                 * @param a2 The second array which shall be compared.
                 * @returns {Array} The differences between the two arrays.
                 */
                function getArrayDifferences(a1, a2) {
                    var a = [];
                    var diff = [];
                    var i;
                    var k;
                    for (i = 0; i < a1.length; i++)
                        a[a1[i]] = true;
                    for (i = 0; i < a2.length; i++) {
                        if (a[a2[i]])
                            delete a[a2[i]];
                        else
                            a[a2[i]] = true;
                    }
                    for (k in a)
                        diff.push(k);
                    return diff;
                }

                /**
                 * Returns Zero or the number to which the value can be parsed.
                 * @param value The value which shall be parsed.
                 * @param toFloat Indicates whether the number shall be parsed to a float.
                 */
                function parseToZeroOrNumber(value, toFloat) {
                    var num = toFloat ? parseFloat(value) : parseInt(value, 10);
                    return isNaN(num) ? 0 : num;
                }

                /**
                 * Gets several information of the textarea and returns them as a object or undefined if the browser doesn't support it.
                 * @returns {{cursorRow: Number, cursorCol, rows: Number, cols: number, wRow: number, pos: number, max : number}} or undefined if not supported.
                 */
                function getTextareaInfo() {
                    //read needed values
                    var textareaCursorPosition = _targetElementNative.selectionStart;
                    if (textareaCursorPosition === undefined)
                        return;

                    var textareaValue = _targetElement.val();
                    var textareaLength = textareaValue[LEXICON.l];
                    var textareaRowSplit = textareaValue.split('\n');
                    var textareaLastRow = textareaRowSplit[LEXICON.l];
                    var textareaCurrentCursorRowSplit = textareaValue.substr(0, textareaCursorPosition).split('\n');
                    var widestRow = 0;
                    var textareaLastCol = 0;
                    var cursorRow = textareaCurrentCursorRowSplit[LEXICON.l];
                    var cursorCol = textareaCurrentCursorRowSplit[textareaCurrentCursorRowSplit[LEXICON.l] - 1][LEXICON.l];
                    var rowCols;
                    var i;

                    //get widest Row and the last column of the textarea
                    for (i = 0; i < textareaRowSplit[LEXICON.l]; i++) {
                        rowCols = textareaRowSplit[i][LEXICON.l];
                        if (rowCols > textareaLastCol) {
                            widestRow = i + 1;
                            textareaLastCol = rowCols;
                        }
                    }

                    return {
                        _cursorRow: cursorRow, //cursorRow
                        _cursorColumn: cursorCol, //cursorCol
                        _rows: textareaLastRow, //rows
                        _columns: textareaLastCol, //cols
                        _widestRow: widestRow, //wRow
                        _cursorPosition: textareaCursorPosition, //pos
                        _cursorMax: textareaLength //max
                    };
                }

                /**
                 * Determines whether native overlay scrollbars are active.
                 * @returns {boolean} True if native overlay scrollbars are active, false otherwise.
                 */
                function nativeOverlayScrollbarsAreActive() {
                    return (_ignoreOverlayScrollbarHidingCache && (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y));
                }

                /**
                 * Gets the element which is used to measure the content size.
                 * @returns {*} TextareaCover if target element is textarea else the ContentElement.
                 */
                function getContentMeasureElement() {
                    return _isTextarea ? _textareaCoverElement[0] : _contentElementNative;
                }

                /**
                 * Generates a string which represents a HTML div with the given classes or attributes.
                 * @param classesOrAttrs The class of the div as string or a object which represents the attributes of the div. (The class attribute can also be written as "className".)
                 * @param content The content of the div as string.
                 * @returns {string} The concated string which represents a HTML div and its content.
                 */
                function generateDiv(classesOrAttrs, content) {
                    return '<div ' + (classesOrAttrs ? type(classesOrAttrs) == TYPES.s ?
                        'class="' + classesOrAttrs + '"' :
                        (function () {
                            var key;
                            var attrs = _strEmpty;
                            if (FRAMEWORK.isPlainObject(classesOrAttrs)) {
                                for (key in classesOrAttrs)
                                    attrs += (key === 'c' ? 'class' : key) + '="' + classesOrAttrs[key] + '" ';
                            }
                            return attrs;
                        })() :
                        _strEmpty) +
                        '>' +
                        (content || _strEmpty) +
                        '</div>';
                }

                /**
                 * Selects or generates a div with the given class attribute.
                 * @param className The class names (divided by spaces) of the div which shall be selected or generated.
                 * @param selectParentOrOnlyChildren The parent element from which of the element shall be selected. (if undefined or boolean its hostElement)
                 * If its a boolean it decides whether only the children of the host element shall be selected.
                 * @returns {*} The generated or selected element.
                 */
                function selectOrGenerateDivByClass(className, selectParentOrOnlyChildren) {
                    var onlyChildren = type(selectParentOrOnlyChildren) == TYPES.b;
                    var selectParent = onlyChildren ? _hostElement : (selectParentOrOnlyChildren || _hostElement);

                    return (_domExists && !selectParent[LEXICON.l])
                        ? null
                        : _domExists
                            ? selectParent[onlyChildren ? 'children' : 'find'](_strDot + className.replace(/\s/g, _strDot)).eq(0)
                            : FRAMEWORK(generateDiv(className))
                }

                /**
                 * Gets the value of the given property from the given object.
                 * @param obj The object from which the property value shall be got.
                 * @param path The property of which the value shall be got.
                 * @returns {*} Returns the value of the searched property or undefined of the property wasn't found.
                 */
                function getObjectPropVal(obj, path) {
                    var splits = path.split(_strDot);
                    var i = 0;
                    var val;
                    for (; i < splits.length; i++) {
                        if (!obj[LEXICON.hOP](splits[i]))
                            return;
                        val = obj[splits[i]];
                        if (i < splits.length && type(val) == TYPES.o)
                            obj = val;
                    }
                    return val;
                }

                /**
                 * Sets the value of the given property from the given object.
                 * @param obj The object from which the property value shall be set.
                 * @param path The property of which the value shall be set.
                 * @param val The value of the property which shall be set.
                 */
                function setObjectPropVal(obj, path, val) {
                    var splits = path.split(_strDot);
                    var splitsLength = splits.length;
                    var i = 0;
                    var extendObj = {};
                    var extendObjRoot = extendObj;
                    for (; i < splitsLength; i++)
                        extendObj = extendObj[splits[i]] = i + 1 < splitsLength ? {} : val;
                    FRAMEWORK.extend(obj, extendObjRoot, true);
                }

                /**	
                 * Runs a action for each selector inside the updateOnLoad option.	
                 * @param {Function} action The action for each updateOnLoad selector, the arguments the function takes is the index and the value (the selector).	
                 */
                function eachUpdateOnLoad(action) {
                    var updateOnLoad = _currentPreparedOptions.updateOnLoad;
                    updateOnLoad = type(updateOnLoad) == TYPES.s ? updateOnLoad.split(_strSpace) : updateOnLoad;

                    if (COMPATIBILITY.isA(updateOnLoad) && !_destroyed) {
                        each(updateOnLoad, action);
                    }
                }


                //==== Utils Cache ====//

                /**
                 * Compares two values or objects and returns true if they aren't equal.
                 * @param current The first value or object which shall be compared.
                 * @param cache The second value or object which shall be compared.
                 * @param force If true the returned value is always true.
                 * @returns {boolean} True if both values or objects aren't equal or force is true, false otherwise.
                 */
                function checkCache(current, cache, force) {
                    if (force)
                        return force;
                    if (type(current) == TYPES.o && type(cache) == TYPES.o) {
                        for (var prop in current) {
                            if (prop !== 'c') {
                                if (current[LEXICON.hOP](prop) && cache[LEXICON.hOP](prop)) {
                                    if (checkCache(current[prop], cache[prop]))
                                        return true;
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                    }
                    else {
                        return current !== cache;
                    }
                    return false;
                }


                //==== Shortcuts ====//

                /**
                 * jQuery extend method shortcut with a appended "true" as first argument.
                 */
                function extendDeep() {
                    return FRAMEWORK.extend.apply(this, [true].concat([].slice.call(arguments)));
                }

                /**
                 * jQuery addClass method shortcut.
                 */
                function addClass(el, classes) {
                    return _frameworkProto.addClass.call(el, classes);
                }

                /**
                 * jQuery removeClass method shortcut.
                 */
                function removeClass(el, classes) {
                    return _frameworkProto.removeClass.call(el, classes);
                }

                /**
                 * Adds or removes the given classes dependent on the boolean value. True for add, false for remove.
                 */
                function addRemoveClass(el, classes, doAdd) {
                    return doAdd ? addClass(el, classes) : removeClass(el, classes);
                }

                /**
                 * jQuery remove method shortcut.
                 */
                function remove(el) {
                    return _frameworkProto.remove.call(el);
                }

                /**
                 * Finds the first child element with the given selector of the given element.
                 * @param el The root element from which the selector shall be valid.
                 * @param selector The selector of the searched element.
                 * @returns {*} The first element which is a child of the given element and matches the givens selector.
                 */
                function findFirst(el, selector) {
                    return _frameworkProto.find.call(el, selector).eq(0);
                }


                //==== API ====//

                /**
                 * Puts the instance to sleep. It wont respond to any changes in the DOM and won't update. Scrollbar Interactivity is also disabled as well as the resize handle.
                 * This behavior can be reset by calling the update method.
                 */
                _base.sleep = function () {
                    _sleeping = true;
                };

                /**
                 * Updates the plugin and DOM to the current options.
                 * This method should only be called if a update is 100% required.
                 * @param force True if every property shall be updated and the cache shall be ignored.
                 * !INTERNAL USAGE! : force can be a string "auto", "sync" or "zoom" too
                 * if "auto" then before a real update the content size and host element attributes gets checked, and if they changed only then the update method will be called.
                 * if "sync" then the async update process (MutationObserver or UpdateLoop) gets synchronized and a corresponding update takes place if one was needed due to pending changes.
                 * if "zoom" then a update takes place where it's assumed that content and host size changed
                 * @returns {boolean|undefined} 
                 * If force is "sync" then a boolean is returned which indicates whether a update was needed due to pending changes.
                 * If force is "auto" then a boolean is returned whether a update was needed due to attribute or size changes.
                 * undefined otherwise.
                 */
                _base.update = function (force) {
                    if (_destroyed)
                        return;

                    var attrsChanged;
                    var contentSizeC;
                    var isString = type(force) == TYPES.s;
                    var doUpdateAuto;
                    var mutHost;
                    var mutContent;

                    if (isString) {
                        if (force === _strAuto) {
                            attrsChanged = meaningfulAttrsChanged();
                            contentSizeC = updateAutoContentSizeChanged();
                            doUpdateAuto = attrsChanged || contentSizeC;
                            if (doUpdateAuto) {
                                update({
                                    _contentSizeChanged: contentSizeC,
                                    _changedOptions: _initialized ? undefined : _currentPreparedOptions
                                });
                            }
                        }
                        else if (force === _strSync) {
                            if (_mutationObserversConnected) {
                                mutHost = _mutationObserverHostCallback(_mutationObserverHost.takeRecords());
                                mutContent = _mutationObserverContentCallback(_mutationObserverContent.takeRecords());
                            }
                            else {
                                mutHost = _base.update(_strAuto);
                            }
                        }
                        else if (force === 'zoom') {
                            update({
                                _hostSizeChanged: true,
                                _contentSizeChanged: true
                            });
                        }
                    }
                    else {
                        force = _sleeping || force;
                        _sleeping = false;
                        if (!_base.update(_strSync) || force)
                            update({ _force: force });
                    }

                    updateElementsOnLoad();

                    return doUpdateAuto || mutHost || mutContent;
                };

                /**
                 Gets or sets the current options. The update method will be called automatically if new options were set.
                 * @param newOptions If new options are given, then the new options will be set, if new options aren't given (undefined or a not a plain object) then the current options will be returned.
                 * @param value If new options is a property path string, then this value will be used to set the option to which the property path string leads.
                 * @returns {*}
                 */
                _base.options = function (newOptions, value) {
                    var option = {};
                    var changedOps;

                    //return current options if newOptions are undefined or empty
                    if (FRAMEWORK.isEmptyObject(newOptions) || !FRAMEWORK.isPlainObject(newOptions)) {
                        if (type(newOptions) == TYPES.s) {
                            if (arguments.length > 1) {
                                setObjectPropVal(option, newOptions, value);
                                changedOps = setOptions(option);
                            }
                            else
                                return getObjectPropVal(_currentOptions, newOptions);
                        }
                        else
                            return _currentOptions;
                    }
                    else {
                        changedOps = setOptions(newOptions);
                    }

                    if (!FRAMEWORK.isEmptyObject(changedOps)) {
                        update({ _changedOptions: changedOps });
                    }
                };

                /**
                 * Restore the DOM, disconnects all observers, remove all resize observers and put the instance to sleep.
                 */
                _base.destroy = function () {
                    if (_destroyed)
                        return;

                    //remove this instance from auto update loop
                    autoUpdateLoop.remove(_base);

                    //disconnect all mutation observers
                    disconnectMutationObservers();

                    //remove all resize observers
                    setupResizeObserver(_sizeObserverElement);
                    setupResizeObserver(_sizeAutoObserverElement);

                    //remove all extensions
                    for (var extName in _extensions)
                        _base.removeExt(extName);

                    //remove all 'destroy' events
                    while (_destroyEvents[LEXICON.l] > 0)
                        _destroyEvents.pop()();

                    //remove all events from host element
                    setupHostMouseTouchEvents(true);

                    //remove all helper / detection elements
                    if (_contentGlueElement)
                        remove(_contentGlueElement);
                    if (_contentArrangeElement)
                        remove(_contentArrangeElement);
                    if (_sizeAutoObserverAdded)
                        remove(_sizeAutoObserverElement);

                    //remove all generated DOM
                    setupScrollbarsDOM(true);
                    setupScrollbarCornerDOM(true);
                    setupStructureDOM(true);

                    //remove all generated image load events
                    for (var i = 0; i < _updateOnLoadElms[LEXICON.l]; i++)
                        FRAMEWORK(_updateOnLoadElms[i]).off(_updateOnLoadEventName, updateOnLoadCallback);
                    _updateOnLoadElms = undefined;

                    _destroyed = true;
                    _sleeping = true;

                    //remove this instance from the instances list
                    INSTANCES(pluginTargetElement, 0);
                    dispatchCallback('onDestroyed');

                    //remove all properties and methods
                    //for (var property in _base)
                    //    delete _base[property];
                    //_base = undefined;
                };

                /**
                 * Scrolls to a given position or element.
                 * @param coordinates
                 * 1. Can be "coordinates" which looks like:
                 *    { x : ?, y : ? } OR          Object with x and y properties
                 *    { left : ?, top : ? } OR     Object with left and top properties
                 *    { l : ?, t : ? } OR          Object with l and t properties
                 *    [ ?, ? ] OR                  Array where the first two element are the coordinates (first is x, second is y)
                 *    ?                            A single value which stays for both axis
                 *    A value can be a number, a string or a calculation.
                 *
                 *    Operators:
                 *    [NONE]  The current scroll will be overwritten by the value.
                 *    '+='    The value will be added to the current scroll offset
                 *    '-='    The value will be subtracted from the current scroll offset
                 *    '*='    The current scroll wil be multiplicated by the value.
                 *    '/='    The current scroll wil be divided by the value.
                 *
                 *    Units:
                 *    [NONE]  The value is the final scroll amount.                   final = (value * 1)
                 *    'px'    Same as none
                 *    '%'     The value is dependent on the current scroll value.     final = ((currentScrollValue / 100) * value)
                 *    'vw'    The value is multiplicated by the viewport width.       final = (value * viewportWidth)
                 *    'vh'    The value is multiplicated by the viewport height.      final = (value * viewportHeight)
                 *
                 *    example final values:
                 *    200, '200px', '50%', '1vw', '1vh', '+=200', '/=1vw', '*=2px', '-=5vh', '+=33%', '+= 50% - 2px', '-= 1vw - 50%'
                 *
                 * 2. Can be a HTML or jQuery element:
                 *    The final scroll offset is the offset (without margin) of the given HTML / jQuery element.
                 *
                 * 3. Can be a object with a HTML or jQuery element with additional settings:
                 *    {
                 *      el : [HTMLElement, jQuery element],             MUST be specified, else this object isn't valid.
                 *      scroll : [string, array, object],               Default value is 'always'.
                 *      block : [string, array, object],                Default value is 'begin'.
                 *      margin : [number, boolean, array, object]       Default value is false.
                 *    }
                 *
                 *    Possible scroll settings are:
                 *    'always'      Scrolls always.
                 *    'ifneeded'    Scrolls only if the element isnt fully in view.
                 *    'never'       Scrolls never.
                 *
                 *    Possible block settings are:
                 *    'begin'   Both axis shall be docked to the "begin" edge. - The element will be docked to the top and left edge of the viewport.
                 *    'end'     Both axis shall be docked to the "end" edge. - The element will be docked to the bottom and right edge of the viewport. (If direction is RTL to the bottom and left edge.)
                 *    'center'  Both axis shall be docked to "center". - The element will be centered in the viewport.
                 *    'nearest' The element will be docked to the nearest edge(s).
                 *
                 *    Possible margin settings are: -- The actual margin of the element wont be affect, this option affects only the final scroll offset.
                 *    [BOOLEAN]                                         If true the css margin of the element will be used, if false no margin will be used.
                 *    [NUMBER]                                          The margin will be used for all edges.
                 *
                 * @param duration The duration of the scroll animation, OR a jQuery animation configuration object.
                 * @param easing The animation easing.
                 * @param complete The animation complete callback.
                 * @returns {{
                 *   position: {x: number, y: number},
                 *   ratio: {x: number, y: number},
                 *   max: {x: number, y: number},
                 *   handleOffset: {x: number, y: number},
                 *   handleLength: {x: number, y: number},
                 *   handleLengthRatio: {x: number, y: number}, t
                 *   rackLength: {x: number, y: number},
                 *   isRTL: boolean,
                 *   isRTLNormalized: boolean
                 *  }}
                 */
                _base.scroll = function (coordinates, duration, easing, complete) {
                    if (arguments.length === 0 || coordinates === undefined) {
                        var infoX = _scrollHorizontalInfo;
                        var infoY = _scrollVerticalInfo;
                        var normalizeInvert = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.i;
                        var normalizeNegate = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.n;
                        var scrollX = infoX._currentScroll;
                        var scrollXRatio = infoX._currentScrollRatio;
                        var maxScrollX = infoX._maxScroll;
                        scrollXRatio = normalizeInvert ? 1 - scrollXRatio : scrollXRatio;
                        scrollX = normalizeInvert ? maxScrollX - scrollX : scrollX;
                        scrollX *= normalizeNegate ? -1 : 1;
                        maxScrollX *= normalizeNegate ? -1 : 1;

                        return {
                            position: {
                                x: scrollX,
                                y: infoY._currentScroll
                            },
                            ratio: {
                                x: scrollXRatio,
                                y: infoY._currentScrollRatio
                            },
                            max: {
                                x: maxScrollX,
                                y: infoY._maxScroll
                            },
                            handleOffset: {
                                x: infoX._handleOffset,
                                y: infoY._handleOffset
                            },
                            handleLength: {
                                x: infoX._handleLength,
                                y: infoY._handleLength
                            },
                            handleLengthRatio: {
                                x: infoX._handleLengthRatio,
                                y: infoY._handleLengthRatio
                            },
                            trackLength: {
                                x: infoX._trackLength,
                                y: infoY._trackLength
                            },
                            snappedHandleOffset: {
                                x: infoX._snappedHandleOffset,
                                y: infoY._snappedHandleOffset
                            },
                            isRTL: _isRTL,
                            isRTLNormalized: _normalizeRTLCache
                        };
                    }

                    _base.update(_strSync);

                    var normalizeRTL = _normalizeRTLCache;
                    var coordinatesXAxisProps = [_strX, _strLeft, 'l'];
                    var coordinatesYAxisProps = [_strY, _strTop, 't'];
                    var coordinatesOperators = ['+=', '-=', '*=', '/='];
                    var durationIsObject = type(duration) == TYPES.o;
                    var completeCallback = durationIsObject ? duration.complete : complete;
                    var i;
                    var finalScroll = {};
                    var specialEasing = {};
                    var doScrollLeft;
                    var doScrollTop;
                    var animationOptions;
                    var strEnd = 'end';
                    var strBegin = 'begin';
                    var strCenter = 'center';
                    var strNearest = 'nearest';
                    var strAlways = 'always';
                    var strNever = 'never';
                    var strIfNeeded = 'ifneeded';
                    var strLength = LEXICON.l;
                    var settingsAxis;
                    var settingsScroll;
                    var settingsBlock;
                    var settingsMargin;
                    var finalElement;
                    var elementObjSettingsAxisValues = [_strX, _strY, 'xy', 'yx'];
                    var elementObjSettingsBlockValues = [strBegin, strEnd, strCenter, strNearest];
                    var elementObjSettingsScrollValues = [strAlways, strNever, strIfNeeded];
                    var coordinatesIsElementObj = coordinates[LEXICON.hOP]('el');
                    var possibleElement = coordinatesIsElementObj ? coordinates.el : coordinates;
                    var possibleElementIsJQuery = possibleElement instanceof FRAMEWORK || JQUERY ? possibleElement instanceof JQUERY : false;
                    var possibleElementIsHTMLElement = possibleElementIsJQuery ? false : isHTMLElement(possibleElement);
                    var updateScrollbarInfos = function () {
                        if (doScrollLeft)
                            refreshScrollbarHandleOffset(true);
                        if (doScrollTop)
                            refreshScrollbarHandleOffset(false);
                    };
                    var proxyCompleteCallback = type(completeCallback) != TYPES.f ? undefined : function () {
                        updateScrollbarInfos();
                        completeCallback();
                    };
                    function checkSettingsStringValue(currValue, allowedValues) {
                        for (i = 0; i < allowedValues[strLength]; i++) {
                            if (currValue === allowedValues[i])
                                return true;
                        }
                        return false;
                    }
                    function getRawScroll(isX, coordinates) {
                        var coordinateProps = isX ? coordinatesXAxisProps : coordinatesYAxisProps;
                        coordinates = type(coordinates) == TYPES.s || type(coordinates) == TYPES.n ? [coordinates, coordinates] : coordinates;

                        if (COMPATIBILITY.isA(coordinates))
                            return isX ? coordinates[0] : coordinates[1];
                        else if (type(coordinates) == TYPES.o) {
                            //decides RTL normalization "hack" with .n
                            //normalizeRTL = type(coordinates.n) == TYPES.b ? coordinates.n : normalizeRTL; 
                            for (i = 0; i < coordinateProps[strLength]; i++)
                                if (coordinateProps[i] in coordinates)
                                    return coordinates[coordinateProps[i]];
                        }
                    }
                    function getFinalScroll(isX, rawScroll) {
                        var isString = type(rawScroll) == TYPES.s;
                        var operator;
                        var amount;
                        var scrollInfo = isX ? _scrollHorizontalInfo : _scrollVerticalInfo;
                        var currScroll = scrollInfo._currentScroll;
                        var maxScroll = scrollInfo._maxScroll;
                        var mult = ' * ';
                        var finalValue;
                        var isRTLisX = _isRTL && isX;
                        var normalizeShortcuts = isRTLisX && _rtlScrollBehavior.n && !normalizeRTL;
                        var strReplace = 'replace';
                        var evalFunc = eval;
                        var possibleOperator;
                        if (isString) {
                            //check operator
                            if (rawScroll[strLength] > 2) {
                                possibleOperator = rawScroll.substr(0, 2);
                                if (inArray(possibleOperator, coordinatesOperators) > -1)
                                    operator = possibleOperator;
                            }

                            //calculate units and shortcuts
                            rawScroll = operator ? rawScroll.substr(2) : rawScroll;
                            rawScroll = rawScroll
                            [strReplace](/min/g, 0) //'min' = 0%
                            [strReplace](/</g, 0)   //'<'   = 0%
                            [strReplace](/max/g, (normalizeShortcuts ? '-' : _strEmpty) + _strHundredPercent)    //'max' = 100%
                            [strReplace](/>/g, (normalizeShortcuts ? '-' : _strEmpty) + _strHundredPercent)      //'>'   = 100%
                            [strReplace](/px/g, _strEmpty)
                            [strReplace](/%/g, mult + (maxScroll * (isRTLisX && _rtlScrollBehavior.n ? -1 : 1) / 100.0))
                            [strReplace](/vw/g, mult + _viewportSize.w)
                            [strReplace](/vh/g, mult + _viewportSize.h);
                            amount = parseToZeroOrNumber(isNaN(rawScroll) ? parseToZeroOrNumber(evalFunc(rawScroll), true).toFixed() : rawScroll);
                        }
                        else {
                            amount = rawScroll;
                        }

                        if (amount !== undefined && !isNaN(amount) && type(amount) == TYPES.n) {
                            var normalizeIsRTLisX = normalizeRTL && isRTLisX;
                            var operatorCurrScroll = currScroll * (normalizeIsRTLisX && _rtlScrollBehavior.n ? -1 : 1);
                            var invert = normalizeIsRTLisX && _rtlScrollBehavior.i;
                            var negate = normalizeIsRTLisX && _rtlScrollBehavior.n;
                            operatorCurrScroll = invert ? (maxScroll - operatorCurrScroll) : operatorCurrScroll;
                            switch (operator) {
                                case '+=':
                                    finalValue = operatorCurrScroll + amount;
                                    break;
                                case '-=':
                                    finalValue = operatorCurrScroll - amount;
                                    break;
                                case '*=':
                                    finalValue = operatorCurrScroll * amount;
                                    break;
                                case '/=':
                                    finalValue = operatorCurrScroll / amount;
                                    break;
                                default:
                                    finalValue = amount;
                                    break;
                            }
                            finalValue = invert ? maxScroll - finalValue : finalValue;
                            finalValue *= negate ? -1 : 1;
                            finalValue = isRTLisX && _rtlScrollBehavior.n ? MATH.min(0, MATH.max(maxScroll, finalValue)) : MATH.max(0, MATH.min(maxScroll, finalValue));
                        }
                        return finalValue === currScroll ? undefined : finalValue;
                    }
                    function getPerAxisValue(value, valueInternalType, defaultValue, allowedValues) {
                        var resultDefault = [defaultValue, defaultValue];
                        var valueType = type(value);
                        var valueArrLength;
                        var valueArrItem;

                        //value can be [ string, or array of two strings ]
                        if (valueType == valueInternalType) {
                            value = [value, value];
                        }
                        else if (valueType == TYPES.a) {
                            valueArrLength = value[strLength];
                            if (valueArrLength > 2 || valueArrLength < 1)
                                value = resultDefault;
                            else {
                                if (valueArrLength === 1)
                                    value[1] = defaultValue;
                                for (i = 0; i < valueArrLength; i++) {
                                    valueArrItem = value[i];
                                    if (type(valueArrItem) != valueInternalType || !checkSettingsStringValue(valueArrItem, allowedValues)) {
                                        value = resultDefault;
                                        break;
                                    }
                                }
                            }
                        }
                        else if (valueType == TYPES.o)
                            value = [value[_strX] || defaultValue, value[_strY] || defaultValue];
                        else
                            value = resultDefault;
                        return { x: value[0], y: value[1] };
                    }
                    function generateMargin(marginTopRightBottomLeftArray) {
                        var result = [];
                        var currValue;
                        var currValueType;
                        var valueDirections = [_strTop, _strRight, _strBottom, _strLeft];
                        for (i = 0; i < marginTopRightBottomLeftArray[strLength]; i++) {
                            if (i === valueDirections[strLength])
                                break;
                            currValue = marginTopRightBottomLeftArray[i];
                            currValueType = type(currValue);
                            if (currValueType == TYPES.b)
                                result.push(currValue ? parseToZeroOrNumber(finalElement.css(_strMarginMinus + valueDirections[i])) : 0);
                            else
                                result.push(currValueType == TYPES.n ? currValue : 0);
                        }
                        return result;
                    }

                    if (possibleElementIsJQuery || possibleElementIsHTMLElement) {
                        //get settings
                        var margin = coordinatesIsElementObj ? coordinates.margin : 0;
                        var axis = coordinatesIsElementObj ? coordinates.axis : 0;
                        var scroll = coordinatesIsElementObj ? coordinates.scroll : 0;
                        var block = coordinatesIsElementObj ? coordinates.block : 0;
                        var marginDefault = [0, 0, 0, 0];
                        var marginType = type(margin);
                        var marginLength;
                        finalElement = possibleElementIsJQuery ? possibleElement : FRAMEWORK(possibleElement);

                        if (finalElement[strLength] > 0) {
                            //margin can be [ boolean, number, array of 2, array of 4, object ]
                            if (marginType == TYPES.n || marginType == TYPES.b)
                                margin = generateMargin([margin, margin, margin, margin]);
                            else if (marginType == TYPES.a) {
                                marginLength = margin[strLength];
                                if (marginLength === 2)
                                    margin = generateMargin([margin[0], margin[1], margin[0], margin[1]]);
                                else if (marginLength >= 4)
                                    margin = generateMargin(margin);
                                else
                                    margin = marginDefault;
                            }
                            else if (marginType == TYPES.o)
                                margin = generateMargin([margin[_strTop], margin[_strRight], margin[_strBottom], margin[_strLeft]]);
                            else
                                margin = marginDefault;

                            //block = type(block) === TYPES.b ? block ? [ strNearest, strBegin ] : [ strNearest, strEnd ] : block;
                            settingsAxis = checkSettingsStringValue(axis, elementObjSettingsAxisValues) ? axis : 'xy';
                            settingsScroll = getPerAxisValue(scroll, TYPES.s, strAlways, elementObjSettingsScrollValues);
                            settingsBlock = getPerAxisValue(block, TYPES.s, strBegin, elementObjSettingsBlockValues);
                            settingsMargin = margin;

                            var viewportScroll = {
                                l: _scrollHorizontalInfo._currentScroll,
                                t: _scrollVerticalInfo._currentScroll
                            };
                            // use padding element instead of viewport element because padding element has never padding, margin or position applied.
                            var viewportOffset = _paddingElement.offset();

                            //get coordinates
                            var elementOffset = finalElement.offset();
                            var doNotScroll = {
                                x: settingsScroll.x == strNever || settingsAxis == _strY,
                                y: settingsScroll.y == strNever || settingsAxis == _strX
                            };
                            elementOffset[_strTop] -= settingsMargin[0];
                            elementOffset[_strLeft] -= settingsMargin[3];
                            var elementScrollCoordinates = {
                                x: MATH.round(elementOffset[_strLeft] - viewportOffset[_strLeft] + viewportScroll.l),
                                y: MATH.round(elementOffset[_strTop] - viewportOffset[_strTop] + viewportScroll.t)
                            };
                            if (_isRTL) {
                                if (!_rtlScrollBehavior.n && !_rtlScrollBehavior.i)
                                    elementScrollCoordinates.x = MATH.round(viewportOffset[_strLeft] - elementOffset[_strLeft] + viewportScroll.l);
                                if (_rtlScrollBehavior.n && normalizeRTL)
                                    elementScrollCoordinates.x *= -1;
                                if (_rtlScrollBehavior.i && normalizeRTL)
                                    elementScrollCoordinates.x = MATH.round(viewportOffset[_strLeft] - elementOffset[_strLeft] + (_scrollHorizontalInfo._maxScroll - viewportScroll.l));
                            }

                            //measuring is required
                            if (settingsBlock.x != strBegin || settingsBlock.y != strBegin || settingsScroll.x == strIfNeeded || settingsScroll.y == strIfNeeded || _isRTL) {
                                var measuringElm = finalElement[0];
                                var rawElementSize = _supportTransform ? measuringElm[LEXICON.bCR]() : {
                                    width: measuringElm[LEXICON.oW],
                                    height: measuringElm[LEXICON.oH]
                                };
                                var elementSize = {
                                    w: rawElementSize[_strWidth] + settingsMargin[3] + settingsMargin[1],
                                    h: rawElementSize[_strHeight] + settingsMargin[0] + settingsMargin[2]
                                };
                                var finalizeBlock = function (isX) {
                                    var vars = getScrollbarVars(isX);
                                    var wh = vars._w_h;
                                    var lt = vars._left_top;
                                    var xy = vars._x_y;
                                    var blockIsEnd = settingsBlock[xy] == (isX ? _isRTL ? strBegin : strEnd : strEnd);
                                    var blockIsCenter = settingsBlock[xy] == strCenter;
                                    var blockIsNearest = settingsBlock[xy] == strNearest;
                                    var scrollNever = settingsScroll[xy] == strNever;
                                    var scrollIfNeeded = settingsScroll[xy] == strIfNeeded;
                                    var vpSize = _viewportSize[wh];
                                    var vpOffset = viewportOffset[lt];
                                    var elSize = elementSize[wh];
                                    var elOffset = elementOffset[lt];
                                    var divide = blockIsCenter ? 2 : 1;
                                    var elementCenterOffset = elOffset + (elSize / 2);
                                    var viewportCenterOffset = vpOffset + (vpSize / 2);
                                    var isInView =
                                        elSize <= vpSize
                                        && elOffset >= vpOffset
                                        && elOffset + elSize <= vpOffset + vpSize;

                                    if (scrollNever)
                                        doNotScroll[xy] = true;
                                    else if (!doNotScroll[xy]) {
                                        if (blockIsNearest || scrollIfNeeded) {
                                            doNotScroll[xy] = scrollIfNeeded ? isInView : false;
                                            blockIsEnd = elSize < vpSize ? elementCenterOffset > viewportCenterOffset : elementCenterOffset < viewportCenterOffset;
                                        }
                                        elementScrollCoordinates[xy] -= blockIsEnd || blockIsCenter ? ((vpSize / divide) - (elSize / divide)) * (isX && _isRTL && normalizeRTL ? -1 : 1) : 0;
                                    }
                                };
                                finalizeBlock(true);
                                finalizeBlock(false);
                            }

                            if (doNotScroll.y)
                                delete elementScrollCoordinates.y;
                            if (doNotScroll.x)
                                delete elementScrollCoordinates.x;

                            coordinates = elementScrollCoordinates;
                        }
                    }

                    finalScroll[_strScrollLeft] = getFinalScroll(true, getRawScroll(true, coordinates));
                    finalScroll[_strScrollTop] = getFinalScroll(false, getRawScroll(false, coordinates));
                    doScrollLeft = finalScroll[_strScrollLeft] !== undefined;
                    doScrollTop = finalScroll[_strScrollTop] !== undefined;

                    if ((doScrollLeft || doScrollTop) && (duration > 0 || durationIsObject)) {
                        if (durationIsObject) {
                            duration.complete = proxyCompleteCallback;
                            _viewportElement.animate(finalScroll, duration);
                        }
                        else {
                            animationOptions = {
                                duration: duration,
                                complete: proxyCompleteCallback
                            };
                            if (COMPATIBILITY.isA(easing) || FRAMEWORK.isPlainObject(easing)) {
                                specialEasing[_strScrollLeft] = easing[0] || easing.x;
                                specialEasing[_strScrollTop] = easing[1] || easing.y;
                                animationOptions.specialEasing = specialEasing;
                            }
                            else {
                                animationOptions.easing = easing;
                            }
                            _viewportElement.animate(finalScroll, animationOptions);
                        }
                    }
                    else {
                        if (doScrollLeft)
                            _viewportElement[_strScrollLeft](finalScroll[_strScrollLeft]);
                        if (doScrollTop)
                            _viewportElement[_strScrollTop](finalScroll[_strScrollTop]);
                        updateScrollbarInfos();
                    }
                };

                /**
                 * Stops all scroll animations.
                 * @returns {*} The current OverlayScrollbars instance (for chaining).
                 */
                _base.scrollStop = function (param1, param2, param3) {
                    _viewportElement.stop(param1, param2, param3);
                    return _base;
                };

                /**
                 * Returns all relevant elements.
                 * @param elementName The name of the element which shall be returned.
                 * @returns {{target: *, host: *, padding: *, viewport: *, content: *, scrollbarHorizontal: {scrollbar: *, track: *, handle: *}, scrollbarVertical: {scrollbar: *, track: *, handle: *}, scrollbarCorner: *} | *}
                 */
                _base.getElements = function (elementName) {
                    var obj = {
                        target: _targetElementNative,
                        host: _hostElementNative,
                        padding: _paddingElementNative,
                        viewport: _viewportElementNative,
                        content: _contentElementNative,
                        scrollbarHorizontal: {
                            scrollbar: _scrollbarHorizontalElement[0],
                            track: _scrollbarHorizontalTrackElement[0],
                            handle: _scrollbarHorizontalHandleElement[0]
                        },
                        scrollbarVertical: {
                            scrollbar: _scrollbarVerticalElement[0],
                            track: _scrollbarVerticalTrackElement[0],
                            handle: _scrollbarVerticalHandleElement[0]
                        },
                        scrollbarCorner: _scrollbarCornerElement[0]
                    };
                    return type(elementName) == TYPES.s ? getObjectPropVal(obj, elementName) : obj;
                };

                /**
                 * Returns a object which describes the current state of this instance.
                 * @param stateProperty A specific property from the state object which shall be returned.
                 * @returns {{widthAuto, heightAuto, overflowAmount, hideOverflow, hasOverflow, contentScrollSize, viewportSize, hostSize, autoUpdate} | *}
                 */
                _base.getState = function (stateProperty) {
                    function prepare(obj) {
                        if (!FRAMEWORK.isPlainObject(obj))
                            return obj;
                        var extended = extendDeep({}, obj);
                        var changePropertyName = function (from, to) {
                            if (extended[LEXICON.hOP](from)) {
                                extended[to] = extended[from];
                                delete extended[from];
                            }
                        };
                        changePropertyName('w', _strWidth); //change w to width
                        changePropertyName('h', _strHeight); //change h to height
                        delete extended.c; //delete c (the 'changed' prop)
                        return extended;
                    };
                    var obj = {
                        destroyed: !!prepare(_destroyed),
                        sleeping: !!prepare(_sleeping),
                        autoUpdate: prepare(!_mutationObserversConnected),
                        widthAuto: prepare(_widthAutoCache),
                        heightAuto: prepare(_heightAutoCache),
                        padding: prepare(_cssPaddingCache),
                        overflowAmount: prepare(_overflowAmountCache),
                        hideOverflow: prepare(_hideOverflowCache),
                        hasOverflow: prepare(_hasOverflowCache),
                        contentScrollSize: prepare(_contentScrollSizeCache),
                        viewportSize: prepare(_viewportSize),
                        hostSize: prepare(_hostSizeCache),
                        documentMixed: prepare(_documentMixed)
                    };
                    return type(stateProperty) == TYPES.s ? getObjectPropVal(obj, stateProperty) : obj;
                };

                /**
                 * Gets all or specific extension instance.
                 * @param extName The name of the extension from which the instance shall be got.
                 * @returns {{}} The instance of the extension with the given name or undefined if the instance couldn't be found.
                 */
                _base.ext = function (extName) {
                    var result;
                    var privateMethods = _extensionsPrivateMethods.split(' ');
                    var i = 0;
                    if (type(extName) == TYPES.s) {
                        if (_extensions[LEXICON.hOP](extName)) {
                            result = extendDeep({}, _extensions[extName]);
                            for (; i < privateMethods.length; i++)
                                delete result[privateMethods[i]];
                        }
                    }
                    else {
                        result = {};
                        for (i in _extensions)
                            result[i] = extendDeep({}, _base.ext(i));
                    }
                    return result;
                };

                /**
                 * Adds a extension to this instance.
                 * @param extName The name of the extension which shall be added.
                 * @param extensionOptions The extension options which shall be used.
                 * @returns {{}} The instance of the added extension or undefined if the extension couldn't be added properly.
                 */
                _base.addExt = function (extName, extensionOptions) {
                    var registeredExtensionObj = _plugin.extension(extName);
                    var instance;
                    var instanceAdded;
                    var instanceContract;
                    var contractResult;
                    var contractFulfilled = true;
                    if (registeredExtensionObj) {
                        if (!_extensions[LEXICON.hOP](extName)) {
                            instance = registeredExtensionObj.extensionFactory.call(_base,
                                extendDeep({}, registeredExtensionObj.defaultOptions),
                                FRAMEWORK,
                                COMPATIBILITY);

                            if (instance) {
                                instanceContract = instance.contract;
                                if (type(instanceContract) == TYPES.f) {
                                    contractResult = instanceContract(window);
                                    contractFulfilled = type(contractResult) == TYPES.b ? contractResult : contractFulfilled;
                                }
                                if (contractFulfilled) {
                                    _extensions[extName] = instance;
                                    instanceAdded = instance.added;
                                    if (type(instanceAdded) == TYPES.f)
                                        instanceAdded(extensionOptions);

                                    return _base.ext(extName);
                                }
                            }
                        }
                        else
                            return _base.ext(extName);
                    }
                    else
                        console.warn("A extension with the name \"" + extName + "\" isn't registered.");
                };

                /**
                 * Removes a extension from this instance.
                 * @param extName The name of the extension which shall be removed.
                 * @returns {boolean} True if the extension was removed, false otherwise e.g. if the extension wasn't added before.
                 */
                _base.removeExt = function (extName) {
                    var instance = _extensions[extName];
                    var instanceRemoved;
                    if (instance) {
                        delete _extensions[extName];

                        instanceRemoved = instance.removed;
                        if (type(instanceRemoved) == TYPES.f)
                            instanceRemoved();

                        return true;
                    }
                    return false;
                };

                /**
                 * Constructs the plugin.
                 * @param targetElement The element to which the plugin shall be applied.
                 * @param options The initial options of the plugin.
                 * @param extensions The extension(s) which shall be added right after the initialization.
                 * @returns {boolean} True if the plugin was successfully initialized, false otherwise.
                 */
                function construct(targetElement, options, extensions) {
                    _defaultOptions = globals.defaultOptions;
                    _nativeScrollbarStyling = globals.nativeScrollbarStyling;
                    _nativeScrollbarSize = extendDeep({}, globals.nativeScrollbarSize);
                    _nativeScrollbarIsOverlaid = extendDeep({}, globals.nativeScrollbarIsOverlaid);
                    _overlayScrollbarDummySize = extendDeep({}, globals.overlayScrollbarDummySize);
                    _rtlScrollBehavior = extendDeep({}, globals.rtlScrollBehavior);

                    //parse & set options but don't update
                    setOptions(extendDeep({}, _defaultOptions, options));

                    _cssCalc = globals.cssCalc;
                    _msieVersion = globals.msie;
                    _autoUpdateRecommended = globals.autoUpdateRecommended;
                    _supportTransition = globals.supportTransition;
                    _supportTransform = globals.supportTransform;
                    _supportPassiveEvents = globals.supportPassiveEvents;
                    _supportResizeObserver = globals.supportResizeObserver;
                    _supportMutationObserver = globals.supportMutationObserver;
                    _restrictedMeasuring = globals.restrictedMeasuring;
                    _documentElement = FRAMEWORK(targetElement.ownerDocument);
                    _documentElementNative = _documentElement[0];
                    _windowElement = FRAMEWORK(_documentElementNative.defaultView || _documentElementNative.parentWindow);
                    _windowElementNative = _windowElement[0];
                    _htmlElement = findFirst(_documentElement, 'html');
                    _bodyElement = findFirst(_htmlElement, 'body');
                    _targetElement = FRAMEWORK(targetElement);
                    _targetElementNative = _targetElement[0];
                    _isTextarea = _targetElement.is('textarea');
                    _isBody = _targetElement.is('body');
                    _documentMixed = _documentElementNative !== document;

                    /* On a div Element The if checks only whether:
                     * - the targetElement has the class "os-host"
                     * - the targetElement has a a child with the class "os-padding"
                     * 
                     * If that's the case, its assumed the DOM has already the following structure:
                     * (The ".os-host" element is the targetElement)
                     *
                     *  <div class="os-host">
                     *      <div class="os-resize-observer-host"></div>
                     *      <div class="os-padding">
                     *          <div class="os-viewport">
                     *              <div class="os-content"></div>
                     *          </div>
                     *      </div>
                     *      <div class="os-scrollbar os-scrollbar-horizontal ">
                     *          <div class="os-scrollbar-track">
                     *              <div class="os-scrollbar-handle"></div>
                     *          </div>
                     *      </div>
                     *      <div class="os-scrollbar os-scrollbar-vertical">
                     *          <div class="os-scrollbar-track">
                     *              <div class="os-scrollbar-handle"></div>
                     *          </div>
                     *      </div>
                     *      <div class="os-scrollbar-corner"></div>
                     *  </div>
                     *
                     * =====================================================================================
                     * 
                     * On a Textarea Element The if checks only whether:
                     * - the targetElement has the class "os-textarea" 
                     * - the targetElement is inside a element with the class "os-content" 
                     * 
                     * If that's the case, its assumed the DOM has already the following structure:
                     * (The ".os-textarea" (textarea) element is the targetElement)
                     *
                     *  <div class="os-host-textarea">
                     *      <div class="os-resize-observer-host"></div>
                     *      <div class="os-padding os-text-inherit">
                     *          <div class="os-viewport os-text-inherit">
                     *              <div class="os-content os-text-inherit">
                     *                  <div class="os-textarea-cover"></div>
                     *                  <textarea class="os-textarea os-text-inherit"></textarea>
                     *              </div>
                     *          </div>
                     *      </div>
                     *      <div class="os-scrollbar os-scrollbar-horizontal ">
                     *          <div class="os-scrollbar-track">
                     *              <div class="os-scrollbar-handle"></div>
                     *          </div>
                     *      </div>
                     *      <div class="os-scrollbar os-scrollbar-vertical">
                     *          <div class="os-scrollbar-track">
                     *              <div class="os-scrollbar-handle"></div>
                     *          </div>
                     *      </div>
                     *      <div class="os-scrollbar-corner"></div>
                     *  </div>
                     */
                    _domExists = _isTextarea
                        ? _targetElement.hasClass(_classNameTextareaElement) && _targetElement.parent().hasClass(_classNameContentElement)
                        : _targetElement.hasClass(_classNameHostElement) && _targetElement.children(_strDot + _classNamePaddingElement)[LEXICON.l];

                    var initBodyScroll;
                    var bodyMouseTouchDownListener;

                    //check if the plugin hasn't to be initialized
                    if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y && !_currentPreparedOptions.nativeScrollbarsOverlaid.initialize) {
                        dispatchCallback('onInitializationWithdrawn');
                        if (_domExists) {
                            setupStructureDOM(true);
                            setupScrollbarsDOM(true);
                            setupScrollbarCornerDOM(true);
                        }

                        _destroyed = true;
                        _sleeping = true;

                        return _base;
                    }

                    if (_isBody) {
                        initBodyScroll = {};
                        initBodyScroll.l = MATH.max(_targetElement[_strScrollLeft](), _htmlElement[_strScrollLeft](), _windowElement[_strScrollLeft]());
                        initBodyScroll.t = MATH.max(_targetElement[_strScrollTop](), _htmlElement[_strScrollTop](), _windowElement[_strScrollTop]());

                        bodyMouseTouchDownListener = function () {
                            _viewportElement.removeAttr(LEXICON.ti);
                            setupResponsiveEventListener(_viewportElement, _strMouseTouchDownEvent, bodyMouseTouchDownListener, true, true);
                        }
                    }

                    //build OverlayScrollbars DOM
                    setupStructureDOM();
                    setupScrollbarsDOM();
                    setupScrollbarCornerDOM();

                    //create OverlayScrollbars events
                    setupStructureEvents();
                    setupScrollbarEvents(true);
                    setupScrollbarEvents(false);
                    setupScrollbarCornerEvents();

                    //create mutation observers
                    createMutationObservers();

                    //build resize observer for the host element
                    setupResizeObserver(_sizeObserverElement, hostOnResized);

                    if (_isBody) {
                        //apply the body scroll to handle it right in the update method
                        _viewportElement[_strScrollLeft](initBodyScroll.l)[_strScrollTop](initBodyScroll.t);

                        //set the focus on the viewport element so you dont have to click on the page to use keyboard keys (up / down / space) for scrolling
                        if (document.activeElement == targetElement && _viewportElementNative.focus) {
                            //set a tabindex to make the viewportElement focusable
                            _viewportElement.attr(LEXICON.ti, '-1');
                            _viewportElementNative.focus();

                            /* the tabindex has to be removed due to;
                             * If you set the tabindex attribute on an <div>, then its child content cannot be scrolled with the arrow keys unless you set tabindex on the content, too
                             * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                             */
                            setupResponsiveEventListener(_viewportElement, _strMouseTouchDownEvent, bodyMouseTouchDownListener, false, true);
                        }
                    }

                    //update for the first time & initialize cache
                    _base.update(_strAuto);

                    //the plugin is initialized now!
                    _initialized = true;
                    dispatchCallback('onInitialized');

                    //call all callbacks which would fire before the initialized was complete
                    each(_callbacksInitQeueue, function (index, value) { dispatchCallback(value.n, value.a); });
                    _callbacksInitQeueue = [];

                    //add extensions
                    if (type(extensions) == TYPES.s)
                        extensions = [extensions];
                    if (COMPATIBILITY.isA(extensions))
                        each(extensions, function (index, value) { _base.addExt(value); });
                    else if (FRAMEWORK.isPlainObject(extensions))
                        each(extensions, function (key, value) { _base.addExt(key, value); });

                    //add the transition class for transitions AFTER the first update & AFTER the applied extensions (for preventing unwanted transitions)
                    setTimeout(function () {
                        if (_supportTransition && !_destroyed)
                            addClass(_hostElement, _classNameHostTransition);
                    }, 333);

                    return _base;
                }

                if (_plugin.valid(construct(pluginTargetElement, options, extensions))) {
                    INSTANCES(pluginTargetElement, _base);
                }

                return _base;
            }

            /**
             * Initializes a new OverlayScrollbarsInstance object or changes options if already initialized or returns the current instance.
             * @param pluginTargetElements The elements to which the Plugin shall be initialized.
             * @param options The custom options with which the plugin shall be initialized.
             * @param extensions The extension(s) which shall be added right after initialization.
             * @returns {*}
             */
            _plugin = window[PLUGINNAME] = function (pluginTargetElements, options, extensions) {
                if (arguments[LEXICON.l] === 0)
                    return this;

                var arr = [];
                var optsIsPlainObj = FRAMEWORK.isPlainObject(options);
                var inst;
                var result;

                //pluginTargetElements is null or undefined
                if (!pluginTargetElements)
                    return optsIsPlainObj || !options ? result : arr;

                /*
                   pluginTargetElements will be converted to:
                   1. A jQueryElement Array
                   2. A HTMLElement Array
                   3. A Array with a single HTML Element
                   so pluginTargetElements is always a array.
                */
                pluginTargetElements = pluginTargetElements[LEXICON.l] != undefined ? pluginTargetElements : [pluginTargetElements[0] || pluginTargetElements];
                initOverlayScrollbarsStatics();

                if (pluginTargetElements[LEXICON.l] > 0) {
                    if (optsIsPlainObj) {
                        FRAMEWORK.each(pluginTargetElements, function (i, v) {
                            inst = v;
                            if (inst !== undefined)
                                arr.push(OverlayScrollbarsInstance(inst, options, extensions, _pluginsGlobals, _pluginsAutoUpdateLoop));
                        });
                    }
                    else {
                        FRAMEWORK.each(pluginTargetElements, function (i, v) {
                            inst = INSTANCES(v);
                            if ((options === '!' && _plugin.valid(inst)) || (COMPATIBILITY.type(options) == TYPES.f && options(v, inst)))
                                arr.push(inst);
                            else if (options === undefined)
                                arr.push(inst);
                        });
                    }
                    result = arr[LEXICON.l] === 1 ? arr[0] : arr;
                }
                return result;
            };

            /**
             * Returns a object which contains global information about the plugin and each instance of it.
             * The returned object is just a copy, that means that changes to the returned object won't have any effect to the original object.
             */
            _plugin.globals = function () {
                initOverlayScrollbarsStatics();
                var globals = FRAMEWORK.extend(true, {}, _pluginsGlobals);
                delete globals['msie'];
                return globals;
            };

            /**
             * Gets or Sets the default options for each new plugin initialization.
             * @param newDefaultOptions The object with which the default options shall be extended.
             */
            _plugin.defaultOptions = function (newDefaultOptions) {
                initOverlayScrollbarsStatics();
                var currDefaultOptions = _pluginsGlobals.defaultOptions;
                if (newDefaultOptions === undefined)
                    return FRAMEWORK.extend(true, {}, currDefaultOptions);

                //set the new default options
                _pluginsGlobals.defaultOptions = FRAMEWORK.extend(true, {}, currDefaultOptions, _pluginsOptions._validate(newDefaultOptions, _pluginsOptions._template, true, currDefaultOptions)._default);
            };

            /**
             * Checks whether the passed instance is a non-destroyed OverlayScrollbars instance.
             * @param osInstance The potential OverlayScrollbars instance which shall be checked.
             * @returns {boolean} True if the passed value is a non-destroyed OverlayScrollbars instance, false otherwise.
             */
            _plugin.valid = function (osInstance) {
                return osInstance instanceof _plugin && !osInstance.getState().destroyed;
            };

            /**
             * Registers, Unregisters or returns a extension.
             * Register: Pass the name and the extension. (defaultOptions is optional)
             * Unregister: Pass the name and anything except a function as extension parameter.
             * Get extension: Pass the name of the extension which shall be got.
             * Get all extensions: Pass no arguments.
             * @param extensionName The name of the extension which shall be registered, unregistered or returned.
             * @param extension A function which generates the instance of the extension or anything other to remove a already registered extension.
             * @param defaultOptions The default options which shall be used for the registered extension.
             */
            _plugin.extension = function (extensionName, extension, defaultOptions) {
                var extNameTypeString = COMPATIBILITY.type(extensionName) == TYPES.s;
                var argLen = arguments[LEXICON.l];
                var i = 0;
                if (argLen < 1 || !extNameTypeString) {
                    //return a copy of all extension objects
                    return FRAMEWORK.extend(true, { length: _pluginsExtensions[LEXICON.l] }, _pluginsExtensions);
                }
                else if (extNameTypeString) {
                    if (COMPATIBILITY.type(extension) == TYPES.f) {
                        //register extension
                        _pluginsExtensions.push({
                            name: extensionName,
                            extensionFactory: extension,
                            defaultOptions: defaultOptions
                        });
                    }
                    else {
                        for (; i < _pluginsExtensions[LEXICON.l]; i++) {
                            if (_pluginsExtensions[i].name === extensionName) {
                                if (argLen > 1)
                                    _pluginsExtensions.splice(i, 1); //remove extension
                                else
                                    return FRAMEWORK.extend(true, {}, _pluginsExtensions[i]); //return extension with the given name
                            }
                        }
                    }
                }
            };

            return _plugin;
        })();

        if (JQUERY && JQUERY.fn) {
            /**
             * The jQuery initialization interface.
             * @param options The initial options for the construction of the plugin. To initialize the plugin, this option has to be a object! If it isn't a object, the instance(s) are returned and the plugin wont be initialized.
             * @param extensions The extension(s) which shall be added right after initialization.
             * @returns {*} After initialization it returns the jQuery element array, else it returns the instance(s) of the elements which are selected.
             */
            JQUERY.fn.overlayScrollbars = function (options, extensions) {
                var _elements = this;
                if (JQUERY.isPlainObject(options)) {
                    JQUERY.each(_elements, function () { PLUGIN(this, options, extensions); });
                    return _elements;
                }
                else
                    return PLUGIN(_elements, options);
            };
        }
        return PLUGIN;
    }
));

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/rivets/dist/rivets.js":
/*!********************************************!*\
  !*** ./node_modules/rivets/dist/rivets.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Rivets.js
// version: 0.9.6
// author: Michael Richards
// license: MIT
(function() {
  var Rivets, bindMethod, jQuery, unbindMethod, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Rivets = {
    options: ['prefix', 'templateDelimiters', 'rootInterface', 'preloadData', 'handler', 'executeFunctions'],
    extensions: ['binders', 'formatters', 'components', 'adapters'],
    "public": {
      binders: {},
      components: {},
      formatters: {},
      adapters: {},
      prefix: 'rv',
      templateDelimiters: ['{', '}'],
      rootInterface: '.',
      preloadData: true,
      executeFunctions: false,
      iterationAlias: function(modelName) {
        return '%' + modelName + '%';
      },
      handler: function(context, ev, binding) {
        return this.call(context, ev, binding.view.models);
      },
      configure: function(options) {
        var descriptor, key, option, value;
        if (options == null) {
          options = {};
        }
        for (option in options) {
          value = options[option];
          if (option === 'binders' || option === 'components' || option === 'formatters' || option === 'adapters') {
            for (key in value) {
              descriptor = value[key];
              Rivets[option][key] = descriptor;
            }
          } else {
            Rivets["public"][option] = value;
          }
        }
      },
      bind: function(el, models, options) {
        var view;
        if (models == null) {
          models = {};
        }
        if (options == null) {
          options = {};
        }
        view = new Rivets.View(el, models, options);
        view.bind();
        return view;
      },
      init: function(component, el, data) {
        var scope, template, view;
        if (data == null) {
          data = {};
        }
        if (el == null) {
          el = document.createElement('div');
        }
        component = Rivets["public"].components[component];
        template = component.template.call(this, el);
        if (template instanceof HTMLElement) {
          while (el.firstChild) {
            el.removeChild(el.firstChild);
          }
          el.appendChild(template);
        } else {
          el.innerHTML = template;
        }
        scope = component.initialize.call(this, el, data);
        view = new Rivets.View(el, scope);
        view.bind();
        return view;
      }
    }
  };

  if (window['jQuery'] || window['$']) {
    jQuery = window['jQuery'] || window['$'];
    _ref = 'on' in jQuery.prototype ? ['on', 'off'] : ['bind', 'unbind'], bindMethod = _ref[0], unbindMethod = _ref[1];
    Rivets.Util = {
      bindEvent: function(el, event, handler) {
        return jQuery(el)[bindMethod](event, handler);
      },
      unbindEvent: function(el, event, handler) {
        return jQuery(el)[unbindMethod](event, handler);
      },
      getInputValue: function(el) {
        var $el;
        $el = jQuery(el);
        if ($el.attr('type') === 'checkbox') {
          return $el.is(':checked');
        } else {
          return $el.val();
        }
      }
    };
  } else {
    Rivets.Util = {
      bindEvent: (function() {
        if ('addEventListener' in window) {
          return function(el, event, handler) {
            return el.addEventListener(event, handler, false);
          };
        }
        return function(el, event, handler) {
          return el.attachEvent('on' + event, handler);
        };
      })(),
      unbindEvent: (function() {
        if ('removeEventListener' in window) {
          return function(el, event, handler) {
            return el.removeEventListener(event, handler, false);
          };
        }
        return function(el, event, handler) {
          return el.detachEvent('on' + event, handler);
        };
      })(),
      getInputValue: function(el) {
        var o, _i, _len, _results;
        if (el.type === 'checkbox') {
          return el.checked;
        } else if (el.type === 'select-multiple') {
          _results = [];
          for (_i = 0, _len = el.length; _i < _len; _i++) {
            o = el[_i];
            if (o.selected) {
              _results.push(o.value);
            }
          }
          return _results;
        } else {
          return el.value;
        }
      }
    };
  }

  Rivets.TypeParser = (function() {
    function TypeParser() {}

    TypeParser.types = {
      primitive: 0,
      keypath: 1
    };

    TypeParser.parse = function(string) {
      if (/^'.*'$|^".*"$/.test(string)) {
        return {
          type: this.types.primitive,
          value: string.slice(1, -1)
        };
      } else if (string === 'true') {
        return {
          type: this.types.primitive,
          value: true
        };
      } else if (string === 'false') {
        return {
          type: this.types.primitive,
          value: false
        };
      } else if (string === 'null') {
        return {
          type: this.types.primitive,
          value: null
        };
      } else if (string === 'undefined') {
        return {
          type: this.types.primitive,
          value: void 0
        };
      } else if (string === '') {
        return {
          type: this.types.primitive,
          value: void 0
        };
      } else if (isNaN(Number(string)) === false) {
        return {
          type: this.types.primitive,
          value: Number(string)
        };
      } else {
        return {
          type: this.types.keypath,
          value: string
        };
      }
    };

    return TypeParser;

  })();

  Rivets.TextTemplateParser = (function() {
    function TextTemplateParser() {}

    TextTemplateParser.types = {
      text: 0,
      binding: 1
    };

    TextTemplateParser.parse = function(template, delimiters) {
      var index, lastIndex, lastToken, length, substring, tokens, value;
      tokens = [];
      length = template.length;
      index = 0;
      lastIndex = 0;
      while (lastIndex < length) {
        index = template.indexOf(delimiters[0], lastIndex);
        if (index < 0) {
          tokens.push({
            type: this.types.text,
            value: template.slice(lastIndex)
          });
          break;
        } else {
          if (index > 0 && lastIndex < index) {
            tokens.push({
              type: this.types.text,
              value: template.slice(lastIndex, index)
            });
          }
          lastIndex = index + delimiters[0].length;
          index = template.indexOf(delimiters[1], lastIndex);
          if (index < 0) {
            substring = template.slice(lastIndex - delimiters[1].length);
            lastToken = tokens[tokens.length - 1];
            if ((lastToken != null ? lastToken.type : void 0) === this.types.text) {
              lastToken.value += substring;
            } else {
              tokens.push({
                type: this.types.text,
                value: substring
              });
            }
            break;
          }
          value = template.slice(lastIndex, index).trim();
          tokens.push({
            type: this.types.binding,
            value: value
          });
          lastIndex = index + delimiters[1].length;
        }
      }
      return tokens;
    };

    return TextTemplateParser;

  })();

  Rivets.View = (function() {
    function View(els, models, options) {
      var k, option, v, _base, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5;
      this.els = els;
      this.models = models;
      if (options == null) {
        options = {};
      }
      this.update = __bind(this.update, this);
      this.publish = __bind(this.publish, this);
      this.sync = __bind(this.sync, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.select = __bind(this.select, this);
      this.traverse = __bind(this.traverse, this);
      this.build = __bind(this.build, this);
      this.buildBinding = __bind(this.buildBinding, this);
      this.bindingRegExp = __bind(this.bindingRegExp, this);
      this.options = __bind(this.options, this);
      if (!(this.els.jquery || this.els instanceof Array)) {
        this.els = [this.els];
      }
      _ref1 = Rivets.extensions;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        option = _ref1[_i];
        this[option] = {};
        if (options[option]) {
          _ref2 = options[option];
          for (k in _ref2) {
            v = _ref2[k];
            this[option][k] = v;
          }
        }
        _ref3 = Rivets["public"][option];
        for (k in _ref3) {
          v = _ref3[k];
          if ((_base = this[option])[k] == null) {
            _base[k] = v;
          }
        }
      }
      _ref4 = Rivets.options;
      for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
        option = _ref4[_j];
        this[option] = (_ref5 = options[option]) != null ? _ref5 : Rivets["public"][option];
      }
      this.build();
    }

    View.prototype.options = function() {
      var option, options, _i, _len, _ref1;
      options = {};
      _ref1 = Rivets.extensions.concat(Rivets.options);
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        option = _ref1[_i];
        options[option] = this[option];
      }
      return options;
    };

    View.prototype.bindingRegExp = function() {
      return new RegExp("^" + this.prefix + "-");
    };

    View.prototype.buildBinding = function(binding, node, type, declaration) {
      var context, ctx, dependencies, keypath, options, pipe, pipes;
      options = {};
      pipes = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = declaration.match(/((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g);
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          pipe = _ref1[_i];
          _results.push(pipe.trim());
        }
        return _results;
      })();
      context = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = pipes.shift().split('<');
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          ctx = _ref1[_i];
          _results.push(ctx.trim());
        }
        return _results;
      })();
      keypath = context.shift();
      options.formatters = pipes;
      if (dependencies = context.shift()) {
        options.dependencies = dependencies.split(/\s+/);
      }
      return this.bindings.push(new Rivets[binding](this, node, type, keypath, options));
    };

    View.prototype.build = function() {
      var el, parse, _i, _len, _ref1;
      this.bindings = [];
      parse = (function(_this) {
        return function(node) {
          var block, childNode, delimiters, n, parser, text, token, tokens, _i, _j, _len, _len1, _ref1;
          if (node.nodeType === 3) {
            parser = Rivets.TextTemplateParser;
            if (delimiters = _this.templateDelimiters) {
              if ((tokens = parser.parse(node.data, delimiters)).length) {
                if (!(tokens.length === 1 && tokens[0].type === parser.types.text)) {
                  for (_i = 0, _len = tokens.length; _i < _len; _i++) {
                    token = tokens[_i];
                    text = document.createTextNode(token.value);
                    node.parentNode.insertBefore(text, node);
                    if (token.type === 1) {
                      _this.buildBinding('TextBinding', text, null, token.value);
                    }
                  }
                  node.parentNode.removeChild(node);
                }
              }
            }
          } else if (node.nodeType === 1) {
            block = _this.traverse(node);
          }
          if (!block) {
            _ref1 = (function() {
              var _k, _len1, _ref1, _results;
              _ref1 = node.childNodes;
              _results = [];
              for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
                n = _ref1[_k];
                _results.push(n);
              }
              return _results;
            })();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              childNode = _ref1[_j];
              parse(childNode);
            }
          }
        };
      })(this);
      _ref1 = this.els;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        el = _ref1[_i];
        parse(el);
      }
      this.bindings.sort(function(a, b) {
        var _ref2, _ref3;
        return (((_ref2 = b.binder) != null ? _ref2.priority : void 0) || 0) - (((_ref3 = a.binder) != null ? _ref3.priority : void 0) || 0);
      });
    };

    View.prototype.traverse = function(node) {
      var attribute, attributes, binder, bindingRegExp, block, identifier, regexp, type, value, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
      bindingRegExp = this.bindingRegExp();
      block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
      _ref1 = node.attributes;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        attribute = _ref1[_i];
        if (bindingRegExp.test(attribute.name)) {
          type = attribute.name.replace(bindingRegExp, '');
          if (!(binder = this.binders[type])) {
            _ref2 = this.binders;
            for (identifier in _ref2) {
              value = _ref2[identifier];
              if (identifier !== '*' && identifier.indexOf('*') !== -1) {
                regexp = new RegExp("^" + (identifier.replace(/\*/g, '.+')) + "$");
                if (regexp.test(type)) {
                  binder = value;
                }
              }
            }
          }
          binder || (binder = this.binders['*']);
          if (binder.block) {
            block = true;
            attributes = [attribute];
          }
        }
      }
      _ref3 = attributes || node.attributes;
      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
        attribute = _ref3[_j];
        if (bindingRegExp.test(attribute.name)) {
          type = attribute.name.replace(bindingRegExp, '');
          this.buildBinding('Binding', node, type, attribute.value);
        }
      }
      if (!block) {
        type = node.nodeName.toLowerCase();
        if (this.components[type] && !node._bound) {
          this.bindings.push(new Rivets.ComponentBinding(this, node, type));
          block = true;
        }
      }
      return block;
    };

    View.prototype.select = function(fn) {
      var binding, _i, _len, _ref1, _results;
      _ref1 = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        binding = _ref1[_i];
        if (fn(binding)) {
          _results.push(binding);
        }
      }
      return _results;
    };

    View.prototype.bind = function() {
      var binding, _i, _len, _ref1;
      _ref1 = this.bindings;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        binding = _ref1[_i];
        binding.bind();
      }
    };

    View.prototype.unbind = function() {
      var binding, _i, _len, _ref1;
      _ref1 = this.bindings;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        binding = _ref1[_i];
        binding.unbind();
      }
    };

    View.prototype.sync = function() {
      var binding, _i, _len, _ref1;
      _ref1 = this.bindings;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        binding = _ref1[_i];
        if (typeof binding.sync === "function") {
          binding.sync();
        }
      }
    };

    View.prototype.publish = function() {
      var binding, _i, _len, _ref1;
      _ref1 = this.select(function(b) {
        var _ref1;
        return (_ref1 = b.binder) != null ? _ref1.publishes : void 0;
      });
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        binding = _ref1[_i];
        binding.publish();
      }
    };

    View.prototype.update = function(models) {
      var binding, key, model, _i, _len, _ref1;
      if (models == null) {
        models = {};
      }
      for (key in models) {
        model = models[key];
        this.models[key] = model;
      }
      _ref1 = this.bindings;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        binding = _ref1[_i];
        if (typeof binding.update === "function") {
          binding.update(models);
        }
      }
    };

    return View;

  })();

  Rivets.Binding = (function() {
    function Binding(view, el, type, keypath, options) {
      this.view = view;
      this.el = el;
      this.type = type;
      this.keypath = keypath;
      this.options = options != null ? options : {};
      this.getValue = __bind(this.getValue, this);
      this.update = __bind(this.update, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.publish = __bind(this.publish, this);
      this.sync = __bind(this.sync, this);
      this.set = __bind(this.set, this);
      this.eventHandler = __bind(this.eventHandler, this);
      this.formattedValue = __bind(this.formattedValue, this);
      this.parseFormatterArguments = __bind(this.parseFormatterArguments, this);
      this.parseTarget = __bind(this.parseTarget, this);
      this.observe = __bind(this.observe, this);
      this.setBinder = __bind(this.setBinder, this);
      this.formatters = this.options.formatters || [];
      this.dependencies = [];
      this.formatterObservers = {};
      this.model = void 0;
      this.setBinder();
    }

    Binding.prototype.setBinder = function() {
      var identifier, regexp, value, _ref1;
      if (!(this.binder = this.view.binders[this.type])) {
        _ref1 = this.view.binders;
        for (identifier in _ref1) {
          value = _ref1[identifier];
          if (identifier !== '*' && identifier.indexOf('*') !== -1) {
            regexp = new RegExp("^" + (identifier.replace(/\*/g, '.+')) + "$");
            if (regexp.test(this.type)) {
              this.binder = value;
              this.args = new RegExp("^" + (identifier.replace(/\*/g, '(.+)')) + "$").exec(this.type);
              this.args.shift();
            }
          }
        }
      }
      this.binder || (this.binder = this.view.binders['*']);
      if (this.binder instanceof Function) {
        return this.binder = {
          routine: this.binder
        };
      }
    };

    Binding.prototype.observe = function(obj, keypath, callback) {
      return Rivets.sightglass(obj, keypath, callback, {
        root: this.view.rootInterface,
        adapters: this.view.adapters
      });
    };

    Binding.prototype.parseTarget = function() {
      var token;
      token = Rivets.TypeParser.parse(this.keypath);
      if (token.type === Rivets.TypeParser.types.primitive) {
        return this.value = token.value;
      } else {
        this.observer = this.observe(this.view.models, this.keypath, this.sync);
        return this.model = this.observer.target;
      }
    };

    Binding.prototype.parseFormatterArguments = function(args, formatterIndex) {
      var ai, arg, observer, processedArgs, _base, _i, _len;
      args = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          _results.push(Rivets.TypeParser.parse(arg));
        }
        return _results;
      })();
      processedArgs = [];
      for (ai = _i = 0, _len = args.length; _i < _len; ai = ++_i) {
        arg = args[ai];
        processedArgs.push(arg.type === Rivets.TypeParser.types.primitive ? arg.value : ((_base = this.formatterObservers)[formatterIndex] || (_base[formatterIndex] = {}), !(observer = this.formatterObservers[formatterIndex][ai]) ? (observer = this.observe(this.view.models, arg.value, this.sync), this.formatterObservers[formatterIndex][ai] = observer) : void 0, observer.value()));
      }
      return processedArgs;
    };

    Binding.prototype.formattedValue = function(value) {
      var args, fi, formatter, id, processedArgs, _i, _len, _ref1, _ref2;
      _ref1 = this.formatters;
      for (fi = _i = 0, _len = _ref1.length; _i < _len; fi = ++_i) {
        formatter = _ref1[fi];
        args = formatter.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g);
        id = args.shift();
        formatter = this.view.formatters[id];
        processedArgs = this.parseFormatterArguments(args, fi);
        if ((formatter != null ? formatter.read : void 0) instanceof Function) {
          value = (_ref2 = formatter.read).call.apply(_ref2, [this.model, value].concat(__slice.call(processedArgs)));
        } else if (formatter instanceof Function) {
          value = formatter.call.apply(formatter, [this.model, value].concat(__slice.call(processedArgs)));
        }
      }
      return value;
    };

    Binding.prototype.eventHandler = function(fn) {
      var binding, handler;
      handler = (binding = this).view.handler;
      return function(ev) {
        return handler.call(fn, this, ev, binding);
      };
    };

    Binding.prototype.set = function(value) {
      var _ref1;
      value = value instanceof Function && !this.binder["function"] && Rivets["public"].executeFunctions ? this.formattedValue(value.call(this.model)) : this.formattedValue(value);
      return (_ref1 = this.binder.routine) != null ? _ref1.call(this, this.el, value) : void 0;
    };

    Binding.prototype.sync = function() {
      var dependency, observer;
      return this.set((function() {
        var _i, _j, _len, _len1, _ref1, _ref2, _ref3;
        if (this.observer) {
          if (this.model !== this.observer.target) {
            _ref1 = this.dependencies;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              observer = _ref1[_i];
              observer.unobserve();
            }
            this.dependencies = [];
            if (((this.model = this.observer.target) != null) && ((_ref2 = this.options.dependencies) != null ? _ref2.length : void 0)) {
              _ref3 = this.options.dependencies;
              for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                dependency = _ref3[_j];
                observer = this.observe(this.model, dependency, this.sync);
                this.dependencies.push(observer);
              }
            }
          }
          return this.observer.value();
        } else {
          return this.value;
        }
      }).call(this));
    };

    Binding.prototype.publish = function() {
      var args, fi, fiReversed, formatter, id, lastformatterIndex, processedArgs, value, _i, _len, _ref1, _ref2, _ref3;
      if (this.observer) {
        value = this.getValue(this.el);
        lastformatterIndex = this.formatters.length - 1;
        _ref1 = this.formatters.slice(0).reverse();
        for (fiReversed = _i = 0, _len = _ref1.length; _i < _len; fiReversed = ++_i) {
          formatter = _ref1[fiReversed];
          fi = lastformatterIndex - fiReversed;
          args = formatter.split(/\s+/);
          id = args.shift();
          processedArgs = this.parseFormatterArguments(args, fi);
          if ((_ref2 = this.view.formatters[id]) != null ? _ref2.publish : void 0) {
            value = (_ref3 = this.view.formatters[id]).publish.apply(_ref3, [value].concat(__slice.call(processedArgs)));
          }
        }
        return this.observer.setValue(value);
      }
    };

    Binding.prototype.bind = function() {
      var dependency, observer, _i, _len, _ref1, _ref2, _ref3;
      this.parseTarget();
      if ((_ref1 = this.binder.bind) != null) {
        _ref1.call(this, this.el);
      }
      if ((this.model != null) && ((_ref2 = this.options.dependencies) != null ? _ref2.length : void 0)) {
        _ref3 = this.options.dependencies;
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          dependency = _ref3[_i];
          observer = this.observe(this.model, dependency, this.sync);
          this.dependencies.push(observer);
        }
      }
      if (this.view.preloadData) {
        return this.sync();
      }
    };

    Binding.prototype.unbind = function() {
      var ai, args, fi, observer, _i, _len, _ref1, _ref2, _ref3, _ref4;
      if ((_ref1 = this.binder.unbind) != null) {
        _ref1.call(this, this.el);
      }
      if ((_ref2 = this.observer) != null) {
        _ref2.unobserve();
      }
      _ref3 = this.dependencies;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        observer = _ref3[_i];
        observer.unobserve();
      }
      this.dependencies = [];
      _ref4 = this.formatterObservers;
      for (fi in _ref4) {
        args = _ref4[fi];
        for (ai in args) {
          observer = args[ai];
          observer.unobserve();
        }
      }
      return this.formatterObservers = {};
    };

    Binding.prototype.update = function(models) {
      var _ref1, _ref2;
      if (models == null) {
        models = {};
      }
      this.model = (_ref1 = this.observer) != null ? _ref1.target : void 0;
      return (_ref2 = this.binder.update) != null ? _ref2.call(this, models) : void 0;
    };

    Binding.prototype.getValue = function(el) {
      if (this.binder && (this.binder.getValue != null)) {
        return this.binder.getValue.call(this, el);
      } else {
        return Rivets.Util.getInputValue(el);
      }
    };

    return Binding;

  })();

  Rivets.ComponentBinding = (function(_super) {
    __extends(ComponentBinding, _super);

    function ComponentBinding(view, el, type) {
      var attribute, bindingRegExp, propertyName, token, _i, _len, _ref1, _ref2;
      this.view = view;
      this.el = el;
      this.type = type;
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.locals = __bind(this.locals, this);
      this.component = this.view.components[this.type];
      this["static"] = {};
      this.observers = {};
      this.upstreamObservers = {};
      bindingRegExp = view.bindingRegExp();
      _ref1 = this.el.attributes || [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        attribute = _ref1[_i];
        if (!bindingRegExp.test(attribute.name)) {
          propertyName = this.camelCase(attribute.name);
          token = Rivets.TypeParser.parse(attribute.value);
          if (__indexOf.call((_ref2 = this.component["static"]) != null ? _ref2 : [], propertyName) >= 0) {
            this["static"][propertyName] = attribute.value;
          } else if (token.type === Rivets.TypeParser.types.primitive) {
            this["static"][propertyName] = token.value;
          } else {
            this.observers[propertyName] = attribute.value;
          }
        }
      }
    }

    ComponentBinding.prototype.sync = function() {};

    ComponentBinding.prototype.update = function() {};

    ComponentBinding.prototype.publish = function() {};

    ComponentBinding.prototype.locals = function() {
      var key, observer, result, value, _ref1, _ref2;
      result = {};
      _ref1 = this["static"];
      for (key in _ref1) {
        value = _ref1[key];
        result[key] = value;
      }
      _ref2 = this.observers;
      for (key in _ref2) {
        observer = _ref2[key];
        result[key] = observer.value();
      }
      return result;
    };

    ComponentBinding.prototype.camelCase = function(string) {
      return string.replace(/-([a-z])/g, function(grouped) {
        return grouped[1].toUpperCase();
      });
    };

    ComponentBinding.prototype.bind = function() {
      var k, key, keypath, observer, option, options, scope, v, _base, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if (!this.bound) {
        _ref1 = this.observers;
        for (key in _ref1) {
          keypath = _ref1[key];
          this.observers[key] = this.observe(this.view.models, keypath, ((function(_this) {
            return function(key) {
              return function() {
                return _this.componentView.models[key] = _this.observers[key].value();
              };
            };
          })(this)).call(this, key));
        }
        this.bound = true;
      }
      if (this.componentView != null) {
        this.componentView.bind();
      } else {
        this.el.innerHTML = this.component.template.call(this);
        scope = this.component.initialize.call(this, this.el, this.locals());
        this.el._bound = true;
        options = {};
        _ref2 = Rivets.extensions;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          option = _ref2[_i];
          options[option] = {};
          if (this.component[option]) {
            _ref3 = this.component[option];
            for (k in _ref3) {
              v = _ref3[k];
              options[option][k] = v;
            }
          }
          _ref4 = this.view[option];
          for (k in _ref4) {
            v = _ref4[k];
            if ((_base = options[option])[k] == null) {
              _base[k] = v;
            }
          }
        }
        _ref5 = Rivets.options;
        for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
          option = _ref5[_j];
          options[option] = (_ref6 = this.component[option]) != null ? _ref6 : this.view[option];
        }
        this.componentView = new Rivets.View(Array.prototype.slice.call(this.el.childNodes), scope, options);
        this.componentView.bind();
        _ref7 = this.observers;
        for (key in _ref7) {
          observer = _ref7[key];
          this.upstreamObservers[key] = this.observe(this.componentView.models, key, ((function(_this) {
            return function(key, observer) {
              return function() {
                return observer.setValue(_this.componentView.models[key]);
              };
            };
          })(this)).call(this, key, observer));
        }
      }
    };

    ComponentBinding.prototype.unbind = function() {
      var key, observer, _ref1, _ref2, _ref3;
      _ref1 = this.upstreamObservers;
      for (key in _ref1) {
        observer = _ref1[key];
        observer.unobserve();
      }
      _ref2 = this.observers;
      for (key in _ref2) {
        observer = _ref2[key];
        observer.unobserve();
      }
      return (_ref3 = this.componentView) != null ? _ref3.unbind.call(this) : void 0;
    };

    return ComponentBinding;

  })(Rivets.Binding);

  Rivets.TextBinding = (function(_super) {
    __extends(TextBinding, _super);

    function TextBinding(view, el, type, keypath, options) {
      this.view = view;
      this.el = el;
      this.type = type;
      this.keypath = keypath;
      this.options = options != null ? options : {};
      this.sync = __bind(this.sync, this);
      this.formatters = this.options.formatters || [];
      this.dependencies = [];
      this.formatterObservers = {};
    }

    TextBinding.prototype.binder = {
      routine: function(node, value) {
        return node.data = value != null ? value : '';
      }
    };

    TextBinding.prototype.sync = function() {
      return TextBinding.__super__.sync.apply(this, arguments);
    };

    return TextBinding;

  })(Rivets.Binding);

  Rivets["public"].binders.text = function(el, value) {
    if (el.textContent != null) {
      return el.textContent = value != null ? value : '';
    } else {
      return el.innerText = value != null ? value : '';
    }
  };

  Rivets["public"].binders.html = function(el, value) {
    return el.innerHTML = value != null ? value : '';
  };

  Rivets["public"].binders.show = function(el, value) {
    return el.style.display = value ? '' : 'none';
  };

  Rivets["public"].binders.hide = function(el, value) {
    return el.style.display = value ? 'none' : '';
  };

  Rivets["public"].binders.enabled = function(el, value) {
    return el.disabled = !value;
  };

  Rivets["public"].binders.disabled = function(el, value) {
    return el.disabled = !!value;
  };

  Rivets["public"].binders.checked = {
    publishes: true,
    priority: 2000,
    bind: function(el) {
      return Rivets.Util.bindEvent(el, 'change', this.publish);
    },
    unbind: function(el) {
      return Rivets.Util.unbindEvent(el, 'change', this.publish);
    },
    routine: function(el, value) {
      var _ref1;
      if (el.type === 'radio') {
        return el.checked = ((_ref1 = el.value) != null ? _ref1.toString() : void 0) === (value != null ? value.toString() : void 0);
      } else {
        return el.checked = !!value;
      }
    }
  };

  Rivets["public"].binders.unchecked = {
    publishes: true,
    priority: 2000,
    bind: function(el) {
      return Rivets.Util.bindEvent(el, 'change', this.publish);
    },
    unbind: function(el) {
      return Rivets.Util.unbindEvent(el, 'change', this.publish);
    },
    routine: function(el, value) {
      var _ref1;
      if (el.type === 'radio') {
        return el.checked = ((_ref1 = el.value) != null ? _ref1.toString() : void 0) !== (value != null ? value.toString() : void 0);
      } else {
        return el.checked = !value;
      }
    }
  };

  Rivets["public"].binders.value = {
    publishes: true,
    priority: 3000,
    bind: function(el) {
      if (!(el.tagName === 'INPUT' && el.type === 'radio')) {
        this.event = el.tagName === 'SELECT' ? 'change' : 'input';
        return Rivets.Util.bindEvent(el, this.event, this.publish);
      }
    },
    unbind: function(el) {
      if (!(el.tagName === 'INPUT' && el.type === 'radio')) {
        return Rivets.Util.unbindEvent(el, this.event, this.publish);
      }
    },
    routine: function(el, value) {
      var o, _i, _len, _ref1, _ref2, _ref3, _results;
      if (el.tagName === 'INPUT' && el.type === 'radio') {
        return el.setAttribute('value', value);
      } else if (window.jQuery != null) {
        el = jQuery(el);
        if ((value != null ? value.toString() : void 0) !== ((_ref1 = el.val()) != null ? _ref1.toString() : void 0)) {
          return el.val(value != null ? value : '');
        }
      } else {
        if (el.type === 'select-multiple') {
          if (value != null) {
            _results = [];
            for (_i = 0, _len = el.length; _i < _len; _i++) {
              o = el[_i];
              _results.push(o.selected = (_ref2 = o.value, __indexOf.call(value, _ref2) >= 0));
            }
            return _results;
          }
        } else if ((value != null ? value.toString() : void 0) !== ((_ref3 = el.value) != null ? _ref3.toString() : void 0)) {
          return el.value = value != null ? value : '';
        }
      }
    }
  };

  Rivets["public"].binders["if"] = {
    block: true,
    priority: 4000,
    bind: function(el) {
      var attr, declaration;
      if (this.marker == null) {
        attr = [this.view.prefix, this.type].join('-').replace('--', '-');
        declaration = el.getAttribute(attr);
        this.marker = document.createComment(" rivets: " + this.type + " " + declaration + " ");
        this.bound = false;
        el.removeAttribute(attr);
        el.parentNode.insertBefore(this.marker, el);
        return el.parentNode.removeChild(el);
      }
    },
    unbind: function() {
      if (this.nested) {
        this.nested.unbind();
        return this.bound = false;
      }
    },
    routine: function(el, value) {
      var key, model, models, _ref1;
      if (!!value === !this.bound) {
        if (value) {
          models = {};
          _ref1 = this.view.models;
          for (key in _ref1) {
            model = _ref1[key];
            models[key] = model;
          }
          (this.nested || (this.nested = new Rivets.View(el, models, this.view.options()))).bind();
          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
          return this.bound = true;
        } else {
          el.parentNode.removeChild(el);
          this.nested.unbind();
          return this.bound = false;
        }
      }
    },
    update: function(models) {
      var _ref1;
      return (_ref1 = this.nested) != null ? _ref1.update(models) : void 0;
    }
  };

  Rivets["public"].binders.unless = {
    block: true,
    priority: 4000,
    bind: function(el) {
      return Rivets["public"].binders["if"].bind.call(this, el);
    },
    unbind: function() {
      return Rivets["public"].binders["if"].unbind.call(this);
    },
    routine: function(el, value) {
      return Rivets["public"].binders["if"].routine.call(this, el, !value);
    },
    update: function(models) {
      return Rivets["public"].binders["if"].update.call(this, models);
    }
  };

  Rivets["public"].binders['on-*'] = {
    "function": true,
    priority: 1000,
    unbind: function(el) {
      if (this.handler) {
        return Rivets.Util.unbindEvent(el, this.args[0], this.handler);
      }
    },
    routine: function(el, value) {
      if (this.handler) {
        Rivets.Util.unbindEvent(el, this.args[0], this.handler);
      }
      return Rivets.Util.bindEvent(el, this.args[0], this.handler = this.eventHandler(value));
    }
  };

  Rivets["public"].binders['each-*'] = {
    block: true,
    priority: 4000,
    bind: function(el) {
      var attr, view, _i, _len, _ref1;
      if (this.marker == null) {
        attr = [this.view.prefix, this.type].join('-').replace('--', '-');
        this.marker = document.createComment(" rivets: " + this.type + " ");
        this.iterated = [];
        el.removeAttribute(attr);
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else {
        _ref1 = this.iterated;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          view = _ref1[_i];
          view.bind();
        }
      }
    },
    unbind: function(el) {
      var view, _i, _len, _ref1;
      if (this.iterated != null) {
        _ref1 = this.iterated;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          view = _ref1[_i];
          view.unbind();
        }
      }
    },
    routine: function(el, collection) {
      var binding, data, i, index, key, model, modelName, options, previous, template, view, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _ref3;
      modelName = this.args[0];
      collection = collection || [];
      if (this.iterated.length > collection.length) {
        _ref1 = Array(this.iterated.length - collection.length);
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          i = _ref1[_i];
          view = this.iterated.pop();
          view.unbind();
          this.marker.parentNode.removeChild(view.els[0]);
        }
      }
      for (index = _j = 0, _len1 = collection.length; _j < _len1; index = ++_j) {
        model = collection[index];
        data = {
          index: index
        };
        data[Rivets["public"].iterationAlias(modelName)] = index;
        data[modelName] = model;
        if (this.iterated[index] == null) {
          _ref2 = this.view.models;
          for (key in _ref2) {
            model = _ref2[key];
            if (data[key] == null) {
              data[key] = model;
            }
          }
          previous = this.iterated.length ? this.iterated[this.iterated.length - 1].els[0] : this.marker;
          options = this.view.options();
          options.preloadData = true;
          template = el.cloneNode(true);
          view = new Rivets.View(template, data, options);
          view.bind();
          this.iterated.push(view);
          this.marker.parentNode.insertBefore(template, previous.nextSibling);
        } else if (this.iterated[index].models[modelName] !== model) {
          this.iterated[index].update(data);
        }
      }
      if (el.nodeName === 'OPTION') {
        _ref3 = this.view.bindings;
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          binding = _ref3[_k];
          if (binding.el === this.marker.parentNode && binding.type === 'value') {
            binding.sync();
          }
        }
      }
    },
    update: function(models) {
      var data, key, model, view, _i, _len, _ref1;
      data = {};
      for (key in models) {
        model = models[key];
        if (key !== this.args[0]) {
          data[key] = model;
        }
      }
      _ref1 = this.iterated;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        view.update(data);
      }
    }
  };

  Rivets["public"].binders['class-*'] = function(el, value) {
    var elClass;
    elClass = " " + el.className + " ";
    if (!value === (elClass.indexOf(" " + this.args[0] + " ") !== -1)) {
      return el.className = value ? "" + el.className + " " + this.args[0] : elClass.replace(" " + this.args[0] + " ", ' ').trim();
    }
  };

  Rivets["public"].binders['*'] = function(el, value) {
    if (value != null) {
      return el.setAttribute(this.type, value);
    } else {
      return el.removeAttribute(this.type);
    }
  };

  Rivets["public"].formatters['call'] = function() {
    var args, value;
    value = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return value.call.apply(value, [this].concat(__slice.call(args)));
  };

  Rivets["public"].adapters['.'] = {
    id: '_rv',
    counter: 0,
    weakmap: {},
    weakReference: function(obj) {
      var id, _base, _name;
      if (!obj.hasOwnProperty(this.id)) {
        id = this.counter++;
        Object.defineProperty(obj, this.id, {
          value: id
        });
      }
      return (_base = this.weakmap)[_name = obj[this.id]] || (_base[_name] = {
        callbacks: {}
      });
    },
    cleanupWeakReference: function(ref, id) {
      if (!Object.keys(ref.callbacks).length) {
        if (!(ref.pointers && Object.keys(ref.pointers).length)) {
          return delete this.weakmap[id];
        }
      }
    },
    stubFunction: function(obj, fn) {
      var map, original, weakmap;
      original = obj[fn];
      map = this.weakReference(obj);
      weakmap = this.weakmap;
      return obj[fn] = function() {
        var callback, k, r, response, _i, _len, _ref1, _ref2, _ref3, _ref4;
        response = original.apply(obj, arguments);
        _ref1 = map.pointers;
        for (r in _ref1) {
          k = _ref1[r];
          _ref4 = (_ref2 = (_ref3 = weakmap[r]) != null ? _ref3.callbacks[k] : void 0) != null ? _ref2 : [];
          for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
            callback = _ref4[_i];
            callback();
          }
        }
        return response;
      };
    },
    observeMutations: function(obj, ref, keypath) {
      var fn, functions, map, _base, _i, _len;
      if (Array.isArray(obj)) {
        map = this.weakReference(obj);
        if (map.pointers == null) {
          map.pointers = {};
          functions = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
          for (_i = 0, _len = functions.length; _i < _len; _i++) {
            fn = functions[_i];
            this.stubFunction(obj, fn);
          }
        }
        if ((_base = map.pointers)[ref] == null) {
          _base[ref] = [];
        }
        if (__indexOf.call(map.pointers[ref], keypath) < 0) {
          return map.pointers[ref].push(keypath);
        }
      }
    },
    unobserveMutations: function(obj, ref, keypath) {
      var idx, map, pointers;
      if (Array.isArray(obj) && (obj[this.id] != null)) {
        if (map = this.weakmap[obj[this.id]]) {
          if (pointers = map.pointers[ref]) {
            if ((idx = pointers.indexOf(keypath)) >= 0) {
              pointers.splice(idx, 1);
            }
            if (!pointers.length) {
              delete map.pointers[ref];
            }
            return this.cleanupWeakReference(map, obj[this.id]);
          }
        }
      }
    },
    observe: function(obj, keypath, callback) {
      var callbacks, desc, value;
      callbacks = this.weakReference(obj).callbacks;
      if (callbacks[keypath] == null) {
        callbacks[keypath] = [];
        desc = Object.getOwnPropertyDescriptor(obj, keypath);
        if (!((desc != null ? desc.get : void 0) || (desc != null ? desc.set : void 0))) {
          value = obj[keypath];
          Object.defineProperty(obj, keypath, {
            enumerable: true,
            get: function() {
              return value;
            },
            set: (function(_this) {
              return function(newValue) {
                var cb, map, _i, _len, _ref1;
                if (newValue !== value) {
                  _this.unobserveMutations(value, obj[_this.id], keypath);
                  value = newValue;
                  if (map = _this.weakmap[obj[_this.id]]) {
                    callbacks = map.callbacks;
                    if (callbacks[keypath]) {
                      _ref1 = callbacks[keypath].slice();
                      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                        cb = _ref1[_i];
                        if (__indexOf.call(callbacks[keypath], cb) >= 0) {
                          cb();
                        }
                      }
                    }
                    return _this.observeMutations(newValue, obj[_this.id], keypath);
                  }
                }
              };
            })(this)
          });
        }
      }
      if (__indexOf.call(callbacks[keypath], callback) < 0) {
        callbacks[keypath].push(callback);
      }
      return this.observeMutations(obj[keypath], obj[this.id], keypath);
    },
    unobserve: function(obj, keypath, callback) {
      var callbacks, idx, map;
      if (map = this.weakmap[obj[this.id]]) {
        if (callbacks = map.callbacks[keypath]) {
          if ((idx = callbacks.indexOf(callback)) >= 0) {
            callbacks.splice(idx, 1);
            if (!callbacks.length) {
              delete map.callbacks[keypath];
              this.unobserveMutations(obj[keypath], obj[this.id], keypath);
            }
          }
          return this.cleanupWeakReference(map, obj[this.id]);
        }
      }
    },
    get: function(obj, keypath) {
      return obj[keypath];
    },
    set: function(obj, keypath, value) {
      return obj[keypath] = value;
    }
  };

  Rivets.factory = function(sightglass) {
    Rivets.sightglass = sightglass;
    Rivets["public"]._ = Rivets;
    return Rivets["public"];
  };

  if (typeof ( true && module !== null ? module.exports : void 0) === 'object') {
    module.exports = Rivets.factory(__webpack_require__(/*! sightglass */ "./node_modules/sightglass/index.js"));
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! sightglass */ "./node_modules/sightglass/index.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(sightglass) {
      return this.rivets = Rivets.factory(sightglass);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}).call(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/sightglass/index.js":
/*!******************************************!*\
  !*** ./node_modules/sightglass/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
  // Public sightglass interface.
  function sightglass(obj, keypath, callback, options) {
    return new Observer(obj, keypath, callback, options)
  }

  // Batteries not included.
  sightglass.adapters = {}

  // Constructs a new keypath observer and kicks things off.
  function Observer(obj, keypath, callback, options) {
    this.options = options || {}
    this.options.adapters = this.options.adapters || {}
    this.obj = obj
    this.keypath = keypath
    this.callback = callback
    this.objectPath = []
    this.update = this.update.bind(this)
    this.parse()

    if (isObject(this.target = this.realize())) {
      this.set(true, this.key, this.target, this.callback)
    }
  }

  // Tokenizes the provided keypath string into interface + path tokens for the
  // observer to work with.
  Observer.tokenize = function(keypath, interfaces, root) {
    var tokens = []
    var current = {i: root, path: ''}
    var index, chr

    for (index = 0; index < keypath.length; index++) {
      chr = keypath.charAt(index)

      if (!!~interfaces.indexOf(chr)) {
        tokens.push(current)
        current = {i: chr, path: ''}
      } else {
        current.path += chr
      }
    }

    tokens.push(current)
    return tokens
  }

  // Parses the keypath using the interfaces defined on the view. Sets variables
  // for the tokenized keypath as well as the end key.
  Observer.prototype.parse = function() {
    var interfaces = this.interfaces()
    var root, path

    if (!interfaces.length) {
      error('Must define at least one adapter interface.')
    }

    if (!!~interfaces.indexOf(this.keypath[0])) {
      root = this.keypath[0]
      path = this.keypath.substr(1)
    } else {
      if (typeof (root = this.options.root || sightglass.root) === 'undefined') {
        error('Must define a default root adapter.')
      }

      path = this.keypath
    }

    this.tokens = Observer.tokenize(path, interfaces, root)
    this.key = this.tokens.pop()
  }

  // Realizes the full keypath, attaching observers for every key and correcting
  // old observers to any changed objects in the keypath.
  Observer.prototype.realize = function() {
    var current = this.obj
    var unreached = false
    var prev

    this.tokens.forEach(function(token, index) {
      if (isObject(current)) {
        if (typeof this.objectPath[index] !== 'undefined') {
          if (current !== (prev = this.objectPath[index])) {
            this.set(false, token, prev, this.update)
            this.set(true, token, current, this.update)
            this.objectPath[index] = current
          }
        } else {
          this.set(true, token, current, this.update)
          this.objectPath[index] = current
        }

        current = this.get(token, current)
      } else {
        if (unreached === false) {
          unreached = index
        }

        if (prev = this.objectPath[index]) {
          this.set(false, token, prev, this.update)
        }
      }
    }, this)

    if (unreached !== false) {
      this.objectPath.splice(unreached)
    }

    return current
  }

  // Updates the keypath. This is called when any intermediary key is changed.
  Observer.prototype.update = function() {
    var next, oldValue

    if ((next = this.realize()) !== this.target) {
      if (isObject(this.target)) {
        this.set(false, this.key, this.target, this.callback)
      }

      if (isObject(next)) {
        this.set(true, this.key, next, this.callback)
      }

      oldValue = this.value()
      this.target = next

      // Always call callback if value is a function. If not a function, call callback only if value changed
      if (this.value() instanceof Function || this.value() !== oldValue) this.callback()
    }
  }

  // Reads the current end value of the observed keypath. Returns undefined if
  // the full keypath is unreachable.
  Observer.prototype.value = function() {
    if (isObject(this.target)) {
      return this.get(this.key, this.target)
    }
  }

  // Sets the current end value of the observed keypath. Calling setValue when
  // the full keypath is unreachable is a no-op.
  Observer.prototype.setValue = function(value) {
    if (isObject(this.target)) {
      this.adapter(this.key).set(this.target, this.key.path, value)
    }
  }

  // Gets the provided key on an object.
  Observer.prototype.get = function(key, obj) {
    return this.adapter(key).get(obj, key.path)
  }

  // Observes or unobserves a callback on the object using the provided key.
  Observer.prototype.set = function(active, key, obj, callback) {
    var action = active ? 'observe' : 'unobserve'
    this.adapter(key)[action](obj, key.path, callback)
  }

  // Returns an array of all unique adapter interfaces available.
  Observer.prototype.interfaces = function() {
    var interfaces = Object.keys(this.options.adapters)

    Object.keys(sightglass.adapters).forEach(function(i) {
      if (!~interfaces.indexOf(i)) {
        interfaces.push(i)
      }
    })

    return interfaces
  }

  // Convenience function to grab the adapter for a specific key.
  Observer.prototype.adapter = function(key) {
    return this.options.adapters[key.i] ||
      sightglass.adapters[key.i]
  }

  // Unobserves the entire keypath.
  Observer.prototype.unobserve = function() {
    var obj

    this.tokens.forEach(function(token, index) {
      if (obj = this.objectPath[index]) {
        this.set(false, token, obj, this.update)
      }
    }, this)

    if (isObject(this.target)) {
      this.set(false, this.key, this.target, this.callback)
    }
  }

  // Check if a value is an object than can be observed.
  function isObject(obj) {
    return typeof obj === 'object' && obj !== null
  }

  // Error thrower.
  function error(message) {
    throw new Error('[sightglass] ' + message)
  }

  // Export module for Node and the browser.
  if ( true && module.exports) {
    module.exports = sightglass
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return this.sightglass = sightglass
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
}).call(this);


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/buildin/module.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/resources/scripts/Theme.js":
/*!****************************************!*\
  !*** ./src/resources/scripts/Theme.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Theme; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var evx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! evx */ "./node_modules/evx/dist/evx.es.js");
/* harmony import */ var _components_Video__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Video */ "./src/resources/scripts/components/Video.js");
/* harmony import */ var _components_Slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Slider */ "./src/resources/scripts/components/Slider.js");
/* harmony import */ var _components_SlideToggleGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/SlideToggleGroup */ "./src/resources/scripts/components/SlideToggleGroup.js");
/* harmony import */ var _components_OverlayScrollbars__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/OverlayScrollbars */ "./src/resources/scripts/components/OverlayScrollbars.js");
/* harmony import */ var _components_NewsletterBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/NewsletterBar */ "./src/resources/scripts/components/NewsletterBar.js");
/* harmony import */ var _components_GAevent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/GAevent */ "./src/resources/scripts/components/GAevent.js");
/* harmony import */ var _components_BoldGridItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/BoldGridItem */ "./src/resources/scripts/components/BoldGridItem.js");
/* harmony import */ var _components_Product__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Product */ "./src/resources/scripts/components/Product.js");
/* harmony import */ var _components_SelectSubscription__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/SelectSubscription */ "./src/resources/scripts/components/SelectSubscription.js");
/* harmony import */ var _components_SubscriptionGridItem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/SubscriptionGridItem */ "./src/resources/scripts/components/SubscriptionGridItem.js");
/* harmony import */ var _components_SideCart__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/SideCart */ "./src/resources/scripts/components/SideCart.js");
/* harmony import */ var _components_AddToCart__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/AddToCart */ "./src/resources/scripts/components/AddToCart.js");
/* harmony import */ var _components_ClassChange__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/ClassChange */ "./src/resources/scripts/components/ClassChange.js");
/* harmony import */ var _components_Cart__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/Cart */ "./src/resources/scripts/components/Cart.js");
/* harmony import */ var _components_LockScroll__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/LockScroll */ "./src/resources/scripts/components/LockScroll.js");




function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

















var components = {
  'video': _components_Video__WEBPACK_IMPORTED_MODULE_4__["default"],
  'slider': _components_Slider__WEBPACK_IMPORTED_MODULE_5__["default"],
  'toggle-group': _components_SlideToggleGroup__WEBPACK_IMPORTED_MODULE_6__["default"],
  'overlay-scrollbars': _components_OverlayScrollbars__WEBPACK_IMPORTED_MODULE_7__["default"],
  'newsletter-bar': _components_NewsletterBar__WEBPACK_IMPORTED_MODULE_8__["default"],
  'ga-event': _components_GAevent__WEBPACK_IMPORTED_MODULE_9__["default"],
  'bold-grid-item': _components_BoldGridItem__WEBPACK_IMPORTED_MODULE_10__["default"],
  'product': _components_Product__WEBPACK_IMPORTED_MODULE_11__["default"],
  'select-subscription': _components_SelectSubscription__WEBPACK_IMPORTED_MODULE_12__["default"],
  'subscription-grid-item': _components_SubscriptionGridItem__WEBPACK_IMPORTED_MODULE_13__["default"],
  'side-cart': _components_SideCart__WEBPACK_IMPORTED_MODULE_14__["default"],
  'add-to-cart': _components_AddToCart__WEBPACK_IMPORTED_MODULE_15__["default"],
  'class-change': _components_ClassChange__WEBPACK_IMPORTED_MODULE_16__["default"],
  'cart': _components_Cart__WEBPACK_IMPORTED_MODULE_17__["default"],
  'lock-scroll': _components_LockScroll__WEBPACK_IMPORTED_MODULE_18__["default"]
};
var options = {
  turbolinks: false
};
var state = {
  cartOpen: false
};

var Theme = /*#__PURE__*/function () {
  function Theme() {
    var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state;
    var passedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Theme);

    this._options = _objectSpread(_objectSpread({}, options), passedOptions);
    var themeInfoElem = document.querySelector('[data-theme-information]');

    if (themeInfoElem) {
      ctx = _objectSpread(_objectSpread({}, JSON.parse(themeInfoElem.innerHTML)), ctx);
    }

    this._ctx = Object(evx__WEBPACK_IMPORTED_MODULE_3__["create"])(ctx);
    this._components = [];
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Theme, [{
    key: "mountComponents",
    value: function mountComponents() {
      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      for (var componentKey in components) {
        if (components.hasOwnProperty(componentKey)) {
          var selector = "[data-".concat(componentKey, "]");
          var elements = container.querySelectorAll(selector);

          var _iterator = _createForOfIteratorHelper(elements),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var elem = _step.value;

              var _options = JSON.parse(elem.getAttribute("data-".concat(componentKey)) || '{}');

              var compInstance = new components[componentKey](elem, this, _options, this._ctx);

              this._components.push({
                type: componentKey,
                elem: elem,
                id: compInstance._options.id,
                component: compInstance
              });

              compInstance.mount();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }

      window.__Theme = this;
      window.__ThemeComponents = this._components;
    }
  }, {
    key: "unmountComponents",
    value: function unmountComponents() {
      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      var componentsInContainer = this._components.filter(function (comp) {
        return container.contains(comp.elem);
      });

      var _iterator2 = _createForOfIteratorHelper(componentsInContainer),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var component = _step2.value;

          if (typeof component.unmount === 'function') {
            component.unmount();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this._options;
    }
  }, {
    key: "getComponent",
    value: function getComponent(id) {
      return this._components.filter(function (component) {
        return component.id === id;
      })[0];
    }
  }]);

  return Theme;
}();



/***/ }),

/***/ "./src/resources/scripts/components/AddToCart.js":
/*!*******************************************************!*\
  !*** ./src/resources/scripts/components/AddToCart.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddToCart; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");
/* harmony import */ var _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/AjaxApi */ "./src/resources/scripts/lib/AjaxApi.js");









function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var AddToCart = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AddToCart, _Component);

  var _super = _createSuper(AddToCart);

  function AddToCart(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AddToCart);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._options = _objectSpread(_objectSpread({}, {
      redirect: null,
      addingText: 'Adding...',
      addedText: 'Added to bag!',
      waitFor: 1500
    }), _this._options);
    _this._variantIdElem = _this._elem.querySelector('[name="id"]');
    _this._quantityElem = _this._elem.querySelector('[name="quantity"]');
    _this._propertyElems = _this._elem.querySelectorAll('[name^="properties"]');
    _this._submitElems = _this._elem.nodeName === 'FORM' ? _this._elem.querySelectorAll('[type="submit"]') : [_this._elem];
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(AddToCart, [{
    key: "mount",
    value: function mount() {
      this._addListeners();
    }
  }, {
    key: "_getProperties",
    value: function _getProperties() {
      var properties = {};
      var propElems = Array.from(this._propertyElems).filter(function (elem) {
        return !elem.hasAttribute('disabled') && elem.value.length > 0;
      });

      var _iterator = _createForOfIteratorHelper(propElems),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var elem = _step.value;
          properties[elem.getAttribute('name').match(/^properties\[(.+)\]$/)[1]] = elem.value;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (propElems.length === 0 && this._elem.dataset.properties) {
        properties = JSON.parse(this._elem.dataset.properties);
      }

      return properties;
    }
  }, {
    key: "_addListeners",
    value: function _addListeners() {
      var _this2 = this;

      var event = null;

      if (this._elem.nodeName === 'FORM') {
        event = 'submit';
      } else {
        event = 'click';
      }

      this._event = event;

      this._submitEvent = /*#__PURE__*/function () {
        var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.mark(function _callee(e) {
          var _iterator2, _step2, elem, originalText, variantId, quantity, bsubSellingPlanGroup, sellingPlan, data, _data, _iterator3, _step3, _loop;

          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e.preventDefault();
                  _iterator2 = _createForOfIteratorHelper(_this2._submitElems);

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      elem = _step2.value;
                      originalText = elem.innerHTML;
                      elem.setAttribute('min-width', getComputedStyle(elem).minWidth);
                      elem.style.minWidth = "".concat(elem.clientWidth, "px");
                      elem.setAttribute('original-text', originalText);
                      elem.classList.add('adding');
                      elem.innerHTML = _this2._options.addingText;
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }

                  variantId = _this2._variantIdElem ? _this2._variantIdElem.value : _this2._elem.dataset.variantId;
                  quantity = _this2._quantityElem ? Number(_this2._quantityElem.value) : Number(_this2._elem.dataset.quantity);
                  bsubSellingPlanGroup = _this2._elem.dataset.bsubSellingPlanGroup;
                  sellingPlan = _this2._elem.dataset.sellingPlan;

                  if (!(bsubSellingPlanGroup && sellingPlan)) {
                    _context.next = 15;
                    break;
                  }

                  _context.next = 10;
                  return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_9__["default"].addToCart({
                    id: variantId,
                    quantity: quantity,
                    properties: _this2._getProperties(),
                    "bsub-selling-plan-group": bsubSellingPlanGroup,
                    "selling_plan": sellingPlan
                  });

                case 10:
                  data = _context.sent;
                  console.log("EMITE 2");

                  _this2._ctx.emit('cart-item-added', {
                    lastItemAdded: {
                      item: data,
                      quantity: quantity,
                      properties: _this2._getProperties(),
                      "bsub-selling-plan-group": bsubSellingPlanGroup,
                      "selling_plan": sellingPlan
                    }
                  });

                  _context.next = 20;
                  break;

                case 15:
                  _context.next = 17;
                  return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_9__["default"].addToCart({
                    id: variantId,
                    quantity: quantity,
                    properties: _this2._getProperties()
                  });

                case 17:
                  _data = _context.sent;
                  console.log("EMITE 1");

                  _this2._ctx.emit('cart-item-added', {
                    lastItemAdded: {
                      item: _data,
                      quantity: quantity,
                      properties: _this2._getProperties()
                    }
                  });

                case 20:
                  _this2._ctx.emit('show-side-cart');

                  _iterator3 = _createForOfIteratorHelper(_this2._submitElems);

                  try {
                    _loop = function _loop() {
                      var elem = _step3.value;
                      elem.classList.remove('adding');
                      document.querySelector("#cart-icon-bubble").click();
                      elem.innerHTML = _this2._options.addedText;
                      setTimeout(function () {
                        elem.innerHTML = elem.getAttribute('original-text');
                        elem.style.minWidth = elem.getAttribute('min-width');
                      }, _this2._options.waitFor);
                    };

                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      _loop();
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }

                  if (_this2._options.redirect) {
                    window.location = _this2._options.redirect;
                  }

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();

      this._elem.addEventListener(event, this._submitEvent);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      this._elem.removeEventListener(this._event, this._submitEvent);
    }
  }]);

  return AddToCart;
}(_Component__WEBPACK_IMPORTED_MODULE_8__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/BoldGridItem.js":
/*!**********************************************************!*\
  !*** ./src/resources/scripts/components/BoldGridItem.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoldGridItem; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var BoldGridItem = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(BoldGridItem, _Component);

  var _super = _createSuper(BoldGridItem);

  function BoldGridItem(elem, theme, options, ctx) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, BoldGridItem);

    return _super.call(this, elem, theme, options, ctx);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BoldGridItem, [{
    key: "mount",
    value: function mount() {
      var that = this;
      var waitForBoldWidget = setInterval(function () {
        if (window.BOLD.BsubWidget) {
          clearInterval(waitForBoldWidget);

          that._buildBoldItemFunction();
        }
      }, 150);
    }
  }, {
    key: "_buildBoldItemFunction",
    value: function _buildBoldItemFunction() {
      var BoldProducts = window.BOLD.BsubWidget.products;
      var BoldProduct;

      for (var prod in BoldProducts) {
        if (prod == this._options.product_id) {
          BoldProduct = BoldProducts[prod];
          break;
        }
      }

      if (!BoldProduct) {
        if (this._elem.querySelector('.input-buttons')) this._elem.querySelector('.input-buttons').classList.add('hide');
        if (this._elem.querySelector('.grid-product__price')) this._elem.querySelector('.grid-product__price').classList.remove('hide');
        if (this._elem.querySelector('.grid-product__price-orgnl')) this._elem.querySelector('.grid-product__price-orgnl').classList.remove('hidden');
        return;
      }

      var firstSubscriptionVariant = BoldProduct.variants[0].selling_plan_allocations[0];
      var price_orig = firstSubscriptionVariant.compare_at_price;
      var price_subscr = firstSubscriptionVariant.price;
      var selling_plan_id = firstSubscriptionVariant.selling_plan_id;
      var selling_plans = BoldProduct.selling_plan_groups[0].selling_plans;
      var selling_plan_title;

      for (var plan in selling_plans) {
        var selling_plan_group = firstSubscriptionVariant.selling_plan_id;

        if (selling_plans[plan].id == selling_plan_id) {
          selling_plan_title = selling_plans[plan].name.replace(/[0-9]/g, '').replace(' ', '');
        }

        if (selling_plans[plan].name == '4 weeks') {
          this._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = BoldProduct.selling_plan_groups[0].id;
          this._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = selling_plans[plan].id;
        }
      } // this._elem.querySelector('[data-discount-tag]').innerHTML = 'save ' + (100 - ((price_subscr/price_orig) * 100)) + '%'


      this._elem.querySelector('.grid-product__price').classList.remove('hide');

      this._elem.querySelector('[data-subscr-price]').innerHTML = theme.Currency.formatMoney(price_subscr, '<span class=money>${{amount}} CAD</span>');
      this._elem.querySelector('[data-subscr-price-original]').innerHTML = theme.Currency.formatMoney(price_orig, '<span class=money>${{amount_no_decimals}} CAD</span>');
      this._elem.querySelector('[data-subscr-price-plan]').innerHTML = selling_plan_title;

      this._elem.querySelector('[data-bsub-selling-plan-group] .bsub-widget__group-label').click();
    }
  }]);

  return BoldGridItem;
}(_Component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/Cart.js":
/*!**************************************************!*\
  !*** ./src/resources/scripts/components/Cart.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");
/* harmony import */ var rivets__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rivets */ "./node_modules/rivets/dist/rivets.js");
/* harmony import */ var rivets__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(rivets__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js");
/* harmony import */ var _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/AjaxApi */ "./src/resources/scripts/lib/AjaxApi.js");










function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var Cart = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Cart, _Component);

  var _super = _createSuper(Cart);

  function Cart(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, Cart);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._data = {
      cart: {},
      upsellLoading: true
    };
    _this._upsellAdded = false;
    _this._upsellHandles = [];
    _this._upsellType = "";
    _this._upsellProducts;
    _this._upsellOptions = document.querySelector('[data-upsell-options]') ? JSON.parse(document.querySelector('[data-upsell-options]').innerHTML) : {
      enabled: false,
      limit: 5
    };
    _this._shippingThresholdOptions = document.querySelector('[data-shipping-threshold-options]') ? JSON.parse(document.querySelector('[data-shipping-threshold-options]').innerHTML) : {
      enabled: false
    };
    _this._renderAreas = document.querySelectorAll('[data-cart-mount]');
    _this._jquery = window.$ || null;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(Cart, [{
    key: "_binders",
    value: function _binders() {
      var _this2 = this;

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.binders['style-*'] = function (el, value) {
        el.style.setProperty(this.args[0], value);
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.getSizedImage = function (src, size) {
        return src ? _lib_Helpers__WEBPACK_IMPORTED_MODULE_11__["default"].getSizedImageUrl(src, size) : '';
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.money = function (value) {
        return _lib_Helpers__WEBPACK_IMPORTED_MODULE_11__["default"].formatMoney(value, _this2._ctx.getState().moneyFormat);
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.length = function (arr) {
        return arr ? arr.length : 0;
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.eq = function (val, val2) {
        return val === val2;
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.gt = function (val, val2) {
        return val > val2;
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.getUrl = function (handle) {
        return "/products/".concat(handle);
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.getImage = function (product, variant) {
        return product.currentVariant.featured_image ? product.currentVariant.featured_image.src : product.featured_image;
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.getProps = function (item) {
        var props = [];

        for (var key in item.properties) {
          var name = key.charAt(0).toUpperCase() + key.slice(1);

          if (key.charAt(0) != '_') {
            props.push({
              name: name,
              value: item.properties[key]
            });
          }
        }

        return props;
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.hasVariants = function (item) {
        return item.variants && item.variants[0].title !== 'Default Title';
      };


      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.formatters.productAccentColor = function (item) {
        var productTitle = item.title;
        var productColor = 'coconut';

        if (productTitle.includes('almond') || productTitle.includes('Almond')) {
          productColor = 'almond';
        } else if (productTitle.includes('coconut') || productTitle.includes('Coconut')) {
          productColor = 'coconut';
        } else if (productTitle.includes('hazelnut') || productTitle.includes('Hazelnut')) {
          productColor = 'hazelnut';
        } else if (productTitle.includes('pistachio') || productTitle.includes('Pistachio')) {
          productColor = 'pistachio';
        }

        var classToAdd = 'color--' + productColor;
        return classToAdd;
      };

      rivets__WEBPACK_IMPORTED_MODULE_10___default.a.binders.addClass = function (el, value) {
        if (el.addedClass) {
          $(el).removeClass(el.addedClass);
          delete el.addedClass;
        }

        if (value) {
          $(el).addClass(value);
          el.addedClass = value;
        }
      };
    }
  }, {
    key: "mount",
    value: function () {
      var _mount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee2() {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.prepareData(JSON.parse(this._elem.innerHTML));

              case 2:
                this._data.cart = _context2.sent;
                console.log(this._data.cart);

                if (this._upsellOptions.enabled) {
                  this._prepareUpsellData();
                }

                this._data.cartBackup = _objectSpread({}, this._data.cart);

                this._ctx.on('cart-item-added', /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee() {
                  var _iterator, _step, area;

                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _this3._data.cart.loading = true;
                          _context.next = 3;
                          return _this3._refresh();

                        case 3:
                          _iterator = _createForOfIteratorHelper(_this3._renderAreas);

                          try {
                            for (_iterator.s(); !(_step = _iterator.n()).done;) {
                              area = _step.value;
                              area.classList.add('shown');
                            }
                          } catch (err) {
                            _iterator.e(err);
                          } finally {
                            _iterator.f();
                          }

                          _this3._ctx.emit('cart-item-added--refreshed');

                          if (_this3._upsellAdded) {
                            _this3._ctx.emit('upsell-item-added--refreshed');

                            _this3._upsellAdded = false;
                          } // this._subscriptionSelectFunction()


                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

                if (document.getElementById('CartSpecialInstructions')) this._addCartNote();

                this._binders();

                this._render();

                this._subscriptionSelectFunction();

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function mount() {
        return _mount.apply(this, arguments);
      }

      return mount;
    }()
  }, {
    key: "_subscriptionSelectFunction",
    value: function _subscriptionSelectFunction() {
      document.addEventListener('click', function (e) {
        var subscriptionSelects = document.querySelectorAll('.subscription-select');

        var _iterator2 = _createForOfIteratorHelper(subscriptionSelects),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var select = _step2.value;
            if (select != e.target.parentElement.querySelector('.subscription-select')) select.classList.remove('open');
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (e.target.parentElement.classList.contains('subscription-select-trigger')) {
          e.target.parentElement.querySelector('.subscription-select').classList.toggle('open');
        }
      });
    } // Add Cart Note when checkout Pressed

  }, {
    key: "_addCartNote",
    value: function _addCartNote() {
      var checkoutBtn = document.getElementById('btn--checkout');
      checkoutBtn.addEventListener('click', /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee3() {
        var cart, cartNote;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].getCart();

              case 2:
                cart = _context3.sent;
                cartNote = document.getElementById('CartSpecialInstructions');
                cart.note = cartNote.value;
                _context3.prev = 5;
                _context3.next = 8;
                return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].updateCart(cart);

              case 8:
                cart.loading = false;
                _context3.next = 15;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](5);
                cart.loading = false;
                this._data.errorMessage = "Some error occured. Please reload the page";

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 11]]);
      })));
    }
  }, {
    key: "prepareData",
    value: function () {
      var _prepareData = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee5(data) {
        var _this4 = this;

        var promises, _iterator3, _step3, _loop;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (typeof window.BOLD !== 'undefined' && typeof window.BOLD.common !== 'undefined' && typeof window.BOLD.common.cartDoctor !== 'undefined') {
                  data = window.BOLD.common.cartDoctor.fix(data);
                }

                this._upsellHandles = [];
                promises = [];
                _iterator3 = _createForOfIteratorHelper(data.items.entries());

                try {
                  _loop = function _loop() {
                    var _step3$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step3.value, 2),
                        i = _step3$value[0],
                        item = _step3$value[1];

                    promises.push(new Promise( /*#__PURE__*/function () {
                      var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee4(res, rej) {
                        var data, upsellSplit, _iterator4, _step4, handle, result, _iterator5, _step5, option;

                        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                item.index = i + 1;
                                _context4.next = 3;
                                return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].getCustomProduct(item.handle);

                              case 3:
                                data = _context4.sent;
                                console.log(data);
                                item.product = data.product;
                                item.product.metafields = data.upsells;
                                item.product.options = data.options;
                                console.log(item.product.metafields);

                                if (item.product.metafields) {
                                  console.log(item.product.metafields);
                                  upsellSplit = item.product.metafields.split('|');
                                  _iterator4 = _createForOfIteratorHelper(upsellSplit);

                                  try {
                                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                                      handle = _step4.value;
                                      result = {
                                        handle: handle
                                      };

                                      if (handle.includes("|")) {
                                        result.handle = handle.split("|")[0];
                                        result.variantId = handle.split("|")[1];
                                      }

                                      if (item.options_with_values.length) {
                                        result.preferredOptions = item.options_with_values.map(function (option) {
                                          return option.value;
                                        });
                                      }

                                      if (item.options_with_values.length) {
                                        result.preferredOption1 = item.options_with_values[0].value;
                                      }

                                      _this4._upsellHandles.push(result);
                                    }
                                  } catch (err) {
                                    _iterator4.e(err);
                                  } finally {
                                    _iterator4.f();
                                  }
                                }

                                _iterator5 = _createForOfIteratorHelper(item.product.options);

                                try {
                                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                                    option = _step5.value;
                                    option.selectedValue = item.variant_options[option.position - 1];
                                  }
                                } catch (err) {
                                  _iterator5.e(err);
                                } finally {
                                  _iterator5.f();
                                }

                                item.originalItem = _objectSpread({}, item);
                                res();

                              case 14:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, _callee4);
                      }));

                      return function (_x2, _x3) {
                        return _ref3.apply(this, arguments);
                      };
                    }()));
                  };

                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                _context5.next = 7;
                return Promise.all(promises);

              case 7:
                data.loading = false; // Remove duplicates

                this._upsellHandles = this._upsellHandles.filter(function (item, index) {
                  var otherIndex = _this4._upsellHandles.map(function (item) {
                    return item.handle;
                  }).indexOf(item.handle);

                  return otherIndex === index;
                }); // Remove already in cart

                this._upsellHandles = this._upsellHandles.filter(function (obj) {
                  if (obj.variantId) {
                    return !data.items.some(function (item) {
                      return obj.variant_id === item.variant_id;
                    });
                  } else {
                    return !data.items.some(function (item) {
                      return obj.handle === item.handle;
                    });
                  }
                });

                if (this._upsellOptions.limit > 0) {
                  this._upsellHandles = this._upsellHandles.slice(0, this._upsellOptions.limit);
                }

                data.hasUpsell = this._upsellHandles.length > 0 && this._upsellOptions.enabled && this._upsellOptions.limit > 0;
                return _context5.abrupt("return", data);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function prepareData(_x) {
        return _prepareData.apply(this, arguments);
      }

      return prepareData;
    }()
  }, {
    key: "_prepareUpsellData",
    value: function () {
      var _prepareUpsellData2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee7() {
        var _this5 = this;

        var results, promises, _iterator6, _step6, _loop2;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this._upsellOptions.enabled) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", false);

              case 2:
                this._data.upsellLoading = true;
                results = [];
                promises = [];
                _iterator6 = _createForOfIteratorHelper(this._upsellHandles);

                try {
                  _loop2 = function _loop2() {
                    var handleObj = _step6.value;
                    promises.push(new Promise( /*#__PURE__*/function () {
                      var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee6(res, rej) {
                        var handle, data, item, _iterator7, _step7, option;

                        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee6$(_context6) {
                          while (1) {
                            switch (_context6.prev = _context6.next) {
                              case 0:
                                _context6.prev = 0;
                                handle = handleObj.handle;
                                _context6.next = 4;
                                return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].getCustomProduct(handle);

                              case 4:
                                data = _context6.sent;
                                item = data.product;
                                item.metafields = data.metafields;
                                item.options = data.options;

                                if (handleObj.variantId) {
                                  item.currentVariant = item.variants.find(function (variant) {
                                    return Number(variant.id) == Number(handleObj.variantId);
                                  });
                                }

                                if (handleObj.preferredOptions) {
                                  item.currentVariant = item.variants.find(function (variant) {
                                    return variant.options.every(function (option) {
                                      return handleObj.preferredOptions.includes(option);
                                    });
                                  });

                                  if (!item.currentVariant) {
                                    item.currentVariant = item.variants.find(function (variant) {
                                      return variant.options.some(function (option) {
                                        return handleObj.preferredOptions.includes(option);
                                      });
                                    });
                                  }
                                }

                                if (!item.currentVariant || !item.currentVariant.available) {
                                  item.currentVariant = item.variants.find(function (variant) {
                                    return variant.available;
                                  });
                                }

                                item.quantity = 1;

                                if (item.currentVariant) {
                                  _iterator7 = _createForOfIteratorHelper(item.options);

                                  try {
                                    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                                      option = _step7.value;
                                      option.selectedValue = item.currentVariant.options[option.position - 1];
                                    }
                                  } catch (err) {
                                    _iterator7.e(err);
                                  } finally {
                                    _iterator7.f();
                                  }
                                }

                                if (item.available) {
                                  results.push(item);
                                }

                                res();
                                _context6.next = 21;
                                break;

                              case 17:
                                _context6.prev = 17;
                                _context6.t0 = _context6["catch"](0);
                                console.log(_context6.t0);
                                rej();

                              case 21:
                              case "end":
                                return _context6.stop();
                            }
                          }
                        }, _callee6, null, [[0, 17]]);
                      }));

                      return function (_x4, _x5) {
                        return _ref4.apply(this, arguments);
                      };
                    }()));
                  };

                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    _loop2();
                  }
                } catch (err) {
                  _iterator6.e(err);
                } finally {
                  _iterator6.f();
                }

                _context7.next = 9;
                return Promise.all(promises);

              case 9:
                results = results.sort(function (a, b) {
                  var indexA = _this5._upsellHandles.map(function (item) {
                    return item.handle;
                  }).indexOf(a.handle);

                  var indexB = _this5._upsellHandles.map(function (item) {
                    return item.handle;
                  }).indexOf(b.handle);

                  return indexA - indexB;
                });
                results = results.slice(0, 2);
                this._data.cart.hasUpsell = results.length > 0;
                this._data.cart.upsellProducts = results;
                this._data.upsellLoading = false;

                if (results.length > 0) {
                  this._upsellType = results[0].type;
                }

                this._setUpsellDropdowns();

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _prepareUpsellData() {
        return _prepareUpsellData2.apply(this, arguments);
      }

      return _prepareUpsellData;
    }()
  }, {
    key: "_setUpsellDropdowns",
    value: function _setUpsellDropdowns() {
      var selectedValues = document.querySelectorAll('[selected-value]');
      var upsellOptions = document.querySelectorAll('.upsellOption');
      var nextSibling, prevSibling; // close siblings dropdowns

      selectedValues.forEach(function (element) {
        element.innerHTML = element.attributes['selected-value'].value;
        element.addEventListener('click', function (e) {
          prevSibling = document.querySelector('.optionLabel[data-id="' + element.attributes['data-id'].value + '"][name="' + element.attributes['name'].value + '"]');
          nextSibling = element.nextSibling.nextSibling;
          nextSibling.classList.toggle('hide');

          for (var i = 0; i < selectedValues.length; i++) {
            var el = selectedValues[i].nextSibling.nextSibling;

            if (el !== nextSibling) {
              el.classList.add('hide');
            }
          }

          var dropdown = element.nextElementSibling;
          dropdown.classList.contains('hide') ? dropdown.classList.remove('hide') : '';
        });
      }); //close when clicked outside

      document.addEventListener('click', function (event) {
        if (!event.target.classList.contains('selectedValue')) {
          for (var i = 0; i < selectedValues.length; i++) {
            var el = selectedValues[i].nextSibling.nextSibling;
            el.classList.add('hide');
          }
        }
      }); //set select option on hidden field to change product variant upsell

      upsellOptions.forEach(function (element) {
        element.addEventListener('click', function () {
          var el = document.querySelector('select[name="' + element.getAttribute('name') + '"][data-id="' + element.getAttribute('data-id') + '"]');
          el.value = element.getAttribute('data-color-size-value');
          var e = new Event("change");
          el.dispatchEvent(e);
        });
      });
    }
  }, {
    key: "_render",
    value: function _render() {
      var _iterator8 = _createForOfIteratorHelper(this._renderAreas),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var cartSection = _step8.value;
          rivets__WEBPACK_IMPORTED_MODULE_10___default.a.bind(cartSection, this._getModel(cartSection));
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      this._data.cart.loading = false;

      var _iterator9 = _createForOfIteratorHelper(this._renderAreas),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var _cartSection = _step9.value;

          _cartSection.classList.add('rendered');
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: "_getModel",
    value: function _getModel(cartSection) {
      var _this6 = this;

      return {
        data: this._data,
        controller: {
          removeItem: function () {
            var _removeItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee8(e, model) {
              var item;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      e.preventDefault();
                      model.data.cart.loading = true;
                      item = model.item;
                      _context8.next = 5;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].removeCartItem(item.index);

                    case 5:
                      _this6._refresh();

                    case 6:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            }));

            function removeItem(_x6, _x7) {
              return _removeItem.apply(this, arguments);
            }

            return removeItem;
          }(),
          updateQuantity: function () {
            var _updateQuantity = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee9(e, model) {
              var newQuantity;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      e.preventDefault();

                      if (!(model.item.quantity.length && isNaN(parseInt(model.item.quantity)))) {
                        _context9.next = 4;
                        break;
                      }

                      model.item.quantity = 1;
                      return _context9.abrupt("return", false);

                    case 4:
                      if (!model.item.quantity.length) {
                        _context9.next = 19;
                        break;
                      }

                      model.data.cart.loading = true;
                      newQuantity = model.item.quantity;
                      console.log('GA: Quantity Selector - Cart');
                      ga('send', 'event', 'Quantity Selector - Cart', 'Interacted', 'Cart');
                      _context9.prev = 9;
                      _context9.next = 12;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].updateCartItem(model.item.index, newQuantity, {});

                    case 12:
                      _this6._refresh();

                      _context9.next = 19;
                      break;

                    case 15:
                      _context9.prev = 15;
                      _context9.t0 = _context9["catch"](9);
                      model.data.cart.loading = false;
                      _this6._data.errorMessage = "All ".concat(model.item.title, " are currently in your cart");

                    case 19:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, null, [[9, 15]]);
            }));

            function updateQuantity(_x8, _x9) {
              return _updateQuantity.apply(this, arguments);
            }

            return updateQuantity;
          }(),
          incrementQuantity: function () {
            var _incrementQuantity = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee10(e, model) {
              var newQuantity;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      e.preventDefault();
                      model.data.cart.loading = true;
                      newQuantity = model.item.quantity + 1;
                      console.log('GA: Quantity Selector - Cart');
                      ga('send', 'event', 'Quantity Selector - Cart', 'Interacted', 'Cart');
                      _context10.prev = 5;
                      _context10.next = 8;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].updateCartItem(model.item.index, newQuantity, {});

                    case 8:
                      _this6._refresh();

                      _context10.next = 15;
                      break;

                    case 11:
                      _context10.prev = 11;
                      _context10.t0 = _context10["catch"](5);
                      model.data.cart.loading = false;
                      _this6._data.errorMessage = "All ".concat(model.item.title, " are currently in your cart");

                    case 15:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, _callee10, null, [[5, 11]]);
            }));

            function incrementQuantity(_x10, _x11) {
              return _incrementQuantity.apply(this, arguments);
            }

            return incrementQuantity;
          }(),
          decrementQuantity: function () {
            var _decrementQuantity = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee11(e, model) {
              var newQuantity;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      e.preventDefault();
                      model.data.cart.loading = true;
                      newQuantity = model.item.quantity - 1;
                      _context11.prev = 3;
                      _context11.next = 6;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].updateCartItem(model.item.index, newQuantity, {});

                    case 6:
                      _this6._refresh();

                      _context11.next = 13;
                      break;

                    case 9:
                      _context11.prev = 9;
                      _context11.t0 = _context11["catch"](3);
                      model.data.cart.loading = false;
                      _this6._data.errorMessage = "All ".concat(model.item.title, " are currently in your cart");

                    case 13:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11, null, [[3, 9]]);
            }));

            function decrementQuantity(_x12, _x13) {
              return _decrementQuantity.apply(this, arguments);
            }

            return decrementQuantity;
          }(),
          updateVariant: function () {
            var _updateVariant = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee12(e, model) {
              var item, product, selectedOptions, theVariant, oos, properties, data;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      e.preventDefault();
                      model.data.cart.loading = true;
                      item = model.item;
                      product = item.product;
                      selectedOptions = product.options.map(function (x) {
                        return x.selectedValue;
                      });
                      theVariant = _this6._getVariant(selectedOptions, item.product.variants);
                      oos = theVariant.inventory_quantity <= 0 && theVariant.inventory_policy === 'deny';

                      if (!oos) {
                        _context12.next = 11;
                        break;
                      }

                      _this6._data.errorMessage = "We're sorry, ".concat(theVariant.title, " is currently out of stock.");

                      _this6._refresh();

                      return _context12.abrupt("return", false);

                    case 11:
                      properties = {};

                      if (!(theVariant.id !== item.variant_id)) {
                        _context12.next = 21;
                        break;
                      }

                      _context12.next = 15;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].removeCartItem(item.index);

                    case 15:
                      _context12.next = 17;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].addToCart({
                        id: "".concat(theVariant.id),
                        quantity: item.quantity,
                        properties: properties
                      });

                    case 17:
                      data = _context12.sent;

                      _this6._ctx.emit('cart-item-added', {
                        lastItemAdded: {
                          item: data,
                          quantity: item.quantity,
                          properties: properties
                        }
                      });

                      _context12.next = 23;
                      break;

                    case 21:
                      _context12.next = 23;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].updateCartItem(item.index, item.quantity);

                    case 23:
                      _this6._refresh();

                    case 24:
                    case "end":
                      return _context12.stop();
                  }
                }
              }, _callee12);
            }));

            function updateVariant(_x14, _x15) {
              return _updateVariant.apply(this, arguments);
            }

            return updateVariant;
          }(),
          clearError: function clearError(e, model) {
            e.preventDefault();
            model.data.errorMessage = null;
          },
          changeUpsellOption: function changeUpsellOption(e, model) {
            e.preventDefault();
            var product = model.item;
            var selectedValues = document.querySelectorAll('.selectedValue');
            product.currentVariant = product.variants.find(function (variant) {
              return variant.options.every(function (optionValue, index) {
                return optionValue === product.options[index].selectedValue;
              });
            });
            var oos = product.currentVariant.inventory_quantity <= 0 && product.currentVariant.inventory_policy === 'deny';

            if (oos) {
              _this6._data.errorMessage = "We're sorry, ".concat(product.currentVariant.title, " is currently out of stock.");
              product.currentVariant = product.variants.find(function (variant) {
                return variant.available;
              });

              var _iterator10 = _createForOfIteratorHelper(product.options),
                  _step10;

              try {
                for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                  var option = _step10.value;
                  option.selectedValue = product.currentVariant.options[option.position - 1];
                }
              } catch (err) {
                _iterator10.e(err);
              } finally {
                _iterator10.f();
              }

              selectedValues.forEach(function (element) {
                if (element.getAttribute('data-id') == product.id && element.getAttribute('name') === 'Color') {
                  element.setAttribute('selected-value', product.currentVariant.option2);
                  element.innerHTML = product.currentVariant.option2;
                }
              });
            }

            model.item.price = product.currentVariant.price;
          },
          changeUpsellColor: function changeUpsellColor(e, model) {
            e.preventDefault();
            var product = model.item;
            var handle = model.color.handle;
            _this6._upsellHandles = _this6._upsellHandles.map(function (item) {
              return item.handle === product.handle ? {
                handle: handle
              } : item;
            });
            console.log(_this6._upsellHandles);
            _this6._data.upsellLoading = true;

            _this6._prepareUpsellData();
          },
          addUpsellItem: function () {
            var _addUpsellItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee13(e, model) {
              var product, variant, properties, data;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      e.preventDefault();
                      product = model.item;
                      variant = product.currentVariant;
                      model.data.cart.loading = true;
                      _this6._upsellAdded = true;
                      properties = {};
                      _context13.next = 8;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].addToCart({
                        id: "".concat(variant.id),
                        quantity: product.quantity,
                        properties: properties
                      });

                    case 8:
                      data = _context13.sent;

                      _this6._ctx.emit('cart-item-added', {
                        lastItemAdded: {
                          item: data,
                          quantity: product.quantity,
                          properties: properties
                        }
                      });

                      if (ga) {
                        console.log('+++');
                        ga('create', 'UA-49483307-1', 'auto', 'tracker');
                        ga('tracker.send', 'event', {
                          eventCategory: 'Cart Upsell (TEST)',
                          eventAction: 'Added to Cart',
                          eventLabel: 'Side Cart'
                        });
                      }

                    case 11:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, _callee13);
            }));

            function addUpsellItem(_x16, _x17) {
              return _addUpsellItem.apply(this, arguments);
            }

            return addUpsellItem;
          }(),
          incrementUpsellQuantity: function incrementUpsellQuantity(e, model) {
            e.preventDefault();
            model.item.quantity++;
          },
          decrementUpsellQuantity: function decrementUpsellQuantity(e, model) {
            e.preventDefault();

            if (model.item.quantity > 1) {
              model.item.quantity--;
            }
          },
          updateSubscription: function () {
            var _updateSubscription = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee14(e, model) {
              var newPlanIndex, newPlan, item_id, item_quantity, item_properties, data;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      e.preventDefault();
                      _this6._data.cart.loading = true;
                      newPlanIndex = model['%plan%'];
                      newPlan = model.item.product.selling_plan_groups[0].selling_plans[newPlanIndex];
                      _context14.prev = 4;
                      item_id = model.item.id;
                      item_quantity = model.item.quantity;
                      item_properties = model.item.properties;
                      _context14.next = 10;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].removeCartItem(model.item.index);

                    case 10:
                      _context14.next = 12;
                      return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].addToCart({
                        id: item_id,
                        quantity: item_quantity,
                        properties: item_properties,
                        "selling_plan": newPlan.id
                      });

                    case 12:
                      data = _context14.sent;

                      _this6._refresh();

                      _context14.next = 19;
                      break;

                    case 16:
                      _context14.prev = 16;
                      _context14.t0 = _context14["catch"](4);
                      model.data.cart.loading = false;

                    case 19:
                    case "end":
                      return _context14.stop();
                  }
                }
              }, _callee14, null, [[4, 16]]);
            }));

            function updateSubscription(_x18, _x19) {
              return _updateSubscription.apply(this, arguments);
            }

            return updateSubscription;
          }()
        }
      };
    }
  }, {
    key: "_refresh",
    value: function () {
      var _refresh2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.mark(function _callee15() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.t0 = this;
                _context15.next = 3;
                return _lib_AjaxApi__WEBPACK_IMPORTED_MODULE_12__["default"].getCart();

              case 3:
                _context15.t1 = _context15.sent;
                _context15.next = 6;
                return _context15.t0.prepareData.call(_context15.t0, _context15.t1);

              case 6:
                this._data.cart = _context15.sent;

                if (this._upsellOptions.enabled) {
                  this._prepareUpsellData();
                }

                this._data.cartBackup = _objectSpread({}, this._data.cart);

                if (window.Shopify && Shopify.StorefrontExpressButtons) {
                  Shopify.StorefrontExpressButtons.initialize();
                }

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function _refresh() {
        theme.shipBar.update();
        return _refresh2.apply(this, arguments);
      }
     
      return _refresh;
    }()
  }, {
    key: "_getVariant",
    value: function _getVariant(selectedOptions, variants) {
      var theVariant = false;

      var _iterator11 = _createForOfIteratorHelper(variants),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var variant = _step11.value;
          var foundVariant = variant;

          var _iterator12 = _createForOfIteratorHelper(selectedOptions.entries()),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var _step12$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step12.value, 2),
                  index = _step12$value[0],
                  option = _step12$value[1];

              if (variant["option".concat(index + 1)] !== option) {
                foundVariant = false;
              }
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }

          if (foundVariant) {
            theVariant = foundVariant;
            break;
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      return theVariant;
    }
  }]);

  return Cart;
}(_Component__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Cart);

/***/ }),

/***/ "./src/resources/scripts/components/ClassChange.js":
/*!*********************************************************!*\
  !*** ./src/resources/scripts/components/ClassChange.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClassChange; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");






function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var ClassChange = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(ClassChange, _Component);

  var _super = _createSuper(ClassChange);

  function ClassChange(elem, theme, options, ctx) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ClassChange);

    return _super.call(this, elem, theme, options, ctx);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ClassChange, [{
    key: "mount",
    value: function mount() {
      if (this._options.length) {
        var _iterator = _createForOfIteratorHelper(this._options),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var option = _step.value;

            this._optionLogic(option);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        this._optionLogic(this._options);
      }
    }
  }, {
    key: "_optionLogic",
    value: function _optionLogic(option) {
      var _this = this;

      if (!option.on) {
        option.on = 'click';
      }

      if (option.whenOutside) {
        document.addEventListener(option.on, function (e) {
          var clickIsInside = _this._elem.contains(e.target) || _this._elem === e.target;
          var toExclude = document.querySelectorAll(option.whenOutsideExcept);
          var hasClickedExclude = Array.from(toExclude).some(function (elem) {
            return elem.contains(e.target) || elem === e.target;
          });
          if (clickIsInside || hasClickedExclude) return false;

          _this._eventLogic(option, e);
        }, option.preventDefault ? {
          passive: false
        } : {
          passive: true
        });
      } else {
        this._elem.addEventListener(option.on, function (e) {
          _this._eventLogic(option, e);
        }, option.preventDefault ? {
          passive: false
        } : {
          passive: true
        });
      }
    }
  }, {
    key: "_eventLogic",
    value: function _eventLogic(option, e) {
      if (option.onlyThisElem && e.target !== this._elem) {
        return false;
      }

      if (option.preventDefault) {
        e.preventDefault();
      }

      if (option.target.includes('closest:')) {
        var parentSelector = option.target.split('closest:')[1].trim();

        if (option.subTarget) {
          this._elem.closest(parentSelector).querySelector(option.subTarget).classList[option.method](option["class"]);
        } else {
          this._elem.closest(parentSelector).classList[option.method](option["class"]);
        }
      } else if (option.target === 'this') {
        this._elem.classList[option.method](option["class"]);
      } else {
        var targets = document.querySelectorAll(option.target);

        var _iterator2 = _createForOfIteratorHelper(targets),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var target = _step2.value;
            target.classList[option.method](option["class"]);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }]);

  return ClassChange;
}(_Component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/Component.js":
/*!*******************************************************!*\
  !*** ./src/resources/scripts/components/Component.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);



var Component = /*#__PURE__*/_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(function Component(elem, theme, options, ctx) {
  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Component);

  this._theme = theme;
  this._elem = elem;
  this._ctx = ctx;
  this._options = options;
});



/***/ }),

/***/ "./src/resources/scripts/components/GAevent.js":
/*!*****************************************************!*\
  !*** ./src/resources/scripts/components/GAevent.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GAevent; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var GAevent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(GAevent, _Component);

  var _super = _createSuper(GAevent);

  function GAevent(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, GAevent);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._options = _objectSpread(_objectSpread({}, {
      event: 'click',
      eventAction: 'click'
    }), _this._options);
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(GAevent, [{
    key: "mount",
    value: function mount() {
      var _this2 = this;

      this._elem.addEventListener(this._options.event, function (e) {
        console.log('GA: ' + _this2._options.eventCategory + ' - ' + _this2._options.eventLabel);

        if (ga) {
          console.log('+++');
          ga('create', 'UA-49483307-1', 'auto', 'tracker');
          ga('tracker.send', 'event', {
            eventCategory: _this2._options.eventCategory,
            eventAction: _this2._options.eventAction,
            eventLabel: _this2._options.eventLabel
          });
        }
      });
    }
  }]);

  return GAevent;
}(_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/LockScroll.js":
/*!********************************************************!*\
  !*** ./src/resources/scripts/components/LockScroll.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LockScroll; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");








function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var LockScroll = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(LockScroll, _Component);

  var _super = _createSuper(LockScroll);

  function LockScroll(elem, theme, options, ctx) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, LockScroll);

    return _super.call(this, elem, theme, options, ctx);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(LockScroll, [{
    key: "mount",
    value: function () {
      var _mount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee() {
        var _yield$import, disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks, _iterator, _step, option;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! body-scroll-lock */ "./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js"));

              case 2:
                _yield$import = _context.sent;
                disableBodyScroll = _yield$import.disableBodyScroll;
                enableBodyScroll = _yield$import.enableBodyScroll;
                clearAllBodyScrollLocks = _yield$import.clearAllBodyScrollLocks;
                this._disableBodyScroll = disableBodyScroll;
                this._enableBodyScroll = enableBodyScroll;
                this._clearAllBodyScrollLocks = clearAllBodyScrollLocks;

                if (this._options.length) {
                  _iterator = _createForOfIteratorHelper(this._options);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      option = _step.value;

                      this._optionLogic(option);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                } else {
                  this._optionLogic(this._options);
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mount() {
        return _mount.apply(this, arguments);
      }

      return mount;
    }()
  }, {
    key: "_optionLogic",
    value: function _optionLogic(option) {
      var _this = this;

      this._elem.addEventListener(option.on, /*#__PURE__*/function () {
        var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee2(e) {
          var target;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(option.onlyThisElem && e.target !== _this._elem)) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return", false);

                case 2:
                  if (option.preventDefault) {
                    e.preventDefault();
                  }

                  document.body.classList.remove('scroll-locked');

                  _this._clearAllBodyScrollLocks();

                  target = document.querySelector(option.target);

                  if (option.method === 'lockScroll') {
                    document.body.classList.add('scroll-locked');

                    _this._disableBodyScroll(target, {
                      reserveScrollBarGap: true
                    });
                  } else if (option.method === 'toggleScroll') {
                    if (!target.hasAttribute('data-is-locked')) {
                      _this._disableBodyScroll(target, {
                        reserveScrollBarGap: true
                      });

                      document.body.classList.add('scroll-locked');
                      target.setAttribute('data-is-locked', true);
                    } else {
                      _this._clearAllBodyScrollLocks();

                      document.body.classList.remove('scroll-locked');
                      target.removeAttribute('data-is-locked');
                    }
                  }

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }(), option.preventDefault ? {
        passive: false
      } : {
        passive: true
      });
    }
  }]);

  return LockScroll;
}(_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/NewsletterBar.js":
/*!***********************************************************!*\
  !*** ./src/resources/scripts/components/NewsletterBar.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewsletterBar; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_7__);







function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var NewsletterBar = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(NewsletterBar, _Component);

  var _super = _createSuper(NewsletterBar);

  function NewsletterBar(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, NewsletterBar);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._options = _objectSpread(_objectSpread({}, {
      showAfter: 0
    }), _this._options);
    _this._closeElems = _this._elem.querySelectorAll('[data-close-popup]');
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(NewsletterBar, [{
    key: "mount",
    value: function mount() {
      var _this2 = this;

      if (this._closeElems.length === 0) return;
      if (js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('newsletter-bar') === 'closed' || js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('newsletter-bar') === 'submitted') return;

      if (window.location.href.indexOf('tags%5D=prospect%2Cnewsletter&form_type=customer') > -1 || window.location.href.indexOf('customer_posted=true') > -1) {
        this.showSuccessMessage();
      }

      setTimeout(function () {
        _this2.showPopup();
      }, this._options.showAfter);

      this._elem.addEventListener('click', function (e) {
        if (e.target === _this2._elem) {
          _this2.closePopup();
        }
      });

      var _iterator = _createForOfIteratorHelper(this._closeElems),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var elem = _step.value;
          elem.addEventListener('click', function (e) {
            e.preventDefault();

            _this2.closePopup();
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "addSpace",
    value: function addSpace() {
      this._elem.parentElement.style.marginBottom = this._elem.offsetHeight + 'px';
      document.querySelector('.mobile-button-to-top').style.top = 'auto';
      document.querySelector('.mobile-button-to-top').style.bottom = this._elem.offsetHeight + 30 + 'px';
    }
  }, {
    key: "showSuccessMessage",
    value: function showSuccessMessage() {
      this._elem.classList.add('success');

      js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.set('newsletter-bar', 'submitted', {
        expires: 31,
        sameSite: 'lax',
        secure: true
      });
    }
  }, {
    key: "showPopup",
    value: function showPopup() {
      this._elem.classList.add('active');

      this.addSpace();
    }
  }, {
    key: "closePopup",
    value: function closePopup() {
      this._elem.classList.remove('active');

      this.addSpace();
      js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.set('newsletter-bar', 'closed', {
        expires: 31,
        sameSite: 'lax',
        secure: true
      });
    }
  }]);

  return NewsletterBar;
}(_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/OverlayScrollbars.js":
/*!***************************************************************!*\
  !*** ./src/resources/scripts/components/OverlayScrollbars.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OverlayScrollbarsComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");
/* harmony import */ var overlayscrollbars__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! overlayscrollbars */ "./node_modules/overlayscrollbars/js/OverlayScrollbars.js");
/* harmony import */ var overlayscrollbars__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(overlayscrollbars__WEBPACK_IMPORTED_MODULE_6__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var OverlayScrollbarsComponent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(OverlayScrollbarsComponent, _Component);

  var _super = _createSuper(OverlayScrollbarsComponent);

  function OverlayScrollbarsComponent(elem, theme, options, ctx) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OverlayScrollbarsComponent);

    return _super.call(this, elem, theme, options, ctx);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OverlayScrollbarsComponent, [{
    key: "mount",
    value: function mount() {
      var options = this._options;
      overlayscrollbars__WEBPACK_IMPORTED_MODULE_6___default()(this._elem, {
        options: options
      });
    }
  }]);

  return OverlayScrollbarsComponent;
}(_Component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/Product.js":
/*!*****************************************************!*\
  !*** ./src/resources/scripts/components/Product.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");







function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var Product = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Product, _Component);

  var _super = _createSuper(Product);

  function Product(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Product);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._options = _objectSpread(_objectSpread({}, {
      historyState: false
    }), _this._options);
    _this._productPrice = _this._elem.querySelector('[data-product-price]');
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Product, [{
    key: "mount",
    value: function mount() {
      var subsriptionTypeInputs = this._elem.querySelectorAll('[data-bsub-selling-plan-group-input]');

      var subsriptionOptionsInputs = this._elem.querySelectorAll('[data-bsub-selling-plan-input]');

      var variantButtons = this._elem.querySelectorAll('.single-option-selector');

      var productPriceWrapper = this._productPrice;
      var regularPrice = productPriceWrapper.innerHTML;
      var subscriptionPrice = '';
      document.addEventListener('DOMContentLoaded', function () {
        var bsubSellingPlanGroup = '';
        var sellingPlan = '';
        var that = this;

        if (!document.querySelector('[data-bsub-selling-plan-group-input]')) {
          return;
        }

        this._productButtonsFunction();

        if (document.querySelector('[data-bsub-selling-plan-group-input]:checked').value === 'once') {
          bsubSellingPlanGroup = that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup;
          sellingPlan = that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan;
          that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = '';
          that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = '';
        } else {
          bsubSellingPlanGroup = document.querySelector('[data-bsub-selling-plan-group-input]:checked').value;
          sellingPlan = document.querySelector('[data-bsub-selling-plan-input]:checked').value;
          that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = bsubSellingPlanGroup;
          that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = sellingPlan;
        }

        var _iterator = _createForOfIteratorHelper(document.querySelectorAll('[data-bsub-selling-plan-input]')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var input = _step.value;
            input.addEventListener('change', function (e) {
              sellingPlan = document.querySelector('[data-bsub-selling-plan-input]:checked').value;
              that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = bsubSellingPlanGroup;
              that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = sellingPlan;
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll('[data-bsub-selling-plan-group-input]')),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _input = _step2.value;

            _input.addEventListener('change', function (e) {
              setTimeout(function () {
                bsubSellingPlanGroup = document.querySelector('[data-bsub-selling-plan-group-input]:checked').value;

                if (document.querySelector('[data-bsub-selling-plan-group-input]:checked').value === 'once') {
                  sellingPlan = '';
                } else {
                  sellingPlan = document.querySelector('[data-bsub-selling-plan-input]:checked').value;
                }

                that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = document.querySelector('[data-bsub-selling-plan-group-input]:checked').value;
                that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = sellingPlan;
              }, 100);
            });
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var _iterator3 = _createForOfIteratorHelper(subsriptionOptionsInputs),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _input2 = _step3.value;

            if (_input2.checked) {
              subscriptionPrice = _input2.parentElement.querySelector('[data-bsub-per-delivery-price]').innerHTML;
            }

            _input2.addEventListener('change', function (e) {
              subscriptionPrice = document.querySelector('[data-bsub-selling-plan-input]:checked').parentElement.querySelector('[data-bsub-per-delivery-price]').innerHTML;
              productPriceWrapper.innerHTML = subscriptionPrice;
              productPriceWrapper.classList.remove('hidden');
            });
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        var _iterator4 = _createForOfIteratorHelper(subsriptionTypeInputs),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _input3 = _step4.value;

            _input3.addEventListener('change', function (e) {
              productPriceWrapper.classList.add('hidden');

              if (document.querySelector('[name="bsub-selling-plan-group"]:checked').value === 'once') {
                regularPrice = productPriceWrapper.dataset.productPrice;
                productPriceWrapper.innerHTML = regularPrice;
                bsubSellingPlanGroup = that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup;
                sellingPlan = that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan;
                that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = '';
                that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = '';
              } else {
                subscriptionPrice = document.querySelector('[data-bsub-selling-plan-input]:checked').parentElement.querySelector('[data-bsub-per-delivery-price]').innerHTML;
                productPriceWrapper.innerHTML = subscriptionPrice;
                that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = bsubSellingPlanGroup;
                that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = sellingPlan;
              }

              productPriceWrapper.classList.remove('hidden');
            });
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        var _iterator5 = _createForOfIteratorHelper(variantButtons),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var button = _step5.value;
            button.addEventListener('change', function (e) {
              if (document.querySelector('[name="bsub-selling-plan-group"]:checked').value !== 'once') {
                productPriceWrapper.classList.add('hidden');
                regularPrice = productPriceWrapper.dataset.productPrice;
                setTimeout(function () {
                  var _iterator6 = _createForOfIteratorHelper(subsriptionOptionsInputs),
                      _step6;

                  try {
                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                      var _input4 = _step6.value;

                      if (_input4.checked) {
                        subscriptionPrice = _input4.parentElement.querySelector('[data-bsub-per-delivery-price]').innerHTML;
                        productPriceWrapper.innerHTML = subscriptionPrice;
                        productPriceWrapper.classList.remove('hidden');
                      }
                    }
                  } catch (err) {
                    _iterator6.e(err);
                  } finally {
                    _iterator6.f();
                  }
                }, 150);
              } else {
                regularPrice = productPriceWrapper.dataset.productPrice;
              }
            });
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }.bind(this));
    }
  }, {
    key: "_productButtonsFunction",
    value: function _productButtonsFunction() {
      var productButtons = document.querySelector('[data-product-buttons]');
      var productButtonPurchase = document.querySelector('[data-product-button-purchase]');
      var productButtonSubscribe = document.querySelector('[data-product-button-subscribe]');
      var purchaseOriginalButton = document.querySelector('[data-bsub-purchase-option-one-time]').parentElement;
      var subscriptionOriginalButton = document.querySelector('[data-bsub-selling-plan-group-id] label');
      var productSubscribeDetails = document.querySelector('[data-product-buttons-subscription-details]');
      var productSubscribeFrequencyOptions = document.querySelector('[data-bsub-selling-plans-container]').querySelectorAll('[data-bsub-selling-plan-id]');
      var productSubscribeFrequencySelect = document.querySelector('[data-shipping-interval-frequency]');
      var mainProductBsubWidget = document.querySelector('.product-single__meta .bsub-widget');
      if (!mainProductBsubWidget) return;
      productButtons.classList.remove('hide');
      productButtonSubscribe.querySelector('span').innerHTML = document.querySelector('[data-bsub-selling-plan-group-id] [data-bsub-group-discount-summary]').innerHTML.replace(/\(/g, '').replace(/\)/g, '');

      var _iterator7 = _createForOfIteratorHelper(productSubscribeFrequencyOptions),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var option = _step7.value;
          var opt = document.createElement('option');
          opt.value = option.dataset.bsubSellingPlanId;
          opt.innerHTML = option.querySelector('.bsub-widget__text').innerHTML;

          if (option.querySelector('[data-bsub-selling-plan-input]').checked) {
            opt.setAttribute('selected', true);
          }

          productSubscribeFrequencySelect.appendChild(opt);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      productButtonPurchase.addEventListener('click', function (e) {
        purchaseOriginalButton.click();
        productButtonPurchase.classList.add('active');
        productButtonSubscribe.classList.remove('active');
        productSubscribeDetails.classList.add('hide');
      });
      productButtonSubscribe.addEventListener('click', function (e) {
        subscriptionOriginalButton.click();
        productButtonPurchase.classList.remove('active');
        productButtonSubscribe.classList.add('active');
        productSubscribeDetails.classList.remove('hide');
      });
      productSubscribeFrequencySelect.addEventListener('change', function (e) {
        document.querySelector('[data-bsub-selling-plan-id="' + productSubscribeFrequencySelect.value + '"] label').click();
      });
    }
  }]);

  return Product;
}(_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/SelectSubscription.js":
/*!****************************************************************!*\
  !*** ./src/resources/scripts/components/SelectSubscription.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelectSubscription; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js");







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var SelectSubscription = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(SelectSubscription, _Component);

  var _super = _createSuper(SelectSubscription);

  function SelectSubscription(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, SelectSubscription);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._options = _objectSpread(_objectSpread({}, {
      historyState: false
    }), _this._options);
    _this._products = _this._elem.querySelector('[data-product-json]') ? JSON.parse(_this._elem.querySelector('[data-product-json]').innerHTML) : null;
    _this._bitesFlavours = _this._elem.querySelector('[data-bites-flavours]') ? JSON.parse(_this._elem.querySelector('[data-bites-flavours]').innerHTML) : null;
    _this._bitesJarFlavours = _this._elem.querySelector('[data-bites-jar-flavours]') ? JSON.parse(_this._elem.querySelector('[data-bites-jar-flavours]').innerHTML) : null;
    _this._buttersFlavours = _this._elem.querySelector('[data-butters-flavours]') ? JSON.parse(_this._elem.querySelector('[data-butters-flavours]').innerHTML) : null;
    _this._buttersSizesOptions = _this._elem.querySelector('[data-butters-sizes]') ? JSON.parse(_this._elem.querySelector('[data-butters-sizes]').innerHTML) : null;
    _this._bitesSizesOptions = _this._elem.querySelector('[data-bites-sizes]') ? JSON.parse(_this._elem.querySelector('[data-bites-sizes]').innerHTML) : null;
    _this._trioButtersSizesOptions = _this._elem.querySelector('[data-trio-butters-sizes]') ? JSON.parse(_this._elem.querySelector('[data-trio-butters-sizes]').innerHTML) : null;
    _this._nourishOptions = _this._elem.querySelector('[data-nourish-options]') ? JSON.parse(_this._elem.querySelector('[data-nourish-options]').innerHTML) : null;
    _this._candlesOptions = _this._elem.querySelector('[data-candles-options]') ? JSON.parse(_this._elem.querySelector('[data-candles-options]').innerHTML) : null;
    _this._nomziclesOptions = _this._elem.querySelector('[data-nomzicles-options]') ? JSON.parse(_this._elem.querySelector('[data-nomzicles-options]').innerHTML) : null;
    _this._typesDropdown = _this._elem.querySelector('#product-types');
    _this._buttersSizes = _this._elem.querySelector('#product-sizes-column');
    _this._bitesSizes = _this._elem.querySelector('#bites-sizes-column');
    _this._flavoursDropdown = _this._elem.querySelector('#product-flavours');
    _this._sizesDropdown = _this._elem.querySelector('#product-sizes');
    _this._bitesSizesDropdown = _this._elem.querySelector('#bites-sizes');
    _this._productDelivery = _this._elem.querySelector('#product-delivery');
    _this._subscriptionQty = _this._elem.querySelector('#Quantity-page-subscription-landing');
    _this._subscriptionImage = _this._elem.querySelector('.starting-slide .product-image-main--page-subscription-landing img');
    _this._sellingPlan = _this._elem.querySelector('[name="selling_plan"]');
    _this._productId = _this._elem.querySelector('[name="id"] option');
    _this._productPriceCompare = _this._elem.querySelector('.product__price--compare span');
    _this._subscriptionPrice = _this._elem.querySelector('.product__price span');
    _this._currency = document.querySelector('.currency-picker__label');
    _this._yotpoLink = _this._elem.querySelector('.yotpo-subscription-product');
    _this._productOpt = _this._elem.querySelector('#subscription-opt-flv');
    _this._form = _this._elem.querySelector('#subscription-form');
    _this._product;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(SelectSubscription, [{
    key: "mount",
    value: function mount() {
      var productDelivery = this._productDelivery;
      var sellingPlan = this._sellingPlan;
      productDelivery.addEventListener("change", function () {
        sellingPlan.value = productDelivery.selectedOptions[0].getAttribute('data-plan-id');
      });

      this._setTypeDropdown();

      this._setFlavourDropdown();

      this._setSizesDropdown();

      this._setDeliveryDropdown();
    }
  }, {
    key: "_setOption",
    value: function _setOption(el) {
      var opt = document.createElement("option");
      opt.text = el;
      opt.value = el;
      return opt;
    }
  }, {
    key: "_setDeliveryDropdown",
    value: function _setDeliveryDropdown() {
      var form = this._form;

      this._productDelivery.addEventListener("change", function () {
        var delivery = this.options[this.selectedIndex];
        console.log(delivery);
        form.setAttribute('data-selling-plan', delivery.getAttribute('data-plan-id'));
      });
    }
  }, {
    key: "_setSizesDropdown",
    value: function _setSizesDropdown() {
      var _this2 = this;

      this._flavoursDropdown.addEventListener("change", function (event) {
        var flavour = event.target.value;

        switch (flavour) {
          case "nut butter trio":
            while (_this2._sizesDropdown.options.length > 0) {
              _this2._sizesDropdown.remove(_this2._sizesDropdown.options.length - 1);
            }

            for (var i = 0; i < _this2._trioButtersSizesOptions.length; i++) {
              var opt = _this2._setOption(_this2._trioButtersSizesOptions[i]);

              _this2._sizesDropdown.add(opt, null);
            }

            break;

          case "energy bites":
            while (_this2._bitesSizesDropdown.options.length > 0) {
              _this2._bitesSizesDropdown.remove(_this2._sizesDropdown.options.length - 1);
            }

            for (var _i = 0; _i < _this2._bitesSizesOptions.length; _i++) {
              var _opt = _this2._setOption(_this2._bitesSizesOptions[_i]);

              _this2._sizesDropdown.add(_opt, null);
            }

            break;

          default:
            while (_this2._sizesDropdown.options.length > 0) {
              _this2._sizesDropdown.remove(_this2._sizesDropdown.options.length - 1);
            }

            for (var _i2 = 0; _i2 < _this2._buttersSizesOptions.length; _i2++) {
              var _opt2 = _this2._setOption(_this2._buttersSizesOptions[_i2]);

              _this2._sizesDropdown.add(_opt2, null);
            }

        }
      });

      this._sizesDropdown.addEventListener("change", function (event) {
        var size = event.target.value;
        var productId = _this2._productId;
        var currency = _this2._currency;
        var productPrice = _this2._productPriceCompare;
        var subscriptionPrice = _this2._subscriptionPrice;

        for (var k = 0; k < _this2._product.variants.length; k++) {
          if (_this2._product.variants[k].title.includes(size)) {
            var sellingPlanAlloc = _this2._product.variants[k].selling_plan_allocations[0];
            productId.value = _this2._product.variants[k].id;

            if (currency.innerHTML.includes('CAD')) {
              subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.per_delivery_price) + ' CAD';
              productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.compare_at_price) + ' CAD';
            } else {
              subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.per_delivery_price);
              productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.compare_at_price);
            }

            break;
          }
        }
      });

      this._bitesSizesDropdown.addEventListener("change", function (event) {
        var size = event.target.value;
        var productId = _this2._productId;
        var currency = _this2._currency;
        var productPrice = _this2._productPriceCompare;
        var subscriptionPrice = _this2._subscriptionPrice;

        for (var k = 0; k < _this2._product.variants.length; k++) {
          if (_this2._product.variants[k].title.includes(size)) {
            var sellingPlanAlloc = _this2._product.variants[k].selling_plan_allocations[0];
            productId.value = _this2._product.variants[k].id;

            if (currency.innerHTML.includes('CAD')) {
              subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.per_delivery_price) + ' CAD';
              productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.compare_at_price) + ' CAD';
            } else {
              subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.per_delivery_price);
              productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.compare_at_price);
            }

            break;
          }
        }
      });
    }
  }, {
    key: "_setFlavourDropdown",
    value: function _setFlavourDropdown() {
      var _this3 = this;

      var products = this._products;
      var sellingPlan = this._sellingPlan;
      var productId = this._productId;
      var productDelivery = this._productDelivery;
      var subscriptionImage = this._subscriptionImage;
      var subscriptionPrice = this._subscriptionPrice;
      var productPrice = this._productPriceCompare;
      var currency = this._currency;
      var yotpoUrl = this._yotpoLink;
      var form = this._form;
      var reviewsF;
      reviewsF = document.querySelector('.yotpo-subscription-product a');

      window.onload = function () {
        reviewsF = document.querySelector('.yotpo-subscription-product a');
      };

      this._flavoursDropdown.addEventListener("change", function (event) {
        var type = _this3._typesDropdown.value;
        var flavour = event.target.value;
        var match = false;
        var size = _this3._sizesDropdown.value;
        if (type == 'energy bites') size = _this3._bitesSizesDropdown.value;

        for (var i = 0; i < products.length; i++) {
          for (var j = 0; j < products[i].tags.length; j++) {
            if (products[i].title.includes(flavour) && products[i].tags[j] === type) {
              var sellingPlanAlloc = void 0;
              _this3._product = products[i];
              console.log(_this3._product);

              if (products[i].has_only_default_variant) {
                sellingPlanAlloc = products[i].variants[0].selling_plan_allocations[0];
                productId.value = products[i].variants[0].id;
              } else {
                for (var k = 0; k < products[i].variants.length; k++) {
                  if (products[i].variants[k].title.includes(size) || size.includes(products[i].variants[k].title)) {
                    sellingPlanAlloc = products[i].variants[k].selling_plan_allocations[0];
                    productId.value = products[i].variants[k].id;
                  }
                }
              }

              sellingPlan.value = productDelivery.selectedOptions[0].getAttribute('data-plan-id');
              form.setAttribute('data-selling-plan', productDelivery.selectedOptions[0].getAttribute('data-plan-id'));
              form.setAttribute('data-bsub-selling-plan-group', sellingPlanAlloc.selling_plan_group_id);
              var imgUrl = products[i].image.replace('.jpg', '_750x.jpg');
              subscriptionImage.setAttribute('data-srcset', imgUrl);
              subscriptionImage.setAttribute('data-photoswipe-src', imgUrl);
              subscriptionImage.srcset = imgUrl;
              yotpoUrl.href = products[i].url + "#yotpoWidget";
              reviewsF.innerHTML = products[i].reviews + ' reviews';

              if (currency.innerHTML.includes('CAD')) {
                subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.per_delivery_price) + ' CAD';
                productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.compare_at_price) + ' CAD';
              } else {
                subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.per_delivery_price);
                productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.compare_at_price);
              }

              match = true;
              break;
            }
          }

          if (match) break;
        }

        if (!match) {
          for (var _i3 = 0; _i3 < products.length; _i3++) {
            for (var _j = 0; _j < products[_i3].tags.length; _j++) {
              if (products[_i3].tags[_j] === type) {
                for (var _k = 0; _k < products[_i3].variants.length; _k++) {
                  if (products[_i3].variants[_k].title.includes(flavour)) {
                    var _sellingPlanAlloc = products[_i3].variants[_k].selling_plan_allocations[0];
                    productId.value = products[_i3].variants[_k].id;
                    sellingPlan.value = productDelivery.selectedOptions[0].getAttribute('data-plan-id');
                    var _imgUrl = products[_i3].variants[_k].featured_image.src;
                    subscriptionImage.setAttribute('data-srcset', _imgUrl);
                    subscriptionImage.setAttribute('data-photoswipe-src', _imgUrl);
                    subscriptionImage.srcset = _imgUrl;
                    yotpoUrl.href = products[_i3].url + "#yotpoWidget";
                    reviewsF.innerHTML = products[_i3].reviews + ' reviews';

                    if (currency.innerHTML.includes('CAD')) {
                      subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(_sellingPlanAlloc.per_delivery_price) + ' CAD';
                      productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(_sellingPlanAlloc.compare_at_price) + ' CAD';
                    } else {
                      subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(_sellingPlanAlloc.per_delivery_price);
                      productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(_sellingPlanAlloc.compare_at_price);
                    }

                    match = true;
                    break;
                  }
                }
              }

              if (match) break;
            }

            if (match) break;
          }
        }
      });
    }
  }, {
    key: "_setTypeDropdown",
    value: function _setTypeDropdown(rev) {
      var _this4 = this;

      var products = this._products;
      var flavours = this._flavoursDropdown;
      var bites = this._bitesFlavours;
      var bitesJar = this._bitesJarFlavours;
      var butters = this._buttersFlavours;
      var buttersSizes = this._buttersSizes;
      var bitesSizes = this._bitesSizes;
      var candles = this._candlesOptions;
      var nourish = this._nourishOptions;
      var nomzicles = this._nomziclesOptions;
      var sellingPlan = this._sellingPlan;
      var productId = this._productId;
      var productDelivery = this._productDelivery;
      var subscriptionImage = this._subscriptionImage;
      var subscriptionPrice = this._subscriptionPrice;
      var productPrice = this._productPriceCompare;
      var currency = this._currency;
      var productOpt = this._productOpt;
      var yotpoUrl = this._yotpoLink;
      var form = this._form;
      var reviews;
      reviews = document.querySelector('.yotpo-subscription-product a');

      window.onload = function () {
        reviews = document.querySelector('.yotpo-subscription-product a');
      };

      this._typesDropdown.addEventListener("change", function (event) {
        var type = event.target.value;
        flavours.parentElement.classList.remove('hide');

        switch (type) {
          case "nut butters":
            buttersSizes.classList.remove('hide');
            bitesSizes.classList.add('hide');

            while (flavours.options.length > 0) {
              flavours.remove(flavours.options.length - 1);
            }

            for (var i = 0; i < butters.length; i++) {
              var opt = _this4._setOption(butters[i]);

              flavours.add(opt, null);
            }

            productOpt.innerHTML = _this4._ctx.getState().locale.productFlavour;
            break;

          case "energy bites":
            while (flavours.options.length > 0) {
              flavours.remove(flavours.options.length - 1);
            }

            bitesSizes.classList.remove('hide');
            buttersSizes.classList.add('hide');

            for (var _i4 = 0; _i4 < bites.length; _i4++) {
              var _opt3 = _this4._setOption(bites[_i4]);

              flavours.add(_opt3, null);
            }

            productOpt.innerHTML = _this4._ctx.getState().locale.productFlavour;
            break;

          case "energy bites jar":
            while (flavours.options.length > 0) {
              flavours.remove(flavours.options.length - 1);
            }

            bitesSizes.classList.add('hide');
            buttersSizes.classList.add('hide');

            for (var _i5 = 0; _i5 < bitesJar.length; _i5++) {
              var _opt4 = _this4._setOption(bitesJar[_i5]);

              flavours.add(_opt4, null);
            }

            productOpt.innerHTML = _this4._ctx.getState().locale.productFlavour;
            break;

          case "daily nourish":
            while (flavours.options.length > 0) {
              flavours.remove(flavours.options.length - 1);
            }

            bitesSizes.classList.add('hide');
            buttersSizes.classList.add('hide');

            for (var _i6 = 0; _i6 < nourish.length; _i6++) {
              var _opt5 = _this4._setOption(nourish[_i6]);

              flavours.add(_opt5, null);
            }

            productOpt.innerHTML = _this4._ctx.getState().locale.productOption;
            break;

          case "candles":
            while (flavours.options.length > 0) {
              flavours.remove(flavours.options.length - 1);
            }

            bitesSizes.classList.add('hide');
            buttersSizes.classList.add('hide');

            for (var _i7 = 0; _i7 < candles.length; _i7++) {
              var _opt6 = _this4._setOption(candles[_i7]);

              flavours.add(_opt6, null);
            }

            if (candles.length === 0) flavours.parentElement.classList.add('hide');
            productOpt.innerHTML = _this4._ctx.getState().locale.productOption;
            break;

          case "nomzicles":
            while (flavours.options.length > 0) {
              flavours.remove(flavours.options.length - 1);
            }

            bitesSizes.classList.add('hide');
            buttersSizes.classList.add('hide');

            for (var _i8 = 0; _i8 < nomzicles.length; _i8++) {
              var _opt7 = _this4._setOption(nomzicles[_i8]);

              flavours.add(_opt7, null);
            }

            productOpt.innerHTML = _this4._ctx.getState().locale.productOption;
            break;

          default:
            break;
        }

        var flavour = _this4._flavoursDropdown.value;
        var match = false;
        var size = _this4._sizesDropdown.value;
        if (type == 'energy bites') size = _this4._bitesSizesDropdown.value;

        for (var _i9 = 0; _i9 < products.length; _i9++) {
          for (var j = 0; j < products[_i9].tags.length; j++) {
            if (products[_i9].title.includes(flavour) && products[_i9].tags[j] === type) {
              var sellingPlanAlloc = void 0;
              reviews = document.querySelector('.yotpo-subscription-product a');
              _this4._product = products[_i9];

              if (products[_i9].has_only_default_variant) {
                sellingPlanAlloc = products[_i9].variants[0].selling_plan_allocations[0];
                productId.value = products[_i9].variants[0].id;
              } else {
                for (var k = 0; k < products[_i9].variants.length; k++) {
                  if (products[_i9].variants[k].title.includes(size) || size.includes(products[_i9].variants[k].title)) {
                    sellingPlanAlloc = products[_i9].variants[k].selling_plan_allocations[0];
                    productId.value = products[_i9].variants[k].id;
                  }
                }
              }

              sellingPlan.value = productDelivery.selectedOptions[0].getAttribute('data-plan-id');
              form.setAttribute('data-selling-plan', productDelivery.selectedOptions[0].getAttribute('data-plan-id'));
              form.setAttribute('data-bsub-selling-plan-group', sellingPlanAlloc.selling_plan_group_id);

              var imgUrl = products[_i9].image.replace('.jpg', '_750x.jpg');

              subscriptionImage.setAttribute('data-srcset', imgUrl);
              subscriptionImage.setAttribute('data-photoswipe-src', imgUrl);
              subscriptionImage.srcset = imgUrl;
              yotpoUrl.href = products[_i9].url + "#yotpoWidget";
              reviews.innerHTML = products[_i9].reviews + ' reviews';

              if (currency.innerHTML.includes('CAD')) {
                subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.per_delivery_price) + ' CAD';
                productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.compare_at_price) + ' CAD';
              } else {
                subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.per_delivery_price);
                productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(sellingPlanAlloc.compare_at_price);
              }

              match = true;
              break;
            }
          }

          if (match) break;
        }

        if (!match) {
          for (var _i10 = 0; _i10 < products.length; _i10++) {
            for (var _j2 = 0; _j2 < products[_i10].tags.length; _j2++) {
              if (products[_i10].tags[_j2] === type) {
                for (var _k2 = 0; _k2 < products[_i10].variants.length; _k2++) {
                  if (products[_i10].variants[_k2].title.includes(flavour)) {
                    var _sellingPlanAlloc2 = products[_i10].variants[_k2].selling_plan_allocations[0];
                    productId.value = products[_i10].variants[_k2].id;
                    sellingPlan.value = productDelivery.selectedOptions[0].getAttribute('data-plan-id');
                    var _imgUrl2 = products[_i10].variants[_k2].featured_image.src;
                    subscriptionImage.setAttribute('data-srcset', _imgUrl2);
                    subscriptionImage.setAttribute('data-photoswipe-src', _imgUrl2);
                    subscriptionImage.srcset = _imgUrl2;
                    yotpoUrl.href = products[_i10].url + "#yotpoWidget";
                    reviews.innerHTML = products[_i10].reviews + ' reviews';

                    if (currency.innerHTML.includes('CAD')) {
                      subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(_sellingPlanAlloc2.per_delivery_price) + ' CAD';
                      productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(_sellingPlanAlloc2.compare_at_price) + ' CAD';
                    } else {
                      subscriptionPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(_sellingPlanAlloc2.per_delivery_price);
                      productPrice.innerHTML = _lib_Helpers__WEBPACK_IMPORTED_MODULE_7__["default"].formatMoney(_sellingPlanAlloc2.compare_at_price);
                    }

                    match = true;
                    break;
                  }
                }
              }

              if (match) break;
            }

            if (match) break;
          }
        }
      });
    }
  }]);

  return SelectSubscription;
}(_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/SideCart.js":
/*!******************************************************!*\
  !*** ./src/resources/scripts/components/SideCart.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var SideCart = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(SideCart, _Component);

  var _super = _createSuper(SideCart);

  function SideCart(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, SideCart);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._scrollArea = null;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(SideCart, [{
    key: "setScrollArea",
    value: function setScrollArea() {
      this._scrollArea = this._elem.querySelector('[data-side-cart-items]');
    }
  }, {
    key: "mount",
    value: function () {
      var _mount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee4() {
        var _this2 = this;

        var _yield$import, disableBodyScroll, clearAllBodyScrollLocks, params;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! body-scroll-lock */ "./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js"));

              case 2:
                _yield$import = _context4.sent;
                disableBodyScroll = _yield$import.disableBodyScroll;
                clearAllBodyScrollLocks = _yield$import.clearAllBodyScrollLocks;
                this._disableBodyScroll = disableBodyScroll;
                this._clearAllBodyScrollLocks = clearAllBodyScrollLocks;
                this.setScrollArea();

                this._ctx.on('show-side-cart', /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _this2.showSideCart();

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

                this._ctx.on('cart-item-added--refreshed', /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee2() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _this2.setScrollArea();

                          _this2.showSideCart();

                        case 2:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })));

                this._ctx.on('upsell-item-added--refreshed', /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee3() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _this2.setScrollArea();

                          _this2._scrollArea.scrollTo(0, 0);

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })));

                params = new URLSearchParams(window.location.search);

                if (params.has('show-cart')) {
                  this.setScrollArea();
                  this.showSideCart();
                }

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function mount() {
        return _mount.apply(this, arguments);
      }

      return mount;
    }()
  }, {
    key: "showSideCart",
    value: function showSideCart() {
      document.body.classList.remove('scroll-locked');
      this._clearAllBodyScrollLocks();

      this._elem.classList.add('shown');

      document.body.classList.add('scroll-locked');
      if (this._scrollArea) this._disableBodyScroll(this._scrollArea, {
        reserveScrollBarGap: true
      });
    }
  }]);

  return SideCart;
}(_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (SideCart);

/***/ }),

/***/ "./src/resources/scripts/components/SlideToggleGroup.js":
/*!**************************************************************!*\
  !*** ./src/resources/scripts/components/SlideToggleGroup.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SlideToggleGroup; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js");






function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var SlideToggleGroup = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(SlideToggleGroup, _Component);

  var _super = _createSuper(SlideToggleGroup);

  function SlideToggleGroup(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SlideToggleGroup);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._toggleItems = _this._elem.querySelectorAll('[data-toggle-item]');
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SlideToggleGroup, [{
    key: "mount",
    value: function mount() {
      var _this2 = this;

      if (this._toggleItems.length === 0) {
        (function () {
          var triggers = _this2._elem.querySelectorAll('[data-toggle-trigger]');

          var elems = _this2._elem.querySelectorAll('[data-toggle-elem]');

          var _iterator = _createForOfIteratorHelper(triggers),
              _step;

          try {
            var _loop = function _loop() {
              var trigger = _step.value;
              trigger.addEventListener('click', function (e) {
                var elemToSlide = _this2._elem.querySelector("[data-toggle-elem=\"".concat(trigger.dataset.toggleTrigger, "\"]"));

                if (elemToSlide.dataset.transitioning === 'true') {
                  return false;
                }

                if (elemToSlide.classList.contains('open')) {
                  _lib_Helpers__WEBPACK_IMPORTED_MODULE_6__["default"].slideUp(elemToSlide, trigger);
                } else {
                  _lib_Helpers__WEBPACK_IMPORTED_MODULE_6__["default"].slideDown(elemToSlide, trigger);
                }

                var _iterator2 = _createForOfIteratorHelper(elems),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var otherItem = _step2.value;

                    if (otherItem !== elemToSlide && otherItem.classList.contains('open') && otherItem.dataset.transitioning !== 'true') {
                      var _trigger = _this2._elem.querySelector("[data-toggle-trigger=\"".concat(otherItem.dataset.toggleElem, "\"]"));

                      _lib_Helpers__WEBPACK_IMPORTED_MODULE_6__["default"].slideUp(otherItem, _trigger);
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              });
            };

            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        })();
      }

      var _iterator3 = _createForOfIteratorHelper(this._toggleItems),
          _step3;

      try {
        var _loop2 = function _loop2() {
          var item = _step3.value;
          var trigger = item.querySelector('[data-toggle-trigger]');
          trigger.addEventListener('click', function (e) {
            var elemToSlide = item.querySelector('[data-toggle-elem]');

            if (item.dataset.transitioning === 'true') {
              return false;
            }

            if (item.classList.contains('open')) {
              _lib_Helpers__WEBPACK_IMPORTED_MODULE_6__["default"].slideUp(elemToSlide, item);

              _this2._ctx.emit('ffc--slide-up');
            } else {
              _lib_Helpers__WEBPACK_IMPORTED_MODULE_6__["default"].slideDown(elemToSlide, item);

              _this2._ctx.emit('ffc--slide-down');
            }

            var _iterator4 = _createForOfIteratorHelper(_this2._toggleItems),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var otherItem = _step4.value;

                if (otherItem !== item && otherItem.classList.contains('open') && otherItem.dataset.transitioning !== 'true') {
                  var _elemToSlide = otherItem.querySelector('[data-toggle-elem]'); // Helpers.slideUp(elemToSlide, otherItem)

                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          });
        };

        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);

  return SlideToggleGroup;
}(_Component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/Slider.js":
/*!****************************************************!*\
  !*** ./src/resources/scripts/components/Slider.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Slider; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var slick = null;
var jQuery = null;

var Slider = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Slider, _Component);

  var _super = _createSuper(Slider);

  function Slider(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Slider);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._options = _objectSpread(_objectSpread({}, {
      slidesToShow: 1,
      rows: 0,
      swipeToSlide: true,
      mount: true
    }), _this._options);
    _this._isMounted = false;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Slider, [{
    key: "mount",
    value: function () {
      var _mount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.mark(function _callee() {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.t.bind(null, /*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js", 7));

              case 2:
                slick = _context.sent;
                _context.next = 5;
                return Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! jquery */ "jquery", 7));

              case 5:
                jQuery = _context.sent;
                jQuery = jQuery["default"];

                if (!(this._options.enableWhen && !matchMedia("only screen and ".concat(this._options.enableWhen)).matches)) {
                  _context.next = 10;
                  break;
                }

                window.addEventListener('resize', function (e) {
                  if (matchMedia("only screen and ".concat(_this2._options.enableWhen)).matches && !_this2._isMounted) {
                    _this2.mountSlider();
                  } else if (!matchMedia("only screen and ".concat(_this2._options.enableWhen)).matches && _this2._isMounted) {
                    _this2.unmountSlider();

                    _this2._isMounted = false;
                  }
                }, {
                  passive: true
                });
                return _context.abrupt("return", false);

              case 10:
                if (!(this._options.mount === false)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", false);

              case 12:
                this.mountSlider();

                this._ctx.on('ffc--slide-up', function (e) {
                  var that = _this2;

                  var slide = _this2._elem.querySelector('.slick-current').dataset.slickIndex;

                  setTimeout(function () {
                    that._reinit(slide);
                  }, 100);
                });

                this._ctx.on('ffc--slide-down', function (e) {
                  var that = _this2;

                  var slide = _this2._elem.querySelector('.slick-current').dataset.slickIndex;

                  setTimeout(function () {
                    that._reinit(slide);
                  }, 100);
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mount() {
        return _mount.apply(this, arguments);
      }

      return mount;
    }()
  }, {
    key: "mountSlider",
    value: function mountSlider(slide) {
      var _this3 = this;

      this._isMounted = true;
      jQuery(this._elem).on('init', function (e, slider) {
        jQuery.each(slider.$dots, function (i, el) {
          jQuery(el).find('li').eq(slider.currentSlide).addClass('slick-active');
        });

        if (slider.slickGetOption('autoplayOnScroll')) {
          _this3._setAutoplayOnScroll();
        }
      });
      jQuery(this._elem).on('beforeChange', function (event, slick, currentSlide) {
        _this3._ctx.emit('ffc--lazy-load-update');
      });
      jQuery(this._elem).slick(this._options);

      if (slide) {
        jQuery(this._elem).slick('slickGoTo', slide, true);
      }

      jQuery(this._elem).on('afterChange', function (event, slick, currentSlide) {
        jQuery.each(slick.$dots, function (i, el) {
          jQuery(el).find('li').eq(currentSlide).addClass('slick-active');
        });
      });
    }
  }, {
    key: "unmountSlider",
    value: function unmountSlider() {
      jQuery(this._elem).slick('unslick');
      this._isMounted = false;
    }
  }, {
    key: "_setAutoplayOnScroll",
    value: function _setAutoplayOnScroll() {
      requestAnimationFrame(this._doAutoplayCalculations.bind(this));
    }
  }, {
    key: "_doAutoplayCalculations",
    value: function _doAutoplayCalculations() {
      if (_lib_Helpers__WEBPACK_IMPORTED_MODULE_9__["default"].isInViewport(this._elem) && jQuery(this._elem).slick('slickGetOption', 'autoplay') === false) {
        jQuery(this._elem).slick('slickSetOption', 'autoplay', true, true);
        jQuery(this._elem).slick('slickPlay');
      } else if (!_lib_Helpers__WEBPACK_IMPORTED_MODULE_9__["default"].isInViewport(this._elem) && jQuery(this._elem).slick('slickGetOption', 'autoplay') === true) {
        jQuery(this._elem).slick('slickSetOption', 'autoplay', false, true);
        jQuery(this._elem).slick('slickPause');
      }

      requestAnimationFrame(this._doAutoplayCalculations.bind(this));
    }
  }, {
    key: "getSpeed",
    value: function getSpeed() {
      return parseFloat(jQuery(this._elem).slick('slickGetOption', 'speed'));
    }
  }, {
    key: "goToSlide",
    value: function goToSlide(i) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      jQuery(this._elem).slick('slickGoTo', i, dontAnimate);
    }
  }, {
    key: "_reinit",
    value: function _reinit(slide) {
      this.unmountSlider();

      if (!this._isMounted) {
        this.mountSlider(slide);
      }
    }
  }]);

  return Slider;
}(_Component__WEBPACK_IMPORTED_MODULE_8__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/SubscriptionGridItem.js":
/*!******************************************************************!*\
  !*** ./src/resources/scripts/components/SubscriptionGridItem.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SubscriptionGridItem; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");
/* harmony import */ var _lib_Helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/Helpers */ "./src/resources/scripts/lib/Helpers.js");






function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var SubscriptionGridItem = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(SubscriptionGridItem, _Component);

  var _super = _createSuper(SubscriptionGridItem);

  function SubscriptionGridItem(elem, theme, options, ctx) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SubscriptionGridItem);

    return _super.call(this, elem, theme, options, ctx);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SubscriptionGridItem, [{
    key: "mount",
    value: function mount() {
      var labelSubscription = this._elem.querySelector('.bsub-widget__group[data-bsub-selling-plan-group] label');

      var labelPurchase = this._elem.querySelector('.bsub-widget__group:not([data-bsub-selling-plan-group]) label');

      var buttonSubscription = this._elem.querySelector('[data-button-subscribe]');

      var buttonPurchase = this._elem.querySelector('[data-button-purchase]');

      var buttonState = this._elem.querySelector('[data-button-state]');

      var sellingPlans = this._elem.querySelectorAll('[data-bsub-selling-plan]');

      var sellingPlansSelect = this._elem.querySelector('[data-selling-plan-select]');

      var atcButton = this._elem.querySelector('[data-atc-button]');

      if (!atcButton) return;
      var atcButtonPriceText = atcButton.querySelector('[data-subscription-atc-price]');

      var priceOriginalWrapper = this._elem.parentElement.querySelector('.grid-product__price-orgnl');

      var priceSubscriptionWrapper = this._elem.parentElement.querySelector('.grid-product__price-subscription');

      document.addEventListener('DOMContentLoaded', function () {
        var _this = this;

        var bsubSellingPlanGroup = this._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup;

        var sellingPlan = this._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan;

        var that = this;
        buttonSubscription.addEventListener('click', function (e) {
          labelSubscription.click();
          priceOriginalWrapper.classList.add('hidden');
          priceSubscriptionWrapper.classList.remove('hide');
          buttonSubscription.classList.add('active');
          buttonPurchase.classList.remove('active');
          that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = bsubSellingPlanGroup;
          that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = sellingPlan;
        });
        buttonPurchase.addEventListener('click', function (e) {
          labelPurchase.click();
          priceOriginalWrapper.classList.remove('hidden');
          priceSubscriptionWrapper.classList.add('hide');
          buttonPurchase.classList.add('active');
          buttonSubscription.classList.remove('active');
          bsubSellingPlanGroup = _this._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup;
          sellingPlan = _this._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan;
          that._elem.querySelector('[data-add-to-cart]').dataset.bsubSellingPlanGroup = '';
          that._elem.querySelector('[data-add-to-cart]').dataset.sellingPlan = '';
        });

        var _iterator = _createForOfIteratorHelper(sellingPlans),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var plan = _step.value;
            var planName = plan.querySelector('.bsub-widget__text').innerText;
            var planInput = plan.querySelector('input');
            var planLabel = plan.querySelector('label');
            var planId = plan.dataset.bsubSellingPlanId;
            var planItem = document.createElement('div');

            if (planName === '4 weeks') {
              planLabel.click();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }.bind(this));
    }
  }]);

  return SubscriptionGridItem;
}(_Component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/resources/scripts/components/Video.js":
/*!***************************************************!*\
  !*** ./src/resources/scripts/components/Video.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Video; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Component */ "./src/resources/scripts/components/Component.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var Video = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Video, _Component);

  var _super = _createSuper(Video);

  function Video(elem, theme, options, ctx) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Video);

    _this = _super.call(this, elem, theme, options, ctx);
    _this._video = _this._elem.querySelector('[data-video-elem]');
    _this._muteToggle = _this._elem.querySelector('[data-mute-toggle]');
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Video, [{
    key: "mount",
    value: function mount() {
      var _this2 = this;

      this._toggleMuteFunc();

      if (this._options.hover) {
        this._elem.addEventListener('mouseenter', /*#__PURE__*/function () {
          var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee(e) {
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _this2._loadVideo();

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }

      window.addEventListener('load', /*#__PURE__*/function () {
        var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee2(e) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _this2._loadVideo();

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
      window.addEventListener('resize', /*#__PURE__*/function () {
        var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee3(e) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this2._loadVideo();

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_loadVideo",
    value: function _loadVideo() {
      var bgv = this._video;
      if (!bgv) return;
      var visible = bgv.offsetWidth || bgv.offsetHeight || bgv.getClientRects().length;

      if (visible) {
        var children = bgv.getElementsByTagName("source");

        for (var i = 0; i < children.length; ++i) {
          children[i].src = children[i].dataset.src;
        }
      }

      bgv.load();
    }
  }, {
    key: "_toggleMuteFunc",
    value: function _toggleMuteFunc() {
      var _this3 = this;

      if (!this._muteToggle) return;

      this._muteToggle.addEventListener('click', function (e) {
        e.preventDefault();
        _this3._video.muted = !_this3._video.muted;

        if (_this3._video.muted) {
          _this3._muteToggle.classList.add('is-muted');
        } else {
          _this3._muteToggle.classList.remove('is-muted');
        }
      });
    }
  }]);

  return Video;
}(_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);



/***/ }),

/***/ "./src/resources/scripts/ffc.js":
/*!**************************************!*\
  !*** ./src/resources/scripts/ffc.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_ffc_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/ffc.scss */ "./src/resources/styles/ffc.scss");
/* harmony import */ var _Theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Theme */ "./src/resources/scripts/Theme.js");
__webpack_require__.p = window.__webpack_public_path__;


var theme = new _Theme__WEBPACK_IMPORTED_MODULE_1__["default"]();
theme.mountComponents();
document.addEventListener('shopify:section:load', function (e) {
  theme = new _Theme__WEBPACK_IMPORTED_MODULE_1__["default"]();
  theme.mountComponents();
});

/***/ }),

/***/ "./src/resources/scripts/lib/AjaxApi.js":
/*!**********************************************!*\
  !*** ./src/resources/scripts/lib/AjaxApi.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AjaxApi; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Helpers */ "./src/resources/scripts/lib/Helpers.js");





var endpoints = {
  cart: {
    clear: '/cart/clear.json',
    get: '/cart.json',
    add: '/cart/add.js',
    change: '/cart/change.js',
    update: '/cart/update.js'
  },
  product: {
    get: '/products/[handle].json',
    getCustom: '/products/[handle]?view=json'
  }
};

var AjaxApi = /*#__PURE__*/function () {
  function AjaxApi() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AjaxApi);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AjaxApi, null, [{
    key: "getCart",
    value: function () {
      var _getCart = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee() {
        var axios, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! axios */ "./node_modules/axios/index.js", 7));

              case 2:
                axios = _context.sent;
                _context.next = 5;
                return axios.get(_Helpers__WEBPACK_IMPORTED_MODULE_4__["default"].getEndpoint(endpoints.cart.get));

              case 5:
                result = _context.sent;
                return _context.abrupt("return", result.data);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getCart() {
        return _getCart.apply(this, arguments);
      }
      return getCart;
    }()
  }, {
    key: "addToCart",
    value: function () {
      var _addToCart = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee2(options) {
        var axios, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! axios */ "./node_modules/axios/index.js", 7));

              case 2:
                axios = _context2.sent;
                _context2.next = 5;
                return axios.post(_Helpers__WEBPACK_IMPORTED_MODULE_4__["default"].getEndpoint(endpoints.cart.add), options);

              case 5:
                result = _context2.sent;
                return _context2.abrupt("return", result.data);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function addToCart(_x) {
        return _addToCart.apply(this, arguments);
      }

      return addToCart;
    }()
  }, {
    key: "changeCart",
    value: function () {
      var _changeCart = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee3(options) {
        var axios, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! axios */ "./node_modules/axios/index.js", 7));

              case 2:
                axios = _context3.sent;
                _context3.next = 5;
                return axios.post(_Helpers__WEBPACK_IMPORTED_MODULE_4__["default"].getEndpoint(endpoints.cart.change), options);

              case 5:
                result = _context3.sent;
                return _context3.abrupt("return", result.data);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function changeCart(_x2) {
        return _changeCart.apply(this, arguments);
      }

      return changeCart;
    }()
  }, {
    key: "updateCart",
    value: function () {
      var _updateCart = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee4(options) {
        var axios, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! axios */ "./node_modules/axios/index.js", 7));

              case 2:
                axios = _context4.sent;
                _context4.next = 5;
                return axios.post(_Helpers__WEBPACK_IMPORTED_MODULE_4__["default"].getEndpoint(endpoints.cart.update), options);

              case 5:
                result = _context4.sent;
                return _context4.abrupt("return", result.data);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateCart(_x3) {
        return _updateCart.apply(this, arguments);
      }

      return updateCart;
    }()
  }, {
    key: "emptyCart",
    value: function () {
      var _emptyCart = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee5(options) {
        var axios, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! axios */ "./node_modules/axios/index.js", 7));

              case 2:
                axios = _context5.sent;
                _context5.next = 5;
                return axios.post(_Helpers__WEBPACK_IMPORTED_MODULE_4__["default"].getEndpoint(endpoints.cart.clear), options);

              case 5:
                result = _context5.sent;
                return _context5.abrupt("return", result.data);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function emptyCart(_x4) {
        return _emptyCart.apply(this, arguments);
      }

      return emptyCart;
    }()
  }, {
    key: "updateCartItem",
    value: function () {
      var _updateCartItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee6(index, quantity) {
        var props,
            _args6 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                props = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                _context6.next = 3;
                return AjaxApi.changeCart({
                  line: index,
                  quantity: quantity,
                  properties: props
                });

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function updateCartItem(_x5, _x6) {
        return _updateCartItem.apply(this, arguments);
      }

      return updateCartItem;
    }()
  }, {
    key: "removeCartItem",
    value: function () {
      var _removeCartItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee7(index) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return AjaxApi.updateCartItem(index, 0);

              case 2:
                return _context7.abrupt("return", _context7.sent);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function removeCartItem(_x7) {
        return _removeCartItem.apply(this, arguments);
      }

      return removeCartItem;
    }()
  }, {
    key: "getProduct",
    value: function () {
      var _getProduct = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee8(handle) {
        var axios, endpoint, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! axios */ "./node_modules/axios/index.js", 7));

              case 2:
                axios = _context8.sent;
                endpoint = endpoints.product.get.replace('[handle]', handle);
                _context8.next = 6;
                return axios.get(_Helpers__WEBPACK_IMPORTED_MODULE_4__["default"].getEndpoint(endpoint));

              case 6:
                result = _context8.sent;
                return _context8.abrupt("return", result.data.product);

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getProduct(_x8) {
        return _getProduct.apply(this, arguments);
      }

      return getProduct;
    }()
  }, {
    key: "getCustomProduct",
    value: function () {
      var _getCustomProduct = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee9(handle) {
        var axios, endpoint, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! axios */ "./node_modules/axios/index.js", 7));

              case 2:
                axios = _context9.sent;
                endpoint = endpoints.product.getCustom.replace('[handle]', handle);
                _context9.next = 6;
                return axios.get(_Helpers__WEBPACK_IMPORTED_MODULE_4__["default"].getEndpoint(endpoint));

              case 6:
                result = _context9.sent;
                return _context9.abrupt("return", result.data);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function getCustomProduct(_x9) {
        return _getCustomProduct.apply(this, arguments);
      }

      return getCustomProduct;
    }()
  }]);

  return AjaxApi;
}();



/***/ }),

/***/ "./src/resources/scripts/lib/Helpers.js":
/*!**********************************************!*\
  !*** ./src/resources/scripts/lib/Helpers.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Helpers; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



var Helpers = /*#__PURE__*/function () {
  function Helpers() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Helpers);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Helpers, null, [{
    key: "formatWithDelimiters",
    value: function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = precision || 2;
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);
      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? decimal + parts[1] : '';
      return dollarsAmount + centsAmount;
    }
  }, {
    key: "decodeHtml",
    value: function decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }, {
    key: "pad",
    value: function pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
  }, {
    key: "capitalizeString",
    value: function capitalizeString(string) {
      return string.trim().toLowerCase().replace(/\w\S*/g, function (w) {
        return w.replace(/^\w/, function (c) {
          return c.toUpperCase();
        });
      });
    }
  }, {
    key: "decodeHtmlReplace",
    value: function decodeHtmlReplace(html) {
      var txt = document.createElement("textarea");
      html = html.replace(/&amp;/g, "&").replace(/&#039;/g, "’").replace(/\u2028/g, " ");
      txt.innerHTML = html;
      return txt.value;
    }
  }, {
    key: "truncate",
    value: function truncate(input, length) {
      return input.length > length ? "".concat(input.substring(0, length), "...") : input;
    }
  }, {
    key: "isInViewport",
    value: function isInViewport(elem) {
      var distance = elem.getBoundingClientRect();
      return distance.top >= 0 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    }
  }, {
    key: "compact",
    value: function compact(array) {
      var index = -1;
      var length = array == null ? 0 : array.length;
      var resIndex = 0;
      var result = [];

      while (++index < length) {
        var value = array[index];

        if (value) {
          result[resIndex++] = value;
        }
      }

      return result;
    }
  }, {
    key: "isAnyPartOfElementInViewport",
    value: function isAnyPartOfElementInViewport(el) {
      var rect = el.getBoundingClientRect(); // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }

      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      var windowWidth = window.innerWidth || document.documentElement.clientWidth; // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap

      var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
      var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
      return vertInView && horInView;
    }
  }, {
    key: "formatMoney",
    value: function formatMoney(cents) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '${{amount}}';

      if (typeof cents === 'string') {
        cents = cents.replace('.', '');
      }

      var value = '';
      var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

      switch (format.match(placeholderRegex)[1]) {
        case 'amount':
          value = Helpers.formatWithDelimiters(cents, 2);
          break;

        case 'amount_no_decimals':
          value = Helpers.formatWithDelimiters(cents, 0);
          break;

        case 'amount_with_space_separator':
          value = Helpers.formatWithDelimiters(cents, 2, ' ', '.');
          break;

        case 'amount_no_decimals_with_comma_separator':
          value = Helpers.formatWithDelimiters(cents, 0, ',', '.');
          break;

        case 'amount_no_decimals_with_space_separator':
          value = Helpers.formatWithDelimiters(cents, 0, ' ');
          break;
      }

      return format.replace(placeholderRegex, value);
    }
  }, {
    key: "getSizedImageUrl",
    value: function getSizedImageUrl(src, size) {
      if (size === null || src === null) {
        return src;
      }

      if (size === 'master') {
        return Helpers.removeProtocol(src);
      }

      var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

      if (match) {
        var prefix = src.split(match[0]);
        var suffix = match[0];
        return Helpers.removeProtocol(prefix[0] + '_' + size + suffix);
      } else {
        return null;
      }
    }
  }, {
    key: "removeProtocol",
    value: function removeProtocol(path) {
      return path.replace(/http(s)?:/, '');
    }
  }, {
    key: "getEndpoint",
    value: function getEndpoint(endpoint) {
      if (endpoint.includes('?')) {
        return "".concat(endpoint, "&v=").concat(Math.random());
      } else {
        return "".concat(endpoint, "?v=").concat(Math.random());
      }
    }
  }, {
    key: "nextFrame",
    value: function nextFrame(callback) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(callback);
      });
    }
  }, {
    key: "slideDown",
    value: function slideDown(elem, mainElem) {
      var scrollHeight = elem.scrollHeight;
      mainElem.classList.add('open');
      elem.classList.add('open');
      elem.dataset.transitioning = true;

      var openEvent = function openEvent(e) {
        if (e.propertyName === 'max-height' && mainElem.classList.contains('open')) {
          elem.dataset.transitioning = false;
          elem.style.maxHeight = 'none';
          elem.classList.add('open--finished');
          elem.removeEventListener('transitionend', openEvent, false);
        }
      };

      elem.addEventListener('transitionend', openEvent, false);
      Helpers.nextFrame(function () {
        elem.style.maxHeight = "".concat(scrollHeight, "px");
      });
    }
  }, {
    key: "getSiblings",
    value: function getSiblings(elem) {
      return Array.from(elem.parentNode.children).filter(function (sibling) {
        return sibling !== elem;
      });
    }
  }, {
    key: "slideUp",
    value: function slideUp(elem, mainElem) {
      elem.style.maxHeight = "".concat(elem.scrollHeight, "px");
      mainElem.classList.remove('open');
      elem.dataset.transitioning = true;
      elem.classList.remove('open');
      elem.classList.remove('open--finished');

      var closeEvent = function closeEvent(e) {
        if (e.propertyName === 'max-height' && !mainElem.classList.contains('open')) {
          elem.dataset.transitioning = false;
          elem.removeEventListener('transitionend', closeEvent, false);
        }
      };

      elem.addEventListener('transitionend', closeEvent, false);
      Helpers.nextFrame(function () {
        elem.style.maxHeight = "0px";
      });
    }
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard(str) {
      var el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  }]);

  return Helpers;
}();



/***/ }),

/***/ "./src/resources/styles/ffc.scss":
/*!***************************************!*\
  !*** ./src/resources/styles/ffc.scss ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "ffc.css.liquid");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
