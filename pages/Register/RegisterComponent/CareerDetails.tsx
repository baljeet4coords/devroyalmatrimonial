import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CustomButton, DropdownGridSingleSelect } from "../../../components";
import classes from "./Component.module.scss";
import { FloatingLabel, Form } from "react-bootstrap";
import RightSection from "./RightSection/RightSection";
import {
  CountryList,
  Employed_In,
  HighestEducationList,
} from "../../../constants/DesiredData";
import { ReadyToSettleAbroad, ResidentialStatus } from "../../../types/enums";
import { useFormik } from "formik";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}

const CareerDetails: React.FC<ProfileDetailsProps> = ({ nextPage }: any) => {
  //To scroll on top whan submit butotn is clicked on  previous page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      country: "",
      state: "",
      city: "",
      residential_status: "",
      abroad_settle: "",
      higest_degree: "",
      employed_in: "",
      annual_income: "",
      express_yourself: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      checkFunction();
    },
  });

  const checkFunction = () => {
    nextPage(2);
  };
  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          <Row className="justify-content-center">
            <Col sm={12} md={5}>
              <h1>Great! You are about to complete your profile.</h1>
              <small>mandatory</small>
              <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
                <div className={`form-group ${classes.inputCover}`}>
                  <DropdownGridSingleSelect
                    selectedDataFn={() => {}}
                    title="Country"
                    data={CountryList}
                    nameid="country"
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Staet</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={`form-group ${classes.inputCover}`}>
                  <DropdownGridSingleSelect
                    selectedDataFn={() => {}}
                    title="Residential Status"
                    data={ResidentialStatus}
                    nameid="residential_status"
                  />
                </div>
                <div className={`form-group ${classes.inputCover}`}>
                  <DropdownGridSingleSelect
                    selectedDataFn={() => {}}
                    title="Ready to settle abroad"
                    data={ReadyToSettleAbroad}
                    nameid="abroad_settle"
                  />
                </div>
                <div className={`form-group ${classes.inputCover}`}>
                  <DropdownGridSingleSelect
                    selectedDataFn={() => {}}
                    title="Highest Degree"
                    data={HighestEducationList}
                    nameid="higest_degree"
                  />
                </div>
                <div className={`form-group ${classes.inputCover}`}>
                  <DropdownGridSingleSelect
                    selectedDataFn={() => {}}
                    title="Employed In"
                    data={Employed_In}
                    nameid="employed_in"
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Control
                    type="text"
                    name="annual_income"
                    placeholder="Annual Income"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <hr />
                <h5 className="text-center p-3">
                  Here is your chance to make your profile stand out!
                </h5>
                <div className={classes.singleBox}>
                  <Form.Label>Express Yourself!</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="express_yourself"
                    rows={5}
                    placeholder="Intro yourself"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
                  // onClick={() => nextPage(1)}
                >
                  Complete Registration
                </Button>
              </Form>
            </Col>
            {/* <RightSection /> */}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CareerDetails;
