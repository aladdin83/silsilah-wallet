'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newDocument;

describe('Document API:', function() {
  describe('GET /api/documents', function() {
    var documents;

    beforeEach(function(done) {
      request(app)
        .get('/api/documents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          documents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(documents).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/documents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/documents')
        .send({
          name: 'New Document',
          info: 'This is the brand new document!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDocument = res.body;
          done();
        });
    });

    it('should respond with the newly created document', function() {
      expect(newDocument.name).to.equal('New Document');
      expect(newDocument.info).to.equal('This is the brand new document!!!');
    });
  });

  describe('GET /api/documents/:id', function() {
    var document;

    beforeEach(function(done) {
      request(app)
        .get(`/api/documents/${newDocument._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          document = res.body;
          done();
        });
    });

    afterEach(function() {
      document = {};
    });

    it('should respond with the requested document', function() {
      expect(document.name).to.equal('New Document');
      expect(document.info).to.equal('This is the brand new document!!!');
    });
  });

  describe('PUT /api/documents/:id', function() {
    var updatedDocument;

    beforeEach(function(done) {
      request(app)
        .put(`/api/documents/${newDocument._id}`)
        .send({
          name: 'Updated Document',
          info: 'This is the updated document!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDocument = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDocument = {};
    });

    it('should respond with the updated document', function() {
      expect(updatedDocument.name).to.equal('Updated Document');
      expect(updatedDocument.info).to.equal('This is the updated document!!!');
    });

    it('should respond with the updated document on a subsequent GET', function(done) {
      request(app)
        .get(`/api/documents/${newDocument._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let document = res.body;

          expect(document.name).to.equal('Updated Document');
          expect(document.info).to.equal('This is the updated document!!!');

          done();
        });
    });
  });

  describe('PATCH /api/documents/:id', function() {
    var patchedDocument;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/documents/${newDocument._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Document' },
          { op: 'replace', path: '/info', value: 'This is the patched document!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDocument = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDocument = {};
    });

    it('should respond with the patched document', function() {
      expect(patchedDocument.name).to.equal('Patched Document');
      expect(patchedDocument.info).to.equal('This is the patched document!!!');
    });
  });

  describe('DELETE /api/documents/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/documents/${newDocument._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when document does not exist', function(done) {
      request(app)
        .delete(`/api/documents/${newDocument._id}`)
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
