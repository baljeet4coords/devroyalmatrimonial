import { Container, Row, Col, Image, Alert, Modal } from "react-bootstrap";
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
import { getUserId, selectAuthSuccess } from "../../ducks/auth/selectors";
import {
  selectmyProfileLoading,
  selectmyProfileSuccess,
} from "../../ducks/myProfile/selectors";
import Loader from "../../components/Loader/Loader";
import { ImageGallery } from "../../components";
import axios from "axios";
import { isNull } from "lodash";
import ProtectedRouting from "../../HOCs/ProtectedRouting";

interface ImageResponse {
  coverImage?: string[];
}

const MyProfile: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [criticalDetails, setCriticalDetails] = useState<boolean>(false);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [basicDetails, setBasicDetails] = useState<boolean>(false);
  const [aboutMeDetails, setAboutMeDetails] = useState<boolean>(false);
  const [eudcationAndCareer, setEudcationAndCareer] = useState<boolean>(false);
  const [familyDetails, setFamilyDetails] = useState<boolean>(false);
  const [lifeStyleDetails, setLifeStyleDetails] = useState<boolean>(false);
  // const [yourLikesDetails, setYourLikesDetails] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [imageResponse, setImageResponse] = useState<ImageResponse>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const myProfileObject = useSelector(selectmyProfileSuccess);
  const AuthSuccess = useSelector(selectAuthSuccess);

  const isMyprofileLoading = useSelector(selectmyProfileLoading);

  const step1Response = myProfileObject?.step1.jsonResponse;
  const step2Response = myProfileObject?.step2.jsonResponse;
  const step3Response = myProfileObject?.step3.jsonResponse;
  const step4Response = myProfileObject?.step4.jsonResponse;
  const step5Response = myProfileObject?.step5.jsonResponse;
  const profileCompliteScore = myProfileObject?.profileCompletionScore?.overallScore;
  // console.log(profileCompliteScore,"profileCompliteScore");



  useEffect(() => {
    dispatch(myProfileReq({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);

  const FatchAgain = () => {
    setTimeout(() =>
      dispatch(myProfileReq({ actionType: "v", userId: userId })), 200
    )
  }


  useEffect(() => {
    async function uploadFiles() {
      const formData = new FormData();
      formData.append("userId", String(userId));
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("image", file);
        });
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_URL}/userImage/setCoverImage`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setUploadStatus("Files uploaded successfully");
          const getImages = async () => {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_URL}/userImage/getUserImages`,
              { userId: userId }
            );
            if (response.data.jsonResponse) {
              setImageResponse(response.data.jsonResponse);
            }
          };
          getImages();
        } catch (error) {
          setUploadStatus("Error uploading files");
        }
        setTimeout(() => {
          setUploadStatus("");
        }, 2000);
      }
    }
    uploadFiles();
  }, [selectedFiles, userId]);

  useEffect(() => {
    const getImages = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/userImage/getUserImages`,
        { userId: userId }
      );
      if (response.data.jsonResponse) {
        setImageResponse(response.data.jsonResponse);
      }
    };
    getImages();
  }, [userId]);

  const onPreviewAlbum = () => {
    setShowGallery(!showGallery);
    // if (galleryRef.current === null) {
    //   window.innerWidth <= 667
    //     ? window.scrollTo(0, 1000)
    //     : window.scrollTo(0, 700);
    // }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      setSelectedFiles(fileList);
    }
  };

  const modalClose = () => {
    setShowGallery(!showGallery);
  }

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <LoginHeader />
        <Container
          fluid
          className={classes.background_header}
          style={
            imageResponse?.coverImage
              ? {
                background: `url(${process.env.NEXT_PUBLIC_URL}/${imageResponse?.coverImage}) no-repeat center`,
              }
              : {
                background: `url(./Images/cover-image-register.jpg) no-repeat center center`,
              }
          }
        >
          {!imageResponse?.coverImage && (
            <p className="text-white">
              Make your profile more intersting by adding cover photo to your
              profile.
            </p>
          )}
          <div className={classes.changeBackground} onClick={handleButtonClick}>
            Change Cover Photo
            <ImImage />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          {uploadStatus && (
            <Alert variant="success text-center">{uploadStatus}</Alert>
          )}
        </Container>
        {isMyprofileLoading ? (
          <Container className={classes.detailsWrapper}>
            <Loader />
          </Container>
        ) : (
          <>
            <MyProfilePageCard
              step1Response={step1Response}
              onPreviewAlbum={onPreviewAlbum}
              AuthSuccess={AuthSuccess?.jsonResponse}
              profileCompliteScore={profileCompliteScore}
            />
            <Container className={classes.detailsWrapper}>
              <Row>
                <>
                  <Col sm={9} md={8} className="p-0">
                    {/* {criticalDetails ? (
                        <EditCriticalDetials
                          step1Response={step1Response}
                          setCriticalDetails={setCriticalDetails}
                        />
                      ) : (
                        <CriticalDetials
                          step1Response={step1Response}
                          setCriticalDetails={setCriticalDetails}
                        />
                      )} */}
                    <hr />
                    {basicDetails ? (
                      <EditBasicDetials
                        step1Response={step1Response}
                        setBasicDetails={setBasicDetails}
                        FatchAgain={FatchAgain}
                      />
                    ) : (
                      <BasicDetails
                        step1Response={step1Response}
                        setBasicDetails={setBasicDetails}
                      />
                    )}
                    <hr />
                    {aboutMeDetails ? (
                      <EditAboutMe
                        step5Response={step5Response}
                        setAboutMeDetails={setAboutMeDetails}
                        FatchAgain={FatchAgain}
                      />
                    ) : (
                      <AboutMeDetails
                        step5Response={step5Response}
                        setAboutMeDetails={setAboutMeDetails}
                        EditHide={false}
                      />
                    )}
                    <hr />
                    {eudcationAndCareer ? (
                      <EditEducationAmdCareer
                        step2Response={step2Response}
                        setEudcationAndCareer={setEudcationAndCareer}
                        FatchAgain={FatchAgain}
                      />
                    ) : (
                      <EducationAndCareer
                        step2Response={step2Response}
                        setEudcationAndCareer={setEudcationAndCareer}
                        EditHide={false}

                      />
                    )}
                    <hr />
                    {familyDetails ? (
                      <EditFamilyDetails
                        step4Response={step4Response}
                        setFamilyDetails={setFamilyDetails}
                        FatchAgain={FatchAgain}
                      />
                    ) : (
                      <FamilydetailsInfo
                        step4Response={step4Response}
                        setFamilyDetails={setFamilyDetails}
                        EditHide={false}

                      />
                    )}
                    <hr />
                    {lifeStyleDetails ? (
                      <EditLifeStyle
                        step3Response={step3Response}
                        setEditDetails={setLifeStyleDetails}
                        FatchAgain={FatchAgain}
                      />
                    ) : (
                      <LifeStyleDetails
                        step3Response={step3Response}
                        setEditDetails={setLifeStyleDetails}
                        EditHide={false}
                      />
                    )}
                    <hr />
                    <div className={classes.datecont}>
                      {/* <p>Last updated on 15th Feb, 2023</p> */}
                    </div>
                  </Col>
                  <Col sm={3} md={4} className="p-0">
                    <MyProfileRightSec myProfileObject={myProfileObject} />
                  </Col>
                </>
              </Row>
            </Container>
          </>
        )}
      </div>
      {showGallery && (
        <Modal show={showGallery} size="lg" centered scrollable >
          <Modal.Header closeButton onHide={modalClose}>
            <Modal.Title className={classes.galleryModel_title}>
              Your Photos
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ImageGallery EditHide={false} />
          </Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ProtectedRouting(MyProfile);
