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

var BookingMiddleware =
/*#__PURE__*/
function () {
  function BookingMiddleware() {
    _classCallCheck(this, BookingMiddleware);
  }

  _createClass(BookingMiddleware, null, [{
    key: "validateData",
    value: function () {
      var _validateData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, user_id, trip_id;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, user_id = _req$body.user_id, trip_id = _req$body.trip_id;

                if (!(!user_id || !trip_id)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", (0, _errorHandler["default"])(res, 'Incomplete booking data', 401));

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

      function validateData(_x, _x2, _x3) {
        return _validateData.apply(this, arguments);
      }

      return validateData;
    }()
  }, {
    key: "checkIfSeatIsTaken",
    value: function () {
      var _checkIfSeatIsTaken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var _req$body2, seat_number, trip_id, _ref, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, seat_number = _req$body2.seat_number, trip_id = _req$body2.trip_id;

                if (!seat_number) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 5;
                return db.query('SELECT * FROM bookings WHERE seat_number = $1 AND trip_id = $2', [seat_number, trip_id]);

              case 5:
                _ref = _context2.sent;
                rows = _ref.rows;

                if (!(rows.length > 0)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", (0, _errorHandler["default"])(res, 'This seat is already taken', 401));

              case 9:
                return _context2.abrupt("return", next());

              case 10:
                return _context2.abrupt("return", next());

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", (0, _errorHandler["default"])(res, _context2.t0.message, 500));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));

      function checkIfSeatIsTaken(_x4, _x5, _x6) {
        return _checkIfSeatIsTaken.apply(this, arguments);
      }

      return checkIfSeatIsTaken;
    }()
  }, {
    key: "checkIfUserHasBooked",
    value: function () {
      var _checkIfUserHasBooked = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var _req$body3, trip_id, user_id, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$body3 = req.body, trip_id = _req$body3.trip_id, user_id = _req$body3.user_id;
                _context3.next = 4;
                return db.query('SELECT * FROM bookings WHERE trip_id = $1 AND user_id = $2', [trip_id, user_id]);

              case 4:
                _ref2 = _context3.sent;
                rows = _ref2.rows;

                if (!(rows.length > 0)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", (0, _errorHandler["default"])(res, 'You have already booked this trip', 401));

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

      function checkIfUserHasBooked(_x7, _x8, _x9) {
        return _checkIfUserHasBooked.apply(this, arguments);
      }

      return checkIfUserHasBooked;
    }()
  }, {
    key: "checkIfUserIsAdmin",
    value: function () {
      var _checkIfUserIsAdmin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res, next) {
        var user_id, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                user_id = req.body.user_id;

                if (user_id) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return", (0, _errorHandler["default"])(res, 'User ID not specified', 404));

              case 4:
                _context4.next = 6;
                return db.query('SELECT * FROM users WHERE id = $1', [user_id]);

              case 6:
                _ref3 = _context4.sent;
                rows = _ref3.rows;
                req.data = {
                  is_admin: rows[0].is_admin
                };
                return _context4.abrupt("return", next());

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", (0, _errorHandler["default"])(res, _context4.t0.message, 500));

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      function checkIfUserIsAdmin(_x10, _x11, _x12) {
        return _checkIfUserIsAdmin.apply(this, arguments);
      }

      return checkIfUserIsAdmin;
    }()
  }, {
    key: "checkIfUserHasBooking",
    value: function () {
      var _checkIfUserHasBooking = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res, next) {
        var user_id, booking_id, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                user_id = req.body.user_id;
                booking_id = req.params.booking_id;
                _context5.next = 5;
                return db.query('SELECT * FROM bookings WHERE user_id = $1 AND id = $2', [user_id, booking_id]);

              case 5:
                _ref4 = _context5.sent;
                rows = _ref4.rows;

                if (!(rows.length < 1)) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", (0, _errorHandler["default"])(res, 'Booking not found', 404));

              case 9:
                return _context5.abrupt("return", next());

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", (0, _errorHandler["default"])(res, _context5.t0.message, 500));

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 12]]);
      }));

      function checkIfUserHasBooking(_x13, _x14, _x15) {
        return _checkIfUserHasBooking.apply(this, arguments);
      }

      return checkIfUserHasBooking;
    }()
  }]);

  return BookingMiddleware;
}();

exports["default"] = BookingMiddleware;