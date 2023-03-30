import { Container, Row, Col, Form, Button } from "react-bootstrap";
import classes from "./Component.module.scss";
import { useFormik } from "formik";
import {
  MotherTongue,
  ProfileFor,
  MaritalStatus,
  Religion,
  ChildrenStatus,
  Challenged,
  isHiv,
  Manglik,
} from "../../../types/enums";
import {
  AvatarPicker,
  CastListDropDown,
  DropdownGridSingleSelect,
  GenderRadioButtons,
} from "../../../components";
import RightSection from "./RightSection/RightSection";
import { useEffect, useState } from "react";
import { useHeightConverter } from "../../../hooks/utils/useHeightConvert";
import CastDataList from "../../../components/CastDataList/CastDataList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStep1Loading,
  selectStep1Success,
} from "../../../ducks/regiserUser/step1/selectors";
import axios from "axios";
import { getUserId } from "../../../ducks/auth/selectors";
import { step1 } from "../../../ducks/regiserUser/step1/actions";
import { CastListArray } from "../../../constants/CastListArray";
import Loader from "../../../components/Loader/Loader";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
interface Data {
  id?: string;
  val: string;
}
const ProfileDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  const dispatch = useDispatch();
  const stepOneDefaultValues = useSelector(selectStep1Success);
  const isLoading = useSelector(selectStep1Loading);
  const userId = useSelector(getUserId);

  const jsonData = stepOneDefaultValues?.jsonResponse;

  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  useEffect(() => {
    dispatch(step1({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    setGender(jsonData?.gender === "M" ? "1" : "2");
  }, [jsonData?.gender]);
  const { feet, cm, handleFeetChange, setCm, setFeet, handleCmChange } =
    useHeightConverter();

  useEffect(() => {
    setCm(jsonData?.height_cm !== undefined ? String(jsonData?.height_cm) : "");
    setFeet(
      jsonData?.height_cm !== undefined
        ? String((jsonData?.height_cm / 30.48).toFixed(1))
        : ""
    );
  }, [jsonData?.height_cm, setCm]);

  const [selectedProfileFor, setSelectedProfileFor] = useState<Data>({
    id: String(jsonData?.profile_for),
    val: "",
  });
  const [selectedChallenged, setSelectedChallenged] = useState<Data>({
    id: String(jsonData?.challenged),
    val: "",
  });
  const [selectedIsHiv, setSelectedIsHiv] = useState<Data>({
    id: String(jsonData?.hiv),
    val: "",
  });
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<Data>({
    id: String(jsonData?.mother_tongue),
    val: "",
  });
  const [selectedReligion, setSelectedReligion] = useState<Data>({
    id: String(jsonData?.religion),
    val: "",
  });
  const [selectedManglik, setSelectedManglik] = useState<Data>({
    id: String(jsonData?.manglik),
    val: "",
  });
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<Data>({
    id: String(jsonData?.marital_status),
    val: "",
  });
  const [selectedChildrenStatus, setSelectedChildrenStatus] = useState<Data>({
    id: String(jsonData?.children_status),
    val: "",
  });
  const [selectedCast, setSelectedCast] = useState<Data>({
    val: "",
    id: String(jsonData?.caste),
  });
  const [selectedPhotoName, setSelectedPhotoName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [image, setImage] = useState<Blob | string>("");
  const formik = useFormik({
    initialValues: {
      userId: userId,
      profilefor: String(jsonData?.profile_for),
      profileHandlerName: jsonData?.profile_handlername,
      dob: jsonData?.dob,
      selectgender: jsonData?.gender,
      fullname: jsonData?.fullname,
      cast: String(jsonData?.caste),
      challenged: String(jsonData?.challenged),
      isHiv: String(jsonData?.hiv),
      mothertongue: String(jsonData?.mother_tongue),
      religion: String(jsonData?.religion),
      isManglik: String(jsonData?.manglik),
      maritalstatus: String(jsonData?.marital_status),
      childrenstatus: String(jsonData?.children_status),
      height: String(jsonData?.height_cm),
      profilepic: jsonData?.photo,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("userId", String(values.userId));
      formData.append("profilefor", String(values.profilefor));
      formData.append("profileHandlerName", String(values.profileHandlerName));
      formData.append("dob", String(values.dob));
      formData.append("selectgender", String(values.selectgender));
      formData.append("fullname", String(values.fullname));
      formData.append("cast", String(values.cast));
      formData.append("challenged", String(values.challenged));
      formData.append("isHiv", String(values.isHiv));
      formData.append("mothertongue", String(values.mothertongue));
      formData.append("religion", String(values.religion));
      formData.append("isManglik", String(values.isManglik));
      formData.append("maritalstatus", String(values.maritalstatus));
      formData.append("childrenstatus", String(values.childrenstatus));
      formData.append("height", String(values.height));
      formData.append("profilepic", String(values.profilepic));
      formData.append("image", image);
      let response;
      if (isReduxEmpty === undefined) {
        formData.append("actionType", "c");
        (response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
          formData
        )),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
        if (response.data.output === 4) {
          nextPage(1);
        }
      } else {
        formData.append("actionType", "u");
        (response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
          formData
        )),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
        if (response.data.output === 0) {
          nextPage(1);
        }
      }
    },
  });

  const onChangeGender = (gender: string) => {
    setGender(gender);
    if (gender === "1") {
      formik.values.selectgender = "M";
    } else {
      formik.values.selectgender = "F";
    }
  };

  useEffect(() => {
    formik.values.profilefor = selectedProfileFor.id || "";
    formik.values.challenged = selectedChallenged.id || "";
    formik.values.isHiv = selectedIsHiv.id || "";
    formik.values.mothertongue = selectedMotherTongue.id || "";
    formik.values.religion = selectedReligion.id || "";
    formik.values.isManglik = selectedManglik.id || "";
    formik.values.maritalstatus = selectedMaritalStatus.id || "";
    formik.values.cast = selectedCast.id || "";
    formik.values.height = cm;
    formik.values.profilepic = selectedPhotoName || "";
  }, [
    jsonData,
    formik.values,
    cm,
    selectedProfileFor.id,
    selectedChallenged.id,
    selectedIsHiv.id,
    selectedMotherTongue.id,
    selectedReligion.id,
    selectedManglik.id,
    selectedMaritalStatus.id,
    selectedCast.id,
    selectedPhotoName,
  ]);

  useEffect(() => {
    if (selectedMaritalStatus.id) {
      if (selectedMaritalStatus?.id <= "2") {
        formik.values.childrenstatus = "1";
      } else {
        formik.values.childrenstatus = selectedChildrenStatus.id || "";
      }
    }
  }, [formik.values, selectedChildrenStatus.id, selectedMaritalStatus.id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (selectedProfileFor.id === "1") {
      formik.values.profileHandlerName = formik.values.fullname;
    }
  }, [formik.values, formik.values.fullname, selectedProfileFor.id]);

  useEffect(() => {
    if (selectedProfileFor?.id == "2" || selectedProfileFor?.id == "5") {
      formik.values.selectgender = "M";
    }
    if (selectedProfileFor?.id == "3" || selectedProfileFor?.id == "4") {
      formik.values.selectgender = "F";
    }
  }, [formik.values, selectedProfileFor]);

  const profilePicture = (imageName: string, file: null | Blob) => {
    setSelectedPhotoName(imageName);
    file && setImage(file);
  };
  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          {isLoading ? (
            <Loader />
          ) : (
            <Row className="justify-content-center">
              <Col sm={12} md={5}>
                <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
                <small>mandatory</small>
                <Form
                  className={classes.formEdit}
                  onSubmit={formik.handleSubmit}
                >
                  <DropdownGridSingleSelect
                    title="Profile For"
                    data={ProfileFor}
                    nameid="profilefor"
                    selectedDataFn={setSelectedProfileFor}
                    defaultValue={String(jsonData?.profile_for)}
                  />
                  {selectedProfileFor?.id !== "1" && (
                    <div className={classes.singleBox}>
                      <Form.Label>Profile Handler</Form.Label>
                      <div className={classes.inputBox}>
                        <li className={classes.blankInput}>
                          <Form.Control
                            name="profileHandlerName"
                            type="text"
                            placeholder="Enter your name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            defaultValue={jsonData?.profile_handlername}
                            autoComplete="off"
                          />
                        </li>
                      </div>
                    </div>
                  )}
                  {(selectedProfileFor?.id == "1" ||
                    selectedProfileFor?.id == "6" ||
                    selectedProfileFor?.id == "7") && (
                    <GenderRadioButtons
                      selectedGender={gender}
                      onChangeGender={onChangeGender}
                    />
                  )}
                  <div className={classes.singleBox}>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      max="2001-01-02"
                      placeholder="DateRange"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      defaultValue={jsonData?.dob.split(" ")[0]}
                    />
                  </div>
                  <div className={classes.singleBox}>
                    <Form.Label>
                      {gender === "1" ? "Groom" : "Bride"} Name
                    </Form.Label>
                    <div className={classes.inputBox}>
                      <li className={classes.blankInput}>
                        <Form.Control
                          name="fullname"
                          type="text"
                          placeholder="Select Option"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          defaultValue={jsonData?.fullname}
                        />
                      </li>
                    </div>
                  </div>
                  <div className={classes.singleBox}>
                    <Form.Label>Upload Profile Picture</Form.Label>
                    <div className={classes.inputBox}>
                      <li className={classes.blankInput}>
                        <AvatarPicker
                          onGetAvatar={profilePicture}
                          defaultImage={`${process.env.NEXT_PUBLIC_URL}/${jsonData?.photo}`}
                        />
                      </li>
                    </div>
                  </div>
                  <CastListDropDown
                    data={CastListArray}
                    selectedDataFn={setSelectedCast}
                    title="Caste"
                    nameid={"Caste"}
                    defaultValue={String(jsonData?.caste)}
                  />
                  <div className={classes.singleBox}>
                    <Form.Label>Height in feet</Form.Label>
                    <div className={classes.inputBox}>
                      <li className={`${classes.blankInput}`}>
                        <Form.Control
                          name="height"
                          type="text"
                          value={String(feet)}
                          onBlur={formik.handleBlur}
                          onChange={handleFeetChange}
                        />
                      </li>
                    </div>
                  </div>
                  <div className={classes.singleBox}>
                    <Form.Label>Height in centimeters</Form.Label>
                    <div className={classes.inputBox}>
                      <li className={`${classes.blankInput}`}>
                        <Form.Control
                          name="heightincms"
                          type="text"
                          value={String(Math.ceil(+cm))}
                          onBlur={formik.handleBlur}
                          onChange={handleCmChange}
                        />
                      </li>
                    </div>
                  </div>
                  <DropdownGridSingleSelect
                    title="Challenged"
                    data={Challenged}
                    nameid="challenged"
                    selectedDataFn={setSelectedChallenged}
                    defaultValue={String(jsonData?.challenged)}
                  />
                  <DropdownGridSingleSelect
                    title="HIV"
                    data={isHiv}
                    nameid="hiv"
                    selectedDataFn={setSelectedIsHiv}
                    defaultValue={String(jsonData?.hiv)}
                  />
                  <DropdownGridSingleSelect
                    title="Mother Tongue"
                    data={MotherTongue}
                    nameid="mothertongue"
                    selectedDataFn={setSelectedMotherTongue}
                    defaultValue={String(jsonData?.mother_tongue)}
                  />
                  <DropdownGridSingleSelect
                    title="Religion"
                    data={Religion}
                    nameid="religion"
                    selectedDataFn={setSelectedReligion}
                    defaultValue={String(jsonData?.religion)}
                  />
                  <DropdownGridSingleSelect
                    title="Manglik"
                    data={Manglik}
                    nameid="addmanglik"
                    selectedDataFn={setSelectedManglik}
                    defaultValue={String(jsonData?.manglik)}
                  />
                  <DropdownGridSingleSelect
                    title="Marital Status"
                    data={MaritalStatus}
                    nameid="maritalstatus"
                    selectedDataFn={setSelectedMaritalStatus}
                    defaultValue={String(jsonData?.marital_status)}
                  />
                  {(selectedMaritalStatus.id || "") >= "2" && (
                    <DropdownGridSingleSelect
                      title="Children Status"
                      data={ChildrenStatus}
                      nameid="childrenstatus"
                      selectedDataFn={setSelectedChildrenStatus}
                      defaultValue={String(jsonData?.children_status)}
                    />
                  )}
                  <Button
                    variant="danger"
                    type="submit"
                    className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
                  >
                    Next
                  </Button>
                </Form>
              </Col>
              <RightSection />
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default ProfileDetails;
