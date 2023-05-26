import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import classes from "./Component.module.scss";
import { useFormik } from "formik";
import RightSection from "./RightSection/RightSection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStep5Loading,
  selectStep5Success,
} from "../../../ducks/regiserUser/step5/selectors";
import { getUserId } from "../../../ducks/auth/selectors";
import axios from "axios";
import router from "next/router";
import { step5 } from "../../../ducks/regiserUser/step5/actions";
import { textAreaSchema } from "../../../schemas/textAreaSchema";
import { Errors } from "../../../components/";
import Loader from "../../../components/Loader/Loader";
import StateSingle from "../../../components/InputField/CountryStateSingle/StateSingle";
import CitySingle from "../../../components/InputField/CountryStateSingle/CitySingle";
import CountrySingle from "../../../components/InputField/CountryStateSingle/CountrySingle";
import { useStep5Register } from "../../../hooks/useRegister/useStep5";

interface ExpressYourselfProps {
  nextPage: (a: number) => void;
  profileComplete: number;
}

const ExpressYourself: React.FC<ExpressYourselfProps> = ({
  nextPage,
  profileComplete,
}) => {
  const dispatch = useDispatch();
  const stepFiveDefaultValues = useSelector(selectStep5Success);
  const isLoading = useSelector(selectStep5Loading);
  const jsonData = stepFiveDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);

  useEffect(() => {
    dispatch(step5({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);

  const [skiploadingSpiner, setSkiploadingSpiner] = useState<boolean>(false);
  const [loadingSpiner, setloadingSpiner] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [nextDisable, setNextDisable] = useState<boolean>(true);
  const { mutate: registerUser, data, isLoading: step5loadingReq } = useStep5Register();

  // when Render page go on the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      userId: userId,
      aboutCareer: jsonData?.about_career,
      aboutFamily: jsonData?.about_family,
      aboutEducation: jsonData?.about_education,
      basicIntro: jsonData?.basic_intro,
      birthCountry: jsonData?.pobCountry,
      birthState: jsonData?.pobState,
      birthCity: jsonData?.pobCity,
    },
    validationSchema: textAreaSchema,
    onSubmit: async (values) => {
      setloadingSpiner(true);

      registerUser({ ...values, actionType: isReduxEmpty ? "c" : "u" });
      const resolvedData = await data;

      resolvedData.output > 0 && router.push("/DesiredProfile");
    },
  });

  const [selectedBirthCountry, setSelectedBirthCountry] = useState<number>(
    jsonData?.pobCountry || 100
  );
  const [selectedBirthState, setSelectedBirthState] = useState<number>(
    jsonData?.pobState || -1
  );
  const [selectedBirthCity, setSelectedBirthCity] = useState<number>(
    jsonData?.pobCity || -1
  );

  const [aboutCareer, setAboutCareer] = useState<string>(
    jsonData && jsonData.about_career ? jsonData.about_career : ""
  );
  const [aboutFamily, setAboutFamily] = useState<string>(
    jsonData && jsonData.about_family ? jsonData.about_family : ""
  );
  const [aboutEducation, setAboutEducation] = useState<string>(
    jsonData && jsonData.about_education ? jsonData.about_education : ""
  );
  const [basicIntro, setBasicIntro] = useState<string>(
    jsonData && jsonData.basic_intro ? jsonData.basic_intro : ""
  );

  useEffect(() => {
    setAboutCareer(
      jsonData && jsonData.about_career ? jsonData.about_career : ""
    );
    setAboutFamily(
      jsonData && jsonData.about_family ? jsonData.about_family : ""
    );
    setAboutEducation(
      jsonData && jsonData.about_education ? jsonData.about_education : ""
    );
    setBasicIntro(jsonData && jsonData.basic_intro ? jsonData.basic_intro : "");
  }, [
    jsonData,
    jsonData?.about_career,
    jsonData?.about_family,
    jsonData?.about_education,
    jsonData?.basic_intro,
  ]);

  useEffect(() => {
    formik.values.birthCountry = selectedBirthCountry;
    formik.values.birthState = selectedBirthState;
    formik.values.birthCity = selectedBirthCity;
    formik.values.aboutCareer = aboutCareer;
    formik.values.aboutFamily = aboutFamily;
    formik.values.aboutEducation = aboutEducation;
    formik.values.basicIntro = basicIntro;
  }, [
    formik.values,
    formik.errors.aboutCareer,
    formik.errors.basicIntro,
    formik.errors.aboutEducation,
    formik.errors.aboutFamily,
    selectedBirthCountry,
    selectedBirthState,
    selectedBirthCity,
    aboutCareer,
    aboutFamily,
    aboutEducation,
    basicIntro,
  ]);

  useEffect(() => {
    if (mounted) {
      if (
        formik.errors.aboutCareer ||
        formik.errors.aboutEducation ||
        formik.errors.basicIntro ||
        formik.errors.aboutFamily
      ) {
        setError(true);
        setNextDisable(true)
      } else {
        setError(false);
        setNextDisable(false)
      }
    } else {
      setMounted(true);
    }
  }, [
    formik.errors.aboutCareer,
    formik.errors.aboutEducation,
    formik.errors.aboutFamily,
    formik.errors.basicIntro,
    mounted,
  ]);

  const getSelectedCountry = (id: number) => {
    setSelectedBirthCountry(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedBirthState(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedBirthCity(id);
  };
  useEffect(() => {
    setSelectedBirthCountry(
      jsonData?.pobCountry != undefined
        ? jsonData?.pobCountry
        : selectedBirthCountry
    );
    setSelectedBirthState(
      jsonData?.pobState != undefined ? jsonData?.pobState : selectedBirthState
    );
    setSelectedBirthCity(
      jsonData?.pobCity != undefined ? jsonData?.pobCity : selectedBirthCity
    );
  }, [jsonData?.pobCity, jsonData?.pobCountry, jsonData?.pobState]);

  function handleSkip() {
    setSkiploadingSpiner(true);
    router.push("/DesiredProfile");
  }

  const charCounter = (char: string) => 1000 - char.length;
  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          {isLoading ? (
            <Loader />
          ) : (
            <Row className="justify-content-center">
              <Button
                variant="link"
                className={`${classes.Form_btn} ${classes.Skip_Btn} mt-2 mb-4 align-self-md-end`}
                onClick={handleSkip}
              >
                {skiploadingSpiner && (
                  <Spinner
                    className={classes.loginSpiner}
                    animation="border"
                    variant="danger"
                  />
                )}
                skip to Partner Profile
              </Button>
              <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
              <div className={classes.infoSection}>
                <div className={classes.infoMain}>
                  <p>Note :</p>
                  <ul>
                    <li>
                      Each text area is limited to a maximum of 1000 characters.{" "}
                    </li>
                    <li>
                      Special characters are not allowed. Please use only
                      alphabets, numbers, spaces, commas, and periods.
                    </li>
                  </ul>
                </div>
              </div>
              <Col sm={12} md={5}>
                <Form
                  className={classes.formEdit}
                  onSubmit={formik.handleSubmit}
                >
                  <div className={classes.singleBoxBlock}>
                    <Form.Label>About Career</Form.Label>
                    <div className="text-muted">
                      <small>
                        {charCounter(aboutCareer)}/1000 characters left
                      </small>
                    </div>
                    <Form.Control
                      as="textarea"
                      name="aboutCareer"
                      rows={3}
                      placeholder="About your career"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setAboutCareer(e.target.value)}
                      maxLength={1000}
                      defaultValue={
                        jsonData?.about_career != null
                          ? String(jsonData?.about_career)
                          : ""
                      }
                    />
                    {formik.touched.aboutCareer && formik.errors.aboutCareer ? (
                      <div className="pt-1">
                        <Errors error={formik.errors.aboutCareer} />
                      </div>
                    ) : null}
                  </div>
                  <div className={classes.singleBoxBlock}>
                    <Form.Label>About Family</Form.Label>
                    <div className="text-muted">
                      <small>
                        {charCounter(aboutFamily)}/1000 characters left
                      </small>
                    </div>
                    <Form.Control
                      as="textarea"
                      name="aboutFamily"
                      rows={3}
                      placeholder="About your family"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setAboutFamily(e.target.value)}
                      maxLength={1000}
                      defaultValue={
                        jsonData?.about_family != null
                          ? String(jsonData?.about_family)
                          : ""
                      }
                    />
                    {formik.touched.aboutFamily && formik.errors.aboutFamily ? (
                      <div className="pt-1">
                        <Errors error={formik.errors.aboutFamily} />
                      </div>
                    ) : null}
                  </div>
                  <div className={classes.singleBoxBlock}>
                    <Form.Label>About Education</Form.Label>
                    <div className="text-muted">
                      <small>
                        {charCounter(aboutEducation)}/1000 characters left
                      </small>
                    </div>
                    <Form.Control
                      as="textarea"
                      name="aboutEducation"
                      rows={3}
                      placeholder="About your education"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setAboutEducation(e.target.value)}
                      maxLength={1000}
                      defaultValue={
                        jsonData?.about_education != null
                          ? String(jsonData?.about_education)
                          : ""
                      }
                    />
                    {formik.touched.aboutEducation &&
                      formik.errors.aboutEducation ? (
                      <div className="pt-1">
                        <Errors error={formik.errors.aboutEducation} />
                      </div>
                    ) : null}
                  </div>
                  <div className={classes.singleBoxBlock}>
                    <Form.Label>Basic Intro</Form.Label>
                    <div className="text-muted">
                      <small>
                        {charCounter(basicIntro)}/1000 characters left
                      </small>
                    </div>
                    <Form.Control
                      as="textarea"
                      name="basicIntro"
                      rows={3}
                      placeholder="Intro yourself"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setBasicIntro(e.target.value)}
                      maxLength={1000}
                      defaultValue={
                        jsonData?.basic_intro != null
                          ? String(jsonData?.basic_intro)
                          : ""
                      }
                    />
                    {formik.touched.basicIntro && formik.errors.basicIntro ? (
                      <div className="pt-1">
                        <Errors error={formik.errors.basicIntro} />
                      </div>
                    ) : null}
                  </div>
                  <span>
                    <hr />
                    <h5 className="text-center p-3">Select your birth place</h5>
                  </span>
                  <CountrySingle
                    title="Birth Country"
                    setSelectedCountry={getSelectedCountry}
                    defaultValueCountry={jsonData?.pobCountry}
                  />
                  <StateSingle
                    title="Birth State"
                    setSelectedState={getSelectedState}
                    defaultValueCountry={selectedBirthCountry}
                    defaultValueState={jsonData?.pobState}
                  />
                  <CitySingle
                    title="Birth City"
                    defaultValueCountry={selectedBirthCountry}
                    defaultValueState={selectedBirthState}
                    defaultValueCity={jsonData?.pobCity}
                    setSelectedCity={getSelectedCity}
                  />
                  <Button
                    variant="danger"
                    type="submit"
                    className={`${classes.Form_btn} mt-2 w-50 align-self-md-center`}
                    // disabled={nextDisable}
                    disabled={nextDisable}
                  >
                    {loadingSpiner && (
                      <Spinner
                        className={classes.loginSpiner}
                        animation="border"
                        variant="light"
                      />
                    )}
                    Next
                  </Button>
                  {error && (
                    <p className="text-muted">
                      <Errors error="Please solve above raised issues first before proceeding" />
                    </p>
                  )}
                </Form>
              </Col>
              <RightSection profileComplete={profileComplete} />
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default ExpressYourself;
