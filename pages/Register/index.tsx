import { Col, Container, Row } from "react-bootstrap";
import RegisterHeader from "./RegisterComponent/RegisterHeader/RegisterHeader";
import { Footer } from "../../components";
import React, { useState } from "react";
import classes from "./RegisterDetails.module.scss";
// import ProfileDetails from "../ProfileDetails";
import CareerDetails from "./RegisterComponent/CareerDetails";
import ExpressYourself from "./RegisterComponent/ExpressYourself";
import FamilyDetails from "./RegisterComponent/FamilyDetails";
import LifeStyle from "./RegisterComponent/LfieStyle";
import ProfileDetails from "./RegisterComponent/ProfileDetails";
interface ProfileDetailsProps {
  chooseMessage: (a: number) => void;
}
const topHeading = [
  "Profile Details",
  "Career Details",
  "Lifestyle",
  "Family",
  "Express Yourself",
];

const RegisterDetails: React.FC<ProfileDetailsProps> = () => {
  const [active, setActive] = useState<number>(0);
  const chooseMessage = (message: number) => {
    setActive(message);
  };
  const Components = [
    <ProfileDetails key={0} nextPage={chooseMessage} />,
    <CareerDetails key={1} nextPage={chooseMessage} />,
    <LifeStyle key={2} nextPage={chooseMessage} />,
    <FamilyDetails key={3} nextPage={chooseMessage} />,
    <ExpressYourself key={4} />,
  ];

  return (
    <React.Fragment>
      <Container fluid className={classes.background_header}>
        <RegisterHeader />
        <Row className={classes.register_header_Links}>
          {topHeading.map((heading, index) => {
            return (
              <Col
                key={index}
                className={`${active === index ? classes.active : " "} ${
                  classes.topButtons
                }`}
                onClick={() => chooseMessage(index)}
              >
                {heading}
              </Col>
            );
          })}
        </Row>
      </Container>
      {Components.map((component, index) => {
        if (index === active) {
          return component;
        } else {
          return null;
        }
      })}

      <Footer />
    </React.Fragment>
  );
};

export default RegisterDetails;
