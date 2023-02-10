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
      setIsActive(!isActive);
  
    }

    const [isActive, setIsActive] = useState(false);

  return (
    <div className="container container-nav">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/js/fontawesome.min.js" integrity="sha512-36dJpwdEm9DCm3k6J0NZCbjf8iVMEP/uytbvaiOKECYnbCaGODuR4HSj9JFPpUqY98lc2Dpn7LpyPsuadLvTyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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
            {/* <button onClick={handleLogout}>logout</button> */}
          </div>

          <div className="dropdown" style={{}}>
            <div className="dropdown-btn" style={{display:'flex'}} onClick={e => setIsActive(!isActive)}>
              <img src="../../../images/profile.jpg" alt="" /> 
              <i className="fa fa-caret-down" style={{padding:'0px', textAlign:'left', verticalAlign:'center'}}></i>
            </div>
          </div>
          {isActive && (
            <div className="dropdown-content">
              <div className="dropdown-item"><button className='button' href="#" style={{textAlign:'left'}}>My Profile</button></div>
              <div className="dropdown-item"><button onClick={handleLogout} className='button' style={{textAlign:'left'}}>Logout</button></div>
            </div>
          )}

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