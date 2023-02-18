import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../helpers/Context'
import './MakeAComment.scss'
import axios from 'axios'

const MakeAComment = () => {
    const {result, setResult, user, setUser} = useContext(LoginContext);
    // console.log(result);
    const [userData, setUserData] = useState({});
    const [comment, setComment] = useState();

    //Get the data to be displayed on the profile
    useEffect(()=>{
      axios.post('http://localhost:5000/profile', {
        email: user.email
      }).then((res)=>{
        setUserData(res.data.User);
      })
    })

    const handleSubmit = (e) =>{
      e.preventDefault();
      axios.post('http://localhost:5000/myComments', {
        comment: comment,
        friend_email: result[0].email,
        friend_name: result[0].name,
        user_email: userData[0].email
      }).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    
      axios.post('http://localhost:5000/newComments', {
        comment:comment,
        user_email: userData[0].email,
        user_name: userData[0].name,
        friend_email: result[0].email
      }).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }


  return (
    <div className='containermc'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
      <div className="container2">
        <div className="left1">
          <span className="dot"></span>
          <h1>Name - Department</h1>
          <div className='description'>
            <h1>Description</h1>
          </div>
        </div>
        <div className="right1">
          <h1 id='make'>Make a Comment</h1>
          <form>
          <textarea name="comment" id="" cols="85" rows="14" placeholder='Add your Comment' value={comment} onChange={(e)=>{
            setComment(e.target.value);
          }}/><br />
          <input type='submit' value="Submit"/>
          <button type='submit' onClick={handleSubmit}>POST!</button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default MakeAComment;
