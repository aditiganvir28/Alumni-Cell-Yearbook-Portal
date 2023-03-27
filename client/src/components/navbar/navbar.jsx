import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
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
import { json } from 'react-router';


const Navbar = () => {

  const variants = {
    open: { y: 0, transition: {} },
    closed: { y: "-96%" },
  }

  const { loggedin, setLoggedin, user, setUser, setLoading, allUsers, verified, setVerified} = useContext(LoginContext);

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
  const [isOpen, setIsOpen] = useState(true)
  const [example, setExample] = useState([]);
  // const [verified, setVerified] = useState(false);
  const [profile, setProfile] = useState({});

  //Get the data to be displayed on the profile
  useEffect(() => {
    axios
      .post('http://localhost:5000/profile', {
        email: user.email,
      })
      .then((res) => {
        console.log(profile[0]);
        setProfile(res.data.User)
      })
  })

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
            document.getElementById('google-login').hidden=true;
          }else{
            setLoggedin(false);
            document.getElementById('google-login').hidden=false;
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

  const loadingSpinner2 = () => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 30000))

      setLoading((loading) => !loading)
    }

    Load()
  }

  if (loggedin === true) {
    document.getElementById("google-login").hidden = true;
  }


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
    console.log("running")
    console.log(searchword)
    axios.post('http://localhost:5000/searchword', {
      searchword: searchword
    }).then((res) => {
      console.log(res.data);
      setResult(res.data);
    }).catch((err) => {
      console.log(err)
    })
  })

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
        <img src='/images/1.png' />
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
                      
                      // loadingSpinner2();
                      setSearchword(val.email);
                      setInputValue("");
                      setDisplay(false);
                      e.target.value="";
                      navigate(`/comment/${result[0]._id}/${result[0].name}/${result[0].roll_no}`)
                      // setTimeout(()=>{
                        
                      // },500)
                      
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
                            <><Link id='avl' to={`profile/${profile[0]._id}/${profile[0].name}/${profile[0].roll_no}`}>
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
    <div className='navbar_phone'>
      <motion.div className='flex flex-col justify-center items-center bg-[#180c1e] overflow-y-hidden'
        animate={isOpen ? "open" : "closed"}
        variants={variants}>
        <div className='h-screen w-screen bg-[#4d1a6c] flex flex-col items-center justify-start pt-8'>
          <img src='/images/1.png' className='absolute ml-4 top-0 left-0 mt-4 w-16 h-16 rounded-xl'></img>
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
