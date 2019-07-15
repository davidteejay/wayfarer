"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */

/* eslint-disable import/no-extraneous-dependencies */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var baseUrl = '/api/v1/bookings';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYzMTk1MDY0LCJleHAiOjE1NjMyMzgyNjR9.uHCJSgljHE6BwEtq2ehWPWOMjCCqu_U7NRe9uQLMfEU';
describe('Bookings', function () {
  describe('POST /', function () {
    it('should add a new booking', function (done) {
      var booking = {
        trip_id: 1,
        user_id: 2,
        seat_number: 2
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', token).send(booking).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.status.should.be.equal('success');
        done();
      });
    });
  });
  describe('POST /', function () {
    it('should not add a new booking', function (done) {
      var booking = {
        trip_id: 1,
        user_id: 2
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', token).send(booking).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('You have already booked this trip');
        done();
      });
    });
  });
  describe('POST /', function () {
    it('should not add a new booking', function (done) {
      var booking = {
        trip_id: 1,
        user_id: 1,
        seat_number: 2
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', token).send(booking).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('This seat is already taken');
        done();
      });
    });
  });
  describe('POST /', function () {
    it('should not add a new booking', function (done) {
      var booking = {
        trip_id: 1,
        user_id: 2
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).send(booking).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Token Not Found');
        done();
      });
    });
  });
  describe('POST /', function () {
    it('should not add a new booking', function (done) {
      var booking = {
        trip_id: 1,
        user_id: 2
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', 'eyJhbGciOiJIUzI1NiIsInR6cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNjY1ODgxLCJleHAiOjE1NjI3MDkwODF9._tCKqBZh9oUFx95PBlRVa93CNOFbuz91ngaU-0r0RAz').send(booking).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Invalid Token');
        done();
      });
    });
  });
  describe('POST /', function () {
    it('should not add a new booking', function (done) {
      var booking = {
        user_id: 2
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', token).send(booking).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Incomplete booking data');
        done();
      });
    });
  });
  describe('GET /', function () {
    it('should get all bookings', function (done) {
      _chai["default"].request(_app["default"]).get("".concat(baseUrl, "/")).send({
        user_id: 2
      }).set('access-token', token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.status.should.be.equal('success');
        done();
      });
    });
  });
  describe('GET /', function () {
    it('should get all bookings', function (done) {
      _chai["default"].request(_app["default"]).get("".concat(baseUrl, "/")).send({
        user_id: 1
      }).set('access-token', token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.status.should.be.equal('success');
        done();
      });
    });
  });
  describe('GET /', function () {
    it('should not get all bookings', function (done) {
      _chai["default"].request(_app["default"]).get("".concat(baseUrl, "/")).set('access-token', token).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('User ID not specified');
        done();
      });
    });
  });
  describe('PATCH /:booking_id', function () {
    it('should delete a booking', function (done) {
      var trip = {
        user_id: 2
      };

      _chai["default"].request(_app["default"]).patch("".concat(baseUrl, "/1")).set('access-token', token).send(trip).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.status.should.be.equal('success');
        done();
      });
    });
  });
  describe('PATCH /:booking_id', function () {
    it('should delete a booking', function (done) {
      var trip = {
        user_id: 3
      };

      _chai["default"].request(_app["default"]).patch("".concat(baseUrl, "/1")).set('access-token', token).send(trip).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Booking not found');
        done();
      });
    });
  });
});
//# sourceMappingURL=bookings.spec.js.map