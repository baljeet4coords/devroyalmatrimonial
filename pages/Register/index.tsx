import { Col, Container, Row } from "react-bootstrap";
import RegisterHeader from "./RegisterComponent/RegisterHeader/RegisterHeader";
import { Footer } from "../../components";
import React, { useEffect, useState } from "react";
import classes from "./RegisterDetails.module.scss";
import CareerDetails from "./RegisterComponent/CareerDetails";
import ExpressYourself from "./RegisterComponent/ExpressYourself";
import FamilyDetails from "./RegisterComponent/FamilyDetails";
import LifeStyle from "./RegisterComponent/LifeStyle";
import ProfileDetails from "./RegisterComponent/ProfileDetails";
import { useSelector } from "react-redux";
import router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// import storage from "redux-persist/es/storage";
import { logoutRequest } from "../../ducks/auth/actions";
import storage from "redux-persist/es/storage";
import { TbPlayerTrackPrev } from "react-icons/tb";
import { selectProfileCompletion } from "../../ducks/profileCompletion/selector";
import { selectAuthSuccess } from "../../ducks/auth/selectors";
import { updateProfileCompleteness } from "../../ducks/profileCompletion/actions";
interface ProfileDetailsProps {
  chooseMessage: (a: number) => void;
}
const topHeading = [
  "Profile Details",
  "Career Details",
  "Lifestyle",
  "Family",
  "Express Yourself",
];

const RegisterDetails: React.FC<ProfileDetailsProps> = () => {
  const router = useRouter();
  const profileComplete = useSelector(selectProfileCompletion);
  const { page } = router.query;
  const [active, setActive] = useState<number>(0);
  const dispatch = useDispatch();
  const authSuccess = useSelector(selectAuthSuccess);
  const pageNo = authSuccess?.jsonResponse?.user_status;
  console.log(profileComplete, pageNo);
  
  useEffect(() => {
    if (pageNo === "R") {
      updateProfileCompleteness(0);
    }
    if (pageNo === "1") {
      updateProfileCompleteness(20);
    }
    if (pageNo === "2") {
      updateProfileCompleteness(40);
    }
    if (pageNo === "3") {
      updateProfileCompleteness(60);
    }
    if (pageNo === "4") {
      updateProfileCompleteness(80);
    }
    if (pageNo === "P") {
      updateProfileCompleteness(100);
    }
  }, [pageNo]);

  const chooseMessage = (message: number) => {
    setActive(message);
  };
  const Components = [
    <ProfileDetails
      key={0}
      nextPage={chooseMessage}
      profileComplete={profileComplete}
    />,
    <CareerDetails
      key={1}
      nextPage={chooseMessage}
      profileComplete={profileComplete}
    />,
    <LifeStyle
      key={2}
      nextPage={chooseMessage}
      profileComplete={profileComplete}
    />,
    <FamilyDetails
      key={3}
      nextPage={chooseMessage}
      profileComplete={profileComplete}
    />,
    <ExpressYourself
      key={4}
      nextPage={chooseMessage}
      profileComplete={profileComplete}
    />,
  ];
  const onLogout = () => {
    router.push("/");
    dispatch(logoutRequest());
  };

  useEffect(() => {
    if (page === "registeration") {
      setActive(0);
    }
  }, [page]);
  return (
    <React.Fragment>
      <Container fluid className={classes.background_header}>
        <RegisterHeader onLogout={onLogout} />
        <Row className={classes.register_header_Links}>
          {active > 0 && (
            <button
              className={classes.prevButton}
              onClick={() => chooseMessage(active - 1)}
            >
              <TbPlayerTrackPrev />
            </button>
          )}
          {topHeading.map((heading, index) => {
            return (
              <Col
                key={index}
                className={`${active === index ? classes.active : " "} ${
                  classes.topButtons
                }`}
                onClick={() => chooseMessage(index)}
              >
                {heading}
              </Col>
            );
          })}
        </Row>
      </Container>
      {Components.map((component, index) => {
        if (index === active) {
          return component;
        } else {
          return null;
        }
      })}

      <Footer />
    </React.Fragment>
  );
};

export default RegisterDetails;
