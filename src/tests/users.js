/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Users', () => {
  describe('GET /', () => {
    it('should get all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/')
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
