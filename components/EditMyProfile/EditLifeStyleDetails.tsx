import { FC } from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";
import {
  BloodGroup,
  CarType,
  Diet,
  HouseType,
  OwnHouseCar,
  Pets,
  SmokeDrink,
  Thalassemia,
} from "../../types/enums";
import { CiPillsBottle1 } from "react-icons/ci";
import * as Yup from "yup";
import { selectStep3Success } from "../../ducks/regiserUser/step3/selectors";
import { useSelector } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import SingleInput from "../InputField/SingleInputField";
import { useStep3Register } from "../../hooks/useRegister/useStep3";



interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
  step3Response: any;
  FatchAgain: () => void;
}

interface Data {
  id?: string | null;
  val: string;
}

const EditLifeStyle: FC<MyComponentProps> = ({ setEditDetails, step3Response, FatchAgain }) => {
  const userId = useSelector(getUserId);
  const stepThreeDefaultValues = useSelector(selectStep3Success);
  const jsonData = stepThreeDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const { registerUserMutation, Step3Query } = useStep3Register();


  const [diet, setDiet] = useState<Data>({
    id: String(step3Response?.diet),
    val: "",
  });

  const [smoking, setSmoking] = useState<Data>({
    id: String(step3Response?.smoking),
    val: "",
  });

  const [drinking, setDrinking] = useState<Data>({
    id: String(step3Response?.drinking),
    val: "",
  });

  const [lovePets, setLovePets] = useState<Data>({
    id: String(step3Response?.love_pets),
    val: "",
  });

  const [ownsHouse, setOwnsHouse] = useState<Data>({
    id: String(step3Response?.Owns_house),
    val: "",
  });

  const [ownsCar, setOwnsCar] = useState<Data>({
    id: String(step3Response?.Owns_car),
    val: "",
  });

  const [bloodGroup, setBloodGroup] = useState<Data>({
    id: String(step3Response?.blood_group),
    val: "",
  });

  const [thalassemia, setThalassemia] = useState<Data>({
    id: String(step3Response?.Thalassemia),
    val: "",
  });

  const [housetype, setHousetype] = useState<string[]>(
    step3Response?.home_type || []
  );
  const [cartype, setCartype] = useState<string[]>(
    step3Response?.car_details || []
  );

  //form state

  const formik = useFormik({
    initialValues: {
      userId: userId,
      diet: String(step3Response?.diet),
      smoking: String(step3Response?.smoking),
      drinking: String(step3Response?.drinking),
      lovePets: String(step3Response?.love_pets),
      ownsHouse: String(step3Response?.Owns_house),
      ownsCar: String(step3Response?.Owns_car),
      bloodGroup: String(step3Response?.blood_group),
      thalassemia: String(step3Response?.Thalassemia),
      religiousBelief: step3Response?.religious_belief,
      cartype: step3Response?.car_details || null,
      housetype: step3Response?.home_type || null,
    },
    validationSchema: Yup.object({
      religiousBelief: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const mutationResult = await registerUserMutation.mutateAsync({
        ...values,
        actionType: isReduxEmpty ? "c" : "u",
        housetype: JSON.stringify(housetype),
        cartype: JSON.stringify(cartype),
      });
      if (mutationResult?.output && mutationResult?.output > 0) {
        FatchAgain();
        setEditDetails(false);
      }
    },
  });

  useEffect(() => {
    formik.values.diet = diet.id || "";
    formik.values.smoking = smoking.id || "";
    formik.values.drinking = drinking.id || "";
    formik.values.lovePets = lovePets.id || "";
    formik.values.ownsHouse = ownsHouse.id || "";
    formik.values.ownsCar = ownsCar.id || "";
    formik.values.bloodGroup = bloodGroup.id || "";
    formik.values.thalassemia = thalassemia.id || "";
  }, [
    bloodGroup.id,
    diet.id,
    drinking.id,
    formik.values,
    lovePets.id,
    ownsCar.id,
    ownsHouse.id,
    smoking.id,
    thalassemia.id,
    cartype,
    housetype,
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

          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setDiet}
                title="Diet"
                data={Diet}
                nameid="diet"
                defaultValue={String(step3Response?.diet)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setSmoking}
                title="Smoking"
                data={SmokeDrink}
                nameid="smoking"
                defaultValue={String(step3Response?.smoking)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setDrinking}
                title="Drinking"
                data={SmokeDrink}
                nameid="drinking"
                defaultValue={String(step3Response?.drinking)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setLovePets}
                title="Love Pets"
                data={Pets}
                nameid="lovePets"
                defaultValue={String(step3Response?.love_pets)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setOwnsHouse}
                title="Owns House"
                data={OwnHouseCar}
                nameid="ownsHouse"
                defaultValue={String(step3Response?.Owns_house)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              {ownsHouse && ownsHouse?.id == "1" && (
                <SingleInput
                  data={HouseType}
                  inputName={"Type of House"}
                  onChange={setHousetype}
                  defaultValues={step3Response?.home_type || []
                  }
                  isFromRegistered={true}
                />
              )}
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setOwnsCar}
                title="Owns Car"
                data={OwnHouseCar}
                nameid="ownsCar"
                defaultValue={String(step3Response?.Owns_car)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              {ownsCar && ownsCar?.id == "1" && (
                <SingleInput
                  data={CarType}
                  inputName={"Type of car"}
                  onChange={setCartype}
                  defaultValues={step3Response?.car_details || []
                  }
                  isFromRegistered={true}
                />
              )}
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setBloodGroup}
                title="Blood Group"
                data={BloodGroup}
                nameid="bloodGroup"
                defaultValue={String(step3Response?.blood_group)}
              />
            </div>
          </div>
          <div className={classes.singleBoxWrapper}>
            <div className={classes.singleBox}>
              <DropdownGridSingleSelect
                selectedDataFn={setThalassemia}
                title="Thalassemia "
                data={Thalassemia}
                nameid="thalassemia"
                defaultValue={String(step3Response?.Thalassemia)}
              />
            </div>
          </div>

          <div className={classes.singleBox}>
            <Form.Label>Religious Belief</Form.Label>
            <div className={classes.inputBox}>
              <li className={classes.blankInput}>
                <Form.Control
                  type="text"
                  name="religiousBelief"
                  className={classes.inputplacholder}
                  placeholder={"About Religious Belief"}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  defaultValue={step3Response?.religious_belief}
                />
              </li>

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
        </Form>
      </div>
    </>
  );
};

export default EditLifeStyle;
