import { Container, Row, Col, Image } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
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
import EditAboutMe from "../../components/EditMyProfile/EditAboutMe";
import EditEducationAmdCareer from "../../components/EditMyProfile/EditEducationAndCareer";
import EditFamilyDetails from "../../components/EditMyProfile/EditFamilyDetails";
import EditLifeStyle from "../../components/EditMyProfile/EditLifeStyleDetails";
import EditYourLikes from "../../components/EditMyProfile/EditYourLikesDetails";

const MyProfile: React.FC = () => {
  const [criticalDetails, setCriticalDetails] = useState<boolean>(false);
  const [basicDetails, setBasicDetails] = useState<boolean>(false);
  const [aboutMeDetails, setAboutMeDetails] = useState<boolean>(false);
  const [eudcationAndCareer, setEudcationAndCareer] = useState<boolean>(false);
  const [familyDetails, setFamilyDetails] = useState<boolean>(false);
  const [lifeStyleDetails, setLifeStyleDetails] = useState<boolean>(false);
  const [yourLikesDetails, setYourLikesDetails] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />

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
              {aboutMeDetails ? (
                <EditAboutMe setAboutMeDetails={setAboutMeDetails} />
              ) : (
                <AboutMeDetails setAboutMeDetails={setAboutMeDetails} />
              )}
              <hr />
              {eudcationAndCareer ? (
                <EditEducationAmdCareer
                  setEudcationAndCareer={setEudcationAndCareer}
                />
              ) : (
                <EducationAndCareer
                  setEudcationAndCareer={setEudcationAndCareer}
                />
              )}
              <hr />
              {familyDetails ? (
                <EditFamilyDetails setFamilyDetails={setFamilyDetails} />
              ) : (
                <FamilydetailsInfo setFamilyDetails={setFamilyDetails} />
              )}
              <hr />
              {lifeStyleDetails ? (
                <EditLifeStyle setEditDetails={setLifeStyleDetails} />
              ) : (
                <LifeStyleDetails setEditDetails={setLifeStyleDetails} />
              )}
              <hr />
              {yourLikesDetails ? (
                <EditYourLikes setEditDetails={setYourLikesDetails} />
              ) : (
                <LikeDetails setEditDetails={setYourLikesDetails} />
              )}
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
