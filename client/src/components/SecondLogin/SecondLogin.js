import React from 'react'
import './SecondLogin.css'

const SecondLogin = () => {
    return (
        <div className='container'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.1/css/font-awesome.min.css"></link>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
                
            </style>
            <div className='header'>
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
            </div>

            <div className="container2">
                <div className="comments">
                    <h1>Approved Comments</h1>
                </div>
                <div className="profile">
                    <span className="dot"></span>
                    <div className='about'>
                        <h1 id='about'>About Me</h1>
                    </div>
                </div>
            </div>
            <div className="edit">
                <button className='button'>EDIT YOUR PROFILE</button>
            </div>
            <div className="container2">
                <div className="comments">
                    <h1>My Comments</h1>
                </div>
                <div className="comments" id='new'>
                    <h1>New Comments</h1>
                    <h1 style={{ display : "inline"}}>........................</h1><a href="" className='fa fa-check-circle'></a><a href="" className='fa fa-times-circle'></a>
                </div>
            </div>

            <div style={{
                height: "50px"
                }}>
            </div>

            <div className="container2">
                <div className='footer-item'>
                    <h1>ALUMNI CELL IIT INDORE</h1>
                    <h1>.......................</h1>
                    <h1>.......................</h1>
                </div>
                <div className="footer-item">
                    <h1>IMPORTANT LINKS</h1>
                    <ul id='links' style={{ listStyleType : "circle", marginLeft: "30px"}}>
                        <li>ALUMNI PORTAL</li>
                        <li>IITI OFFICIAL WEBSITE</li>
                    </ul>
                </div>
                <div className="footer-item">
                    <h1>FIND US ON</h1> 
                    <a href="" className='fa fa-facebook'></a>
                    <a href="" className='fa fa-twitter'></a>
                    <a href="" className='fa fa-linkedin'></a>
                    <a href="" className='fa fa-instagram'></a>

                </div>
            </div>

        </div>
    )
}

export default SecondLogin