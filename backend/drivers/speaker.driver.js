const Device = require('../models/device.model');

const { DeviceDiscovery, Sonos } = require('sonos');
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
