import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import {
  AnnualIncomeProfile,
  MaritalStatus,
  MotherTongue,
} from "../../types/enums";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { MdVerified } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { RiLockLine } from "react-icons/ri";
import { useHeightConverter } from "../../hooks/utils/useHeightConvert";
import CastDataList from "../CastDataList/CastDataList";
import { CastList } from "../../constants/CastList";
import { CountryList } from "../../constants/DesiredData";

interface MyComponentProps {
  setBasicDetails: (details: boolean) => void;
}
const EditBasicDetials: FC<MyComponentProps> = ({ setBasicDetails }) => {
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
            <FiUser />
            Basic Details
          </div>
        </div>
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.singleDropdownContainer}>
            <DropdownGridSingleSelect
              title="Marital Status"
              data={MaritalStatus}
              nameid="maritalstatus"
              selectedDataFn={setSelectedMaritalStatus}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Profile Verification</Form.Label>
            <div className={classes.UserVerified}>
              <span>
                <MdVerified />
                your profile verification is pending
              </span>
              <p>Get verified NOW</p>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Full Name</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                value={"Himanshu singh"}
                placeholder="Full Name"
              />
              <p>
                Show to all <CiSettings />{" "}
              </p>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Gender</Form.Label>
            <div className={classes.EditInputSecDisable}>
              <input
                type="text"
                value={"Male"}
                disabled
                placeholder="Enter Gender"
              />
              <span>
                {" "}
                <RiLockLine />{" "}
              </span>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Religion</Form.Label>
            <div className={classes.EditInputSecDisable}>
              <input
                type="text"
                value={"Hindu"}
                disabled
                placeholder="Enter Gender"
              />
              <span>
                {" "}
                <RiLockLine />{" "}
              </span>
            </div>
          </div>
          <DropdownGridSingleSelect
            title="Mother Tongue"
            data={MotherTongue}
            nameid="mothertongue"
            selectedDataFn={setSelectedMotherTongue}
          />
          <div className={classes.singleBox}>
            <Form.Label>Cast</Form.Label>
            <CastDataList options={CastList} selectedOption={selectedCast} />
          </div>
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
            <Form.Label>Profile Managed By</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                value={"Self"}
                placeholder="Profile Managed By"
              />
            </div>
          </div>

          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              children="Save"
              setEditDetails={setBasicDetails}
              buttonType={1}
            />
            <EditCustomButton
              children="Cancel"
              setEditDetails={setBasicDetails}
              buttonType={0}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditBasicDetials;
