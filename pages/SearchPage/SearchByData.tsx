import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
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
  PartnerPreferrence, SearchByData,
} from "../../ducks/partnerPreferrence/types";
import HeightFromTo from "../../components/InputField/DoubleInputField/HeightFromTo";
import  { useRouter } from "next/router";
import { searchByDataReq } from "../../ducks/searchByData/actions";
import { useDispatch } from "react-redux";



const SearchByData: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector(getUserId);

  const [loading, setLoading] = useState(false);

  const [selectedAgeFrom, setSelectedAgeFrom] = useState<string>("");
  const [selectedAgeTo, setSelectedAgeTo] = useState<string>('');
  const [selectedHeightFrom, setSelectedHeightFrom] = useState<string>('');
  const [selectedHeightTo, setSelectedHeightTo] = useState<string>('');

  const [country, setCountry] = useState<number[]>([101]);
  const [state, setState] = useState<number[]>([4]);
  const [city, setCity] = useState<number[]>([13]);
  const [education, setEducation] = useState<string[]>(
    ['0']
  );
  const [occupation, setOccupation] = useState<string[]>(
    ['2']
  );
  const [annualIncome, setAnnualIncome] = useState<{
    id?: string;
    val: string;
  }>({ id: '0', val: "" });
  const [maritalStatus, setMaritalStatus] = useState<string[]>(
    ['0']
  );
  const [religion, setReligion] = useState<string[]>(['0']);
  const [motherTongue, setMotherTongue] = useState<string[]>(
    ['0']
  );
  const [residentialStatus, setResidentialStatus] = useState<string[]>(
    ['0']
  );
  const [manglik, setManglik] = useState<string[]>([]);
  const [diet, setDiet] = useState<{ id?: string; val: string }>({
    id: '0',
    val: "",
  });
  const [smoke, setSmoke] = useState<{ id?: string; val: string }>({
    id: '0',
    val: "",
  });
  const [drink, setDrink] = useState<{ id?: string; val: string }>({
    id: '0',
    val: "",
  });
  const [readyToSettleAbroad, setReadyToSettleAbroad] = useState<{
    id?: string;
    val: string;
  }>({
    id: '0',
    val: "",
  });
  const [challenged, setChallenged] = useState<string[]>(
    []
  );
  const [childrenStatus, setChildrenStatus] = useState<string[]>(
    ['0']
  );

  const [caste, setCaste] = useState<number[]>([0]);
  const [selectedIsHiv, setSelectedIsHiv] = useState<{ id?: string; val: string }>({
    id: '1',
    val: "",
  });
  const [hivTouched, setHivTouched] = useState<boolean>(false);



  const savePartnerPref = async (event: any) => {
    event.preventDefault();
    setLoading(true)

    const partnerPrefPostReq: SearchByData = {
      userId: String(userId),
      ageGreaterThan: selectedAgeFrom,
      ageLessThan: selectedAgeTo,
      heightGreaterThan: String(Math.trunc(+selectedHeightFrom)),
      heightLessThan: String(Math.trunc(+selectedHeightTo)),
      country: JSON.stringify(country && country.map((str) => +str)),
      state: JSON.stringify(state && state.map((str) => +str)),
      city: JSON.stringify(city && city.map((str) => +str)),
      education: JSON.stringify(education && education.map((str) => +str)),
      occupation: JSON.stringify(occupation && occupation.map((str) => +str)),
      annualIncome: annualIncome.id ? annualIncome.id : '0',
      maritalStatus: JSON.stringify(
        maritalStatus && maritalStatus.map((str) => +str)
      ),
      religion: JSON.stringify(religion && religion.map((str) => +str)),
      motherTongue: JSON.stringify(
        motherTongue && motherTongue.map((str) => +str)
      ),
      caste: JSON.stringify(caste && caste.map((str) => +str)),
      residentialStatus: JSON.stringify(
        residentialStatus && residentialStatus.map((str) => +str)
      ),
      manglik: JSON.stringify(manglik && manglik.map((str) => +str)),
      diet: diet.id ? diet.id : '0',
      smoking: smoke.id ? smoke.id : '0',
      drinking: drink.id ? drink.id : '0',
      readyToSettleAbroad: readyToSettleAbroad.id ? readyToSettleAbroad.id : '0',
      challenged: JSON.stringify(challenged && challenged.map((str) => +str)),
      childrenStatus: JSON.stringify(
        childrenStatus && childrenStatus.map((str) => +str)
      ),
      hiv: String(2),
      mandatoryFields: `[]`,
      maxUserId: String(-1),
      limit: String(10),
      viceVersaFlag: String(0),
      excludedUsers: `[]`,
    };

    router.push(`/SearchPage/SearchResult?searchdata=${JSON.stringify(partnerPrefPostReq)}`)
    dispatch(searchByDataReq(partnerPrefPostReq));

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
                    {loading && (
                      <Spinner
                        className={classes.loginSpiner}
                        animation="border"
                        variant="light"
                      />
                    )}
                    {loading ? 'Searching'  : 'Search'}
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
