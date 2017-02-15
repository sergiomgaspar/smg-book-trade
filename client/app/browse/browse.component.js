'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './browse.routes';

export class BrowseComponent {
  // Instances of global objects
	$http;
	Auth;
  
  bookName = '';
  bookList = [];
  isLogged = false;
  userID='';
  userName='';

  /*@ngInject*/
	constructor($http, Auth) {
		this.$http = $http;
		this.Auth = Auth;
	}

  /* Load user owned books */
	$onInit() {
    this.$http.get('/api/books/')
      .then(res => {
        this.bookList = res.data;
      });
     this.isLogged = this.Auth.isLoggedInSync();
     if(this.isLogged) {
       this.userID=this.Auth.getCurrentUserSync()._id;
       this.userName=this.Auth.getCurrentUserSync().name;
     }
	}

  // Function called to ask for a trade for a specific book
  requestBook = function(index){
      var bookReq = {
        status: 0,
        bookId: this.bookList[index]._id,
        title: this.bookList[index].title,
        thumbnail: this.bookList[index].thumbnail,
        ownerId: this.bookList[index].ownerId,
        ownerName: this.bookList[index].ownerName,
        insertDate: new Date(),
        requesterId: this.userID,
        requesterName: this.userName
      };
      this.bookList[index].requested = 1;
    this.$http({
					url: '/api/trades',
					method: "POST",
					data: bookReq
				})
				.then(function(res) {
						console.log("Book trade requested");
					},
					function(res) { // optional
						console.log("Error while requesting book trade");
					});
  }
}

/* IMPORTANT: must inject objects below to use http and authentication methods */
BrowseComponent.$inject = ['$http', 'Auth'];

export default angular.module('smgBookTradeApp.browse', [uiRouter])
  .config(routes)
  .component('browse', {
    template: require('./browse.html'),
    controller: BrowseComponent,
    controllerAs: 'browseCtrl'
  })
  .name;
