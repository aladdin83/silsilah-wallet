'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var documentCtrlStub = {
  index: 'documentCtrl.index',
  show: 'documentCtrl.show',
  create: 'documentCtrl.create',
  upsert: 'documentCtrl.upsert',
  patch: 'documentCtrl.patch',
  destroy: 'documentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var documentIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './document.controller': documentCtrlStub
});

describe('Document API Router:', function() {
  it('should return an express router instance', function() {
    expect(documentIndex).to.equal(routerStub);
  });

  describe('GET /api/documents', function() {
    it('should route to document.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'documentCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/documents/:id', function() {
    it('should route to document.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'documentCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/documents', function() {
    it('should route to document.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'documentCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/documents/:id', function() {
    it('should route to document.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'documentCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/documents/:id', function() {
    it('should route to document.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'documentCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/documents/:id', function() {
    it('should route to document.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'documentCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
