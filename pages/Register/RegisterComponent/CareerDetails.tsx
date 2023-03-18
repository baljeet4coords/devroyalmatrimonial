import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  CountryStateCitlyList,
  DropdownGridSingleSelect,
} from "../../../components";
import classes from "./Component.module.scss";
import { Form } from "react-bootstrap";
import RightSection from "./RightSection/RightSection";
import {
  AnnualIncomeProfile,
  EducationTypeAndVal,
  Occupation,
  ReadyToSettleAbroad,
  ResidentialStatus,
} from "../../../types/enums";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../ducks/auth/selectors";
import { step2 } from "../../../ducks/regiserUser/step2/actions";
import { selectStep2Success } from "../../../ducks/regiserUser/step2/selectors";
import axios from "axios";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}

const CareerDetails: React.FC<ProfileDetailsProps> = ({ nextPage }: any) => {
  const dispatch = useDispatch();
  const stepTwoDefaultValues = useSelector(selectStep2Success);
  const jsonData = stepTwoDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);
  useEffect(() => {
    dispatch(step2({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const [selectedState, setSelectedState] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [residentialStatus, setResidentialStatus] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.residentialstatus), val: "" });
  const [settleAboard, setSettleAbroad] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.readytosettleabroad), val: "" });
  const [education, setEducation] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.education), val: "" });
  const [occupation, setOccupation] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.occupation), val: "" });
  const [annualIncome, setannualIncome] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.annual_income), val: "" });

  const formik = useFormik({
    initialValues: {
      userId: userId,
      country: jsonData?.country,
      state: jsonData?.state,
      city: jsonData?.city,
      residentialStatus: String(jsonData?.residentialstatus),
      readyToSettleAbroad: String(jsonData?.readytosettleabroad),
      education: String(jsonData?.education),
      college: jsonData?.College,
      occupation: String(jsonData?.occupation),
      annualIncome: String(jsonData?.annual_income),
    },
    onSubmit: async (values) => {
      let response;
      if (isReduxEmpty === undefined) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step2`,
          { ...values, actionType: "c" }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step2`,
          { ...values, actionType: "u" }
        );
      }
      response.data.output === 1 && nextPage(2);
    },
  });

  useEffect(() => {
    formik.values.country = selectedCountry;
    formik.values.state = selectedState;
    formik.values.city = selectedCity;
    formik.values.residentialStatus = residentialStatus.id;
    formik.values.readyToSettleAbroad = settleAboard.id;
    formik.values.education = education.id;
    // formik.values.college = jsonData?.College;
    formik.values.occupation = occupation.id;
    formik.values.annualIncome = annualIncome.id;
  }, [
    annualIncome.id,
    education.id,
    formik.values,
    jsonData?.College,
    occupation.id,
    residentialStatus.id,
    selectedCity,
    selectedCountry,
    selectedState,
    settleAboard.id,
  ]);

  const getSelectedCountry = (id: number) => {
    setSelectedCountry(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedState(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedCity(id);
  };

  return (
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
                defaultValueCountry={jsonData?.country}
                defaultValueState={jsonData?.state}
                defaultValueCity={jsonData?.city}
              />
              <DropdownGridSingleSelect
                selectedDataFn={setResidentialStatus}
                title="Residential Status"
                data={ResidentialStatus}
                nameid="residentialStatus"
                defaultValue={jsonData?.residentialstatus}
              />
              <DropdownGridSingleSelect
                selectedDataFn={setSettleAbroad}
                title="Ready to settle abroad"
                data={ReadyToSettleAbroad}
                nameid="readyToSettleAbroad"
                defaultValue={jsonData?.readytosettleabroad}
              />
              <DropdownGridSingleSelect
                selectedDataFn={setEducation}
                title="Highest Degree"
                data={EducationTypeAndVal}
                nameid="education"
                defaultValue={jsonData?.education}
              />
              <div className={classes.singleBox}>
                <Form.Label>College Name</Form.Label>
                <Form.Control
                  as="textarea"
                  name="college"
                  rows={3}
                  placeholder={jsonData?.College}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <DropdownGridSingleSelect
                selectedDataFn={setOccupation}
                title="Employed In"
                data={Occupation}
                nameid="occupation"
                defaultValue={jsonData?.occupation}
              />
              <DropdownGridSingleSelect
                selectedDataFn={setannualIncome}
                title="Annual Income"
                data={AnnualIncomeProfile}
                nameid="annualIncome"
                defaultValue={jsonData?.annual_income}
              />
              <hr />
              <h5 className="text-center p-3">
                Here is your chance to make your profile stand out!
              </h5>
              <Button
                variant="danger"
                type="submit"
                className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
              >
                Next
              </Button>
            </Form>
          </Col>
          <RightSection />
        </Row>
      </Container>
    </div>
  );
};

export default CareerDetails;
