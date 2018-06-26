import React, { Component } from 'react';
import './Calendar.css';
import CalendarEventModal from './CalendarEventModal';
import EventListContainer from './EventList';
import { connect } from "react-redux";
import { getEventsThunk } from '../store';

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
      showModal: false,
      date: null,
      events: {}
    }
  }

  toggleModal(date=null) {
    const {showModal} = this.state;
    this.setState({ showModal: !showModal, date })
  }

  renderDaysHeader(day) {
    return <th key={day} scope='col' className='col-sm-1 days'>{day}</th>;
  }

  checkEvents(date) {
    const { events } = this.props;
    if (date in events) {
      return <div className='event-num'>{events[date].length} events(s) today!</div>;
    }
  }

  renderDate(date) {
    return <td key={date} className='date' onClick={()=>this.toggleModal(date)}>{date}{this.checkEvents(date)}</td>;
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

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div className='container calendar'>
        <div className='month-year'>February 2015</div>
        <table className='table'>
          <thead className='calendar-thead'>
            <tr>
              {this.days.map(this.renderDaysHeader)}
            </tr>
          </thead>
          <tbody className='calendar-row'>
            {this.renderDateTable().map((dateRow, idx)=><tr key={idx}>{dateRow}</tr>)}
          </tbody>
        </table>
        {this.state.showModal && <CalendarEventModal method='submit' showModal={this.state.showModal} toggleModal={this.toggleModal} date={this.state.date}/>}

        <EventListContainer />

      </div>
    )
  }
}

const mapState = state => {
  return {
    events: state.events
  }
}

const mapDispatch = dispatch => {
  return {
    getData() {
      dispatch(getEventsThunk());
    }
  }
}

const CalendarPageContainer = connect(mapState, mapDispatch)(CalendarPage);
export default CalendarPageContainer;