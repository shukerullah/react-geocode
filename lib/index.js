"use strict";
let regeneratorRuntime = require("regenerator-runtime");
Object.defineProperty(exports, "__esModule", {
  value: true
});

var handleUrl = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var response, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url).catch(function (error) {
              return Promise.reject(new Error("Error fetching data"));
            });

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json().catch(function () {
              log("Error parsing server response");
              return Promise.reject(new Error("Error parsing server response"));
            });

          case 5:
            json = _context.sent;

            if (!(json.status === "OK")) {
              _context.next = 9;
              break;
            }

            log(json);
            return _context.abrupt("return", json);

          case 9:
            log("Server returned status code " + json.status, true);
            return _context.abrupt("return", Promise.reject(new Error("Server returned status code " + json.status)));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function handleUrl(_x2) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Geocode Module
 *
 * @package react-geocode
 * @author  Pir Shukarulalh Shah <shuker_rashdi@hotmail.com> (http://www.shukarullah.com)
 */

var DEBUG = false;
var API_KEY = null;
var GOOGLE_API = "https://maps.google.com/maps/api/geocode/json";

function log(message) {
  var warn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (DEBUG) {
    if (warn) {
      console.warn(message);
    } else {
      console.log(message);
    }
  }
}

exports.default = {
  /**
   *
   *
   * @param {string} apiKey
   */
  setApiKey: function setApiKey(apiKey) {
    API_KEY = apiKey;
  },


  /**
   *
   *
   * @param {boolean} [flag=true]
   */
  enableDebug: function enableDebug() {
    var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    DEBUG = flag;
  },


  /**
   *
   *
   * @param {string} lat
   * @param {string} lng
   * @param {string} [apiKey]
   * @returns {Promise}
   */
  fromLatLng: function fromLatLng(lat, lng, apiKey) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var latLng, url;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!lat || !lng)) {
                _context2.next = 3;
                break;
              }

              log("Provided coordinates are invalid", true);
              return _context2.abrupt("return", Promise.reject(new Error("Provided coordinates are invalid")));

            case 3:
              latLng = lat + "," + lng;
              url = GOOGLE_API + "?latlng=" + encodeURI(latLng);


              if (apiKey || API_KEY) {
                API_KEY = apiKey || API_KEY;
                url += "&key=" + API_KEY;
              }

              return _context2.abrupt("return", handleUrl(url));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }))();
  },


  /**
   *
   *
   * @param {string} address
   * @param {string} [apiKey]
   * @returns {Promise}
   */
  fromAddress: function fromAddress(address, apiKey) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var url;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (address) {
                _context3.next = 3;
                break;
              }

              log("Provided address is invalid", true);
              return _context3.abrupt("return", Promise.reject(new Error("Provided address is invalid")));

            case 3:
              url = GOOGLE_API + "?address=" + encodeURI(address);


              if (apiKey || API_KEY) {
                API_KEY = apiKey || API_KEY;
                url += "&key=" + API_KEY;
              }

              return _context3.abrupt("return", handleUrl(url));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }))();
  }
};
