const router = require('express').Router();
const { Events } = require('../models');

router.get('/', function (req, res, next) {
  Events.findAll()
  .then(events => res.json(events))
  .catch(next);
});

router.post('/', function (req, res, next) {
  console.log('hey');
  Events.create(req.body)
  .then(newEvent => res.json(newEvent))
  .catch(next);
});

// router.put('/:eventId', function (req, res, next) { /* etc */});
// router.delete('/:eventId', function (req, res, next) { /* etc */});

module.exports = router;