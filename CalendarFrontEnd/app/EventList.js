import React, { Component } from 'react';
import './EventList.css';
import { connect } from 'react-redux';
import { removeEventThunk } from '../store';
import CalendarEventModal from './CalendarEventModal';

class EventList extends Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      updating: false,
      event: null,
      idx: null
    }
  }

  toggleModal(event=null, idx=null) {
    const {updating} = this.state;
    this.setState({ updating: !updating, event, idx })
  }

  handleRemove(date, idx, dbId) {
    this.props.removeEvent(idx, date, dbId);
  }

  render() {
    const {events, month} = this.props;
    const eventDate = Object.keys(events);
    const {event, idx} = this.state;
    if (eventDate.length === 0) {
      return (
        <div className='event-footer'>
          <h1>Add events in the calendar to see them here!</h1>
        </div>
      )
    }
    return (
      <div className='event-footer'>
        {eventDate.map((date, idx) => (
          <div key={idx}>
          <div className='event-date'>{month} {date}</div>
          <table className='table table-hover'>
            <thead className='thead-light'>
              <tr>
                <th scope='col' className='col-md-7'>Event Description</th>
                <th scope='col' className='col-md-2'>Start Time</th>
                <th scope='col' className='col-md-2'>End Time</th>
                <th scope='col' className='col-md-1'>Remove?</th>
              </tr>
            </thead>
            <tbody>
              {events[date].map((eventInfo, i) => (
                <tr key={i} className='event-row'>
                  <td className='update-cell' onClick={()=>this.toggleModal(eventInfo, i)}>{eventInfo.description}<span className='update-info'>Click to update!</span></td>
                  <td onClick={()=>this.toggleModal(eventInfo, i)}>{eventInfo.startTime}</td>
                  <td onClick={()=>this.toggleModal(eventInfo, i)}>{eventInfo.endTime}</td>
                  <td><button onClick={()=>this.handleRemove(date, i, eventInfo.id)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>  
          </div>
        ))}
        {this.state.updating && <CalendarEventModal method='update' showModal={this.state.updating} event={event} idx={idx} toggleModal={this.toggleModal} maxDate={this.props.maxDate}/>}
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
    removeEvent(idx, date, dbId) {
      dispatch(removeEventThunk(idx, date, dbId));
    }
  }
}

const EventListContainer = connect(mapState, mapDispatch)(EventList);
export default EventListContainer;