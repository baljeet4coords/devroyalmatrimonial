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
import { getUserId } from "../../ducks/auth/selectors";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useStep2Register } from "../../hooks/useRegister/useStep2";
import { selectStep2Success } from "../../ducks/regiserUser/step2/selectors";

interface MyComponentProps {
  setEudcationAndCareer: (details: boolean) => void;
  step2Response: any;
  FatchAgain: () => void;
}

interface Data {
  id?: string;
  val: string;
}

const EditEducationAmdCareer: FC<MyComponentProps> = ({
  setEudcationAndCareer,
  step2Response,
  FatchAgain
}) => {
  const stepTwoDefaultValues = useSelector(selectStep2Success);
  const jsonData = stepTwoDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);

  const { mutate: registerUser, data, isLoading: step2loadingReq } = useStep2Register();


  const [selectedCountry, setSelectedCountry] = useState<number>(
    step2Response?.country || 100
  );
  const [selectedState, setSelectedState] = useState<number>(
    step2Response?.state || -1
  );
  const [selectedCity, setSelectedCity] = useState<number>(
    step2Response?.city || -1
  );
  const [residentialStatus, setResidentialStatus] = useState<Data>({
    id: String(step2Response?.residentialstatus),
    val: "",
  });
  const [settleAboard, setSettleAbroad] = useState<Data>({
    id: String(step2Response?.readytosettleabroad),
    val: "",
  });
  const [education, setEducation] = useState<Data>({
    id: String(step2Response?.education),
    val: "",
  });
  const [occupation, setOccupation] = useState<Data>({
    id: String(step2Response?.occupation),
    val: "",
  });
  const [annualIncome, setannualIncome] = useState<Data>({
    id: String(step2Response?.annual_income),
    val: "",
  });



  const formik = useFormik({
    initialValues: {
      userId: userId,
      country: step2Response?.country,
      state: step2Response?.state,
      city: step2Response?.city,
      residentialStatus: String(step2Response?.residentialstatus),
      readyToSettleAbroad: String(step2Response?.readytosettleabroad),
      education: String(step2Response?.education),
      college: step2Response?.College,
      occupation: String(step2Response?.occupation),
      annualIncome: String(step2Response?.annual_income),
    },
    validationSchema: Yup.object({
      college: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      registerUser({ ...values, actionType: isReduxEmpty ? "c" : "u" });
      const resolvedData = await data;
      if (resolvedData?.output && resolvedData?.output > 0) {
        FatchAgain();
        setEudcationAndCareer(false);
      }
    },
  });


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

  useEffect(() => {
    formik.values.country = selectedCountry;
    formik.values.state = selectedState;
    formik.values.city = selectedCity;
    formik.values.residentialStatus = residentialStatus.id || "";
    formik.values.readyToSettleAbroad = settleAboard.id || "";
    formik.values.education = education.id || "";
    formik.values.occupation = occupation.id || "";
    formik.values.annualIncome = annualIncome.id || "";
  }, [
    annualIncome.id,
    education.id,
    formik.values,
    occupation.id,
    residentialStatus.id,
    selectedCity,
    selectedCountry,
    selectedState,
    settleAboard.id,
  ]);

  const getSelectedCountry = (id: number) => {
    setSelectedCountry(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedState(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedCity(id);
  };

  // useEffect(() => {
  //   if (step2Response && step2Response.College) {
  //     formik.values.college = step2Response.College;
  //   }
  // }, [step2Response, formik.values]);


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
                selectedDataFn={setResidentialStatus}
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
                selectedDataFn={setSettleAbroad}
                title="Ready to settle abroad"
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
                selectedDataFn={setEducation}
                defaultValue={String(step2Response?.education)}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>College Name</Form.Label>
            <div className={classes.inputBox}>
              <li className={classes.blankInput}>
                <Form.Control
                  type="text"
                  name="college"
                  className={classes.inputplacholder}
                  placeholder={"Enter College Name"}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  defaultValue={step2Response?.College}
                />
              </li>
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="Annual Income"
                data={AnnualIncomeProfile}
                nameid="annual_income"
                selectedDataFn={setannualIncome}
                defaultValue={String(step2Response?.annual_income)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setOccupation}
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
