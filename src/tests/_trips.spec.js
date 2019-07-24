/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const baseUrl = '/api/v1/trips';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImNoaWJ1b2tlbV90b2x1QGhvdG1haWwuY29tIiwiZmlyc3RfbmFtZSI6IkNoaWJ1b2tlbSIsImxhc3RfbmFtZSI6Ik9ueWVrd2VsdSIsInBhc3N3b3JkIjoiMDAwMDAwMDAiLCJpc19hZG1pbiI6dHJ1ZX0sImlhdCI6MTU2Mzk5Mjg4NiwiZXhwIjoxNTY0MDM2MDg2fQ.dPc_9ifwLj8kehWpUxuW8m2AQ758Aoa9rFAQ6A4Ethw';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImNoaWJ1b2tlbTIwMDdAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IkNoaWJ1b2tlbSIsImxhc3RfbmFtZSI6Ik9ueWVrd2VsdSIsInBhc3N3b3JkIjoiMDAwMDAwMDAiLCJpc19hZG1pbiI6ZmFsc2V9LCJpYXQiOjE1NjM5OTI5MzAsImV4cCI6MTU2NDAzNjEzMH0.LQcVEap-KY1n_US90P1PBF_PXrMA_vzw7lC-xrHFHdg';
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR6cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNjY1ODgxLCJleHAiOjE1NjI3MDkwODF9._tCKqBZh9oUFx95PBlRVa93CNOFbuz91ngaU-0r0RAz';

describe('Trips', () => {
  describe('POST /', () => {
    it('should add new trip', (done) => {
      const trip = {
        bus_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
        token: adminToken,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .send(trip)
        .end((err, res) => {
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

  describe('POST /', () => {
    it('should not add new trip', (done) => {
      const trip = {
        bus_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
        token: userToken,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.equal('error');
          res.body.should.have.property('error');
          res.body.error.should.be.equal('You don\'t have access to perform this operation');
          done();
        });
    });
  });

  describe('POST /', () => {
    it('should not add new trip', (done) => {
      const trip = {
        bus_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .send(trip)
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
    it('should not add new trip', (done) => {
      const trip = {
        bus_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
        token: invalidToken,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .send(trip)
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
    it('should not add new trip', (done) => {
      const trip = {
        bus_id: 1,
        fare: 200000,
        trip_date: '2019-07-20',
        token: adminToken,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .send(trip)
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

  describe('POST /', () => {
    it('should not add new trip', (done) => {
      const trip = {
        bus_id: 2,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
        token: adminToken,
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .send(trip)
        .end((err, res) => {
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

  describe('PATCH /:trip_id', () => {
    it('should cancel a trip', (done) => {
      const trip = {
        token: adminToken,
      };

      chai
        .request(app)
        .patch(`${baseUrl}/1`)
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

  describe('PATCH /:trip_id', () => {
    it('should not cancel a trip', (done) => {
      const trip = {
        token: userToken,
      };

      chai
        .request(app)
        .patch(`${baseUrl}/1`)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.equal('error');
          res.body.should.have.property('error');
          res.body.error.should.be.equal('You don\'t have access to perform this operation');
          done();
        });
    });
  });

  describe('PATCH /:trip_id', () => {
    it('should not cancel a trip', (done) => {
      const trip = {
        token: adminToken,
      };

      chai
        .request(app)
        .patch(`${baseUrl}/1000`)
        .send(trip)
        .end((err, res) => {
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

  describe('GET /', () => {
    it('should get all trips', (done) => {
      const trip = {
        token: userToken,
      };

      chai
        .request(app)
        .get(`${baseUrl}/`)
        .send(trip)
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
    it('should get all trips', (done) => {
      const trip = {
        token: userToken,
      };

      chai
        .request(app)
        .get(`${baseUrl}/?search=bai`)
        .send(trip)
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
});
