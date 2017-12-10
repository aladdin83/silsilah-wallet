'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './users.routes';

export class UsersViewComponent {
  $stateParams;
  $http;
  userId;
  user = {};

  /*@ngInject*/
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.userId = $stateParams.id;
  }

  $onInit(){
    this.$http.get('/api/users/' + this.userId)
      .then(response => {
        console.log(response.data);
        this.user = response.data;
      });
  }
}

export default angular.module('walletApp.users.view', [uiRouter])
  //.config(routing)
  .component('usersView', {
    template: require('./users.view.html'),
    controller: UsersViewComponent
  }).name;
