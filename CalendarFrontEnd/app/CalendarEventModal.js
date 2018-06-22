import React, { Component } from 'react';
import './CalendarEventModal.css';

class CalendarEventModal extends Component {

  constructor() {
    super();
  }

  render() {
    const date = this.props.date;
    if(!this.props.showModal) {
      return null;
    }
    return (
      <div className='backdrop'>
        <button className='cancelbtn' onClick={()=>this.props.toggleModal()}>Cancel</button>
        <div className='containerModal'>
          <h1>Modal is here!</h1>
          <h3>Date is: {date}</h3>
        </div>
      </div>
    );
  }
}

export default CalendarEventModal;