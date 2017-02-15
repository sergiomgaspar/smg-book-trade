'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './mybooks.routes';

export class MybooksComponent {
  // Instances of global objects
	$http;
	Auth;
  
  // Component variables
  bookList = [];
  requestedList = []; // List of books user owns that were requested by other users
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
    this.$http.get('/api/trades/books?ownerId=' + this.Auth.getCurrentUserSync()._id)
      .then(res => {
        this.requestedList = res.data;
      });

    // Get user books that have been requested by other users
    this.$http.get('/api/trades/books?requesterId=' + this.Auth.getCurrentUserSync()._id)
      .then(res => {
        this.waitingList = res.data;
      });
	}

  /* Cancel request for trade */
  cancelRequest(index){
    this.waitingList[index].hide='YES';
    this.$http.delete('/api/trades/'+ this.waitingList[index]._id)
      .then(res =>{
        console.log("trade canceled");
      })
  }

  /* Reject request from other user */
  rejectRequest(index){
    this.requestedList[index].hide='YES';
    this.$http.delete('/api/trades/'+ this.requestedList[index]._id)
      .then(res =>{
        console.log("trade rejected");
      })
  }

  concludeRequest(index){
    this.requestedList[index].hide='YES';
    this.$http.delete('/api/trades/'+ this.requestedList[index]._id)
    this.$http({
					url: '/api/books/'+this.requestedList[index].bookId,
					method: "PUT",
					data: {ownerId: this.requestedList[index].requesterId,
            ownerName: this.requestedList[index].requesterName}
				})
				.then(function(res) {
						console.log("Book owner updated");
					},
					function(res) { // optional
						console.log("Error while updating book owner");
					});
  }

  /* Reject request from other user */
  deleteBook(index){
    this.bookList[index].hide='YES';
    this.$http.delete('/api/books/'+ this.bookList[index]._id)
      .then(res =>{
        console.log("book deleted");
      })
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
