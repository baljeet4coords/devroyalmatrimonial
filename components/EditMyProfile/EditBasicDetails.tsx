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
  ProfileFor,
  Religion,
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
import CastListDropDown from "../CastListDropDown/CastListDropDown";
import { CastListArray } from "../../constants/CastListArray";

interface MyComponentProps {
  setBasicDetails: (details: boolean) => void;
  step1Response: any;
}
interface Data {
  id?: string;
  val: string;
}
const EditBasicDetials: FC<MyComponentProps> = ({ setBasicDetails, step1Response }) => {
  const stepOneDefaultValues = useSelector(selectStep1Success);
  const jsonData = stepOneDefaultValues?.jsonResponse;


  const formik = useFormik({
    initialValues: {
      profileVerification: false,
      fullname: "Himanshu singh",
      gender: step1Response?.gender == "M" ? "Male" : "Female",
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
    id?: string;
    val: string;
  }>({ id: String(jsonData?.manglik), val: "" });
  const [selectedIsHiv, setSelectedIsHiv] = useState<{
    id?: string;
    val: string;
  }>({ id: String(jsonData?.hiv), val: "" });
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedchallenged, setSelectedchallenged] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedProfileFor, setSelectedProfileFor] = useState<Data>({
    id: String(step1Response?.profile_for),
    val: "",
  });
  // const selectedCast = (string: string) => {
  //   // const id = string.split("-")[0];
  //   const val = string.split("-")[1];
  //   formik.values.cast = val;
  // };
  const [selectedCast, setSelectedCast] = useState<Data>({
    val: "",
    id: String(jsonData?.caste),
  });

  const findKeyByValue = (obj: any, value?: string): string => {
    for (let key in obj) {
      if (obj[key] === String(value)) {
        return key;
      }
    }
    return "";
  };

  const [religion, setReligion] = useState(
    findKeyByValue(Religion, step1Response?.religion) || ""
  );
  const { feet, cm, handleFeetChange, handleCmChange } = useHeightConverter();

  useEffect(() => {
    (formik.values.height = cm),
      (formik.values.challenged = selectedchallenged.val),
      (formik.values.isHiv = selectedIsHiv.val),
      (formik.values.mothertongue = selectedMotherTongue.val),
      (formik.values.religion = selectedMotherTongue.val),
      (formik.values.isManglik = selectedManglik.val),
      (formik.values.cast = selectedCast?.id || '');
  }, [
    cm,
    selectedchallenged,
    selectedIsHiv,
    selectedMotherTongue,
    selectedManglik,
    formik.values,
    selectedCast,
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
              <li className={classes.blankInput}>
                <Form.Control
                  name="profileHandlerName"
                  type="text"
                  placeholder="Enter your name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  defaultValue={step1Response?.fullname}
                  autoComplete="off"
                />
              </li>
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
            <CastListDropDown
              data={CastListArray}
              selectedDataFn={setSelectedCast}
              title="Caste"
              nameid={"Caste"}
              defaultValue={String(step1Response?.caste)}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Height</Form.Label>
            <div className={classes.inputBox}>
              <Form.Control
                name="height"
                type="number"
                placeholder={`${cm} in cms`}
                onBlur={formik.handleBlur}
                onChange={handleCmChange}
                defaultValue={step1Response?.height_cm}
              />
              <Form.Control
                name="height"
                type="text"
                placeholder={`${feet} in ft.`}
                onBlur={formik.handleBlur}
                onChange={handleFeetChange}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="Challenged"
                data={Challenged}
                nameid="challenged"
                selectedDataFn={setSelectedchallenged}
                defaultValue={String(step1Response?.challenged)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="HIV"
                data={isHiv}
                nameid="hiv"
                selectedDataFn={setSelectedIsHiv}
                defaultValue={String(step1Response?.hiv)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="MotherTongue"
                data={MotherTongue}
                nameid="mothertongue"
                selectedDataFn={setSelectedMotherTongue}
                defaultValue={String(step1Response?.mother_tongue)}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Religion</Form.Label>
            <div className={classes.EditInputSecDisable}>
              <input
                type="text"
                value={religion}
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

          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="Add Manglik"
                data={Manglik}
                nameid="addmanglik"
                selectedDataFn={setSelectedManglik}
                defaultValue={String(step1Response?.manglik)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <Form.Label>Profile Managed For</Form.Label>
              <DropdownGridSingleSelect
                title=""
                data={ProfileFor}
                nameid="profilefor"
                selectedDataFn={setSelectedProfileFor}
                defaultValue={String(step1Response?.profile_for)}
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
