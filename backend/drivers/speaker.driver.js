const Device = require('../models/device.model');

const { AsyncDeviceDiscovery, DeviceDiscovery, Sonos } = require('sonos');
const colors = require('colors');


var ping = require('ping');

var express = require('express');
var app = express();

app.use(express.static('./backend/public'));
app.listen(3020);

const https = require('https');
const fs = require('fs');

var googleTTS = require('google-tts-api');

var ip = require('ip');

definedCapabilities = {
  "in": [],
  "out": ["audio"]
}

module.exports = {


  // SEARCH/SCAN for device
  scan: function(driverID){
    let foundDevices = [];
    let discovery = new AsyncDeviceDiscovery();
    //console.log("Scan for speaker called! Driver id: " + driverID);

    return new Promise(function (resolve, reject) {
      // foundDevice = new Device({
      //   //deviceID: "testID", // Should be chosen by the device but I'll let mongoose chose
      //   name: "SONOS Laboratory",
      //   lastActive: Date.now(),
      //   address: "192.168.0.100",
      //   //port: D.port //Not standard
      //   online: true,
      //   driverID: driverID,
      //   capabilities: definedCapabilities
      // });
      // foundDevice.deviceID = foundDevice._id;
      // foundDevices.push(foundDevice);

      discovery.discover().then((device) => {
        //console.log(colors.green("Found device "), device);

        device.getZoneAttrs()
        .then(zoneName => {

          foundDevice = new Device({
            //deviceID: "testID", // Should be chosen by the device but I'll let mongoose chose
            name: "SONOS " + zoneName.CurrentZoneName,
            lastActive: Date.now(),
            address: device.host,
            //port: D.port //Not standard
            online: true,
            driverID: driverID,
            capabilities: definedCapabilities
          });
          foundDevice.deviceID = foundDevice._id;

          foundDevices.push(foundDevice);
        }).catch(e => console.log(colors.red(e)));
      }).catch(e => console.log(colors.red(e)));


      setTimeout(() => {
        //reject(); // Can't reject the timeout works both if I found something or not
        resolve(foundDevices);
      }, 1000);
    });
  },

  // CHECK availability
  available: function(device){
    //console.log("Checking availability for device: " + device.name + " (" + device.address + ")");
    return new Promise(function (resolve, reject) {
      ping.promise.probe(device.address)
      .then(r => resolve({"_id": device._id, "online": r.alive}))
      .catch(e => reject(e));
    });
  },

  // SEND interaciton
  // Returns status of the Interaction => 1: Pending, 2: Completed, 3: Canceled
  send: function(interaction, device){
    const sonosDevice = new Sonos(device.address);

    generateAudio(interaction.title + ". " + interaction.description)
    .then(audio => {

          sonosDevice.playNotification({
          uri: audio,
          onlyWhenPlaying: false, // It will query the state anyway, don't play the notification if the speaker is currently off.
          volume: 25 // Change the volume for the notification, and revert back afterwards.
         })
         .then((r) => console.log("Notification played: ", r))
         .catch((e) => console.log(colors.red("Error in playNotification: ...")));

      }).catch(e => console.log(e));

    return 2;
  }
}

function generateAudio(message) {
  return new Promise(function (resolve, reject){
      googleTTS(message, 'en', 1)   // speed normal = 1 (default), slow = 0.24
        .then(function (url) {
            //console.log(url); // https://translate.google.com/translate_tts?...
            const file = fs.createWriteStream('./backend/public/audio.mp3');
            const request = https.get(url, function(response) {
              response.pipe(file);
              let audioFilePath = 'http://'+ip.address()+':3020/audio.mp3';
              resolve(audioFilePath);
              //reject('Just a test');
            });
        })
        .catch(function (err) {
        console.error(err.stack);
        reject(err);
        });
  });
};
