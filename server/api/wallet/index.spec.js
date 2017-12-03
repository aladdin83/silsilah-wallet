'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var walletCtrlStub = {
  index: 'walletCtrl.index',
  show: 'walletCtrl.show',
  create: 'walletCtrl.create',
  upsert: 'walletCtrl.upsert',
  patch: 'walletCtrl.patch',
  destroy: 'walletCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var walletIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './wallet.controller': walletCtrlStub
});

describe('Wallet API Router:', function() {
  it('should return an express router instance', function() {
    expect(walletIndex).to.equal(routerStub);
  });

  describe('GET /api/wallets', function() {
    it('should route to wallet.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'walletCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/wallets/:id', function() {
    it('should route to wallet.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'walletCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/wallets', function() {
    it('should route to wallet.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'walletCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/wallets/:id', function() {
    it('should route to wallet.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'walletCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/wallets/:id', function() {
    it('should route to wallet.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'walletCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/wallets/:id', function() {
    it('should route to wallet.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'walletCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
