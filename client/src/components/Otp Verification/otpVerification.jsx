import { useContext, useState } from "react";
import { LoginContext } from "../../helpers/Context";
import axios from 'axios';
import { useNavigate } from "react-router";

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
        <form >
            <input type="text" onChange={(e)=>{setOtp(e.target.value)}}/>
            <button onClick={otpVerify}>Submit</button>
            
        </form>
        <button onClick={resendOTP}>Resend OTP</button>
        </>
    )
}

export default OtpVerification;