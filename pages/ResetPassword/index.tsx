import React, { useState } from 'react'
import classes from './ResetPassword.module.scss'
import { Button, Form, Image } from 'react-bootstrap'
import { useFormik } from 'formik'
import { Errors } from '../../components'
import { UpdatePasswordSchema } from '../../schemas/updatePasswordSchema'

const ResetPassword = () => {
    const [hasPasswordUpdate, setHasPasswordUpdate] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


    const formik = useFormik({
        initialValues: {
            newpassword: "",
            confirmpassword: "",
        },
        validationSchema: UpdatePasswordSchema,
        onSubmit: (values) => {
            // setemailLoading(true)
            // setTimeout(() => {
            //     setemailLoading(false);
            //     setemailSend(true)
            // }, 2000);
            alert(JSON.stringify(values, null, 2));

        },
    });
    return (
        <div className={classes.mainSec}>
            <div className={classes.childComp}>
                <div className={classes.childLeft}>
                    <Image src='Images/app.jpg' alt='logomain' />

                </div>
                <div className={classes.childRight}>
                    <Form className={classes.ResetForm} onSubmit={formik.handleSubmit}>
                        <div className={classes.ResetHeader}>
                            <h4>ResetPassword</h4>
                        </div>
                        <div className={classes.ImageSection}>
                            {/* <Image src='Images/update-password.svg' alt='reset password' /> */}
                            <video muted src="Images/Update-password.mp4" typeof='video/mp4' autoPlay loop={true}></video>
                        </div>

                        <div className={classes.FormDiv}>
                            <div className={classes.FormInputDiv}>
                                <Form.Group className={classes.formGroup}>
                                    <div>
                                        <Form.Label>New Password </Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "Password"}
                                            name="newpassword"
                                            placeholder="New Password"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Form.Label>Confirm Password </Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "Password"}
                                            name="confirmpassword"
                                            placeholder="confirm password"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </Form.Group>

                                {formik.touched.newpassword && formik.errors.newpassword ? (
                                    <div className="pt-1">
                                        <Errors error={formik.errors.newpassword} />
                                    </div>
                                ) : null}
                                {
                                    formik.touched.newpassword && !formik.errors.newpassword && formik.values.newpassword === formik.values.confirmpassword ?
                                        <div className='mx-1  my-2 text-success'>
                                            <Image src="./done.svg" width={23} height={23} alt="done" className="pe-1" /> Password match successfully !!!
                                        </div> :
                                        formik.touched.newpassword && !formik.errors.newpassword && formik.touched.confirmpassword && formik.values.newpassword != formik.values.confirmpassword ?
                                            <div className='mx-1  my-2 text-danger'>
                                                <Image src="./error2.svg" width={23} height={23} alt="error" className="pe-1" /> Password Not match !!!
                                            </div> : null
                                }


                                <div className='mx-1 my-2'>
                                    <Form.Check type={'checkbox'} id={`showpassword`} >
                                        <Form.Check.Input type={'checkbox'} isValid onChange={(e) => setShowPassword(e.target.checked)} />
                                        <Form.Check.Label> Show password</Form.Check.Label>
                                    </Form.Check>
                                </div>
                            </div>
                            <div className={classes.ButtonSection}>
                                <Button
                                    type="submit"
                                    className={` ${!hasPasswordUpdate ? classes.FromBtnSubmit : classes.SuccessFormButton} `}
                                    disabled={formik.values.newpassword && formik.values.confirmpassword ? false : true}
                                >
                                    Update Password
                                </Button>
                                {hasPasswordUpdate && <p>Password has been updated !!</p>}
                            </div>

                            <div>
                                <p>Note :</p>
                                <ul>
                                    <li> Your password must be at least <strong>8 characters long</strong> </li>
                                    <li>contain at least one <strong>uppercase</strong> letter and one <strong>number</strong></li>
                                    <li>one special character such as <strong>!, @, #, $, %, ^, &, or *</strong></li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword