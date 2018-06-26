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
      updating: false
    }
  }

  toggleModal(date=null) {
    const {showModal} = this.state;
    this.setState({ showModal: !showModal, date })
  }

  handleRemove(date, idx, dbId) {
    this.props.removeEvent(idx, date, dbId);
  }

  render() {
    const {events} = this.props;
    const eventDate = Object.keys(events);
    if (eventDate.length === 0) {
      return null;
    }
    return (
      <div className='event-footer'>
        {eventDate.map((date, idx) => (
          <div key={idx}>
          <div className='event-date'>February {date}</div>
          <table className='table table-hover'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Event Description</th>
                <th scope='col'>Start Time</th>
                <th scope='col'>End Time</th>
                <th scope='col'>Remove?</th>
              </tr>
            </thead>
            <tbody>
              {events[date].map((eventInfo, i) => (
                <tr key={i} className='event-row'>
                  <td className='update-cell'>{eventInfo.description}<span className='update-info'>Click to update!</span></td>
                  <td>{eventInfo.startTime}</td>
                  <td>{eventInfo.endTime}</td>
                  <td><button onClick={()=>this.handleRemove(date, i, eventInfo.id)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>  
          </div>
        ))}
        <CalendarEventModal method='update' showModal={this.state.updating}/>
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