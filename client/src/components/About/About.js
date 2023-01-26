import React from 'react';
import './About.css';
import { Card, CardHeader, CardBody, CardFooter, Text, Box, Heading, Stack, Center } from '@chakra-ui/react';

function About() {
  return (
    <Center>
    <div className='about'>
        <Stack spacing='4'>
            {['elevated', 'outline', 'filled', 'unstyled'].map((variant) => (
                <Card>
                <CardHeader>
                    
                    <Heading size='lg'>About Alumni Cell</Heading>
                </CardHeader>
                <CardBody>
                    <Text></Text>
                </CardBody>
                </Card>
            ))}
        </Stack>
    </div>
            </Center>
  )
}

export default About