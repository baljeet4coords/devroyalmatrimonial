import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ShortListedProfile.module.scss";
import { Footer, Header } from "../../components";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";

const ShortlistedProfile: React.FC = () => {
  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <Header />
        </Container>
        <ShortVisitorProfile
          title={"0 Shortlisted Profiles"}
          subtitle={"People you shortlist will appear here"}
        />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ShortlistedProfile;
