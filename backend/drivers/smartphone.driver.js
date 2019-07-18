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
      var myObj = {deviceType: "Smartphone", API_URL: API_URL};
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

        wasFound = foundDevices.filter(d => d.address === foundDevice.address);
        if(wasFound.length === 0){
          foundDevices.push(foundDevice);
        }
      });

      interval = setInterval(() => {
        console.log("UDP message sent!".yellow);
        let API_URL = 'http://'+ip.address()+':3018/api';
        var myObj = {deviceType: "Smartphone", API_URL: API_URL};
        var message = new Buffer.from(JSON.stringify(myObj));
        reqServer.send(message, 0, message.length, PORT, BROADCAST_ADDR, function() {
          //console.log("Sent '" + message + "'from ip: " + reqServer.address().address + ":" + reqServer.address().port + " to broadcast addr: " + BROADCAST_ADDR);
        });
      }, 500);

      setTimeout(() => {
        reqServer.close();
        console.log("Timeout for scan of smartphones.".red);
        clearInterval(interval);
        //reject(); // Can't reject the timeout works both if I found something or not
        resolve(foundDevices);
      }, 3000);

    });
  },

  //CHECK availability
  available :function(device){
    console.log("Checking availability for device: " + device.name);

    return new Promise(function (resolve, reject) {
      ping.promise.probe(device.address)
      .then(r => resolve({"address": r.host, "online": r.alive}))
      .catch(e => reject(e));
    });
  },

  //SEND interaciton
  // Returns status of the Interaction => 1: Pending, 2: Completed, 3: Canceled
  send: function(interaction, device){
    const API_KEY = "key=AAAAx9RniFs:APA91bENgGMkX6tvKnUIDE1FuMsyJPmDhavPCtVichzvBQG1iyi4raXiya3UZ4xF_ocriRZu9xJTjcIgcScii6q4YZATKFL-fHoQeqcTnM-nryTJ2HAlaPyoBkK1y8ANqSy4C1LxvfSV";
    let jsonObj = {
      to: "/topics/all", //should be device.<KEY_OF_DEVICE>
     data: {
        title: interaction.title,
        description: interaction.description,
        id: interaction._id,
        interaction: interaction
      }
    };


    request({
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      },
      uri: 'https://fcm.googleapis.com/fcm/send',
      body: JSON.stringify(jsonObj),
      method: 'POST'
    }, function (err, res, body){
      if(err){
        console.log(colors.red("Error: ", err));
      }else{
        console.log("Body: ", body);
        //console.log("Res:", res);
      }
    });

    return 1;
  }
}
