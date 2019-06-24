const mongoose = require ('mongoose');

const InteractionButton = mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true }
});
const InteractionInput = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  elements: { type: [String], required: false },
  text: { type: String, required: true },
  require: { type: Boolean, required: true },
});


const interactionSchema = mongoose.Schema({ //This is just a blueprint
  //id: { type: String, required: false }, //Already present: _id
  us_id: { type: String, required: false },
  timestamp: { type: Date, required: false },
  status: { type: Number, required: false },
  title: { type: String, required: true },
  message: { type: String, required: true },
  specific: { type: String, required: false },
  instructions: { type: [String], required: false },
  buttons: { type: [InteractionButton], required: false },
  level: { type: Number, required: true },
  inputs: { type: [InteractionInput], required: false },
});

module.exports = mongoose.model('Interaction', interactionSchema); //Collection name is interactions
