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
import { selectAuthSuccess } from "../../ducks/auth/selectors";
import router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// import storage from "redux-persist/es/storage";
import { logoutRequest } from "../../ducks/auth/actions";
import storage from "redux-persist/es/storage";
import { TbPlayerTrackPrev } from "react-icons/tb";
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
  const { page } = router.query;
  const [active, setActive] = useState<number>(0);
  const dispatch = useDispatch();

  const chooseMessage = (message: number) => {
    setActive(message);
  };
  const Components = [
    <ProfileDetails key={0} nextPage={chooseMessage} />,
    <CareerDetails key={1} nextPage={chooseMessage} />,
    <LifeStyle key={2} nextPage={chooseMessage} />,
    <FamilyDetails key={3} nextPage={chooseMessage} />,
    <ExpressYourself key={4} nextPage={chooseMessage} />,
  ];
  const onLogout = () => {
    dispatch(logoutRequest());
    router.push("/");
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
