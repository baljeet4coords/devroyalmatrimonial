import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import Form from "react-bootstrap/Form";
import RightSection from "./RightSection/RightSection";
import { DropdownGridSingleSelect } from "../../../components";
import {
  BrotherSister,
  Diet,
  FamilStatus,
  FamilyIncomem,
  FamilyNativeCity,
  FamilyNativeCountry,
  FamilyNativeState,
  FamilyType,
  LivingWithParrents,
} from "../../../types/enums";
import { useFormik } from "formik";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
const FamilyDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  //To scroll on top whan submit butotn is clicked on  previous page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Form staet
  const formik = useFormik({
    initialValues: {
      father: "",
      mother: "",
      sister: "",
      brother: "",
      gothra: "",
      family_status: "",
      family_income: "",
      family_type: "",
      family_native_country: "",
      family_native_state: "",
      family_native_city: "",
      living_with_parents: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      checkFunction();
    },
  });

  const checkFunction = () => {
    nextPage(4);
  };

  return (
    <div className={classes.profile_Container}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={5}>
            <h1>We would love to know about your family.</h1>
            <small>mandatory</small>
            <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
              <div className=" text-start d-flex flex-column gap-4">
                {/* <h4 className="text-center">Lifestyle</h4> */}
                <DropdownGridSingleSelect
                  title="Father"
                  data={Diet}
                  nameid="father"
                />
                <DropdownGridSingleSelect
                  title="Mother"
                  data={Diet}
                  nameid="mother"
                />
                <DropdownGridSingleSelect
                  title="Sister"
                  data={BrotherSister}
                  nameid="sister"
                />
                <DropdownGridSingleSelect
                  title="Brother"
                  data={BrotherSister}
                  nameid="brother"
                />
                <div className={classes.singleBox}>
                  <Form.Label>Gothra</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="gothra"
                    rows={3}
                    placeholder="Abotu Religious Belief"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <DropdownGridSingleSelect
                  title="Family Status "
                  data={FamilStatus}
                  nameid="family_status"
                />
                <DropdownGridSingleSelect
                  title="Family Income"
                  data={FamilyIncomem}
                  nameid="family_income"
                />
                <DropdownGridSingleSelect
                  title="Family Type"
                  data={FamilyType}
                  nameid="family_type"
                />
                <DropdownGridSingleSelect
                  title="Family Native Country"
                  data={FamilyNativeCountry}
                  nameid="family_native_country"
                />
                <DropdownGridSingleSelect
                  title="Family Native State"
                  data={FamilyNativeState}
                  nameid="family_native_state"
                />
                <DropdownGridSingleSelect
                  title="Family Native City"
                  data={FamilyNativeCity}
                  nameid="family_native_city"
                />
                <DropdownGridSingleSelect
                  title="Living With Parents"
                  data={LivingWithParrents}
                  nameid="living_with_parents"
                />
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

export default FamilyDetails;
