"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _errorHandler = _interopRequireDefault(require("../helpers/errorHandler"));

var _Model = _interopRequireDefault(require("../models/Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var JWT_SECRET = process.env.JWT_SECRET;
var db = new _Model["default"]();

var AuthMiddleware =
/*#__PURE__*/
function () {
  function AuthMiddleware() {
    _classCallCheck(this, AuthMiddleware);
  }

  _createClass(AuthMiddleware, null, [{
    key: "generateToken",
    value: function () {
      var _generateToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _jsonwebtoken["default"].sign({
                  check: true
                }, JWT_SECRET, {
                  expiresIn: 43200
                });

              case 3:
                token = _context.sent;
                req.data = _objectSpread({}, req.data, {
                  token: token
                });
                return _context.abrupt("return", next());

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _errorHandler["default"])(res, _context.t0.message, 500));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function generateToken(_x, _x2, _x3) {
        return _generateToken.apply(this, arguments);
      }

      return generateToken;
    }()
  }, {
    key: "validateToken",
    value: function () {
      var _validateToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                token = req.headers['access-token'];

                if (!token) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return _jsonwebtoken["default"].verify(token, JWT_SECRET, function (err, decoded) {
                  if (err || !decoded || !decoded.check) return (0, _errorHandler["default"])(res, 'Invalid Token', 401);
                  return next();
                });

              case 5:
                _context2.next = 8;
                break;

              case 7:
                return _context2.abrupt("return", (0, _errorHandler["default"])(res, 'Token Not Found', 401));

              case 8:
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", (0, _errorHandler["default"])(res, _context2.t0.message, 500));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function validateToken(_x4, _x5, _x6) {
        return _validateToken.apply(this, arguments);
      }

      return validateToken;
    }()
  }, {
    key: "checkIfUserIsAdmin",
    value: function () {
      var _checkIfUserIsAdmin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var user_id, _ref, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                user_id = req.body.user_id;
                _context3.next = 4;
                return db.query('SELECT * FROM users WHERE id = $1', [user_id]);

              case 4:
                _ref = _context3.sent;
                rows = _ref.rows;

                if (!(rows.length < 1 || !rows[0].is_admin)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", (0, _errorHandler["default"])(res, 'Access Denied', 401));

              case 8:
                return _context3.abrupt("return", next());

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", (0, _errorHandler["default"])(res, _context3.t0.message, 500));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function checkIfUserIsAdmin(_x7, _x8, _x9) {
        return _checkIfUserIsAdmin.apply(this, arguments);
      }

      return checkIfUserIsAdmin;
    }()
  }]);

  return AuthMiddleware;
}();

exports["default"] = AuthMiddleware;