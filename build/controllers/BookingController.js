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

var BookingController =
/*#__PURE__*/
function () {
  function BookingController() {
    _classCallCheck(this, BookingController);
  }

  _createClass(BookingController, null, [{
    key: "addBooking",
    value: function () {
      var _addBooking = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, user_id, trip_id, seat_number, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, user_id = _req$body.user_id, trip_id = _req$body.trip_id, seat_number = _req$body.seat_number;
                _context.next = 4;
                return db.query('INSERT INTO bookings (user_id, trip_id, seat_number) VALUES ($1, $2, $3) RETURNING *', [user_id, trip_id, seat_number]);

              case 4:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", res.status(200).json({
                  data: _objectSpread({}, rows[0]),
                  status: 'success'
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _errorHandler["default"])(res, _context.t0.message, 500));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function addBooking(_x, _x2) {
        return _addBooking.apply(this, arguments);
      }

      return addBooking;
    }()
  }, {
    key: "getBookings",
    value: function () {
      var _getBookings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var user_id, is_admin, query, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                user_id = req.body.user_id;
                is_admin = req.data.is_admin;
                query = '';
                values = [];
                if (is_admin) query = 'SELECT * FROM bookings JOIN trips ON trips.id = bookings.trip_id JOIN users ON bookings.user_id = users.id';else {
                  values = [user_id];
                  query = 'SELECT * FROM bookings JOIN trips ON trips.id = bookings.trip_id JOIN users ON bookings.user_id = users.id WHERE user_id = $1';
                }
                _context2.next = 8;
                return db.query(query, values);

              case 8:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", res.status(200).json({
                  data: rows,
                  status: 'success'
                }));

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

      function getBookings(_x3, _x4) {
        return _getBookings.apply(this, arguments);
      }

      return getBookings;
    }()
  }, {
    key: "deleteBooking",
    value: function () {
      var _deleteBooking = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var booking_id, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                booking_id = req.params.booking_id;
                _context3.next = 4;
                return db.query('DELETE FROM bookings WHERE id = $1', [booking_id]);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", res.status(200).json({
                  data: _objectSpread({
                    message: 'Booking deleted successfully'
                  }, rows[0]),
                  status: 'success'
                }));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", (0, _errorHandler["default"])(res, _context3.t0.message, 500));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function deleteBooking(_x5, _x6) {
        return _deleteBooking.apply(this, arguments);
      }

      return deleteBooking;
    }()
  }]);

  return BookingController;
}();

exports["default"] = BookingController;