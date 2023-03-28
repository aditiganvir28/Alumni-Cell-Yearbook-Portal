import { useContext, useState } from "react";
// import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../helpers/Context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./otpverification.scss";

const OtpVerification = () =>{
    const {
      // loggedin, 
      setLoggedin, 
      // fill, 
      setFill,user, 
      // setUser, 
      setVerified, setProfileIcon, 
      // profileIcon, 
      userData, 
      // setUserData,
      profile, 
      setProfile
    } = useContext(LoginContext);
    const [message, setMessage] = useState("");
    const [otp, setOtp] = useState("");
    const [state, setState] = useState(false);
    // const [profile, setProfile] = useState({});

// token for profile
const token = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  };

    //Get the data to be displayed on the profile
  // useEffect(() => {
  //   axios
  //     .post('http://localhost:5000/profile', {
  //       email: user.email,
  //     })
  //     .then((res) => {
  //       setProfile(res.data.User[0])
  //     })
  // })

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
                console.log(res.data);
                setFill(true);
                setVerified(true);
                setProfileIcon(true);
                setLoggedin(true);
                window.localStorage.setItem('verified', true)
                window.localStorage.setItem('profileIcon', true)
                setProfile(res.data.user)
                // const p = JSON.stringify(res.data.User[0])
                window.localStorage.setItem('profile', JSON.stringify(res.data.user))
                console.log(profile);
                navigate(`/profile/${profile._id}/${profile.name}/${token(32)}`);
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