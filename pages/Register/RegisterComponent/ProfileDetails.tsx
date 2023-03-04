import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import { useFormik } from "formik";
import {
  MotherTongue,
  ProfileFor,
  MaritalStatus,
  Religion,
  HeightInCm,
  ChildrenStatus,
  Challenged,
  isHiv,
  Manglik,
} from "../../../types/enums";
import {
  CustomCalendar,
  DropdownGridSingleSelect,
  GenderRadioButtons,
} from "../../../components";
import RightSection from "./RightSection/RightSection";
import { useState } from "react";
import { city } from "../../../constants/DesiredData";
import { SignupSchema } from "../../../schemas/signupSchema";
// import {DatePicker} from ;

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
const ProfileDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  const formik = useFormik({
    initialValues: {
      profilefor: "",
      datepic: "",
      groomIbrid: "",
      profilepic: "",
      cast: "",
      challenged: "",
      mothertongue: "",
      religion: "",
      addmanglic: "",
      maritalstatus: "",
      childrenstatus: "11111",
      height: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [gender, setGender] = useState<string>("");
  const [date, onDateChange] = useState(new Date());
  const [dateP, setDateP] = useState(new Date());
  const onChangeGender = (gender: string) => {
    setGender(gender);
  };

  const cityList = city;
  // cityList.map((item, index) => {
  //   console.log({
  //     ...item,
  //     id: index + 1,
  //   });
  // });
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
                  // formicfun={formik}
                />
                <GenderRadioButtons
                  selectedGender={gender}
                  onChangeGender={onChangeGender}
                />
                <div className={classes.singleBox}>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    // value={dateP}
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
                        name="groomIbrid"
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
                  <Form.Label>Caste</Form.Label>
                  <div className={classes.inputBox}>
                    <li className={classes.blankInput}>
                      <Form.Control
                        name="cast"
                        type="text"
                        placeholder="Enter Cast"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </li>
                  </div>
                </div>
                <DropdownGridSingleSelect
                  title="Challenged"
                  data={Challenged}
                  nameid="challenged"
                />
                <DropdownGridSingleSelect
                  title="HIV"
                  data={isHiv}
                  nameid="hiv"
                />
                <DropdownGridSingleSelect
                  title="Mother Tongue"
                  data={MotherTongue}
                  nameid="mothertongue"
                />
                <DropdownGridSingleSelect
                  title="Religion"
                  data={Religion}
                  nameid="religion"
                />
                <DropdownGridSingleSelect
                  title="Add Manglic"
                  data={Manglik}
                  nameid="addmanglic"
                />
                <DropdownGridSingleSelect
                  title="Marital Status"
                  data={MaritalStatus}
                  nameid="maritalstatus"
                />
                <DropdownGridSingleSelect
                  title="Children Status"
                  data={ChildrenStatus}
                  nameid="childrenstatus"
                />
                <DropdownGridSingleSelect
                  title="Height"
                  data={HeightInCm}
                  nameid="height"
                />
                {/* <CustomButton type="submit" >
                  Continue
                </CustomButton> */}
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
                  onClick={() => nextPage(1)}
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
