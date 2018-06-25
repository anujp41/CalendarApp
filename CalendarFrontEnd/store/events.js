import axios from 'axios';

const CREATE_EVENT = 'CREATE_EVENT';
const GET_EVENTS = 'GET_EVENTS';
const REMOVE_EVENT = 'REMOVE_EVENT';

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
export const removeEvent = (date, idx) => ({ type: REMOVE_EVENT, date, idx });

export const createEventThunk = event => dispatch => 
  axios.post('http://localhost:3000/api/events', event)
  .then(event => dispatch(createEvent(event.data)))
  .catch(err => console.log(err));

export const getEventsThunk = () => dispatch =>
  axios.get('http://localhost:3000/api/events')
  .then(events => dispatch(getEvents(events.data)))
  .catch(err => console.log(err));

export const removeEventThunk = (idx, date, dbId) => dispatch =>
  axios.delete(`http://localhost:3000/api/events/${dbId}`)
  .then(resStatus => {
    if (resStatus.status === 204) dispatch(removeEvent(date, idx));
  })
  .catch(err => console.log(err));

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      const date = Object.keys(action.event)[0];
      return state.hasOwnProperty(date) ? mergeEventsToState(state, action.event) : {...state, ...action.event};
    case GET_EVENTS:
      return action.events;
    case REMOVE_EVENT:
      state[action.date].splice(action.idx,1);
      if (state[action.date].length === 0) delete state[action.date];
      return Object.assign({}, state);
    default:
      return state;
  }
}