import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "./MyProfileCard.module.scss";
import { RiComputerFill } from "react-icons/ri";
import { AiFillFacebook } from "react-icons/ai";
import HalfCircleProgressBar from "./HalfCircleProgressBar";

interface Step1DataResponse {
  step1Response: any;
}

const MyProfilePageCard: React.FC<Step1DataResponse> = ({ step1Response }) => {

  return (
    <Container className={classes.cardWrapper}>
      <Row>
        <Col sm={3} md={4} lg={3} className="p-0 d-flex justify-content-end">
          <Image
            src={step1Response?.photo ? `${process.env.NEXT_PUBLIC_URL}/${step1Response?.photo}`: "https://hospital.vallhebron.com/sites/hospital/files/styles/curriculum/public/AVATAR-home.jpg?itok=7-n4HvCf"}
            alt="avatar"
          />
        </Col>
        <Col sm={5} md={8} lg={6} className={classes.cardInfo}>
          <div className={`${classes.MyProfileMiddle} `}>
            <div className={classes.MiddleLeft}>
              <p>Upload photo From</p>
              <div className={classes.MiddleIconSecMain}>
                <div className={classes.MiddleIconSec}>
                  <RiComputerFill />
                  Computer
                </div>
                <div className={classes.MiddleIconSec}>
                  <AiFillFacebook />
                  Facebook
                </div>
              </div>
              <p>you can set photo privacy</p>
              <p className={classes.PreviewAlbum}>Preview Album</p>
            </div>
            <div className={classes.MiddleLeft}>
              <p className={classes.AddDetailsHeading}>
                Add Details to your Profile
              </p>
              <p className={classes.AddDetailsSubHeading}>
                Upload Photo : +26%
              </p>
              <p className={classes.AddDetailsSubHeading}>
                Write about you & family : +22%
              </p>
              <p className={classes.AddDetailsSubHeading}>
                Add Family details : +12%
              </p>
              <p className={classes.AddDetailsSubHeading}>
                Add horoscope details : +7%
              </p>
            </div>
          </div>
        </Col>
        <Col sm={4} md={12} lg={3} className={classes.rightBox}>
          {/* <div className={classes.RightPrograss}>
            25%
        </div> */}
          <HalfCircleProgressBar profileComplete ={45} />
          <p className={classes.CompleteProfileHEd}>Complete your profile</p>
          <p>Last edited on 06th Mar, 2023 </p>
          <p>Profile view : 0 </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfilePageCard;
