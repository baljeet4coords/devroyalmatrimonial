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
import * as Yup from 'yup';


interface ProfileDetailsProps {
  nextPage: (a: number) => void;
  DisabledHeadingMessage?: (a: number) => void;
  profileComplete: number;
}
interface Data {
  id?: string | null;
  val: string;
}
const LifeStyle: React.FC<ProfileDetailsProps> = ({
  nextPage,
  profileComplete, DisabledHeadingMessage
}) => {
  const dispatch = useDispatch();
  const stepThreeDefaultValues = useSelector(selectStep3Success);
  const isLoading = useSelector(selectStep3Loading);
  const jsonData = stepThreeDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);

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
  const [housetype, setHousetype] = useState<Data>({
    id: String(jsonData?.home_type),
    val: "",
  });
  const [cartype, setCartype] = useState<Data>({
    id: String(jsonData?.car_details),
    val: "",
  });


  const [dietTouched, setdietTouched] = useState<boolean>(false);
  const [smokingTouched, setSmokingTouched] = useState<boolean>(false);
  const [drinkingTouched, setDrinkingTouched] = useState<boolean>(false);
  const [lovePetsTouched, setLovePetsTouched] = useState<boolean>(false);
  const [ownsHouseTouched, setOwnsHouseTouched] = useState<boolean>(false);
  const [typeofHouseTouched, setTypeofHouseTouched] = useState<boolean>(false);
  const [ownsCarTouched, setOwnsCarTouched] = useState<boolean>(false);
  const [typeofCarTouched, setTypeofCarTouched] = useState<boolean>(false);
  const [bloodGroupTouched, setBloodGroupTouched] = useState<boolean>(false);
  const [thalassemiaTouched, setThalassemiaTouched] = useState<boolean>(false);
  const [nextDisable, setNextDisable] = useState<boolean>(true);

  useEffect(() => {
    if (ownsCar.id == "2") {
      setCartype({ id: null, val: "" })
    }
    if (ownsHouse.id == "2") {
      setHousetype({ id: null, val: "" })
    }
  }, [ownsCar.id, ownsHouse.id])



  const formik = useFormik({
    initialValues: {
      userId: userId,
      diet: String(jsonData?.diet),
      smoking: String(jsonData?.smoking),
      drinking: String(jsonData?.drinking),
      lovePets: String(jsonData?.love_pets),
      ownsHouse: String(jsonData?.Owns_house),
      ownsCar: String(jsonData?.Owns_car),
      bloodGroup: String(jsonData?.blood_group),
      thalassemia: String(jsonData?.Thalassemia),
      religiousBelief: jsonData?.religious_belief,
      cartype: jsonData?.car_details || null,
      housetype: jsonData?.home_type || null,
    },
    validationSchema: Yup.object({
      religiousBelief: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setloadingSpiner(true);
      let response;

      if (isReduxEmpty === undefined) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step3`,
          { actionType: "c", ...values }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step3`,
          { actionType: "u", ...values }
        );
      }
      if (response.data.output > 0) {
        // DisabledHeadingMessage(3);
        nextPage(3);
        setloadingSpiner(false);
      } else {
        setloadingSpiner(false);
      }
    },
  });

  // to update json data when first time relode
  // useEffect(() => {
  //   setReligiousBelief(
  //     jsonData?.religious_belief !== (null && undefined)
  //       ? String(jsonData?.religious_belief)
  //       : ""
  //   );
  // }, [jsonData, jsonData?.religious_belief]);

  useEffect(() => {
    formik.values.diet = diet.id || "";
    formik.values.smoking = smoking.id || "";
    formik.values.drinking = drinking.id || "";
    formik.values.lovePets = lovePets.id || "";
    formik.values.ownsHouse = ownsHouse.id || "";
    formik.values.ownsCar = ownsCar.id || "";
    formik.values.bloodGroup = bloodGroup.id || "";
    formik.values.thalassemia = thalassemia.id || "";
    // formik.values.religiousBelief = ReligiousBelief;
    formik.values.cartype = cartype.id || null;
    formik.values.housetype = housetype.id || null;

    if (diet.id != "undefined" && smoking.id != "undefined" && drinking.id != "undefined" &&
      lovePets.id != "undefined" && ownsHouse.id !== "undefined" && ownsCar.id !== "undefined" && bloodGroup.id !== "undefined"
      && thalassemia.id !== "undefined") {
      if ((ownsHouse.id == "2" && ownsCar.id == "2") || ownsHouse.id == "2" || ownsCar.id == "2") {
        setNextDisable(false)
      }

      if (ownsHouse.id == "1" && housetype.id == "undefined" || ownsCar.id == "1" && cartype.id == "undefined") {
        setNextDisable(true);
      } else {
        setNextDisable(false)
      }

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
    setSkiploadingSpiner(true)
    router.push("/DesiredProfile")
  }

  // function handleReligiousChange(e: any) {
  //   formik.handleChange,
  //     setReligiousBelief(e.target.value)
  // }

  return (
    <div className={classes.profile_Container}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <Row className="justify-content-center">
            <Button variant="danger" className={`${classes.Form_btn} ${classes.Skip_Btn} mt-2 mb-4 align-self-md-end`} onClick={handleSkip} >
              {skiploadingSpiner && (
                <Spinner
                  className={classes.loginSpiner}
                  animation="border"
                  variant="light"
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
                      setErrorState={setdietTouched}
                    />
                    {dietTouched && diet.id == "undefined" ?
                      <div>
                        <span className={classes.errorMessage}>Please select value from dropdown</span>
                      </div>

                      : ""
                    }
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setSmoking}
                      title="Smoking"
                      data={SmokeDrink}
                      nameid="smoking"
                      defaultValue={String(jsonData?.smoking)}
                      setErrorState={setSmokingTouched}
                    />
                    {smokingTouched && smoking.id == "undefined" ?
                      <div>
                        <span className={classes.errorMessage}>Please select value from dropdown</span>
                      </div>

                      : ""
                    }
                  </div>

                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setDrinking}
                      title="Drinking"
                      data={SmokeDrink}
                      nameid="drinking"
                      defaultValue={String(jsonData?.drinking)}
                      setErrorState={setDrinkingTouched}
                    />
                    {drinkingTouched && drinking.id == "undefined" ?
                      <div>
                        <span className={classes.errorMessage}>Please select value from dropdown</span>
                      </div>

                      : ""
                    }
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setLovePets}
                      title="Love Pets"
                      data={Pets}
                      nameid="lovePets"
                      defaultValue={String(jsonData?.love_pets)}
                      setErrorState={setLovePetsTouched}
                    />
                    {lovePetsTouched && lovePets.id == "undefined" ?
                      <div>
                        <span className={classes.errorMessage}>Please select value from dropdown</span>
                      </div>

                      : ""
                    }
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setOwnsHouse}
                      title="Owns House"
                      data={OwnHouseCar}
                      nameid="ownsHouse"
                      defaultValue={String(jsonData?.Owns_house)}
                      setErrorState={setOwnsHouseTouched}
                    />
                    {ownsHouseTouched && ownsHouse.id == "undefined" ?
                      <div>
                        <span className={classes.errorMessage}>Please select value from dropdown</span>
                      </div>

                      : ""
                    }
                  </div>
                  {ownsHouse && ownsHouse?.id == "1" && (
                    <div>
                      <div className={classes.singleBox}>
                        <DropdownGridSingleSelect
                          selectedDataFn={setHousetype}
                          title="Type of House"
                          data={HouseType}
                          nameid="house_type"
                          defaultValue={String(jsonData?.home_type)}
                          setErrorState={setTypeofHouseTouched}
                        />
                      </div>
                      {typeofHouseTouched && housetype.id == "undefined" ?
                        <div>
                          <span className={classes.errorMessage}>Please select value from dropdown</span>
                        </div>

                        : ""
                      }
                    </div>
                  )}

                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setOwnsCar}
                      title="Owns Car"
                      data={OwnHouseCar}
                      nameid="ownsCar"
                      defaultValue={String(jsonData?.Owns_car)}
                      setErrorState={setOwnsCarTouched}
                    />
                    {ownsCarTouched && ownsCar.id == "undefined" ?
                      <div>
                        <span className={classes.errorMessage}>Please select value from dropdown</span>
                      </div>

                      : ""
                    }
                  </div>

                  {ownsCar && ownsCar?.id == "1" && (
                    <div>
                      <div className={classes.singleBox}>
                        <DropdownGridSingleSelect
                          selectedDataFn={setCartype}
                          title="Type of Car"
                          data={CarType}
                          nameid="car_type"
                          defaultValue={String(jsonData?.car_details)}
                          setErrorState={setTypeofCarTouched}
                        />
                      </div>
                      {typeofCarTouched && cartype.id == "undefined" ?
                        <div>
                          <span className={classes.errorMessage}>Please select value from dropdown</span>
                        </div>

                        : ""
                      }
                    </div>
                  )}
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setBloodGroup}
                      title="Blood Group"
                      data={BloodGroup}
                      nameid="bloodGroup"
                      defaultValue={String(jsonData?.blood_group)}
                      setErrorState={setBloodGroupTouched}
                    />
                    {bloodGroupTouched && bloodGroup.id == "undefined" ?
                      <div>
                        <span className={classes.errorMessage}>Please select value from dropdown</span>
                      </div>

                      : ""
                    }
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      selectedDataFn={setThalassemia}
                      title="Thalassemia "
                      data={Thalassemia}
                      nameid="thalassemia"
                      defaultValue={String(jsonData?.Thalassemia)}
                      setErrorState={setThalassemiaTouched}
                    />
                    {thalassemiaTouched && thalassemia.id == "undefined" ?
                      <div>
                        <span className={classes.errorMessage}>Please select value from dropdown</span>
                      </div>

                      : ""
                    }
                  </div>
                  <div>
                    <div className={classes.singleBox}>
                      {/* <Form.Label>Religious Belief</Form.Label>
                      <Form.Control
                        name="religiousBelief"
                        placeholder="About Religious Belief"
                        onBlur={formik.handleBlur}
                        onChange={(e) => handleReligiousChange(e)}
                        defaultValue={
                          jsonData?.religious_belief !== (null && undefined)
                            ? jsonData?.religious_belief
                            : ReligiousBelief
                        }
                      /> */}
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
                    {formik.touched.religiousBelief && formik.errors.religiousBelief ?
                      <div>
                        <span className={classes.errorMessage}>{formik.errors.religiousBelief}</span>
                      </div>

                      : ""
                    }
                  </div>
                </div>
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 align-self-md-end`}
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
