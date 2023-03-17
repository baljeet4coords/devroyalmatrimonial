import { FC } from "react";
import { useState, useEffect } from "react";
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
  const [selectedDiet, setSelectedDiet] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedSmoking, setSelectedSmoking] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedDrinking, setSelectedDrinking] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedLovePets, setSelectedLovePets] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedOwnsHouse, setSelectedOwnsHouse] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedOwnsCar, setSelectedOwnsCar] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedBloodGroup, setSelectedBloodGroup] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const [selectedThalassemia, setSelectedThalassemia] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  //form state

  const formik = useFormik({
    initialValues: {
      diet: selectedDiet?.val,
      smoking: selectedSmoking?.val,
      drinking: selectedDrinking?.val,
      love_pets: selectedLovePets?.val,
      own_house: selectedOwnsHouse?.val,
      own_car: selectedOwnsCar?.val,
      blood_group: selectedBloodGroup?.val,
      thalassemia: selectedThalassemia?.val,
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      setEditDetails(false);
    },
  });

  useEffect(() => {
    formik.values.diet = selectedDiet.val;
    formik.values.smoking = selectedSmoking.val;
    formik.values.drinking = selectedDrinking.val;
    formik.values.love_pets = selectedLovePets.val;
    formik.values.own_house = selectedOwnsCar.val;
    formik.values.own_car = selectedOwnsCar.val;
    formik.values.blood_group = selectedBloodGroup.val;
    formik.values.thalassemia = selectedThalassemia.val;
  }, [
    selectedDiet.id,
    selectedSmoking.id,
    selectedDrinking.id,
    selectedLovePets.id,
    selectedOwnsCar.id,
    selectedOwnsCar.id,
    selectedBloodGroup.id,
    selectedThalassemia.id,
    formik.values,
  ]);

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
              selectedDataFn={setSelectedDiet}
              title="Diet"
              data={Diet}
              nameid="diet"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedSmoking}
              title="Smoking"
              data={SmokeDrink}
              nameid="smoking"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedDrinking}
              title="Drinking"
              data={SmokeDrink}
              nameid="drinking"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedLovePets}
              title="Love Pets"
              data={Pets}
              nameid="love_pets"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedOwnsHouse}
              title="Owns House"
              data={OwnHouseCar}
              nameid="own_house"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedOwnsCar}
              title="Owns Car"
              data={OwnHouseCar}
              nameid="own_car"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedBloodGroup}
              title="Blood Group"
              data={BloodGroup}
              nameid="blood_group"
            />
          </div>
          <div className={classes.singleBox}>
            <DropdownGridSingleSelect
              selectedDataFn={setSelectedThalassemia}
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
