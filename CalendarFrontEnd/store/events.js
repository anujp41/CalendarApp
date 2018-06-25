import axios from 'axios';

const CREATE_EVENT = 'CREATE_EVENT';
const GET_EVENTS = 'GET_EVENTS';

const initialState = {};

const mergeEventsToState = (priorState, newEvent) => {
  const resultObj = {};
  for (let key in priorState) {
    if (!newEvent[key]) {
      resultObj[key] = priorState[key];
    } else {
      resultObj[key] = [...priorState[key], ...newEvent[key]];
    }
  }
  return resultObj;
}

export const createEvent = event => ({ type: CREATE_EVENT, event });
export const getEvents = events => ({ type: GET_EVENTS, events });

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
      const date = Object.keys(action.event)[0];
      return state.hasOwnProperty(date) ? mergeEventsToState(state, action.event) : {...state, ...action.event};
    case GET_EVENTS:
      return action.events;
    default:
      return state;
  }
}