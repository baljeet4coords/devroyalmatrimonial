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
  // LikeDetails,
  MyProfileRightSec,
} from "../../components/MyProfile/Components";
import { EditCriticalDetials } from "../../components/EditMyProfile";
import EditBasicDetials from "../../components/EditMyProfile/EditBasicDetails";
import EditAboutMe from "../../components/EditMyProfile/EditAboutMe";
import EditEducationAmdCareer from "../../components/EditMyProfile/EditEducationAndCareer";
import EditFamilyDetails from "../../components/EditMyProfile/EditFamilyDetails";
import EditLifeStyle from "../../components/EditMyProfile/EditLifeStyleDetails";
// import EditYourLikes from "../../components/EditMyProfile/EditYourLikesDetails";
import { useDispatch } from "react-redux";
import { myProfileReq } from "../../ducks/myProfile/actions";
import { useSelector } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import { selectmyProfileLoading, selectmyProfileSuccess } from "../../ducks/myProfile/selectors";
import Loader from "../../components/Loader/Loader";

const MyProfile: React.FC = () => {
  const [criticalDetails, setCriticalDetails] = useState<boolean>(false);
  const [basicDetails, setBasicDetails] = useState<boolean>(false);
  const [aboutMeDetails, setAboutMeDetails] = useState<boolean>(false);
  const [eudcationAndCareer, setEudcationAndCareer] = useState<boolean>(false);
  const [familyDetails, setFamilyDetails] = useState<boolean>(false);
  const [lifeStyleDetails, setLifeStyleDetails] = useState<boolean>(false);
  // const [images, setImages] = useState<IImageGallery[]>([
  //   { src: "./Images/landing_image_1.png", width: 400, height: 300 },
  //   { src: "/Images/landing_image_2.png", width: 600, height: 450 },
  //   { src: "/Images/landing_image_3.png", width: 800, height: 600 },
  //   { src: "./Images/landing_image_1.png", width: 400, height: 300 },
  //   { src: "/Images/landing_image_2.png", width: 600, height: 450 },
  //   { src: "/Images/landing_image_3.png", width: 800, height: 600 },
  //   { src: "./Images/landing_image_1.png", width: 400, height: 300 },
  //   { src: "/Images/landing_image_2.png", width: 600, height: 450 },
  //   { src: "/Images/landing_image_3.png", width: 800, height: 600 },
  // ]);
  // const [yourLikesDetails, setYourLikesDetails] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const myProfileObject = useSelector(selectmyProfileSuccess);
  const isMyprofileLoading = useSelector(selectmyProfileLoading);

  const step1Response = myProfileObject?.step1.jsonResponse;
  const step2Response = myProfileObject?.step2.jsonResponse;
  const step3Response = myProfileObject?.step3.jsonResponse;
  const step4Response = myProfileObject?.step4.jsonResponse;
  const step5Response = myProfileObject?.step5.jsonResponse;

  useEffect(() => {
    dispatch(myProfileReq({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader profilePicture={step1Response?.photo} />
          <p>
            Make your profile more intersting by adding cover photo to your
            profile.
          </p>
          <div className={classes.changeBackground}>
            Change Cover Photo
            <ImImage />
          </div>
        </Container>
        {isMyprofileLoading ? <Loader /> : <>
          <MyProfilePageCard step1Response={step1Response} />
          <Container className={classes.detailsWrapper}>
            <Row>
              <Col sm={9} md={8} className="p-0">
                {criticalDetails ? (
                  <EditCriticalDetials setCriticalDetails={setCriticalDetails} />
                ) : (
                  <CriticalDetials
                    step1Response={step1Response}
                    setCriticalDetails={setCriticalDetails}
                  />
                )}
                <hr />
                {basicDetails ? (
                  <EditBasicDetials setBasicDetails={setBasicDetails} />
                ) : (
                  <BasicDetails
                    step1Response={step1Response}
                    setBasicDetails={setBasicDetails}
                  />
                )}
                <hr />
                {aboutMeDetails ? (
                  <EditAboutMe setAboutMeDetails={setAboutMeDetails} />
                ) : (
                  <AboutMeDetails
                    step5Response={step5Response}
                    setAboutMeDetails={setAboutMeDetails}
                  />
                )}
                <hr />
                {eudcationAndCareer ? (
                  <EditEducationAmdCareer
                    setEudcationAndCareer={setEudcationAndCareer}
                  />
                ) : (
                  <EducationAndCareer
                    step2Response={step2Response}
                    setEudcationAndCareer={setEudcationAndCareer}
                  />
                )}
                <hr />
                {familyDetails ? (
                  <EditFamilyDetails setFamilyDetails={setFamilyDetails} />
                ) : (
                  <FamilydetailsInfo
                    step4Response={step4Response}
                    setFamilyDetails={setFamilyDetails}
                  />
                )}
                <hr />
                {lifeStyleDetails ? (
                  <EditLifeStyle setEditDetails={setLifeStyleDetails} />
                ) : (
                  <LifeStyleDetails
                    step3Response={step3Response}
                    setEditDetails={setLifeStyleDetails}
                  />
                )}
                <hr />
                {/* {yourLikesDetails ? (
                <EditYourLikes setEditDetails={setYourLikesDetails} />
              ) : (
                <LikeDetails setEditDetails={setYourLikesDetails} />
              )} */}
                <div className={classes.datecont}>
                  <p>Last updated on 15th Feb, 2023</p>
                </div>
              </Col>
              <Col sm={3} md={4} className="p-0">
                <MyProfileRightSec myProfileObject={myProfileObject} />
              </Col>
            </Row>
          </Container>
        </>}
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
