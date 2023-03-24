import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import './Navbar.scss';
import { LoginContext } from '../../helpers/Context';
import { useContext } from 'react';
import axios from 'axios';
import alumniData from './akumniData.json'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { json } from 'react-router';


const Navbar = () => {

  const { loggedin, setLoggedin, user, setUser, setLoading, profile, allUsers} = useContext(LoginContext);

  const navigate = useNavigate();
  const [navOpen, setNavopen]= useState(false);
  const [searchword, setSearchword] = useState("");
  const [wordentered, setWordentered] = useState("");
  const [wordEnteredList, setWordEnteredList] = useState([]);
  const { result, setResult } = useContext(LoginContext);
  const [inputValue, setInputValue]= useState();
  const [display, setDisplay] = useState(false);
  const [profileIcon, setProfileIcon] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [verified, setVerified] = useState(false);
  // const [profile, setProfile] = useState({});

  const alumniEmail= alumniData; //geeting all the alumnis data

  //Use ReactFilter
  const filteredPersons = allUsers.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(wordentered.toLowerCase())
      );
    }
  );

  console.log(filteredPersons);

  //find if a student logs in or alumni and whether the alumni is two step verified
  useEffect(()=>{
    if(alumniEmail.includes(user.email)){
      axios.post("http://localhost:5000/findAUser",{
        email: user.email
      }).then((res)=>{
        // console.log(res.data);
        if(res.data.message==="User Found"){
          if(res.data.User[0].two_step_verified===true){
            setProfileIcon(true);
            setVerified(true);
            window.getElementById('google-login').hidden=true;
          }else{
            setLoggedin(false);
            window.getElementById('google-login').hidden=false;
          }
        }
      })
    }
   
  })

  //After refreshing the page user is still signed in 
  useEffect(() => {
    if (window.localStorage.getItem('user') !== null) {
      const userLoggedIn = window.localStorage.getItem('user');
      if (userLoggedIn !== null) {
        setUser(JSON.parse(userLoggedIn));
      }
    }
    const logged = (window.localStorage.getItem('loggedin'));
    if (logged === "true") {
      setLoggedin(true);
    }
    else {
      setLoggedin(false);
    }
  },[])

  //Logout Function
  const handleLogout =() =>{
      setUser({});
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('searchAlumni');
      setLoggedin(false);
      setProfileIcon(false);
      window.localStorage.setItem('loggedin', false)
      window.localStorage.removeItem('loggedin')
      document.getElementById("google-login").hidden = false;
      navigate('/');
      window.location.reload();
    }
  
  //adding sidebar on smaller screens
  const handleNavbar=()=>{
    setNavopen(!navOpen)
  };
  const handleDropdownclick=(e)=>{
    e.stopPropagation();
  };
  const handleNavopen=()=>{
    if(navOpen){
      setNavopen(!navOpen)
    }
  };
  const renderNav = ()=>{
    if(navOpen){
      return "links active"
    }else{
      return "links deactivate";
    }
  }
  
useEffect(()=>{
  if (loggedin === true) {
    document.getElementById("google-login").hidden = true;
  }
})
  
useEffect(()=>{
  if(alumniEmail.includes(user.email)){
    setIsStudent(false);
  }
  else{
    setIsStudent(true);
  }
})

  // Search Engine Functions
  useEffect(() => {
    axios.post('http://localhost:5000/searchword', {
      searchword: searchword
    }).then((res) => {
      setResult(res.data);
      window.localStorage.setItem('searchAlumni', JSON.stringify(result))
      // console.log(res.data);
    }).catch((err) => {
      console.log(err)
    })
  })

  const searchAWord = (event) => {
    setWordentered(event.target.value);
    setInputValue(event.target.value);
  }

  useEffect(() => {
    axios.post('http://localhost:5000/wordEntered', {
      wordentered: wordentered
    }).then((res) => {
      // console.log(res.data);
      setWordEnteredList(res.data);

    }).catch((err) => {
      console.log(err);
    })
  })

  return(
    <>
    <div className="overflow-x-hidden" id='abd'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
      <div className='header22'>
        <img src='/images/1.png' />
        <div className='navbar'>
          <ul onClick={handleNavopen} className={renderNav()}>
            <Link to="/" onClick={()=>{setLoading(true)}}>HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/team">DEVELOPERS</Link>

            
            <div id='google-login'>
            </div>
          
              <>
              {loggedin && 
              <div id='loggedIn'>
                <li className="dropdown-nav" onClick={handleDropdownclick} style={{ display: 'flex' }}>
                  <div className="searchr" style={{ width: '190%', display:"flex"}}>
                    { (isStudent || verified) && <>
                    <input type="text" placeholder="Search..." class="search" onChange={(e) => {
                      searchAWord(e);
                      (e.target.value === "") ? setDisplay(false) : setDisplay(true);
                      // onEnter();
                    }} value={inputValue}/>
                    {wordEnteredList.length===0 && 
                    <ul>
                      <li><button className={`btnsearch2 ${(display) ? "" : "display-none"}`} style={{textAlign:"left"}}>No User Found</button></li>
                      </ul>}
                    {wordEnteredList.length!==0 && 
                    <ul>
                    {wordEnteredList.map((val, index) =>
                    (<li><button className={`btnsearch2 ${(display) ? "" : "display-none"}`} style={{textAlign:"left"}} key={index} onClick={(e) => {
                      e.preventDefault();
                      setSearchword(val.email);
                      setInputValue("");
                      setDisplay(false);
                      e.target.value="";
                      setTimeout(()=>{
                        navigate(`/comment/${result[0]._id}/${result[0].name}/${result[0].roll_no}`)
                      },1000)
                      
                    }}><p>{val.name}</p>
                      <p style={{fontSize: "70%", fontStyle: "italic"}}>{val.academic_program}</p>
                    </button></li>)
                    )}
                    </ul>
                    }
                    </>}
                  </div>
                  {profileIcon ?
                  <Menu>
                          <MenuButton as={Button} w='29%' ml={2} rightIcon={<ChevronDownIcon />}>
                            <img src="../../../images/profile.jpg" alt="" id='profilepic' />
                          </MenuButton>
                          <MenuList>
                            <><Link to={`profile/${profile._id}/${profile.name}/${profile.roll_no}`}><MenuItem>My Profile</MenuItem></Link></><MenuItem bgColor={'#4d1a6c'} onClick={handleLogout}>Sign Out</MenuItem>
                    </MenuList>
                  </Menu> :
                  <button id='logout' onClick={handleLogout}>Sign Out</button>
}
                </li>
                </div>
}
              </>
</ul>
          
          <div onClick={handleNavbar} className="hamburger-toggle">
            <HamburgerIcon/>
          </div>
        </div>
      </div>
    </div>
    </>
  
  )
}


export default Navbar;
