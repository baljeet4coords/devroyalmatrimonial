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
  DropdownGridSingleSelect,
  GenderRadioButtons,
} from "../../../components";
import RightSection from "./RightSection/RightSection";
import { useEffect, useState } from "react";
import { useHeightConverter } from "../../../hooks/utils/useHeightConvert";
import { CastList } from "../../../constants/CastList";
import CastDataList from "../../../components/CastDataList/CastDataList";
import usePostData from "../../../hooks/utils/usePostData/usePostData";
import { useSelector } from "react-redux";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}

const step1PostApi = `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`;

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  const { feet, cm, handleFeetChange, handleCmChange } = useHeightConverter();
  // const userId = useSelector();
  const { isLoading, isError, responseData, post, reset } =
    usePostData(step1PostApi);
  const [selectedProfileFor, setSelectedProfileFor] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedChallenged, setSelectedChallenged] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedIsHiv, setSelectedIsHiv] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedReligion, setSelectedReligion] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedManglik, setSelectedManglik] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  const [selectedChildrenStatus, setSelectedChildrenStatus] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });

  const formik = useFormik({
    initialValues: {
      profilefor: "",
      profileHandlerName: "",
      dob: "",
      selectgender: "",
      fullname: "",
      profilepic: "",
      cast: "",
      challenged: "",
      isHiv: "",
      mothertongue: "",
      religion: "",
      isManglik: "",
      maritalstatus: "",
      childrenstatus: "",
      height: "",
    },
    onSubmit: (values) => {
      const data = JSON.stringify({ actionType, userId, ...values }, null, 1);
      post(data);
      checkFunction();
    },
  });
  const [gender, setGender] = useState<string>("");
  const onChangeGender = (gender: string) => {
    setGender(gender);
    if (gender === "1") {
      formik.values.selectgender = "M";
    } else {
      formik.values.selectgender = "F";
    }
  };
  useEffect(() => {
    formik.values.profilefor = selectedProfileFor.id;
    formik.values.challenged = selectedChallenged.id;
    formik.values.isHiv = selectedIsHiv.id;
    formik.values.mothertongue = selectedMotherTongue.id;
    formik.values.religion = selectedReligion.id;
    formik.values.isManglik = selectedManglik.id;
    formik.values.maritalstatus = selectedMaritalStatus.id;
    formik.values.height = cm;
  }, [
    selectedProfileFor.id,
    selectedChallenged.id,
    selectedIsHiv.id,
    selectedMotherTongue.id,
    selectedReligion.id,
    selectedManglik.id,
    selectedMaritalStatus.id,
    selectedChildrenStatus.id,
    formik.values,
    cm,
  ]);

  useEffect(() => {
    if (selectedMaritalStatus.id <= "2") {
      formik.values.childrenstatus = "1";
    } else {
      formik.values.childrenstatus = selectedChildrenStatus.id;
    }
  }, [formik.values, selectedChildrenStatus.id, selectedMaritalStatus.id]);

  useEffect(() => {
    if (selectedProfileFor.id === "1") {
      formik.values.profileHandlerName = formik.values.fullname;
    }
  }, [formik.values, formik.values.fullname, selectedProfileFor.id]);

  const selectedCast = (string: string) => {
    const id = string.split("-")[0];
    formik.values.cast = id;
  };
  const checkFunction = () => {
    nextPage(1);
  };

  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          <Row className="justify-content-center">
            <Col sm={12} md={5}>
              <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
              <small>mandatory</small>
              <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
                <DropdownGridSingleSelect
                  title="Profile For"
                  data={ProfileFor}
                  nameid="profilefor"
                  selectedDataFn={setSelectedProfileFor}
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
                        />
                      </li>
                    </div>
                  </div>
                )}
                <GenderRadioButtons
                  selectedGender={gender}
                  onChangeGender={onChangeGender}
                />
                <div className={classes.singleBox}>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    max="2001-01-02"
                    placeholder="DateRange"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
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
                        placeholder="Select Some Options"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </li>
                  </div>
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <div className={classes.inputBox}>
                    <li className={classes.blankInput}>
                      <Form.Control
                        name="profilepic"
                        type="file"
                        placeholder="Upload Profile Pic"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </li>
                  </div>
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Cast</Form.Label>
                  <CastDataList
                    options={CastList}
                    selectedOption={selectedCast}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Height</Form.Label>
                  <div className={classes.inputBox}>
                    <li className={`${classes.blankInput} d-flex`}>
                      <Form.Control
                        name="height"
                        type="text"
                        placeholder={`${cm} in cms`}
                        onBlur={formik.handleBlur}
                        onChange={handleCmChange}
                      />
                      <Form.Control
                        name="height"
                        type="text"
                        placeholder={`${feet} in ft.`}
                        onBlur={formik.handleBlur}
                        onChange={handleFeetChange}
                      />
                    </li>
                  </div>
                </div>
                <DropdownGridSingleSelect
                  title="Challenged"
                  data={Challenged}
                  nameid="challenged"
                  selectedDataFn={setSelectedChallenged}
                />
                <DropdownGridSingleSelect
                  title="HIV"
                  data={isHiv}
                  nameid="hiv"
                  selectedDataFn={setSelectedIsHiv}
                />
                <DropdownGridSingleSelect
                  title="Mother Tongue"
                  data={MotherTongue}
                  nameid="mothertongue"
                  selectedDataFn={setSelectedMotherTongue}
                />
                <DropdownGridSingleSelect
                  title="Religion"
                  data={Religion}
                  nameid="religion"
                  selectedDataFn={setSelectedReligion}
                />
                <DropdownGridSingleSelect
                  title="Add Manglik"
                  data={Manglik}
                  nameid="addmanglik"
                  selectedDataFn={setSelectedManglik}
                />
                <DropdownGridSingleSelect
                  title="Marital Status"
                  data={MaritalStatus}
                  nameid="maritalstatus"
                  selectedDataFn={setSelectedMaritalStatus}
                />
                {selectedMaritalStatus.id >= "2" && (
                  <DropdownGridSingleSelect
                    title="Children Status"
                    data={ChildrenStatus}
                    nameid="childrenstatus"
                    selectedDataFn={setSelectedChildrenStatus}
                  />
                )}
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
                >
                  Continue
                </Button>
              </Form>
            </Col>
            <RightSection />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProfileDetails;
