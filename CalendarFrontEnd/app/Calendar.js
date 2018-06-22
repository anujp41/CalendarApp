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
      <th key={day} scope='col' className='col-sm-1 days'>{day}</th>
    )
  }

  renderDate(date) {
    return <td key={date}>{date}</td>;
  }

  renderDateRow(num) {
    let dateArray = new Array(7);
    const maxLength = dateArray.length;
    for (let i = 0; i < maxLength; i++) {
      const date = (num*7) + i + 1;
      dateArray[i] = this.renderDate(date);
    }
    return dateArray;
  }

  renderDateTable() {
    let dateTable = new Array(4);
    const maxLength = dateTable.length;
    for (let i = 0; i < maxLength; i++) {
      dateTable[i] = this.renderDateRow(i);
    }
    return dateTable;
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
            {this.renderDateTable().map((dateRow, idx)=><tr key={idx}>{dateRow}</tr>)}
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