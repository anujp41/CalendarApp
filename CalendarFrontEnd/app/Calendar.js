import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import CalendarEventModal from './CalendarEventModal';
import EventList from './EventList';
import { connect } from 'react-redux';
import { getEventsThunk } from '../store';

class CalendarPage extends Component {

  constructor() {
    super();
    this.renderEvents = this.renderEvents.bind(this);
    this.checkEvents = this.checkEvents.bind(this);
    this.renderDaysHeader = this.renderDaysHeader.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateDateState = this.updateDateState.bind(this);
    this.handlePrevNext = this.handlePrevNext.bind(this);
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.state = {
      showModal: false,
      date: null,
      events: {},
      today: null,
      year: null,
      month: null,
      firstDayMonth: null,
      lastDateMonth: null
    }
  }

  toggleModal(date=null) {
    const {showModal} = this.state;
    this.setState({ showModal: !showModal, date })
  }

  renderDaysHeader(day) {
    return <th key={day} scope='col' className='col-sm-1 days'>{day}</th>;
  }

  renderEvents(events) {
    console.log('events: ', events)
    return (
      events.map((event, i) => 
        <div key={i} className='event-desc'>
          <span><b>{event.startTime}</b></span> <span>{event.description}</span>
        </div>
      )
    )
  }

  checkEvents(date) {
    const { events } = this.props;
    return (
      <div className='date-detail'>
        <div className='event-entry' onClick={()=>this.toggleModal(date)}>{date}</div>
        {(date in events) && <div className='event-num'>{this.renderEvents(events[date])}</div>}
      </div>
    )
  }

  renderCell(cellNum) {
    const { firstDayMonth, lastDateMonth } = this.state;
    if (firstDayMonth < cellNum && (cellNum-firstDayMonth) <= lastDateMonth) {
      return <td key={cellNum} className='date has-date'>{this.checkEvents(cellNum-firstDayMonth)}</td>;
    } else {
      return <td key={cellNum} className='date'></td>;
    }
  }

  renderRow(num) {
    let dateArray = new Array(7);
    const maxLength = dateArray.length;
    for (let i = 0; i < maxLength; i++) {
      const date = (num*7) + i + 1;
      dateArray[i] = this.renderCell(date);
    }
    return dateArray;
  }

  renderTable() {
    let dateTable = new Array(6);
    const maxLength = dateTable.length;
    for (let i = 0; i < maxLength; i++) {
      dateTable[i] = this.renderRow(i);
    }
    return dateTable;
  }

  componentWillMount() {
    const today = new Date();
    this.updateDateState(today);
  }

  updateDateState(today) {
    const year = moment(today).year();
    const month = moment(today).month();
    const firstDayMonth = new Date(year, month, 1).getDay();
    const lastDateMonth = new Date(year, month+1, 0).getDate();
    this.setState({ today, year, month, firstDayMonth, lastDateMonth });
    this.props.getData(year, month, lastDateMonth);
  }

  handlePrevNext(event) {
    const { title } = event.target;
    const { today } = this.state;
    switch (title) {
      case 'Previous Year':
        this.updateDateState(moment(today).subtract(1, 'year'));
        break;
      case 'Previous Month':
        this.updateDateState(moment(today).subtract(1, 'month'));
        break;
      case 'Next Year':
        this.updateDateState(moment(today).add(1, 'year'));
        break;
      case 'Next Month':
        this.updateDateState(moment(today).add(1, 'month'));
        break;
      default:
        alert('Please click the button again!');
    }
  }

  render() {
    return (
      <div className='container calendar'>
        <div className='month-year'>
          <button className='fa fa-angle-double-left left-arrow-year' title='Previous Year' onClick={this.handlePrevNext}></button>
          <button className='fa fa-angle-left left-arrow-month' title='Previous Month' onClick={this.handlePrevNext}></button>
          {this.months[this.state.month]} {this.state.year}
          <button className='fa fa-angle-right right-arrow-month' title='Next Month' onClick={this.handlePrevNext}></button>
          <button className='fa fa-angle-double-right right-arrow-year' title='Next Year' onClick={this.handlePrevNext}></button>
        </div>
        <table className='table'>
          <thead className='calendar-thead'>
            <tr>
              {this.days.map(this.renderDaysHeader)}
            </tr>
          </thead>
          <tbody>
            {this.renderTable().map((dateRow, idx)=><tr key={idx} className='calendar-row'>{dateRow}</tr>)}
          </tbody>
        </table>
        {this.state.showModal && <CalendarEventModal method='submit' showModal={this.state.showModal} toggleModal={this.toggleModal} fullDate={{year: this.state.year, month: this.state.month+1, date: this.state.date}}/>}

        {/* <EventList month={this.months[this.state.month]} maxDate={this.state.lastDateMonth}/> */}

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
    getData(year, month, maxDateMonth) {
      dispatch(getEventsThunk(year, month, maxDateMonth));
    }
  }
}

const CalendarPageContainer = connect(mapState, mapDispatch)(CalendarPage);
export default CalendarPageContainer;