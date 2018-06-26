const { db, Events } = require('../models');

const events = [
  {
    description: 'Meeting for lunch',
    eventDate: '10',
    startTime: '12:30',
    endTime: '13:30'
  },
  {
    description: 'Phone call with Spotify recruiter',
    eventDate: '27',
    startTime: '15:00',
    endTime: '15:30'
  },
  {
    description: 'ReactNYC Meet-Up',
    eventDate: '3',
    startTime: '18:00',
    endTime: '20:00'
  },
  {
    description: 'Buy flowers for Valentine',
    eventDate: '14',
    startTime: '18:30',
    endTime: '18:30'
  },
  {
    description: 'Meeting friends for dinner',
    eventDate: '14',
    startTime: '19:30',
    endTime: '21:00'
  },
  {
    description: 'Teaching Assistant phone interview',
    eventDate: '23',
    startTime: '14:00',
    endTime: '15:00'
  },
  {
    description: 'Banana Republic sale',
    eventDate: '15',
    startTime: '10:30',
    endTime: '21:00'
  },
  {
    description: 'Meet John to go to Costco',
    eventDate: '19',
    startTime: '18:30',
    endTime: '19:00'
  },
  {
    description: 'Coffee meet-up with Dave',
    eventDate: '25',
    startTime: '15:30',
    endTime: '16:00'
  },
  {
    description: 'Office visit with ad-tech company',
    eventDate: '16',
    startTime: '11:00',
    endTime: '13:30'
  },
  {
    description: 'Alumni meet-up at boot camp',
    eventDate: '9',
    startTime: '19:00',
    endTime: '20:30'
  },
  {
    description: 'Appointment for Sylvester at AMC',
    eventDate: '21',
    startTime: '15:00',
    endTime: '15:30'
  },
  {
    description: 'Trying out the new vegan resturant at Harlem',
    eventDate: '28',
    startTime: '19:00',
    endTime: '21:30'
  }
];

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