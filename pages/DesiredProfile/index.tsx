import { Container, Row, Col } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import { Footer } from "../../components";
import React, { useState, useRef, useEffect } from "react";
import classes from "./DesiredProfile.module.scss";
import {
  MaritalStatusList,
  CountryList,
  ResidentialList,
  AgeFromYearList,
  AgeToYearList,
  HeightFromList,
  HeightToList,
  ReligionList,
  MotherTongueArr,
  ManglikList,
  HighestEducationList,
  SmokeDrinkWith,
  OccupationData,
} from "../../constants/DesiredData";
import { FaEdit } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import Form from "react-bootstrap/Form";
import CustomButton from "../../components/Button/CustomButton";
import SingleInput from "../../components/InputField/SingleInputField";
import DoubleInput from "../../components/InputField/DoubleInputField";
type paramsStatus = {
  val: string;
  idd: number;
  selectedInputQuery: string;
};
type acticeStateType = {
  type: string;
  visible: boolean;
};
const DesiredProfilePage: React.FC = () => {
  const containerRef = useRef(null);
  const [activeList, setActiveList] = useState<acticeStateType>({
    type: "",
    visible: false,
  });

  const handleClickOutside = () => {
    if (containerRef.current) {
      setActiveList({ type: "", visible: true });
      console.log(activeList);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <React.Fragment>
      <Container fluid className={classes.background_header} ref={containerRef}>
        <LoginHeader />
      </Container>
      <div className={classes.DesiredWrapper}>
        <Container className={classes.innerWrapper}>
          <Row>
            <h1>Desired Partner Profile</h1>
            <p>
              The criteria you mention here determines the ‘Desired Partner
              Matches’ you see. So please review this information carefully.
              Moreover, Filters determine whose Interests/Calls you want to
              receive.
            </p>
            <div className={classes.dark_box}>
              No. of Mutual Matches with below criteria - 80
            </div>
            <div className={classes.checkBox}>
              {" "}
              <Form.Check aria-label="option 1" />I also want to receive matches
              based on the history of my interests and acceptances
              <small>
                These matches may not fully fulfil your Desired Partner
                Preference.
              </small>
            </div>
            <div className={classes.editInfo}>
              <span>Basic details</span>
              <span>
                <FaEdit /> Edit
              </span>
            </div>
            <Col
              sm={12}
              className={`${classes.form_wrapper} d-flex justify-content-center`}
            >
              <form className={classes.formEdit}>

                <DoubleInput postArray={AgeFromYearList} inputName={"Age"} />

                <DoubleInput postArray={HeightFromList} inputName={"Height"} />


                <SingleInput postArray={MaritalStatusList} inputName={"Marital Status"} />

                <SingleInput postArray={CountryList} inputName={"Country"} />

                <SingleInput postArray={ResidentialList} inputName={"Residential Status"} />

                <CustomButton onClick={() => console.log("tab")}>
                  Save
                </CustomButton>
              </form>
            </Col>
            <hr />
            <div className={classes.editInfo}>
              <span>Religion & Ethnicity</span>
              <span>
                <FaEdit /> Edit
              </span>
            </div>
            <Col
              sm={12}
              className={`${classes.form_wrapper} d-flex justify-content-center`}
            >
              <form className={classes.formEdit}>

                <SingleInput postArray={ReligionList} inputName={"Religion"} />

                <SingleInput postArray={MotherTongueArr} inputName={"Mother Tongue"} />

                <SingleInput postArray={ManglikList} inputName={"Manglik"} />

                <CustomButton onClick={() => console.log("tab")}>
                  Save
                </CustomButton>
              </form>
            </Col>
            <hr />
            <div className={classes.editInfo}>
              <span>Education & Work</span>
              <span>
                <FaEdit /> Edit
              </span>
            </div>
            <Col
              sm={12}
              className={`${classes.form_wrapper} d-flex justify-content-center`}
            >
              <form className={classes.formEdit}>

                <SingleInput postArray={HighestEducationList} inputName={"Education"} />

                <SingleInput postArray={OccupationData} inputName={"Occupation"} />

                <DoubleInput postArray={AgeFromYearList} inputName={"Income"} />


                <CustomButton onClick={() => console.log("tab")}>
                  Save
                </CustomButton>
              </form>
            </Col>
            <hr />
            <div className={classes.editInfo}>
              <span>Lifestyle</span>
              <span>
                <FaEdit /> Edit
              </span>
            </div>
            <Col
              sm={12}
              className={`${classes.form_wrapper} d-flex justify-content-center`}
            >
              <form className={classes.formEdit}>

                <SingleInput postArray={ReligionList} inputName={"Dietary habits"} />

                <SingleInput postArray={MotherTongueArr} inputName={"Dietary habits"} />

                <SingleInput postArray={ManglikList} inputName={"Smoking habits"} />

                <SingleInput postArray={ManglikList} inputName={"Challenged"} />

                <CustomButton onClick={() => console.log("tab")}>
                  Save
                </CustomButton>
              </form>
            </Col>
            {/* <hr /> */}
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DesiredProfilePage;
