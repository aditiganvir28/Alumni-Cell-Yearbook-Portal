import Members from './members';
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Cards.css';


class Cards extends Component {
    render(){
    return(
        <div className="cards">
            {Members.map((member) => {
                
                return(
                <Card post={member} key={member.Name} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={member.img} />
                <Card.Body>
                  <Card.Title >{member.Name}</Card.Title>
                  <Card.Text>{member.Desc}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
                )          
            })}
        </div>
    );
        }
};

export default Cards;