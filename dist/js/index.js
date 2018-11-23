/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./src/css/style.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader!./src/css/style.css ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/style.css?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader!./style.css */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./src/css/style.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/css/style.css?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_style_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ \"./src/js/search.js\");\n/* harmony import */ var _resize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resize */ \"./src/js/resize.js\");\n\n\n\n\n\n/* Init Content */\n(function createWrapper() {\n  const wrapper = document.createElement('div');\n\n  wrapper.id = 'wrapper';\n  wrapper.innerHTML = `<header>\n    <div class=\"search-bar\">\n      <form method=\"get\">\n      <input type=\"search\" autofocus=\"autofocus\" autocomplete=\"off\" placeholder=\"Search\">\n      </form>\n    </div>\n  </header>\n  <div class=\"content\">\n    <div class=\"slider\"></div>\n  </div>\n  <nav class=\"navigation\"></nav>`;\n\n  document.body.prepend(wrapper);\n}());\n\n_search__WEBPACK_IMPORTED_MODULE_1__[\"listen\"]();\n_resize__WEBPACK_IMPORTED_MODULE_2__[\"resize\"]();\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/navigations.js":
/*!*******************************!*\
  !*** ./src/js/navigations.js ***!
  \*******************************/
/*! exports provided: generate, dotted */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generate\", function() { return generate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dotted\", function() { return dotted; });\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ \"./src/js/settings.js\");\n/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ \"./src/js/transform.js\");\n/* eslint-disable import/no-cycle */\n\n\n\n\n/* Set Active Navigation without click */\n/* is slider visible? --> set active navigation */\n/* use in function generate () */\nfunction setNavigation() {\n  const slider = document.querySelectorAll('.slider > div');\n\n  // window_controll.height = window.height - header.height - nav.height\n  const header = document.querySelector('header');\n  const nav = document.querySelector('nav');\n  const waste = header.offsetHeight + nav.offsetHeight;\n\n  // get position of window_controll\n  const windowPosition = {\n    top: window.pageYOffset + waste,\n    left: window.pageXOffset,\n    right: window.pageXOffset + document.documentElement.clientWidth,\n    bottom: window.pageYOffset + document.documentElement.clientHeight - waste,\n  };\n\n  for (let i = 0; i < slider.length; i += 1) {\n    // get position of slider\n    const sliderPosition = {\n      top: window.pageYOffset + slider[i].getBoundingClientRect().top,\n      left: window.pageXOffset + slider[i].getBoundingClientRect().left,\n      right: window.pageXOffset + slider[i].getBoundingClientRect().right,\n      bottom: window.pageYOffset + slider[i].getBoundingClientRect().bottom,\n    };\n\n    // is slider visible? -> it's active navigation\n    if (\n      sliderPosition.bottom > windowPosition.top\n      && sliderPosition.top < windowPosition.bottom\n      && sliderPosition.right > windowPosition.left\n      && sliderPosition.left < windowPosition.right\n    ) {\n      // set navigation.data-href = slider.id\n      const sliderId = `${slider[i].id}`;\n      const navigation = document.querySelectorAll('nav > a');\n\n      for (let j = 0; j < navigation.length; j += 1) {\n        if (navigation[j].dataset.href === sliderId) {\n          navigation[j].className = 'active';\n        }\n      }\n\n      document.querySelector('.active').click();\n    }\n  }\n}\n\n\n/* Generate Navigation */\nconst generate = function generateNavigation() {\n  // delete navigation\n  if (document.querySelector('nav')) {\n    document.querySelector('nav').innerHTML = '';\n  }\n\n  // number of slider\n  const countSlider = Math.floor(document.body.querySelector('#wrapper').clientWidth / _settings__WEBPACK_IMPORTED_MODULE_0__[\"GLOBAL_BLOCK_SETTING\"]);\n\n  // number of navigation\n  const countNavigation = Math.ceil(_settings__WEBPACK_IMPORTED_MODULE_0__[\"idStorage\"].length / countSlider);\n\n  // set id to navigation\n  const navigationId = [];\n  for (let i = 0; i < _settings__WEBPACK_IMPORTED_MODULE_0__[\"idStorage\"].length; i += countSlider) {\n    navigationId.push(_settings__WEBPACK_IMPORTED_MODULE_0__[\"idStorage\"][i]);\n  }\n\n  // show navigation\n  for (let i = 0; i < countNavigation; i += 1) {\n    const navigation = `<a data-href=\"${navigationId[i]}\">${i + 1}</a>`;\n    document.querySelector('nav').innerHTML += navigation;\n  }\n\n  // set active navigation when we click on the last buttom\n  if (_transform__WEBPACK_IMPORTED_MODULE_1__[\"isContinue\"].continue === true) {\n    const dataHref = _transform__WEBPACK_IMPORTED_MODULE_1__[\"isContinue\"].position.dataset.href;\n    const navigation = document.querySelector(`a[data-href=\"${dataHref}\"]`);\n    navigation.className = 'active';\n  }\n\n  setNavigation();\n\n  navigationId.length = 0;\n  _transform__WEBPACK_IMPORTED_MODULE_1__[\"isContinue\"].continue = false;\n};\n\n\n/* Dotted Navigation */\nconst dotted = function dottedNavigation() {\n  const navigation = document.querySelectorAll('nav > a');\n  const active = document.querySelector('nav > .active');\n\n  const firstNavigation = document.querySelector('nav').firstChild;\n  const lastNavigation = document.querySelector('nav').lastChild;\n\n  const nextNavigation = active.nextSibling || active;\n  const prevNavigation = active.previousSibling || active;\n\n  for (let i = 0; i < navigation.length; i += 1) {\n    navigation[i].classList.add('hide');\n  }\n\n  firstNavigation.classList.remove('hide');\n  lastNavigation.classList.remove('hide');\n  active.classList.remove('hide');\n\n  firstNavigation.classList.add('first-navigation');\n  lastNavigation.classList.add('last-navigation');\n\n  nextNavigation.classList.remove('hide');\n  prevNavigation.classList.remove('hide');\n\n  if (lastNavigation === active\n    || lastNavigation.previousSibling === active\n    || lastNavigation.previousSibling.previousSibling === active) {\n    lastNavigation.classList.remove('last-navigation');\n  }\n\n  if (firstNavigation === active || firstNavigation.nextSibling === active\n    || firstNavigation.nextSibling.nextSibling === active) {\n    firstNavigation.classList.remove('first-navigation');\n  }\n\n  if (firstNavigation === active) {\n    nextNavigation.classList.remove('hide');\n    if (nextNavigation.nextSibling !== null) {\n      nextNavigation.nextSibling.classList.remove('hide');\n      if (nextNavigation.nextSibling.nextSibling !== null) {\n        nextNavigation.nextSibling.nextSibling.classList.remove('hide');\n      }\n    }\n  }\n\n  if (firstNavigation.nextSibling === active) {\n    if (nextNavigation.nextSibling !== null) {\n      nextNavigation.nextSibling.classList.remove('hide');\n    }\n  }\n\n  if (lastNavigation === active) {\n    prevNavigation.classList.remove('hide');\n    if (prevNavigation.previousSibling !== null) {\n      prevNavigation.previousSibling.classList.remove('hide');\n      if (prevNavigation.previousSibling.previousSibling !== null) {\n        prevNavigation.previousSibling.previousSibling.classList.remove('hide');\n      }\n    }\n  }\n\n  if (lastNavigation.previousSibling === active) {\n    if (prevNavigation.previousSibling !== null) {\n      prevNavigation.previousSibling.classList.remove('hide');\n    }\n  }\n\n  if (navigation.length <= 5) {\n    firstNavigation.classList.remove('first-navigation');\n    lastNavigation.classList.remove('last-navigation');\n  }\n};\n\n\n//# sourceURL=webpack:///./src/js/navigations.js?");

