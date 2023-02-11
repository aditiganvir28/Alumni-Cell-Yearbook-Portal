import React, {useEffect} from 'react';
import './Footer.scss';
function Footer() {
  return (
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.1/css/font-awesome.min.css"></link>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
                
            </style>
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
                    <a href="" className='fa fa-facebook' style={{ display: "inline"}}></a>
                    <a href="" className='fa fa-twitter' style={{display:"inline"}}></a>
                    <a href="" className='fa fa-linkedin' style={{display:"inline"}}></a>
                    <a href="" className='fa fa-instagram' style={{display:"inline"}}></a>
                </div>
            </div>
    </div>
  )
}

export default Footer