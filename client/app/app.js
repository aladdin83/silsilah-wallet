'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';
import Upload from 'ng-file-upload';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import users from './users/users.component';
import usersView from './users/users.view.component';
import navbar from '../components/navbar/navbar.component';
import sidebar from '../components/sidebar/sidebar.component';
import topbar from '../components/topbar/topbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import governmentAuthorities from './government_authorities/government_authorities.component';
import governmentAuthorities_list from './government_authorities/government_authorities.list.component';
import governmentAuthorities_new from './government_authorities/government_authorities.new.component';

import './app.scss';

angular.module('walletApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, account, admin, 'validation.match', navbar, footer, main, constants,
  socket, util, Upload, sidebar, topbar, 
  users, usersView,
  governmentAuthorities, 
  governmentAuthorities_list,
  governmentAuthorities_new
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['walletApp'], {
      strictDi: true
    });
  });
