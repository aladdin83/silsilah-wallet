'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

export class GovernmentAuthoritiesNewComponent {
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

export default angular.module('walletApp.governmentAuthorities.new', [uiRouter])
  .component('governmentAuthoritiesNew', {
    template: require('./government_authorities.new.html'),
    controller: GovernmentAuthoritiesNewComponent
  }).name;