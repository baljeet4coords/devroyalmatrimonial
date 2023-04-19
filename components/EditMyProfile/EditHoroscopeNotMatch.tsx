import { FC } from "react";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import classes from "../MyProfile/Components/RightSectionMyProfile.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { RiLockLine } from "react-icons/ri";
import { useFormik } from "formik";
import { Manglik } from "../../types/enums";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
  step1Response: any;
}
const EditHoroscopeNotMatch: FC<MyComponentProps> = ({ setEditDetails, step1Response }) => {
  const findKeyByValue = (obj: any, value?: string): string => {
    for (let key in obj) {
      if (obj[key] === String(value)) {
        return key;
      }
    }
    return "";
  };


  const [manglik, setManglik] = useState(
    findKeyByValue(Manglik, step1Response?.manglik) || ""
  );

  const formik = useFormik({
    initialValues: {
      sun_sign: "",
      rashi_Moon_Sign: "",
      nakshatra: "",
      horoscope_privacy: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      setEditDetails(false);
    },
  });



  return (
    <>
      <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
        <div className={classes.contactEditSec}>
          <div className={classes.singleBox}>
            <Form.Label>Sun sign</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="sun_sign"
                defaultValue={formik.values.sun_sign}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className={classes.singleBox}>
            <Form.Label>Rashi/Moon Sign</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="rashi_Moon_Sign"
                defaultValue={formik.values.rashi_Moon_Sign}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className={classes.singleBox}>
            <Form.Label>Nakshatra</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="nakshatra"
                defaultValue={formik.values.nakshatra}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Manglik</Form.Label>
            <div className={classes.EditInputSecDisable}>
              <input type="text" disabled placeholder="Non-Manglik" value={manglik} />
              <span>
                {" "}
                <RiLockLine />{" "}
              </span>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Horoscope Privacy</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                name="horoscope_privacy"
                defaultValue={formik.values.horoscope_privacy}
                placeholder="Not filled in"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              title="Save"
              setEditDetails={setEditDetails}
              buttonType={1}
            />
            <EditCustomButton
              title="Cancel"
              setEditDetails={setEditDetails}
              buttonType={0}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default EditHoroscopeNotMatch;
