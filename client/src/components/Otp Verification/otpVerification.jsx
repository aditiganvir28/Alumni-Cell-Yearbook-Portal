import { useContext, useState } from "react";
import { LoginContext } from "../../helpers/Context";
import axios from 'axios';
import { useNavigate } from "react-router";

const OtpVerification = () =>{
    const [otp, setOtp] = useState("");
    const {user} = useContext(LoginContext);
    const navigate = useNavigate();
    const otpVerify = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/verify',{
            phoneOTP: otp,
            userId: user.email
        }).then((res)=>{
            console.log(res);
            if(res.data.two_step_verified===true){
                navigate('/profile')
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
        </>
    )
}

export default OtpVerification;