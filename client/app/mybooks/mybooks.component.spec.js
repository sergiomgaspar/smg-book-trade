'use strict';

describe('Component: MybooksComponent', function() {
  // load the controller's module
  beforeEach(module('smgBookTradeApp.mybooks'));

  var MybooksComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MybooksComponent = $componentController('mybooks', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
