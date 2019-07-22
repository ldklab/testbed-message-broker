const Device = require('../models/device.model');

module.exports = {

  //SEARCH/SCAN for device
  scan: function(driverID){
    return new Promise(function (resolve, reject) {
    });
  },

  //CHECK availability
  // Returns {"_id": device._id, "online": <boolean_with_status>}
  available :function(device){
    return new Promise(function (resolve, reject) {
    });
  },

  //SEND interaciton
  // Returns status of the Interaction => 1: Pending, 2: Completed, 3: Canceled
  send: function(interaction, device){
  }
}
