const Device = require('../models/device.model');

const { AsyncDeviceDiscovery, DeviceDiscovery, Sonos } = require('sonos');
const colors = require('colors');

var express = require('express');
var app = express();

app.use(express.static('public'));
app.listen(3020);

const https = require('https');
const fs = require('fs');

var googleTTS = require('google-tts-api');


module.exports = {


  //SEARCH/SCAN for device
  scan: function(driverID){
    let foundDevices = [];
    let discovery = new AsyncDeviceDiscovery();
    console.log("Scan for speaker called!");

    return new Promise(function (resolve, reject) {
      discovery.discover().then((device) => {
        console.log(colors.green("Found device: "),  device);

        foundDevice = new Device({
          //deviceID: "testID", // Should be chosen by the device but I'll let mongoose chose
          name: "SONOS Speaker",
          lastActive: Date.now(),
          address: device.host,
          //port: D.port //Not standard
          online: true,
          driverID: driverID
        });
        foundDevice.deviceID = foundDevice._id;

        foundDevices.push(foundDevice);
      });


      setTimeout(() => {
        //reject(); // Can't reject the timeout works both if I found something or not
        resolve(foundDevices);
      }, 1000);
    });
  },

  //CHECK availability
  available: function(device){
  },

  //SEND interaciton
  send: function(interaction, device){
    const device = new Sonos(device.address)
  }
}
