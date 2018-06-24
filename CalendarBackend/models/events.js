const Sequelize = require('sequelize');
const db = require('../db');

const Events = db.define('event', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventDate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  startTime: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endTime: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = Events;