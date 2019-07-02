const Device = require('../models/device.model');

module.exports = {

  //SEARCH/SCAN for device
  scan: function(driverID){
    return new Promise(function (resolve, reject) {
    });
  },

  //CHECK availability
  available :function(device){
  },

  //SEND interaciton
  // Returns status of the Interaction => 1: Pending, 2: Completed, 3: Canceled
  send: function(interaction, device){
  }
}
