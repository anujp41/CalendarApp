import axios from 'axios';
// import setStatus from './getStatus';

const CREATE_EVENT = 'CREATE_EVENT';
const GET_EVENTS = 'GET_EVENTS';

const initialState = {getStatus: false, events: []};

export const createEvent = event => ({ type: CREATE_EVENT, event });

export const getEvents = events => ({ type: GET_EVENTS, events});

export const createEventThunk = event => dispatch => 
  axios.post('http://localhost:3000/api/events', event)
  .then(event => dispatch(createEvent(event.data)))
  .catch(err => console.log(err));

export const getEventsThunk = () => dispatch =>
  axios.get('http://localhost:3000/api/events')
  .then(events => dispatch(getEvents(events.data)))
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      const date = action.event.eventDate;
      state[date] ? state[date].push(action.event) : state[date] = [action.event];
      return state;
    case GET_EVENTS:
      return {getStatus: true, events: action.events};
    default:
      return state;
  }
}