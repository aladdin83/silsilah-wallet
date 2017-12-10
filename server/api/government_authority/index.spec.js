'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var governmentAuthorityCtrlStub = {
  index: 'governmentAuthorityCtrl.index',
  show: 'governmentAuthorityCtrl.show',
  create: 'governmentAuthorityCtrl.create',
  upsert: 'governmentAuthorityCtrl.upsert',
  patch: 'governmentAuthorityCtrl.patch',
  destroy: 'governmentAuthorityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var governmentAuthorityIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './government_authority.controller': governmentAuthorityCtrlStub
});

describe('GovernmentAuthority API Router:', function() {
  it('should return an express router instance', function() {
    expect(governmentAuthorityIndex).to.equal(routerStub);
  });

  describe('GET /api/government_authorities', function() {
    it('should route to governmentAuthority.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'governmentAuthorityCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/government_authorities/:id', function() {
    it('should route to governmentAuthority.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'governmentAuthorityCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/government_authorities', function() {
    it('should route to governmentAuthority.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'governmentAuthorityCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/government_authorities/:id', function() {
    it('should route to governmentAuthority.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'governmentAuthorityCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/government_authorities/:id', function() {
    it('should route to governmentAuthority.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'governmentAuthorityCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/government_authorities/:id', function() {
    it('should route to governmentAuthority.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'governmentAuthorityCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
