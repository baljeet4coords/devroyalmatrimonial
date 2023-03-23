import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../ducks/auth/selectors";
import { selectStep3Success } from "../../../ducks/regiserUser/step3/selectors";
import { step3 } from "../../../ducks/regiserUser/step3/actions";
import axios from "axios";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
const LifeStyle: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  const dispatch = useDispatch();
  const stepThreeDefaultValues = useSelector(selectStep3Success);
  const jsonData = stepThreeDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);

  //Render page go on the top of the page after completed the previeous step
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    dispatch(step3({ actionType: "v", userId: userId }));
  }, [dispatch, isReduxEmpty, userId]);

  const [diet, setDiet] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.diet), val: "" });

  const [smoking, setSmoking] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.smoking), val: "" });

  const [drinking, setDrinking] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.drinking), val: "" });

  const [lovePets, setLovePets] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.love_pets), val: "" });

  const [ownsHouse, setOwnsHouse] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Owns_house), val: "" });

  const [ownsCar, setOwnsCar] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Owns_car), val: "" });

  const [bloodGroup, setBloodGroup] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.blood_group), val: "" });

  const [thalassemia, setThalassemia] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Thalassemia), val: "" });

  const formik = useFormik({
    initialValues: {
      userId: userId,
      diet: String(jsonData?.diet),
      smoking: String(jsonData?.smoking),
      drinking: String(jsonData?.drinking),
      lovePets: String(jsonData?.love_pets),
      ownsHouse: String(jsonData?.Owns_house),
      ownsCar: String(jsonData?.Owns_car),
      bloodGroup: String(jsonData?.blood_group),
      thalassemia: String(jsonData?.Thalassemia),
      religiousBelief: String(jsonData?.religious_belief),
    },
    onSubmit: async (values) => {
      let response;
      if (isReduxEmpty === undefined) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step3`,
          { actionType: "c", ...values }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step3`,
          { actionType: "u", ...values }
        );
      }
      response.data.output > 0 && nextPage(3);
    },
  });

  useEffect(() => {
    formik.values.diet = diet.id;
    formik.values.smoking = smoking.id;
    formik.values.drinking = drinking.id;
    formik.values.lovePets = lovePets.id;
    formik.values.ownsHouse = ownsCar.id;
    formik.values.ownsCar = ownsCar.id;
    formik.values.bloodGroup = bloodGroup.id;
    formik.values.thalassemia = thalassemia.id;
  }, [
    bloodGroup?.id,
    diet?.id,
    drinking?.id,
    formik.values,
    lovePets?.id,
    ownsCar?.id,
    smoking?.id,
    thalassemia?.id,
  ]);

  return (
    <div className={classes.profile_Container}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={5}>
            <h1>We would love to know about your Lifestyle.</h1>
            <small>mandatory</small>
            <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
              <div className=" text-start d-flex flex-column gap-4">
                <DropdownGridSingleSelect
                  selectedDataFn={setDiet}
                  title="Diet"
                  data={Diet}
                  nameid="diet"
                  defaultValue={jsonData?.diet}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSmoking}
                  title="Smoking"
                  data={SmokeDrink}
                  nameid="smoking"
                  defaultValue={jsonData?.smoking}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setDrinking}
                  title="Drinking"
                  data={SmokeDrink}
                  nameid="drinking"
                  defaultValue={jsonData?.drinking}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setLovePets}
                  title="Love Pets"
                  data={Pets}
                  nameid="lovePets"
                  defaultValue={jsonData?.love_pets}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setOwnsHouse}
                  title="Owns House"
                  data={OwnHouseCar}
                  nameid="ownsHouse"
                  defaultValue={jsonData?.Owns_house}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setOwnsCar}
                  title="Owns Car"
                  data={OwnHouseCar}
                  nameid="ownsCar"
                  defaultValue={jsonData?.Owns_car}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setBloodGroup}
                  title="Blood Group"
                  data={BloodGroup}
                  nameid="bloodGroup"
                  defaultValue={jsonData?.blood_group}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setThalassemia}
                  title="Thalassemia "
                  data={Thalassemia}
                  nameid="thalassemia"
                  defaultValue={jsonData?.Thalassemia}
                />
                <div className={classes.singleBox}>
                  <Form.Label>Religious Belief</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="religiousBelief"
                    rows={3}
                    placeholder="About Religious Belief"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    defaultValue={jsonData?.religious_belief}
                  />
                </div>
              </div>
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

export default LifeStyle;
