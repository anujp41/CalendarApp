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
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
            </tr>
            <tr>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>13</th>
              <th>14</th>
            </tr>
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