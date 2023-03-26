import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import {
  DropdownGridSingleSelect,
  Footer,
  StrictRadioCheck,
} from "../../components";
import React, { useEffect, useState } from "react";
import classes from "./DesiredProfile.module.scss";
import { AgeFromYearList, HeighListInCms } from "../../constants/DesiredData";
import SingleInput from "../../components/InputField/SingleInputField";
import DoubleInput from "../../components/InputField/DoubleInputField";
import {
  AnnualIncomeProfile0,
  ChallengedWith0,
  ChildrenStatus0,
  DietWith0,
  EducationTypeAndVal,
  ManglikWith0,
  MaritalStatusWith0,
  MotherTongueWith0,
  OccupationWith0,
  ReadyToSettleAbroadWith0,
  ReligionWith0,
  ResidentialStatusWith0,
  SmokeDrinkWith0,
} from "../../types/enums";
import CountryMultiple from "../../components/InputField/CountryStateMultiple/CountryMultiple";
import StateMultiple from "../../components/InputField/CountryStateMultiple/StateMultiple";
import CityMultiple from "../../components/InputField/CountryStateMultiple/CityMultiple";
import CasteMultiple from "../../components/InputField/CasteMultiple/CasteMultiple";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import { selectPartnerPrefSuccess } from "../../ducks/partnerPreferrence/selectors";
import { partnerPrefReq } from "../../ducks/partnerPreferrence/actions";
import axios from "axios";
import { PartnerPreferrence } from "../../ducks/partnerPreferrence/types";

const DesiredProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const partnerPreferrenceResponse = useSelector(selectPartnerPrefSuccess);
  const userId = useSelector(getUserId);

  const jsonData = partnerPreferrenceResponse?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  useEffect(() => {
    dispatch(partnerPrefReq({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);

  const [selectedAgeFrom, setSelectedAgeFrom] = useState<string>(
    jsonData?.height_greater_than ?? ""
  );
  const [selectedAgeTo, setSelectedAgeTo] = useState<string>(
    jsonData?.height_less_than ?? ""
  );
  const [selectedHeightFrom, setSelectedHeightFrom] = useState<string>(
    jsonData?.age_greater_than || ""
  );
  const [selectedHeightTo, setSelectedHeightTo] = useState<string>(
    jsonData?.age_less_than || ""
  );
  const [country, setCountry] = useState<number[]>(jsonData?.country || []);
  const [state, setState] = useState<number[]>(jsonData?.state || []);
  const [city, setCity] = useState<number[]>(jsonData?.city || []);
  const [education, setEducation] = useState<string[]>(
    jsonData?.education || []
  );
  const [occupation, setOccupation] = useState<string[]>(
    jsonData?.occupation || []
  );
  const [annualIncome, setAnnualIncome] = useState<{
    id?: string;
    val: string;
  }>({ id: jsonData?.annual_income_greater_than || "", val: "" });
  const [maritalStatus, setMaritalStatus] = useState<string[]>(
    jsonData?.marital_status || []
  );
  const [religion, setReligion] = useState<string[]>(jsonData?.religion || []);
  const [motherTongue, setMotherTongue] = useState<string[]>(
    jsonData?.mother_tongue || []
  );
  const [residentialStatus, setResidentialStatus] = useState<string[]>(
    jsonData?.Residential_status || []
  );
  const [manglik, setManglik] = useState<string[]>([]);
  const [diet, setDiet] = useState<{ id?: string; val: string }>({
    id: jsonData?.diet || "",
    val: "",
  });
  const [smoke, setSmoke] = useState<{ id?: string; val: string }>({
    id: jsonData?.smoking || "",
    val: "",
  });
  const [drink, setDrink] = useState<{ id?: string; val: string }>({
    id: jsonData?.drinking || "",
    val: "",
  });
  const [readyToSettleAbroad, setReadyToSettleAbroad] = useState<{
    id?: string;
    val: string;
  }>({
    id: jsonData?.ready_to_settleAbroad || "",
    val: "",
  });
  const [challenged, setChallenged] = useState<string[]>(
    jsonData?.Challenged || []
  );
  const [childrenStatus, setChildrenStatus] = useState<string[]>(
    jsonData?.children_status || []
  );
  const [hiv, setHiv] = useState<{ id?: string; val: string }>({
    id: jsonData?.HIV === "1" ? "Yes" : "No" || "1",
    val: "",
  });
  const [caste, setCaste] = useState<number[]>(jsonData?.caste || []);


  const [selectedSwitches, setSelectedSwitches] = useState<string[]>(
    jsonData?.mandatory_fields || []
  );

  const savePartnerPref = async (event: any) => {
    event.preventDefault();
    const partnerPrefPostReq: PartnerPreferrence = {
      userId: userId,
      ageGreaterThan: selectedAgeFrom,
      ageLessThan: selectedAgeTo,
      heightGreaterThan: selectedHeightFrom,
      heightLessThan: selectedHeightTo,
      country: JSON.stringify(country),
      state: JSON.stringify(state),
      city: JSON.stringify(city),
      education: JSON.stringify(education),
      occupation: JSON.stringify(occupation),
      annualIncomeGreaterThan: annualIncome.id,
      maritalStatus: JSON.stringify(maritalStatus),
      religion: JSON.stringify(religion),
      motherTongue: JSON.stringify(motherTongue),
      cast: JSON.stringify(caste),
      residentialStatus: JSON.stringify(residentialStatus),
      manglik: JSON.stringify(manglik),
      diet: diet.id,
      smoking: smoke.id,
      drinking: drink.id,
      readyToSettleAbroad: readyToSettleAbroad.id,
      challenged: JSON.stringify(challenged),
      childrenStatus: JSON.stringify(childrenStatus),
      hiv: jsonData?.HIV,
      horoscopeMatch: "0",
      mandatoryFields: JSON.stringify(selectedSwitches),
    };
    let response;
    if (isReduxEmpty === undefined) {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/userPartnerPreference/postPartnerPref`,
        { ...partnerPrefPostReq, actionType: "c" }
      );
    } else {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/userPartnerPreference/postPartnerPref`,
        { ...partnerPrefPostReq, actionType: "u" }
      );
    }
    response.data.output === 1 && alert("Partner Preference Saved");
  };

  const handleSwitchToggle = (switchValue: string) => {
    const newSelectedSwitches = selectedSwitches.includes(switchValue)
      ? selectedSwitches.filter(
          (selectedSwitch) => selectedSwitch !== switchValue
        )
      : [...selectedSwitches, switchValue];
    setSelectedSwitches(newSelectedSwitches);
  };

  return (
    <React.Fragment>
      <Container fluid className={classes.background_header}>
        <LoginHeader />
      </Container>
      <div className={classes.DesiredWrapper}>
        <Container className={classes.innerWrapper}>
          <Row>
            <h1>Desired Partner Profile</h1>
            <Col
              sm={12}
              className={`${classes.form_wrapper} d-flex justify-content-center`}
            >
              <form className={classes.formEdit}>
                <DoubleInput
                  data={AgeFromYearList}
                  inputName={"Age"}
                  onDataFrom={setSelectedAgeFrom}
                  onDataTo={setSelectedAgeTo}
                  defaultValueFrom={
                    jsonData?.age_greater_than !== undefined
                      ? String(jsonData?.age_greater_than)
                      : "Age Greater than"
                  }
                  defaultValueTo={
                    jsonData?.age_less_than !== undefined
                      ? String(jsonData?.age_less_than)
                      : "Age Less than"
                  }
                  Convert={false}
                />
                <div className=" d-flex gap-3 position-relative">
                  <DoubleInput
                    data={HeighListInCms(100, 244)}
                    inputName={"Height in feet"}
                    onDataFrom={setSelectedHeightFrom}
                    onDataTo={setSelectedHeightTo}
                    defaultValueFrom={
                      jsonData?.height_greater_than !== undefined
                        ? String(jsonData?.height_greater_than)
                        : "Height Greater than"
                    }
                    defaultValueTo={
                      jsonData?.height_less_than !== undefined
                        ? String(jsonData?.height_less_than)
                        : "Height Less than"
                    }
                    Convert={true}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="height"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <CountryMultiple
                    onChangeCountry={setCountry}
                    defaultCountry={jsonData?.country || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="country"
                    selectedSwitches={selectedSwitches}
                  />
                </div>

                <div className=" d-flex gap-3 position-relative">
                  <StateMultiple
                    onChangeState={setState}
                    defaultState={jsonData?.country || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="state"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <CityMultiple
                    onChangeCity={setCity}
                    defaultCity={jsonData?.city || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="city"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={EducationTypeAndVal}
                    inputName={"Education"}
                    onChange={setEducation}
                    defaultValues={jsonData?.education || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="education"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={OccupationWith0}
                    inputName={"Occupation"}
                    onChange={setOccupation}
                    defaultValues={jsonData?.occupation || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="occupation"
                    selectedSwitches={selectedSwitches}
                  />
                </div>

                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Income greater than"}
                    data={AnnualIncomeProfile0}
                    nameid={"AnnualIncomeProfile0"}
                    selectedDataFn={setAnnualIncome}
                    defaultValue={
                      String(jsonData?.annual_income_greater_than) || ""
                    }
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="annual_income"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={MaritalStatusWith0}
                    inputName={"Marital Status"}
                    onChange={setMaritalStatus}
                    defaultValues={jsonData?.marital_status || []}
                  />
                  {/* <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="annual_income"
                    selectedSwitches={selectedSwitches}
                  /> */}
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={ReligionWith0}
                    inputName={"Religion"}
                    onChange={setReligion}
                    defaultValues={jsonData?.religion || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="religion"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={MotherTongueWith0}
                    inputName={"Mother Tongue"}
                    onChange={setMotherTongue}
                    defaultValues={jsonData?.mother_tongue || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="mother_tongue"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <CasteMultiple
                    onChangeCaste={setCaste}
                    defaultValues={jsonData?.caste || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="caste"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={ResidentialStatusWith0}
                    inputName={"Residential Status"}
                    onChange={setResidentialStatus}
                    defaultValues={jsonData?.Residential_status || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="residentialstatus"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={ManglikWith0}
                    inputName={"Manglik"}
                    onChange={setManglik}
                    defaultValues={jsonData?.manglik || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="manglik"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Diet"}
                    data={DietWith0}
                    nameid={"DietWith0"}
                    selectedDataFn={setDiet}
                    defaultValue={String(jsonData?.diet) || ""}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="diet"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Smoking"}
                    data={SmokeDrinkWith0}
                    nameid={"Smoke0"}
                    selectedDataFn={setSmoke}
                    defaultValue={String(jsonData?.diet) || ""}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="smoking"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Drinking"}
                    data={SmokeDrinkWith0}
                    nameid={"drinkingwith0"}
                    selectedDataFn={setDrink}
                    defaultValue={String(jsonData?.diet) || ""}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="drinking"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Ready to settle abroad"}
                    data={ReadyToSettleAbroadWith0}
                    nameid={"ReadyToSettleAbroadWith0"}
                    selectedDataFn={setReadyToSettleAbroad}
                    defaultValue={String(jsonData?.ready_to_settleAbroad) || ""}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="readytosettleabroad"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={ChallengedWith0}
                    inputName={"Challenged"}
                    onChange={setChallenged}
                    defaultValues={jsonData?.Challenged || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="challenged"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className=" d-flex gap-3 position-relative">
                  <SingleInput
                    data={ChildrenStatus0}
                    inputName={"Children Status"}
                    onChange={setChildrenStatus}
                    defaultValues={jsonData?.children_status || []}
                  />
                  <StrictRadioCheck
                    handleSwitchToggle={handleSwitchToggle}
                    switchNameVal="children_status"
                    selectedSwitches={selectedSwitches}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>HIV</Form.Label>
                  <Form.Control type="text" value={hiv.id} disabled />
                </div>
                <Button className="mb-5 mt-3 mx-auto" onClick={savePartnerPref}>
                  Save your preferrence
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DesiredProfilePage;
