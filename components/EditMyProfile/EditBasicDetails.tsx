import { FC } from "react";
import { useState, useEffect } from "react";
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
      profileVerification: false,
      fullname: "Himanshu singh",
      gender: "Male",
      cast: "",
      height: "",
      challenged: "",
      isHiv: "",
      mothertongue: "",
      religion: "",
      isManglik: "",
      profilefor: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      setBasicDetails(false);
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
  const [selectedchallenged, setSelectedchallenged] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const selectedCast = (string: string) => {
    // const id = string.split("-")[0];
    const val = string.split("-")[1];
    formik.values.cast = val;
  };

  const { feet, cm, handleFeetChange, handleCmChange } = useHeightConverter();

  useEffect(() => {
    (formik.values.height = cm),
      (formik.values.challenged = selectedchallenged.val),
      (formik.values.isHiv = selectedIsHiv.val),
      (formik.values.mothertongue = selectedMotherTongue.val),
      (formik.values.religion = selectedMotherTongue.val),
      (formik.values.isManglik = selectedManglik.val);
  }, [
    cm,
    selectedchallenged,
    selectedIsHiv,
    selectedMotherTongue,
    selectedManglik,
    formik.values,
  ]);

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
              {formik.initialValues.profileVerification ? (
                <p>Verified</p>
              ) : (
                <p>Get verified NOW</p>
              )}
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Full Name</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                name="fullname"
                type="text"
                placeholder="Enter Full Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                defaultValue={formik.initialValues.fullname}
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
                value={formik.initialValues.gender}
                disabled
                name="gender"
                placeholder="Enter Gender"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
            <DropdownGridSingleSelect
              title="Challenged"
              data={Challenged}
              nameid="challenged"
              selectedDataFn={setSelectedchallenged}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              title="HIV"
              data={isHiv}
              nameid="hiv"
              selectedDataFn={setSelectedIsHiv}
              defaultValue={jsonData?.hiv}
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              title="MotherTongue"
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
                onBlur={formik.handleBlur}
                onChange={handleCmChange}
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
                defaultValue={formik.initialValues.profilefor}
                placeholder="Profile Managed By"
                name="profilefor"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              title="Save"
              setEditDetails={setBasicDetails}
              buttonType={1}
            />
            <EditCustomButton
              title="Cancel"
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
