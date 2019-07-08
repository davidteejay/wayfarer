/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const baseUrl = '/api/v1/users';

describe('Users', () => {
  describe('POST /login', () => {
    it('should log the user in', (done) => {
      const user = {
        email: 'chibuokem2007@gmail.com',
        password: '00000000',
      };

      chai
        .request(app)
        .post(`${baseUrl}/login`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should not log the user in', (done) => {
      const user = {
        email: 'chibuokem2007@gmail.com',
        password: '11111111',
      };

      chai
        .request(app)
        .post(`${baseUrl}/login`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('POST /signup', () => {
    it('should sign the user up', (done) => {
      const user = {
        first_name: 'Chibuokem',
        last_name: 'Onyekwelu',
        email: `chibuokem_${(Math.random() * 1000).toFixed(0)}@hotmail.com`,
        password: 'chibuokem_tolu',
      };

      chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          done();
        });
    });
  });

  describe('POST /signup', () => {
    it('should not sign the user up', (done) => {
      const user = {
        first_name: 'Chibuokem',
        last_name: 'Onyekwelu',
        email: 'chibuokem2007@gmail.com',
        password: 'chibuokem_tolu',
      };

      chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('POST /signup', () => {
    it('should not sign the user up', (done) => {
      const user = {
        email: 'chibuokem2007@gmail.com',
        password: 'chibuokem_tolu',
      };

      chai
        .request(app)
        .post(`${baseUrl}/signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
