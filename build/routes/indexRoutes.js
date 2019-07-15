"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserRoutes = _interopRequireDefault(require("./UserRoutes"));

var _TripRoutes = _interopRequireDefault(require("./TripRoutes"));

var _BookingRoutes = _interopRequireDefault(require("./BookingRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/auth', _UserRoutes["default"]);
router.use('/trips', _TripRoutes["default"]);
router.use('/bookings', _BookingRoutes["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=indexRoutes.js.map