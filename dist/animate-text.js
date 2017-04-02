(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("AnimateText", [], factory);
	else if(typeof exports === 'object')
		exports["AnimateText"] = factory();
	else
		root["AnimateText"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.checkNode = checkNode;
function checkNode(el) {
  var result = el;
  if (!result) {
    return console.error('找不到当前节点', el);
  }
  if (typeof el === 'string') {
    var domName = el;
    result = document.querySelector(domName);
    if (!result) {
      return console.error('找不到当前节点', el);
    }
  } else if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object') {
    if (!el.nodeName) {
      return console.error('找不到当前节点', el);
    }
  }
  return result;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(2);

function showWarn(str) {
  console.warn(str + ' 请参考相关文档: ' + _config.DOCUMENT_ADDR);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DOCUMENT_ADDR = exports.DOCUMENT_ADDR = 'https://github.com/qgh810/animate-text';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = __webpack_require__(0);

var _log = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimateText = function () {
  function AnimateText(el, options) {
    _classCallCheck(this, AnimateText);

    this.initData(el, options) && this.init();
    this.play = this.play.bind(this);
  }

  /**
   * 检查和初始化传入参数
   */


  _createClass(AnimateText, [{
    key: 'initData',
    value: function initData(el, options) {
      this.el = (0, _check.checkNode)(el);
      if (!this.el) return;
      options = this.checkOptions(options);
      this.options = options;
      if (options.isNumber) {
        this.number = Number(this.el.innerText);
        if (!this.number && this.number !== 0) {
          this.options.isNumber = false;
          return this.initData(el, this.options);
        }
        this.startNumber = options.startNumber - 0 || 0;
        this.changeCount = options.changeCount - 0 || 24;
      } else {
        this.text = this.el.innerText;
        this.textArr = this.text.split('');
      }
      this.isNumber = options.isNumber;
      this.time = options.time;
      this.el.innerText = '';
      this.onAnimated = options.onAnimated;
      return true;
    }

    /**
     * 检查并且初始化options
     */

  }, {
    key: 'checkOptions',
    value: function checkOptions(options) {
      if (typeof options === 'number') options = { time: options };
      options = options || {};
      var baseOptions = {
        time: 500,
        isNumber: false,
        startNumber: 0,
        changeCount: 32,
        onAnimated: function onAnimated() {}
      };
      for (var option in baseOptions) {
        !options[option] && (options[option] = baseOptions[option]);
      }
      return options;
    }
  }, {
    key: 'init',
    value: function init() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.time;

      this.isNumber ? this.playNumberAnimation(time) : this.playTextAnimation(time);
    }
  }, {
    key: 'playTextAnimation',
    value: function playTextAnimation(time) {
      var _this = this;

      var textArr = [].concat(this.textArr);
      var currTextArr = [];
      this.tid = setInterval(function () {
        var word = textArr.shift();
        if (!word) {
          _this.onEnd();
          return clearInterval(_this.tid);
        }
        currTextArr.push(word);
        _this.el.innerText = currTextArr.join('');
      }, time / this.textArr.length);
    }
  }, {
    key: 'playNumberAnimation',
    value: function playNumberAnimation(time) {
      var _this2 = this;

      var changeCount = this.changeCount;
      var targetNumber = this.number;
      if (!targetNumber === 0) return;
      var targetNumberDecimalLength = this.getDecimalLength(targetNumber);
      var StartNumberDecimalLength = this.getDecimalLength(this.startNumber);
      var decimalLength = Math.max(targetNumberDecimalLength, StartNumberDecimalLength);
      var d = this.number - this.startNumber;
      var everyD = (d / changeCount).toFixed(decimalLength) - 0;
      if (everyD === 0) {
        (0, _log.showWarn)('差值过小无法动画');
        return this.el.innerText = targetNumber;
      }
      var currNumber = this.startNumber;
      this.tid = setInterval(function () {
        currNumber = (currNumber + everyD).toFixed(decimalLength) - 0;
        if (Math.abs(currNumber - targetNumber) < Math.abs(everyD)) {
          _this2.el.innerText = targetNumber;
          _this2.onEnd();
          return clearInterval(_this2.tid);
        }
        _this2.el.innerText = currNumber;
      }, time / changeCount);
    }
  }, {
    key: 'getDecimalLength',
    value: function getDecimalLength(number) {
      var numberStr = number + '';
      return numberStr.split('.')[1] && numberStr.split('.')[1].length || 0;
    }
  }, {
    key: 'play',
    value: function play() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.time;

      clearInterval(this.tid);
      this.el.innerText = this.isNumber ? this.number : this.text;
      var options = {
        time: this.time,
        isNumber: this.isNumber,
        startNumber: this.startNumber,
        changeCount: this.changeCount,
        onAnimated: this.onAnimated
      };
      this.initData(this.el, options) && this.init();
    }
  }, {
    key: 'onEnd',
    value: function onEnd() {
      var _this3 = this;

      var callBack = this.options.onAnimated;
      if (typeof callBack !== 'function') return;
      setTimeout(function () {
        _this3.options.onAnimated();
      }, 10);
    }
  }]);

  return AnimateText;
}();

module.exports = AnimateText;

/***/ })
/******/ ]);
});