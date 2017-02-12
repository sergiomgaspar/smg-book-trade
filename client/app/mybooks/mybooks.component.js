'use strict';
/*
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './mybooks.routes';
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './mybooks.routes';

export class MybooksComponent {
  // Instances of global objects
	$http;
	Auth;
  
  // Component variables
  bookList = [];

	/*@ngInject*/
	constructor($http, Auth) {
		this.$http = $http;
		this.Auth = Auth;
	}

  /* Load user owned books */
	$onInit() {
    this.$http.get('/api/books/' + this.Auth.getCurrentUserSync()._id)
      .then(res => {
        this.bookList = res.data;
      });
	}
}

/* IMPORTANT: must inject objects below to use http and authentication methods */
MybooksComponent.$inject = ['$http', 'Auth'];

export default angular.module('smgBookTradeApp.mybooks', [uiRouter])
  .config(routes)
  .component('mybooks', {
    template: require('./mybooks.html'),
    controller: MybooksComponent,
    controllerAs: 'mybooksCtrl'
  })
  .name;
