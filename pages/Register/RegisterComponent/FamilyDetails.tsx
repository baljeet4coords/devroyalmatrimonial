import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
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
import router from "next/router";
import { useStep4Register } from "../../../hooks/useRegister/useStep4";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
  DisabledHeadingMessage?: (a: number) => void;
  profileComplete: number;
}
interface Data {
  id?: string;
  val: string;
}
const FamilyDetails: React.FC<ProfileDetailsProps> = ({
  nextPage,
  profileComplete,
  DisabledHeadingMessage,
}) => {
  const dispatch = useDispatch();
  const stepFourDefaultValues = useSelector(selectStep4Success);
  const isLoading = useSelector(selectStep4Loading);
  const jsonData = stepFourDefaultValues?.jsonResponse;

  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);
  const { registerUserMutation, Step4Query } = useStep4Register();

  useEffect(() => {
    dispatch(step4({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);

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
  const [skiploadingSpiner, setSkiploadingSpiner] = useState(false);
  const [loadingSpiner, setloadingSpiner] = useState(false);
  const [nextDisable, setNextDisable] = useState<boolean>(true);

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
      setloadingSpiner(true);

      const mutationResult = await registerUserMutation.mutateAsync({
        ...values,
        actionType: isReduxEmpty ? "c" : "u",
      });
      if (mutationResult?.output && mutationResult?.output > 0) {
        nextPage(4);
        setloadingSpiner(false);
      } else {
        setloadingSpiner(false);
      }
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
        : -1
    );
    setSelectedNativeCity(
      jsonData?.family_native_city != undefined
        ? jsonData?.family_native_city
        : -1
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

    if (
      selectedMothersOccupation.id !== "null" &&
      selectedFathersOccupation.id !== "null" &&
      selectedSister.id !== "null" &&
      selectedBrother.id !== "null" &&
      selectedFamilyStatus.id !== "null" &&
      selectedFamilyIncome.id !== "null" &&
      selectedFamilyType.id !== "null" &&
      selectedNativeCountry >= 0 &&
      selectedNativeState >= 0 &&
      selectedNativeCity >= 0 &&
      selectedLivingWithParents.id !== "null" &&
      formik.values.gothra
    ) {
      setNextDisable(false);
    } else {
      setNextDisable(true);
    }
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

  function handleSkip() {
    setSkiploadingSpiner(true);
    router.push("/DesiredProfile");
  }
  return (
    <div className={classes.profile_Container}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <Row className="justify-content-center">
            <Button
              variant="link"
              className={`${classes.Form_btn} ${classes.Skip_Btn} mt-2 mb-4 align-self-md-end`}
              onClick={handleSkip}
            >
              {skiploadingSpiner && (
                <Spinner
                  className={classes.loginSpiner}
                  animation="border"
                  variant="danger"
                />
              )}
              skip to Partner Profile
            </Button>
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
                  className={`${classes.Form_btn} mt-2 w-50 align-self-md-center`}
                  disabled={nextDisable}
                >
                  {loadingSpiner && (
                    <Spinner
                      className={classes.loginSpiner}
                      animation="border"
                      variant="light"
                    />
                  )}
                  Next
                </Button>
              </Form>
            </Col>
            <RightSection profileComplete={profileComplete} />
          </Row>
        )}
      </Container>
    </div>
  );
};

export default FamilyDetails;