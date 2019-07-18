const express = require('express');
const router = express.Router();
const colors = require('colors');

const Device = require('../models/device.model');

module.exports = function(io, DT){

  router.get('', function (req, res) {
    let devices = DT.getDevices();
    res.status(200).json(devices);
  });

  router.get('/scan', function (req, res) {

    DT.scan()
    .then(devices => {
      res.status(200).send(devices);
    }).catch(e => {
      console.log("About to send 500 Internal Server Error".red);
      res.status(500).send({'message': 'Something bad happened!', 'error': e});
    });

  });

  router.post('/scan', function (req, res) {
    var devices = DT.add(req.body.id); // Passing the id and looking in previously found devices

    io.emit("newDevices", devices);
    res.status(201).send(devices);
  });


  return router;
}
