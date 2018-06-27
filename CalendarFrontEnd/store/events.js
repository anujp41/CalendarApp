import axios from 'axios';

/* this function allows to add a new event object to state 
    whether or not state has a particular date as key */
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
    
/* this function updates state; is called for both PUT and DELETE request
  for PUT, this would replace an event; for DELETE, would remove an event */
const updateState = (state, date, index, event=null, newDate=null) => {
  if (event===null) {
    state[date].splice(index,1);
    if (state[date].length === 0) delete state[date];
  } else {
    state[date].splice(index,1,event[newDate][0]);
  }
  return Object.assign({}, state);
}

// ACTION TYPES
const CREATE_EVENT = 'CREATE_EVENT';
const GET_EVENTS = 'GET_EVENTS';
const UPDATE_EVENT = 'UPDATE_EVENT';
const REMOVE_EVENT = 'REMOVE_EVENT';


// Initializing the state
const initialState = {};

// ACTION CREATORS
export const createEvent = event => ({ type: CREATE_EVENT, event });
export const getEvents = events => ({ type: GET_EVENTS, events });
export const updateEvent = (event, date, idx) => ({ type: UPDATE_EVENT, event, date, idx });
export const removeEvent = (date, idx) => ({ type: REMOVE_EVENT, date, idx });


// Thunks to handle async requests
export const createEventThunk = event => dispatch => 
  axios.post('http://localhost:3000/api/events', event)
  .then(event => dispatch(createEvent(event.data)))
  .catch(err => console.log(err));

export const getEventsThunk = (year, month, maxDateMonth) => dispatch =>
  axios.get(`http://localhost:3000/api/events/${year}/${month+1}/${maxDateMonth}`)
  .then(events => dispatch(getEvents(events.data)))
  .catch(err => console.log(err));

export const updateEventThunk = (event, date, idx) => dispatch =>
  axios.put(`http://localhost:3000/api/events/${event.id}`, event)
  .then(event => dispatch(updateEvent(event.data, date, idx)))
  .catch(err => console.log(err));

export const removeEventThunk = (idx, date, dbId) => dispatch =>
  axios.delete(`http://localhost:3000/api/events/${dbId}`)
  .then(resStatus => {
    if (resStatus.status === 204) dispatch(removeEvent(date, idx));
  })
  .catch(err => console.log(err));


// REDUCER where each of the RESTful method has a case
export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      const date = Object.keys(action.event)[0];
      return state.hasOwnProperty(date) ? mergeEventsToState(state, action.event) : {...state, ...action.event};
    case GET_EVENTS:
      return action.events;
    case UPDATE_EVENT:
      const initialDate = action.date;
      const currEventDate = parseInt(Object.keys(action.event)[0]);
      if (initialDate === currEventDate) {
        return updateState(state, initialDate, action.idx, action.event, currEventDate);
      } else {
        const updatedState = updateState(state, initialDate, action.idx);
        return updatedState.hasOwnProperty(currEventDate) ? mergeEventsToState(updatedState, action.event) : {...updatedState, ...action.event};
      }
    case REMOVE_EVENT:
      return updateState(state, action.date, action.idx);
    default:
      return state;
  }
}