const Driver = require('../models/driver.model');
const Device = require('../models/device.model');
//const TemplateDriver = require('./template.driver');

const drivers = [
  /*new Driver({
    name: 'Template',
    obj: require('./template.driver')
  }),*/
  new Driver({
    name: 'TV Driver',
    obj: require('./tv.driver')
  }),
  /*new Driver({
    name: 'Smartphone Driver',
    obj: require('./smartphone.driver')
  }),
  new Driver({
    name: 'SONOS Driver',
    obj: require('./speaker.driver')
  }),*/
];

class DriverTool {

  constructor() {
    console.log('New DriverTool');
  }

  scan() {

    return new Promise(function(resolve, reject){
      var promises = [];
      let foundDevices = [];
      drivers.forEach(driver => { //Scanning with each driver
        var promise = driver.obj.scan(driver._id);
        promises.push(promise);
      }); //End of forEach

      Promise.all(promises)
      .then(devicesArrayArray => {

        devicesArrayArray.forEach(deviceArray => {
          deviceArray.forEach(device => foundDevices.push(device));
        });

        resolve(foundDevices);
      }).catch(e => {
        console.log('Error here!');
        reject(e);
      });//End Promise.all()

    }); //End of new Promise
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
