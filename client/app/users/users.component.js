'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './users.routes';

export class UsersComponent {
  $http;
  users = [];

  /*@ngInject*/
  constructor($http) {
    this.$http = $http
  }

  $onInit() {
    this.$http.get('/api/users')
      .then(response => {
        this.users = response.data;
      })
  }
}

export default angular.module('walletApp.users', [uiRouter])
  .config(routing)
  .component('users', {
    template: require('./users.html'),
    controller: UsersComponent,
    controllerAs: 'usersCtrl'
  }).name;
