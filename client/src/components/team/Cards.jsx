import Members from "./members";
import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";
import Card from "react-bootstrap/Card";
import "./Cards.scss";
import { LoginContext } from "../../helpers/Context";

function Cards() {
  const { loading, setLoading } = useContext(LoginContext);

  useEffect(() => {
    setLoading(true);
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 1000));

      setLoading((loading) => !loading);
    };

    Load();
  }, []);

  return (
    <>
    <style>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.1/css/font-awesome.min.css"
      ></link>
    </style>
      {loading && (
        <div className="spinner">
          <span class="loader"></span>
        </div>
      )}
        <h1 id="meet">Meet The <div className="disc">Team</div> :) </h1>
      {!loading && (
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
          className="cards"
        >
          {Members.map((member) => {
            return (
              <Card post={member} key={member.Name} style={{ width: "18rem" }}>
                <Card.Img id="photo" variant="top" src={member.img} />
                <Card.Body id="card-body">
                  <Card.Title id="card-title">{member.Name}</Card.Title>
                  {/* <Card.Text id="card-text">{member.Desc}</Card.Text> */}
                  
                  <motion.a 
                  whileHover={{ scale: 1.1 }} id="insta"
                  href={member.Linkedin} className="fa fa-linkedin" target="_blank"></motion.a>
                  <motion.a 
                  whileHover={{ scale: 1.1 }} id='insta'
                  href={member.Instagram} className="fa fa-instagram" target="_blank"></motion.a>
                  <motion.a href="" whileHover={{ scale: 1.1 }} className="fa fa-github" id="insta" target="_blank"></motion.a>
                  {/* <motion.a href= {member.Yearbook} whileHover={{ scale: 1.1 }} className="fa fa-user" id="insta"></motion.a> */}
                  
                </Card.Body>
              </Card>
            );
          })}
        </motion.div>
      )}
    </>
  );
}

export default Cards;
