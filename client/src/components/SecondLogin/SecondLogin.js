import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../helpers/Context'
import './SecondLogin.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SecondLogin = () => {
  const { user, loading, setLoading, profile } = useContext(LoginContext)
  const [myComments, setMyComments] = useState([])
  const [newComments, setNewComments] = useState([])
  const [approvedComments, setApprovedComments] = useState([])
  const [state, setState] = useState(false)
  const [setUploaded] = useState(false)
  // const [uploaded] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)
  const [imageSelected, setImageSelected] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [message, setMessage] = useState('')
  const [imageadded, setImageadded] = useState(false)

  useEffect(() => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 3500))

      setLoading((loading) => !loading)
    }

    Load()
  }, [])

  const loadingSpinner3 = () => {
    setLoading(true)
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 5000))

      setLoading((loading) => !loading)
    }

    Load()
  }

  const uploadImage = async () => {
    setUploaded(true)
    console.log(imageSelected)
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 'memories_image')
    console.log(formData)

    await axios
      .post('https://api.cloudinary.com/v1_1/dimwfie4o/image/upload', formData)
      .then((res) => {
        console.log(res.data.url)
        setImageUrl(res.data.url)
        setImageUploaded(true)
      })
    if (imageUploaded) {
      axios
        .post('http://localhost:5000/memories_image', {
          user_email: profile.email,
          name: profile.name,
          memory_img: imageUrl,
        })
        .then((res) => {
          console.log(res.data)
          setMessage(res.data.message)
          setImageadded(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  //Getting the myComment to be dispalyed in the myComments Section

  useEffect(() => {
    axios
      .post('http://localhost:5000/getmyComments', {
        user_email: user.email,
      })
      .then((res) => {
        setMyComments(res.data[0].comment)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  //Getting all the newComments to be displayed in the newComments Section

  useEffect(() => {
    axios
      .post('http://localhost:5000/getNewComments', {
        friend_email: user.email,
      })
      .then((res) => {
        setNewComments(res.data[0].comments)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  //Getting all the approved comments to be displayed in the approved section
  useEffect(() => {
    axios
      .post('http://localhost:5000/getApprovedComments', {
        friend_email: user.email,
      })
      .then((res) => {
        setApprovedComments(res.data[0].comments)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  // redirecting to edit page for editing the profile
  const navigate = useNavigate()
  const editProfile = () => {
    // window.location.href = '/edit';
    navigate('/edit')
  }

  return (
    <>
      {loading && (
        <div className="spinner">
          <span class="loader"></span>
        </div>
      )}
      {!loading && (
        <div className="containersl">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.1/css/font-awesome.min.css"
          ></link>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
          </style>
          <div className="container2sl">
            <div className="comments">
              <div>
                <h1 id="cmt">Approved Comments</h1>
              </div>
              <div id="commentsscroll">
                {approvedComments.map((val) => (
                  <div id="comment">
                    <p id="commentp">{val.comment}</p>
                    <p id="commentby">-{val.user_name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="profile">
              <div className="dotsl">
                {/* <img id = "ip" src={profile.profile_img}/> */}
                <img className="ipp" id="ip" src={profile.profile_img} />
              </div>
              <br></br>
              <br></br>
              <div className="about1">
                <h2>{profile.name}</h2>
                <h3 style={{ color: 'white' }}>Roll No: {profile.roll_no}</h3>
                <h3 style={{ color: 'white' }}>
                  {profile.academic_program}, {profile.department}
                </h3>
                <h3 style={{ color: 'white' }}>
                  {profile.current_company}, {profile.designation}
                </h3>
                <h3 style={{ color: 'white' }}>{profile.about}</h3>
              </div>
              <div className="edit">
                {/* <div style={{ width: '50%' }}> */}
                <button
                  className="button"
                  style={{ width: '30%', color: 'white' }}
                  onClick={editProfile}
                  id="edit"
                >
                  EDIT YOUR PROFILE
                </button>
                {/* </div> */}
                <input
                  type="file"
                  id="memo"
                  onChange={(event) => {
                    setImageSelected(event.target.files[0])
                  }}
                ></input>
                <button id="upld2" onClick={uploadImage}>
                  Upload Memories Image
                </button>
                {imageUploaded && imageadded && <p>{message}</p>}
              </div>
            </div>
          </div>

          <div className="container2sl">
            <div className="comments2">
              <h1 id="cmt">My Comments</h1>

              <div id="commentsscroll">
                {myComments.map((val) => (
                  <div id="comment">
                    <p id="commentp">{val.comment}</p>
                    <p id="commentby">-{val.friend_name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="comments3">
              <h1 id="cmt">New Comments</h1>
              {/* <h1 style={{ display : "inline"}}>..................</h1> */}
              <ul style={{ display: 'block' }}>
                {newComments.map((val, index) => (
                  <li id="comment5">
                    <p className="newComment">{val.comment}</p>
                    <p className="newCommentUserName"> - {val.user_name}</p>
                    <button
                      id="check"
                      disabled={state}
                      style={{
                        backgroundColor: state ? 'grey' : 'transparent',
                      }}
                      onClick={async (e) => {
                        await axios
                          .post('http://localhost:5000/approvedComments', {
                            friend_email: user.email,
                            user_email: val.user_email,
                            user_name: val.user_name,
                            comment: val.comment,
                          })
                          .then((res) => {
                            console.log(res.data.message)
                          })
                          .catch((err) => {
                            console.log(err)
                          })

                        await axios
                          .post('http://localhost:5000/deleteComments', {
                            friend_email: user.email,
                            user_email: val.user_email,
                            user_name: val.user_name,
                            comment: val.comment,
                          })
                          .then((res) => {
                            console.log(res.data)
                          })
                          .catch((err) => {
                            console.log(err)
                          })

                        setState(true)
                        setTimeout(() => {
                          setState(false)
                        }, 20000)

                        loadingSpinner3()
                      }}
                    >
                      <i
                        className="fa fa-check-circle"
                        style={{ display: 'inline' }}
                      ></i>
                    </button>
                    <p style={{ display: 'inline' }}> </p>
                    <button
                      id="check"
                      disabled={state}
                      style={{
                        backgroundColor: state ? 'grey' : 'transparent',
                      }}
                      onClick={async (e) => {
                        {
                          e.preventDefault()

                          axios
                            .post('http://localhost:5000/rejectedComments', {
                              friend_email: user.email,
                              user_email: val.user_email,
                              user_name: val.user_name,
                              comment: val.comment,
                            })
                            .then((res) => {
                              console.log(res.data.message)
                            })
                            .catch((err) => {
                              console.log(err)
                            })

                          axios
                            .post('http://localhost:5000/deleteComments', {
                              friend_email: user.email,
                              user_email: val.user_email,
                              user_name: val.user_name,
                              comment: val.comment,
                            })
                            .then((res) => {
                              console.log(res.data)
                            })
                            .catch((err) => {
                              console.log(err)
                            })
                        }
                        setState(true)
                        setTimeout(() => {
                          setState(false)
                        }, 20000)
                        // loadingSpinner();
                      }}
                    >
                      <a href="" className="fa fa-times-circle"></a>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                height: '50px',
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  )
}

export default SecondLogin
