'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var booksCtrlStub = {
  index: 'booksCtrl.index',
  show: 'booksCtrl.show',
  create: 'booksCtrl.create',
  upsert: 'booksCtrl.upsert',
  patch: 'booksCtrl.patch',
  destroy: 'booksCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var booksIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './books.controller': booksCtrlStub
});

describe('Books API Router:', function() {
  it('should return an express router instance', function() {
    expect(booksIndex).to.equal(routerStub);
  });

  describe('GET /api/books', function() {
    it('should route to books.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'booksCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/books/:id', function() {
    it('should route to books.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'booksCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/books', function() {
    it('should route to books.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'booksCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/books/:id', function() {
    it('should route to books.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'booksCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/books/:id', function() {
    it('should route to books.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'booksCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/books/:id', function() {
    it('should route to books.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'booksCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
