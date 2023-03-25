import Members from "./members";
import React, { Component, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import loadingSpinner from "../Homepage/images/808.gif";
import "./Cards.scss";
import { LoginContext } from "../../helpers/Context";
import Navbar from '../navbar/navbar'
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
      {loading && (
        <div className="spinner">
          <span class="loader"></span>
        </div>
      )}
      {!loading && (
        <div className="cards">
          {Members.map((member) => {
            return (
              <Card post={member} key={member.Name} style={{ width: "18rem" }}>
                <Card.Img id='photo'variant="top" src={member.img} />
                <Card.Body>
                  <Card.Title>{member.Name}</Card.Title>
                  <Card.Text>{member.Desc}</Card.Text>
                  <Button variant="primary" id="go" style={{ width: "70%" }}>
                    Go somewhere
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Cards;
