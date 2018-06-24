const router = require('express').Router();
const { Events } = require('../models');
const sequelize = require('sequelize');

//function changes database results from simple JSON to complicated that can be used by front-end
const listFunctions = events => {
  const eventArr = events.map(event => event.dataValues);
  const eventObj = {};
  for (let event of eventArr) {
    eventObj[event.eventDate] ? eventObj[event.eventDate].push(event) : eventObj[event.eventDate] = [event];
  }
  return eventObj;
}

router.get('/', function (req, res, next) {
  Events.findAll()
  .then(events => {
    const eventsFE = listFunctions(events)
    return res.json(eventsFE);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  Events.create(req.body)
  .then(newEvent => res.json(newEvent))
  .catch(next);
});

// router.put('/:eventId', function (req, res, next) { /* etc */});
// router.delete('/:eventId', function (req, res, next) { /* etc */});

module.exports = router;