'use strict';

describe('Component: UsersComponent', function() {
  // load the controller's module
  beforeEach(module('walletApp.users'));

  var UsersComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    UsersComponent = $componentController('users', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
