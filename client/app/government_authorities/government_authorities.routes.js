'use strict';

export default function routes($stateProvider){
  'ngInject';
  $stateProvider
    .state('government_authorities', {
      url: '/government_authorities',
      template: '<government-authorities></government-authorities>',
      authenticate: 'admin',
    })
    .state('government_authorities.list', {
      url: '/list',
      template: '<government-authorities-list></government-authorities-list>',
      authenticate: 'admin'
    })
    .state('government_authorities.new', {
      url: '/new',
      template: '<government-authorities-new></government-authorities-new>',
      authenticate: 'admin'
    })
    ;
}