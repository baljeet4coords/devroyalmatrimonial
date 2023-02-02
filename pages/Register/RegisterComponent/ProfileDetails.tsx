import { Container, Row, Col  } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import CareerDetails from "./CareerDetails";
import { useState } from "react";

interface ProfileDetailsProps {
  chooseMessage: (a:number) => void
}
const ProfileDetails:React.FC<ProfileDetailsProps> = ({chooseMessage}:any) => {
  // const setCarrwrState = (message:any) => {
  
  // };
  const [checked, updateChecked] = useState<boolean>();
  const checkFunction = () => {
    updateChecked(true)
    chooseMessage(1);
  }

    return(
      <>
        {!checked && <div className={classes.profile_Container}>
        <Container>
         <Row className="justify-content-center">
                <Col sm={12} md={5}>
                <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
                  <small>mandatory</small>

                  <div className={`form-group ${classes.inputCover}`}>
                  {/* <label htmlFor="text">Groom's Name</label> */}
                    <input placeholder="Groom's Name" className="form-control" />
                  </div>
                  <div className={`form-group ${classes.inputCover}`}>
                    <input type="date" className="form-control" />
                  </div>
                  <div className={`form-group ${classes.inputCover}`}>
                    <input placeholder="Mother tongue" className="form-control" />
                  </div>
                  <div className={`form-group ${classes.inputCover}`}>
                    <input placeholder="Religion" className="form-control" />
                  </div>
                  <div className={`form-group ${classes.inputCover}`}>
                    <input placeholder="ReliMarital statusgion" className="form-control" />
                  </div>
                  <div className={`form-group ${classes.inputCover}`}>
                    <input placeholder="Height" className="form-control" />
                  </div>
                  <CustomButton onClick={() => checkFunction()}>
                  Continue
                  </CustomButton>
                </Col>
                <Col sm={12} md={2} className={classes.right_section}>
                    <h3>WHY REGISTER</h3>
                      <i className={classes.icon1}></i>
                      <span>Lakhs of Genuine Profiles</span>
                      <i className={classes.icon2}></i>
                      <span>Many Verified by Personal Visit</span>
                      <i className={classes.icon3}></i>
                      <span>Secure & Family Friendly</span>
                      <i className={classes.icon4}></i>
                      <span>Strict Privacy Control</span>
                </Col>
              </Row>
              </Container>
            </div>}

            {checked && <CareerDetails chooseMessage={chooseMessage}/>}
          </>
            
    )
}

export default ProfileDetails;