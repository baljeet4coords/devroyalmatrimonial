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
import {
  selectStep4Loading,
  selectStep4Success,
} from "../../../ducks/regiserUser/step4/selectors";
import { IRegisterStep4 } from "../../../types/register/userRegister";
import axios from "axios";
import { getUserId } from "../../../ducks/auth/selectors";
import { step4 } from "../../../ducks/regiserUser/step4/actions";
import CountrySingle from "../../../components/InputField/CountryStateSingle/CountrySingle";
import CitySingle from "../../../components/InputField/CountryStateSingle/CitySingle";
import StateSingle from "../../../components/InputField/CountryStateSingle/StateSingle";
import Loader from "../../../components/Loader/Loader";

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
  const isLoading = useSelector(selectStep4Loading);
  const jsonData = stepFourDefaultValues?.jsonResponse;

  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);
  const [profileComplete, setProfileComplete] = useState<number>(0);
  
  // const [loading, isloading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(step4({ actionType: "v", userId: userId }));
   !isReduxEmpty && setProfileComplete(80)
  }, [dispatch, userId, isReduxEmpty]);

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
    jsonData?.family_native_country || 100
  );
  const [selectedNativeState, setSelectedNativeState] = useState<number>(
    jsonData?.family_native_state || -1
  );
  const [selectedNativeCity, setSelectedNativeCity] = useState<number>(
    jsonData?.family_native_city || -1
  );
  const [selectedLivingWithParents, setSelectedLivingWithParents] =
    useState<Data>({ id: String(jsonData?.living_with_parents), val: "" });
  const [gothraVal, setGothraVal] = useState<string>("");

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
      familyNativeCountry: jsonData?.family_native_country,
      familyNativeState: jsonData?.family_native_state,
      familyNativeCity: jsonData?.family_native_city,
      livingWithParents: String(jsonData?.living_with_parents),
    },
    onSubmit: async (values: IRegisterStep4) => {
      console.log(values, "values");

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

  useEffect(() => {
    setSelectedNativeCountry(
      jsonData?.family_native_country != undefined
        ? jsonData?.family_native_country
        : 0
    );
    setSelectedNativeState(
      jsonData?.family_native_state != undefined
        ? jsonData?.family_native_state
        : 0
    );
    setSelectedNativeCity(
      jsonData?.family_native_city != undefined
        ? jsonData?.family_native_city
        : 0
    );
    setGothraVal(jsonData?.Gothra != undefined ? jsonData?.Gothra : "");
  }, [
    jsonData?.family_native_country,
    jsonData?.family_native_state,
    jsonData?.family_native_city,
    jsonData?.Gothra,
  ]);

  useEffect(() => {
    formik.values.mothersProfession = selectedMothersOccupation.id;
    formik.values.fathersProfession = selectedFathersOccupation.id;
    formik.values.sister = selectedSister.id;
    formik.values.brother = selectedBrother.id;
    formik.values.familyStatus = selectedFamilyStatus.id;
    formik.values.familyIncome = selectedFamilyIncome.id;
    formik.values.familyType = selectedFamilyType.id;
    formik.values.familyNativeCountry = selectedNativeCountry;
    formik.values.familyNativeState = selectedNativeState;
    formik.values.familyNativeCity = selectedNativeCity;
    formik.values.livingWithParents = String(selectedLivingWithParents.id);
    formik.values.gothra = gothraVal;
  }, [
    formik.values,
    jsonData,
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
    gothraVal,
  ]);

  const getSelectedCountry = (id: number) => {
    setSelectedNativeCountry(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedNativeState(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedNativeCity(id);
  };

  return (
    <div className={classes.profile_Container}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <Row className="justify-content-center">
            <h1>We would love to know about your family.</h1>
            <Col sm={12} md={5}>
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
                      name="gothra"
                      placeholder="About Gothra"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setGothraVal(e.target.value)}
                      defaultValue={jsonData?.Gothra && jsonData.Gothra}
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
                    title="Family Annual Income"
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
                  <CountrySingle
                    title="Native Country"
                    setSelectedCountry={getSelectedCountry}
                    defaultValueCountry={jsonData?.family_native_country}
                  />
                  <StateSingle
                    title="Native State"
                    setSelectedState={getSelectedState}
                    defaultValueCountry={selectedNativeCountry}
                    defaultValueState={jsonData?.family_native_state}
                  />
                  <CitySingle
                    title="Native City"
                    defaultValueCountry={selectedNativeCountry}
                    defaultValueState={selectedNativeState}
                    defaultValueCity={jsonData?.family_native_city}
                    setSelectedCity={getSelectedCity}
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
                  className={`${classes.Form_btn} mt-2 w-50`}
                >
                  Next
                </Button>
              </Form>
            </Col>
            <RightSection profileComplete={profileComplete} title="" />
          </Row>
        )}
      </Container>
    </div>
  );
};

export default FamilyDetails;
