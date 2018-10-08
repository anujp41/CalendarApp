const { Op } = require('sequelize');
const router = require('express').Router();
const { Events } = require('../models');
const moment = require('moment');

//using moment.js library, get date obj to convert below
const toDateObj = timeString => moment(timeString, 'hh:mm a');

//function changes database results from simple JSON to complicated that can be used by front-end
const updateJSONObject = events => {
  let eventArr = [];
  if (Array.isArray(events)) {
    eventArr = events.map(event => event.dataValues);
    eventArr = eventArr.sort((prev, curr) => toDateObj(curr.startTime) < toDateObj(prev.startTime) ? 1 : -1);
  } else {
    eventArr = [events.dataValues];
  }
  const eventObj = {};
  for (let event of eventArr) {
    const date = event.eventDate.getDate();
    eventObj[date] ? eventObj[date].push(event) : eventObj[date] = [event];
  }
  return eventObj;
}

/* Each of the handlers (except DELETE) call the updateJSONObject function above
    to modify the return JSON value in a JSON value with different key value */
// GET request handler
router.get('/:year/:month/:maxDate', function (req, res, next) {
  const { year, month, maxDate } = req.params;
  Events.findAll({
    where: {
      eventDate: {
        [Op.gte]: new Date(`${year}-${month}-1`),
        [Op.lte]: new Date(`${year}-${month}-${maxDate}`)
      }
    }
  })
  .then(events => res.json(updateJSONObject(events)))
  .catch(next);
});

// POST request handler
router.post('/', function (req, res, next) {
  Events.create(req.body)
  .then(event => res.json(updateJSONObject(event)))
  .catch(next);
});

// PUT request handler
router.put('/:id', (req, res, next) => {
  let {id} = req.params;
  Events.findById(id)
  .then(event => event.update(req.body))
  .then(updatedEvent => res.json(updateJSONObject(updatedEvent)))
  .catch(next)
})

// DELETE request handler
router.delete('/:id', function (req, res, next) {
  const {id} = req.params;
  Events.destroy({where: {id}})
  .then(() => res.sendStatus(204))
  .catch(next);
});

module.exports = router;