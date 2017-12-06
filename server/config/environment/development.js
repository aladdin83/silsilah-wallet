'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27018/wallet-dev'
  },
  bigchaindb: {
    apiPath: 'http://localhost:59984/api/v1/'
  },
  // Seed database on startup
  seedDB: true

};
