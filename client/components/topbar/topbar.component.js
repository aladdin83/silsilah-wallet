'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class TopbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  },{
    title: 'Users',
    state: 'users'
  }];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.topbar', [])
  .component('topbar', {
    template: require('./topbar.html'),
    controller: TopbarComponent
  })
  .name;
