import React from 'react'
import './MakeAComment.css'

const MakeAComment = () => {
  return (
    <div className='container'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
      <div className='header'>
        <img src='/images/1.png'/>
        <div className='navbar'>
          <ul>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>MY PROFILE</li>
            <li><div className="search">
            <input type="text" placeholder="Search..." /></div></li>
            <li>
              <img src="/images/profile.jpg" alt="" id="profile"/>
            </li>
          </ul>
        </div>
      </div>
      <div className="container2">
        <div className="left">
          <span className="dot"></span>
          <h1>Name - Department</h1>
          <div className='description'>
            <h1>Description</h1>
          </div>
        </div>
        <div className="right">
          <h1 id='make'>Make a Comment</h1>
          <textarea name="" id="" cols="85" rows="14"></textarea><br />
          <button>POST!</button>
        </div>
      </div>
    </div>
  );
}

export default MakeAComment;