const Driver = require('../models/driver.model');
const Device = require('../models/device.model');
//const TemplateDriver = require('./template.driver');

const request = require('request');

const drivers = [
  /*new Driver({
    name: 'Template',
    obj: require('./template.driver')
  }),*/
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
  })
];


//FAKE DATA
devices = [
  new Device({
    online: false,
    name: 'Smartphone',
    address: '192.168.0.?',
    driverID: 'fakeDriverID'
  })
];

let foundDevices = [];
let io = null;

class DriverTool {

  constructor(io) {
    console.log('New DriverTool'.magenta);
    this.io = io;

    setInterval(() => {
      var change = false;
      this.checkAvailability()
      .then(availabilities => {
        availabilities.forEach(a => {
          // Find device
          console.log(a);
          let device = devices.filter(d => d.address == a.address)[0];
          if(device){
            console.log("Device found: " + device.name);
            if(device.online != a.online){ change = true; }
            device.online = a.online;
          }
        })

        if(change){
          console.log("EMITTING");
          this.io.emit("newDevices", devices);
        }
      })
      .catch((e) => console.log("Error: " + e));

    }, 5000);
  }

  getDevices(){
    return devices;
  }

  scan() {

    return new Promise(function(resolve, reject){
      var promises = [];
      foundDevices = [];
      drivers.forEach(driver => { //Scanning with each driver
        //console.log("Scanning with driver " + driver.name + "("+driver._id+")");
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

  checkAvailability() {

    return new Promise(function(resolve, reject){
      var promises = [];
      // drivers.forEach(driver => { //Scanning with each driver
      //   var promise = driver.obj.available();
      //   promises.push(promise);
      // }); //End of forEach

      devices.forEach(device => {
        //Search driver of that device
        let deviceDriver = drivers.filter(driver => driver._id == device.driverID)[0];
        if(deviceDriver){
          var p = deviceDriver.obj.available(device);
          promises.push(p);
        }

      }); //End of forEach

      Promise.all(promises)
      .then(availabilityResults => {
        // Interesting fields -> alive:Boolean, numeric_host:String(ip)
        let availabilities = [];
        availabilityResults.forEach(a => {
          availabilities.push(a);
        });
        resolve(availabilities);
      }).catch(e => {
        console.log('Error here!');
        reject(e);
      });//End Promise.all()

    }); //End of new Promise
  }


  add(id) {
    //Check if altready present
    let found = false;
    devices.forEach(d => {
      if(d._id == id){
        found = true;
      }
    });

    if(!found){ //If not found add it
      // Looking for the correct device
      let newDevice = foundDevices.filter(d => d._id == id)[0];
      devices.push(newDevice);
    }
    return devices;
  }


  // @target = Device id
  send(interaction, target) {

    if((target !== null) && (target !== undefined)) {
      console.log("Target: " + target);
      console.log('Sending Interaction to device'.magenta);
      let targetDevice = devices.filter(d => d._id == target)[0];
      if(targetDevice) {
        console.log('Device found:'.magenta, targetDevice.address);

        //Find driver
        let driver = drivers.filter(d => d._id == targetDevice.driverID)[0];
        console.log("Driver found:".magenta, driver.name);
        let interactionStatus = driver.obj.send(interaction, targetDevice);
        interaction.status = interactionStatus;
      }

    } //End if((target !== null) && (target !== undefined))

  }
}

module.exports = DriverTool;
