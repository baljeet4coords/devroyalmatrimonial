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

interface ExpressYourselfProps {
  nextPage: (a: number) => void;
}

const ExpressYourself: React.FC<ExpressYourselfProps> = ({ nextPage }) => {
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

  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          {isLoading ? (
            <Loader />
          ) : (
            <Row className="justify-content-center">
              <Col sm={12} md={5}>
                <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
                <small>mandatory</small>
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
                      onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
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
                  <Button
                    variant="danger"
                    type="submit"
                    className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
              <RightSection />
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default ExpressYourself;
