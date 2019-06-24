const express = require('express');
const router = express.Router();


module.exports = function(io){

  router.get('', function (req, res) {
    res.status(200).json(interactions);
  });


  router.post('', function (req, res) {
    console.log(req.body);
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const newInteraction = {
      id: id,
      timestamp: Date.now(),
      status: 1,
      title: req.body.title,
      message: req.body.message,
      level: req.body.level
    }

    interactions = [
      newInteraction,
      ...interactions
    ];

    res.status(200).json(interactions);
    io.emit("newInteractions", interactions);
  });


  router.delete('/:id', function (req, res) {
    console.log("Deleting id: " + req.params.id);
    interactions = interactions.filter(interaction => interaction.id !== req.params.id);
    io.emit("newInteractions", interactions);
    res.status(200).json(interactions);
  });

  interactions = [
    {
      id: 'ifhwqikqfhnwfqwfcqw',
      title: 'First interaction',
      timestamp: 1560174284309,
      description: '5/Jun/19 @ 15:55:12',
      content: 'Content',
      status: 1
    },
    {
      id: 'ifhwqikqgrebefhnfcqw',
      title: 'Second interaction',
      timestamp: 1560175284209,
      description: '5/Jun/19 @ 15:52:41',
      content: 'Content',
      status: 1
    },
    {
      id: 'ifhwqikqfwedqwdqwhnfcqw',
      title: 'Third interaction',
      timestamp: 1560176284109,
      description: '5/Jun/19 @ 15:37:42',
      content: 'Content',
      status: 3
    },
    {
      id: 'ifhwqigewkqfhnfcqw',
      title: 'Fourth interaction',
      timestamp: 1560177274009,
      description: '5/Jun/19 @ 15:30:22',
      content: 'Content',
      status: 2
    }
  ];

  return router;
}
