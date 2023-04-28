import React, { useState } from 'react';
import { Modal, Button } from 'react-rainbow-components';
import classes from "./Form.module.scss";
import OtpInput from 'react-otp-input';



interface otpModal {
    isOpen: boolean;
    setIsOpenHandler: (isOpen: boolean) => void;
}

const OTP_modal: React.FC<otpModal> = ({ isOpen, setIsOpenHandler }) => {
    const [otp, setOtp] = useState('');


    return (
        <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpenHandler(false)}
                title="OTP Varification"
                footer={
                    <div className="rainbow-flex rainbow-justify_spread">
                        <Button label="Resend Otp" variant="neutral" />
                        <Button label="Verify" variant="brand" />
                    </div>
                }
            >
                <div className={classes.modal_Inner}>

                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default OTP_modal