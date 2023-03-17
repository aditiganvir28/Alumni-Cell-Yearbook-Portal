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
  MenuItemOption,
  Button,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';


const Navbar = () => {

  const { loggedin, setLoggedin, user, setUser, authData, setAuthData, loading, setLoading} = useContext(LoginContext);

  const navigate = useNavigate();
  const [navOpen, setNavopen]= useState(false);
  const [searchword, setSearchword] = useState("");
  const [wordentered, setWordentered] = useState("");
  const [wordEnteredList, setWordEnteredList] = useState([]);
  const { result, setResult } = useContext(LoginContext);
  // const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue]= useState();
  const [display, setDisplay] = useState(false);
  const [profileIcon, setProfileIcon] = useState(false);

  const alumniEmail= alumniData; //geeting all the alumnis data

  useEffect(()=>{
    if(alumniEmail.includes(user.email)){
      axios.post("http://localhost:5000/findAUser",{
        email: user.email
      }).then((res)=>{
        console.log(res.data);
        if(res.data.message==="User Found"){
          if(res.data.User[0].two_step_verified===true){
            setProfileIcon(true);
            setLoggedin(true);
          }else{
            setLoggedin(false);
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
  }, [])

  //Logout Function
  const handleLogout =() =>{
      setUser({});
      window.localStorage.removeItem('user');
      setLoggedin(false);
      setProfileIcon(false);
      window.localStorage.setItem('loggedin', false)
      document.getElementById("google-login").hidden = false;
      navigate('/');
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
  

  if (loggedin === true) {
    document.getElementById("google-login").hidden = true;
  }


  // Search Engine Functions
  useEffect(() => {
    axios.post('http://localhost:5000/searchword', {
      searchword: searchword
    }).then((res) => {
      setResult(res.data);
      // console.log(res.data);
    }).catch((err) => {
      console.log(err)
    })
  })

  const searchAWord = (event) => {
    setWordentered(event.target.value);
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
  }
  )

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
                <li className="dropdown-nav" onClick={handleDropdownclick} style={{ display: 'flex' }}>
                  <div className="searchr" style={{ width: '190%', display:"flex"}}>
                    <input type="text" placeholder="Search..." class="search" style={{marginBottom:"0%"}} onChange={(e) => {
                      searchAWord(e);
                      (e.target.value === "") ? setDisplay(false) : setDisplay(true);
                      // onEnter();
                    }} value= {inputValue}/>
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
                        navigate('/comment')
                      },1000)
                      
                    }}><p>{val.name}</p>
                      <p style={{fontSize: "70%", fontStyle: "italic"}}>{val.academic_program}</p>
                    </button></li>)
                    )}
                    </ul>
                    }
<<<<<<< HEAD
                    
                  </div> 

=======
                    {!profileIcon && <button onClick={handleLogout}>Logout</button>}
                  </div>
                  {profileIcon &&
>>>>>>> d67028192d400a210ac1c47c68c159487d023fb8
                  <Menu>
                    <MenuButton as={Button} w='29%' ml = {2}  rightIcon={<ChevronDownIcon /> }>
                    <img src="../../../images/profile.jpg" alt="" id='profilepic' />
                    </MenuButton>
                    <MenuList>
                      <MenuItem bgColor={'#4d1a6c'}>My Profile</MenuItem>
                      <MenuItem bgColor={'#4d1a6c'} onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
}
                </li>
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
