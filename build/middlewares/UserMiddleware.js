"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Model = _interopRequireDefault(require("../models/Model"));

var _errorHandler = _interopRequireDefault(require("../helpers/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = new _Model["default"]();

var UserMiddleware =
/*#__PURE__*/
function () {
  function UserMiddleware() {
    _classCallCheck(this, UserMiddleware);
  }

  _createClass(UserMiddleware, null, [{
    key: "validateUserData",
    value: function () {
      var _validateUserData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, first_name, last_name, email, password;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, email = _req$body.email, password = _req$body.password;

                if (!(!first_name || !last_name || !password || !email)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", (0, _errorHandler["default"])(res, 'Incomplete user data', 401));

              case 4:
                return _context.abrupt("return", next());

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _errorHandler["default"])(res, _context.t0.message, 500));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function validateUserData(_x, _x2, _x3) {
        return _validateUserData.apply(this, arguments);
      }

      return validateUserData;
    }()
  }, {
    key: "checkIfEmailExists",
    value: function () {
      var _checkIfEmailExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var email, _ref, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                email = req.body.email;
                _context2.next = 4;
                return db.query('SELECT * FROM users WHERE email = $1', [email]);

              case 4:
                _ref = _context2.sent;
                rows = _ref.rows;

                if (!(rows.length > 0)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", (0, _errorHandler["default"])(res, 'Email already exists', 401));

              case 8:
                return _context2.abrupt("return", next());

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", (0, _errorHandler["default"])(res, _context2.t0.message, 500));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function checkIfEmailExists(_x4, _x5, _x6) {
        return _checkIfEmailExists.apply(this, arguments);
      }

      return checkIfEmailExists;
    }()
  }]);

  return UserMiddleware;
}();

exports["default"] = UserMiddleware;