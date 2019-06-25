const mongoose = require ('mongoose');


const Capability = mongoose.Schema({
  in: { type: [String], require: false},
  out: { type: [String], require: false}
});


const deviceSchema = mongoose.Schema({ //This is just a blueprint
  //id: { type: String, required: false }, //Already present: _id
  name: { type: String, required: false },
  description: { type: String, required: false },
  capabilities: { type: Capability, required: true },
  lastActive: { type: Date, required: true },
  address: { type: String, required: false },
  driver: { type: String, required: false },
  driver_id: { type: String, required: false },

});

module.exports = mongoose.model('Device', interactionSchema); //Collection name is interactions
