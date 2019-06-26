var PORT = 3017;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var ip = require("ip");
var BROADCAST_ADDR = '192.168.0.255';

var Device = require('../models/device.model');

server.bind(function () {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
  server.setBroadcast(true);
});

server.on('message', function (message, rinfo) {

});



module.exports = {
  //SEARCH/SCAN for device
  scan: function(driverID){

    return new Promise(function (resolve, reject) {
      let reqServer = dgram.createSocket('udp4');
      //reqServer.setBroadcast(true);
      //reqServer.bind(PORT); //Autobinding port to avoid conflict / solvabe in other ways

      var myObj = {deviceType: "TV"};
      var message = new Buffer.from(JSON.stringify(myObj));
      reqServer.send(message, 0, message.length, PORT, BROADCAST_ADDR, function() {
        //console.log("Sent '" + message + "'from ip: " + reqServer.address().address + ":" + reqServer.address().port + " to broadcast addr: " + BROADCAST_ADDR);
      });

      let foundDevices = [];

      reqServer.on('message', function (message, rinfo) {
        var D = JSON.parse(message);
        //console.log('Received back ('+rinfo.port+'): ', D);

        //ToDo: Close socket //Probably the object is destroyed anyway after the 'resolve'
        //reqServer.close();
        //resolve(); // Can't resolve here otherwise the scan will find just one device
        foundDevice = new Device({
          id: D.id,
          name: D.name,
          lastActive: D.timestamp,
          address: D.address,
          //port: D.port //Not standard
          online: true,
          driver_id: driverID
        });

        foundDevices.push(foundDevice);
      });

      setTimeout(() => {
        reqServer.close();
        //reject(); // Can't reject the timeout works both if I found something or not
        resolve(foundDevices);
      }, 1000);

    });
  },

  //CHECK availability
  available :function(){
  },

  //SEND interaciton
  send: function(){

  }
}
