import React, { Component } from 'react';
import './CalendarEventModal.css';
import { connect } from "react-redux";
import { createEventThunk, updateEventThunk, removeEventThunk } from '../store';

class CalendarEventModal extends Component {

  constructor(props) {
    super(props);
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.genDate = this.genDate.bind(this);
    this.genTimeArray = this.genTimeArray.bind(this);
    this.convertDateObj = this.convertDateObj.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      id: this.props.method === 'submit' ? null : this.props.event.id,
      description: this.props.method === 'submit'? '' : this.props.event.description,
      eventDate: this.props.method === 'submit' ? null : new Date(this.props.event.eventDate),
      startTime: this.props.method === 'submit' ? 'Select:' : this.props.event.startTime,
      endTime: this.props.method === 'submit' ? 'Select:' : this.props.event.endTime
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'startTime' && value === '11:30 PM') {
      alert('Please select an earlier time as events must start and end on the same day!');
      return;
    }
    if (name !== 'eventDate') {
      this.setState({ [name] : value});
    } else {
      const currYear = this.state.eventDate.getFullYear();
      const currMonth = this.state.eventDate.getMonth();
      const date = value;
      const eventDate = new Date(currYear, currMonth, date);
      this.setState({ eventDate });
    }
    if (name === 'startTime' && this.convertDateObj(this.state.endTime) < this.convertDateObj(value)) {
      this.setState({ endTime: value });
    }
    if (name === 'startTime' && this.state.endTime === 'Select:') {
      this.setState({ endTime: value})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleSave(event) {
    event.preventDefault();
    const { year, month, date} = this.props.fullDate;
    const dateOfEvent = month+'/'+date+'/'+year;
    const {id, ...state} = this.state;
    state.eventDate = dateOfEvent;
    this.props.submit(state);
    this.props.toggleModal();
  }

  handleUpdate(event) {
    event.preventDefault();
    this.props.update(this.state, new Date(this.props.event.eventDate).getDate(), this.props.idx);
    this.props.toggleModal();
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.delete(this.props.idx, new Date(this.props.event.eventDate).getDate(), this.state.id);
    this.props.toggleModal();
  }

  genDate() {
    const dateArray = [];
    const { maxDate } = this.props;
    for (let i = 1; i < maxDate+1; i++) {
      dateArray.push(i);
    }
    return dateArray;
  }

  convertDateObj(time) {
    let timeHHMM = time.split(':');
    let hour = parseInt(timeHHMM[0]);
    let min = parseInt(timeHHMM[1].slice(0,2));
    let ampm = timeHHMM[1].slice(-2);
    if (ampm === 'PM') hour += 12;
    return new Date(2018, 5, 27, hour, min, 0, 0);
  }

  genTimeArray(startTime = null) {
    let initialDate = null;
    if (startTime) {
      initialDate = this.convertDateObj(startTime);
    } else {
      initialDate = new Date(2018, 5, 27, 0, 0, 0, 0);
    }
    const timeArr = [];
    while (initialDate.getDate()<28) {
      timeArr.push(initialDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}));
      initialDate.setMinutes(initialDate.getMinutes()+30);
    }
    return timeArr;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick(event) {
    if (this.node && !(this.node.contains(event.target))) {
      this.props.toggleModal();
      return;
    }
  }

  render() {
    if(!this.props.showModal) {
      return null;
    }
    const {description, eventDate, startTime, endTime} = this.state;
    const {fullDate, method} = this.props;
    return (
      <div className='backdrop'>
        <div className='container containerModal' ref={node=>this.node=node}>
          <button className='cancelbtn' onClick={()=>this.props.toggleModal()}>Cancel</button>

          {method === 'submit' 
          ? <h5 className='modal-title'>Enter event details below for {this.months[fullDate.month-1]} {fullDate.date}:</h5>
          : <h5 className='modal-title'>Update your event below:</h5>}

          <form className='formBody' autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>

            <div className='formfield'>
              <input required className="input" type="text" name="description" maxLength='50' value={description} onChange={this.handleChange}/>
              <label className="label-text">Event Description</label>
              <div className='charRem'>{50-description.length} character(s) remaining</div>
            </div>

            {method!=='submit' &&
            <div className='time-dropdown'>
              <div className='label-text'>Event Date:</div>
              <select className='time-input-dropdown' name='eventDate' value={new Date(eventDate).getDate()} onChange={this.handleChange}>
                  {this.genDate().map((date, idx) => <option key={idx} defaultValue={new Date(eventDate).getDate()}>{date}</option>)}
                </select>
            </div>}

            <div className='time-dropdown'>
              <div className='label-text'>Start Time:</div>
              <select className='time-input-dropdown' name='startTime' value={startTime} onChange={this.handleChange}>
                  {this.genTimeArray().map((time, idx) => <option key={idx} disabled={time==='Select:'}>{time}</option>)}
                </select>
            </div>

            {startTime !== 'Select:' &&
            <div className='time-dropdown'>
              <div className='label-text'>End Time:</div>
              <select className='time-input-dropdown' name='endTime' value={endTime} onChange={this.handleChange}>
                  {this.genTimeArray(startTime).map((time, idx) => <option key={idx} disabled={time==='Select:'}>{time}</option>)}
                </select>
            </div>}

            {endTime !== 'Select:' && method==='submit' && <button className='button' type='submit' value='submit' onClick={this.handleSave.bind(this)}>{method}</button>}

            {endTime !== 'Select:' && method!=='submit' && 
            <div className='button-group'>
              <button className='button button-warning' type='submit' value='submit' onClick={this.handleUpdate.bind(this)}>Update</button>
              <button className='button button-danger' type='submit' value='submit'  onClick={this.handleDelete.bind(this)}>Delete</button>
            </div>}

          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    submit(event) {
      dispatch(createEventThunk(event));
    },
    update(event, initialDate, idx) {
      dispatch(updateEventThunk(event, initialDate, idx));
    },
    delete(idx, date, dbId) {
      dispatch(removeEventThunk(idx, date, dbId));
    }
  }
}

const CalendarEventModalContainer = connect(null, mapDispatch)(CalendarEventModal);
export default CalendarEventModalContainer;