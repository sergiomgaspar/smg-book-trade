'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './addbook.routes';

export class AddbookComponent {

  // Instances of global objects
	$http;
	Auth;
  bookName = '';
  bookList = [];

  /*@ngInject*/
	constructor($http, Auth) {
		this.$http = $http;
		this.Auth = Auth;
	}

// this.Auth.getCurrentUserSync()._id

  /* Call BE to find book by name using Google API */
  findBook = function(){
    console.log("Searching book: "+this.bookName);
    if (this.bookName.length < 1) return;
    this.$http.get('/api/book-search/' + this.bookName)
			.then(res => {
				this.bookList = res.data;
			});
  }

  addBook = function(index){
    console.log("Index: "+index);
    this.bookList[index].allowAdd = 0;
    
    var data = this.bookList[index];
    data.ownerName = this.Auth.getCurrentUserSync().name;
		data.ownerId = this.Auth.getCurrentUserSync()._id;
    // POST book to user's list
    this.$http({
					url: '/api/books',
					method: "POST",
					data: data
				})
				.then(function(res) {
						console.log("Book added");
					},
					function(res) { // optional
						console.log("Error while adding book to list");
					});
  }
}

/* IMPORTANT: must inject objects below to use http and authentication methods */
AddbookComponent.$inject = ['$http', 'Auth'];

export default angular.module('smgBookTradeApp.addbook', [uiRouter])
  .config(routes)
  .component('addbook', {
    template: require('./addbook.html'),
    controller: AddbookComponent,
    controllerAs: 'addbookCtrl'
  })
  .name;
