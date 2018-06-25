import React, { Component } from 'react';
import './EventList.css';
import { connect } from "react-redux";

class EventList extends Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(date, id) {
    console.log('i will remove event#', id, ' from ', date);
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
                  <td><button onClick={()=>this.handleRemove(date, eventInfo.id)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>  
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    events: state.events
  }
}

const EventListContainer = connect(mapState, null)(EventList);
export default EventListContainer;