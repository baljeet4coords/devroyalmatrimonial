import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { DropdownGridSingleSelect } from "../../../components";
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
import {
  selectStep2Loading,
  selectStep2Success,
} from "../../../ducks/regiserUser/step2/selectors";
import axios from "axios";
import CountrySingle from "../../../components/InputField/CountryStateSingle/CountrySingle";
import StateSingle from "../../../components/InputField/CountryStateSingle/StateSingle";
import CitySingle from "../../../components/InputField/CountryStateSingle/CitySingle";
import Loader from "../../../components/Loader/Loader";
import { selectProfileCompletion } from "../../../ducks/profileCompletion/selector";
import { updateProfileCompleteness } from "../../../ducks/profileCompletion/actions";
import * as Yup from "yup";
import { useStep2Register } from "../../../hooks/useRegister/useStep2";


interface ProfileDetailsProps {
  nextPage: (a: number) => void;
  DisabledHeadingMessage?: (a: number) => void;
  profileComplete: number;
}
interface Data {
  id?: string;
  val: string;
}

const CareerDetails: React.FC<ProfileDetailsProps> = ({
  nextPage,
  profileComplete,
  DisabledHeadingMessage,
}) => {
  const dispatch = useDispatch();
  const stepTwoDefaultValues = useSelector(selectStep2Success);
  const jsonData = stepTwoDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);
  // const [profileComplete, setProfileComplete] = useState<number>(0);

  const { registerUserMutation, Step2Query } = useStep2Register();

  const isLoading = useSelector(selectStep2Loading);

  useEffect(() => {
    dispatch(step2({ actionType: "v", userId: userId }));
  }, [dispatch, isReduxEmpty, userId]);

  const [selectedCountry, setSelectedCountry] = useState<number>(
    jsonData?.country || 100
  );
  const [selectedState, setSelectedState] = useState<number>(
    jsonData?.state || -1
  );
  const [selectedCity, setSelectedCity] = useState<number>(
    jsonData?.city || -1
  );
  const [residentialStatus, setResidentialStatus] = useState<Data>({
    id: String(jsonData?.residentialstatus),
    val: "",
  });
  const [settleAboard, setSettleAbroad] = useState<Data>({
    id: String(jsonData?.readytosettleabroad),
    val: "",
  });
  const [education, setEducation] = useState<Data>({
    id: String(jsonData?.education),
    val: "",
  });
  const [occupation, setOccupation] = useState<Data>({
    id: String(jsonData?.occupation),
    val: "",
  });
  const [annualIncome, setannualIncome] = useState<Data>({
    id: String(jsonData?.annual_income),
    val: "",
  });

  const [countryTouched, setCountryTouched] = useState(false);
  const [countryTouchedDefault, setcountryTouchedDefault] = useState(true);
  const [stateTouched, setStateTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [residentialStatusTouched, setResidentialStatusTouched] =
    useState(false);
  const [readyToSettleAbroadTouched, setReadyToSettleAbroadTouched] =
    useState(false);
  const [educationTouched, setEducationTouched] = useState(false);
  const [occupationTouched, setOccupationTouched] = useState(false);
  const [annualIncomeTouched, setAnnualIncomeTouched] = useState(false);

  const [loginSpiner, setloginSpiner] = useState(false);
  const [nextDisable, setNextDisable] = useState<boolean>(true);




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
    validationSchema: Yup.object({
      college: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setloginSpiner(true);

      const mutationResult = await registerUserMutation.mutateAsync({ ...values, actionType: isReduxEmpty ? "c" : "u" });
      if (mutationResult?.output && mutationResult?.output > 0) {
        nextPage(2);
        setloginSpiner(false);
      } else {
        setloginSpiner(false);
      }

    },
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setSelectedCountry(
      jsonData?.country != undefined ? jsonData?.country : selectedCountry
    );
    setSelectedState(
      jsonData?.state != undefined ? jsonData?.state : selectedState
    );
    setSelectedCity(
      jsonData?.city != undefined ? jsonData?.city : selectedCity
    );
  }, [jsonData?.country, jsonData?.state, jsonData?.city]);

  useEffect(() => {
    formik.values.country = selectedCountry;
    formik.values.state = selectedState;
    formik.values.city = selectedCity;
    formik.values.residentialStatus = residentialStatus.id || "";
    formik.values.readyToSettleAbroad = settleAboard.id || "";
    formik.values.education = education.id || "";
    formik.values.occupation = occupation.id || "";
    formik.values.annualIncome = annualIncome.id || "";

    if (
      selectedCountry != null &&
      selectedState >= 0 &&
      selectedCity >= 0 &&
      residentialStatus.id != "null" &&
      settleAboard.id != "null" &&
      education.id != "null" &&
      occupation.id != "null" &&
      annualIncome.id !== "null"
    ) {
      setNextDisable(false);
    }
  }, [
    annualIncome.id,
    education.id,
    formik.values,
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
  const getSelectedState = (id: number) => {
    setSelectedState(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedCity(id);
  };



  // this is commented bcz when update college it not update there formik value
  //  as formik value change then again update the jsonData?.College in formik value 
  
  // useEffect(() => {
  //   if (jsonData && jsonData.College) {
  //     formik.values.college = jsonData.College;
  //   }
  // }, [jsonData, formik.values]);

  return (
    <div className={classes.profile_Container}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <Row className="justify-content-center">
            <h1>Great! You are about to complete your profile.</h1>
            <Col sm={12} md={5}>
              <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
                <div>
                  <CountrySingle
                    title="Country"
                    setSelectedCountry={getSelectedCountry}
                    defaultValueCountry={jsonData?.country}
                    setErrorState={setCountryTouched}
                    setErrorStateDefault={setcountryTouchedDefault}
                  />
                  {countryTouched && countryTouchedDefault ? (
                    <div>
                      <span className={classes.errorMessage}>
                        Please select value from dropdown
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <StateSingle
                    title="State"
                    setSelectedState={getSelectedState}
                    defaultValueCountry={selectedCountry}
                    defaultValueState={jsonData?.state}
                    setErrorState={setStateTouched}
                  />
                  {stateTouched && selectedState < 0 ? (
                    <div>
                      <span className={classes.errorMessage}>
                        Please select value from dropdown
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <CitySingle
                    title="City"
                    defaultValueCountry={selectedCountry}
                    defaultValueState={selectedState}
                    defaultValueCity={jsonData?.city}
                    setSelectedCity={getSelectedCity}
                    setErrorState={setCityTouched}
                  />
                  {cityTouched && selectedCity < 0 ? (
                    <div>
                      <span className={classes.errorMessage}>
                        Please select value from dropdown
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <DropdownGridSingleSelect
                    selectedDataFn={setResidentialStatus}
                    title="Residential Status"
                    data={ResidentialStatus}
                    nameid="residentialStatus"
                    defaultValue={String(jsonData?.residentialstatus)}
                    setErrorState={setResidentialStatusTouched}
                  />
                  {residentialStatusTouched &&
                    residentialStatus.id == "null" ? (
                    <div>
                      <span className={classes.errorMessage}>
                        Please select value from dropdown
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <DropdownGridSingleSelect
                    selectedDataFn={setSettleAbroad}
                    title="Ready to settle abroad"
                    data={ReadyToSettleAbroad}
                    nameid="readyToSettleAbroad"
                    defaultValue={String(jsonData?.readytosettleabroad)}
                    setErrorState={setReadyToSettleAbroadTouched}
                  />
                  {readyToSettleAbroadTouched && settleAboard.id == "null" ? (
                    <div>
                      <span className={classes.errorMessage}>
                        Please select value from dropdown
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <DropdownGridSingleSelect
                    selectedDataFn={setEducation}
                    title="Highest Degree"
                    data={EducationTypeAndVal}
                    nameid="education"
                    defaultValue={String(jsonData?.education)}
                    setErrorState={setEducationTouched}
                  />
                  {educationTouched && education.id == "null" ? (
                    <div>
                      <span className={classes.errorMessage}>
                        Please select value from dropdown
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className={classes.singleBox}>
                    <Form.Label>College Name</Form.Label>
                    <div className={classes.inputBox}>
                      <li className={classes.blankInput}>
                        <Form.Control
                          type="text"
                          name="college"
                          className={classes.inputplacholder}
                          placeholder={"Enter College Name"}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          defaultValue={jsonData?.College}
                        />
                      </li>
                    </div>
                  </div>
                  {formik.touched.college && formik.errors.college ? (
                    <div>
                      <span className={classes.errorMessage}>
                        {formik.errors.college}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <DropdownGridSingleSelect
                    selectedDataFn={setOccupation}
                    title="Employed In"
                    data={Occupation}
                    nameid="occupation"
                    defaultValue={String(jsonData?.occupation)}
                    setErrorState={setOccupationTouched}
                  />
                  {occupationTouched && occupation.id == "null" ? (
                    <div>
                      <span className={classes.errorMessage}>
                        Please select value from dropdown
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <DropdownGridSingleSelect
                    selectedDataFn={setannualIncome}
                    title="Annual Income"
                    data={AnnualIncomeProfile}
                    nameid="annualIncome"
                    defaultValue={String(jsonData?.annual_income)}
                    setErrorState={setAnnualIncomeTouched}
                  />
                  {annualIncomeTouched && annualIncome.id == "null" ? (
                    <div>
                      <span className={classes.errorMessage}>
                        Please select value from dropdown
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <hr />
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 align-self-md-center`}
                  disabled={nextDisable}
                >
                  {loginSpiner && (
                    <Spinner
                      className={classes.loginSpiner}
                      animation="border"
                      variant="light"
                    />
                  )}
                  Next
                </Button>
              </Form>
            </Col>
            <RightSection profileComplete={profileComplete} />
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CareerDetails;
