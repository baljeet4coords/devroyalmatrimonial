import { Col, Container, Row } from "react-bootstrap";
import RegisterHeader from "./RegisterComponent/RegisterHeader/RegisterHeader";
import { Footer } from "../../components";
import React, { useState } from "react";
import classes from "./RegisterDetails.module.scss";
import {
  ProfileDetails,
  LifestyleFamilyDetails,
  CareerDetails,
} from "./RegisterComponent";
interface ProfileDetailsProps {
  chooseMessage: (a: number) => void;
}
const RegisterDetails: React.FC<ProfileDetailsProps> = () => {
  const [active, setActive] = useState<number>(0);
  const chooseMessage = (message: number) => {
    setActive(message);
  };

  return (
    <React.Fragment>
      <Container fluid className={classes.background_header}>
        <RegisterHeader />
        <Row className={classes.register_header_Links}>
          <Col
            xs={4}
            className={`${active === 0 ? classes.active : " "} ${
              classes.topButtons
            }`}
            onClick={() => chooseMessage(0)}
          >
            Profile Details
          </Col>
          <Col
            xs={4}
            className={`${active === 1 ? classes.active : " "} ${
              classes.topButtons
            }`}
            onClick={() => chooseMessage(1)}
          >
            Career Details
          </Col>
          <Col
            xs={4}
            className={`${active === 2 ? classes.active : " "} ${
              classes.topButtons
            }`}
            onClick={() => chooseMessage(2)}
          >
            Lifestyle & Family
          </Col>
        </Row>
      </Container>
      {active === 0 ? (
        <ProfileDetails nextPage={chooseMessage} />
      ) : active === 1 ? (
        <CareerDetails chooseMessage={chooseMessage} />
      ) : (
        <LifestyleFamilyDetails />
      )}

      <Footer />
    </React.Fragment>
  );
};

export default RegisterDetails;
