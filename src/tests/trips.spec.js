/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const baseUrl = '/api/v1/trips';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYzMTM1ODM0LCJleHAiOjE1NjMxNzkwMzR9.Lb5jS6GUqnNqMFcud5wRcyPl5wNPSqkvr3PZ9nq-mVg';

describe('Trips', () => {
  describe('POST /', () => {
    it('should add new trip', (done) => {
      const trip = {
        bus_id: 1,
        user_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
      };

      chai
        .request(app)
        .patch(`${baseUrl}/`)
        .set('access-token', token)
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
        user_id: 2,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', token)
        .send(trip)
        .end((err, res) => {
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

  describe('POST /', () => {
    it('should not add new trip', (done) => {
      const trip = {
        bus_id: 1,
        user_id: 1,
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
        user_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR6cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNjY1ODgxLCJleHAiOjE1NjI3MDkwODF9._tCKqBZh9oUFx95PBlRVa93CNOFbuz91ngaU-0r0RAz')
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
        user_id: 1,
        fare: 200000,
        trip_date: '2019-07-20',
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', token)
        .send(trip)
        .end((err, res) => {
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

  describe('POST /', () => {
    it('should not add new trip', (done) => {
      const trip = {
        bus_id: 2,
        user_id: 1,
        origin: 'Dubai',
        destination: 'Ojuelegba',
        fare: 200000,
        trip_date: '2019-07-20',
      };

      chai
        .request(app)
        .post(`${baseUrl}/`)
        .set('access-token', token)
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
        user_id: 1,
      };

      chai
        .request(app)
        .patch(`${baseUrl}/1`)
        .set('access-token', token)
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
        user_id: 2,
      };

      chai
        .request(app)
        .patch(`${baseUrl}/1`)
        .set('access-token', token)
        .send(trip)
        .end((err, res) => {
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

  describe('PATCH /:trip_id', () => {
    it('should not cancel a trip', (done) => {
      const trip = {
        user_id: 1,
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
          res.body.error.should.be.equal('Token Not Found');
          done();
        });
    });
  });

  describe('PATCH /:trip_id', () => {
    it('should not cancel a trip', (done) => {
      const trip = {
        user_id: 1,
      };

      chai
        .request(app)
        .patch(`${baseUrl}/1`)
        .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR6cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNjY1ODgxLCJleHAiOjE1NjI3MDkwODF9._tCKqBZh9oUFx95PBlRVa93CNOFbuz91ngaU-0r0RAz')
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

  describe('PATCH /:trip_id', () => {
    it('should not cancel a trip', (done) => {
      const trip = {
        user_id: 1,
      };

      chai
        .request(app)
        .patch(`${baseUrl}/1000`)
        .set('access-token', token)
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
    it('should get all trip', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/`)
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
    it('should get all trip', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/?origin=bai`)
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
    it('should get all trip', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/?destination=gb`)
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
});
