const express = require('express');
const router = express.Router();


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
    {
      online: true,
      name: 'Smartphone',
      description: 'Description',
      content: 'Content'
    },
    {
      online: false,
      name: 'Smart TV',
      description: 'Description',
      content: 'Content'
    },
    {
      online: true,
      name: 'SONOS Speaker',
      description: 'Description',
      content: 'Content'
    }
  ];

  return router;
}
