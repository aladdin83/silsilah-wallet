'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './government_authorities.routes';
import listComponent from './government_authorities.list.component';

export class GovernmentAuthoritiesComponent {
  $http;
  listComponent;

  /*@ngInject*/
  constructor($http){
    this.$http = $http; 
  }

  $onInit(){
    this.$http.get('/api/government_authorities')
      .then(Response=>{

      })
  }

}

export default angular.module('walletApp.governmentAuthorities', [uiRouter])
  .config(routing)
  .component('governmentAuthorities', {
    template: require('./government_authorities.html'),
    controller: GovernmentAuthoritiesComponent
  }).name;