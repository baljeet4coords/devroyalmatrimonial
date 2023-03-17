import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import classes from "./Component.module.scss";
import { useFormik } from "formik";
import RightSection from "./RightSection/RightSection";
<<<<<<< HEAD

const ExpressYourself: React.FC = () => {
=======
import { useDispatch, useSelector } from "react-redux";
import { STEP_5 } from "../../../ducks/regiserUser/step5/constants";
import { selectStep5Success } from "../../../ducks/regiserUser/step5/selectors";
import { selectSignUpSuccess } from "../../../ducks/signUp/selectors";
import axios from "axios";
import { IRegisterStep5 } from "../../../types/register/userRegister";

const ExpressYourself: React.FC = () => {
  const dispatch = useDispatch();
  const stepOneDefaultValues = useSelector(selectStep5Success);
  const userId = useSelector(selectSignUpSuccess)?.output;
  const jsonData = stepOneDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  useEffect(() => {
    dispatch({
      type: STEP_5,
      payload: { actionType: "V", userId: userId },
    });
  }, []);
>>>>>>> bae73d8d983436ac8a8891803edfa618b3618596
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const formik = useFormik({
    initialValues: {
<<<<<<< HEAD
      aboutcareer: "",
      aboutfamily: "",
      abouteducation: "",
      basicintor: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
=======
      actionType: "",
      userId: userId,
      aboutCareer: jsonData?.about_career,
      aboutFamily: jsonData?.about_family,
      aboutEducation: jsonData?.about_education,
      basicIntro: jsonData?.basic_intro,
    },
    onSubmit: async (values: IRegisterStep5) => {
      let response;
      if (isReduxEmpty) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step5`,
          {
            actionType: "C",
            ...values,
          }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step5`,
          {
            actionType: "U",
            ...values,
          }
        );
      }
      response.data.output === 1 && console.log("route to next page");
>>>>>>> bae73d8d983436ac8a8891803edfa618b3618596
    },
  });

  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          <Row className="justify-content-center">
            <Col sm={12} md={5}>
              <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
              <small>mandatory</small>
              <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
                <div className={classes.singleBox}>
                  <Form.Label>About Career</Form.Label>
                  <Form.Control
                    as="textarea"
<<<<<<< HEAD
                    name="aboutcareer"
=======
                    name="aboutCareer"
>>>>>>> bae73d8d983436ac8a8891803edfa618b3618596
                    rows={3}
                    placeholder="About your career"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    defaultValue={jsonData?.about_career ?? ""}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>About Family</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="aboutFamily"
                    rows={3}
                    placeholder="About your family"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    defaultValue={jsonData?.about_family ?? ""}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>About Education</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="aboutEducation"
                    rows={3}
                    placeholder="About your education"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    defaultValue={jsonData?.about_education ?? ""}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Basic Intro</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="basicIntro"
                    rows={3}
                    placeholder="Intro yourself"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    defaultValue={jsonData?.basic_intro ?? ""}
                  />
                </div>
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
                  // onClick={() => nextPage(1)}
                >
                  Upadate
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

export default ExpressYourself;
