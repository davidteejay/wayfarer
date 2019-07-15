"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _debug = _interopRequireDefault(require("debug"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _path = _interopRequireDefault(require("path"));

var _swagger = _interopRequireDefault(require("./config/swagger.json"));

var _indexRoutes = _interopRequireDefault(require("./routes/indexRoutes"));

var _errorHandler = _interopRequireDefault(require("./helpers/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-unused-vars */
_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT;
var deBug = (0, _debug["default"])('wayfarer:server');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use('/api/v1/', _indexRoutes["default"]);
app.use('/*', function (req, res) {
  return (0, _errorHandler["default"])(res, 'Incorrect Route', 404);
});
app.use(function (err, req, res, next) {
  return res.send({
    status: 'error',
    message: err.message
  });
});
app.listen(port, function () {
  return deBug("Listening on port ".concat(port));
});
var _default = app;
exports["default"] = _default;