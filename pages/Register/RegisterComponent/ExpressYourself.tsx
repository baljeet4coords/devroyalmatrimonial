import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import classes from "./Component.module.scss";
import { useFormik } from "formik";

import RightSection from "./RightSection/RightSection";
import { useState } from "react";
import { city } from "../../../constants/DesiredData";

const ExpressYourself: React.FC = () => {
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
      boutcareer: "",
      aboutfamily: "",
      abouteducation: "",
      basicintor: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
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
                    name="boutcareer"
                    rows={3}
                    placeholder="Abotu your career"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>About Family</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="aboutfamily"
                    rows={3}
                    placeholder="Abotu your family"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>About Education</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="abouteducation"
                    rows={3}
                    placeholder="Abotu your education"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Basic Intro</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="basicintor"
                    rows={3}
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
                  Upadate
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

export default ExpressYourself;
