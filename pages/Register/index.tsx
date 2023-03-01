
import { Container, Row  } from "react-bootstrap";
import RegisterHeader from "./RegisterHeader/RegisterHeader";
import {  Footer } from "../../components";
import React, { useState } from 'react';
import classes from "./RegisterDetails.module.scss";
import Link from "next/link";
import ProfileDetails from "./RegisterComponent/ProfileDetails";
// import CareerDetails from "./RegisterComponent/CareerDetails";
// import FamilyDetails from "./RegisterComponent/Lifestyle&FamilyDetails";

interface ProfileDetailsProps {
  chooseMessage: (a:number) => void
}
const RegisterDetails: React.FC<ProfileDetailsProps> = () => {
  const [active, setActive] = useState<number>(0);
  // const [message, setMessage] = useState<boolean>();
  const chooseMessage = (message:number) => {
    setActive(message)
  };
 
    return (
        <React.Fragment>
            <Container fluid  className={classes.background_header} >
            <RegisterHeader />
            <Row md={8} className={classes.register_header_Links}>
                <Link className={`${active === 0 ? classes.active : " "}`} href="#">Profile Details</Link>
                <Link className={`${active === 1 ? classes.active : " "}`} href="#">Career Details</Link>
                <Link className={`${active === 2 ? classes.active : " "}`} href="#">Lifestyle & Family</Link>
              </Row>
            </Container>
              <ProfileDetails chooseMessage={chooseMessage} />
            <Footer />
        </React.Fragment>
    )
}

export default RegisterDetails;