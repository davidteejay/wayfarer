/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const baseUrl = '/api/v1/bookings';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImNoaWJ1b2tlbV90b2x1QGhvdG1haWwuY29tIiwiZmlyc3RfbmFtZSI6IkNoaWJ1b2tlbSIsImxhc3RfbmFtZSI6Ik9ueWVrd2VsdSIsInBhc3N3b3JkIjoiMDAwMDAwMDAiLCJpc19hZG1pbiI6dHJ1ZX0sImlhdCI6MTU2Mzk5Mjg4NiwiZXhwIjoxNTY0MDM2MDg2fQ.dPc_9ifwLj8kehWpUxuW8m2AQ758Aoa9rFAQ6A4Ethw';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImNoaWJ1b2tlbTIwMDdAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IkNoaWJ1b2tlbSIsImxhc3RfbmFtZSI6Ik9ueWVrd2VsdSIsInBhc3N3b3JkIjoiMDAwMDAwMDAiLCJpc19hZG1pbiI6ZmFsc2V9LCJpYXQiOjE1NjM5OTI5MzAsImV4cCI6MTU2NDAzNjEzMH0.LQcVEap-KY1n_US90P1PBF_PXrMA_vzw7lC-xrHFHdg';

describe('Bookings', () => {
  describe('POST /', () => {
    it('should add a new booking', (done) => {
      const booking = {
        trip_id: 1,
        seat_number: 2,
        token: userToken,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
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
        trip_id: 1,
        token: userToken,
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
          res.body.error.should.be.equal('You have already booked this trip');
          done();
        });
    });
  });

  describe('POST /', () => {
    it('should not add a new booking', (done) => {
      const booking = {
        trip_id: 1,
        token: userToken,
        seat_number: 2,
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
          res.body.error.should.be.equal('This seat is already taken');
          done();
        });
    });
  });

  describe('POST /', () => {
    it('should not add a new booking', (done) => {
      const booking = {
        token: userToken,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.equal('error');
          res.body.should.have.property('error');
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
          token: userToken,
        })
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
          token: adminToken,
        })
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

  describe('DELETE /:booking_id', () => {
    it('should delete a booking', (done) => {
      const trip = {
        token: userToken,
      };

      chai
        .request(app)
        .delete(`${baseUrl}/3`)
        .send(trip)
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

  describe('DELETE /:booking_id', () => {
    it('should not delete a booking', (done) => {
      const trip = {
        token: userToken,
      };

      chai
        .request(app)
        .delete(`${baseUrl}/1`)
        .send(trip)
        .end((err, res) => {
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
