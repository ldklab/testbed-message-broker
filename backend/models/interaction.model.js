const mongoose = require ('mongoose');

const InteractionButton = mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true }
},{ _id : false });

const InteractionInputElement = mongoose.Schema({
  text: { type: String, require: false},
  value: { type: String, require: false}
},{ _id : false });

const InteractionInput = mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: String, required: false },
  type: { type: String, required: true },
  elements: { type: [InteractionInputElement], required: false },
  require: { type: Boolean, required: true },
},{ _id : false });



const InteractionResponseInput = mongoose.Schema({
  name: { type: String, required: false },
  value: { type: String, required: false }
},{ _id : false });

const InteractionResponse = mongoose.Schema({
  inputs: { type: [InteractionResponseInput], require: false },
  buttonClicked: { type: String, require: false }
},{ _id : false });


const interactionSchema = mongoose.Schema({ //This is just a blueprint
  //id: { type: String, required: false }, //Already present: _id
  us_id: { type: String, required: false },
  timestamp: { type: Date, required: false },
  status: { type: Number, required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  specific: { type: String, required: false },
  instructions: { type: [String], required: false },
  buttons: { type: [InteractionButton], required: false },
  level: { type: Number, required: true },
  inputs: { type: [InteractionInput], required: false },
  response: { type: InteractionResponse, required: false },
  image: { type: String, required: false }
});

module.exports = mongoose.model('Interaction', interactionSchema); //Collection name is interactions
