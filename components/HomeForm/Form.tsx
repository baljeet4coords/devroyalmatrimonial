import { Form, Button, Row, Col } from "react-bootstrap";
import classes from "./Form.module.scss";
import { useFormik } from "formik";
import { countryCodesObj } from "../../utils/countryCodes";
import { SignupSchema } from "../../schemas/signupSchema";
import { Errors } from "../";
import { SignUpType } from "../../types/authentication";

export interface SignUpForm {
  onSubmitForm: (values: SignUpType) => void;
  error: string;
}

const HomeForm: React.FC<SignUpForm> = ({ onSubmitForm, error }) => {
  const callingCodes = [];
  for (const [key, value] of Object.entries(countryCodesObj)) {
    callingCodes.push({ countryName: key, callingCode: value });
  }

  const formik = useFormik({
    initialValues: {
      emailid: "",
      mobile: "",
      password: "",
      countryCode: "+91",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      onSubmitForm(values);
    },
  });

  return (
    <Form
      className={`${classes.Form_Wrapper} ms-auto`}
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="emailid"
          placeholder="Enter email"
          className={classes.Form_input}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.emailid && formik.errors.emailid ? (
          <div className="pt-1">
            <Errors error={formik.errors.emailid} />
          </div>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Phone Number</Form.Label>
        <Row>
          <Col xs={3} className="mx-0 pe-0">
            <Form.Select
              className={classes.Form_input}
              name="countryCode"
              onChange={formik.handleChange}
              defaultValue={formik.initialValues.countryCode}
            >
              {callingCodes.map(
                (codes: { countryName: any; callingCode: any }) => {
                  return (
                    <option value={codes.callingCode} key={codes.countryName}>
                      {codes.callingCode}
                    </option>
                  );
                }
              )}
            </Form.Select>
          </Col>
          <Col xs={9} className="mx-0 ps-0">
            <Form.Control
              type="tel"
              name="mobile"
              placeholder="Enter Number"
              className={classes.Form_input}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              maxLength={formik.values.countryCode === "+91" ? 10 : 15}
            />
          </Col>
        </Row>
        {formik.touched.mobile && formik.errors.mobile ? (
          <div className="pt-1">
            <Errors error={formik.errors.mobile} />
          </div>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          className={classes.Form_input}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="pt-1">
            <Errors error={formik.errors.password} />
          </div>
        ) : null}
      </Form.Group>
      {error && <Errors error={error} />}
      <Button
        variant="danger"
        type="submit"
        className={`${classes.Form_btn} mt-2 w-100`}
        disabled={!formik.isValid}
      >
        Register
      </Button>
    </Form>
  );
};

export default HomeForm;
