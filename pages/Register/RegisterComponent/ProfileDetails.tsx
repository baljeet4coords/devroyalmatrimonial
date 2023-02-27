import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import {
  MotherTongue,
  ProfileFor,
  MaritalStatus,
  Religion,
  HeightInCm,
  ChildrenStatus,
  Challenged,
  isHiv,
} from "../../../types/enums";
import {
  CustomCalendar,
  DropdownGridSingleSelect,
  GenderRadioButtons,
} from "../../../components";
import RightSection from "./RightSection/RightSection";
import { useState } from "react";
import { city } from "../../../constants/DesiredData";
interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
const ProfileDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  const [gender, setGender] = useState<string>("");
  const [date, onDateChange] = useState(new Date());
  const onChangeGender = (gender: string) => {
    setGender(gender);
  };

  const cityList = city;
  cityList.map((item, index) => {
    console.log({
      ...item,
      id: index + 1,
    });
  });
  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          <Row className="justify-content-center">
            <Col sm={12} md={5}>
              <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
              <small>mandatory</small>
              <form className={classes.formEdit}>
                <DropdownGridSingleSelect
                  title="Profile For"
                  data={ProfileFor}
                />
                <GenderRadioButtons
                  selectedGender={gender}
                  onChangeGender={onChangeGender}
                />
                <div className={classes.singleBox}>
                  <label>Date of Birth</label>
                  <div className={classes.inputBox}>
                    <li className={classes.blankInput}>
                      <CustomCalendar onDateChange={onDateChange} date={date} />
                    </li>
                  </div>
                </div>
                <div className={classes.singleBox}>
                  <label>{gender === "1" ? "Groom" : "Bride"} Name</label>
                  <div className={classes.inputBox}>
                    <li className={classes.blankInput}>
                      <input type="text" placeholder="Select Some Options" />
                    </li>
                  </div>
                </div>
                <div className={classes.singleBox}>
                  <label>Upload Profile Picture</label>
                  <div className={classes.inputBox}>
                    <li className={classes.blankInput}>
                      <input type="file" placeholder="Select Some Options" />
                    </li>
                  </div>
                </div>
                <div className={classes.singleBox}>
                  <label>Caste</label>
                  <div className={classes.inputBox}>
                    <li className={classes.blankInput}>
                      <input type="text" placeholder="Enter Cast" />
                    </li>
                  </div>
                </div>
                <DropdownGridSingleSelect
                  title="Challenged"
                  data={Challenged}
                />
                <DropdownGridSingleSelect title="HIV" data={isHiv} />
                <DropdownGridSingleSelect
                  title="Mother Tongue"
                  data={MotherTongue}
                />
                <DropdownGridSingleSelect title="Religion" data={Religion} />
                <DropdownGridSingleSelect
                  title="Marital Status"
                  data={MaritalStatus}
                />
                <DropdownGridSingleSelect
                  title="Children Status"
                  data={ChildrenStatus}
                />
                <DropdownGridSingleSelect title="Height" data={HeightInCm} />
              </form>
              <CustomButton onClick={() => nextPage(1)}>Continue</CustomButton>
            </Col>
            <RightSection />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProfileDetails;
