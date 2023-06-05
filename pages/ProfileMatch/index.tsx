import { Container, Row, Col, Image } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import ProfileCard from "../../components/ProfileCard";
import classes from "./ProfileMatch.module.scss";
import React from "react";
import { Footer } from "../../components";
import TestProfileCard from "../../components/ProfileCard/TestProfileCard";

const ProfileMatch: React.FC = () => {
  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        {/* <h1 className="text-center text-danger py-5 my-5">
          This Feature Is Coming Soon!
        </h1> */}
        <ProfileCard />
        <TestProfileCard />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ProfileMatch;
