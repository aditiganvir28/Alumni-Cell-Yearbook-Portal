import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../helpers/Context'
import './SecondLogin.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SecondLogin = () => {
  const { user, loading, setLoading, profile} = useContext(LoginContext)
  const [state, setState] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)
  const [imageSelected, setImageSelected] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [message, setMessage] = useState('')
  const [message2, setMessage2] = useState('')
  const [imageadded, setImageadded] = useState(false)
  const [comments, setComments] = useState([])
  const [setStateImage, stateImage] = useState(false);
  const[wait, setWait] = useState(false);
  const[myComments, setMyComments] = useState([]);
  const[approvedComments, setApprovedComments] = useState([])


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
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 'memories_image')
    setWait(true);

    await axios
      .post("https://api.cloudinary.com/v1_1/dimwfie4o/image/upload", formData)
      .then((res) => {
        
        
        setImageUrl(res.data.url)
        setImageUploaded(true)
      })
    if (imageUploaded) {
      axios
        .post(process.env.REACT_APP_API_URL + '/memories_image', {
          user_email: profile.email,
          name: profile.name,
          memory_img: imageUrl,
        })
        .then((res) => {
          setWait(false);
          setMessage(res.data.message)
          setTimeout(() => {
            setMessage('')
          }, 10000)
          setImageadded(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  //Getting all the comments
  useEffect(() => {
    if(profile.email){
    axios
      .post(process.env.REACT_APP_API_URL + '/getComments',{
        email: profile.email
      })
      .then((res) => {
        if(res.data.message==="No users found"){
          setMessage2(res.data.message)
          setComments([])
        }else{
          setComments(res.data.User)
        }
        
        
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },[profile])

  // Getting Reciever's Comments
  useEffect(() => {
    if(profile.email){
    axios
      .post(process.env.REACT_APP_API_URL + "/getRecieversComments",{
        comment_reciever_email_id: profile.email
      })
      .then((res) => {
        if (res.data.message === "No users found") {
          setMessage2(res.data.message);
          setMyComments([]);
          setApprovedComments([]);
        } else {
          setMyComments(res.data.user2);
          setApprovedComments(res.data.users)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[ profile]);

  // redirecting to edit page for editing the profile
  const navigate = useNavigate()
  const editProfile = () => {
    navigate(`/edit/${profile._id}`)
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
              <div id="commentsscroll">{(approvedComments.length!==0) &&
              <>
                {approvedComments.map((val) =>
                        <div id="comment">
                          <p id="commentp">{val.comment}</p>
                          <p id="commentby">-{val.name}</p>
                          <button id='logout2' onClick={()=>{
                            console.log(val)
                            axios.post(process.env.REACT_APP_API_URL + "/removeCommentFromApprovedComments", 
                            {
                              comment_reciever_email_id: profile.email,
                              comment: val.comment,
                              email: val.email

                            }).then((res)=>{
                              window.location.reload()
                            }).catch((err)=>{
                              console.log(err)
                            })
                          }}>Remove Comment</button>
                        </div>
                      )}
                </>}
              </div>
            </div>
            <div className="profile">
              <div className="dotsl">
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
                <button
                  className="button"
                  style={{ width: '30%', color: 'white' }}
                  onClick={editProfile}
                  id="edit"
                >
                  EDIT YOUR PROFILE
                </button>
                <input
                  type="file"
                  id="memo"
                  onChange={(event) => {
                    setImageSelected(event.target.files[0])
                  }}
                ></input>
                <button id="upld2" onClick={uploadImage} style={{backgroundColor: state? '#D8D8D8': '#3E185C'}}>
                  Upload Memories Image
                </button>
              </div>
              {wait && <p>Wait... while Image is Uploading</p>}
              {imageUploaded && imageadded && <p>{message}</p>}
            </div>
          </div>

          <div className="container2sl">
            <div className="comments2">
              <h1 id="cmt">My Comments</h1>

              <div id="commentsscroll">{(comments.length!==0) &&
              <>
                {comments.map((val) =>
                        <div id="comment">
                          <p id="commentp">{val.comment}</p>
                          <p id="commentby">-{val.name}</p>
                        </div>
                      )}
                </>}
              </div>
            </div>
            <div className="comments3">
              <h1 id="cmt">New Comments</h1>
              
              <ul style={{ display: 'block' }}>{(myComments.length!==0) &&
              <>
                {myComments.map((val, index) =>
                          <li id="comment5">
                            <p className="newComment">{val.comment}</p>
                            <p className="newCommentUserName"> - {val.name}</p>
                            <button
                              id="check"
                              disabled={state}
                              style={{
                                backgroundColor: state ? 'grey' : 'transparent',
                              }}
                              onClick={async (e) => {
                                e.preventDefault()
                                await axios
                                  .put(
                                    process.env.REACT_APP_API_URL +
                                      '/setApprovedComments',
                                    {
                                      comment_reciever_email_id: profile.email,
                                      comment_sender_email_id: val.email_id,
                                      comment: val.comment,
                                    },
                                  )
                                  .then((res) => {
                                    // console.log(res.data)
                                  })
                                  .catch((err) => {
                                    console.log(err)
                                  })

                                setState(true)
                                setTimeout(() => {
                                  setState(false)
                                }, 7000)
                                window.location.reload()
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
                                e.preventDefault()
                                await axios
                                  .post(
                                    process.env.REACT_APP_API_URL +
                                      '/setRejectedComments',
                                    {
                                      comment_reciever_email_id: profile.email,
                                      comment_sender_email_id: val.email_id,
                                      comment: val.comment,
                                    },
                                  )
                                  .then((res) => {
                                    // console.log(res.data)
                                  })
                                  .catch((err) => {
                                    console.log(err)
                                  })

                                setState(true)
                                setTimeout(() => {
                                  setState(false)
                                }, 20000)
                                window.location.reload()
                              }}
                            >
                              <a href="" className="fa fa-times-circle"></a>
                            </button>
                          </li>
                        )}
                </>}
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
