import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../helpers/Context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./otpverification.scss";

const OtpVerification = () =>{
    const {setLoggedin, 
          // fill, 
          // loggedin,
          setFill,user, setUser, setVerified} = useContext(LoginContext);
    const [message, setMessage] = useState("");
    const [otp, setOtp] = useState("");
    const [state, setState] = useState(false);
    const [profile, setProfile] = useState({});

    const rand = () => {
        return Math.random().toString(36).substr(2);
      };
      
      const token = () => {
        return rand() + rand();
      };
      
      console.log(token());

    //Get the data to be displayed on the profile
  useEffect(() => {
    axios
      .post('http://localhost:5000/profile', {
        email: user.email,
      })
      .then((res) => {
        setProfile(res.data.User[0])
      })
  })

     //After refreshing the page user is still signed in 
  useEffect(() => {
    if (window.localStorage.getItem('user') !== null) {
      const userLoggedIn = window.localStorage.getItem('user');
      if (userLoggedIn !== null) {
        setUser(JSON.parse(userLoggedIn));
      }
    }
    const logged = (window.localStorage.getItem('loggedin'));
    if (logged === "true") {
      setLoggedin(true);
    }
    else {
      setLoggedin(false);
    }
  },[])

    const navigate = useNavigate();

    const otpVerify = (e) =>{
        e.preventDefault();
        setState(true);
        setTimeout(()=>{
            setState(false)
        }, 20000)
        axios.post('http://localhost:5000/verify',{
            phoneOTP: otp,
            userId: user.email
        }).then((res)=>{
          
            console.log(res);
            if(res.data.message==="Mobile number verified"){
                navigate(`/profile/${profile._id}/${profile.name}/${token}`);
                setFill(true);
                setVerified(true);
                setLoggedin(true);
                window.location.reload();
            }
            setMessage(res.data.message);
        setTimeout(()=>{
            setMessage("");
        }, 20000)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const resendOTP = () =>{
        setState(true);
        setTimeout(()=>{
            setState(false)
        }, 20000)
        axios.post('http://localhost:5000/resendOTP',{
            phoneOTP: otp,
            userId: user.email
        }).then((res)=>{
            console.log(res);
            if(res.data.message==="Mobile number verified"){

            }
            else{
                setMessage(res.data.message);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
        <br></br>
        <h1 id='otph1'>Please enter the OTP sent on provided contact number.</h1>
        <div className="container-otp">
        <form >
            <input type="text" id='otp' onChange={(e)=>{setOtp(e.target.value)}}/>
            <div className={state? "resend-disabled" : "resend"}>
            <button onClick={resendOTP} disabled={state}>Resend OTP</button>
            
        </div>  
        <p style={{color: "red"}}>{message}</p>                    
        </form>
        <div className="submit">
            <button onClick={otpVerify} id='submit' disabled={state} style={{ background: state ? '#838080' : '#3E185C' }}>Submit</button>
            </div>  
        </div>
        <br></br>
        <br></br>
        <br></br>
        </>
    )
}

export default OtpVerification;