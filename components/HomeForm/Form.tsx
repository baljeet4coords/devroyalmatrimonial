import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import classes from "./Form.module.scss";
import { useFormik } from "formik";
import { SignupSchema } from "../../schemas/signupSchema";
import { Errors } from "../";
import { SignUpType } from "../../types/authentication";
import { AiFillEye } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { callingCodes } from "../../utils/countryCodesList";
import OTP_modal from "./OTP_modal";
import axios from "axios";

export interface SignUpForm {
  onSubmitForm: (values: SignUpType, otp: string, scopeType: string) => void;
  setIsLoadingHandler: (details: boolean) => void;
  errorForOTP: string;
  isLoading: boolean;
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
const OTP_SCOPE = "R";
const HomeForm: React.FC<SignUpForm> = ({
  onSubmitForm,
  setIsLoadingHandler,
  errorForOTP,
  isLoading,
  setIsOpenHandler,
  isOpen,
}) => {
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [nextDisable, setNextDisable] = useState(true);

  const sendOtpPost = async (phoneWithIsd: string, successMsg: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/sms/send-otp`,
      { isdMobile: phoneWithIsd, otpScope: OTP_SCOPE }
    );
    if (response.data.output > 0) {
      setMessage(successMsg);
    } else {
      setMessage("There was some error");
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (message) {
      timeoutId = setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [message]);

  const formik = useFormik({
    initialValues: {
      emailid: "",
      mobile: "",
      password: "",
      countryCode: "+91",
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      const phoneWithIsd =
        formik.values.countryCode.substring(1) + formik.values.mobile;

      if (formik.values.emailid && formik.values.password && formik.values.mobile) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/auth/isUserRegistered`,
          {
            countryCode: formik.values.countryCode,
            mobile: formik.values.mobile,
            emailid: formik.values.emailid
          }
        );
        const responseData = response.data;
        if (responseData.output === -10) {
          setError(responseData.message)
          setTimeout(() => {
            return setError("");
          }, 5000);
          setIsLoadingHandler(false);
        } else if (responseData.output === -20) {
          setError(responseData.message)
          setTimeout(() => {
            return setError("");
          }, 5000);
          setIsLoadingHandler(false);
        } else {
          setIsOpenHandler(true)
          sendOtpPost(phoneWithIsd, "OTP has been sent to given phone number");
        }
      }
    },
  });

  useEffect(() => {
    if (formik.values.emailid && formik.values.mobile && formik.values.password) {
      setNextDisable(false)
    } else {
      setNextDisable(true)
    }
  }, [formik.values.emailid, formik.values.mobile, formik.values.password])


  const fromSubmit = (otp: string) => {
    const formValue = formik.values;
    onSubmitForm(formValue, otp, OTP_SCOPE);
  };

  const resendOtp = () => {
    const phoneWithIsd =
      formik.values.countryCode.substring(1) + formik.values.mobile;
    sendOtpPost(phoneWithIsd, "OTP has been resent to given phone number");
  };


  // error && !nextDisable && console.log("error && !nextDisable ")
  return (
    <>
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

        <Form.Group
          className={classes.passwordWraper}
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={classes.Form_input}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <AiFillEye
            className={
              formik.touched.password && formik.errors.password
                ? classes.PasswordShowAline
                : showPassword
                  ? classes.PasswordShow
                  : ""
            }
            onClick={() => setShowPassword(!showPassword)}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="pt-1">
              <Errors error={formik.errors.password} />
            </div>
          ) : null}
        </Form.Group>
        {error && !nextDisable && <Errors error={error} />}

        <div className={classes.Password_Char_Info}>
          Your password must be at least 8 characters long and contain at least one uppercase letter, one special character (such as !, @, #, $, %, ^, &, or *), and one number
        </div>
        <Button
          variant="danger"
          type="submit"
          className={`${classes.Form_btn} mt-2 w-100`}
          disabled={error && true || !formik.isValid || nextDisable}
        >
          {isLoading ? <Spinner
            className={classes.loginSpiner}
            animation="border"
            variant="light"
          /> : "Register"}
        </Button>
        <Form.Label className="mt-4">
          By clicking on Register Free, you confirm that you accept the{" "}
          <span className={classes.redF12}> Terms of Use </span> and{" "}
          <span className={classes.redF12}> Privacy Policy</span>
        </Form.Label>
      </Form>
      <OTP_modal
        isOpen={isOpen}
        resendOtp={resendOtp}
        setIsOpenHandler={setIsOpenHandler}
        fromSubmit={fromSubmit}
        loadingSpiner={isLoading}
        message={message}
        errorForOTP={errorForOTP}
      />
    </>
  );
};

export default HomeForm;
