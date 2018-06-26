const router = require('express').Router();
const { Events } = require('../models');

//function changes database results from simple JSON to complicated that can be used by front-end
const listFunctions = events => {
  let eventArr = [];
  if (Array.isArray(events)) {
    eventArr = events.map(event => event.dataValues);
  } else {
    eventArr = [events.dataValues];
  }
  const eventObj = {};
  for (let event of eventArr) {
    eventObj[event.eventDate] ? eventObj[event.eventDate].push(event) : eventObj[event.eventDate] = [event];
  }
  return eventObj;
}

router.get('/', function (req, res, next) {
  Events.findAll()
  .then(events => res.json(listFunctions(events)))
  .catch(next);
});

router.post('/', function (req, res, next) {
  Events.create(req.body)
  .then(event => res.json(listFunctions(event)))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.findById(id)
      .then(event => event.update(req.body))
      .then(updatedEvent => res.json(listFunctions(updatedEvent)))
      .catch(next)
})

router.delete('/:id', function (req, res, next) {
  const {id} = req.params;
  Events.destroy({where: {id}})
  .then(() => res.sendStatus(204))
  .catch(next);
});

// router.put('/:eventId', function (req, res, next) { /* etc */});
// router.delete('/:eventId', function (req, res, next) { /* etc */});

module.exports = router;