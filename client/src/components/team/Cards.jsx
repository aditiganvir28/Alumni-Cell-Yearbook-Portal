import Members from './members';
import React, {Component, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import loadingSpinner from '../Homepage/images/808.gif'
import './Cards.scss';
import { LoginContext } from '../../helpers/Context';
function Cards(){
    const {loading, setLoading} = useContext(LoginContext);
    
    useEffect(() => {
      const Load = async () => {
          await new Promise((r) => setTimeout(r, 5000));

          setLoading((loading) => !loading);
      }

      Load();
  }, [])

    return(
      <>
      {!loading &&
      <div className='loading_spinner' style={{width: "100%", height:"100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <img src={loadingSpinner}></img>
  </div>
      }
      {loading &&
        <div className="cards">
            {Members.map((member) => {
                
                return(
                <Card post={member} key={member.Name} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={member.img} />
                <Card.Body>
                  <Card.Title >{member.Name}</Card.Title>
                  <Card.Text>{member.Desc}</Card.Text>
                  <Button variant="primary" id='go' style={{ width :"70%"}}>Go somewhere</Button>
                </Card.Body>
              </Card>
                )          
            })}
        </div>}
      </>
    );
        
};

export default Cards;