import React, { useContext, useEffect } from 'react'
// import "@fontsource/quantico";
import Insta from "../Homepage/images/insta.png";
import Twitter from "../Homepage/images/twitter.png";
import Linkedin from "../Homepage/images/linkedin.png";
import Facebook from "../Homepage/images/Facebook.png";
import "@fontsource/quantico";
import { useNavigate } from 'react-router';
import { LoginContext } from '../../helpers/Context';
import axios from 'axios';
import Lines from "./images/lines.png";
import Lines2 from "./images/lines2.png";
import Lines3 from "./images/lines3.png";
import Search from "./images/search.png";
import Comment from "./images/comment.png";
// import Insta from "../Homepage/images/insta.png";
// import Twitter from "../Homepage/images/twitter.png";
// import Linkedin from "../Homepage/images/linkedin.png";
// import Facebook from "../Homepage/images/Facebook.png";
function Homepage() {
    const navigate = useNavigate();
    const { setLoggedin, setUser, user } = useContext(LoginContext);
    //Get the data to be displayed on the profile
    // useEffect(()=>{
    //     axios.post('http://localhost:5000/profile', {
    //       email: user.email
    //     }).then((res)=>{
    //     //   console.log(res.data);
    //       if(res.data.message==="No User Found"){
    //         setUser({});
    //         window.localStorage.removeItem('user');
    //         setLoggedin(false);
    //         window.localStorage.setItem('loggedin', false)
    //         document.getElementById("google-login").hidden = false;
    //         navigate('/');
    //       }
    //     })
    //   },[])
    return (
        <div className="overflow-x-hidden w-screen flex flex-col">
            <div className='flex flex-col overflow-x-hidden'>
                <div className='flex flex-col lg:flex-row w-full justify-around items-center lg:mb-8 lg:h-screen'>
                    <div className='w-4/5 lg:w-2/5 lg:mt-0 mt-8 border-2 lg:h-3/5 h-4/5 rounded-xl flex flex-col items-start justify-center relative'>
                        <div className='text-white font-bold uppercase text-4xl lg:text-5xl lg:text-left lg:pl-4 mt-8 text-center'>WELCOME TO THE YEARBOOK PORTAL '23 OF IIT INDORE ...</div>
                        <div className=' lg:mb-0 mb-2 text-white uppercase text-3xl text-left pl-4 lg:pr-4 mt-8 lg:mt-8 w-full flex-wrap overscroll-contain'>ALUMNI CELL, IIT INDORE <br></br><br></br><span className='capitalize text-xl'>Welcome to the Yearbook Portal- A one-stop hub to curate your Yearbook profile and help others do the same!</span></div>
                    </div>
                    <div className='w-full lg:w-1/3 lg:h-3/4 mt-8 lg:mt-0 flex flex-col items-center lg:items-start'>
                        <div className='text-4xl uppercase text-white text-center lg:text-left w-4/5 lg:w-3/4'>Welcome to your new memories page!</div>
                        <div className='bg-[#3E185C] h-96 w-96 rounded-full mt-12 lg:mb-0 mb-12'></div>
                    </div>
                </div>
            </div>
            {/* <div className='w-full z-10'>
                <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fill-rule="nonzero">
                            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                            <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
                            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
                        </g>
                        <g transform="translate(-4.000000, 76.000000)" fill='#FFFFFF' fill-rule="nonzero">
                            <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
                        </g>
                    </g>
                </svg>
            </div> */}


            {/* steps */}

            <div className='w-full'>
                <div className=' ml-16 w-1/2 text-4xl text-white capitalize'>connecting with your friends has never been <span className='text-[#fec80a]'>more</span> easy before!</div>
                <div className='flex flex-row mt-2'>
                    <img className='ml-16 w-32 object-contain z-10 rounded-none' src={Lines}></img>
                    <div className='mt-48 -ml-32 w-3/4'>
                        <h1 className='text-white pl-8 uppercase'>step 1</h1>
                        <div className='text-2xl text-white bg-transparent ml-24 mt-12 w-2/5'>
                            Log in using your <span className='text-[#fec80a]'>institute</span> ID, and upon the first login, you will be asked to complete your information details. Following this, you will have created your profile for the Yearbook!
                        </div>
                    </div>
                    <div className='w-96 h-64 rounded-xl bg-gray-600 -ml-64 mt-16'></div>
                    <div className='w-96 h-64 rounded-xl bg-gray-800 -ml-72 mt-32'></div>
                </div>
                <div className='w-full h-8 mt-4 object-contain'>
                    <img className='object-contain h-full w-8 ml-14' src={Search}></img>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex flex-row mt-4 items-start'>
                    <img className='ml-14 w-16 object-contain z-10 rounded-none' src={Lines2}></img>
                    <div className='w-3/4 mt-48 -ml-12'>
                        <h1 className='text-white pl-8 uppercase'>step 2</h1>
                        <div className='text-2xl text-white bg-transparent ml-24 mt-12 w-2/5'>
                            Now for the fun part! Using the <span className='text-[#fec80a]'>Search Bar</span>, you can look up other batchmates who have registered on the Portal and can comment on their page!
                        </div>
                    </div>
                    <div className='w-1/3 h-96 rounded-xl bg-gray-800 -ml-96 mt-32'></div>
                </div>
                <div className='w-full h-8 mt-4 ml-2 object-contain'>
                    <img className='object-contain h-full' src={Comment}></img>
                </div>
            </div>
            <div className='w-full mt-4'>
                <div className='flex flex-row mt-2 mb-4'>
                    <img className='ml-14 w-8 object-contain z-10 rounded-none h-full' src={Lines3}></img>
                    <div className='flex flex-col'>
                        <div className='flex flex-row'>
                            <div className='mt-48  w-3/4'>
                                <h1 className='text-white pl-8 uppercase'>remember<span className='text-[#fec80a]'>!</span></h1>
                                <div className='text-2xl text-white bg-transparent ml-24 mt-12 w-2/5'>
                                    Others can comment on your page, and you will have the power to <span className='text-[#fec80a]'>approve</span> those comments.
                                </div>
                            </div>
                            <div className='w-96 h-64 rounded-xl bg-gray-600 -ml-64 mt-16'></div>
                            <div className='w-96 h-64 rounded-xl bg-gray-800 -ml-72 mt-32'></div>
                        </div>
                        <div className='flex flex-col w-full h-96 items-center justify-center'>
                            <h1 className='text-4xl text-white capitalize w-2/3 text-center'>So, register now and join in on the <span className='text-[#fec80a]'>nostalgic</span> trips of your time at IIT Indore!</h1>
                            <a><button className='bg-transparent border-2 rounded-xl border-white w-32 h-14 text-white uppercase hover:bg-[#fec80a] hover:text-[#180c1e] hover:border-transparent ease-in-out duration-300 '>Register</button></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-screen flex-col bg-[#160923] z-0 -mt-[4rem]'>
                <div className='lg:pt-16 flex flex-col lg:flex-row items-center justify-around lg:h-3/5 w-full bg-gradient-to-tr from-purple-800 lg:pb-16'>
                    <div className='flex w-72 lg:mt-0 mt-8 lg:mb-0 mb-8 h-96 bg-white justify-center items-center rounded-xl'><h1 className='text-black text-center'>Class Of 2020</h1></div>
                    <div className='w-4/5 lg:w-1/3 flex flex-col lg:h-64'>
                        <div className='w-full h-1/2 flex flex-col lg:flex-row justify-start lg:justify-between items-center'>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='bg-transparent capitalize text-white'>captions in 2021</p>
                            </div>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='bg-transparent capitalize text-white'>captions in 2021</p>
                            </div>
                        </div>
                        <div className='w-full h-1/2 flex flex-col lg:flex-row justify-start lg:justify-between items-center'>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='bg-transparent capitalize text-white'>captions in 2021</p>
                            </div>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='bg-transparent capitalize text-white'>captions in 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer */}
                {/* <div className='w-full mx-8 flex flex-row justify-around items-start'>
                    <div className='flex flex-col w-1/3'>
                        <h1 className='uppercase px-0 py-4'>ALUMNI cell iit indore</h1>
                        <p className='bg-transparent text-white'>...................... ..................... ......................... .................................. ......................................... ...................................... ............................... .........</p>
                    </div>
                    <div className='w-1/3 ml-4'>
                        <h1 className='uppercase px-0 text-4xl py-6'>important links</h1>
                        <p className='bg-transparent text-white uppercase'>alumni portal</p>
                        <p className='bg-transparent text-white uppercase'>iiti official website</p>
                    </div>
                    <div className='w-1/3'>
                        <h1 className='uppercase px-0 text-4xl py-6'>find us on</h1>
                        <div className='flex flex-row justify-start space-x-4'>
                            <img className='w-12' src={Insta}></img>
                            <img className='w-8' src={Twitter}></img>
                            <img className='w-8' src={Linkedin}></img>
                            <img className='w-8' src={Facebook}></img>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Homepage