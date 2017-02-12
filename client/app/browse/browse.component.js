'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './browse.routes';

export class BrowseComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('smgBookTradeApp.browse', [uiRouter])
  .config(routes)
  .component('browse', {
    template: require('./browse.html'),
    controller: BrowseComponent,
    controllerAs: 'browseCtrl'
  })
  .name;
