import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className='jumbotron jumbotron-fluid jumbotron-height'>
        <div className='container'>
          <h1 className='display-8'>Welcome to Calendar</h1>
          <p className='lead'>Please click on a date below to add an event or see list of events!</p>
        </div>
      </div>
    )
  }
}

export default Header;