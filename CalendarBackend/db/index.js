const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/calendar-anuj', {
    logging: false
});

module.exports = db;