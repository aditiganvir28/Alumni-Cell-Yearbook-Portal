import { useState, useEffect } from 'react';
import { GoogleLogin } from "react-google-login";
import {gapi} from "gapi-script";
// import './Navbar.css';
const Navbar=()=> {
  const [result, setResult] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [authData, setAuthData] = useState([]);

  const navigate = useNavigate();

    //getting all alumnis email id from json
    const alumniEmail= alumniData;

    const onSignIn= () => {
      axios.get('http://localhost:5000/auth')
        .then((res)=>{
          console.log(res.data);
          setAuthData(res.data);
        })
        .catch((err)=>{
          console.log(err);
        })
  
        if(authData.includes(authData.user_id===id)){
          if(alumniData.includes(email)){
            navigate('/register');
          }
          else{
            navigate('/');
          }
        }
        else{
          axios.post('http://localhost:5000/auth', {
        user_id: id,
        email: email,
        name: name
      }).then((res)=>{
        console.log(res.data);
      }).catch((err)=>{
        console.log(err);
      })
  
          if(alumniData.includes(email)){
            navigate('/register');
          }
          else{
            navigate('/');
          }
        }
      }

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
    <div className="container">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
      </style>
    <div className='header'>
      <img src='/images/1.png'/>
      <div className='navbar'>
        <ul>
          <a href="#">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">DEVELOPERS</a>
          {/* <li>
              <div className="searchr">
                <input type="text" placeholder="Search..." class="search"/>
              </div>
          </li> */}
          {/* <li><img src='/images/sign_in.png'/></li> */}
          <li>            
          <div className="google">
          <GoogleLogin
			        clientId="971426024153-8iva32hh346i681clve32rkq2g7uu7eo.apps.googleusercontent.com"
			        onSuccess={googleSuccess}
			        onFailure={googleFailure}
			        cookiePolicy="single_host_origin"/>
            </div>
              </li>
          </ul>        
      </div>
      </div>
    </div>
  );
}

export default Navbar;