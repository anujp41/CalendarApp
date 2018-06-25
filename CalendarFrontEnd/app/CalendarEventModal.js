import React, { Component } from 'react';
import './CalendarEventModal.css';
import { connect } from "react-redux";
import { createEventThunk } from '../store';

class CalendarEventModal extends Component {

  constructor() {
    super();
    this.genDate = this.genDate.bind(this);
    this.genTimeArray = this.genTimeArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      description: '',
      startTime: 'Select:',
      endTime: 'Select:'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'startTime' && value === '24:00') {
      alert('Please select an earlier time as events must start and end on the same day!');
      return;
    }
    this.setState({ [name] : value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const state = this.state;
    state.eventDate = this.props.date;
    console.log('state to submit: ', state);
    this.props.submit(state);
    this.props.toggleModal();
  }

  genDate() {
    const dateArray = ['Select:'];
    for (let i = 1; i < 29; i++) {
      dateArray.push(i);
    }
    return dateArray;
  }

  genTimeArray(startTime=0) {
    //inner function created as this is only ingested within genTimeArray method
    const checkNumLength = num => {
      const numStr = num.toString();
      return numStr.length < 2 ? 0+numStr : numStr;
    }

    const times = ['Select:']; //set up array to store time in 30min increments

    if (startTime !== 0) {
      const timeArr = startTime.split(':').map(numStr => parseInt(numStr));
      startTime = (timeArr[0]*60)+(timeArr[1]);
    }

    for (let i = startTime; i <= 24*60; i=i+30) {
      const hour = Math.floor(i/60);
      const min = i-(hour*60);
      const currTime = `${checkNumLength(hour)}:${checkNumLength(min)}`;
      times.push(currTime);
    }

    return times;
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
    const {description, startTime, endTime} = this.state;
    const {date} = this.props;
    return (
      <div className='backdrop'>
        <div className='container containerModal' ref={node=>this.node=node}>
          <button className='cancelbtn' onClick={()=>this.props.toggleModal()}>Cancel</button>
          <h5 className='modal-title'>Enter event details below for Feb {date}:</h5>
          <form className='formBody' autoComplete="off" onSubmit={this.handleSubmit}>

            <div className='formfield'>
              <input required className="input" type="text" name="description" maxLength='50' value={description} onChange={this.handleChange}/>
              <label className="label-text">Event Description</label>
              <div className='charRem'>{50-description.length} character(s) remaining</div>
            </div>

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

            {endTime !== 'Select:' && <button className='button' type="submit" value="submit">SUBMIT</button>}

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
    }
  }
}

const CalendarEventModalContainer = connect(null, mapDispatch)(CalendarEventModal);
export default CalendarEventModalContainer;