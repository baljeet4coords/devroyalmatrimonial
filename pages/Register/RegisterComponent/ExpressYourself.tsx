import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
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
      let response;
      if (isReduxEmpty) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step5`,
          {
            actionType: "c",
            ...values,
          }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step5`,
          {
            actionType: "u",
            ...values,
          }
        );
      }
      response.data.output > 0 && router.push("/DesiredProfile");
    },
  });

  const [selectedBirthCountry, setSelectedBirthCountry] = useState<number>(100);
  const [selectedBirthState, setSelectedBirthState] = useState<number>(0);
  const [selectedBirthCity, setSelectedBirthCity] = useState<number>(0);

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
    selectedBirthCity,
    selectedBirthCountry,
    selectedBirthState,
    aboutCareer,
    aboutEducation,
    aboutFamily,
    basicIntro,
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
  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          {isLoading ? (
            <Loader />
          ) : (
            <Row className="justify-content-center">
              <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
              <Col sm={12} md={5}>
                <Form
                  className={classes.formEdit}
                  onSubmit={formik.handleSubmit}
                >
                  <div className={classes.singleBoxBlock}>
                    <Form.Label>About Career</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="aboutCareer"
                      rows={3}
                      placeholder="About your career"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setAboutCareer(e.target.value)}
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
                    <Form.Control
                      as="textarea"
                      name="aboutFamily"
                      rows={3}
                      placeholder="About your family"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setAboutFamily(e.target.value)}
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
                    <Form.Control
                      as="textarea"
                      name="aboutEducation"
                      rows={3}
                      placeholder="About your education"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setAboutEducation(e.target.value)}
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
                    <Form.Control
                      as="textarea"
                      name="basicIntro"
                      rows={3}
                      placeholder="Intro yourself"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setBasicIntro(e.target.value)}
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
                    className={`${classes.Form_btn} mt-2 w-50`}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
              <RightSection profileComplete={profileComplete}/>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default ExpressYourself;
