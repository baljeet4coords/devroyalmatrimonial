import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import {
  AnnualIncomeProfile,
  Challenged,
  isHiv,
  Manglik,
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
import { useSelector } from "react-redux";
import { selectStep1Success } from "../../ducks/regiserUser/step1/selectors";

interface MyComponentProps {
  setBasicDetails: (details: boolean) => void;
}
const EditBasicDetials: FC<MyComponentProps> = ({ setBasicDetails }) => {
  const stepOneDefaultValues = useSelector(selectStep1Success);
  const jsonData = stepOneDefaultValues?.jsonResponse;

  const formik = useFormik({
    initialValues: {
      dob: "",
      maritalstatus: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [selectedManglik, setSelectedManglik] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.manglik), val: "" });
  const [selectedIsHiv, setSelectedIsHiv] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.hiv), val: "" });
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
            <Form.Label>Cast</Form.Label>
            <CastDataList options={CastList} selectedOption={selectedCast} />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Height</Form.Label>
            <div className={classes.inputBox}>
              <li className={`${classes.blankInput} d-flex`}>
                <Form.Control
                  name="height"
                  type="text"
                  placeholder={`${cm} in cms`}
                  onBlur={formik.handleBlur}
                  onChange={handleCmChange}
                  defaultValue={jsonData?.height_cm}
                />
                <Form.Control
                  name="height"
                  type="text"
                  placeholder={`${feet} in ft.`}
                  onBlur={formik.handleBlur}
                  onChange={handleFeetChange}
                />
              </li>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Challenged</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={Challenged}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>HIV</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={isHiv}
              nameid="hiv"
              selectedDataFn={setSelectedIsHiv}
              defaultValue={jsonData?.hiv}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>MotherTongue</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={MotherTongue}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
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

          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              title="Add Manglik"
              data={Manglik}
              nameid="addmanglik"
              selectedDataFn={setSelectedManglik}
              defaultValue={jsonData?.manglik}
            />
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
