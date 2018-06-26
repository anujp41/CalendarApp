import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import CalendarEventModal from './CalendarEventModal';
import EventListContainer from './EventList';
import { connect } from 'react-redux';
import { getEventsThunk } from '../store';

class CalendarPage extends Component {

  constructor() {
    super();
    // this.checkEvents = this.checkEvents.bind(this);
    this.renderDaysHeader = this.renderDaysHeader.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateDateState = this.updateDateState.bind(this);
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

  // checkEvents(date) {
  //   const { events } = this.props;
  //   if (date in events) {
  //     return <div className='event-num'>{events[date].length} events(s) today!</div>;
  //   }
  // }

  renderCell(cellNum) {
    const { firstDayMonth, lastDateMonth } = this.state;
    // return <td key={date} className='date' onClick={()=>this.toggleModal(date)}>{date}{this.checkEvents(date)}</td>;
    if (firstDayMonth < cellNum && (cellNum-firstDayMonth) <= lastDateMonth) {
      return <td key={cellNum} className='date has-date' id='borderless' onClick={()=>this.toggleModal(cellNum-firstDayMonth)}>{cellNum-firstDayMonth}</td>;
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

  // componentDidMount() {
  //   this.props.getData();
  // }

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
  }

  render() {
    console.log(this.state)
    return (
      <div className='container calendar'>
        <div className='month-year'>{this.months[this.state.month]} {this.state.year}</div>
        <table className='table'>
          <thead className='calendar-thead'>
            <tr>
              {this.days.map(this.renderDaysHeader)}
            </tr>
          </thead>
          {/* <tbody className='calendar-row'> */}
          <tbody>
            {this.renderTable().map((dateRow, idx)=><tr key={idx}>{dateRow}</tr>)}
          </tbody>
        </table>
        {this.state.showModal && <CalendarEventModal method='submit' showModal={this.state.showModal} toggleModal={this.toggleModal} date={this.state.date}/>}

        {/* <EventListContainer /> */}

      </div>
    )
  }
}

export default CalendarPage;

// const mapState = state => {
//   return {
//     events: state.events
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getData() {
//       dispatch(getEventsThunk());
//     }
//   }
// }

// const CalendarPageContainer = connect(mapState, mapDispatch)(CalendarPage);
// export default CalendarPageContainer;