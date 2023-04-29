import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-rainbow-components";
import classes from "./Form.module.scss";
import OtpInput from "react-otp-input";
import { Image, Spinner } from "react-bootstrap";

export interface SignUpForm {
  isOpen: boolean;
  setIsOpenHandler: (isOpen: boolean) => void;
  fromSubmit: (otp: string) => void;
  resendOtp: () => void;
  loadingSpiner: boolean;
  message: string;
  errorForOTP: string;
}

const OTP_modal: React.FC<SignUpForm> = ({
  isOpen,
  setIsOpenHandler,
  fromSubmit,
  loadingSpiner,
  message,
  resendOtp,
  errorForOTP,
}) => {
  const [otp, setOtp] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [attempts, setAttempts] = useState<number>(3);
  const [err, setErr] = useState<string>("");

  const handleRegister = (otp: string) => {
    fromSubmit(otp);
  };

  useEffect(() => {
    if (attempts > 0) {
      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 10 * 1000);
    } else {
      setErr("Contact us for inconvinience caused");
      setResendDisabled(true);
    }
  }, [attempts]);

  useEffect(() => {
    if (isOpen) {
      if (timeLeft <= 0) {
        setResendDisabled(false);
        return;
      }
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isOpen, timeLeft]);

  const handleResendClick = () => {
    if (resendDisabled) {
      return;
    }
    setAttempts((prevAttempts) => prevAttempts - 1);
    setTimeLeft(10);
    resendOtp();
  };
  return (
    <div className="rainbow-p-bottom_xx-large">
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpenHandler(false)}
        title="OTP Verification"
        footer={
          <div className={classes.OtpBtn_Container}>
            <Button
              label="Resend OTP"
              variant="neutral"
              onClick={handleResendClick}
              disabled={resendDisabled}
            />
            {resendDisabled && (
              <span className="my-auto">
                {err ? (
                  <small className="text-danger">{err}</small>
                ) : (
                  <small>Resent OTP after {timeLeft} seconds</small>
                )}
              </span>
            )}
            <Button
              className={classes.verify_otp}
              onClick={() => handleRegister(otp)}
            >
              {loadingSpiner && (
                <Spinner
                  className={classes.loginSpiner}
                  animation="border"
                  variant="light"
                />
              )}
              Verify
            </Button>
          </div>
        }
      >
        <div className={classes.modal_Inner}>
          <div className={classes.modal_middle}>
            <div className={classes.otpImg_container}>
              <Image
                className={classes.otpImage}
                src="Images/sms-sending.png"
                alt="sendSMS"
              />
            </div>
            <h3>Verification</h3>
            <p>
              You will get a OTP via <span>SMS</span> on your mobile number
            </p>
          </div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={{ gap: "0.8rem" }}
            inputType="text"
            inputStyle={{
              height: "40px",
              width: "40px",
              border: "none",
              borderBottom: "3px solid #bdb3b3",
            }}
            renderInput={(props) => <input {...props} />}
          />
          {errorForOTP ? (
            <p className="text-danger">{errorForOTP}</p>
          ) : (
            <p className="text-success">{message}</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default OTP_modal;
