import React, { Component } from 'react';
import './CalendarEventModal.css';

class CalendarEventModal extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.genTimeArray = this.genTimeArray.bind(this);
    this.state = {
      description: '',
      eventDate: '',
      startTime: '',
      endTime: ''
    }
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

  render() {
    if(!this.props.showModal) {
      return null;
    }
    const date = this.props.date;
    const {description, startTime, endTime} = this.state;
    return (
      <div className='backdrop'>
        <button className='cancelbtn' onClick={()=>this.props.toggleModal()}>Cancel</button>
        <div className='container containerModal'>
          <form className='formBody' autoComplete="off" onSubmit={this.handleSubmit}>

            <div className='formfield'>
              <input required className="input" type="text" name="description" value={description} onChange={this.handleChange}/>
              <label className="label-text">Description</label>
            </div>

            <div className='time-dropdown'>
              <div className='label-text'>Start Time:</div>
              <select className='start-dropdown' name='startTime' value={startTime} onChange={this.handleChange}>
                  {this.genTimeArray().map((time, idx) => <option key={idx}>{time}</option>)}
                </select>
            </div>

            {startTime !== '' &&
            <div className='time-dropdown'>
              <div className='label-text'>End Time:</div>
              <select className='end-dropdown' name='endTime' value={endTime} onChange={this.handleChange}>
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