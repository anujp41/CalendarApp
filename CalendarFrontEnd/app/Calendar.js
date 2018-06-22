import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';

class CalendarPage extends Component {

  constructor() {
    super();
    this.renderDays = this.renderDays.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.renderDateRow = this.renderDateRow.bind(this);
    this.renderDateTable = this.renderDateTable.bind(this);
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  renderDays(day) {
    return (
      <th scope='col' className='col-sm-1 days'>{day}</th>
    )
  }

  renderDate() {
    return <td>15</td>;
  }

  renderDateRow() {
    return <tr><td>15</td><td>15</td><td>15</td><td>15</td><td>15</td><td>15</td><td>15</td></tr>;
  }

  renderDateTable() {
    return [this.renderDateRow(),this.renderDateRow(), this.renderDateRow()];
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
            {this.renderDateTable().map(dateRow=>dateRow)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CalendarPage;

/*
function callFiveTimes(callback, val) {
  // let count = 0;
  (function insideFunc(count=0) {
    if (count >= 5) return;
    count++;
    console.log('count is: ', count);
    return insideFunc(count);
  })();
}

function printThis(val) {
  return val;
}
*/