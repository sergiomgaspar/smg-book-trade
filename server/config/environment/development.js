'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/smgbooktrade-dev?socketTimeoutMS=90000'
  },

  // Seed database on startup
  seedDB: false

};
