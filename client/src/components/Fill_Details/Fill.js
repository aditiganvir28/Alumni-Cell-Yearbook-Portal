import React from 'react'
import './Fill.css'

function Fill() {
  return (
      <div className='container'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
      <div className='header'>
        <img src='/images/1.png' alt='profile'/>
        <div className='navbar'>
          <ul>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>MY PROFILE</li>
            <li>
              <div className="searchr">
                <input type="text" placeholder="Search..." class="search"/>
              </div>
            </li>
            <li>
              <img src="/images/profile.jpg" alt="" id="profile"/>
            </li>
          </ul>
        </div>
      </div>
      <div className="container2">
        <div className="left">
          <h2> </h2><br/>
          <h1>Fill your Profile</h1><br/>
          <input type="text" placeholder="Name*" size="60"/><br/>
          <input type="text" placeholder="Roll Number*" size="60"/><br/>
          <input type="text" placeholder="Personal Email ID*" size="60"/><br/>
          <input type="text" placeholder="Contact Number*" size="60"/><br/>
          <input type="text" placeholder="Current Company (if any)" size="60"/><br/>
          <input type="text" placeholder="Designation" size="60"/><br/>
          <button>Submit</button>
        </div>
        <div className="right">
          <span className="dot"></span>
          <h2> </h2><br/>
          <h2>Insert your Profile Picture*</h2><br/>
          <div className="container3">
          <input type="text" placeholder="ABOUT ME" size="60"/><br/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fill
