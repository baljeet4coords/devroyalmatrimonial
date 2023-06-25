import { Container, Row, Col, Button } from "react-bootstrap";
import {
  DropdownGridSingleSelect,
} from "../../components";
import React, { useState } from "react";
import classes from "./Search.module.scss";
import { AgeFromYearList, HeightList } from "../../constants/DesiredData";
import SingleInput from "../../components/InputField/SingleInputField";
import DoubleInput from "../../components/InputField/DoubleInputField";
import {
  AnnualIncomeProfile0,
  ChallengedWith0,
  ChildrenStatus0,
  DietWith0,
  EducationTypeAndValWith0,
  ManglikWith0,
  MaritalStatusWith0,
  MotherTongueWith0,
  OccupationWith0,
  ReadyToSettleAbroadWith0,
  ReligionWith0,
  ResidentialStatusWith0,
  SmokeDrinkWith0,
  isHiv,
} from "../../types/enums";
import CountryMultiple from "../../components/InputField/CountryStateMultiple/CountryMultiple";
import StateMultiple from "../../components/InputField/CountryStateMultiple/StateMultiple";
import CityMultiple from "../../components/InputField/CountryStateMultiple/CityMultiple";
import CasteMultiple from "../../components/InputField/CasteMultiple/CasteMultiple";
import { useSelector } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import axios from "axios";
import {
  PartnerPreferrence,
} from "../../ducks/partnerPreferrence/types";
import HeightFromTo from "../../components/InputField/DoubleInputField/HeightFromTo";
import router from "next/router";



