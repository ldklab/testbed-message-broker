const express = require('express');
const router = express.Router();

const Device = require('../models/device.model');
const DriverTools = require('../drivers/driver-tool');

const DT = new DriverTools();

module.exports = function(io){

  router.get('', function (req, res) {
    let devices = DT.getDevices();
    res.status(200).json(devices);
  });

  router.get('/scan', function (req, res) {

    DT.scan()
    .then(devices => {
      res.status(200).send(devices);
    }).catch(e => {
      res.status(500).send({'message': 'Something bad happened!', 'error': e});
    });

  });


  router.post('/scan', function (req, res) {
    var devices = DT.add(req.body.id); // Passing the id and looking in previously found devices

    io.emit("newDevices", devices);
    res.status(200).send(devices);
  });


  return router;
}
