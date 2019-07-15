"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

var _BookingMiddleware = _interopRequireDefault(require("../middlewares/BookingMiddleware"));

var _BookingController = _interopRequireDefault(require("../controllers/BookingController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _AuthMiddleware["default"].validateToken, _BookingMiddleware["default"].checkIfUserIsAdmin, _BookingController["default"].getBookings);
router.post('/', _AuthMiddleware["default"].validateToken, _BookingMiddleware["default"].validateData, _BookingMiddleware["default"].checkIfUserHasBooked, _BookingMiddleware["default"].checkIfSeatIsTaken, _BookingController["default"].addBooking);
router.patch('/:booking_id', _AuthMiddleware["default"].validateToken, _BookingMiddleware["default"].checkIfUserHasBooking, _BookingController["default"].deleteBooking);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=BookingRoutes.js.map