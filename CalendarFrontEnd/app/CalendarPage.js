import React, { Component } from 'react';
import Header from './Header';
import Calendar from './Calendar';

class CalendarPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Calendar />
      </div>
    )
  }
}

export default CalendarPage;