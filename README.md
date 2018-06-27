# Calendar App

# Instructions for running the webapp

The following instructions assume that your machine has PostgreSQL installed and running on port:5432.

After you clone the repo and navigate to the folder that contains the repo:

    cd CalendarApp
    npm install
    createdb spotify-calendar-app
    npm run seed
    npm start

> If `npm start` gives error (which happened to me once out of 20+ tries, please run in developer mode using `npm run start-dev`) - Apologize in advance if this happens!

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

# Specs completed:

Listed below are the specs required for this app on the Survey Monkey Application Build Form. I have cross out the specs that I have completed.

Must Have Specs

* ~~The UI should have one month hard coded view (Pick any month)~~
* ~~Ignore users/login, just have one hardcoded user~~
* ~~Click on a day box, and be able to create a new event on that day which gets sent to the backend on clicking submit.~~
    * ~~The form should have start time, end time, description and submit.~~
    * ~~Once submit is clicked the form should disappear.~~
    * ~~Event should now appear in that day’s box.~~
    * ~~Events cannot span multiple days. Must start and end the same day.~~
* ~~Show all events the user has on their calendar.~~
* ~~The UI should have 4 rows of 7 boxes (simple case of a 28 day month).~~
* ~~The application should communicate with an API backend using JSON. Don’t spend a lot of time on the UI making it look beautiful; just make it functional.~~

Optional Specs (Not required; bonus points available for inclusion of one or more features)

* ~~Switch between months~~
* Week or day view
* Handle events spanning multiple days
* ~~Handle too many events to fit in your box UI on a given day.~~
* ~~You should be able to update/delete events. How you implement this UX is up to you.~~
* ~~The UI should have 5 rows of 7 boxes with the correct date on the correct days.~~