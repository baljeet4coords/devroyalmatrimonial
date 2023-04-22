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

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
  DisabledHeadingMessage: (a: number) => void;
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

  const [ReligiousBelief, setReligiousBelief] = useState<string>(
    jsonData?.religious_belief !== undefined
      ? String(jsonData.religious_belief)
      : ""
  );
  const [housetype, setHousetype] = useState<Data>({
    id: String(jsonData?.home_type),
    val: "",
  });
  const [cartype, setCartype] = useState<Data>({
    id: String(jsonData?.car_details),
    val: "",
  });

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
      religiousBelief: ReligiousBelief,
      cartype: jsonData?.car_details || null,
      housetype: jsonData?.home_type || null,
    },
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
        DisabledHeadingMessage(3);
        nextPage(3);
        setloadingSpiner(false);
      } else {
        setloadingSpiner(false);
      }
    },
  });

  // to update json data when first time relode
  useEffect(() => {
    setReligiousBelief(
      jsonData?.religious_belief !== (null && undefined)
        ? String(jsonData?.religious_belief)
        : ""
    );
  }, [jsonData, jsonData?.religious_belief]);

  useEffect(() => {
    formik.values.diet = diet.id || "";
    formik.values.smoking = smoking.id || "";
    formik.values.drinking = drinking.id || "";
    formik.values.lovePets = lovePets.id || "";
    formik.values.ownsHouse = ownsHouse.id || "";
    formik.values.ownsCar = ownsCar.id || "";
    formik.values.bloodGroup = bloodGroup.id || "";
    formik.values.thalassemia = thalassemia.id || "";
    formik.values.religiousBelief = ReligiousBelief;
    formik.values.cartype = cartype.id || null;
    formik.values.housetype = housetype.id || null;
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
    ReligiousBelief,
    cartype,
    housetype,
  ]);

  function handleSkip() {
    setSkiploadingSpiner(true)
    router.push("/DesiredProfile")
  }

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
                  <DropdownGridSingleSelect
                    selectedDataFn={setDiet}
                    title="Diet"
                    data={Diet}
                    nameid="diet"
                    defaultValue={String(jsonData?.diet)}
                  />
                  <DropdownGridSingleSelect
                    selectedDataFn={setSmoking}
                    title="Smoking"
                    data={SmokeDrink}
                    nameid="smoking"
                    defaultValue={String(jsonData?.smoking)}
                  />
                  <DropdownGridSingleSelect
                    selectedDataFn={setDrinking}
                    title="Drinking"
                    data={SmokeDrink}
                    nameid="drinking"
                    defaultValue={String(jsonData?.drinking)}
                  />
                  <DropdownGridSingleSelect
                    selectedDataFn={setLovePets}
                    title="Love Pets"
                    data={Pets}
                    nameid="lovePets"
                    defaultValue={String(jsonData?.love_pets)}
                  />
                  <DropdownGridSingleSelect
                    selectedDataFn={setOwnsHouse}
                    title="Owns House"
                    data={OwnHouseCar}
                    nameid="ownsHouse"
                    defaultValue={String(jsonData?.Owns_house)}
                  />
                  {ownsHouse && ownsHouse?.id == "1" && (
                    <div className={classes.singleBox}>
                      <DropdownGridSingleSelect
                        selectedDataFn={setHousetype}
                        title="Type of House"
                        data={HouseType}
                        nameid="house_type"
                        defaultValue={String(jsonData?.home_type)}
                      />
                    </div>
                  )}

                  <DropdownGridSingleSelect
                    selectedDataFn={setOwnsCar}
                    title="Owns Car"
                    data={OwnHouseCar}
                    nameid="ownsCar"
                    defaultValue={String(jsonData?.Owns_car)}
                  />

                  {ownsCar && ownsCar?.id == "1" && (
                    <div className={classes.singleBox}>
                      <DropdownGridSingleSelect
                        selectedDataFn={setCartype}
                        title="Type of Car"
                        data={CarType}
                        nameid="car_type"
                        defaultValue={String(jsonData?.car_details)}
                      />
                    </div>
                  )}
                  <DropdownGridSingleSelect
                    selectedDataFn={setBloodGroup}
                    title="Blood Group"
                    data={BloodGroup}
                    nameid="bloodGroup"
                    defaultValue={String(jsonData?.blood_group)}
                  />
                  <DropdownGridSingleSelect
                    selectedDataFn={setThalassemia}
                    title="Thalassemia "
                    data={Thalassemia}
                    nameid="thalassemia"
                    defaultValue={String(jsonData?.Thalassemia)}
                  />
                  <div className={classes.singleBox}>
                    <Form.Label>Religious Belief</Form.Label>
                    <Form.Control
                      name="religiousBelief"
                      placeholder="About Religious Belief"
                      onBlur={formik.handleBlur}
                      onChange={(e) => setReligiousBelief(e.target.value)}
                      defaultValue={
                        jsonData?.religious_belief !== (null && undefined)
                          ? jsonData?.religious_belief
                          : ReligiousBelief
                      }
                    />
                  </div>
                </div>
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 align-self-md-end`}
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
