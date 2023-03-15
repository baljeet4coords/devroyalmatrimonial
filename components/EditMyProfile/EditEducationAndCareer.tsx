import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { useHeightConverter } from "../../hooks/utils/useHeightConvert";
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
      dob: "",
      maritalstatus: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [selectedMotherTongue, setSelectedMotherTongue] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const selectedCast = (string: string) => {
    const id = string.split("-")[0];
    // formik.values.cast = id;
  };

  const { feet, cm, handleFeetChange, handleCmChange } = useHeightConverter();

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
                value={"India"}
                placeholder="Country Living in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>State Living in</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                value={"Delhi"}
                placeholder="State Living in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>City Living in</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                value={"Ambikapur"}
                placeholder="City Living in"
              />
            </div>
          </div>

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Residential Status"
              data={ResidentialStatus}
              nameid="residential_status"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Intersting in Setting Aboard"
              data={ReadyToSettleAbroad}
              nameid="residential_status"
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Higest Educations</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={HighestEducationList}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Annual Income</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                value={"Rs. 1-2 Lakh"}
                placeholder="Annual Income"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Employed In"
              data={Employed_In}
              nameid="employed_in"
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Annual Income</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={AnnualIncomeProfile}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
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
