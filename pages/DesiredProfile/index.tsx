import { Container, Row, Col, Button } from "react-bootstrap";
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
  MaritalStatus0,
  MotherTongueWith0,
  OccupationWith0,
  ReadyToSettleAbroadWith0,
  ReligionWith0,
  ResidentialStatusWith0,
  SmokeDrinkWith0,
  isHivWith0,
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
    !isReduxEmpty &&
      dispatch(partnerPrefReq({ actionType: "v", userId: userId }));
  }, [dispatch, isReduxEmpty, userId]);

  const [selectedAgeFrom, setSelectedAgeFrom] = useState<string>("");
  const [selectedAgeTo, setSelectedAgeTo] = useState<string>("");
  const [selectedHeightFrom, setSelectedHeightFrom] = useState<string>("");
  const [selectedHeightTo, setSelectedHeightTo] = useState<string>("");
  const [country, setCountry] = useState<number[]>([]);
  const [state, setState] = useState<number[]>([]);
  const [city, setCity] = useState<number[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [occupation, setOccupation] = useState<string[]>([]);
  const [annualIncome, setAnnualIncome] = useState<{ id: string; val: string }>(
    { id: "", val: "" }
  );
  const [maritalStatus, setMaritalStatus] = useState<string[]>([]);
  const [religion, setReligion] = useState<string[]>([]);
  const [motherTongue, setMotherTongue] = useState<string[]>([]);
  const [residentialStatus, setResidentialStatus] = useState<string[]>([]);
  const [manglik, setManglik] = useState<string[]>([]);
  const [diet, setDiet] = useState<{ id: string; val: string }>({
    id: "",
    val: "",
  });
  const [smoke, setSmoke] = useState<{ id: string; val: string }>({
    id: "",
    val: "",
  });
  const [drink, setDrink] = useState<{ id: string; val: string }>({
    id: "",
    val: "",
  });
  const [readyToSettleAbroad, setReadyToSettleAbroad] = useState<{
    id: string;
    val: string;
  }>({
    id: "",
    val: "",
  });
  const [challenged, setChallenged] = useState<string[]>([]);
  const [childrenStatus, setChildrenStatus] = useState<string[]>([]);
  const [hiv, setHiv] = useState<{ id: string; val: string }>({
    id: "",
    val: "",
  });
  const [caste, setCaste] = useState<number[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const savePartnerPref = async (event: any) => {
    event.preventDefault();
    const partnerPrefPostReq: PartnerPreferrence = {
      userId: userId,
      ageGreaterThan: selectedAgeFrom,
      ageLessThan: selectedAgeTo,
      heightGreaterThan: selectedHeightFrom,
      heightLessThan: selectedHeightTo,
      country: country,
      state: state,
      city: city,
      education: education,
      occupation: occupation,
      annualIncomeGreaterThan: annualIncome.id,
      maritalStatus: maritalStatus,
      religion: religion,
      motherTongue: motherTongue,
      cast: caste,
      residentialStatus: residentialStatus,
      manglik: manglik,
      diet: diet.id,
      smoking: smoke.id,
      drinking: drink.id,
      readyToSettleAbroad: readyToSettleAbroad.id,
      challenged: challenged,
      childrenStatus: childrenStatus,
      hiv: hiv.id,
      horoscopeMatch: "0",
      mandatoryFields: filters,
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
    response.data.output === 1 && console.log(1);
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
                  defaultValueFrom={"20"}
                  defaultValueTo={"30"}
                />
                <DoubleInput
                  data={HeighListInCms(100, 300)}
                  inputName={"Height in cms"}
                  onDataFrom={setSelectedHeightFrom}
                  onDataTo={setSelectedHeightTo}
                  defaultValueFrom={"120"}
                  defaultValueTo={"180"}
                />
                <CountryMultiple
                  onChangeCountry={setCountry}
                  defaultCountry={""}
                />
                <StateMultiple onChangeState={setState} defaultCountry={[]} />
                <CityMultiple onChangeCity={setCity} defaultCountry={[]} />
                <SingleInput
                  data={EducationTypeAndVal}
                  inputName={"Education"}
                  onChange={setEducation}
                  defaultValues={[]}
                />

                <SingleInput
                  data={OccupationWith0}
                  inputName={"Occupation"}
                  onChange={setOccupation}
                  defaultValues={[]}
                />
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Income greater than"}
                    data={AnnualIncomeProfile0}
                    nameid={"AnnualIncomeProfile0"}
                    selectedDataFn={setAnnualIncome}
                  />
                </div>
                <SingleInput
                  data={MaritalStatus0}
                  inputName={"Marital Status"}
                  onChange={setMaritalStatus}
                  defaultValues={[]}
                />
                <SingleInput
                  data={ReligionWith0}
                  inputName={"Religion"}
                  onChange={setReligion}
                  defaultValues={[]}
                />
                <SingleInput
                  data={MotherTongueWith0}
                  inputName={"Mother Tongue"}
                  onChange={setMotherTongue}
                  defaultValues={[]}
                />
                <CasteMultiple onChangeCaste={setCaste} defaultValues={[]} />
                <SingleInput
                  data={ResidentialStatusWith0}
                  inputName={"Residential Status"}
                  onChange={setResidentialStatus}
                  defaultValues={[]}
                />
                <SingleInput
                  data={ManglikWith0}
                  inputName={"Manglik"}
                  onChange={setManglik}
                  defaultValues={[]}
                />
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Diet"}
                    data={DietWith0}
                    nameid={"DietWith0"}
                    selectedDataFn={setDiet}
                  />
                </div>
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Smoking"}
                    data={SmokeDrinkWith0}
                    nameid={"Smoke0"}
                    selectedDataFn={setSmoke}
                  />
                </div>
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Drinking"}
                    data={SmokeDrinkWith0}
                    nameid={"drinkingwith0"}
                    selectedDataFn={setDrink}
                  />
                </div>
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"Ready to settle abroad"}
                    data={ReadyToSettleAbroadWith0}
                    nameid={"ReadyToSettleAbroadWith0"}
                    selectedDataFn={setReadyToSettleAbroad}
                  />
                </div>
                <SingleInput
                  data={ChallengedWith0}
                  inputName={"Challenged"}
                  onChange={setChallenged}
                  defaultValues={[]}
                />
                <SingleInput
                  data={ChildrenStatus0}
                  inputName={"Children Status"}
                  onChange={setChildrenStatus}
                  defaultValues={[]}
                />
                <div className={classes.singleDropDown}>
                  <DropdownGridSingleSelect
                    title={"HIV"}
                    data={isHivWith0}
                    nameid={"HIV"}
                    selectedDataFn={setHiv}
                  />
                </div>
                <div>
                  <StrictRadioCheck onSetFilters={setFilters} />
                </div>
                <Button className="mb-5" onClick={savePartnerPref}>
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
