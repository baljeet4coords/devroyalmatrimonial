import { FC, useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { BiBook } from "react-icons/bi";
import {
  AnnualIncomeProfile,
  Occupation,
  ReadyToSettleAbroad,
  ResidentialStatus,
} from "../../types/enums";
import CountrySingle from "../InputField/CountryStateSingle/CountrySingle";
import StateSingle from "../InputField/CountryStateSingle/StateSingle";
import CitySingle from "../InputField/CountryStateSingle/CitySingle";
import { EducationTypeAndVal } from "../../types/enums";

interface MyComponentProps {
  setEudcationAndCareer: (details: boolean) => void;
  step2Response: any;
}
const EditEducationAmdCareer: FC<MyComponentProps> = ({
  setEudcationAndCareer,
  step2Response
}) => {
  const formik = useFormik({
    initialValues: {
      country: "",
      state: "",
      city: "",
      residential_status: "",
      setting_aboard: "",
      highest_education: "",
      annual_income: "",
      employed_in: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      setEudcationAndCareer(false);
    },
  });

  const [selectedResidentialStatus, setSelectedResidentialStatus] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedSettingAboard, setSelectedSettingAboard] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedHigestEducations, setSelectedHigestEducations] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedAnnualIncome, setSelectedAnnualIncome] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });

  const [SelectedEmployedIn, setSelectedEmployedIn] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedCountry, setSelectedCountry] = useState<number>(
    step2Response?.country || 100
  );
  const [selectedState, setSelectedState] = useState<number>(
    step2Response?.state || -1
  );
  const [selectedCity, setSelectedCity] = useState<number>(
    step2Response?.city || -1
  );

  useEffect(() => {
    (formik.values.residential_status = selectedResidentialStatus.val || ""),
      (formik.values.setting_aboard = selectedSettingAboard.val || ""),
      (formik.values.highest_education = selectedHigestEducations.id || ""),
      (formik.values.annual_income = selectedAnnualIncome.val || ""),
      (formik.values.employed_in = SelectedEmployedIn.id || "");
  }, [
    selectedResidentialStatus.val,
    selectedSettingAboard.val,
    selectedHigestEducations.val,
    selectedAnnualIncome.val,
    SelectedEmployedIn.val,
    formik.values,
    selectedHigestEducations.id,
    SelectedEmployedIn.id,
  ]);

  useEffect(() => {
    setSelectedCountry(
      step2Response?.country != undefined ? step2Response?.country : selectedCountry
    );
    setSelectedState(
      step2Response?.state != undefined ? step2Response?.state : selectedState
    );
    setSelectedCity(
      step2Response?.city != undefined ? step2Response?.city : selectedCity
    );
  }, [step2Response?.country, step2Response?.state, step2Response?.city]);


  const getSelectedCountry = (id: number) => {
    setSelectedCountry(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedState(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedCity(id);
  };


  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <BiBook />
            Education & Career
          </div>
        </div>
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <CountrySingle
                title="Country"
                setSelectedCountry={getSelectedCountry}
                defaultValueCountry={step2Response?.country}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <StateSingle
                title="State"
                setSelectedState={getSelectedState}
                defaultValueCountry={selectedCountry}
                defaultValueState={step2Response?.state}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <CitySingle
                title="City"
                defaultValueCountry={selectedCountry}
                defaultValueState={selectedState}
                defaultValueCity={step2Response?.city}
                setSelectedCity={getSelectedCity}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedResidentialStatus}
                title="Residential Status"
                data={ResidentialStatus}
                nameid="residential_status"
                defaultValue={String(step2Response?.residentialstatus)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedSettingAboard}
                title="Intersting in Setting Aboard"
                data={ReadyToSettleAbroad}
                nameid="setting_aboard"
                defaultValue={String(step2Response?.readytosettleabroad)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="Higest Educations"
                data={EducationTypeAndVal}
                nameid="highest_education"
                selectedDataFn={setSelectedHigestEducations}
                defaultValue={String(step2Response?.education)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="Annual Income"
                data={AnnualIncomeProfile}
                nameid="annual_income"
                selectedDataFn={setSelectedAnnualIncome}
                defaultValue={String(step2Response?.annual_income)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSelectedEmployedIn}
                title="Employed In"
                data={Occupation}
                nameid="employed_in"
                defaultValue={String(step2Response?.occupation)}
              />
            </div>
          </div>

          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              title="Save"
              setEditDetails={setEudcationAndCareer}
              buttonType={1}
            />
            <EditCustomButton
              title="Cancel"
              setEditDetails={setEudcationAndCareer}
              buttonType={0}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditEducationAmdCareer;
