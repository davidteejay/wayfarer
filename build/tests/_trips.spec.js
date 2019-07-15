"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */

/* eslint-disable import/no-extraneous-dependencies */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var baseUrl = '/api/v1/trips';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYzMTk1MDY0LCJleHAiOjE1NjMyMzgyNjR9.uHCJSgljHE6BwEtq2ehWPWOMjCCqu_U7NRe9uQLMfEU';
describe('Trips', function () {
  describe('POST /', function () {
    it('should add new trip', function (done) {
      var trip = {
        bus_id: 1,
        user_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', token).send(trip).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('status');
        res.body.status.should.be.equal('success');
        done();
      });
    });
  });
  describe('POST /', function () {
    it('should not add new trip', function (done) {
      var trip = {
        bus_id: 1,
        user_id: 2,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', token).send(trip).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Access Denied');
        done();
      });
    });
  });
  describe('POST /', function () {
    it('should not add new trip', function (done) {
      var trip = {
        bus_id: 1,
        user_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).send(trip).end(function (err, res) {
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
    it('should not add new trip', function (done) {
      var trip = {
        bus_id: 1,
        user_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', 'eyJhbGciOiJIUzI1NiIsInR6cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNjY1ODgxLCJleHAiOjE1NjI3MDkwODF9._tCKqBZh9oUFx95PBlRVa93CNOFbuz91ngaU-0r0RAz').send(trip).end(function (err, res) {
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
    it('should not add new trip', function (done) {
      var trip = {
        bus_id: 1,
        user_id: 1,
        fare: 200000,
        trip_date: '2019-07-20'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', token).send(trip).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Incomplete trip data');
        done();
      });
    });
  });
  describe('POST /', function () {
    it('should not add new trip', function (done) {
      var trip = {
        bus_id: 2,
        user_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/")).set('access-token', token).send(trip).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Bus not found');
        done();
      });
    });
  });
  describe('PATCH /:trip_id', function () {
    it('should cancel a trip', function (done) {
      var trip = {
        user_id: 1
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
  describe('PATCH /:trip_id', function () {
    it('should not cancel a trip', function (done) {
      var trip = {
        user_id: 2
      };

      _chai["default"].request(_app["default"]).patch("".concat(baseUrl, "/1")).set('access-token', token).send(trip).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Access Denied');
        done();
      });
    });
  });
  describe('PATCH /:trip_id', function () {
    it('should not cancel a trip', function (done) {
      var trip = {
        user_id: 1
      };

      _chai["default"].request(_app["default"]).patch("".concat(baseUrl, "/1")).send(trip).end(function (err, res) {
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
  describe('PATCH /:trip_id', function () {
    it('should not cancel a trip', function (done) {
      var trip = {
        user_id: 1
      };

      _chai["default"].request(_app["default"]).patch("".concat(baseUrl, "/1")).set('access-token', 'eyJhbGciOiJIUzI1NiIsInR6cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNjY1ODgxLCJleHAiOjE1NjI3MDkwODF9._tCKqBZh9oUFx95PBlRVa93CNOFbuz91ngaU-0r0RAz').send(trip).end(function (err, res) {
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
  describe('PATCH /:trip_id', function () {
    it('should not cancel a trip', function (done) {
      var trip = {
        user_id: 1
      };

      _chai["default"].request(_app["default"]).patch("".concat(baseUrl, "/1000")).set('access-token', token).send(trip).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Trip does not exist');
        done();
      });
    });
  });
  describe('GET /', function () {
    it('should get all trip', function (done) {
      _chai["default"].request(_app["default"]).get("".concat(baseUrl, "/")).set('access-token', token).end(function (err, res) {
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
    it('should get all trip', function (done) {
      _chai["default"].request(_app["default"]).get("".concat(baseUrl, "/?origin=bai")).set('access-token', token).end(function (err, res) {
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
    it('should get all trip', function (done) {
      _chai["default"].request(_app["default"]).get("".concat(baseUrl, "/?destination=gb")).set('access-token', token).end(function (err, res) {
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
});