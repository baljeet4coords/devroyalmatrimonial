import classes from "./Form.module.scss";
import { Form, Button, Row, Col, Image, Spinner } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { LoginType } from "../../ducks/auth/types";
import Errors from "../Errors/Errors";
import HomeForm from "./Form";
import { SignUpType } from "../../types/authentication";
import { useSelector } from "react-redux";
import router from "next/router";
import { selectAuthSuccess } from "../../ducks/auth/selectors";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import { callingCodes } from "../../utils/countryCodesList";

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
  const [passwordShow, setPasswordShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [loginSpiner, setloginSpiner] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPasswordShow(false);
    }, 2000);
  }, [passwordShow]);

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
                type={!passwordShow ? "password" : "text"}
                name="password"
                placeholder="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {!passwordShow ? (
                <AiOutlineEye
                  className={classes.passwordShowHide}
                  onClick={() => setPasswordShow(true)}
                />
              ) : (
                <AiOutlineEyeInvisible className={classes.passwordShowHide} />
              )}
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
              className={`${classes.Form_btn} p-3 mb-3 w-100`}
              onClick={() => setloginSpiner(true)}
              // disabled={loginSpiner}
            >
              {loginSpiner && (
                <Spinner
                  className={classes.loginSpiner}
                  animation="border"
                  variant="light"
                />
              )}
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
            <RxCross1 />
          </Button>
        </div>
      )}
      {registerShow && (
        <div className={classes.modal_form_signUp}>
          <div>
            <HomeForm
              onSubmitForm={onSubmitFormSignUp}
              error={errors}
              errorForOTP=""
              isLoading={false}
              setIsOpenHandler={() => {}}
              isOpen={false}
            />
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
