import React, { Component } from 'react';
import './CalendarEventModal.css';

class CalendarEventModal extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      description: '',
      eventDate: '',
      startTime: '',
      endTime: ''
    }
  }

  handleChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  render() {
    if(!this.props.showModal) {
      return null;
    }
    const date = this.props.date;
    const {name, description, startTime, endTime} = this.state;
    return (
      <div className='backdrop'>
        <button className='cancelbtn' onClick={()=>this.props.toggleModal()}>Cancel</button>
        <div className='container containerModal'>
          <form className='formBody' autoComplete="off" onSubmit={this.handleSubmit}>
            <div className='formfield'>
              <input required className="input" type="text" name="name" value={name} onChange={this.handleChange}/>
              <label className="label-text">Name</label>
            </div>
            <div className='formfield'>
              <input required className="input" type="text" name="description" value={description} onChange={this.handleChange}/>
              <label className="label-text">Description</label>
            </div>

            {/* <button className='button' type="submit" value="submit">Submit</button> */}

          </form>
        </div>
      </div>
    );
  }
}

export default CalendarEventModal;