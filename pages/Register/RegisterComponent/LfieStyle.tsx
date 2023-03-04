import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import Form from "react-bootstrap/Form";
import RightSection from "./RightSection/RightSection";
import { DropdownGridSingleSelect } from "../../../components";
import {
  BloodGroup,
  Diet,
  SmokeDrink,
  Thalassemia,
} from "../../../types/enums";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
const LifeStyle: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  return (
    <div className={classes.profile_Container}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={5}>
            <h1>We would love to know about your Lifestyle.</h1>
            <Form className={classes.formEdit}>
              <div className=" text-start d-flex flex-column gap-4">
                {/* <h4 className="text-center">Lifestyle</h4> */}
                <DropdownGridSingleSelect
                  title="Diet"
                  data={Diet}
                  nameid="diet"
                />
                <DropdownGridSingleSelect
                  title="Smoking"
                  data={SmokeDrink}
                  nameid="smoking"
                />
                <DropdownGridSingleSelect
                  title="Drinking"
                  data={SmokeDrink}
                  nameid="drinking"
                />
                <DropdownGridSingleSelect
                  title="Love Pets"
                  data={Diet}
                  nameid="love_pets"
                />
                <DropdownGridSingleSelect
                  title="Owns House"
                  data={Diet}
                  nameid="own_house"
                />
                <DropdownGridSingleSelect
                  title="Owns Car"
                  data={Diet}
                  nameid="own_car"
                />
                <DropdownGridSingleSelect
                  title="Blood Group"
                  data={BloodGroup}
                  nameid="blood_group"
                />
                <DropdownGridSingleSelect
                  title="Thalassemia "
                  data={Thalassemia}
                  nameid="thalassemia"
                />
                <div className={classes.singleBox}>
                  <Form.Label>Religious Belief</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="religious_belief"
                    rows={3}
                    placeholder="Abotu Religious Belief"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                  />
                </div>
                {/* <FloatingLabel
                controlId="floatingTextarea2"
                label="About My Family"
              >
                <Form.Control
                  as="textarea"
                  placeholder="About My Family"
                  style={{ height: "200px" }}
                />
              </FloatingLabel> */}
              </div>
              <CustomButton onClick={() => nextPage(3)}>
                Add to my profile
              </CustomButton>
            </Form>
          </Col>
          <RightSection />
        </Row>
      </Container>
    </div>
  );
};

export default LifeStyle;
