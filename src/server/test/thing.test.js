'use strict'; /* eslint prefer-arrow-callback: 0 */

const app = require('../app');
const request = require('supertest');
const expect = require('chai').expect;

describe('Thing API:', function () {
  let newThing;

  describe('GET /api/things', function () {
    let things;

    beforeEach(function (done) {
      request(app)
        .get('/api/things')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          things = res.body;
          return done();
        });
    });

    it('should respond with JSON array', function () {
      expect(things).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/things', function () {
    beforeEach(function (done) {
      request(app)
        .post('/api/things')
        .send({
          name: 'New Thing',
          info: 'This is the brand new thing!!!',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          newThing = res.body;
          return done();
        });
    });

    it('should respond with the newly created thing', function () {
      expect(newThing.name).to.equal('New Thing');
      expect(newThing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/things/:id', function () {
    let thing;

    beforeEach(function (done) {
      request(app)
        .get('/api/things/' + newThing.id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          thing = res.body;
          return done();
        });
    });

    afterEach(function () {
      thing = {};
    });

    it('should respond with the requested thing', function () {
      expect(thing.name).to.equal('New Thing');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/things/:id', function () {
    let updatedThing;

    beforeEach(function (done) {
      request(app)
        .put('/api/things/' + newThing.id)
        .send({
          name: 'Updated Thing',
          info: 'This is the updated thing!!!',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          updatedThing = res.body;
          return done();
        });
    });

    afterEach(function () {
      updatedThing = {};
    });

    it('should respond with the updated thing', function () {
      expect(updatedThing.name).to.equal('Updated Thing');
      expect(updatedThing.info).to.equal('This is the updated thing!!!');
    });
  });

  describe('DELETE /api/things/:id', function () {
    it('should respond with 204 on successful removal', function (done) {
      request(app)
        .delete('/api/things/' + newThing.id)
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should respond with 404 when thing does not exist', function (done) {
      request(app)
        .delete('/api/things/' + newThing.id)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
