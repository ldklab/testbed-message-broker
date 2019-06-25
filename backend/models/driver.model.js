const mongoose = require ('mongoose');

const driverSchema = mongoose.Schema({ //This is just a blueprint
  //id: { type: String, required: false }, //Already present: _id
  name: { type: String, required: false },
  obj: { type: Object, required: false }
});

module.exports = mongoose.model('Driver', driverSchema); //Collection name is interactions
