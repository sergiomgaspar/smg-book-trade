'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('addbook', {
      url: '/addbook',
      template: '<addbook></addbook>'
    });
}
