const mongoose = require ('mongoose');


const Capability = mongoose.Schema({
  in: { type: [String], require: false},
  out: { type: [String], require: false}
},{ _id : false });


const deviceSchema = mongoose.Schema({ //This is just a blueprint
  //id: { type: String, required: false }, //Already present: _id
  name: { type: String, required: false },
  description: { type: String, required: false },
  capabilities: { type: Capability, required: false },
  lastActive: { type: Date, required: false },
  address: { type: String, required: false },
  driverID: { type: String, required: false },
  deviceID: { type: String, required: false },
  online: { type: Boolean, require: false }
});

module.exports = mongoose.model('Device', deviceSchema); //Collection name is interactions
