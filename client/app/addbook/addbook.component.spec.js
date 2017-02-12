'use strict';

describe('Component: AddbookComponent', function() {
  // load the controller's module
  beforeEach(module('smgBookTradeApp.addbook'));

  var AddbookComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AddbookComponent = $componentController('addbook', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
