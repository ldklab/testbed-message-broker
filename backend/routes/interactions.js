const express = require('express');
const router = express.Router();

const Interaction = require('../models/interaction.model');
const colors = require('colors');

var progressiveID = 0;

var INTERACTION_TIMEOUT = 30; //30 secs

module.exports = function(io, DT){

  //Check if an interaction has timed out
  setInterval(() => {
    let pendingInteractions = interactions.filter(i => i.status == 1);
    pendingInteractions.forEach(PI => {
      //Check if timeout has occurred
      let timePassed = (Date.now() - PI.timestamp)/1000; // In seconds
      if(timePassed > INTERACTION_TIMEOUT) {
        PI.status = 3;
        io.emit("newInteractions", interactions);
      }
      //console.log(timePassed);
    });
  }, 1000); // Check every second


  router.get('', function (req, res) {
    res.status(200).json(interactions);
  });


  router.post('', function (req, res) {
    //console.log(req.body);

    const newInteraction = new Interaction({
      us_id: ++progressiveID,
      timestamp: Date.now(),
      status: 1,
      instructions: req.body.instructions,
      title: req.body.title,
      description: req.body.description,
      level: req.body.level,
      inputs: req.body.inputs
    });

    interactions = [
      newInteraction,
      ...interactions
    ];

    let resSend = DT.send(newInteraction, req.body.device);
    if(resSend.status === -1){
      console.log(colors.red(resSend.message));
      res.status(404).json({'message': resSend.message});
      newInteraction.status = 3;
    } else {
      res.status(201).json(newInteraction);
    }

    io.emit("newInteractions", interactions);

  });


  // For replies
  router.put('/:id', function (req, res) {
    let ID = req.params.id;
    console.log('PUT request for id: ' + ID);
    console.log('Body: ', req.body);

    let changedInteraction = interactions.filter(i => i._id == ID)[0];
    if(changedInteraction) {

      changedInteraction.status = 2;
      changedInteraction.response = req.body.data;

      io.emit("newInteractions", interactions);
      res.status(202).json({'message': 'Interaction updated successfully'});
    }else{
      res.status(404).json({'message': 'Interaction not found'});
    }
  });


  router.delete('/:id', function (req, res) {
    console.log("Deleting id: " + req.params.id);
    interactions = interactions.filter(interaction => interaction.id !== req.params.id);
    io.emit("newInteractions", interactions);
    res.status(200).json(interactions);
  });

  interactions = [
    /*new Interaction({
      title: 'First interaction',
      timestamp: 1560174284309,
      description: '5/Jun/19 @ 15:55:12',
      content: 'Content',
      status: 3,
      level: 1
    }),
    new Interaction({
      title: 'Second interaction',
      timestamp: 1560175284209,
      description: '5/Jun/19 @ 15:52:41',
      content: 'Content',
      status: 3,
      level: 1
    }),
    new Interaction({
      title: 'Third interaction',
      timestamp: 1560176284109,
      description: '5/Jun/19 @ 15:37:42',
      content: 'Content',
      status: 3,
      level: 1
    }),
    new Interaction({
      title: 'Fourth interaction',
      timestamp: 1560177274009,
      description: '5/Jun/19 @ 15:30:22',
      content: 'Content',
      status: 2,
      level: 1
    })*/
  ];

  return router;
}
