const SET_STATUS = 'SET_STATUS';
const GET_STATUS = 'GET_STATUS';

const initialState = false;

export const setStatus = () => {
  console.log('i am setting')
  return { type: SET_STATUS }}

export const getStatus = () => ({ type: GET_STATUS });

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_STATUS:
      return true;
    case SET_STATUS:
      return state;
    default:
      return state;
  }
}