import { useContext, useState } from "react";
import { LoginContext } from "../../helpers/Context";
import axios from 'axios';
import { useNavigate } from "react-router";
import "./otpverification.scss";

const OtpVerification = () =>{
    const [otp, setOtp, loggedin, setLoggedin] = useState("");
    const [message, setMessage] = useState("");
    const {user} = useContext(LoginContext);
    const navigate = useNavigate();
    const otpVerify = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/verify',{
            phoneOTP: otp,
            userId: user.email
        }).then((res)=>{
            console.log(res);
            if(res.data==="Mobile number verified"){
                navigate('/profile')
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
                navigate('/profile')
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