import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../helpers/Context'
import './SecondLogin.scss';
import axios from 'axios';
import App from '../../App';
import loadingSpinner from '../Homepage/images/808.gif'

const SecondLogin = () => {


    const { user } = useContext(LoginContext);
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
            await new Promise((r) => setTimeout(r, 2000));
    
            setLoading((loading) => !loading);
        }
    
        Load();
    }, [])

    //Get the data to be displayed on the profile
    useEffect(()=>{
      axios.post('http://localhost:5000/profile', {
        email: user.email
      }).then((res)=>{
        // console.log(res.data);
        setProfile(res.data.User[0]);
        console.log(profile);
      })
    })

    //Getting the myComment to be dispalyed in the myComments Section

    useEffect(()=>{
        axios.post('http://localhost:5000/getmyComments', {
            user_email: user.email
        }).then((res)=>{
            // console.log(res.data);
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
            // console.log(res.data);
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
            // console.log(res.data);
            setApprovedComments(res.data[0].comments);
        }).catch((err)=>{
            console.log(err);
        })
    })

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
            {/* <div className='header'>
                <img src='/images/1.png' alt='profile' />
                <div className='navbar'>
                    <ul>
                        <li>HOME</li>
                        <li>ABOUT</li>
                        <li>MY PROFILE</li>
                        <li><div className="search">
                            <input type="text" placeholder="Search..." class="search" /></div></li>
                        <li>
                            <img src="/images/profile.jpg" alt="" id="profile" />
                        </li>
                    </ul>
                </div>
            </div> */}

            <div className="container2">
                <div className="comments">
                    <div>
                        <h1>Approved Comments</h1>
                    </div>
                    <div id='commentsscroll'>
                        {approvedComments.map((val)=>(
                            <div id='comment'>
                            <p id='commentp'>{val.comment}</p>
                            <p id='commentby'>-{val.user_name}</p>
                        </div>
                        ))}
                        
                        {/* <div id='comment'>
                            <p id='commentp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde amet provident minima veniam explicabo alias quos magni commodi animi earum eum recusandae dignissimos aut nam, perferendis accusamus ex culpa modi!</p>
                            <p id='commentby'>-BY</p>
                        </div>
                        <div id='comment'>
                            <p id='commentp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex repellendus perspiciatis qui minima quas non temporibus accusamus dolor. Ratione, unde nesciunt? Deserunt quos minus fugit sed fuga enim! Natus, eius!</p>
                            <p id='commentby'>-BY</p>
                        </div>
                        <div id='comment'>
                            <p id='commentp'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae rerum molestiae deleniti dolor! Facilis architecto doloremque, sapiente voluptatem vitae eligendi nam beatae. Incidunt corporis repellat suscipit aliquid deserunt! Ipsa, nihil.</p>
                            <p id='commentby'>-BY</p>
                        </div>
                        <div id='comment'>
                            <p id='commentp'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae officiis animi ipsam sequi ea esse omnis, dolorem repellendus. Ipsam quia soluta fugit quibusdam, saepe consequuntur fugiat repudiandae aperiam mollitia. Doloribus.</p>
                            <p id='commentby'>-BY</p>
                        </div>
                        <div id='comment'>
                            <p id='commentp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis excepturi suscipit necessitatibus ad laborum velit deserunt. Ab repellendus reprehenderit at magni, veritatis quos recusandae minima, maiores dolorem, fugiat quo rerum.</p>
                            <p id='commentby'>-BY</p>
                        </div> */}
                    </div>
                </div>
                <div className="profile">
                    <span className="dot">
                        {/* <img src={profile.profile_img}/> */}
                    </span>
                    <br></br><br></br>
                    <div className='about1'>
                        {/* <h2 id='about'>About Me</h2> */}
                        <h2>{profile.name}</h2>
                        <h3 style={{color:"white"}}>Roll No: {profile.roll_no}</h3>
                        <h3 style={{color:"white"}}>{profile.academic_program}, {profile.department}</h3>
                        <h3 style={{color:"white"}}>{profile.current_company}, {profile.designation}</h3>
                    </div>
                </div>
            </div>
            <div className="edit">
                <button className='button'style={{width:'30%'}}>EDIT YOUR PROFILE</button>
            </div>
            <div className="container2">
                <div className="comments2">
                    <h1>My Comments</h1>
                
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
                    <h1>New Comments</h1>
                    {/* <h1 style={{ display : "inline"}}>..................</h1> */}
                    <ul style={{display: "block"}}>
                        {
                            newComments.map((val, index)=>
                                (<li>
                                    
                                    <p className='newComment'>{val.comment}</p>
                                    <p className='newCommentUserName'>{val.user_name}</p>
                                    <button id='check'onClick={()=>{
                                        {
                                            axios.post('http://localhost:5000/approvedComments', {
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
                                    }}><i className='fa fa-check-circle'></i></button><p style={{ display: "inline"}}>   </p>
                                    <button id='check' onClick={(e)=>{
                                        {
                                            e.preventDefault();
                                            axios.post('http://localhost:5000/rejectedComments', {
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
                                    }}><a href="" className='fa fa-times-circle'></a></button>
                                </li>
                                    )
                            )
                        }
                    </ul>
                    
                </div>
            </div>

            <div style={{
                height: "50px"
            }}>
            </div>

            {/* <div className="container2">
                <div className='footer-item'>
                    <h1>ALUMNI CELL IIT INDORE</h1>
                    <h1>.......................</h1>
                    <h1>.......................</h1>
                </div>
                <div className="footer-item">
                    <h1>IMPORTANT LINKS</h1>
                    <ul id='links' style={{ listStyleType: "circle", marginLeft: "30px" }}>
                        <li>ALUMNI PORTAL</li>
                        <li>IITI OFFICIAL WEBSITE</li>
                    </ul>
                </div>
                <div className="footer-item">
                    <h1>FIND US ON</h1>
                    <a href="" className='fa fa-facebook' style={{ display: "inline" }}></a>
                    <a href="" className='fa fa-twitter' style={{ display: "inline" }}></a>
                    <a href="" className='fa fa-linkedin' style={{ display: "inline" }}></a>
                    <a href="" className='fa fa-instagram' style={{ display: "inline" }}></a>

                </div>
            </div> */}

        </div>}
// 
        </>
    )
}

export default SecondLogin