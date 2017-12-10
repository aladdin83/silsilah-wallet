'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class SidebarComponent {
  menu = [{
    title: 'Home',
    state: 'main',
    icon: 'fa fa-dashboard'
  },{
    title: 'Users',
    state: 'users',
    icon: 'fa fa-users'
  },{
    title: 'Government Authorities',
    state: 'government_authorities.list',
    icon: 'fa fa-bank'
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

export default angular.module('directives.sidebar', [])
  .component('sidebar', {
    template: require('./sidebar.html'),
    controller: SidebarComponent
  })
  .name;
