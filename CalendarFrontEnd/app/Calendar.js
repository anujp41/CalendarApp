import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';

class CalendarPage extends Component {

  constructor() {
    super();
    this.renderDays = this.renderDays.bind(this);
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  renderDays(day) {
    return (
      <th scope='col' className='col-sm-1 days'>{day}</th>
    )
  }



  render() {
    return (
      <div className='container calendar'>
        <table className='table'>
          <thead>
            <tr>
              {this.days.map(this.renderDays)}
            </tr>
          </thead>
          <tbody>
            <td></td>
          </tbody>
        </table>
      </div>
    )
  }
}

export default CalendarPage;