/***/ }),

/***/ "./src/js/resize.js":
/*!**************************!*\
  !*** ./src/js/resize.js ***!
  \**************************/
/*! exports provided: resize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resize\", function() { return resize; });\n/* harmony import */ var _navigations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigations */ \"./src/js/navigations.js\");\n\n\n\n/* Listen on resize Window */\n// eslint-disable-next-line import/prefer-default-export\nfunction resize() {\n  window.onresize = () => {\n  // if slider generated -> generate navigation\n    if (document.querySelector('.slider').children.length > 0) {\n      _navigations__WEBPACK_IMPORTED_MODULE_0__[\"generate\"]();\n      _navigations__WEBPACK_IMPORTED_MODULE_0__[\"dotted\"]();\n    }\n  };\n}\n\n\n//# sourceURL=webpack:///./src/js/resize.js?");

/***/ }),

/***/ "./src/js/search.js":
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
/*! exports provided: listen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"listen\", function() { return listen; });\n/* harmony import */ var _sliders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliders */ \"./src/js/sliders.js\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/js/settings.js\");\n/* eslint-disable import/prefer-default-export */\n\n\n\n\n/* Listen search Form */\nfunction listen() {\n  const form = document.querySelector('form');\n\n  form.addEventListener('submit', (event) => {\n    event.preventDefault();\n    if (!form[0].value.match(/^[=!а-яА-ЯёЁa-zA-Z0-9-+ ]+$/)) {\n      document.querySelector('.search-bar').classList.add('search-bar__error');\n    } else {\n      document.querySelector('.search-bar').classList.remove('search-bar__error');\n      _sliders__WEBPACK_IMPORTED_MODULE_0__[\"remove\"]();\n      _settings__WEBPACK_IMPORTED_MODULE_1__[\"idStorage\"].length = 0;\n      _settings__WEBPACK_IMPORTED_MODULE_1__[\"nextToken\"].length = 1;\n      _sliders__WEBPACK_IMPORTED_MODULE_0__[\"render\"]();\n    }\n  });\n}\n\n\n//# sourceURL=webpack:///./src/js/search.js?");

