import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from "react-router-dom";
// import { useRouteLoaderData } from "react-router-dom";
import './Navbar.scss';
import { LoginContext } from '../../helpers/Context';
import { useContext } from 'react';
import axios from 'axios';
import alumniData from './akumniData.json'
import { motion } from 'framer-motion'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
// import { json } from 'react-router';


const Navbar = () => {

  const variants = {
    open: { y: 0, transition: {} },
    closed: { y: "-96%" },
  }

  const { loggedin, setLoggedin, user, setUser, setLoading, allUsers, verified, setVerified, profileIcon, setProfileIcon,profile, setProfile, loadingSpinner, isStudent, setIsStudent, setUserData, userData} = useContext(LoginContext);

  const navigate = useNavigate();
  const [navOpen, setNavopen]= useState(false);
  const [setSearchword] = useState("");
  // const [searchword] = useState("");
  const [wordentered, setWordentered] = useState("");
  const [wordEnteredList] = useState([]);
  // const [setWordEnteredList] = useState([]);
  const { result, setResult } = useContext(LoginContext);
  const [inputValue, setInputValue]= useState();
  const [display, setDisplay] = useState(false);
  const [isOpen, setIsOpen] = useState(true)
  const [example, setExample] = useState([]);
  const alumniEmail= alumniData; //geeting all the alumnis data


  //Use ReactFilter
  var filteredPersons= []
  useEffect(()=>{
  filteredPersons = allUsers.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .startsWith(wordentered.toLowerCase())
      );
    }
  );
  setExample(filteredPersons);
  })

  //loading spinner function
  const loadingSpinner2 = () => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 10000))

      setLoading((loading) => !loading)
    }

    Load()
  }

  //After refreshing the page user is still signed in 
  useEffect(() => {
    if (window.localStorage.getItem('user') !== null) {
      const userLoggedIn = window.localStorage.getItem('user');
      if (userLoggedIn !== null) {
        setUser(JSON.parse(userLoggedIn));
      }
    }
    if (window.localStorage.getItem('searchedAlumni') !== null) {
      const salumni = window.localStorage.getItem('searchedAlumni');
      if (salumni !== null) {
        setResult(JSON.parse(salumni));
      }
    }
    if (window.localStorage.getItem('userData') !== null) {
      const u = window.localStorage.getItem('userData');
      if (u !== null) {
        setUserData(JSON.parse(u));
      }
    }
    const logged = (window.localStorage.getItem('loggedin'));
    if (logged === "true") {
      setLoggedin(true);
    }
    else {
      setLoggedin(false);
    }

    const profileI = (window.localStorage.getItem('profileIcon'));
    if(profileI==="true"){
      setProfileIcon(true);
    }

    const verify = (window.localStorage.getItem('verified'));
    if(verify === 'true'){
      setVerified(true);
    }

    const p = (window.localStorage.getItem('profile'));
    if(verify==="true"){
      setProfile(JSON.parse(p));
    }

    
  },[])

  //Logout Function
  const handleLogout =() =>{
      setUser({});
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('searchAlumni');
      window.localStorage.removeItem('profileIcon');
      window.localStorage.removeItem('verified');
      window.localStorage.removeItem('profile')
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


  // Token Generation 

  const token = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  };

  // const loadingSpinner2 = () => {
  //   setLoading(true)
  //   const Load = async () => {
  //     await new Promise((r) => setTimeout(r, 30000))

  //     setLoading((loading) => !loading)
  //   }

  //   Load()
  // }

  if (loggedin === true) {
    document.getElementById("google-login").hidden = true;
  }



  if(alumniEmail.includes(user.email)){
    setIsStudent(false);
  }
  else{
    setIsStudent(true);
  }

  const searchAWord = (event) => {
    setWordentered(event.target.value);
    setInputValue(event.target.value);
  }

  return(
    <>
    <div className='navbar-laptop'>
    <div className="overflow-x-hidden" id='abd'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
      <div className='header22'>
        <img src='/images/1.png' alt='err'/>
        <div className='navbar'>
          <ul onClick={handleNavopen} className={renderNav()}>
            <Link id='av'to="/">HOME</Link>
            <Link id='av' to="/about">ABOUT</Link>
            <Link id='av' to="/team">DEVELOPERS</Link>

            
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
                    {example.length!==0 && 
                    <ul>
                    {example.map((val, index) =>
                    (<li><button className={`btnsearch2 ${(display) ? "" : "display-none"}`} style={{textAlign:"left"}} key={index} onClick={(e) => {
                      e.preventDefault();
                      window.localStorage.removeItem('searchedAlumni')
                      // loadingSpinner();
                      setInputValue("");
                      setDisplay(false);
                      e.target.value="";
                      axios.post(process.env.REACT_APP_API_URL + '/searchword', {
                            searchword: val.email
                          }).then((res) => {
                          console.log(res.data);
                          setResult(res.data);
                          window.localStorage.setItem('searchedAlumni', JSON.stringify(res.data));
                          
                          }).catch((err) => {
                          console.log(err)
                          })
                          navigate(`/comment/${val._id}/${val.name}/${val.roll_no}`)
                          loadingSpinner2();
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
                            <><Link id='avl' to={`profile/${profile._id}/${profile.name}/${token(32)}`}>
                              <MenuItem id='avl' bgColor={'#4d1a6c'}>My Profile</MenuItem></Link></>
                              <MenuItem bgColor={'#4d1a6c'} onClick={handleLogout}>Sign Out</MenuItem>
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
    </div>
  
    <>
    <div className='navbar_phone absolute z-10'>
      <motion.div className='flex flex-col justify-center items-center bg-[#180c1e] overflow-y-hidden'
        animate={isOpen ? "open" : "closed"}
        variants={variants}>
        <div className='h-screen w-screen bg-[#4d1a6c] flex flex-col items-center justify-start pt-8'>
          <img src='/images/1.png' className='absolute ml-4 top-0 left-0 mt-4 w-16 h-16 rounded-xl' alt='err'></img>
          <motion.div className='absolute top-0 right-0 mt-8 mr-8 text-3xl' onClick={() => setIsOpen(isOpen => !isOpen)}>×</motion.div>
          {loggedin &&
            <div id='loggedIn' className='mt-24 mb-16'>
              <div className="searchr" style={{ width: '100%', display: "flex" }}>
                {(isStudent || verified) && <>
                  <input type="text" placeholder="Search..." class="search" onChange={(e) => {
                    searchAWord(e);
                    (e.target.value === "") ? setDisplay(false) : setDisplay(true);
                    // onEnter();
                  }} value={inputValue} />
                  {wordEnteredList.length === 0 &&
                    <ul>
                      <li><button className={`btnsearch2 ${(display) ? "" : "display-none"}`} style={{ textAlign: "left" }}>No User Found</button></li>
                    </ul>}
                  {wordEnteredList.length !== 0 &&
                    <ul>
                      {wordEnteredList.map((val, index) =>
                      (<li><button className={`btnsearch2 ${(display) ? "" : "display-none"}`} style={{ textAlign: "left" }} key={index} onClick={(e) => {
                        e.preventDefault();
                        setSearchword(val.email);
                        setInputValue("");
                        setDisplay(false);
                        e.target.value = "";
                        setTimeout(() => {
                          navigate(`/comment/${result[0]._id}/${result[0].name}/${result[0].roll_no}`)
                        }, 1000)

                      }}><p>{val.name}</p>
                        <p style={{ fontSize: "70%", fontStyle: "italic" }}>{val.academic_program}</p>
                      </button></li>)
                      )}
                    </ul>
                  }
                </>}
              </div>
            </div>
          }

          <a href='/'><div className={loggedin ? 'mb-12 uppercase' : 'uppercase mt-24 mb-24'}>Home</div></a>
          <a href='/'><div className={loggedin ? 'mb-12 uppercase' : 'uppercase mb-24'}>about</div></a>
          <a href='/'><div className={loggedin ? 'mb-12 uppercase' : 'uppercase mb-24'}>developers</div></a>
          <a href='/'><div onClick={handleLogout} className={loggedin ? 'uppercase' : 'hidden'}>Logout</div></a>
          <div id='google-login'>
          </div>
        </div>
        <motion.div onClick={() => setIsOpen(isOpen => !isOpen)} className='w-full bg-[#180c1e] flex justify-center'><div className={isOpen ? 'hidden' : 'text-center -mt-2 pt-4 overflow-hidden w-12 h-12 text-xl rounded-full bg-[#4d1a6c]'}>∨</div></motion.div>
      </motion.div>
      </div>
    </>
    </>


  
  )
}


export default Navbar;
