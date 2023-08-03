import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
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
import { useEffect, useRef, useState } from "react";
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
import HeightInput from "../../../components/InputField/HeightFeetToCmSingle/HeightFeetToCmSingle";
import * as Yup from "yup";
import dynamic from "next/dynamic";
const DateTimePicker = dynamic(
  () => import("react-rainbow-components/components/DateTimePicker"),
  { ssr: false } as any
);
const Application = dynamic(
  () => import("react-rainbow-components/components/Application"),
  { ssr: false } as any
);

type FormValues = {
  profileHandlerName: string | undefined;
  fullname: string | undefined;
  profilepic: string;
};

import {
  convertDateStringTimeStamp,
  convertServerTimestamp,
  convertTimeStamp,
} from "../../../utils/dayjs";
import { useStep1Register } from "../../../hooks/useRegister/useStep1";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
  DisabledHeadingMessage?: (a: number) => void;
  profileComplete: number;
}
interface Data {
  id?: string;
  val: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  nextPage,
  profileComplete,
  DisabledHeadingMessage,
}) => {
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

  useEffect(() => {
    if (jsonData) setDob(convertTimeStamp(jsonData?.dob));
  }, [jsonData, jsonData?.dob]);

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

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const minDate = new Date("1949-12-31");

  const [selectedPhotoName, setSelectedPhotoName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [image, setImage] = useState<Blob | string>("");
  const [dob, setDob] = useState<Date>(convertTimeStamp(jsonData?.dob || ""));
  const [loginSpiner, setloginSpiner] = useState(false);

  const [profileforTouched, setprofileforTouched] = useState<boolean>(false);
  const [casteTouched, setCasteTouched] = useState<boolean>(false);
  const [challengedTouched, setChallengedTouched] = useState<boolean>(false);
  const [hivTouched, setHivTouched] = useState<boolean>(false);
  const [motherToungeTouched, setMotherToungeTouched] =
    useState<boolean>(false);
  const [religionTouched, setReligionTouched] = useState<boolean>(false);
  const [manglikTouched, setManglikTouched] = useState<boolean>(false);
  const [maritalStatusTouched, setMaritalStatusTouched] =
    useState<boolean>(false);
  const [childrenStatusTouched, setChildrenStatusTouched] =
    useState<boolean>(false);
  const [heightTouched, setHeightTouched] = useState<boolean>(false);
  const [avtarTouched, setAvtarTouched] = useState<boolean>(false);
  const [nextDisable, setNextDisable] = useState<boolean>(true);
  const [heightSelectedVal, setheightSelectedVal] = useState<number | null>(0);
  const { registerUserMutation, Step1Query } = useStep1Register();

  if (selectedPhotoName?.includes("uploads")) {
    const imgsplt = selectedPhotoName.split("/");
    setSelectedPhotoName(imgsplt[imgsplt.length - 1]);
  }

  const formik = useFormik({
    initialValues: {
      userId: userId,
      profilefor: String(jsonData?.profile_for),
      profileHandlerName: jsonData?.profile_handlername,
      dob: jsonData && convertServerTimestamp(jsonData?.dob),
      selectgender: jsonData?.gender || "F",
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
      profilepic: selectedPhotoName,
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      profileHandlerName: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      profilepic: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setloginSpiner(true);
      const mutationResult = await registerUserMutation.mutateAsync({
        ...values,
        image,
        isReduxEmpty,
      });
      if (mutationResult?.output && mutationResult?.output > 0) {
        nextPage(1);
        setloginSpiner(false);
      } else {
        setloginSpiner(false);
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
    if ((selectedMaritalStatus.id || "") == "1") {
      setChildrenStatusTouched(true);
    }
    if ((selectedMaritalStatus.id || "") >= "2") {
      setChildrenStatusTouched(false);
    }

  }, [selectedMaritalStatus]);

  // useEffect(() => {
  //   if (selectedReligion?.id && ['2', '4', '5', '7', '8', '9', '10'].includes(selectedReligion?.id)) {
  //     setSelectedMaritalStatus({
  //       id: '4',
  //       val: ''
  //     })
  //   } else {
  //     setSelectedMaritalStatus({
  //       id: '',
  //       val: ''
  //     })
  //   }

  // }, [selectedReligion]);

  useEffect(() => {
    formik.values.profilefor = selectedProfileFor.id || "";
    formik.values.challenged = selectedChallenged.id || "";
    formik.values.isHiv = selectedIsHiv.id || "";
    formik.values.mothertongue = selectedMotherTongue.id || "";
    formik.values.religion = selectedReligion.id || "";
    formik.values.isManglik = selectedManglik.id || "";
    formik.values.maritalstatus = selectedMaritalStatus.id || "";
    formik.values.cast = selectedCast.id || "";
    formik.values.profilepic = selectedPhotoName || "";

    if (
      heightTouched &&
      selectedProfileFor.id != "undefined" &&
      selectedCast.id != "undefined" &&
      selectedChallenged.id != "undefined" &&
      selectedIsHiv.id != "undefined" &&
      selectedMotherTongue.id != "undefined" &&
      selectedReligion.id != "undefined" &&
      selectedManglik.id != "undefined" &&
      selectedMaritalStatus.id !== "undefined"
    ) {
      setNextDisable(false);
    }
  }, [
    formik.values,
    selectedProfileFor.id,
    selectedChallenged.id,
    selectedIsHiv.id,
    selectedMotherTongue.id,
    selectedReligion.id,
    selectedManglik.id,
    selectedMaritalStatus.id,
    selectedCast.id,
    selectedPhotoName,
    heightTouched,
  ]);

  const onHeightChange = (height: number | null) => {
    formik.values.height = String(height);
    setheightSelectedVal(height);
    if (height != null && height > 0) {
      setHeightTouched(true);
    }
  };
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
  useEffect(() => {
    if (jsonData && jsonData.fullname) {
      formik.values.fullname = jsonData.fullname;
    }
    if (jsonData && jsonData.profile_handlername) {
      formik.values.profileHandlerName = jsonData.profile_handlername;
    }
    if (jsonData && jsonData.gender) {
      formik.values.selectgender = jsonData.gender;
    }
    if (jsonData && jsonData.photo) {
      const fileName = jsonData.photo.split("/").pop();
      if (fileName) {
        setSelectedPhotoName(fileName);
      } else {
        setSelectedPhotoName("");
      }
    }
    if (jsonData && jsonData.height_cm) {
      formik.values.height = String(jsonData.height_cm);
    }
    if (jsonData && jsonData.dob) {
      formik.values.dob = jsonData.dob;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonData]);

  const handleDateTimeChange = (value: Date) => {
    if (value.getFullYear() <= 2005) {
      setDob(value);
      formik.values.dob = convertDateStringTimeStamp(value);
    }
  };
  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          {isLoading ? (
            <Loader />
          ) : (
            <Row className="justify-content-center">
              <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
              <Col sm={12} md={5}>
                <Form
                  className={classes.formEdit}
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <DropdownGridSingleSelect
                      title="Profile For"
                      data={ProfileFor}
                      nameid="profilefor"
                      selectedDataFn={setSelectedProfileFor}
                      defaultValue={String(jsonData?.profile_for)}
                      setErrorState={setprofileforTouched}
                    />
                    {profileforTouched &&
                      selectedProfileFor.id == "undefined" ? (
                      <div className={classes.errorMessage}>
                        <span>Please select valid input</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {selectedProfileFor?.id !== "1" && (
                    <div>
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
                            />
                          </li>
                        </div>
                      </div>
                      {formik.touched.profileHandlerName &&
                        formik.errors.profileHandlerName ? (
                        <div>
                          <span className={classes.errorMessage}>
                            {formik.errors.profileHandlerName}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
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
                    <Form.Label>Date/Time of Birth</Form.Label>
                    <div>
                      <Application
                        theme={{
                          rainbow: {
                            palette: {
                              brand: "#d9475c",
                            },
                          },
                        }}
                      >
                        <DateTimePicker
                          name="dob"
                          okLabel="OK"
                          onChange={handleDateTimeChange}
                          placeholder="DD-MM-YYYY HH:MM"
                          value={dob}
                          minDate={minDate}
                          maxDate={maxDate}
                          required
                        />
                      </Application>
                    </div>
                  </div>
                  <div className={classes.singleBox}>
                    <div>
                      <Form.Label>
                        {selectedProfileFor?.id == "2" ||
                          selectedProfileFor?.id == "5" ||
                          gender === "1"
                          ? "Groom"
                          : "Bride"}{" "}
                        Name
                      </Form.Label>
                      <div className={classes.inputBox}>
                        <li className={classes.blankInput}>
                          <Form.Control
                            name="fullname"
                            type="text"
                            placeholder={`${selectedProfileFor?.id == "2" ||
                              selectedProfileFor?.id == "5" ||
                              gender === "1"
                              ? "Write Groom Name"
                              : "Write Bride Name"
                              }`}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            defaultValue={jsonData?.fullname}
                          />
                        </li>
                      </div>
                      {formik.touched.fullname && formik.errors.fullname ? (
                        <div>
                          <span className={classes.errorMessage}>
                            {formik.errors.fullname}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div>
                    <Form.Label>Upload Profile Picture</Form.Label>
                    <AvatarPicker
                      onGetAvatar={profilePicture}
                      setErrorState={setAvtarTouched}
                      defaultImage={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${userId}/${selectedPhotoName}`}
                    />
                    {avtarTouched && selectedPhotoName.length == 0 ? (
                      <div>
                        <span className={classes.errorMessage}>
                          {formik.errors.profilepic}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      title="Marital Status"
                      data={MaritalStatus}
                      nameid="maritalstatus"
                      selectedDataFn={setSelectedMaritalStatus}
                      defaultValue={String(jsonData?.marital_status)}
                      setErrorState={setMaritalStatusTouched}
                    />
                    {maritalStatusTouched &&
                      selectedMaritalStatus.id == "undefined" ? (
                      <div>
                        <span className={classes.errorMessage}>
                          Please select value from dropdown
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {(selectedMaritalStatus.id || 1) >= "2" && (
                    <div>
                      <DropdownGridSingleSelect
                        title="Children Status"
                        data={ChildrenStatus}
                        nameid="childrenstatus"
                        selectedDataFn={setSelectedChildrenStatus}
                        defaultValue={String(jsonData?.children_status)}
                        setErrorState={setChildrenStatusTouched}
                      />
                      {childrenStatusTouched &&
                        selectedChildrenStatus.id == "undefined" ? (
                        <div>
                          <span className={classes.errorMessage}>
                            Please select value from dropdown
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  <div>
                    <DropdownGridSingleSelect
                      title="Religion"
                      data={Religion}
                      nameid="religion"
                      selectedDataFn={setSelectedReligion}
                      defaultValue={String(jsonData?.religion)}
                      setErrorState={setReligionTouched}
                    />
                    {religionTouched && selectedReligion.id == "undefined" ? (
                      <div>
                        <span className={classes.errorMessage}>
                          Please select value from dropdown
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    <CastListDropDown
                      data={CastListArray}
                      selectedDataFn={setSelectedCast}
                      title="Caste"
                      nameid={"Caste"}
                      defaultValue={String(jsonData?.caste)}
                      setErrorState={setCasteTouched}
                    />
                    {casteTouched && selectedCast.id == "undefined" ? (
                      <div>
                        <span className={classes.errorMessage}>
                          Please select value from dropdown
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <HeightInput
                      label="Height"
                      onHeightChange={onHeightChange}
                      defaultValue={jsonData && +jsonData?.height_cm}
                    />
                    {heightTouched && heightSelectedVal == 0 ? (
                      <div>
                        <span className={classes.errorMessage}>
                          Please enter valid height input
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    <DropdownGridSingleSelect
                      title="Mother Tongue"
                      data={MotherTongue}
                      nameid="mothertongue"
                      selectedDataFn={setSelectedMotherTongue}
                      defaultValue={String(jsonData?.mother_tongue)}
                      setErrorState={setMotherToungeTouched}
                    />
                    {motherToungeTouched &&
                      selectedMotherTongue.id == "undefined" ? (
                      <div>
                        <span className={classes.errorMessage}>
                          Please select value from dropdown
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    <DropdownGridSingleSelect
                      title="Challenged"
                      data={Challenged}
                      nameid="challenged"
                      selectedDataFn={setSelectedChallenged}
                      defaultValue={String(jsonData?.challenged)}
                      setErrorState={setChallengedTouched}
                    />
                    {challengedTouched &&
                      selectedChallenged.id == "undefined" ? (
                      <div>
                        <span className={classes.errorMessage}>
                          Please select value from dropdown
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <DropdownGridSingleSelect
                      title="HIV"
                      data={isHiv}
                      nameid="hiv"
                      selectedDataFn={setSelectedIsHiv}
                      defaultValue={String(jsonData?.hiv)}
                      setErrorState={setHivTouched}
                    />
                    {hivTouched && selectedIsHiv.id == "undefined" ? (
                      <div>
                        <span className={classes.errorMessage}>
                          Please select value from dropdown
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    <DropdownGridSingleSelect
                      title="Manglik"
                      data={Manglik}
                      nameid="addmanglik"
                      selectedDataFn={setSelectedManglik}
                      defaultValue={String(jsonData?.manglik)}
                      setErrorState={setManglikTouched}
                    />
                    {manglikTouched && selectedManglik.id == "undefined" ? (
                      <div>
                        <span className={classes.errorMessage}>
                          Please select value from dropdown
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <Button
                    variant="danger"
                    type="submit"
                    className={`${classes.Form_btn} mt-2 w-50 align-self-md-center`}
                    disabled={nextDisable}
                  >
                    {loginSpiner && (
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
              <RightSection profileComplete={profileComplete} title={""} />
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default ProfileDetails;
