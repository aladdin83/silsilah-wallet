'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './government_authorities.routes';

export class GovernmentAuthoritiesListComponent {
  $http;

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

export default angular.module('walletApp.governmentAuthorities.list', [uiRouter])
  
  .component('governmentAuthoritiesList', {
    template: require('./government_authorities.list.html'),
    controller: GovernmentAuthoritiesListComponent
  }).name;