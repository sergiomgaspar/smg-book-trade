'use strict';
import about from './about.component';
import {
  AboutController
} from './about.component';

describe('Component: AboutComponent', function() {
  // load the controller's module
  beforeEach(module('smgVotingAppApp.about'));

  var AboutComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AboutComponent = $componentController('about', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
