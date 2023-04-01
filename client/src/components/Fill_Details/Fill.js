import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import './Fill.scss'
import { LoginContext } from '../../helpers/Context'
import { useContext, useNavigate } from 'react'
// import { sign } from 'crypto';


function Fill(props) {
  const {
    user,
    loading,
    setLoading,
    userData,
    setUserData,
    loggedin,
    setLoggedin,
    profile,
    setProfile,
    setFill,
    setVerified,
    setProfileIcon,

  } = useContext(LoginContext)
  
  const [message, setMessage] = useState('')
  const [imageSelected, setImageSelected] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [verify, setVerify] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)
  const [upload, setUploaded] = useState(false)
  const [verify2, setVeriify2] = useState(false)
  const [state, setState] = useState(false)
  const [otp, setOtp] = useState("");

  console.log(user)
  // token for profile
  const token = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  // useEffect(() => {
  //   setLoading(true)
  //   const Load = async () => {
  //     await new Promise((r) => setTimeout(r, 1000))

  //     setLoading((loading) => !loading)
  //   }

  //   Load()
  // }, [])

 

  const auth = getAuth();

  

  const onSubmit = () => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, 8000)

    axios
      .post(process.env.REACT_APP_API_URL + '/userData', {
        email: user.email,
        name: userData.name,
        roll_no: userData.roll_no,
        academic_program: userData.academic_program,
        department: userData.department,
        personal_email_id: userData.personal_email_id,
        contact_details: userData.contact_details,
        alternate_contact_details: userData.alternate_contact_details,
        address: userData.address,
        current_company: userData.current_company,
        designation: userData.designation,
        about: userData.about,
        profile_img: imageUrl,
        question_1: userData.question_1,
        question_2: userData.question_2,
      })
      .then((res) => {
        console.log(res.data.message)
        setMessage(res.data.message)

        // ****************************************
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
          }
        }, auth);
        const phoneNumber = userData.contact_details;
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // window.localStorage.setItem('confirmationResult',JSON.stringify(confirmationResult.confirm) )
      // console.log(confirmationResult)
      // // ...
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult)
    }).catch((error) => {
      console.log(error);
    });
    // *******************************************

        setVerify(true)
        if (
          res.data.message ===
          'Sent a verification email to your personal email id'
        ) {
          setVeriify2(true)
          window.localStorage.setItem('userData', JSON.stringify(userData))
        }
        setTimeout(() => {
          setMessage('')
        }, 8000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const otpVerify = (e) => {
    e.preventDefault();
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 20000);


    const code = otp;

    //const confirmationResult = () window.confirmationResult
    
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        // const user = result.user;
        console.log("sjdwsdkj")
        axios
      .post(process.env.REACT_APP_API_URL + "/verify", {
        userId: user.email,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Mobile number verified") {
          console.log(res.data);
          setFill(true);
          setVerified(true);
          setProfileIcon(true);
          setLoggedin(true);
          window.localStorage.setItem("verified", true);
          window.localStorage.setItem("profileIcon", true);
          setProfile(res.data.user);
          // const p = JSON.stringify(res.data.User[0])
          window.localStorage.setItem("profile", JSON.stringify(res.data.user));
          console.log(profile);
          // navigate(`/profile/${profile._id}/${profile.name}/${token(32)}`);
        }
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 20000);
      })
      .catch((err) => {
        console.log(err);
      });

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });

    
  };

  const resendOTP = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 20000);
    axios
      .post(process.env.REACT_APP_API_URL + "/resendOTP", {
        phoneOTP: otp,
        userId: user.email,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Mobile number verified") {
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage = () => {
    setUploaded(true)
    console.log(imageSelected)
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 'profile_img')
    console.log(formData)

    axios
      .post('https://api.cloudinary.com/v1_1/dimwfie4o/image/upload', formData)
      .then((res) => {
        console.log(res.data.url)
        setImageUrl(res.data.url)
        setImageUploaded(true)
        setTimeout(() => {
          setImageUploaded(false)
        }, 30000)
      })
  }

  // const [userData, setUserData] = useState({
  //   name_: '',
  //   roll_no: '',
  //   academic_program: '',
  //   department: '',
  //   personal_email_id: '',
  //   contact_details: '',
  //   alternate_contact_details: '',
  //   address: '',
  //   current_company: '',
  //   designation: '',
  //   about: '',
  //   question_1: '',
  //   question_2: '',
  // })

 
  

  //sending data to store in the database

  

  const resendMail = () => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, 8000)

    axios
      .post(process.env.REACT_APP_API_URL + '/resendMail', {
        userId: user.email,
        personalMailId: userData.personal_email_id,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const setOptionValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <>
      {loading && (
        <div className="spinner">
          <span class="loader"></span>
        </div>
      )}
      {!loading && (
        <div className="container_fill">
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
          </style>
          <div className="container2">
            <div className="left">
              <h2> </h2>
              <br />
              <h1 id="fill">Fill your Profile</h1>
              <br />
              <input
                type="text"
                placeholder="Name*"
                size="60"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Roll Number*"
                size="60"
                name="roll_no"
                value={userData.roll_no}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <select
                name="academic_program"
                id=""
                defaultValue={userData.academic_program}
                // style={{ width: '78%' }}
                onChange={setOptionValue}
              >
                <option value="" name="Academic Program" selected disabled>
                  Academic Program
                </option>
                <option
                  value="Bachelor of Technology (BTech)"
                  name="academic_program"
                >
                  Bachelor of Technology (BTech)
                </option>
                <option
                  value="Master of Technology (MTech)"
                  name="academic_program"
                >
                  Master of Technology (MTech)
                </option>
                <option value="Master of Science (MSc)" name="academic_program">
                  Master of Science (MSc)
                </option>
                <option value="Five Year BTech + MTech" name="academic_program">
                  Five Year BTech + MTech
                </option>
                <option value="MS (Research)" name="academic_program">
                  MS (Research)
                </option>
                <option value="Doctor of Philosophy" name="academic_program">
                  Doctor of Philosophy
                </option>
              </select>
              <br />
              <input
                type="text"
                placeholder="Department*"
                size="60"
                name="department"
                value={userData.department}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <h4 id="disclaimer">
                <div className="disc">Disclaimer:</div> You cannot edit your{' '}
                <strong>Email ID</strong> and <strong>Contact Numbers</strong>{' '}
                later on.
              </h4>
              <input
                type="text"
                placeholder="Personal Email ID*"
                size="60"
                name="personal_email_id"
                value={userData.personal_email_id}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <p id="ques">Enter +91 before your contact number:</p>
              <input
                type="text"
                placeholder="Contact Number*"
                size="60"
                name="contact_details"
                value={userData.contact_details}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <p id="ques">Enter +91 before your contact number:</p>
              <input
                type="text"
                placeholder="Alternate Contact Number*"
                size="60"
                name="alternate_contact_details"
                value={userData.alternate_contact_details}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Address*"
                size="60"
                name="address"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Current Company (if any)"
                size="60"
                name="current_company"
                value={userData.current_company}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Designation"
                size="60"
                name="designation"
                value={userData.designation}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              {/* <p id="ques">About Me</p> */}
              <input
                type="text"
                maxLength={350}
                placeholder="About Me* (50-60 words)"
                size="60"
                name="about"
                value={userData.about}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <p id="ques">
                <div id="disc">Q1.</div> What will you miss the most after
                graduating?*
              </p>
              <input
                type="text"
                maxLength={200}
                placeholder="Write your answer in about 20-30 words"
                size="60"
                name="question_1"
                value={userData.question_1}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <p id="ques">
                Q2. If you had the power to implement a change in college, what
                would it be?*
              </p>
              <input
                maxLength={200}
                type="text"
                placeholder="Write your answer in about 20-30 words"
                size="60"
                name="question_2"
                value={userData.question_2}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <div id="emailver">
                {!verify2 && (
                  <button
                    className="submit1"
                    onClick={onSubmit}
                    id="sub5"
                    disabled={state}
                    style={{ background: state ? '#838080' : '#3E185C' }}
                  >
                    Submit
                  </button>
                )}
                <form>
          <input
            type="text"
            id="otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <div className={state ? "resend-disabled" : "resend"}>
            <button onClick={resendOTP} disabled={state}>
              Resend OTP
            </button>
          </div>
          <p style={{ color: "red" }}>{message}</p>
        </form>
        <div className="submit">
          <button
            onClick={otpVerify}
            id="submit"
            disabled={state}
            style={{ background: state ? "#838080" : "#3E185C" }}
          >
            Submit
          </button>
        </div>
                {verify && <h2 id="verificationmessage">{message}</h2>}
                {verify2 && (
                  <button
                    className="submit1"
                    onClick={resendMail}
                    disabled={state}
                    id="sub5"
                    style={{ color: state ? '#D8D8D8' : '#fec90ad9' }}
                  >
                    Resend Mail
                  </button>
                )}
                <div id="recaptcha-container"></div>
              </div>
            </div>
            <div className="right">
              <span className="dot">
                <img id="ip" src={imageUrl} alt="err" />
              </span>
              <br />
              <h4 id="disclaimer">
                <div className="disc">Disclaimer:</div> This picture will be
                printed in the yearbook.
              </h4>
              <input
                type="file"
                id="imgip"
                onChange={(event) => {
                  setImageSelected(event.target.files[0])
                }}
              />
              <button
                id="upld"
                onClick={uploadImage}
                style={{ color: 'white' }}
              >
                Upload Image
              </button>
              {upload && (
                <h3 style={{ color: 'white' }}>
                  {imageUploaded
                    ? 'Image Uploaded'
                    : 'Wait... while image is uploading'}
                </h3>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Fill