const SearchByData: React.FC = () => {
  // const dispatch = useDispatch();

  const userId = useSelector(getUserId);



  const [selectedAgeFrom, setSelectedAgeFrom] = useState<string>("");
  const [selectedAgeTo, setSelectedAgeTo] = useState<string>('');
  const [selectedHeightFrom, setSelectedHeightFrom] = useState<string>('');
  const [selectedHeightTo, setSelectedHeightTo] = useState<string>('');

  const [country, setCountry] = useState<number[]>([]);
  const [state, setState] = useState<number[]>([]);
  const [city, setCity] = useState<number[]>([]);
  const [education, setEducation] = useState<string[]>(
    []
  );
  const [occupation, setOccupation] = useState<string[]>(
    []
  );
  const [annualIncome, setAnnualIncome] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });
  const [maritalStatus, setMaritalStatus] = useState<string[]>(
    []
  );
  const [religion, setReligion] = useState<string[]>([]);
  const [motherTongue, setMotherTongue] = useState<string[]>(
    []
  );
  const [residentialStatus, setResidentialStatus] = useState<string[]>(
    []
  );
  const [manglik, setManglik] = useState<string[]>([]);
  const [diet, setDiet] = useState<{ id?: string; val: string }>({
    id: "",
    val: "",
  });
  const [smoke, setSmoke] = useState<{ id?: string; val: string }>({
    id: "",
    val: "",
  });
  const [drink, setDrink] = useState<{ id?: string; val: string }>({
    id: "",
    val: "",
  });
  const [readyToSettleAbroad, setReadyToSettleAbroad] = useState<{
    id?: string;
    val: string;
  }>({
    id: "",
    val: "",
  });
  const [challenged, setChallenged] = useState<string[]>(
    []
  );
  const [childrenStatus, setChildrenStatus] = useState<string[]>(
    []
  );

  const [caste, setCaste] = useState<number[]>([]);
  const [selectedIsHiv, setSelectedIsHiv] = useState({
    id: '',
    val: "",
  });
  const [hivTouched, setHivTouched] = useState<boolean>(false);



  const savePartnerPref = async (event: any) => {
    event.preventDefault();

    const partnerPrefPostReq: PartnerPreferrence = {
      userId: userId,
      ageGreaterThan: +selectedAgeFrom,
      ageLessThan: +selectedAgeTo,
      heightGreaterThan: String(Math.trunc(+selectedHeightFrom)),
      heightLessThan: String(Math.trunc(+selectedHeightTo)),
      country: JSON.stringify(country),
      state: JSON.stringify(state),
      city: JSON.stringify(city),
      education: JSON.stringify(education && education.map((str) => +str)),
      occupation: JSON.stringify(occupation && occupation.map((str) => +str)),
      annualIncomeGreaterThan: annualIncome.id && +annualIncome.id,
      maritalStatus: JSON.stringify(
        maritalStatus && maritalStatus.map((str) => +str)
      ),
      religion: JSON.stringify(religion && religion.map((str) => +str)),
      motherTongue: JSON.stringify(
        motherTongue && motherTongue.map((str) => +str)
      ),
      cast: JSON.stringify(caste),
      residentialStatus: JSON.stringify(
        residentialStatus && residentialStatus.map((str) => +str)
      ),
      manglik: JSON.stringify(manglik && manglik.map((str) => +str)),
      diet: diet.id && +diet.id,
      smoking: smoke.id && +smoke.id,
      drinking: drink.id && +drink.id,
      readyToSettleAbroad: readyToSettleAbroad.id && +readyToSettleAbroad.id,
      challenged: JSON.stringify(challenged && challenged.map((str) => +str)),
      childrenStatus: JSON.stringify(
        childrenStatus && childrenStatus.map((str) => +str)
      ),
      horoscopeMatch: "0",
      hiv : Number(selectedIsHiv.id),
    };

    console.log(partnerPrefPostReq, 'data');

  };

  return (
    <>
      <div className={classes.SearchWrapperMain}>
        <div className={classes.SearchinnerWrapper}>
          <div className={classes.SearchWrapper}>
            <Col sm={12} className={`${classes.form_wrapper}`} >
              <form className={classes.formEdit}>
                <DoubleInput
                  data={AgeFromYearList}
                  inputName={"Age"}
                  onDataFrom={setSelectedAgeFrom}
                  onDataTo={setSelectedAgeTo}
                  defaultValueFrom={
                    "Age Greater than"
                  }
                  defaultValueTo={
                    "Age Less than"
                  }
                />
                <HeightFromTo
                  data={HeightList}
                  inputName={"Height in feet"}
                  onDataFrom={setSelectedHeightFrom}
                  onDataTo={setSelectedHeightTo}
                  defaultValueFrom={"Height Greater than"}
                  defaultValueTo={"Height Less than"
                  }
                />
                <CountryMultiple
                  onChangeCountry={setCountry}
                  defaultCountry={[]}
                />

                <StateMultiple
                  onChangeState={setState}
                  defaultState={[]}
                />

                <CityMultiple
                  onChangeCity={setCity}
                  defaultCity={[]}
                />

                <SingleInput
                  data={EducationTypeAndValWith0}
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

                <div className={classes.SearchSingleBox}>
                  <div className={classes.singleDropDown}>
                    <DropdownGridSingleSelect
                      title={"Annual Income"}
                      data={AnnualIncomeProfile0}
                      nameid={"AnnualIncomeProfile0"}
                      selectedDataFn={setAnnualIncome}
                      defaultValue={""}
                    />
                  </div>
                </div>


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

                <CasteMultiple
                  onChangeCaste={setCaste}
                  defaultValues={[]}
                />


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

                <div className={classes.SearchSingleBox}>
                  <div className={classes.singleDropDown}>
                    <DropdownGridSingleSelect
                      title={"Diet"}
                      data={DietWith0}
                      nameid={"DietWith0"}
                      selectedDataFn={setDiet}
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className={classes.SearchSingleBox}>
                  <div className={classes.singleDropDown}>
                    <DropdownGridSingleSelect
                      title={"Smoking"}
                      data={SmokeDrinkWith0}
                      nameid={"Smoke0"}
                      selectedDataFn={setSmoke}
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className={classes.SearchSingleBox}>
                  <div className={classes.singleDropDown}>
                    <DropdownGridSingleSelect
                      title={"Drinking"}
                      data={SmokeDrinkWith0}
                      nameid={"drinkingwith0"}
                      selectedDataFn={setDrink}
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className={classes.SearchSingleBox}>
                  <div className={classes.singleDropDown}>
                    <DropdownGridSingleSelect
                      title={"Ready to settle abroad"}
                      data={ReadyToSettleAbroadWith0}
                      nameid={"ReadyToSettleAbroadWith0"}
                      selectedDataFn={setReadyToSettleAbroad}
                      defaultValue={
                        ""
                      }
                    />
                  </div>
                </div>


                <SingleInput
                  data={ChallengedWith0}
                  inputName={"Challenged"}
                  onChange={setChallenged}
                  defaultValues={[]}
                />



                <SingleInput
                  data={MaritalStatusWith0}
                  inputName={"Marital Status"}
                  onChange={setMaritalStatus}
                  defaultValues={[]}
                />



                <SingleInput
                  data={ChildrenStatus0}
                  inputName={"Children Status"}
                  onChange={setChildrenStatus}
                  defaultValues={[]}
                />

                <div className={classes.SearchSingleBox}>
                  <div className={classes.singleDropDown}>
                    <DropdownGridSingleSelect
                      title="HIV"
                      data={isHiv}
                      nameid="hiv"
                      selectedDataFn={setSelectedIsHiv}
                      defaultValue={''}
                      setErrorState={setHivTouched}
                    />
                  </div>
                </div>


                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.savePartnerBtn}
                    onClick={savePartnerPref}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </Col>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchByData;
