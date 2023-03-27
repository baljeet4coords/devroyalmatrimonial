import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import classes from "./Component.module.scss";
import Form from "react-bootstrap/Form";
import RightSection from "./RightSection/RightSection";
import {
  CountryStateCitlyList,
  DropdownGridSingleSelect,
} from "../../../components";
import {
  BortherSisterCount,
  FamilStatus,
  FamilyIncome,
  FamilyType,
  FathersProfession,
  LivingWithParrents,
  MothersProfession,
} from "../../../types/enums";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectStep4Success } from "../../../ducks/regiserUser/step4/selectors";
import { IRegisterStep4 } from "../../../types/register/userRegister";
import axios from "axios";
import { getUserId } from "../../../ducks/auth/selectors";
import { step4 } from "../../../ducks/regiserUser/step4/actions";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
interface Data {
  id?: string;
  val: string;
}
const FamilyDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  const dispatch = useDispatch();
  const stepFourDefaultValues = useSelector(selectStep4Success);
  const jsonData = stepFourDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);

  useEffect(() => {
    dispatch(step4({ actionType: "v", userId: userId }));
  }, [dispatch, isReduxEmpty, userId]);

  // when Render page go on the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const [selectedFathersOccupation, setSelectedFathersOccupation] =
    useState<Data>({ id: String(jsonData?.Father), val: "" });
  const [selectedMothersOccupation, setSelectedMothersOccupation] =
    useState<Data>({ id: String(jsonData?.Mother), val: "" });
  const [selectedSister, setSelectedSister] = useState<Data>({
    id: String(jsonData?.Sister),
    val: "",
  });
  const [selectedBrother, setSelectedBrother] = useState<Data>({
    id: String(jsonData?.Brother),
    val: "",
  });
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<Data>({
    id: String(jsonData?.Family_Status),
    val: "",
  });
  const [selectedFamilyIncome, setSelectedFamilyIncome] = useState<Data>({
    id: String(jsonData?.Family_Income),
    val: "",
  });
  const [selectedFamilyType, setSelectedFamilyType] = useState<Data>({
    id: String(jsonData?.Family_Type),
    val: "",
  });
  const [selectedNativeCountry, setSelectedNativeCountry] = useState<number>(
    jsonData?.family_native_country || 0
  );
  const [selectedNativeState, setSelectedNativeState] = useState<number>(
    jsonData?.family_native_state || 0
  );
  const [selectedNativeCity, setSelectedNativeCity] = useState<number>(
    jsonData?.family_native_city || 0
  );
  const [selectedLivingWithParents, setSelectedLivingWithParents] =
    useState<Data>({ id: String(jsonData?.living_with_parents), val: "" });
  console.log(selectedNativeState);

  const formik = useFormik({
    initialValues: {
      userId: userId,
      mothersProfession: String(jsonData?.Mother),
      fathersProfession: String(jsonData?.Father),
      sister: String(jsonData?.Sister),
      brother: String(jsonData?.Brother),
      gothra: jsonData?.Gothra,
      familyStatus: String(jsonData?.Family_Status),
      familyIncome: String(jsonData?.Family_Income),
      familyType: String(jsonData?.Family_Type),
      familyNativeCountry: String(jsonData?.family_native_country),
      familyNativeState: String(jsonData?.family_native_state),
      familyNativeCity: String(jsonData?.family_native_city),
      livingWithParents: String(jsonData?.living_with_parents),
    },
    onSubmit: async (values: IRegisterStep4) => {
      let response;
      if (isReduxEmpty) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step4`,
          {
            actionType: "c",
            ...values,
          }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step4`,
          {
            actionType: "u",
            ...values,
          }
        );
      }
      response.data.output > 0 && nextPage(4);
    },
  });

  const getSelectedCountry = (id: number) => {
    setSelectedNativeCountry(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedNativeState(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedNativeCity(id);
  };

  useEffect(() => {
    formik.values.mothersProfession = selectedMothersOccupation.id;
    formik.values.fathersProfession = selectedFathersOccupation.id;
    formik.values.sister = selectedSister.id;
    formik.values.brother = selectedBrother.id;
    formik.values.familyStatus = selectedFamilyStatus.id;
    formik.values.familyIncome = selectedFamilyIncome.id;
    formik.values.familyType = selectedFamilyType.id;
    formik.values.familyNativeCountry = String(selectedNativeCountry);
    formik.values.familyNativeState = String(selectedNativeState);
    formik.values.familyNativeCity = String(selectedNativeCity);
    formik.values.livingWithParents = String(selectedLivingWithParents.id);
  }, [
    formik.values,
    selectedBrother.id,
    selectedFamilyIncome.id,
    selectedFamilyStatus.id,
    selectedFamilyType.id,
    selectedFathersOccupation.id,
    selectedLivingWithParents.id,
    selectedMothersOccupation.id,
    selectedNativeCity,
    selectedNativeCountry,
    selectedNativeState,
    selectedSister.id,
    jsonData,
  ]);

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
                  defaultValue={String(jsonData?.Father)}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedMothersOccupation}
                  title="Mother's Occupation"
                  data={MothersProfession}
                  nameid="mothersProfession"
                  defaultValue={String(jsonData?.Mother)}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedSister}
                  title="Sister"
                  data={BortherSisterCount}
                  nameid="sister"
                  defaultValue={String(jsonData?.Sister)}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedBrother}
                  title="Brother"
                  data={BortherSisterCount}
                  nameid="brother"
                  defaultValue={String(jsonData?.Brother)}
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
                    defaultValue={
                      jsonData?.Gothra ? String(jsonData?.Gothra) : ""
                    }
                  />
                </div>
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedFamilyStatus}
                  title="Family Status "
                  data={FamilStatus}
                  nameid="familyStatus"
                  defaultValue={String(jsonData?.Family_Status)}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedFamilyIncome}
                  title="Family Income"
                  data={FamilyIncome}
                  nameid="familyIncome"
                  defaultValue={String(jsonData?.Family_Income)}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedFamilyType}
                  title="Family Type"
                  data={FamilyType}
                  nameid="familyType"
                  defaultValue={String(jsonData?.Family_Type)}
                />
                <CountryStateCitlyList
                  title="Family Native"
                  setSelectedCountry={getSelectedCountry}
                  setSelectedState={getSelectedState}
                  setSelectedCity={getSelectedCity}
                  defaultValueCountry={jsonData?.family_native_city}
                  defaultValueState={jsonData?.family_native_state}
                  defaultValueCity={jsonData?.family_native_city}
                />
                <DropdownGridSingleSelect
                  selectedDataFn={setSelectedLivingWithParents}
                  title="Living With Parents"
                  data={LivingWithParrents}
                  nameid="livingWithParents"
                  defaultValue={String(jsonData?.living_with_parents)}
                />
              </div>
              <Button
                variant="danger"
                type="submit"
                className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
              >
                Next
              </Button>
              <Button
                variant="danger"
                onClick={() => nextPage(2)}
                className={`${classes.Form_btnPrev} mt-2 w-50 mx-auto`}
              >
                Previous
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
