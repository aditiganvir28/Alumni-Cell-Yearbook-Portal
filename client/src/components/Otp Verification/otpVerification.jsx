import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../helpers/Context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./otpverification.scss";

const OtpVerification = () =>{
    const {loggedin, setLoggedin, fill, setFill,user, setUser} = useContext(LoginContext);
    const [message, setMessage] = useState("");
    const [otp, setOtp] = useState("");

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
    console.log(user);
    const otpVerify = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/verify',{
            phoneOTP: otp,
            userId: user.email
        }).then((res)=>{
            console.log(res);
            if(res.data==="Mobile number verified"){
                navigate('/profile');
                setFill(true);
                // window.location.reload();
            }
            else{
                setMessage(res.data);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    const resendOTP = () =>{
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
            <div className="resend">
            <button onClick={resendOTP}>Resend OTP</button>
        </div>                      
        </form>
        <div className="submit">
            <button onClick={otpVerify} id='submit'>Submit</button>
            </div>  
        </div>
        <br></br>
        <br></br>
        <br></br>
        </>
    )
}

export default OtpVerification;