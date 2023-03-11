import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import Form from "react-bootstrap/Form";
import RightSection from "./RightSection/RightSection";
import { DropdownGridSingleSelect } from "../../../components";
import {
  BloodGroup,
  Diet,
  OwnHouseCar,
  Pets,
  SmokeDrink,
  Thalassemia,
} from "../../../types/enums";
import { useFormik } from "formik";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
const LifeStyle: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  //To scroll on top whan submit butotn is clicked on  previous page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  //form state
  const formik = useFormik({
    initialValues: {
      diet: "",
      smoking: "",
      drinking: "",
      love_pets: "",
      own_house: "",
      own_car: "",
      blood_group: "",
      thalassemia: "",
      religious_belief: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      checkFunction();
    },
  });

  const checkFunction = () => {
    nextPage(3);
  };
  return (
    <div className={classes.profile_Container}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={5}>
            <h1>We would love to know about your Lifestyle.</h1>
            <small>mandatory</small>
            <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
              <div className=" text-start d-flex flex-column gap-4">
                {/* <h4 className="text-center">Lifestyle</h4> */}
                <DropdownGridSingleSelect
                  selectedDataFn={() => {}}
                  title="Diet"
                  data={Diet}
                  nameid="diet"
                />
                <DropdownGridSingleSelect
                  selectedDataFn={() => {}}
                  title="Smoking"
                  data={SmokeDrink}
                  nameid="smoking"
                />
                <DropdownGridSingleSelect
                  selectedDataFn={() => {}}
                  title="Drinking"
                  data={SmokeDrink}
                  nameid="drinking"
                />
                <DropdownGridSingleSelect
                  selectedDataFn={() => {}}
                  title="Love Pets"
                  data={Pets}
                  nameid="love_pets"
                />
                <DropdownGridSingleSelect
                  selectedDataFn={() => {}}
                  title="Owns House"
                  data={OwnHouseCar}
                  nameid="own_house"
                />
                <DropdownGridSingleSelect
                  selectedDataFn={() => {}}
                  title="Owns Car"
                  data={OwnHouseCar}
                  nameid="own_car"
                />
                <DropdownGridSingleSelect
                  selectedDataFn={() => {}}
                  title="Blood Group"
                  data={BloodGroup}
                  nameid="blood_group"
                />
                <DropdownGridSingleSelect
                  selectedDataFn={() => {}}
                  title="Thalassemia "
                  data={Thalassemia}
                  nameid="thalassemia"
                />
                <div className={classes.singleBox}>
                  <Form.Label>Religious Belief</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="religious_belief"
                    rows={3}
                    placeholder="Abotu Religious Belief"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <Button
                variant="danger"
                type="submit"
                className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
              >
                Add to my profile
              </Button>
            </Form>
          </Col>
          {/* <RightSection /> */}
        </Row>
      </Container>
    </div>
  );
};

export default LifeStyle;
