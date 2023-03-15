import { FC } from "react";
import { Form } from "react-bootstrap";
import classes from "../MyProfile/Components/RightSectionMyProfile.module.scss";
import EditCustomButton from "../Button/EditCustomButton";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
}
const EditHoroscopeNotMatch: FC<MyComponentProps> = ({ setEditDetails }) => {

  return (
    <>
    <div className={classes.contactEditSec}>
            <div className={classes.singleBox}>
              <Form.Label>Sun sign</Form.Label>
              <div className={classes.EditInputSec}>
                <input type="text" placeholder="Not filled in" />
              </div>
            </div>

            <div className={classes.singleBox}>
              <Form.Label>Rashi/Moon Sign</Form.Label>
              <div className={classes.EditInputSec}>
                <input type="text" placeholder="Not filled in" />
              </div>
            </div>

            <div className={classes.singleBox}>
              <Form.Label>Nakshatra</Form.Label>
              <div className={classes.EditInputSec}>
                <input type="text" placeholder="Not filled in" />
              </div>
            </div>

            <div className={classes.singleBox}>
              <Form.Label>Manglik</Form.Label>
              <div className={classes.EditInputSec}>
                <input type="text" placeholder="Non-Manglik" />
              </div>
            </div>
            <div className={classes.singleBox}>
              <Form.Label>Horoscope Privacy</Form.Label>
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

export default EditHoroscopeNotMatch;