import React, {useState, useEffect } from 'react';
import {useNavigate, useRouteLoaderData} from "react-router-dom";
import './Navbar.scss';
import { LoginContext } from '../../helpers/Context';
import { useContext } from 'react';

const Navbar=()=> {

  const{loggedin, setLoggedin, user, setUser, authData, setAuthData} = useContext(LoginContext);

     //Logout function

     const handleLogout = () =>{
      setUser({});
      document.getElementById("google-login").hidden = false;
      setLoggedin(false);
  
    }

  return (
    <div className="overflow-x-hidden">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
    <div className='header'>
      <img src='/images/1.png'/>
      <div className='navbar'>
        <ul>
          <a href="/">HOME</a>
          <a href="/">ABOUT</a>
          <a href="/">DEVELOPERS</a>
          
          {/* <li><img src='/images/sign_in.png'/></li> */}
          <li>   
                 
          <div id='google-login'>
          </div>
        </li>
          
          {console.log(user)}
          {loggedin && 
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