"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = multipleFonts;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function createElement(type, text, font) {
  var element = document.createElement(type);
  element.style.fontFamily = font;
  element.innerHTML = text;
  return element;
}

function multipleFonts(options) {
  var _options$mainElement = options.mainElement,
      mainElement = _options$mainElement === void 0 ? 'div' : _options$mainElement,
      searchByRegex = options.searchByRegex,
      splitByChar = options.splitByChar,
      _options$multiple = options.multiple,
      multiple = _options$multiple === void 0 ? [] : _options$multiple;
  var text = options.text;
  var ERRORS = {
    notText: 'Error. text parameter not specified.',
    notParamSplitRegex: 'Error. Not parameters splitByChar or searchByRegex specified.',
    notSearchByRegexObject: 'Error. searchByRegex parameter is not a regex expression.',
    notMultipleFonts: 'Error. Not font specified, add one font in multiple[] parameter.'
  };
  var newText;
  var backupText = [];
  var lengthNewText = 0;
  var main = '';

  if (typeof mainElement === 'string') {
    main = document.createElement(mainElement);
  } else {
    main = mainElement;
    text = main.textContent.trim();
  }

  main.innerHTML = '';

  if (text) {
    if (searchByRegex) {
      if (_typeof(searchByRegex) !== 'object') {
        newText = [ERRORS.notSearchByRegexObject];
      } else {
        newText = text.replace(searchByRegex, '|-@|-').split(/\|-/); // If not match searchByRegex return same text

        newText = newText.length === 1 ? [text] : newText;
        lengthNewText = newText.length - 1;
        var match = /\/(.+)\//g.exec(String(searchByRegex));
        backupText = newText.length === 1 ? [text] : [match[1]];
      }
    } else if (splitByChar && !searchByRegex) {
      // If not match splitByChar, split function return the same text in an array
      newText = text.split(splitByChar);
      lengthNewText = newText.length - 1;

      if (multiple.length > 0 && newText.length > 1) {
        // Determining the text to make it backup
        // Checking that font position is not more than length of multiple[]
        multiple.map(function (font) {
          return backupText.push(newText[Math.min(font.pos, lengthNewText)]);
        }); // Determining the position to make replace with @
        // Checking that font position is not more than length of multiple[]

        multiple.map(function (font) {
          return newText.splice(Math.min(font.pos, lengthNewText), 1, '@');
        });
      }
    } else {
      newText = [ERRORS.notParamSplitRegex];
    }
  } else if (!text) {
    newText = [ERRORS.notText];
  }

  if (newText.length > 1 && multiple.length > 0) {
    var keysMatchReplace = []; // Saving positions of matches @

    newText.map(function (v, i) {
      return v === '@' ? keysMatchReplace.push(i) : null;
    });
    var font = '';
    var positionBackup = 0; //  Getting the indices of matches @

    keysMatchReplace.forEach(function (value, index) {
      // Determining indice of backupText to show
      // Can be many many matches @ but only one backuptext
      positionBackup = Math.min(backupText.length - 1, index); // Can be many matches @ but only one font

      font = multiple[Math.min(multiple.length - 1, index)];
      newText.splice(value, // Position of the match
      1, createElement(font.returnTag, backupText[positionBackup], font.font));
    });
  } else if (multiple.length === 0) {
    newText = [ERRORS.notMultipleFonts];
  }

  newText.forEach(function (ele) {
    main.append(ele);
    main.append(' ');
  });
  return main;
}