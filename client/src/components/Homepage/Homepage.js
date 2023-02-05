import React from 'react'
// import "@fontsource/quantico";
function Homepage() {
    return (
        <div className="container">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
            </style>
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
        </div>
    )
}

export default Homepage