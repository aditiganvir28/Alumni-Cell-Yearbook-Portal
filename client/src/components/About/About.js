import React, { Component } from 'react';
import qnas from './q&as.js';
import "@fontsource/quantico";
import { ChakraProvider } from '@chakra-ui/react'
import './About.scss';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'

class About extends Component {
  render() {
    return (
      <div>
        <style>
                @import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');                
        </style>
      <ChakraProvider>
        <div className='wrapper' id='abd'>
          <div className='about' id='abt'>
            <h1 id='about'>ABOUT ALUMNI CELL</h1>
            <p id='para-about'>The Alumni Cell is the Institute’s student-run cell to connect and broaden the alum network. It started as a group of 4 individuals but now encompasses 5 teams working to improve Alum-Institute-Student Relations.The Yearbook was one such initiative undertaken by the Cell. Starting with the Class of 2021, the Yearbook’s First Edition was a smashing success and helped the alums and the students connect more. Following the same, the Yearbook Portal is another initiative headed by the Web Development Division of the Alumni Cell. A one-stop hub to curate your Yearbook profile and help others do the same. This is the very first edition of the Yearbook Portal, and we would love to hear your comments and suggestions so we can improve in the coming years. </p>
            <p>Please reach us at:<br></br>E-Mail: alumnicell@iiti.ac.in<br></br>Enjoy commenting!<br></br>Regards<br></br>The Alumni Cell<br></br>Indian Institute of Technology, Indore<br></br></p>
          </div>
          <div className='faq'>
            <h1 id='faq'>Frequently Asked Questions</h1>
            <div className='qna'>
              <Accordion defaultIndex={[0]} allowMultiple>
                {qnas.map((qna) => {
                  return (
                    <AccordionItem>
                  <h2 className='q'>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        {qna.q}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} id='a'>
                    {qna.a}
                  </AccordionPanel>
                </AccordionItem>
                  )
                })}
                
              </Accordion>
              
            </div>
          </div>
        </div>
      </ChakraProvider>
                </div>
    );
  }
};

export default About;
