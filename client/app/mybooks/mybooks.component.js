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
  requestedList = []; // List of books user own that were requested by other users
  waitingList = [];   // List of books the user has requested to other users and are waiting approval

	/*@ngInject*/
	constructor($http, Auth) {
		this.$http = $http;
		this.Auth = Auth;
	}

  /* Load user owned books */
	$onInit() {

    // Get user Books
    this.$http.get('/api/books/' + this.Auth.getCurrentUserSync()._id)
      .then(res => {
        this.bookList = res.data;
      });

    // Get user books that have been requested by other users
        this.$http({
					url: '/api/trades/owner',
					method: "GET",
					data: {ownerId: this.Auth.getCurrentUserSync()._id}
				})
				.then(function(res) {
						console.log("Book trade requested");
					},
					function(res) { // optional
						console.log("Error while requesting book trade");
					});

/*
    this.$http.get('/api/trades/owner',)
      .then(res => {
        this.requestedList = res.data;
      });*/
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
