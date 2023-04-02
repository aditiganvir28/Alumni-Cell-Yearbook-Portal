import React from 'react'
import './Footer.scss'
function Footer() {
  return (
    <div className='relative'>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.1/css/font-awesome.min.css"
      ></link>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
      <div className="container2f" id="abd1">
        <div className="footer-item">
          <h1 className="alumni-footer">Alumni Cell</h1>
          <p id="line" className="bg-white">
            The Alumni Cell is the student-run cell to connect and broaden the
            Institute’s alum network.
          </p>
          <div className="iconn flex-row flex mt-4">
            <div className="iconnn mr-2">
              <i className="fa fa-map-marker bg-[#180c1e]" id="map"></i>
            </div>
            <div className="tt">
              <p className="bg-[#180c1e]" id="address">
                Alumni and Corporate Relations Office, 7th floor, Abhinandan
                Bhavan, Indian Institute of Technology Indore, Khandwa Road,
                Simrol, Indore-453552, India<br></br>
                <br></br>+91-731-6603122/+91-731-6603555
              </p>
            </div>
          </div>
        </div>
        <div className="footer-item1 lg:mt-0 -mt-24">
          <h1>Important Links</h1>
          <ul
            id="links"
            style={{ listStyleType: 'circle', marginLeft: '30px' }}
          >
            <li>
              <a href="https://alumni.iiti.ac.in/">Alumni Portal</a>
            </li>
            <li>
              <a href="https://iiti.ac.in/">IITI Official Website</a>
            </li>
          </ul>
          {/* <br></br> */}
          <div className="mail">
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=alumnicell@iiti.ac.in"
              className="fa fa-envelope"
              id="env"
            ></a>
            <p id="para2" className="bg-transparent">
              {' '}
              alumnicell@iiti.ac.in,<br></br> acroffice@iiti.ac.in{' '}
            </p>
          </div>
        </div>
        <div className="footer-item2 lg:mt-0 -mt-24 mb-16 lg:mb-0">
          <h1 className="ml-8 lg:ml-0">Find Us On</h1>
          <br></br>
          <div className="flex flex-row ml-24 lg:ml-0 space-x-12 lg:space-x-0 w-1/4 lg:w-full">
            <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 w-1/2">
              <a
                href="https://www.facebook.com/iitialumnicell/"
                className="fa fa-facebook"
                style={{ display: 'inline' }}
              ></a>
              <a
                href="https://twitter.com/AlumniIit"
                className="fa fa-twitter"
                style={{ display: 'inline' }}
              ></a>
            </div>
            <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 mb-8 lg:mb-0 w-1/2">
              <a
                href="https://www.linkedin.com/company/alumni-cell-iit-indore/"
                className="fa fa-linkedin"
                style={{ display: 'inline' }}
              ></a>
              <a
                href="https://www.instagram.com/alumni_cell_iiti/?hl=en"
                className="fa fa-instagram"
                style={{ display: 'inline' }}
              ></a>
            </div>
          </div>
          <div className='flex flex-row space-y-8 space-x-8 absolute bottom-0 lg:bottom-16 mb-16 lg:mb-0 right-8 mr-32 lg:mr-0'>
            <img src="images/IITI.png" className='w-12 mt-8 h-12' alt='iiti logo'></img>
            <img src="images/ACR.png" className='w-12 h-12' alt='acr logo'></img>
          </div>
        </div>
      </div>
      <div className="end">
        © 2023 Alumni Cell IIT Indore - all rights reserved
      </div>
    </div>
  )
}

export default Footer
