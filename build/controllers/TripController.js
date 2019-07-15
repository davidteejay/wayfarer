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

var TripController =
/*#__PURE__*/
function () {
  function TripController() {
    _classCallCheck(this, TripController);
  }

  _createClass(TripController, null, [{
    key: "addTrip",
    value: function () {
      var _addTrip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, user_id, bus_id, origin, destination, trip_date, fare, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, user_id = _req$body.user_id, bus_id = _req$body.bus_id, origin = _req$body.origin, destination = _req$body.destination, trip_date = _req$body.trip_date, fare = _req$body.fare;
                _context.next = 4;
                return db.query('INSERT INTO trips (bus_id, origin, destination, trip_date, fare, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [bus_id, origin, destination, trip_date, fare, user_id]);

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

      function addTrip(_x, _x2) {
        return _addTrip.apply(this, arguments);
      }

      return addTrip;
    }()
  }, {
    key: "cancelTrip",
    value: function () {
      var _cancelTrip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var trip_id, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                trip_id = req.params.trip_id;
                _context2.next = 4;
                return db.query("UPDATE trips SET status = 'cancelled' WHERE id = $1 RETURNING *", [trip_id]);

              case 4:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", res.status(200).json({
                  data: _objectSpread({
                    message: 'Trip cancelled successfully'
                  }, rows[0]),
                  status: 'success'
                }));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", (0, _errorHandler["default"])(res, _context2.t0.message, 500));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function cancelTrip(_x3, _x4) {
        return _cancelTrip.apply(this, arguments);
      }

      return cancelTrip;
    }()
  }, {
    key: "getTrips",
    value: function () {
      var _getTrips = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _req$query, origin, destination, query, values, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$query = req.query, origin = _req$query.origin, destination = _req$query.destination;
                query = 'SELECT origin, destination, trip_date, fare, status, number_plate as bus_plate_number, manufacturer AS bus_manufacturer, model AS bus_model, capacity AS bus_capacity FROM trips JOIN buses ON trips.bus_id = buses.id';
                values = [];

                if (origin) {
                  query = 'SELECT origin, destination, trip_date, fare, status, number_plate as bus_plate_number, manufacturer AS bus_manufacturer, model AS bus_model, capacity AS bus_capacity FROM trips JOIN buses ON trips.bus_id = buses.id WHERE origin LIKE $1';
                  values = ["%".concat(origin)];
                } else if (destination) {
                  query = 'SELECT origin, destination, trip_date, fare, status, number_plate as bus_plate_number, manufacturer AS bus_manufacturer, model AS bus_model, capacity AS bus_capacity FROM trips JOIN buses ON trips.bus_id = buses.id WHERE destination LIKE $1';
                  values = ["%".concat(destination)];
                }

                _context3.next = 7;
                return db.query(query, values);

              case 7:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", res.status(200).json({
                  data: rows,
                  status: 'success'
                }));

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", (0, _errorHandler["default"])(res, _context3.t0.message, 500));

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 12]]);
      }));

      function getTrips(_x5, _x6) {
        return _getTrips.apply(this, arguments);
      }

      return getTrips;
    }()
  }]);

  return TripController;
}();

exports["default"] = TripController;
//# sourceMappingURL=TripController.js.map