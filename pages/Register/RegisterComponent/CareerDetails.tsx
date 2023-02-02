import { Container, Row, Col  } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import FamilyDetails from "./Lifestyle&FamilyDetails";
import { useState } from "react";

interface ProfileDetailsProps {
  chooseMessage: (a:number) => void
}

const CareerDetails:React.FC<ProfileDetailsProps> = ({chooseMessage}:any) => {

  const [checked, updateChecked] = useState<boolean>();
  const checkFunction = () => {
    updateChecked(true)
    chooseMessage(2);
  }
    return(
      <>
        {!checked && <div className={classes.profile_Container}>
        <Container>
         <Row className="justify-content-center">
                <h1>Great! You are about to complete your Jeevansathi profile.</h1>
                <Col sm={12} md={5}>
                  <small>mandatory</small>

                  <div className={`form-group ${classes.inputCover}`}>
                  {/* <label htmlFor="text">Groom's Name</label> */}
                    <input placeholder="Country" className="form-control" />
                  </div>    
                  <div className={`form-group ${classes.inputCover}`}>
                    <input placeholder="Highest Degree" className="form-control" />
                  </div>
                  <div className={`form-group ${classes.inputCover}`}>
                    <input placeholder="Religion" className="form-control" />
                  </div>
                  <div className={`form-group ${classes.inputCover}`}>
                    <input placeholder="Employed In" className="form-control" />
                  </div>
                  <div className={`form-group ${classes.inputCover}`}>
                    <input placeholder="Annual Income" className="form-control" />
                  </div>
                  <hr/>
                  <h5 className="text-center p-3">Here is your chance to make your profile stand out!</h5>
                  <FloatingLabel controlId="floatingTextarea2" label="Express Yourself!">
                    <Form.Control
                    as="textarea"
                    placeholder="Express Yourself!"
                    style={{ height: '200px' }}
                    />
                </FloatingLabel>
                  <CustomButton onClick={() => checkFunction()}>
                  Complete Registration
                  </CustomButton>
                </Col>
                {/* <Col sm={12} md={2} className={classes.right_section}>
                    <h3>WHY REGISTER</h3>
                      <i className={classes.icon1}></i>
                      <span>Lakhs of Genuine Profiles</span>
                      <i className={classes.icon2}></i>
                      <span>Many Verified by Personal Visit</span>
                      <i className={classes.icon3}></i>
                      <span>Secure & Family Friendly</span>
                      <i className={classes.icon4}></i>
                      <span>Strict Privacy Control</span>
                </Col> */}
              </Row>
              </Container>
            </div>}
            {checked && <FamilyDetails />} 
            </>
    )
}

export default CareerDetails;