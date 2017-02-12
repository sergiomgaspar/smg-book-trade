import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  countBooks = 0; 

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  /* TODO: Get total available books */
  $onInit() {
    this.$http.get('/api/books/count')
      .then(response => {
        this.countBooks = response.data;
      });
  }
}

export default angular.module('smgBookTradeApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainCtrl'
  })
  .name;
 