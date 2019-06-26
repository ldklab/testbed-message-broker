const express = require('express');
const router = express.Router();

const Device = require('../models/device.model');
const DriverTools = require('../drivers/drivers');

const DT = new DriverTools();

let availableDevices = [];

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

    DT.scan()
    .then(devices => {

      availableDevices = [];
      devices.forEach(device => availableDevices.push(device));

      //TEST
      /*availableDevices.push(new Device({
        name: "Test",
        address: '192.168.0.54',
        lastActive: Date.now()
      }));*/

      res.status(200).send(availableDevices);
    }).catch(e => {
      res.status(500).send({'message': 'Something bad happened!', 'error': e});
    });


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
