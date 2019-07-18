var PORT = 3017;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var ip = require("ip");
var BROADCAST_ADDR = '192.168.0.255';
const request = require('request');

var ping = require('ping');

var Device = require('../models/device.model');

var colors = require('colors');
colors.setTheme({
  warn: 'yellow',
  debug: 'cyan',
  error: ['yellow', 'bgRed']
});

server.bind(function () {
  var address = server.address();
  console.log(colors.debug('UDP Server listening on ' + address.address + ":" + address.port));
  server.setBroadcast(true);
});



module.exports = {
  //SEARCH/SCAN for device
  scan: function(driverID){

    return new Promise(function (resolve, reject) {
      let reqServer = dgram.createSocket('udp4');
      //reqServer.setBroadcast(true);
      //reqServer.bind(PORT); //Autobinding port to avoid conflict / solvabe in other ways

      let API_URL = 'http://'+ip.address()+':3018/api';
      var myObj = {deviceType: "TV", API_URL: API_URL};
      var message = new Buffer.from(JSON.stringify(myObj));
      reqServer.send(message, 0, message.length, PORT, BROADCAST_ADDR, function() {
        console.log("Sent '" + message + "'from ip: " + reqServer.address().address + ":" + reqServer.address().port + " to broadcast addr: " + BROADCAST_ADDR);
      });

      let foundDevices = [];

      reqServer.on('message', function (message, rinfo) {
        var D = JSON.parse(message);
        //console.log('Received back ('+rinfo.port+'): ', D);

        //ToDo: Close socket //Probably the object is destroyed anyway after the 'resolve'
        //reqServer.close();
        //resolve(); // Can't resolve here otherwise the scan will find just one device
        foundDevice = new Device({
          deviceID: D.deviceID,
          name: D.name,
          lastActive: D.timestamp,
          address: D.address,
          //port: D.port //Not standard
          online: true,
          driverID: driverID,
          capabilities: D.capabilities
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

  // CHECK availability
  available: function(device){
    console.log("Checking availability for device: " + device.name + " (" + device.address + ")");
    return new Promise(function (resolve, reject) {
      ping.promise.probe(device.address)
      .then(r => resolve({"address": r.host, "online": r.alive}))
      .catch(e => reject(e));
    });
  },

  //SEND interaciton
  // Returns status of the Interaction => 1: Pending, 2: Completed, 3: Canceled
  send: function(interaction, device){

    const API_URL = 'http://'+device.address+':80';
    console.log('API URL: ' + API_URL);
    request.post({
      url: API_URL,
      body: interaction,
      json: true
    }, function(error, response, body){
      console.log("API Response: ", body);
    });

    return 1;
  }
}
