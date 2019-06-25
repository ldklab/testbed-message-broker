const express = require('express');
const router = express.Router();

const Device = require('../models/device.model');

module.exports = function(io){
  router.get('', function (req, res) {
    res.status(200).json(devices);
  });

  router.post('', function (req, res) {
    let rndNmbr = Math.floor(Math.random() * 99) + 1;
    devices.push(
      {
        name: 'Device ' + rndNmbr,
        description: 'Description',
        content: 'Content'
      }
    );
    console.log("Device added!");
    io.emit("newDevices", devices);
    res.status(200).send({message: "Device added!"});
  });

  //FAKE DATA
  devices = [
    new Device({
      online: true,
      name: 'Smartphone',
      description: 'Description'
    }),
    new Device({
      online: false,
      name: 'Smart TV',
      description: 'Description'
    }),
    new Device({
      online: true,
      name: 'SONOS Speaker',
      description: 'Description'
    })
  ];

  return router;
}
