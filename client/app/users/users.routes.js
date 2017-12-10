'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('users', {
      url: '/users',
      template: '<users></users>',
      authenticate: 'admin'
    })
    .state('usersView', {
      url: '/users/:id',
      template: '<users-view></users-view>',
      authenticate: 'admin'
    })
    ;
}
