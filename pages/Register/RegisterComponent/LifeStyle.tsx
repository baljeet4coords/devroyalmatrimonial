import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import classes from "./Component.module.scss";
import Form from "react-bootstrap/Form";
import RightSection from "./RightSection/RightSection";
import { DropdownGridSingleSelect } from "../../../components";
import {
  BloodGroup,
  CarType,
  Diet,
  HouseType,
  OwnHouseCar,
  Pets,
  SmokeDrink,
  Thalassemia,
} from "../../../types/enums";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../ducks/auth/selectors";
import {
  selectStep3Loading,
  selectStep3Success,
} from "../../../ducks/regiserUser/step3/selectors";
import { step3 } from "../../../ducks/regiserUser/step3/actions";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { updateProfileCompleteness } from "../../../ducks/profileCompletion/actions";
import { selectProfileCompletion } from "../../../ducks/profileCompletion/selector";
import router from "next/router";
import { isNull } from "lodash";
import * as Yup from "yup";
import SingleInput from "../../../components/InputField/SingleInputField";
import { useStep3Register } from "../../../hooks/useRegister/useStep3";


interface ProfileDetailsProps {
  nextPage: (a: number) => void;
  DisabledHeadingMessage?: (a: number) => void;
  profileComplete: number;
}
interface Data {
  id?: string | null;
  val: string;
}
interface ResponData {
  output: number;
  message: string;
  jsonResponse: null;
  status: number
}
const LifeStyle: React.FC<ProfileDetailsProps> = ({
  nextPage,
  profileComplete,
  DisabledHeadingMessage,
}) => {
  const dispatch = useDispatch();
  const stepThreeDefaultValues = useSelector(selectStep3Success);
  const isLoading = useSelector(selectStep3Loading);
  const jsonData = stepThreeDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);
  const { registerUserMutation, Step3Query } = useStep3Register();



  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    dispatch(step3({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);

  const [skiploadingSpiner, setSkiploadingSpiner] = useState(false);
  const [loadingSpiner, setloadingSpiner] = useState(false);
  const [nextDisable, setNextDisable] = useState<boolean>(true);

  const [diet, setDiet] = useState<Data>({
    id: String(jsonData?.diet),
    val: "",
  });

  const [smoking, setSmoking] = useState<Data>({
    id: String(jsonData?.smoking),
    val: "",
  });

  const [drinking, setDrinking] = useState<Data>({
    id: String(jsonData?.drinking),
    val: "",
  });

  const [lovePets, setLovePets] = useState<Data>({
    id: String(jsonData?.love_pets),
    val: "",
  });

  const [ownsHouse, setOwnsHouse] = useState<Data>({
    id: String(jsonData?.Owns_house),
    val: "",
  });

  const [ownsCar, setOwnsCar] = useState<Data>({
    id: String(jsonData?.Owns_car),
    val: "",
  });

  const [bloodGroup, setBloodGroup] = useState<Data>({
    id: String(jsonData?.blood_group),
    val: "",
  });

  const [thalassemia, setThalassemia] = useState<Data>({
    id: String(jsonData?.Thalassemia),
    val: "",
  });

  // const [ReligiousBelief, setReligiousBelief] = useState<string>(
  //   jsonData?.religious_belief !== undefined
  //     ? String(jsonData.religious_belief)
  //     : ""
  // );
  const [housetype, setHousetype] = useState<string[]>(
    jsonData?.home_type || []
  );
  const [cartype, setCartype] = useState<string[]>(jsonData?.car_details || []);

  useEffect(() => {
    if (ownsCar.id == "2") {
      setCartype([]);
    }
    if (ownsHouse.id == "2") {
      setHousetype([]);
    }
  }, [ownsCar.id, ownsHouse.id]);

  const formik = useFormik({
    initialValues: {
      userId: userId,
      diet: jsonData?.diet,
      smoking: jsonData?.smoking,
      drinking: jsonData?.drinking,
      lovePets: jsonData?.love_pets,
      ownsHouse: jsonData?.Owns_house,
      ownsCar: jsonData?.Owns_car,
      bloodGroup: jsonData?.blood_group,
      thalassemia: jsonData?.Thalassemia,
      religiousBelief: jsonData?.religious_belief,
      cartype: jsonData?.car_details || null,
      housetype: jsonData?.home_type || null,
    },
    validationSchema: Yup.object({
      religiousBelief: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setloadingSpiner(true);
      const mutationResult = await registerUserMutation.mutateAsync({
        ...values,
        actionType: isReduxEmpty ? "c" : "u",
        housetype: JSON.stringify(housetype),
        cartype: JSON.stringify(cartype),
      });
      if (mutationResult?.output && mutationResult?.output > 0) {
        nextPage(3);
        setloadingSpiner(false);
      } else {
        setloadingSpiner(false);
      }
    }
  });

  useEffect(() => {
    formik.values.diet = (diet.id && +diet.id) || undefined;
    formik.values.smoking = (smoking.id && +smoking.id) || undefined;
    formik.values.drinking = (drinking.id && +drinking.id) || undefined;
    formik.values.lovePets = (lovePets.id && +lovePets.id) || undefined;
    formik.values.ownsHouse = (ownsHouse.id && +ownsHouse.id) || undefined;
    formik.values.ownsCar = (ownsCar.id && +ownsCar.id) || undefined;
    formik.values.bloodGroup = (bloodGroup.id && +bloodGroup.id) || undefined;
    formik.values.thalassemia =
      (thalassemia.id && +thalassemia.id) || undefined;
    // formik.values.religiousBelief = ReligiousBelief;
    if (
      diet.id != "undefined" &&
      smoking.id != "undefined" &&
      drinking.id != "undefined" &&
      lovePets.id != "undefined" &&
      ownsHouse.id !== "undefined" &&
      ownsCar.id !== "undefined" &&
      bloodGroup.id !== "undefined" &&
      thalassemia.id !== "undefined" &&
      formik.values.religiousBelief
    ) {
      if (
        (ownsHouse.id == "1" && !housetype.length) ||
        (ownsCar.id == "1" && !cartype.length)
      ) {
        setNextDisable(true);
      } else {
        setNextDisable(false);
      }
    } else {
      setNextDisable(true);
    }
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
    // ReligiousBelief,
    cartype,
    housetype,
  ]);

  function handleSkip() {
    setSkiploadingSpiner(true);
    router.push("/DesiredProfile");
  }

  useEffect(() => {
    if (jsonData && jsonData.religious_belief) {
      formik.values.religiousBelief = jsonData.religious_belief;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonData, jsonData?.religious_belief]);

  // this is commented bcz when update religious_belief it not update there formik value
  //  as formik value change then again update the jsonData?.religious_belief in formik value 
  // useEffect(() => {
  //   if (jsonData && jsonData.religious_belief) {
  //     formik.values.religiousBelief = jsonData.religious_belief;
  //   }
  // }, [jsonData, formik.values]);

  return (
    <div className={classes.profile_Container}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <Row className="justify-content-center">
            <Button
              variant="link"
              className={`${classes.Form_btn} ${classes.Skip_Btn} mt-2 mb-4 align-self-md-end`}
              onClick={handleSkip}
            >
              {skiploadingSpiner && (
                <Spinner
                  className={classes.loginSpiner}
                  animation="border"
                  variant="danger"
                />
              )}
              skip to Partner Profile
            </Button>
            <h1>We would love to know about your Lifestyle.</h1>
            <Col sm={12} md={5}>
              <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
                <div className=" text-start d-flex flex-column gap-4">
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setDiet}
                      title="Diet"
                      data={Diet}
                      nameid="diet"
                      defaultValue={String(jsonData?.diet)}
                    />
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setSmoking}
                      title="Smoking"
                      data={SmokeDrink}
                      nameid="smoking"
                      defaultValue={String(jsonData?.smoking)}
                    />
                  </div>

                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setDrinking}
                      title="Drinking"
                      data={SmokeDrink}
                      nameid="drinking"
                      defaultValue={String(jsonData?.drinking)}
                    />
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setLovePets}
                      title="Love Pets"
                      data={Pets}
                      nameid="lovePets"
                      defaultValue={String(jsonData?.love_pets)}
                    />
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setOwnsHouse}
                      title="Owns House"
                      data={OwnHouseCar}
                      nameid="ownsHouse"
                      defaultValue={String(jsonData?.Owns_house)}
                    />
                  </div>
                  {ownsHouse && ownsHouse?.id == "1" && (
                    <SingleInput
                      data={HouseType}
                      inputName={"Type of House"}
                      onChange={setHousetype}
                      defaultValues={jsonData?.home_type || []}
                      isFromRegistered={true}
                    />
                  )}

                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setOwnsCar}
                      title="Owns Car"
                      data={OwnHouseCar}
                      nameid="ownsCar"
                      defaultValue={String(jsonData?.Owns_car)}
                    />
                  </div>

                  {ownsCar && ownsCar?.id == "1" && (
                    <SingleInput
                      data={CarType}
                      inputName={"Type of car"}
                      onChange={setCartype}
                      defaultValues={jsonData?.car_details || []}
                      isFromRegistered={true}
                    />
                  )}
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setBloodGroup}
                      title="Blood Group"
                      data={BloodGroup}
                      nameid="bloodGroup"
                      defaultValue={String(jsonData?.blood_group)}
                    />
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setThalassemia}
                      title="Thalassemia "
                      data={Thalassemia}
                      nameid="thalassemia"
                      defaultValue={String(jsonData?.Thalassemia)}
                    />
                  </div>
                  <div>
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
                            defaultValue={jsonData?.religious_belief}
                          />
                        </li>
                      </div>
                    </div>
                    {formik.touched.religiousBelief &&
                    formik.errors.religiousBelief ? (
                      <div>
                        <span className={classes.errorMessage}>
                          {formik.errors.religiousBelief}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 align-self-md-center`}
                  disabled={nextDisable}
                >
                  {loadingSpiner && (
                    <Spinner
                      className={classes.loginSpiner}
                      animation="border"
                      variant="light"
                    />
                  )}
                  Next
                </Button>
              </Form>
            </Col>
            <RightSection profileComplete={profileComplete} title="" />
          </Row>
        )}
      </Container>
    </div>
  );
};

export default LifeStyle;