/***/ }),

/***/ "./src/js/settings.js":
/*!****************************!*\
  !*** ./src/js/settings.js ***!
  \****************************/
/*! exports provided: MAX_RESULT, GLOBAL_BLOCK_SETTING, apiKey, url, idStorage, nextToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAX_RESULT\", function() { return MAX_RESULT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GLOBAL_BLOCK_SETTING\", function() { return GLOBAL_BLOCK_SETTING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"apiKey\", function() { return apiKey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"url\", function() { return url; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"idStorage\", function() { return idStorage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nextToken\", function() { return nextToken; });\n// set max results of blocks\nconst MAX_RESULT = 15;\n\n// width of slider\nconst GLOBAL_BLOCK_SETTING = 340;\n\n// api key\nconst apiKey = 'AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY';\n\n// url\nconst url = 'https://www.googleapis.com/youtube/v3';\n\n// id saved in the idStorage --> using in navigation etc.\nconst idStorage = [];\n\n// nextToken\nconst nextToken = [''];\n\n\n//# sourceURL=webpack:///./src/js/settings.js?");

/***/ }),

/***/ "./src/js/sliders.js":
/*!***************************!*\
  !*** ./src/js/sliders.js ***!
  \***************************/
/*! exports provided: render, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"remove\", function() { return remove; });\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ \"./src/js/settings.js\");\n/* harmony import */ var _navigations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigations */ \"./src/js/navigations.js\");\n/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transform */ \"./src/js/transform.js\");\n\n\n\n\n/* Search Result */\nfunction render() {\n  const next = _settings__WEBPACK_IMPORTED_MODULE_0__[\"nextToken\"];\n  const nextPage = next[next.length - 1];\n\n  // user search phrase\n  const searchValue = document.querySelector('form')[0].value;\n\n  // send response to api\n  fetch(`${_settings__WEBPACK_IMPORTED_MODULE_0__[\"url\"]}/search?key=${_settings__WEBPACK_IMPORTED_MODULE_0__[\"apiKey\"]}&type=video&part=snippet&maxResults=${_settings__WEBPACK_IMPORTED_MODULE_0__[\"MAX_RESULT\"]}&pageToken=${nextPage}&q=${searchValue}`)\n    .then(response => response.json())\n\n    .then((sliderBlock) => {\n      let range;\n\n      // temporary id storage for the current request\n      const temporaryIdStorage = [];\n      _settings__WEBPACK_IMPORTED_MODULE_0__[\"nextToken\"].push(sliderBlock.nextPageToken);\n\n\n      // if search result != MAX_RESULT\n      if (sliderBlock.pageInfo.totalResults >= _settings__WEBPACK_IMPORTED_MODULE_0__[\"MAX_RESULT\"]) {\n        range = _settings__WEBPACK_IMPORTED_MODULE_0__[\"MAX_RESULT\"];\n      } else {\n        range = sliderBlock.pageInfo.totalResults;\n      }\n\n      for (let i = 0; i < range; i += 1) {\n        if (sliderBlock.items[i].id.videoId) {\n          _settings__WEBPACK_IMPORTED_MODULE_0__[\"idStorage\"].push(sliderBlock.items[i].id.videoId);\n          temporaryIdStorage.push(sliderBlock.items[i].id.videoId);\n        }\n      }\n\n\n      fetch(`${_settings__WEBPACK_IMPORTED_MODULE_0__[\"url\"]}/videos?key=${_settings__WEBPACK_IMPORTED_MODULE_0__[\"apiKey\"]}&id=${[...temporaryIdStorage]}&part=snippet,statistics`)\n        .then(res => res.json())\n        .then((reviewCount) => {\n          for (let i = 0; i < range; i += 1) {\n            // create blocks\n            document.querySelector('.slider').innerHTML += `<div id=\"${sliderBlock.items[i].id.videoId}\">\n        <img src=\"${sliderBlock.items[i].snippet.thumbnails.high.url}\" alt=\"\">\n        <a href=\"//www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}\" target=\"_blank\" title=\"${sliderBlock.items[i].snippet.title}\">${sliderBlock.items[i].snippet.title}</a>\n        <ul>\n          <li>${sliderBlock.items[i].snippet.channelTitle}</li>\n          <li>${sliderBlock.items[i].snippet.publishedAt.substring(0, 10)}</li>\n          <li>${reviewCount.items[i].statistics.viewCount}</li>\n        </ul>\n        <p>${sliderBlock.items[i].snippet.description}</p>\n        </div>`;\n          }\n\n          // clear temporary storage after we used render\n          // id saved in the settings.idStorage --> using in navigation etc.\n          temporaryIdStorage.length = 0;\n\n          _navigations__WEBPACK_IMPORTED_MODULE_1__[\"generate\"]();\n          _transform__WEBPACK_IMPORTED_MODULE_2__[\"clickNavigation\"]();\n          _transform__WEBPACK_IMPORTED_MODULE_2__[\"clickSlider\"]();\n          _transform__WEBPACK_IMPORTED_MODULE_2__[\"touchSlider\"]();\n          _navigations__WEBPACK_IMPORTED_MODULE_1__[\"dotted\"]();\n        });\n    });\n}\n\n\n/* Delete Slider */\nconst remove = () => {\n  document.querySelector('.slider').innerHTML = '';\n};\n\n\n//# sourceURL=webpack:///./src/js/sliders.js?");

