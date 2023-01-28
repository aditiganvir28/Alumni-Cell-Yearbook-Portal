<<<<<<< HEAD
=======
import { useState, useEffect } from 'react';
import { GoogleLogin } from "react-google-login";
import {gapi} from "gapi-script";
>>>>>>> 646582c64e9709b67e31885e0aac91e96ac4332a
import './navbar.css';
const Navbar=()=> {

  const [result, setResult] = useState({});

  const googleSuccess=(res)=>{
		console.log(res);
		result=res?.profileObj;
		setResult(result?.profileIbj)
		const token=res?.tokenId;
	}

  useEffect(()=>{
		gapi.load("client:auth2",()=>{
			gapi.auth2.init({clientId:"971426024153-8iva32hh346i681clve32rkq2g7uu7eo.apps.googleusercontent.com"})
		})
	})

	const googleFailure=(err)=>{
		console.log(err);
		console.log("Failure");
	}
  return (
    <div className='header'>
      <img src='/images/1.png'/>
      <div className='navbar'>
        <ul>
          <li>HOME</li>
          <li>ABOUT</li>
          <li>DEVELOPER</li>
          <li><div className="search">
          <input type="text" placeholder="Search..." />
        </div></li>
          {/* <li><img src='/images/sign_in.png'/></li> */}
          <GoogleLogin
			clientId="971426024153-8iva32hh346i681clve32rkq2g7uu7eo.apps.googleusercontent.com"
			onSuccess={googleSuccess}
			onFailure={googleFailure}
			cookiePolicy="single_host_origin"/>
        </ul>
        
      </div>
    </div>
  );
}

export default Navbar;