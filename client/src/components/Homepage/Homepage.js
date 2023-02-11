import React from 'react'
import "@fontsource/quantico";
// import Insta from "../Homepage/images/insta.png";
// import Twitter from "../Homepage/images/twitter.png";
// import Linkedin from "../Homepage/images/linkedin.png";
// import Facebook from "../Homepage/images/Facebook.png";
function Homepage() {
    return (
        <div className="overflow-x-hidden">
            <div className='flex w-screen h-screen bg-[#160923]'>
                <div className='flex flex-row w-full justify-around items-center'>
                    <div className='w-2/5 border-2 h-3/4 rounded-xl flex flex-col'>
                        <div className='h-1/3 text-white font-bold uppercase text-5xl text-left pl-4 mt-8'>WELCOME TO THE YEARBOOK PORTAL '23 OF IIT INDORE ...</div>
                        <div className='h-1/2 text-white uppercase text-3xl text-left pl-4 mt-2 w-full flex-wrap overscroll-contain'>ALUMNI CELL, IIT INDORE <br></br><br></br><span className='lowercase'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, aperiam hic amet rerum veritatis tempore et minus quae exercitationem maxime, optio consequuntur veniam earum illo! Tempore unde atque ullam reiciendis?</span></div>
                    </div>
                    <div className='w-1/3 h-3/4 flex flex-col'>
                        <div className='text-4xl uppercase text-white text-left w-3/4'>Welcome to your new memories page!</div>
                        <div className='bg-[#3E185C] h-96 w-96 rounded-full mt-12'></div>
                    </div>
                </div>
            </div>
            <div className='flex w-screen h-screen flex-col bg-[#160923]'>
                <div className='flex flex-row items-center justify-around h-3/5 w-full bg-gradient-to-tr from-purple-800'>
                    <div className='flex w-48 h-64 bg-white justify-center items-center rounded-xl'><h1 className='text-black text-center'>Class Of 2020</h1></div>
                    <div className='w-1/3 flex flex-col h-64'>
                        <div className='w-full h-1/2 flex flex-row justify-between items-center'>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='capitalize text-white'>captions in 2021</p>
                            </div>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='capitalize text-white'>captions in 2021</p>
                            </div>
                        </div>
                        <div className='w-full h-1/2 flex flex-row justify-between items-center'>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='capitalize text-white'>captions in 2021</p>
                            </div>
                            <div className='flex-col w-1/2'>
                                <h1 className='uppercase p-0 text-5xl'>2.75K+</h1>
                                <p className='capitalize text-white'>captions in 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer */}
                {/* <div className='w-full mx-8 flex flex-row justify-around items-start'>
                    <div className='flex flex-col w-1/3'>
                        <h1 className='uppercase px-0 py-4'>ALUMNI cell iit indore</h1>
                        <p className='text-white'>...................... ..................... ......................... .................................. ......................................... ...................................... ............................... .........</p>
                    </div>
                    <div className='w-1/3 ml-4'>
                        <h1 className='uppercase px-0 text-4xl py-6'>important links</h1>
                        <p className='text-white uppercase'>alumni portal</p>
                        <p className='text-white uppercase'>iiti official website</p>
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