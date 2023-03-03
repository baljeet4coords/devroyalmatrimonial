import { Container, Row, Col } from "react-bootstrap";
import { CustomButton, DropdownGridSingleSelect } from "../../../components";
import classes from "./Component.module.scss";
import { FloatingLabel, Form } from "react-bootstrap";
import RightSection from "./RightSection/RightSection";
import {
  CountryList,
  HighestEducationList,
} from "../../../constants/DesiredData";
import { ReadyToSettleAbroad, ResidentialStatus } from "../../../types/enums";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}

const CareerDetails: React.FC<ProfileDetailsProps> = ({
  nextPage,
}: any) => {
  const checkFunction = () => {
    nextPage(2);
  };
  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          <Row className="justify-content-center">
            <h1>Great! You are about to complete your profile.</h1>
            <Col sm={12} md={5}>
              <small>mandatory</small>

              <div className={`form-group ${classes.inputCover}`}>
                <DropdownGridSingleSelect title="Country" data={CountryList} />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <label>State</label>
                <input placeholder="State" className="form-control" />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <label>City</label>
                <input placeholder="City" className="form-control" />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <DropdownGridSingleSelect
                  title="Residential Status"
                  data={ResidentialStatus}
                />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <DropdownGridSingleSelect
                  title="Ready to settle abroad"
                  data={ReadyToSettleAbroad}
                />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <DropdownGridSingleSelect
                  title="Highest Degree"
                  data={HighestEducationList}
                />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <DropdownGridSingleSelect
                  title="Employed In"
                  data={HighestEducationList}
                />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <input placeholder="Annual Income" className="form-control" />
              </div>
              <hr />
              <h5 className="text-center p-3">
                Here is your chance to make your profile stand out!
              </h5>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Express Yourself!"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Express Yourself!"
                  style={{ height: "200px" }}
                />
              </FloatingLabel>
              <CustomButton onClick={() => checkFunction()}>
                Complete Registration
              </CustomButton>
            </Col>
            <RightSection />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CareerDetails;
