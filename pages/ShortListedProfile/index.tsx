import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ShortListedProfile.module.scss";
import { Footer, LoginHeader } from "../../components";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";

const ShortlistedProfile: React.FC = () => {
  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        <h1 className="text-center text-danger py-5 my-5">
          This Feature Is Coming Soon!
        </h1>
        {/* <ShortVisitorProfile
          title={"0 Shortlisted Profiles"}
          subtitle={"People you shortlist will appear here"}
        /> */}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ShortlistedProfile;
