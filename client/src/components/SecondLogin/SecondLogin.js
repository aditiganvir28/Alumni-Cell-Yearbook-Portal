import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../helpers/Context'
import './SecondLogin.scss';
import axios from 'axios';
import App from '../../App';

const SecondLogin = () => {


    const { user } = useContext(LoginContext);
    const [myComments, setMyComments] = useState([]);
    const [newComments, setNewComments] = useState([]);
    const [approvedComments, setApprovedComments] = useState([]);
    const [friendEmail, setFriendEmail] = useState("");
    const [friendName, setFriendName] = useState("");
    const [comment, setComment] = useState("");

    //Get the data to be displayed on the profile
    useEffect(()=>{
      axios.post('http://localhost:5000/profile', {
        email: user.email
      }).then((res)=>{
        // console.log(res.data);
      })
    })

    //Getting the myComment to be dispalyed in the myComments Section

    useEffect(()=>{
        axios.post('http://localhost:5000/getmyComments', {
            user_email: user.email
        }).then((res)=>{
            // console.log(res.data);
            setMyComments(res.data[0].comments);
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
            console.log(res.data);
            setApprovedComments(res.data[0].comments);
        }).catch((err)=>{
            console.log(err);
        })
    })

    return (
        <div className='container'>
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
                        <div id='comment'>
                            <p id='commentp'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur minima molestiae dolores animi, nam earum libero obcaecati! Iure dolor, corrupti ipsum nihil, dignissimos consequatur impedit dolore rerum autem iste voluptate.</p>
                            <p id='commentby'>-BY</p>
                        </div>
                        <div id='comment'>
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
                        </div>
                    </div>
                </div>
                <div className="profile">
                    <span className="dot"></span>
                    <div className='about'>
                        <h1 id='about'>About Me</h1>
                    </div>
                </div>
            </div>
            <div className="edit">
                <button className='button'style={{width:'30%'}}>EDIT YOUR PROFILE</button>
            </div>
            <div className="container2">
                <div className="comments">
                    <h1>My Comments</h1>

                </div>
                <div className="comments" id='new' >
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
                                    <button id='check' onClick={()=>{
                                        {
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

        </div>
    )
}

export default SecondLogin