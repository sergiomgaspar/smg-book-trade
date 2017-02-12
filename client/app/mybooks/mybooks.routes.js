'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('mybooks', {
      url: '/mybooks',
      template: '<mybooks></mybooks>',
	    authenticate: 'user'
    });
}
