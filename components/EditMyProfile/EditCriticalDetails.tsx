import React, { FC, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FiUserX } from "react-icons/fi";
import { MaritalStatus } from "../../types/enums";
import { useFormik } from "formik";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { DateTimePicker } from "react-rainbow-components";
import { convertDateStringTimeStamp, convertServerTimestamp, convertTimeStamp } from "../../utils/dayjs";
import { useSelector } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import axios from "axios";

interface MyComponentProps {
  setCriticalDetails: (details: boolean) => void;
  step1Response: any;
}

interface Data {
  id?: string;
  val: string;
}
const EditCriticalDetials: FC<MyComponentProps> = ({ setCriticalDetails, step1Response }) => {
  const userId = useSelector(getUserId);
  const [dob, setDob] = useState<Date>(convertTimeStamp(step1Response?.dob || ""));
  const [selectedPhotoName, setSelectedPhotoName] = useState<string>(step1Response?.photo.split("/")[2]);

  console.log(selectedPhotoName);
  

  const formik = useFormik({
    initialValues: {
      userId: userId,
      profilefor: String(step1Response?.profile_for),
      profileHandlerName: step1Response?.profile_handlername,
      selectgender: step1Response?.gender,
      fullname: step1Response?.fullname,
      cast: String(step1Response?.caste),
      challenged: String(step1Response?.challenged),
      isHiv: String(step1Response?.hiv),
      mothertongue: String(step1Response?.mother_tongue),
      religion: String(step1Response?.religion),
      isManglik: String(step1Response?.manglik),
      childrenstatus: String(step1Response?.children_status),
      height: String(step1Response?.height_cm),
      profilepic: selectedPhotoName,
      dob: step1Response && convertServerTimestamp(step1Response?.dob),
      maritalstatus: String(step1Response?.marital_status),
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("userId", String(values.userId));
      formData.append("profilefor", String(values.profilefor));
      formData.append("profileHandlerName", String(values.profileHandlerName));
      formData.append(
        "dob",
        String(values.dob && convertTimeStamp(values.dob))
      );
      formData.append("selectgender", String(values.selectgender));
      formData.append("fullname", String(values.fullname));
      formData.append("cast", String(values.cast));
      formData.append("challenged", String(values.challenged));
      formData.append("isHiv", String(values.isHiv));
      formData.append("mothertongue", String(values.mothertongue));
      formData.append("religion", String(values.religion));
      formData.append("isManglik", String(values.isManglik));
      formData.append("maritalstatus", String(values.maritalstatus));
      formData.append("childrenstatus", String(values.childrenstatus));
      formData.append("height", String(values.height));
      formData.append("profilepic", String(values.profilepic));
      let response;
      formData.append("actionType", "u");
      (response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
        formData
      )),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log(JSON.stringify(values, null, 1));
      setCriticalDetails(false);
    },
  });



  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<Data>({
    id: String(step1Response?.marital_status),
    val: "",
  });

  useEffect(() => {
    formik.values.maritalstatus = selectedMaritalStatus.id || "";
  }, [formik.initialValues, selectedMaritalStatus]);


  const handleDateTimeChange = (value: Date) => {
    setDob(value);
    formik.values.dob = convertDateStringTimeStamp(value);
  };
  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUserX />
            Critical Fields
            <span className={classes.DetailsTypeLeft_subHeading}>
              - Can be edit only once in lifetime
            </span>
          </div>
        </div>
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <Form.Label>Date of Birth</Form.Label>
              <DateTimePicker
                name="dob"
                onChange={handleDateTimeChange}
                placeholder="DD-MM-YYYY HH:MM"
                value={dob}
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
          <div className={classes.editDiscriptions}>
            <p>
              We will not allow any change in date of Birth and marital status
              after you submit this form. So please reconfirm the details
              carefully before submiting.
            </p>
            <p>
              Chagning Date of Birth will invalidate the previously bought
              premium Janampatri or Kundli Milan reports(if any)
            </p>
          </div>
          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              title="Save"
              setEditDetails={setCriticalDetails}
              buttonType={1}
            />
            <EditCustomButton
              title="Cancel"
              setEditDetails={setCriticalDetails}
              buttonType={0}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditCriticalDetials;
