"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */

/* eslint-disable import/no-extraneous-dependencies */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var baseUrl = '/api/v1/auth';
describe('Users', function () {
  // describe('POST /signup', () => {
  //   it('should sign the user up', (done) => {
  //     const user = {
  //       first_name: 'Chibuokem',
  //       last_name: 'Onyekwelu',
  //       email: 'chibuokem2007@gmail.com',
  //       password: '00000000',
  //     };
  //     chai
  //       .request(app)
  //       .post(`${baseUrl}/signup`)
  //       .send(user)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('status');
  //         res.body.should.have.property('data');
  //         res.body.data.should.be.a('object');
  //         res.body.data.should.have.property('id');
  //         done();
  //       });
  //   });
  // });
  describe('POST /signup', function () {
    it('should not sign the user up', function (done) {
      var user = {
        first_name: 'Chibuokem',
        last_name: 'Onyekwelu',
        email: 'chibuokem2007@gmail.com',
        password: 'chibuokem_tolu'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/signup")).send(user).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Email already exists');
        done();
      });
    });
  });
  describe('POST /signup', function () {
    it('should not sign the user up', function (done) {
      var user = {
        email: 'chibuokem2007@gmail.com',
        password: 'chibuokem_tolu'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/signup")).send(user).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Incomplete user data');
        done();
      });
    });
  });
  describe('POST /login', function () {
    it('should log the user in', function (done) {
      var user = {
        email: 'chibuokem2007@gmail.com',
        password: '00000000'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/login")).send(user).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        done();
      });
    });
  });
  describe('POST /login', function () {
    it('should not log the user in', function (done) {
      var user = {
        email: 'chibuokem2007@gmail.com',
        password: '11111111'
      };

      _chai["default"].request(_app["default"]).post("".concat(baseUrl, "/login")).send(user).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.equal('error');
        res.body.should.have.property('error');
        res.body.error.should.be.equal('Email or Password is incorrect');
        done();
      });
    });
  });
});