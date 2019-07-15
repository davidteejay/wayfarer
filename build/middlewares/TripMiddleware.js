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

var TripMiddleware =
/*#__PURE__*/
function () {
  function TripMiddleware() {
    _classCallCheck(this, TripMiddleware);
  }

  _createClass(TripMiddleware, null, [{
    key: "validateData",
    value: function () {
      var _validateData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, user_id, bus_id, origin, destination, trip_date, fare;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, user_id = _req$body.user_id, bus_id = _req$body.bus_id, origin = _req$body.origin, destination = _req$body.destination, trip_date = _req$body.trip_date, fare = _req$body.fare;

                if (!(!user_id || !bus_id || !origin || !destination || !trip_date || !fare)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", (0, _errorHandler["default"])(res, 'Incomplete trip data', 401));

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
    key: "checkIfBusExists",
    value: function () {
      var _checkIfBusExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var bus_id, _ref, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                bus_id = req.body.bus_id;
                _context2.next = 4;
                return db.query('SELECT * FROM buses WHERE id = $1', [bus_id]);

              case 4:
                _ref = _context2.sent;
                rows = _ref.rows;

                if (!(rows.length < 1)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", (0, _errorHandler["default"])(res, 'Bus not found', 404));

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

      function checkIfBusExists(_x4, _x5, _x6) {
        return _checkIfBusExists.apply(this, arguments);
      }

      return checkIfBusExists;
    }()
  }, {
    key: "checkIfTripExists",
    value: function () {
      var _checkIfTripExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var trip_id, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                trip_id = req.params.trip_id;
                _context3.next = 4;
                return db.query('SELECT * FROM trips WHERE id = $1', [trip_id]);

              case 4:
                _ref2 = _context3.sent;
                rows = _ref2.rows;

                if (!(rows.length < 1)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", (0, _errorHandler["default"])(res, 'Trip does not exist', 404));

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

      function checkIfTripExists(_x7, _x8, _x9) {
        return _checkIfTripExists.apply(this, arguments);
      }

      return checkIfTripExists;
    }()
  }]);

  return TripMiddleware;
}();

exports["default"] = TripMiddleware;
//# sourceMappingURL=TripMiddleware.js.map