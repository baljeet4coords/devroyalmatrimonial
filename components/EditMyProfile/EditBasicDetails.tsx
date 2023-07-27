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
import dynamic from "next/dynamic";
// import { useHeightConverter } from "../../hooks/utils/useHeightConvert";
import CastDataList from "../CastDataList/CastDataList";
import { CastList } from "../../constants/CastList";
import { useSelector } from "react-redux";
import { selectStep1Success } from "../../ducks/regiserUser/step1/selectors";
import CastListDropDown from "../CastListDropDown/CastListDropDown";
import { CastListArray } from "../../constants/CastListArray";
import {
  convertDateStringTimeStamp,
  convertServerTimestamp,
  convertTimeStamp,
} from "../../utils/dayjs";
import { getUserId } from "../../ducks/auth/selectors";
const DateTimePicker = dynamic(
  () => import("react-rainbow-components/components/DateTimePicker"),
  { ssr: false } as any
);
import HeightInput from "../InputField/HeightFeetToCmSingle/HeightFeetToCmSingle";
import { useStep1Register } from "../../hooks/useRegister/useStep1";

interface MyComponentProps {
  setBasicDetails: (details: boolean) => void;
  step1Response: any;
  FatchAgain: () => void;
}
interface Data {
  id?: string;
  val: string;
}
const EditBasicDetials: FC<MyComponentProps> = ({
  setBasicDetails,
  step1Response,
  FatchAgain,
}) => {
  // const stepOneDefaultValues = useSelector(selectStep1Success);
  // const step1Response = stepOneDefaultValues?.jsonResponse;
  const userId = useSelector(getUserId);
  const isReduxEmpty =
    step1Response && Object.values(step1Response).every((value) => !value);
  const { registerUserMutation, Step1Query } = useStep1Register();

  const [selectedProfileFor, setSelectedProfileFor] = useState<Data>({
    id: String(step1Response?.profile_for),
    val: "",
  });
  const [selectedChallenged, setSelectedChallenged] = useState<Data>({
    id: String(step1Response?.challenged),
    val: "",
  });
  const [selectedIsHiv, setSelectedIsHiv] = useState<Data>({
    id: String(step1Response?.hiv),
    val: "",
  });
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<Data>({
    id: String(step1Response?.mother_tongue),
    val: "",
  });
  const [selectedReligion, setSelectedReligion] = useState<Data>({
    id: String(step1Response?.religion),
    val: "",
  });
  const [selectedManglik, setSelectedManglik] = useState<Data>({
    id: String(step1Response?.manglik),
    val: "",
  });
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<Data>({
    id: String(step1Response?.marital_status),
    val: "",
  });
  const [selectedChildrenStatus, setSelectedChildrenStatus] = useState<Data>({
    id: String(step1Response?.children_status),
    val: "",
  });
  const [selectedCast, setSelectedCast] = useState<Data>({
    val: "",
    id: String(step1Response?.caste),
  });
  const [selectedPhotoName, setSelectedPhotoName] = useState<string>("");
  const [image, setImage] = useState<Blob | string>("");
  const [dob, setDob] = useState<Date>(
    convertTimeStamp(step1Response?.dob) || ""
  );
  const [heightSelectedVal, setheightSelectedVal] = useState<number | null>(0);

  const formik = useFormik({
    initialValues: {
      userId: userId,
      profilefor: String(step1Response?.profile_for),
      profileHandlerName: step1Response?.profile_handlername,
      dob: dob,
      selectgender: step1Response?.gender || "F",
      fullname: step1Response?.fullname,
      cast: String(step1Response?.caste),
      challenged: String(step1Response?.challenged),
      isHiv: String(step1Response?.hiv),
      mothertongue: String(step1Response?.mother_tongue),
      religion: String(step1Response?.religion),
      isManglik: String(step1Response?.manglik),
      maritalstatus: String(step1Response?.marital_status),
      childrenstatus: String(step1Response?.children_status),
      height: String(step1Response?.height_cm),
      profilepic: selectedPhotoName,
    },
    onSubmit: async (values) => {
      const mutationResult = await registerUserMutation.mutateAsync({
        ...values,
        image,
        isReduxEmpty,
      });
      if (mutationResult?.output && mutationResult?.output > 0) {
        FatchAgain();
        setBasicDetails(false);
      }
    },
  });

  useEffect(() => {
    formik.values.profilefor = selectedProfileFor.id || "";
    formik.values.challenged = selectedChallenged.id || "";
    formik.values.isHiv = selectedIsHiv.id || "";
    formik.values.mothertongue = selectedMotherTongue.id || "";
    formik.values.religion = selectedReligion.id || "";
    formik.values.isManglik = selectedManglik.id || "";
    formik.values.maritalstatus = selectedMaritalStatus.id || "";
    formik.values.cast = selectedCast.id || "";
  }, [
    formik.values,
    selectedProfileFor.id,
    selectedChallenged.id,
    selectedIsHiv.id,
    selectedMotherTongue.id,
    selectedReligion.id,
    selectedManglik.id,
    selectedMaritalStatus.id,
    selectedCast.id,
  ]);

  useEffect(() => {
    if (selectedMaritalStatus.id) {
      if (selectedMaritalStatus?.id <= "2") {
        formik.values.childrenstatus = "1";
      } else {
        formik.values.childrenstatus = selectedChildrenStatus.id || "";
      }
    }
  }, [formik.values, selectedChildrenStatus.id, selectedMaritalStatus.id]);

  function getKeyByValue(value: string, enumObject: any) {
    for (const [key, val] of Object.entries(enumObject)) {
      if (val === value) {
        return key.replaceAll("_", " ");
      }
    }
  }

  const profilePicture = (imageName: string, file: null | Blob) => {
    setSelectedPhotoName(imageName);
    file && setImage(file);
  };

  useEffect(() => {
    if (selectedProfileFor?.id == "2" || selectedProfileFor?.id == "5") {
      formik.values.selectgender = "M";
    }
    if (selectedProfileFor?.id == "3" || selectedProfileFor?.id == "4") {
      formik.values.selectgender = "F";
    }
  }, [formik.values, selectedProfileFor]);

  useEffect(() => {
    if (step1Response) setDob(convertTimeStamp(step1Response?.dob));
  }, [step1Response, step1Response?.dob]);

  useEffect(() => {
    if (step1Response && step1Response.fullname) {
      formik.values.fullname = step1Response.fullname;
    }
    if (step1Response && step1Response.profile_handlername) {
      formik.values.profileHandlerName = step1Response.profile_handlername;
    }
    if (step1Response && step1Response.gender) {
      formik.values.selectgender = step1Response.gender;
    }
    if (step1Response && step1Response.photo) {
      const fileName = step1Response.photo.split("/").pop();
      if (fileName) {
        setSelectedPhotoName(fileName);
        formik.values.profilepic = fileName;
      } else {
        setSelectedPhotoName("");
      }
    }
    if (step1Response && step1Response.height_cm) {
      formik.values.height = String(step1Response.height_cm);
    }
  }, [step1Response]);

  const handleDateTimeChange = (value: Date) => {
    if (value.getFullYear() <= 2005) {
      setDob(value);
      formik.values.dob = convertDateStringTimeStamp(value);
    }
  };

  const onHeightChange = (height: number | null) => {
    formik.values.height = String(height);
    setheightSelectedVal(height);
  };

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
            <Form.Label>Profile For</Form.Label>
            <div className={classes.EditInputSecDisable}>
              <input
                type="text"
                value={getKeyByValue(
                  String(step1Response?.profile_for),
                  ProfileFor
                )}
                disabled
                name="profilefor"
                placeholder="Enter Gender"
              />
              <span>
                {" "}
                <RiLockLine />{" "}
              </span>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Groom Name</Form.Label>
            <div className={classes.EditInputSec}>
              <li className={classes.blankInput}>
                <Form.Control
                  name="fullname"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  defaultValue={step1Response?.fullname}
                  className="text-capitalize"
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
                value={step1Response?.gender == "M" ? "Male" : "Female"}
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
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <Form.Label>Date of Birth</Form.Label>
              <DateTimePicker
                name="dob"
                onChange={handleDateTimeChange}
                placeholder="DD-MM-YYYY HH:MM"
                value={formik.values.dob}
              />
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
          <div className={classes.heightwrapper}>
            <HeightInput
              label="Height"
              onHeightChange={onHeightChange}
              defaultValue={step1Response && +step1Response?.height_cm}
            />
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="Challenged"
                data={Challenged}
                nameid="challenged"
                selectedDataFn={setSelectedChallenged}
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
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                title="Religion"
                data={Religion}
                nameid="mothertongue"
                selectedDataFn={setSelectedReligion}
                defaultValue={String(step1Response?.religion)}
              />
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
              <DropdownGridSingleSelect
                title="Marital Status"
                data={MaritalStatus}
                nameid="maritalstatus"
                selectedDataFn={setSelectedMaritalStatus}
                defaultValue={String(step1Response?.marital_status)}
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
