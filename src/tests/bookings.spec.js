/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const baseUrl = '/api/v1/bookings';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYzMTk1MDY0LCJleHAiOjE1NjMyMzgyNjR9.uHCJSgljHE6BwEtq2ehWPWOMjCCqu_U7NRe9uQLMfEU';

describe('Bookings', () => {
  describe('POST /', () => {
    it('should add a new booking', (done) => {
      const booking = {
        trip_id: 4,
        user_id: 2,
        seat_number: 2,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', token)
        .send(booking)
        .end((err, res) => {
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

  describe('POST /', () => {
    it('should not add a new booking', (done) => {
      const booking = {
        trip_id: 4,
        user_id: 2,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', token)
        .send(booking)
        .end((err, res) => {
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

  describe('POST /', () => {
    it('should not add a new booking', (done) => {
      const booking = {
        trip_id: 4,
        user_id: 1,
        seat_number: 2,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', token)
        .send(booking)
        .end((err, res) => {
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

  describe('POST /', () => {
    it('should not add a new booking', (done) => {
      const booking = {
        trip_id: 4,
        user_id: 2,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .send(booking)
        .end((err, res) => {
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

  describe('POST /', () => {
    it('should not add a new booking', (done) => {
      const booking = {
        trip_id: 4,
        user_id: 2,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR6cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNjY1ODgxLCJleHAiOjE1NjI3MDkwODF9._tCKqBZh9oUFx95PBlRVa93CNOFbuz91ngaU-0r0RAz')
        .send(booking)
        .end((err, res) => {
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

  describe('POST /', () => {
    it('should not add a new booking', (done) => {
      const booking = {
        user_id: 2,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', token)
        .send(booking)
        .end((err, res) => {
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

  describe('GET /', () => {
    it('should get all bookings', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/`)
        .send({
          user_id: 2,
        })
        .set('access-token', token)
        .end((err, res) => {
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

  describe('GET /', () => {
    it('should get all bookings', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/`)
        .send({
          user_id: 1,
        })
        .set('access-token', token)
        .end((err, res) => {
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

  describe('GET /', () => {
    it('should not get all bookings', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/`)
        .set('access-token', token)
        .end((err, res) => {
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
});
