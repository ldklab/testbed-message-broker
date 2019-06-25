const Driver = require('../models/driver.model');
const Device = require('../models/device.model');
//const TemplateDriver = require('./template.driver');

const drivers = [
  new Driver({
    name: 'Template',
    obj: require('./template.driver')
  }),
  new Driver({
    name: 'TV Driver',
    obj: require('./tv.driver')
  }),
  new Driver({
    name: 'Smartphone Driver',
    obj: require('./smartphone.driver')
  }),
  new Driver({
    name: 'SONOS Driver',
    obj: require('./speaker.driver')
  }),
];

class DriverTool {
  constructor() {
    console.log('New DriverTool');
  }

  scan() {

    devices = [];

    drivers.forEach(driver => { //Scanning with each driver

      driver.obj.scan().forEach(device => {
        console.log(device);
        device.driver_id = driver._id;

        devices.push(device);
      })

    });

    return devices;
  }
}

module.exports = DriverTool;
