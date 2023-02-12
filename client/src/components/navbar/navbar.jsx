import React, {useState, useEffect } from 'react';
import {useNavigate, useRouteLoaderData} from "react-router-dom";
import './Navbar.scss';
import { LoginContext } from '../../helpers/Context';
import { useContext } from 'react';
import axios from 'axios';

const Navbar=()=> {

  const{loggedin, setLoggedin, user, setUser, authData, setAuthData} = useContext(LoginContext);

  const navigate = useNavigate();

  const [searchword, setSearchword] = useState("");
  const [wordentered, setWordentered] = useState("");
  const [ wordEnteredList, setWordEnteredList ] = useState([]);

     //Logout function

     useEffect(()=>{
      if(window.localStorage.getItem('user')!==null){
      const userLoggedIn = window.localStorage.getItem('user');
      console.log(JSON.parse(userLoggedIn));
      if(userLoggedIn!=null){
      setUser(JSON.parse(userLoggedIn));
      }
    }
      console.log(window.localStorage.getItem('loggedin'))
      const logged = (window.localStorage.getItem('loggedin'));

      if(logged==="true"){
        setLoggedin(true);
      }
      else{
        setLoggedin(false);
      }
     },[])

     const handleLogout = () =>{
      setUser({});
      window.localStorage.removeItem('user');
      
      setLoggedin(false);
      window.localStorage.setItem('loggedin', false)
      document.getElementById("google-login").hidden = false;
      navigate('/');
    }

    if(loggedin===true){
      document.getElementById("google-login").hidden = true;
    }

    //Search
    useEffect(() =>{
      axios.post('http://localhost:5000/searchword', {
        searchword: searchword
      }).then((res)=>{
        
        console.log(res.data);
      }).catch((err)=>{
        console.log(err)
      })
    })

    const onEnter = () =>{
      axios.post('http://localhost:5000/wordEntered',{
        wordentered: wordentered
      }).then((res)=>{
        console.log(res.data);
        if (wordentered === "") {
          setWordEnteredList([]);
        } else {
        setWordEnteredList(res.data);
        }
        console.log(wordEnteredList)
      }).catch((err)=>{
        console.log(err);
      })
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
          
          {loggedin && 
          <>
          <li>
          <div className="searchr">
            <input type="text" placeholder="Search..." class="search" onChange = {(event)=>{
                setWordentered(event.target.value);
                console.log(wordentered);
                onEnter();
            }} />
<<<<<<< Updated upstream
             {wordentered.length > 0 && wordEnteredList.map((val, index)=>
  (<li><button className="btnsearch2" key={index} onClick={(e)=>{
    e.preventDefault();
        setSearchword(val.email);
    }}>{val.name}</button></li>)
)}
=======
             {wordEnteredList.length != 0 && (
        <div className="dataResult">
          {wordEnteredList.map((val, index) => (
            <li>
              <button
                className="btnsearch2"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setSearchword(val.email);
                  // search=val;
                }}
              >
                {val.name}
              </button>
            </li>
          ))}
        </div>
      )}
>>>>>>> Stashed changes
          </div>
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