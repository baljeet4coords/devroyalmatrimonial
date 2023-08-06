import React, { useState } from 'react'
import classes from "./ForgetPassword.module.scss";
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { useFormik } from 'formik';
import { MdOutlineDone } from 'react-icons/md';
import { ResetPasswordSchema } from '../../schemas/resetPasswordSchema';
import Errors from '../Errors/Errors';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { pink } from '@mui/material/colors';
// import passwordImage from '../../public/Images/ResetPasswordModal.png'

type ComponentProps = {
    setState: (val: boolean) => void;
}

const ResetPasswordModal: React.FC<ComponentProps> = ({ setState }) => {
    const [emailSend, setemailSend] = useState(false);
    const [emailReSend, setEmailReSend] = useState(false);
    const [emailLoading, setemailLoading] = useState(false)
    const [buttonContent, setButtonContent] = useState('Email Sent')
    const [selectedValue, setSelectedValue] = useState('phone');



    const formik = useFormik({
        initialValues: {
            emailid: "",
            phoneNo: '',
        },
        validationSchema: ResetPasswordSchema,
        onSubmit: (values) => {

            setemailLoading(true)
            setTimeout(() => {
                setemailLoading(false);
                setemailSend(true)
                console.log(selectedValue === 'phone' ? values.phoneNo : values.emailid);
            }, 2000);
        },
    });

    const EmailResentHandler = () => {
        setEmailReSend(true)
        setTimeout(() => {
            setEmailReSend(false);
            setButtonContent('Email Resent')
        }, 2000);
    }

    const sxStyle = {
        color: pink[800],
        '&.Mui-checked': {
            color: pink[500],
            fontSize: '12px'
        }
    }

    const handleChange = (val: string) => {
        setSelectedValue(val);
    };



    return (
        <Form className={classes.ResetForm} onSubmit={formik.handleSubmit}>
            <div className={classes.ResetHeader}>
                <Button className={classes.backButton} onClick={(e) => { e.preventDefault(), setState(false) }} >
                    <TbArrowNarrowLeft size={28} />
                </Button>
                <h4>ResetPassword</h4>
            </div>
            <div className={classes.ImageSection}>
                {/* <Image src='Images/ResetPasswordModal.svg' alt='reset password' /> */}
                <video muted src="/Images/forgot-password.mp4" typeof='video/mp4' autoPlay loop={true}></video>
            </div>
            <div className={classes.FormDiv}>
                <div className={classes.loginWithSec}>
                    <h6>Reset With</h6>
                    <RadioGroup row className='mb-2' >
                        <FormControlLabel
                            value="phone"
                            checked={selectedValue === 'phone'}
                            control={<Radio sx={sxStyle} onChange={(e) => handleChange(e.target.value)} />}
                            label="Phone"
                            sx={sxStyle} />
                        <FormControlLabel
                            value="email"
                            checked={selectedValue === 'email'}
                            control={<Radio sx={sxStyle} onChange={(e) => handleChange(e.target.value)} />}
                            label="Email"
                            sx={sxStyle} />

                    </RadioGroup>
                </div>
                <div className={classes.FormInputDiv}>
                    <Form.Label>{selectedValue === 'phone' ? 'Phone' : 'Email'} </Form.Label>
                    <Form.Control
                        type={selectedValue === 'phone' ? 'tel' : 'email'}
                        name={selectedValue === 'phone' ? 'phoneNo' : 'emailid'}
                        placeholder={selectedValue === 'phone' ? 'Enter Phone Number' : "Enter Email Address"}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {selectedValue === 'phone' ?
                        formik.touched.phoneNo && formik.errors.phoneNo ? (
                            <div className="pt-1">
                                <Errors error={formik.errors.phoneNo} />
                            </div>
                        ) : null
                        :
                        formik.touched.emailid && formik.errors.emailid ? (
                            <div className="pt-1">
                                <Errors error={formik.errors.emailid} />
                            </div>
                        ) : null}
                </div>
                <div className={classes.ButtonSection}>
                    <Button
                        type="submit"
                        className={` ${!emailSend ? classes.FromBtnSubmit : classes.SuccessFormButton} `}
                        disabled={selectedValue === 'phone' ? !formik.values.phoneNo : !formik.values.emailid}
                    >
                        {!emailSend ?
                            emailLoading ?
                                <>
                                    <Spinner
                                        className={classes.loginSpiner}
                                        animation="border"
                                        variant="light"
                                    />
                                    {selectedValue === 'phone' ? 'SMS Sending' : ' Email Sending'}
                                </>
                                :
                                <>
                                    {selectedValue === 'phone' ? 'Send SMS' : 'Send Email'}
                                </>
                            :
                            !emailReSend ? <>{selectedValue === 'phone' ? ' SMS Sent' : buttonContent} <MdOutlineDone /> </> : <><>
                                <Spinner
                                    className={classes.loginSpiner}
                                    animation="border"
                                    variant="light"
                                />
                                {selectedValue === 'phone' ? ' SMS Resending' : ' Email Resending'}
                            </></>
                        }

                    </Button>
                    {emailSend && <p>{selectedValue === 'phone' ? 'sms not get' : 'email not get'} ? <span aria-disabled={emailReSend} onClick={EmailResentHandler}>{selectedValue === 'phone' ? 'resend sms' : 'resend email'}</span> </p>}
                </div>
                <p>Note :</p>
                <ul>
                    <li>Enter the email address associated with your account and click on the <strong>Send Email/SMS</strong> button.</li>
                    <li>Check your email for a message from the website with a link to reset your password.</li>
                    <li>Click on the link in the email to open a new window.</li>
                    <li>Enter a new password and confirm it.</li>
                    <li>Finally click on the <strong>Reset Password</strong> button.</li>
                </ul>
            </div>
        </Form>
    )
}

export default ResetPasswordModal