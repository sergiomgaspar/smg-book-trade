'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTrades;

describe('Trades API:', function() {
  describe('GET /api/trades', function() {
    var tradess;

    beforeEach(function(done) {
      request(app)
        .get('/api/trades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tradess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(tradess).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/trades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/trades')
        .send({
          name: 'New Trades',
          info: 'This is the brand new trades!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTrades = res.body;
          done();
        });
    });

    it('should respond with the newly created trades', function() {
      expect(newTrades.name).to.equal('New Trades');
      expect(newTrades.info).to.equal('This is the brand new trades!!!');
    });
  });

  describe('GET /api/trades/:id', function() {
    var trades;

    beforeEach(function(done) {
      request(app)
        .get(`/api/trades/${newTrades._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          trades = res.body;
          done();
        });
    });

    afterEach(function() {
      trades = {};
    });

    it('should respond with the requested trades', function() {
      expect(trades.name).to.equal('New Trades');
      expect(trades.info).to.equal('This is the brand new trades!!!');
    });
  });

  describe('PUT /api/trades/:id', function() {
    var updatedTrades;

    beforeEach(function(done) {
      request(app)
        .put(`/api/trades/${newTrades._id}`)
        .send({
          name: 'Updated Trades',
          info: 'This is the updated trades!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTrades = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTrades = {};
    });

    it('should respond with the updated trades', function() {
      expect(updatedTrades.name).to.equal('Updated Trades');
      expect(updatedTrades.info).to.equal('This is the updated trades!!!');
    });

    it('should respond with the updated trades on a subsequent GET', function(done) {
      request(app)
        .get(`/api/trades/${newTrades._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let trades = res.body;

          expect(trades.name).to.equal('Updated Trades');
          expect(trades.info).to.equal('This is the updated trades!!!');

          done();
        });
    });
  });

  describe('PATCH /api/trades/:id', function() {
    var patchedTrades;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/trades/${newTrades._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Trades' },
          { op: 'replace', path: '/info', value: 'This is the patched trades!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTrades = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTrades = {};
    });

    it('should respond with the patched trades', function() {
      expect(patchedTrades.name).to.equal('Patched Trades');
      expect(patchedTrades.info).to.equal('This is the patched trades!!!');
    });
  });

  describe('DELETE /api/trades/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/trades/${newTrades._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when trades does not exist', function(done) {
      request(app)
        .delete(`/api/trades/${newTrades._id}`)
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
