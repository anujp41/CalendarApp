import React, { Component } from 'react';
import './CalendarEventModal.css';

class CalendarEventModal extends Component {

  constructor() {
    super();
    this.genDate = this.genDate.bind(this);
    this.genTimeArray = this.genTimeArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      description: '',
      eventDate: '',
      startTime: '',
      endTime: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'startTime' && value === '24:00') {
      alert('Please select an earlier time as start time!');
      return;
    }
    // if startTime, endTime is also set to the same time
    if (name==='startTime') {
      this.setState({ startTime: value, endTime: value });
    } else {
      this.setState({ [name] : value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submitting: ', this.state);
  }

  genDate() {
    const dateArray = [];
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

    const times = []; //set up array to store time in 30min increments

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

  handleClick(e) {
    console.log('node is ', this.node);
    console.log('target is ', e.target);
    if (!(this.node.contains(e.target))) {
      this.props.toggleModal();
      return;
    }
  }

  render() {
    if(!this.props.showModal) {
      return null;
    }
    const {description, eventDate, startTime, endTime} = this.state;
    return (
      <div className='backdrop'>
        <div className='container containerModal' ref={node=>this.node=node}>
          <button className='cancelbtn' onClick={()=>this.props.toggleModal()}>Cancel</button>
          <h5 className='modal-title'>Enter event details below:</h5>
          <form className='formBody' autoComplete="off" onSubmit={this.handleSubmit}>

            <div className='formfield'>
              <input required className="input" type="text" name="description" maxLength='50' value={description} onChange={this.handleChange}/>
              <label className="label-text">Event Description</label>
            </div>

            <div className='time-dropdown'>
              <div className='label-text'>Event Date:</div>
              <select className='time-input-dropdown' name='eventDate' value={eventDate} onChange={this.handleChange}>
                  {this.genDate().map((date, idx) => <option key={idx}>{date}</option>)}
                </select>
            </div>

            {eventDate !== '' &&
            <div className='time-dropdown'>
              <div className='label-text'>Start Time:</div>
              <select className='time-input-dropdown' name='startTime' value={startTime} onChange={this.handleChange}>
                  {this.genTimeArray().map((time, idx) => <option key={idx}>{time}</option>)}
                </select>
            </div>}

            {startTime !== '' &&
            <div className='time-dropdown'>
              <div className='label-text'>End Time:</div>
              <select className='time-input-dropdown' name='endTime' value={endTime} onChange={this.handleChange}>
                  {this.genTimeArray(startTime).map((time, idx) => <option key={idx}>{time}</option>)}
                </select>
            </div>}

            {startTime !== '' && <button className='button' type="submit" value="submit">SUBMIT</button>}

          </form>
        </div>
      </div>
    );
  }
}

export default CalendarEventModal;