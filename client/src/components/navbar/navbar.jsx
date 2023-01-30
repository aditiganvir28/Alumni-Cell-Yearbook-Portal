import React, {useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import './navbar.css';
import jwt_decode from "jwt-decode";
import alumniData from './akumniData.json';
import axios from 'axios';

const Navbar=()=> {

  const [user, setUser] = useState({});
  const [authData, setAuthData] = useState({});

  //getting all alumnis from json
  const alumniEmail= alumniData;

  const navigate = useNavigate();

  useEffect(()=>{
      //getting all users who have already signed in
      axios.get('http://localhost:5000/auth')
        .then((res)=>{
          console.log(res.data);
          setAuthData(res.data);
        })
        .catch((err)=>{
          console.log(err);
        })

  }, []);

  function handleCallbackResponse(response){
    console.log(response.credential); 
    var userObject = jwt_decode(response.credential)
    console.log(userObject);
    setUser(userObject)
    console.log(user);
    document.getElementById("google-login").hidden= true;

    if([authData].includes({email: user.email})){
      if(alumniEmail.includes(user.email)){
        navigate('/profile');
      }
      else{
        navigate('/');
      }
    }
    else{
      axios.post('http://localhost:5000/auth', {
        user_id: userObject.jti,
        email: userObject.email,
        name: userObject.name
      })

      if(alumniEmail.includes(user.email)){
        navigate('/fill', {user_id: userObject.jti})
      }
      else{
        navigate('/');
      }
    }
  }

  useEffect(()=>{
    /*global google*/
    if(window.google){
      google.accounts.id.initialize({
      client_id: "971426024153-8iva32hh346i681clve32rkq2g7uu7eo.apps.googleusercontent.com",
      callback: handleCallbackResponse

    });

    google.accounts.id.renderButton(
      document.getElementById("google-login"),
      {theme: "outline", size: "medium", width: "large"}
    );
    }
  }, []);

  const handleLogout = () =>{
    setUser({});
    document.getElementById("google-login").hidden = false;
  }
  
  return (
    <div className="container">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
    <div className='header'>
      <img src='/images/1.png'/>
      <div className='navbar'>
        <ul>
          <a href="#">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">DEVELOPERS</a>
          
          {/* <li><img src='/images/sign_in.png'/></li> */}
          <li>            
            <div id='google-login'>
            </div>
          </li>
          {console.log(user)}
          {Object.keys(user).length != 0 && 
          <>
          <li>
          <div className="searchr">
            <input type="text" placeholder="Search..." class="search"/>
          </div>
      </li>
          <li>
          <div className='logout-button'>
            <button onClick={handleLogout}>logout</button>
          </div>
        </li>
        </>
        }
          

          </ul>        
      </div>
      </div>
    </div>
  );
}

export default Navbar;