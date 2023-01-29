import React from 'react'
import './Fill.css'

function Fill() {
  //Backend

//sending data to store in the database

// const onSubmit = () =>{
//     Axios.post("http://localhost:5000/userData", {
//         user_id: id,
//         name: name,
//         roll_no: roll_no,
//         academic_program: academic_program,
//         department: department,
//         contact_details: contact_details,
//         personal_email_id: personal_email_id,
//         current_company: current_company,
//         designation: designation,
//         about: about,
//         profile_image:profile_image
//     }).then((res)=>{
//         console.log(res.data);
//     }).catch((err)=>{
//         console.log(err);
//     })
// }
  return (
      <div className='container'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
      <div className='header'>
        <img src='/images/1.png' alt='profile'/>
        <div className='navbar'>
          <ul>
          <a href="#">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">MY PROFILE</a>
          {/* <a href="#">Link</a> */}
            <li>
              <div className="searchr">
                <input type="text" placeholder="Search..." class="search"/>
              </div>
            </li>
            <li>
              <a href='#'>
              <img src="/images/profile.jpg" alt="" id="profile"/>
              </a>
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
          <input type="text" placeholder="Academic Program*" size="60"/><br/>
          <input type="text" placeholder="Department*" size="60"/><br/>
          <input type="text" placeholder="Personal Email ID*" size="60"/><br/>
          <input type="text" placeholder="Contact Number*" size="60"/><br/>
          <input type="text" placeholder="Current Company (if any)" size="60"/><br/>
          <input type="text" placeholder="Designation" size="60"/><br/>
          <button className="submit">Submit</button>
        </div>
        </div>
        <div className="container4">
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
