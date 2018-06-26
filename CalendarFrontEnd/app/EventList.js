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
    const {events} = this.props;
    // console.log('events: ', events);
    const eventDate = Object.keys(events);
    const {event, idx} = this.state;
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
        {this.state.updating && <CalendarEventModal method='update' showModal={this.state.updating} event={event} idx={idx} toggleModal={this.toggleModal}/>}
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