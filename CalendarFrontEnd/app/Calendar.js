import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import CalendarEventModal from './CalendarEventModal';

class CalendarPage extends Component {

  constructor() {
    super();
    this.renderDaysHeader = this.renderDaysHeader.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.renderDateRow = this.renderDateRow.bind(this);
    this.renderDateTable = this.renderDateTable.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.state = {
      showModal: true,
      date: 10
    }
  }

  handleClick(date) {
    this.setState({ showModal: true, date })
  }

  toggleModal() {
    this.setState({ showModal: false, date: null })
  }

  renderDaysHeader(day) {
    return (
      <th key={day} scope='col' className='col-sm-1 days'>{day}</th>
    )
  }

  renderDate(date) {
    return <td key={date} className='date' onClick={()=>this.handleClick(date)}>{date}</td>;
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
        <div className='month-year'>February 2015</div>
        <table className='table'>
          <thead>
            <tr>
              {this.days.map(this.renderDaysHeader)}
            </tr>
          </thead>
          <tbody>
            {this.renderDateTable().map((dateRow, idx)=><tr key={idx}>{dateRow}</tr>)}
          </tbody>
        </table>

        {this.state.showModal && <CalendarEventModal showModal={this.state.showModal} date={this.state.date} toggleModal={this.toggleModal}/>}



      </div>
    )
  }
}

export default CalendarPage;