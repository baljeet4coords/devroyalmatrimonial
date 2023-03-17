import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  CountryStateCitlyList,
  CustomButton,
  DropdownGridSingleSelect,
} from "../../../components";
import classes from "./Component.module.scss";
import { Form } from "react-bootstrap";
import RightSection from "./RightSection/RightSection";
import {
  CountryList,
  Employed_In,
  HighestEducationList,
} from "../../../constants/DesiredData";
import { EducationTypeAndVal, ReadyToSettleAbroad, ResidentialStatus } from "../../../types/enums";
import { useFormik } from "formik";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}

const CareerDetails: React.FC<ProfileDetailsProps> = ({ nextPage }: any) => {
  const [selectedNativeCountry, setSelectedNativeCountry] = useState<number>(0);
  const [selectedNativeState, setSelectedNativeState] = useState<number>(0);
  const [selectedNativeCity, setSelectedNativeCity] = useState<number>(0);
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
  const getSelectedCountry = (id: number) => {
    setSelectedNativeCountry(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedNativeState(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedNativeCity(id);
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
                <CountryStateCitlyList
                  title=""
                  setSelectedCountry={getSelectedCountry}
                  setSelectedState={getSelectedState}
                  setSelectedCity={getSelectedCity}
                  defaultValueCountry={0}
                  defaultValueState={0}
                  defaultValueCity={0}
                />
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
                    data={EducationTypeAndVal}
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
                  <Form.Label>Annual Income</Form.Label>
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
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
                  // onClick={() => nextPage(1)}
                >
                  Next
                </Button>
              </Form>
            </Col>
            <RightSection />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CareerDetails;
