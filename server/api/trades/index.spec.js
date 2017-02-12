'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var tradesCtrlStub = {
  index: 'tradesCtrl.index',
  show: 'tradesCtrl.show',
  create: 'tradesCtrl.create',
  upsert: 'tradesCtrl.upsert',
  patch: 'tradesCtrl.patch',
  destroy: 'tradesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tradesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './trades.controller': tradesCtrlStub
});

describe('Trades API Router:', function() {
  it('should return an express router instance', function() {
    expect(tradesIndex).to.equal(routerStub);
  });

  describe('GET /api/trades', function() {
    it('should route to trades.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'tradesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/trades/:id', function() {
    it('should route to trades.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'tradesCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/trades', function() {
    it('should route to trades.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'tradesCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/trades/:id', function() {
    it('should route to trades.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'tradesCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/trades/:id', function() {
    it('should route to trades.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'tradesCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/trades/:id', function() {
    it('should route to trades.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'tradesCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
