import { Container, Row, Col, Image, Button } from "react-bootstrap";
import classes from "./MyProfileCard.module.scss";
import HalfCircleProgressBar from "./HalfCircleProgressBar";
import { useState } from "react";
import { PackageType } from "../../types/enums";
import CustomButton from "../Button/CustomButton";

interface Step1DataResponse {
  step1Response: any;
  AuthSuccess: any;
  onPreviewAlbum: (visible: boolean) => void;
}

const MyProfilePageCard: React.FC<Step1DataResponse> = ({
  step1Response,
  onPreviewAlbum,
  AuthSuccess,
}) => {
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const showGalleryClickHandler = () => {
    setShowGallery(!showGallery);
    onPreviewAlbum(!showGallery);
  };

  function getKeyByValue(value: string, enumObject: any) {
    for (const [key, val] of Object.entries(enumObject)) {
      if (val === value) {
        return key.replaceAll("_", " ");
      }
    }
  }

  return (
    <Container className={classes.cardWrapper}>
      <Row className={classes.mobileRow}>
        <Col sm={3} md={4} lg={3} className={`${classes.Profile_section} p-0 d-flex justify-content-end`}>
          <Image
            src={
              step1Response?.photo
                ? `${process.env.NEXT_PUBLIC_URL}/${step1Response?.photo}`
                : "https://hospital.vallhebron.com/sites/hospital/files/styles/curriculum/public/AVATAR-home.jpg?itok=7-n4HvCf"
            }
            className={classes.mobileAvatar}
            alt="avatar"
          />
        </Col>
        <Col sm={5} md={8} lg={6} className={classes.cardInfo}>
          <div className={`${classes.MyProfileMiddle} `}>
            <div className={classes.MiddleLeft}>
              <div>
                <p className={classes.MiddleLeftHeading}>
                  Name : <span>{step1Response?.fullname || "NA"} </span>{" "}
                </p>
                <p className={classes.MiddleLeftHeading}>
                  RM ID : <span>{AuthSuccess?.user_RM_ID || "NA"} </span>{" "}
                </p>
                <p className={classes.MiddleLeftHeading}>
                  Mobile No : <span>{step1Response?.mobile || "NA"} </span>{" "}
                </p>
                <p className={`${classes.MiddleLeftHeading}`}>
                  Email Id : <span className="text-lowercase">{step1Response?.emailid || "NA"} </span>{" "}
                </p>
              </div>

              <CustomButton onClick={showGalleryClickHandler}>
                {!showGallery ? "Preview Album" : "Back to profile"}
              </CustomButton>
            </div>
          </div>
        </Col>
        <Col sm={4} md={12} lg={3} className={classes.rightBox}>
          {/* <div className={classes.RightPrograss}>
            25%
        </div> */}
          <HalfCircleProgressBar profileComplete={100} />
          <p className={classes.CompleteProfileHEd}>
            Profile Completion Status
          </p>
          {/* <p>Last edited on 06th Mar, 2023 </p> */}
          <p>Profile view : 0 </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfilePageCard;
