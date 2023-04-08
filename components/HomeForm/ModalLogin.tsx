import classes from "./Form.module.scss";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { countryCodesObj } from "../../utils/countryCodes";
import { useFormik } from "formik";
import { LoginType } from "../../ducks/auth/types";
import Errors from "../Errors/Errors";
import HomeForm from "./Form";
import { SignUpType } from "../../types/authentication";
import { useSelector } from "react-redux";
import router from "next/router";
import { selectAuthSuccess } from "../../ducks/auth/selectors";

type ModalLoginProps = {
  onCloseModal: () => void;
  errors: string;
  onSubmitForm: (values: LoginType) => void;
  onSubmitFormSignUp: (values: SignUpType) => void;
};

const ModalForm: React.FC<ModalLoginProps> = ({
  onCloseModal,
  onSubmitForm,
  onSubmitFormSignUp,
  errors,
}) => {
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const authSuccess = useSelector(selectAuthSuccess);
  const callingCodes = [];
  for (const [key, value] of Object.entries(countryCodesObj)) {
    callingCodes.push({ countryName: key, callingCode: value });
  }

  const formik = useFormik({
    initialValues: {
      emailid: "",
      mobile: "",
      password: "",
      isdCode: "+91",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      onSubmitForm({ ...values, from: loginWithEmail ? "email" : "mobile" });
    },
  });

  return (
    <>
      {!registerShow && (
        <div className={classes.modal_form}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Check
              type="switch"
              id="login_with"
              label="Login with Email"
              className={
                loginWithEmail
                  ? classes.Form_Login_check
                  : classes.Form_Login_checkDis
              }
              checked={loginWithEmail}
              onChange={() => setLoginWithEmail(!loginWithEmail)}
            />
            <Form.Group
              className={`${classes.modal_input}`}
              controlId="formBasicEmail"
            >
              {loginWithEmail ? (
                <Form.Control
                  type="email"
                  name="emailid"
                  placeholder="Enter Email Address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              ) : (
                <Form.Group>
                  <Row>
                    <Col xs={4} className="mx-0 pe-0">
                      <Form.Select
                        className={classes.MobileCode}
                        name="isdCode"
                        defaultValue="+91"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      >
                        {callingCodes.map(
                          (codes: { countryName: any; callingCode: any }) => {
                            return (
                              <option
                                value={codes.callingCode}
                                key={codes.countryName}
                              >
                                {codes.callingCode}
                              </option>
                            );
                          }
                        )}
                      </Form.Select>
                    </Col>
                    <Col xs={8} className="mx-0 ps-0">
                      <Form.Control
                        type="tel"
                        name="mobile"
                        placeholder="Enter Number"
                        className={classes.Form_input}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              )}
            </Form.Group>
            <Form.Group
              className={`${classes.modal_input}`}
              controlId="formBasicEmail"
            >
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Form.Group>
            {errors && <Errors error={errors} />}
            <Link
              className={`${classes.modal_links} d-flex justify-content-center mb-3`}
              href="/"
            >
              Forgot Password
            </Link>
            <Button
              variant="primary"
              type="submit"
              className={`${classes.Form_btn} p-3 mb-5 w-100`}
            >
              Login
            </Button>
            <Link
              className={`${classes.modal_links} d-flex justify-content-center`}
              href="/"
            >
              New On Royal Matrimonial?
            </Link>
            <Button
              variant="danger"
              type="submit"
              className={`${classes.Form_btn} p-3 mt-2 w-100`}
              onClick={() => setRegisterShow(true)}
            >
              Register Free
            </Button>
          </Form>

          <Button className={classes.modal_closeBtn} onClick={onCloseModal}>
            x
          </Button>
        </div>
      )}
      {registerShow && (
        <div className={classes.modal_form_signUp}>
          <div>
            <HomeForm onSubmitForm={onSubmitFormSignUp} error={errors} />
            <Button
              variant="primary"
              type="submit"
              className={`${classes.Form_btn} p-3 mt-2 w-100`}
              onClick={() => setRegisterShow(false)}
            >
              Go Back To Login
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;
