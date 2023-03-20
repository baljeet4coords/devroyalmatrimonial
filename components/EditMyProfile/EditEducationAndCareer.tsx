import { FC, useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { Employed_In, HighestEducationList } from "../../constants/DesiredData";
import { BiBook } from "react-icons/bi";
import {
  AnnualIncomeProfile,
  Occupation,
  ReadyToSettleAbroad,
  ResidentialStatus,
} from "../../types/enums";

interface MyComponentProps {
  setEudcationAndCareer: (details: boolean) => void;
}
const EditEducationAmdCareer: FC<MyComponentProps> = ({
  setEudcationAndCareer,
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
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedSettingAboard, setSelectedSettingAboard] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedHigestEducations, setSelectedHigestEducations] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedAnnualIncome, setSelectedAnnualIncome] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const [SelectedEmployedIn, setSelectedEmployedIn] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  useEffect(() => {
    (formik.values.residential_status = selectedResidentialStatus.val),
      (formik.values.setting_aboard = selectedSettingAboard.val),
      (formik.values.highest_education = selectedHigestEducations.id),
      (formik.values.annual_income = selectedAnnualIncome.val),
      (formik.values.employed_in = SelectedEmployedIn.id);
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
          <div className={classes.singleBox}>
            <Form.Label>Country Living in</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                defaultValue={formik.initialValues.country}
                name="country"
                placeholder="Country Living in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>State Living in</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="state"
                defaultValue={formik.initialValues.state}
                placeholder="State Living in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>City Living in</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="city"
                defaultValue={formik.initialValues.city}
                placeholder="City Living in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedResidentialStatus}
              title="Residential Status"
              data={ResidentialStatus}
              nameid="residential_status"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedSettingAboard}
              title="Intersting in Setting Aboard"
              data={ReadyToSettleAbroad}
              nameid="setting_aboard"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              title="Higest Educations"
              data={HighestEducationList}
              nameid="highest_education"
              selectedDataFn={setSelectedHigestEducations}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              title="Annual Income"
              data={AnnualIncomeProfile}
              nameid="annual_income"
              selectedDataFn={setSelectedAnnualIncome}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedEmployedIn}
              title="Employed In"
              data={Employed_In}
              nameid="employed_in"
            />
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
