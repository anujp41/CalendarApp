// import axios from 'axios';

const CREATE_EVENT = 'CREATE_EVENT';
const GET_EVENTS = 'GET_EVENTS';

const initialState = {'3': [{description: 'Event', eventDate: '3', startDate: '14:30', endDate: '20:00'}]};

export const createEvent = event => ({ type: CREATE_EVENT, event });

export const getEvents = events => ({ type: GET_EVENTS, events});

// export const createFurbabyThunk = furbaby => dispatch => {
//   return axios.post('http://localhost:8080/api/furbabies', furbaby)
//   .then(newFurbaby => newFurbaby.data)
//   .then(newKitty => {
//     newKitty.arrivedDate = new Date(newKitty.arrivedDate);
//     return newKitty;
//   })
//   .then(newFurbaby => dispatch(createFurbaby(newFurbaby)))
//   .catch(err => console.log(err));
// }

// export const getFurbabiesThunk = () => dispatch =>
//   axios.get('http://localhost:8080/api/furbabies')
//   .then(furbabies => furbabies.data)
//   .then(furbabiesArr => furbabiesArr.map(furbaby => {
//     furbaby.arrivedDate = new Date(furbaby.arrivedDate);
//     return furbaby;
//   }))
//   .then(furbabies => dispatch(getFurbabies(furbabies)))
//   .catch(err => console.log(err));


export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      const date = action.event.eventDate;
      state[date] ? state[date].push(action.event) : state[date] = [action.event];
      return state;
    case GET_EVENTS:
      return action.events;
    default:
      return state;
  }
}