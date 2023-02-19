import React, { Component, useContext, useEffect} from 'react';
import qnas from './q&as.js'
// import { ChakraProvider } from '@chakra-ui/react';
import './About.scss';
// import {
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Box,
// } from '@chakra-ui/react'
import { LoginContext } from '../../helpers/Context.js';

function About(){

  const {loading, setLoading} = useContext(LoginContext);

  useEffect(() => {
    setLoading(true);
    const Load = async () => {
        await new Promise((r) => setTimeout(r, 2000));

        setLoading((loading) => !loading);
    }

    Load();
}, [])
  
const accordion = document.getElementsByClassName('container');

for (var i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}
    return (
      <>
      {loading &&
            <div className='spinner'>
            <span class="loader"></span>
            </div>
            }
        {!loading && <div className='wrapper'>
          <div className='about'>
      <div>
        <style>
                @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');                
        </style>
      {/* <ChakraProvider> */}
        <div className='wrapper' id='abd'>
          <div className='abouta' id='abt'>
            <h1 id='abouta'>ABOUT ALUMNI CELL</h1>
            <p id='para-abouta'>The Alumni Cell is the Institute’s student-run cell to connect and broaden the alum network. It started as a group of 4 individuals but now encompasses 5 teams working to improve Alum-Institute-Student Relations. The Yearbook was one such initiative undertaken by the Cell. Starting with the Class of 2021, the Yearbook’s First Edition was a smashing success and helped the alums and the students connect more. Following the same, the Yearbook Portal is another initiative headed by the Web Development Division of the Alumni Cell.<br></br> A one-stop hub to curate your Yearbook profile and help others do the same. This is the very first edition of the Yearbook Portal, and we would love to hear your comments and suggestions so we can improve in the coming years. </p>
            <p>Please reach us at:<br></br>E-Mail: alumnicell@iiti.ac.in<br></br>Enjoy commenting!<br></br>Regards<br></br>The Alumni Cell<br></br>Indian Institute of Technology, Indore<br></br></p>
          </div>
          <div className='faq'>
            <div class="accordion-body">
              <div class="accordion">
                <h1>Frequently Asked Questions (FAQs)</h1>
                <hr></hr>
                <div class="containera">
                  <div class="label">lorem 1</div>
                  <div class="content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint laudantium dolor id aliquam eligendi nobis. Vel aspernatur ut dolorem. Deleniti laudantium a fuga accusantium eaque nostrum reiciendis quod sint quas?</div>
                </div>
                <hr></hr>
                <div class="containera">
                  <div class="label">lorem 2</div>
                  <div class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum porro sit harum reiciendis quibusdam deserunt praesentium aut cum? Adipisci perferendis quisquam reiciendis? Fugiat dolore suscipit tenetur est ipsam impedit doloremque?
                </div>
                </div>
                <hr></hr>
                <div class="containera">
                  <div class="label">lorem 3</div>
                  <div class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non explicabo consectetur quod voluptatem maxime ipsa iste maiores, blanditiis delectus qui adipisci eius? Ea earum amet temporibus doloribus beatae excepturi nesciunt.</div>
                </div>
                <hr></hr>
                <div class="containera">
                  <div class="label">lorem 4</div>
                  <div class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, reiciendis suscipit aperiam vel consectetur aut explicabo sequi quos ab nam officiis quaerat nesciunt, itaque aliquam sapiente, dolorem dignissimos libero labore!</div>
                </div>
                <hr></hr>
                <div class="containera">
                  <div class="label">lorem 5</div>
                  <div class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sit, assumenda labore consequuntur possimus eius voluptas corrupti molestiae enim quidem corporis quia dolore. Tenetur porro commodi illum reiciendis, consequatur incidunt?</div>
                </div>
                <hr></hr>
              </div>
              </div>        
            </div>
          </div>              
      </div>
      </div>
      </div>}
      </>
    );
};

export default About;
