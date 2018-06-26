const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/spotify-calendar-app', {
    logging: false
});

module.exports = db;