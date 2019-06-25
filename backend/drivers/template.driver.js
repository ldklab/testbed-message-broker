const Device = require('../models/device.model');

module.exports = {

  //SEARCH/SCAN for device
  scan: function(){
    console.log('Scan called');

    return [
      new Device({
        name: 'Random device'
      })
    ];
  },

  //CHECK availability
  available :function(){
  },

  //SEND interaciton
  send: function(){

  }
}
