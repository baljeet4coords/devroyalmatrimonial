import React from "react";
import { Container } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ProfileVisitor.module.scss";
import { LoginHeader, Footer } from "../../components";

const ProfileVisitor: React.FC = () => {  
  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        <h1 className="text-center text-danger py-5 my-5">
          This Feature Is Coming Soon!!
        </h1>
        {/* <ShortVisitorProfile
          title={"0 All Profile Visitors"}
          subtitle={
            "People who visited your profile in the last week will appear here"
          }
        /> */}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ProfileVisitor;
