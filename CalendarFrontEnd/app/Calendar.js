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
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
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