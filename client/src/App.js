import React, { useState, useEffect } from 'react'

import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import Cards from './components/team/Cards.jsx'
import MakeAComment from './components/Make_a_Comment/MakeAComment'
import SecondLogin from './components/SecondLogin/SecondLogin'
import Fill from './components/Fill_Details/Fill'
import Edit from './components/Edit_Profile/Edit'
import Homepage from './components/Homepage/Homepage'
import OtpVerification from './components/Otp Verification/otpVerification'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import Error from './components/Error/Error'
import alumniData from './components/navbar/akumniData.json'

import { Route, Routes, useNavigate } from 'react-router-dom'

import jwt_decode from 'jwt-decode'
import { LoginContext } from './helpers/Context'
import axios from 'axios'
import { Navbar_phone } from './components/Navbar_phone/Navbar_phone'

const App = ({ location }) => {
  const [user, setUser] = useState({})
  const [loggedin, setLoggedin] = useState(false)
  const [authData, setAuthData] = useState([])
  const [result, setResult] = useState({})
  const [isRegistered, setIsRegistered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fill, setFill] = useState(false)
  const [profile, setProfile] = useState({})
  const [allUsers, setAllUsuers] = useState([])
  const [verified, setVerified] = useState(false)
  const [profileIcon, setProfileIcon] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    roll_no: '',
    academic_program: '',
    department: '',
    personal_email_id: '',
    contact_details: '',
    alternate_contact_details: '',
    address: '',
    current_company: '',
    designation: '',
    about: '',
    question_1: '',
    question_2: '',
  })

  //getting all alumnis from json
  const alumniEmail = alumniData //geeting all the alumnis data

  const navigate = useNavigate()

  //Google authentication for IITI students
  useEffect(() => {
    
    /*global google*/
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "971426024153-8iva32hh346i681clve32rkq2g7uu7eo.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      })
      google.accounts.id.renderButton(document.getElementById('google-login'), {
        theme: 'outline',
        size: 'medium',

        width: 'large',
      })
    }
  }, [])

  //loading spinner function
  const loadingSpinner = () => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 2000))

      setLoading((loading) => !loading)
    }

    Load()
  }

  //getting all the users who have made their profile
  useEffect(() => {
    
    axios
      .get(process.env.REACT_APP_API_URL + '/getUsersData')
      .then((res) => {
        
        setAllUsuers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //getting all users who have already signed in
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/auth')
      .then((res) => {
        setAuthData(res.data)
        
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])



  //Callback Function after logging in
  async function handleCallbackResponse(response) {
    //getting all the data from google for the user who signs in
    var userObject = jwt_decode(response.credential)
    setUser(userObject)
    setLoggedin(true)
    loadingSpinner()

    //Storing the users data in the localStorage
    window.localStorage.setItem('user', JSON.stringify(userObject))
    window.localStorage.setItem('loggedin', true)
    //Rendering the signin button
    document.getElementById('google-login').hidden = true
    

    await axios
      .post(process.env.REACT_APP_API_URL + '/checkAuth', {
        email: userObject.email,
      })
      .then((res) => {
        //If the user already exists in the auth model
        if (res.data.message === 'true') {
          //if the user is a lumni
          if (alumniEmail.includes(userObject.email)) {
            axios
              .post(process.env.REACT_APP_API_URL + '/findAUser', {
                email: userObject.email,
              })
              .then((res) => {
                //If the user had made his profile
                if (res.data.message === 'User Found') {
                  //if the user is verified
                  if (res.data.User[0].two_step_verified === true) {
                    setProfileIcon(true)
                    setVerified(true)
                    setProfile(res.data.User[0])
                    window.localStorage.setItem('verified', true)
                    window.localStorage.setItem('profileIcon', true)
                    const p = JSON.stringify(res.data.User[0])
                    window.localStorage.setItem('profile', p)
                    navigate(`/`)
                  }
                  //if the user is not verified
                  else {
                    axios
                      .post(process.env.REACT_APP_API_URL + '/deleteUser', {
                        email: userObject.email,
                      })
                      .then((res) => {
                        // console.log(res.data.message)
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                    navigate(`/fill/${userObject.jti}`)
                  }
                  // if the user has not made the profile but already exists in the auth
                  // then navigate user to fill page
                } else {
                  navigate(`/fill/${userObject.jti}`)
                }
              })
            
          }
          //If the user is student
          else {
            setFill(true)
            navigate('/')
            
          }
        }
        //if signed in for the first time
        else {
          axios
            .post(process.env.REACT_APP_API_URL + '/auth', {
              email: userObject.email,
              name: userObject.name,
            })
            .then((res) => {
              // console.log(res)
              //If alumni
              if (alumniEmail.includes(userObject.email)) {
                
                navigate(`/fill/${userObject.jti}`)
              }
              //if student
              else {
                setFill(true)
                navigate('/')
                
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }

      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <LoginContext.Provider
      value={{
        loggedin,
        setLoggedin,
        user,
        setUser,
        authData,
        setAuthData,
        result,
        setResult,
        isRegistered,
        setIsRegistered,
        loading,
        setLoading,
        loadingSpinner,
        fill,
        setFill,
        profile,
        setProfile,
        allUsers,
        verified,
        setVerified,
        profileIcon,
        verified,
        setProfileIcon,
        userData,
        setUserData,
        isStudent,
        setIsStudent,
      }}
    >
      <div className="App overflow-x-hidden">
        {window.location.pathname !== '/fill/:userId' &&
          window.location.pathname !== '/otpVerification/:userId' &&
          window.location.pathname !== '*' && <Navbar />}
        {/* <Navbar_phone /> */}
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/nav" element={<Navbar_phone />} />
          <Route exact path="/fill/:userId" element={<Fill />} />
          <Route exact path="/edit/:userId" element={<Edit />} />
          <Route
            exact
            path="/profile/:_id/:name/:token"
            element={<SecondLogin />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/team" element={<Cards />} />
          <Route
            exact
            path="/comment/:_id/:name/:roll_no"
            element={<MakeAComment />}
          />
          <Route
            exact
            path="/otpVerification/:userId"
            element={<OtpVerification />}
          />
          <Route exact path="*" element={<Error />} />
        </Routes>

        {!loading && <Footer />}
      </div>
    </LoginContext.Provider>
  )
}
export default App
