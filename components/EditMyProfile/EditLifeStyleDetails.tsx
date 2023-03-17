import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import {
  BloodGroup,
  Diet,
  OwnHouseCar,
  Pets,
  SmokeDrink,
  Thalassemia,
} from "../../types/enums";
import { CiPillsBottle1 } from "react-icons/ci";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
}
const EditLifeStyle: FC<MyComponentProps> = ({ setEditDetails }) => {
  //form state
  const formik = useFormik({
    initialValues: {
      diet: "",
      smoking: "",
      drinking: "",
      love_pets: "",
      own_house: "",
      own_car: "",
      blood_group: "",
      thalassemia: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
    },
  });

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
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Diet"
              data={Diet}
              nameid="diet"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Smoking"
              data={SmokeDrink}
              nameid="smoking"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Drinking"
              data={SmokeDrink}
              nameid="drinking"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Love Pets"
              data={Pets}
              nameid="love_pets"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Owns House"
              data={OwnHouseCar}
              nameid="own_house"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Owns Car"
              data={OwnHouseCar}
              nameid="own_car"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Blood Group"
              data={BloodGroup}
              nameid="blood_group"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={() => {}}
              title="Thalassemia "
              data={Thalassemia}
              nameid="thalassemia"
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
