import React, { useState, useEffect } from 'react';
import { 
  // Link, 
  // useRouteLoaderData,
  useNavigate} from "react-router-dom";
import { LoginContext } from '../../helpers/Context';
import { useContext } from 'react';
import axios from 'axios';
import alumniData from '../navbar/akumniData.json'
import '@fontsource/quantico'
import { motion } from 'framer-motion'

export function Navbar_phone() {
  const variants = {
    open: { y: 0, transition: {} },
    closed: { y: "-96%" },
  }

  const [isOpen, setIsOpen] = useState(true)
  const { loggedin, setLoggedin, user, setUser, 
    // setLoading, 
    // profile, 
    allUsers, verified, setVerified } = useContext(LoginContext);

  const navigate = useNavigate();
  // const [navOpen, setNavopen] = useState(false);
  const [searchword, setSearchword] = useState("");
  const [wordentered, setWordentered] = useState("");
  const [wordEnteredList, setWordEnteredList] = useState([]);
  const { result, setResult } = useContext(LoginContext);
  const [inputValue, setInputValue] = useState();
  const [display, setDisplay] = useState(false);
  const [setProfileIcon] = useState(false);
  // const [profileIcon] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  // const [verified, setVerified] = useState(false);
  // const [profile, setProfile] = useState({});

  const alumniEmail = alumniData; //geeting all the alumnis data

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
  useEffect(() => {
    if (alumniEmail.includes(user.email)) {
      axios.post("http://localhost:5000/findAUser", {
        email: user.email
      }).then((res) => {
        // console.log(res.data);
        if (res.data.message === "User Found") {
          if (res.data.User[0].two_step_verified === true) {
            setProfileIcon(true);
            setVerified(true);
            window.getElementById('google-login').hidden = true;
          } else {
            setLoggedin(false);
            window.getElementById('google-login').hidden = false;
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
  const handleLogout = () => {
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
  // const handleNavbar = () => {
  //   setNavopen(!navOpen)
  // };
  // const handleDropdownclick = (e) => {
  //   e.stopPropagation();
  // };
  // const handleNavopen = () => {
  //   if (navOpen) {
  //     setNavopen(!navOpen)
  //   }
  // };
  // const renderNav = () => {
  //   if (navOpen) {
  //     return "links active"
  //   } else {
  //     return "links deactivate";
  //   }
  // }

  if (loggedin === true) {
    document.getElementById("google-login").hidden = true;
  }


  useEffect(() => {
    if (alumniEmail.includes(user.email)) {
      setIsStudent(false);
    }
    else {
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


  return (
    <>
      <motion.div className='flex flex-col justify-center items-center bg-[#180c1e] overflow-y-hidden'
        animate={isOpen ? "open" : "closed"}
        variants={variants}>
        <div className='h-screen w-screen bg-[#4d1a6c] flex flex-col items-center justify-start pt-8'>
          <img src='/images/1.png' className='absolute ml-4 top-0 left-0 mt-4 w-16 h-16 rounded-xl' alt='error'></img>
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
    </>
  )
}
