import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../helpers/Context'
import './SecondLogin.scss';
import axios from 'axios';
import App from '../../App';
import loadingSpinner from '../Homepage/images/808.gif'
import { redirect } from 'react-router';

import Profile from "./profile.jpg";

const SecondLogin = () => {


    const { user, loadingSpinner } = useContext(LoginContext);
    const [myComments, setMyComments] = useState([]);
    const [newComments, setNewComments] = useState([]);
    const [approvedComments, setApprovedComments] = useState([]);
    const [friendEmail, setFriendEmail] = useState("");
    const [friendName, setFriendName] = useState("");
    const [comment, setComment] = useState("");
    const {loading, setLoading} = useContext(LoginContext)
    const [loading2, setLoading2] = useState(true);
    const [profile, setProfile] = useState({});
  
    

    useEffect(() => {
        setLoading(true);
        const Load = async () => {
            await new Promise((r) => setTimeout(r, 2500));
    
            setLoading((loading) => !loading);
        }
    
        Load();
    }, [])

    //Get the data to be displayed on the profile
    useEffect(()=>{
      axios.post('http://localhost:5000/profile', {
        email: user.email
      }).then((res)=>{
        setProfile(res.data.User[0]);
      })
    })

    //Getting the myComment to be dispalyed in the myComments Section

    useEffect(()=>{
        axios.post('http://localhost:5000/getmyComments', {
            user_email: user.email
        }).then((res)=>{
            setMyComments(res.data[0].comment);
        }).catch((err) => {
            console.log(err);
        })
    })

    //Getting all the newComments to be displayed in the newComments Section

    useEffect(() => {
        axios.post('http://localhost:5000/getNewComments', {
            friend_email: user.email
        }).then((res)=>{
            setNewComments(res.data[0].comments);
        }).catch((err)=>{
            console.log(err);
        })
    })

    //Getting all the approved comments to be displayed in the approved section
    useEffect(()=>{
        axios.post('http://localhost:5000/getApprovedComments', {
            friend_email: user.email
        }).then((res)=>{
            setApprovedComments(res.data[0].comments);
        }).catch((err)=>{
            console.log(err);
        })
    },)

    // redirecting to fill page for editing the profile
    const editProfile = () => {
        window.location.href = '/edit';
    }

    return (
        <>
        {loading &&
            <div className='spinner'>
            <span class="loader"></span>
            </div>
            }
        {!loading && <div className='containersl'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.1/css/font-awesome.min.css"></link>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');

            </style>
            <div className="container2">
                <div className="comments">
                    <div>
                        <h1 id='cmt'>Approved Comments</h1>
                    </div>
                    <div id='commentsscroll'>
                        {/* {approvedComments.map((val)=>(
                            <div id='comment'>
                            <p id='commentp'>{val.comment}</p>
                            <p id='commentby'>-{val.user_name}</p>
                        </div>
                        ))} */}
                        <div id='comment'>
                            <p id='commentp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit</p>
                            <p id='commentby'>-Aditi Ganvir</p>
                        </div>
                    </div>
                </div>
                <div className="profile">
                    <span className="dotsl">
                        {/* <img id = "ip" src={profile.profile_img}/> */}
                        <img className='ipp' id= "ip" src={Profile}/>
                    </span>
                    <br></br><br></br>
                    <div className='about1'>
                        {/* <h2 id='about'>About Me</h2> */}
                        {/* <h2>{profile.name}</h2>
                        <h3 style={{color:"white"}}>Roll No: {profile.roll_no}</h3>
                        <h3 style={{color:"white"}}>{profile.academic_program}, {profile.department}</h3>
                        <h3 style={{color:"white"}}>{profile.current_company}, {profile.designation}</h3>
                        <h3 style={{color:"white"}}>{profile.about}</h3> */}
                        <h2>Aditi Ganvir</h2>
                        <h3 style={{color:"white"}}>Roll No: 210001016</h3>
                        <h3 style={{color:"white"}}>Bachelor of Technology [BTech], CSE</h3>
                        <h3 style={{color:"white"}}>Google, SDE</h3>
                        <h3 style={{color:"white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                        officia deserunt mollit anim id est laborum.</h3>
                    </div>
                </div>
            </div>
            <div className="edit">
                <button className='button'style={{width:'30%', color:"white"}} onClick = {editProfile} id='edit'>EDIT YOUR PROFILE</button>
            </div>
            <div className="container2">
                <div className="comments2">
                    <h1 id='cmt'>My Comments</h1>
                
                <div id='commentsscroll'>
                        {myComments.map((val)=>(
                            <div id='comment'>
                            <p id='commentp'>{val.comment}</p>
                            <p id='commentby'>-{val.friend_name}</p>
                        </div>
                        ))}
                        </div>
                        </div>
                <div className="comments3" id='new' >
                    <h1 id='cmt'>New Comments</h1>
                    {/* <h1 style={{ display : "inline"}}>..................</h1> */}
                    <ul style={{display: "block"}}>
                    <li id='comment5'>
                                    
                                    <p className='newComment'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                    Duis aute irure dolor in reprehenderit</p>
                                    <p className='newCommentUserName'>-Agrima Bundela</p>
                                    <button id='check'>
                                    <i className='fa fa-check-circle' style={{ display: "inline"}}></i>
                                    </button>
                                    <p style={{ display: "inline"}}></p>
                                    <button id='check'>
                                    <i className='fa fa-times-circle' style={{ display: "inline"}}></i></button>
                                </li>
                        {/* {
                            newComments.map((val, index)=>
                                (<li>
                                    
                                    <p className='newComment'>{val.comment}</p>
                                    <p className='newCommentUserName'>{val.user_name}</p>
                                    <button id='check'onClick={async ()=>{
                                        {
                                    axios.post('http://localhost:5000/approvedComments', {
                                                friend_email: user.email,
                                                user_email: val.user_email,
                                                user_name: val.user_name,
                                                comment: val.comment
                                            }).then((res)=>{
                                                console.log(res.data.message);
                                            }).catch((err)=>{
                                                console.log(err);
                                            })

                                        axios.post('http://localhost:5000/deleteComments', {
                                                friend_email: user.email,
                                                user_email: val.user_email,
                                                user_name: val.user_name,
                                                comment: val.comment

                                            }).then((res)=>{
                                                console.log(res.data);
                                            }).catch((err)=>{
                                                console.log(err);
                                            })
                                        }
                                       
                                    }}><i className='fa fa-check-circle'style={{ display: "inline"}}></i></button><p style={{ display: "inline"}}>   </p>
                                    <button id='check' onClick={(e)=>{
                                        {
                                            e.preventDefault();
                                            axios.post('http://localhost:5000/rejectedComments', {
                                                friend_email: user.email,
                                                user_email: val.user_email,
                                                user_name: val.user_name,
                                                comment: val.comment
                                            }).then((res)=>{
                                                console.log(res.data.message);
                                            }).catch((err)=>{
                                                console.log(err);
                                            })

                                            axios.post('http://localhost:5000/deleteComments', {
                                                friend_email: user.email,
                                                user_email: val.user_email,
                                                user_name: val.user_name,
                                                comment: val.comment
                                            }).then((res)=>{
                                                console.log(res.data);
                                            }).catch((err)=>{
                                                console.log(err);
                                            })
                                            
                                        }
                                        // loadingSpinner();
                                    }}><a href="" className='fa fa-times-circle'></a></button>
                                </li>
                                    )
                            )
                        } */}
                    </ul>
                    
                </div>
            </div>

            <div style={{
                height: "50px"
            }}>
            </div>

        </div>}
        </>
    )
}

export default SecondLogin