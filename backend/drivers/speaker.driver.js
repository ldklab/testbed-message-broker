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
  send: function(interaction, device){
  }
}
