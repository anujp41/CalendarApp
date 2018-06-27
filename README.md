# Calendar App

# Instructions for running the webapp

The following instructions assume that your machine has PostgreSQL installed and running on port:5432

    createdb spotify-calendar-app
    npm run seed
    npm start

You can see the webapge at `http://localhost:3000/`

# Architecture


## Front-End

Calendar component shows the calendar on the front-screen; user can interact with this component to add events to a give date and on adding an event. Calendar also lists the events within each date; on clicking listed events on a given date, user can update or delete events.

CalendarEventModal is the modal opened when the user wants to add an event or edit an event; I am re-using the same modal in both cases using ternary operator to generate different headers, additional drowpdowns, and different button depending on the user;


### Redux store

Redux store was created to help each of the front-end components have access to one true source data and ensures that all components have the most up-to-date information.

Code for redux store is shown in `CalendarFrontEnd/store/` folder

## Back-End

Back-end runs on Node.js with PostgreSQL and Sequelize as the ORM.

As the assumption is one user, I only have an `Events` table that stores all the events as shown in `CalendarBackend/models/` folder. The `CalendarBackend/db/` initialized the database and contains the `seed.js` file that store the seed data for the back-end.

`CalendarBackend/api/` has all of the routes for each of the RESTful methods. This also has the `updateJSONObject` function that modifies data from back-end that can then be utilized by the front-end components.

I've shown below the basic structure of the modified back-end database that is consumed by front-end components. `date1` can be any date that has events stored by the user. The `date1` key has an array for its value; the array can then store any number of events for that date.

```javascript
{[date1]: [{event1}, {event2}]}
```

### Notes

1. Calendar app shows the month of Feb 2015 as this was the last February that started on Sunday; it made for a relatively easier way of showing the calendar

2. An issue faced with this project was rerendering component; as react only does shallow comprarision I had to spend time looking how to force react to do deep comparision. An easy way to solve this was to use `Object.assign` prior to returning from redux store thereby ensuring that, on shallow comparision of nextProps, the components re-render.

3. Back-end database became complicated for `PUT` requests; I started updating the store in reducer. One way to uncomplicate this process is to call `GET` method after updating so we get the new store with manupulations done on the back-end rather on the store so out store is updated with the updated event value from the back-end


