"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _TripController = _interopRequireDefault(require("../controllers/TripController"));

var _TripMiddleware = _interopRequireDefault(require("../middlewares/TripMiddleware"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _AuthMiddleware["default"].validateToken, _TripController["default"].getTrips);
router.post('/', _AuthMiddleware["default"].validateToken, _AuthMiddleware["default"].checkIfUserIsAdmin, _TripMiddleware["default"].validateData, _TripMiddleware["default"].checkIfBusExists, _TripController["default"].addTrip);
router.patch('/:trip_id', _AuthMiddleware["default"].validateToken, _AuthMiddleware["default"].checkIfUserIsAdmin, _TripMiddleware["default"].checkIfTripExists, _TripController["default"].cancelTrip);
var _default = router;
exports["default"] = _default;