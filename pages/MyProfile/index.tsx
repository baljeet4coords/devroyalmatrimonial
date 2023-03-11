import { Container, Row, Col, Image } from "react-bootstrap";
import LoginrHeader from "../../components/LoginHeader/Loginheader";
import React, { useState, useRef, useEffect } from "react";
import classes from "./MyProfile.module.scss";
import { ImImage } from "react-icons/im";
import MyProfilePageCard from "../../components/MyProfile/MyProfilePageCard";
import {
  AboutMeDetails,
  BasicDetails,
  CriticalDetials,
  EducationAndCareer,
  FamilydetailsInfo,
  LifeStyleDetails,
  LikeDetails,
  MyProfileRightSec,
} from "../../components/MyProfile/Components";
import { EditCriticalDetials } from "../../components/EditMyProfile";
import EditBasicDetials from "../../components/EditMyProfile/EditBasicDetails";

const MyProfile: React.FC = () => {
  const [criticalDetails, setCriticalDetails] = useState<boolean>(false);
  const [basicDetails, setBasicDetails] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginrHeader />

          <p>
            Make your profile more intersting by adding cover photo to your
            profile.
          </p>
          <div className={classes.changeBackground}>
            Change Cover Photo
            <ImImage />
          </div>
        </Container>
        <MyProfilePageCard />
        <Container className={classes.detailsWrapper}>
          <Row>
            <Col sm={9} md={8} className="p-0">
              {criticalDetails ? (
                <EditCriticalDetials setCriticalDetails={setCriticalDetails} />
              ) : (
                <CriticalDetials setCriticalDetails={setCriticalDetails} />
              )}
              <hr />
              {basicDetails ? (
                <EditBasicDetials setBasicDetails={setBasicDetails} />
              ) : (
                <BasicDetails setBasicDetails={setBasicDetails} />
              )}
              <hr />
              <AboutMeDetails />
              <hr />
              <EducationAndCareer />
              <hr />
              <FamilydetailsInfo />
              <hr />
              <LifeStyleDetails />
              <hr />
              <LikeDetails />
              <div className={classes.datecont}>
                <p>Last updated on 15th Feb, 2023</p>
              </div>
            </Col>
            <Col sm={3} md={4} className="p-0">
              <MyProfileRightSec />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
