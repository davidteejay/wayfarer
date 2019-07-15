"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Model = _interopRequireDefault(require("../models/Model"));

var _errorHandler = _interopRequireDefault(require("../helpers/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = new _Model["default"]();

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, email, password, token, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                token = req.data.token;
                _context.next = 5;
                return db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

              case 5:
                _ref = _context.sent;
                rows = _ref.rows;

                if (!(rows.length > 0)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  data: _objectSpread({}, rows[0], {
                    token: token
                  }),
                  status: 'success'
                }));

              case 9:
                return _context.abrupt("return", (0, _errorHandler["default"])(res, 'Email or Password is incorrect', 404));

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _errorHandler["default"])(res, _context.t0.message, 500));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
      }));

      function signIn(_x, _x2) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }, {
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, first_name, last_name, email, password, token, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, first_name = _req$body2.first_name, last_name = _req$body2.last_name, email = _req$body2.email, password = _req$body2.password;
                token = req.data.token;
                _context2.next = 5;
                return db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, password]);

              case 5:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", res.status(200).json({
                  data: _objectSpread({}, rows[0], {
                    token: token
                  }),
                  status: 'success'
                }));

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

      function signUp(_x3, _x4) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }]);

  return UserController;
}();

exports["default"] = UserController;