const { db, Events } = require('../models');
const genEventSeed = require('./seedGenerator');

const events = genEventSeed();

const seed = async () =>
  Promise.all(events.map(event => Events.create(event)))
    .then(() => console.log("Seeding complete!"));

const main = () => {
  console.log("Syncing db...");
  db.sync({force: true})
    .then(() => {
      console.log("Seeding database...");
      return seed();
    })
    .catch(err => {
      console.log("Error while seeding");
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();