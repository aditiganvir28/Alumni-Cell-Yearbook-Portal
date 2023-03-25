import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Fill.scss'
import { LoginContext } from '../../helpers/Context'
import { useContext } from 'react'

function Fill(props) {
  const {
    user,
    loading,
    setLoading,
    loggedin,
    setLoggedin,
    profile,
    setProfile,
  } = useContext(LoginContext)
  const [message, setMessage] = useState('')
  const [imageSelected, setImageSelected] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [verify, setVerify] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)
  const [upload, setUploaded] = useState(false)
  const [verify2, setVeriify2] = useState(false)
  const [state, setState] = useState(false)

  console.log(user)

  useEffect(() => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 1000))

      setLoading((loading) => !loading)
    }

    Load()
  }, [])

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
      })
  }

  const [userData, setUserData] = useState({
    name_: '',
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

  //sending data to store in the database

  const onSubmit = () => {
    axios
      .post('http://localhost:5000/userData', {
        email: user.email,
        name: userData.name_,
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
        setVerify(true)
        if (
          res.data.message ===
          'Sent a verification email to your personal email id'
        )
          setVeriify2(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const resendMail = () => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, 60000)

    axios
      .post('http://localhost:5000/resendMail', {
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
                name="name_"
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
              <p id="ques">
                Enter +91 before your contact number:
              </p>
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
              <p id="ques">
                Enter +91 before your contact number:
              </p>
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
                placeholder="About Me (50-60 words)"
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
                graduating?
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
                would it be?
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
                  <button className="submit1" onClick={onSubmit} id="sub5">
                    Submit
                  </button>
                )}
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
              </div>
            </div>
            <div className="right">
              <span className="dot">
                <img id="ip" src={imageUrl} />
              </span>
              <br />
              <h4 id="disclaimer">
                <div className="disc">Disclaimer:</div> This picture will be
                printed in the yearbook.
              </h4>
              <input
                type="file"
                id='imgip'
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
