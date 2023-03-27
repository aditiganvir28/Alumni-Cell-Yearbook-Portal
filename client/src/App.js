// import logo from './logo.svg';
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
import { useParams } from 'react-router'
import jwt_decode from 'jwt-decode'
import { LoginContext } from './helpers/Context'
import axios from 'axios'
import { Navbar_phone } from './components/Navbar_phone/Navbar_phone'

const App = ({ location }) => {
  const [user, setUser] = useState({}) //the one who logged in
  const [loggedin, setLoggedin] = useState(false)
  const [authData, setAuthData] = useState([]) //all the users wha have already logged in
  const [result, setResult] = useState({})
  const [isRegistered, setIsRegistered] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fill, setFill] = useState(false)
  const [profile, setProfile] = useState({})
  const [allUsers, setAllUsuers] = useState([])
  const [verified, setVerified] = useState(false)

  //getting all alumnis from json
  const alumniEmail = alumniData //geeting all the alumnis data

  const navigate = useNavigate()

  //Google authentication for IITI students
  useEffect(() => {
    /*global google*/
    if (window.google) {
      google.accounts.id.initialize({
        client_id:
          '279659903183-6ctccbqdo4skcudgca030m3uti3at58i.apps.googleusercontent.com',
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
      await new Promise((r) => setTimeout(r, 1000))

      setLoading((loading) => !loading)
    }

    Load()
  }
  //getting all the users who have made their profile
  useEffect(() => {
    axios
      .get('http://localhost:5000/getUsersData')
      .then((res) => {
        // console.log(res.data)
        setAllUsuers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  //getting all users who have already signed in
  useEffect(() => {
    axios
      .get('http://localhost:5000/auth')
      .then((res) => {
        setAuthData(res.data)
        // console.log(authData)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //Get the data to be displayed on the profile
  useEffect(() => {
    axios
      .post('http://localhost:5000/profile', {
        email: user.email,
      })
      .then((res) => {
        setProfile(res.data.User[0])
        // console.log(res.data.User[0])
      })
  })

  const rand = () => {
    return Math.random().toString(36).substr(2)
  }

  const token = () => {
    return rand() + rand()
  }

  console.log(token())

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
    console.log(userObject)

    // setTimeout(() => {
    axios
      .post('http://localhost:5000/checkAuth', {
        email: userObject.email,
      })
      .then((res) => {
        // console.log(res.data.message)
        //If the user already exists in the auth model
        if (res.data.message === 'true') {
          //if the user is a lumni
          if (alumniEmail.includes(userObject.email)) {
            axios
              .post('http://localhost:5000/findAUser', {
                email: userObject.email,
              })
              .then((res) => {
                //If the user had made his profile
                if (res.data.message === 'User Found') {
                  //if the user is verified
                  if (res.data.User[0].two_step_verified === true) {
                    // console.log('verified')
                    setFill(true)
                    navigate(`/profile/${profile._id}/${profile.name}/${token}`)
                  }
                  //if the user is not verified
                  else {
                    axios
                      .post('http://localhost:5000/deleteUser', {
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
            console.log('Second time sign in and alumni')
          }
          //If the user is student
          else {
            setFill(true)
            navigate('/')
            console.log('second time sign in and student')
          }
        }
        //if signed in for the first time
        else {
          axios
            .post('http://localhost:5000/auth', {
              email: userObject.email,
              name: userObject.name,
            })
            .then((res) => {
              console.log(res)
              //If alumni
              if (alumniEmail.includes(userObject.email)) {
                console.log('first time login and alumni')
                navigate(`/fill/${userObject.jti}`)
              }
              //if student
              else {
                setFill(true)
                navigate('/')
                console.log('first time login and student')
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
    // }, 1000)
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
          <Route exact path="/edit" element={<Edit />} />
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
