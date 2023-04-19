import { FC } from "react";
import { Form } from "react-bootstrap";
import classes from "../MyProfile/Components/RightSectionMyProfile.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { MdVerified } from "react-icons/md";
import { RiLockLine } from "react-icons/ri";
import { useFormik } from "formik";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
  step1Response :any;
}
const EditContact: FC<MyComponentProps> = ({ setEditDetails ,step1Response }) => {
  const formik = useFormik({
    initialValues: {
      dob: "",
      maritalstatus: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setEditDetails(false);
    },
  });
  
  return (
    <>
      <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
        <div className={classes.contactEditSec}>
          <div className={classes.singleBox}>
            <Form.Label>Profile Verification</Form.Label>
            <div className={classes.UserVerified}>
              <span>
                <MdVerified />
                Email verification is pending
              </span>
              <p>Get verified NOW</p>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Alternate Email id</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Mobile No.</Form.Label>
            <div className={classes.EditInputSecDisable}>
              <input type="text" disabled placeholder="+91-********28" value={step1Response?.mobile} />
              <span>
                {" "}
                <RiLockLine />{" "}
              </span>
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Alternate No.</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Landline No.</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Suitable time to call</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Contact Address</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Parent&apos;s Address</Form.Label>
            <div className={classes.EditInputSec}>
              <input type="text" placeholder="Not filled in" />
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

export default EditContact;
