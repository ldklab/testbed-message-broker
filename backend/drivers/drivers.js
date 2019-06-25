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
    this.lastFoundDevices = [];
  }

  scan() {
    this.lastFoundDevices = [];

    drivers.forEach(driver => { //Scanning with each driver

      driver.obj.scan().forEach(device => {
        console.log(device);
        device.driver_id = driver._id;

        this.lastFoundDevices.push(device);
      })

    });

    return this.lastFoundDevices;
  }


  add(id) {
    let result = this.lastFoundDevices.filter(device => device._id == id);

    console.log('ID requested: ' + id);
    console.log(this.lastFoundDevices);
    console.log('Result', result);

    return result;
  }
}

module.exports = DriverTool;
