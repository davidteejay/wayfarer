"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _UserMiddleware = _interopRequireDefault(require("../middlewares/UserMiddleware"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/login', _AuthMiddleware["default"].generateToken, _UserController["default"].signIn);
router.post('/signup', _UserMiddleware["default"].validateUserData, _UserMiddleware["default"].checkIfEmailExists, _AuthMiddleware["default"].generateToken, _UserController["default"].signUp);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=UserRoutes.js.map