const express = require('express');
const router = express.Router();

const Device = require('../models/device.model');
const DriverTools = require('../drivers/drivers');

const DT = new DriverTools();

module.exports = function(io){

  router.get('', function (req, res) {
    res.status(200).json(devices);
  });

  router.post('', function (req, res) {
    let rndNmbr = Math.floor(Math.random() * 99) + 1;

    const newDevice = new Device(req.body); // Should check all the fields

    devices = [
      newDevice,
      ...devices
    ]


    console.log("Device added!");
    io.emit("newDevices", devices);
    res.status(200).send(devices);
  });


  router.get('/scan', function (req, res) {

    var result = DT.scan();

    res.status(200).send(result);
  });


  router.post('/scan', function (req, res) {

    var result = DT.add(req.body.id);
    devices = [
      result[0],
      ...devices
    ]
    io.emit("newDevices", devices);
    res.status(200).send(result);
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
