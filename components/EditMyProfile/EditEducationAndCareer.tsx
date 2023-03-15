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
import { AnnualIncomeProfile, Occupation } from "../../types/enums";

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
            <Form.Label>Higest Educations</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={HighestEducationList}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>School Name</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filed in"}
                placeholder="Not filed in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>UG Degree</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={HighestEducationList}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>UG College</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filed in"}
                placeholder="Not filed in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>PG Degree</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={HighestEducationList}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>PG College</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filed in"}
                placeholder="Not filed in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Other UG College</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filed in"}
                placeholder="Not filed in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Other PG College</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filed in"}
                placeholder="Not filed in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Employed in</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={Employed_In}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Occupation</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={Occupation}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Organization Name</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filed in"}
                placeholder="Not filed in"
              />
            </div>
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

          <div className={classes.singleBox}>
            <Form.Label>Intersting in Setting Aboard</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filed in"}
                placeholder="Not filed in"
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
