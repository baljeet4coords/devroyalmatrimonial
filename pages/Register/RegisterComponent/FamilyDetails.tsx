import React, { useEffect, useState } from "react";
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
  FamilyIncome,
  FamilyNativeCity,
  FamilyNativeCountry,
  FamilyNativeState,
  FamilyType,
  FathersProfession,
  LivingWithParrents,
  MothersProfession,
} from "../../../types/enums";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectSignUpSuccess } from "../../../ducks/signUp/selectors";
import { STEP_4 } from "../../../ducks/regiserUser/step4/constants";
import { selectStep4Success } from "../../../ducks/regiserUser/step4/selectors";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
const FamilyDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  const dispatch = useDispatch();
  const stepOneDefaultValues = useSelector(selectStep4Success);
  const userId = useSelector(selectSignUpSuccess)?.output;
  const jsonData = stepOneDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  useEffect(() => {
    dispatch({
      type: STEP_4,
      payload: { actionType: "V", userId: userId },
    });
  }, []);
  const [selectedFathersOccupation, setSelectedFathersOccupation] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Father), val: "" });
  const [selectedMothersOccupation, setSelectedMothersOccupation] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Mother), val: "" });
  const [selectedSelectedSister, setSelectedSister] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Sister), val: "" });
  const [selectedSelectedBrother, setSelectedBrother] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Brother), val: "" });
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Family_Status), val: "" });
  const [selectedFamilyIncome, setSelectedFamilyIncome] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Family_Income), val: "" });
  const [selectedFamilyType, setSelectedFamilyType] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.Family_Type), val: "" });
  const [selectedNativeState, setSelectedNativeState] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.family_native_state), val: "" });
  const [selectedNativeCity, setSelectedNativeCity] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.family_native_city), val: "" });
  const [selectedNativeCountry, setSelectedNativeCountry] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.family_native_country), val: "" });
  const [selectedLivingWithParents, setSelectedLivingWithParents] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.living_with_parents), val: "" });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      fathersProfession: jsonData?.Father,
      mothersProfession: jsonData?.Mother,
      sister: jsonData?.Sister,
      brother: jsonData?.Brother,
      gothra: jsonData?.Gothra,
      familyStatus: jsonData?.Family_Status,
      familyIncome: jsonData?.Family_Income,
      familyType: jsonData?.Family_Type,
      familyNativeCountry: jsonData?.family_native_country,
      familyNativeState: jsonData?.family_native_state,
      familyNativeCity: jsonData?.family_native_city,
      livingWithParents: jsonData?.living_with_parents,
    },
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
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedFathersOccupation}
                  title="Father's Occupation"
                  data={FathersProfession}
                  nameid="fathersProfession"
                  defaultValue={jsonData?.Father}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedMothersOccupation}
                  title="Mother's Occupation"
                  data={MothersProfession}
                  nameid="mothersProfession"
                  defaultValue={jsonData?.Mother}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedSister}
                  title="Sister"
                  data={BrotherSister}
                  nameid="sister"
                  defaultValue={jsonData?.Sister}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedBrother}
                  title="Brother"
                  data={BrotherSister}
                  nameid="brother"
                  defaultValue={jsonData?.Brother}
                />
                <div className={classes.singleBox}>
                  <Form.Label>Gothra</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="gothra"
                    rows={3}
                    placeholder="About Gothra"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedFamilyStatus}
                  title="Family Status "
                  data={FamilStatus}
                  nameid="familyStatus"
                  defaultValue={jsonData?.Family_Status}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedFamilyIncome}
                  title="Family Income"
                  data={FamilyIncome}
                  nameid="familyIncome"
                  defaultValue={jsonData?.Family_Income}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedFamilyType}
                  title="Family Type"
                  data={FamilyType}
                  nameid="familyType"
                  defaultValue={jsonData?.Family_Type}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedNativeCountry}
                  title="Family Native Country"
                  data={FamilyNativeCountry}
                  nameid="familyNativeCountry"
                  defaultValue={jsonData?.family_native_country}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedNativeState}
                  title="Family Native State"
                  data={FamilyNativeState}
                  nameid="familyNativeState"
                  defaultValue={jsonData?.family_native_state}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedNativeCity}
                  title="Family Native City"
                  data={FamilyNativeCity}
                  nameid="familyNativeCity"
                  defaultValue={jsonData?.family_native_city}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedLivingWithParents}
                  title="Living With Parents"
                  data={LivingWithParrents}
                  nameid="livingWithParents"
                  defaultValue={jsonData?.living_with_parents}
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
          <RightSection />
        </Row>
      </Container>
    </div>
  );
};

export default FamilyDetails;
