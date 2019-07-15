"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var status = 'error';

var _default = function _default(res, error, statusCode) {
  return res.status(statusCode).send({
    status: status,
    error: error
  });
};

exports["default"] = _default;