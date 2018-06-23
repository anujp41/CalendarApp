import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CalendarPage from './CalendarPage';
import store from '../store';

ReactDOM.render(
  <Provider store={store}>
    <CalendarPage />
  </Provider>,
  document.getElementById('app')
);