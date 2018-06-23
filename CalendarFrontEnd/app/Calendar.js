import React, { Component } from 'react';
import './Calendar.css';
import CalendarEventModal from './CalendarEventModal';
import { connect } from "react-redux";

class CalendarPage extends Component {

  constructor() {
    super();
    this.checkEvents = this.checkEvents.bind(this);
    this.renderDaysHeader = this.renderDaysHeader.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.renderDateRow = this.renderDateRow.bind(this);
    this.renderDateTable = this.renderDateTable.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.state = {
      showModal: false
    }
  }

  toggleModal() {
    const showModal = this.state.showModal;
    this.setState({ showModal: !showModal })
  }

  renderDaysHeader(day) {
    return (
      <th key={day} scope='col' className='col-sm-1 days'>{day}</th>
    )
  }

  checkEvents(date) {
    const events = this.props.events;
    if (date in events) {
      return <div className='event-num'>{events[date].length} events(s) today!</div>
    }
  }

  renderDate(date) {
    return <td key={date} className='date'>{date}{this.checkEvents(date)}</td>;
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
    console.log('here: ', this.props.events)
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

        {this.state.showModal && <CalendarEventModal showModal={this.state.showModal} toggleModal={this.toggleModal}/>}

        {!this.state.showModal && 
        <div className='tool-tip'>
          <div className='fa fa-plus add-event' data-toggle='tooltip' data-placement="bottom" title="Tooltip on bottom" onClick={this.toggleModal}></div>
          <span className="tool-tip-text">Click to add events!</span>
        </div>}

      </div>
    )
  }
}

const mapState = state => {
  return {
    events: state.events
  }
}

const CalendarPageContainer = connect(mapState, null)(CalendarPage);
export default CalendarPageContainer;