import { FC } from "react";
import { Form } from "react-bootstrap";
import classes from "../MyProfile/Components/RightSectionMyProfile.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { RiLockLine } from "react-icons/ri";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
}
const EditHoroscopeMatch: FC<MyComponentProps> = ({ setEditDetails }) => {

  return (
    <>
     <div className={classes.contactEditSec}>
            <div className={classes.singleBox}>
              <Form.Label>Date of Bitrh</Form.Label>
              <div className={classes.EditInputSecDisable}>
                <input type="text" disabled placeholder="Fer 13,1992" />
                <span>
                  {" "}
                  <RiLockLine />{" "}
                </span>
              </div>
            </div>

            <div className={classes.singleBox}>
              <Form.Label>Place of Birth</Form.Label>
              <div className={classes.EditInputSec}>
                <input type="text" placeholder="Not filled in" />
              </div>
            </div>

            <div className={classes.singleBox}>
              <Form.Label>Time of Birth</Form.Label>
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
    </>
  );
};

export default EditHoroscopeMatch;
