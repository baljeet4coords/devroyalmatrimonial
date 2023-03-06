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
const FamilyDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  return (
    <div className={classes.profile_Container}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={5}>
            <h1>We would love to know about your family.</h1>
            <Form className={classes.formEdit}>
              <div className=" text-start d-flex flex-column gap-4">
                {/* <h4 className="text-center">Lifestyle</h4> */}
                <DropdownGridSingleSelect
                  title="Father"
                  data={Diet}
                  nameid="diet"
                />
                <DropdownGridSingleSelect
                  title="Mother"
                  data={SmokeDrink}
                  nameid="smoking"
                />
                <DropdownGridSingleSelect
                  title="Sister"
                  data={SmokeDrink}
                  nameid="drinking"
                />
                <DropdownGridSingleSelect
                  title="Brother"
                  data={Diet}
                  nameid="love_pets"
                />
                <div className={classes.singleBox}>
                  <Form.Label>Gothra</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="religious_belief"
                    rows={3}
                    placeholder="Abotu Religious Belief"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                  />
                </div>
                <DropdownGridSingleSelect
                  title="Family Status "
                  data={Diet}
                  nameid="own_car"
                />
                <DropdownGridSingleSelect
                  title="Family Income"
                  data={BloodGroup}
                  nameid="blood_group"
                />
                <DropdownGridSingleSelect
                  title="Family Type"
                  data={Thalassemia}
                  nameid="thalassemia"
                />
                <DropdownGridSingleSelect
                  title="Family Native Country"
                  data={Thalassemia}
                  nameid="thalassemia"
                />
                <DropdownGridSingleSelect
                  title="Family Native State"
                  data={Thalassemia}
                  nameid="thalassemia"
                />
                <DropdownGridSingleSelect
                  title="Family Native City"
                  data={Thalassemia}
                  nameid="thalassemia"
                />
                <DropdownGridSingleSelect
                  title="Living With Parents"
                  data={Thalassemia}
                  nameid="thalassemia"
                />
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
              <CustomButton onClick={() => nextPage(4)}>
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

export default FamilyDetails;
