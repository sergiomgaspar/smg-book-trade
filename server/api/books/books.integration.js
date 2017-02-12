'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newBooks;

describe('Books API:', function() {
  describe('GET /api/books', function() {
    var bookss;

    beforeEach(function(done) {
      request(app)
        .get('/api/books')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          bookss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(bookss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/books', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/books')
        .send({
          name: 'New Books',
          info: 'This is the brand new books!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBooks = res.body;
          done();
        });
    });

    it('should respond with the newly created books', function() {
      expect(newBooks.name).to.equal('New Books');
      expect(newBooks.info).to.equal('This is the brand new books!!!');
    });
  });

  describe('GET /api/books/:id', function() {
    var books;

    beforeEach(function(done) {
      request(app)
        .get(`/api/books/${newBooks._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          books = res.body;
          done();
        });
    });

    afterEach(function() {
      books = {};
    });

    it('should respond with the requested books', function() {
      expect(books.name).to.equal('New Books');
      expect(books.info).to.equal('This is the brand new books!!!');
    });
  });

  describe('PUT /api/books/:id', function() {
    var updatedBooks;

    beforeEach(function(done) {
      request(app)
        .put(`/api/books/${newBooks._id}`)
        .send({
          name: 'Updated Books',
          info: 'This is the updated books!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBooks = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBooks = {};
    });

    it('should respond with the updated books', function() {
      expect(updatedBooks.name).to.equal('Updated Books');
      expect(updatedBooks.info).to.equal('This is the updated books!!!');
    });

    it('should respond with the updated books on a subsequent GET', function(done) {
      request(app)
        .get(`/api/books/${newBooks._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let books = res.body;

          expect(books.name).to.equal('Updated Books');
          expect(books.info).to.equal('This is the updated books!!!');

          done();
        });
    });
  });

  describe('PATCH /api/books/:id', function() {
    var patchedBooks;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/books/${newBooks._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Books' },
          { op: 'replace', path: '/info', value: 'This is the patched books!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBooks = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBooks = {};
    });

    it('should respond with the patched books', function() {
      expect(patchedBooks.name).to.equal('Patched Books');
      expect(patchedBooks.info).to.equal('This is the patched books!!!');
    });
  });

  describe('DELETE /api/books/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/books/${newBooks._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when books does not exist', function(done) {
      request(app)
        .delete(`/api/books/${newBooks._id}`)
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
