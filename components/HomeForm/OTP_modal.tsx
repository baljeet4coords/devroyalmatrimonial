import React, { useState } from 'react';
import { Modal, Button } from 'react-rainbow-components';
import classes from "./Form.module.scss";
import OtpInput from 'react-otp-input';
import { Image, Spinner } from 'react-bootstrap';


export interface SignUpForm {
    isOpen: boolean;
    setIsOpenHandler: (isOpen: boolean) => void;
    fromSubmit: () => void;
    loadingSpiner: boolean;
}

const OTP_modal: React.FC<SignUpForm> = ({ isOpen, setIsOpenHandler, fromSubmit, loadingSpiner }) => {
    const [otp, setOtp] = useState('');


    const handleRegister = () => {
        fromSubmit();
    }

    return (
        <div className=" rainbow-p-bottom_xx-large">
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpenHandler(false)}
                title="OTP Varification"
                footer={
                    <div className={classes.OtpBtn_Container}>
                        <Button label="Resend Otp" variant="neutral" />
                        <Button className={classes.verify_otp} onClick={handleRegister}>
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
                            <Image className={classes.otpImage} src="Images/sms-sending.png" alt="sendSMS" />
                        </div>
                        <h3>Verification</h3>
                        <p>You will get a OTP via <span>SMS</span> on your mobile number</p>
                    </div>

                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        containerStyle={{ gap: "0.8rem" }}
                        inputType='text'
                        inputStyle={{ height: "40px", width: "40px", border: "none", borderBottom: "3px solid #bdb3b3" }}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default OTP_modal