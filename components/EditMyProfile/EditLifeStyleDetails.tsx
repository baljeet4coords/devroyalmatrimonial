import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import { BloodGroup, Challenged, FamilyIncome } from "../../types/enums";
import { CiPillsBottle1 } from "react-icons/ci";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
}
const EditLifeStyle: FC<MyComponentProps> = ({ setEditDetails }) => {
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

  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <CiPillsBottle1 />
            LifeStyle
          </div>
        </div>
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.singleBox}>
            <Form.Label>Dietary Habits</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Drinking Habits</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Smoking Habits</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Open to Pets?</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Own a House?</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Own a Car?</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Languages I Speak</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Blood Group</Form.Label>
            <DropdownGridSingleSelect
              title=""
              data={BloodGroup}
              nameid="mothertongue"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>HIV+?</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
            </div>
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Thalassemia</Form.Label>
            <div className={classes.EditInputSec}>
              <input
                type="text"
                // value={"Not filled in"}
                placeholder="Not filled in"
              />
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
        </Form>
      </div>
    </>
  );
};

export default EditLifeStyle;