/***/ }),

/***/ "./src/js/transform.js":
/*!*****************************!*\
  !*** ./src/js/transform.js ***!
  \*****************************/
/*! exports provided: isContinue, clickSlider, clickNavigation, touchSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isContinue\", function() { return isContinue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clickSlider\", function() { return clickSlider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clickNavigation\", function() { return clickNavigation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"touchSlider\", function() { return touchSlider; });\n/* harmony import */ var _navigations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigations */ \"./src/js/navigations.js\");\n/* harmony import */ var _sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sliders */ \"./src/js/sliders.js\");\n/* eslint-disable import/no-cycle */\n\n\n\n\nconst isContinue = {\n  continue: false,\n  position: '',\n};\n\n/* Transform Slider on click Slider */\nfunction clickSlider() {\n  const slider = document.querySelector('.slider');\n\n  function listenSlider(clickStartLocation) {\n    slider.onmouseup = (event) => {\n      const clickEndLocation = event.pageX;\n      const distance = clickEndLocation - clickStartLocation;\n\n      if (distance < 0 && Math.abs(distance) > 100 && event.which === 1) {\n        if (document.querySelector('nav > .active').nextSibling) {\n          document.querySelector('nav > .active').nextSibling.click();\n        }\n      }\n\n      if (distance > 0 && Math.abs(distance) > 100 && event.which === 1) {\n        if (document.querySelector('nav > .active').previousSibling) {\n          document.querySelector('nav > .active').previousSibling.click();\n        }\n      }\n\n      _navigations__WEBPACK_IMPORTED_MODULE_0__[\"dotted\"]();\n    };\n  }\n\n  slider.onmousedown = (event) => {\n    const clickStartLocation = event.pageX;\n    listenSlider(clickStartLocation);\n  };\n}\n\n\n/* Transform Slider on click Navigation */\nfunction clickNavigation() {\n  const navigation = document.querySelector('nav');\n\n  const transformSlider = (elementNavigation) => {\n    // current active\n    const currentNavigation = document.querySelector('.active');\n    // reset all styles\n    const allNavigation = document.querySelectorAll('.active');\n\n    for (let i = 0; i < allNavigation.length; i += 1) {\n      allNavigation[i].classList.remove('active');\n    }\n\n    // new active\n    elementNavigation.classList.add('active');\n    function transformTo(where) {\n      const div = document.querySelector('.slider');\n      div.classList.add(`to-${where}`);\n      setTimeout(() => {\n        div.classList.remove(`to-${where}`);\n      }, 1000);\n    }\n\n    // new active > old active? -> transform (to Left or to Right)\n    if (Number(elementNavigation.innerText) > Number(currentNavigation.innerText)) {\n      transformTo('left');\n    }\n    if (Number(elementNavigation.innerText) < Number(currentNavigation.innerText)) {\n      transformTo('right');\n    }\n  };\n\n  if (navigation) {\n    navigation.onclick = (event) => {\n      const elementNavigation = event.target;\n      if (elementNavigation.tagName === 'A') {\n        transformSlider(elementNavigation);\n        _navigations__WEBPACK_IMPORTED_MODULE_0__[\"dotted\"]();\n\n        // it's an alternative to use href=\"#\"\n        // we're using attribute data-href=\"...\", so we have a clear window.location.href\n        const id = elementNavigation.dataset.href;\n        document.getElementById(id).scrollIntoView(true);\n\n        // if we ckick on the last navigation -> loading sliders\n        if (elementNavigation === document.querySelector('nav').lastElementChild) {\n          isContinue.continue = true;\n          isContinue.position = elementNavigation;\n\n          _sliders__WEBPACK_IMPORTED_MODULE_1__[\"render\"]();\n        }\n      }\n    };\n  }\n}\n\n\n/* Transform Slider on touch Slider */\nfunction touchSlider() {\n  let initialPoint;\n\n  const slider = document.querySelector('.slider');\n\n  slider.ontouchstart = (event) => {\n    const startPoint = event.changedTouches[0];\n    initialPoint = startPoint;\n  };\n\n  slider.ontouchend = (event) => {\n    const finalPoint = event.changedTouches[0];\n\n    const distance = Math.abs(initialPoint.pageX - finalPoint.pageX);\n\n    if (distance > 20) {\n      if (finalPoint.pageX < initialPoint.pageX) {\n        if (document.querySelector('nav > .active').nextSibling) {\n          document.querySelector('nav > .active').nextSibling.click();\n        }\n      } else if (document.querySelector('nav > .active').previousSibling) {\n        document.querySelector('nav > .active').previousSibling.click();\n      }\n    }\n  };\n}\n\n\n//# sourceURL=webpack:///./src/js/transform.js?");

/***/ })

/******/ });