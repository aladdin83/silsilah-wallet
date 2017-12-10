'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newGovernmentAuthority;

describe('GovernmentAuthority API:', function() {
  describe('GET /api/government_authorities', function() {
    var governmentAuthoritys;

    beforeEach(function(done) {
      request(app)
        .get('/api/government_authorities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          governmentAuthoritys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(governmentAuthoritys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/government_authorities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/government_authorities')
        .send({
          name: 'New GovernmentAuthority',
          info: 'This is the brand new governmentAuthority!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGovernmentAuthority = res.body;
          done();
        });
    });

    it('should respond with the newly created governmentAuthority', function() {
      expect(newGovernmentAuthority.name).to.equal('New GovernmentAuthority');
      expect(newGovernmentAuthority.info).to.equal('This is the brand new governmentAuthority!!!');
    });
  });

  describe('GET /api/government_authorities/:id', function() {
    var governmentAuthority;

    beforeEach(function(done) {
      request(app)
        .get(`/api/government_authorities/${newGovernmentAuthority._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          governmentAuthority = res.body;
          done();
        });
    });

    afterEach(function() {
      governmentAuthority = {};
    });

    it('should respond with the requested governmentAuthority', function() {
      expect(governmentAuthority.name).to.equal('New GovernmentAuthority');
      expect(governmentAuthority.info).to.equal('This is the brand new governmentAuthority!!!');
    });
  });

  describe('PUT /api/government_authorities/:id', function() {
    var updatedGovernmentAuthority;

    beforeEach(function(done) {
      request(app)
        .put(`/api/government_authorities/${newGovernmentAuthority._id}`)
        .send({
          name: 'Updated GovernmentAuthority',
          info: 'This is the updated governmentAuthority!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGovernmentAuthority = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGovernmentAuthority = {};
    });

    it('should respond with the updated governmentAuthority', function() {
      expect(updatedGovernmentAuthority.name).to.equal('Updated GovernmentAuthority');
      expect(updatedGovernmentAuthority.info).to.equal('This is the updated governmentAuthority!!!');
    });

    it('should respond with the updated governmentAuthority on a subsequent GET', function(done) {
      request(app)
        .get(`/api/government_authorities/${newGovernmentAuthority._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let governmentAuthority = res.body;

          expect(governmentAuthority.name).to.equal('Updated GovernmentAuthority');
          expect(governmentAuthority.info).to.equal('This is the updated governmentAuthority!!!');

          done();
        });
    });
  });

  describe('PATCH /api/government_authorities/:id', function() {
    var patchedGovernmentAuthority;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/government_authorities/${newGovernmentAuthority._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched GovernmentAuthority' },
          { op: 'replace', path: '/info', value: 'This is the patched governmentAuthority!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGovernmentAuthority = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGovernmentAuthority = {};
    });

    it('should respond with the patched governmentAuthority', function() {
      expect(patchedGovernmentAuthority.name).to.equal('Patched GovernmentAuthority');
      expect(patchedGovernmentAuthority.info).to.equal('This is the patched governmentAuthority!!!');
    });
  });

  describe('DELETE /api/government_authorities/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/government_authorities/${newGovernmentAuthority._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when governmentAuthority does not exist', function(done) {
      request(app)
        .delete(`/api/government_authorities/${newGovernmentAuthority._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
