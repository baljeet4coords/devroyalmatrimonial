import React, { useState } from 'react'
import classes from "./Confirmaton.module.scss";
import { Button, Form, Image, Spinner } from 'react-bootstrap';

type ComponentProps = {
    confirmationsFun: () => void;
    handleInterestPopupHide: () => void;
    popuptype: boolean;
    loading: boolean;
}

const ConfirMationsPopup: React.FC<ComponentProps> = ({ confirmationsFun, handleInterestPopupHide, popuptype, loading }) => {

    return (
        <div className={classes.modal_form}>
            <div className={classes.ResetForm} >

                <div className={classes.ImageSection}>
                    <Image src={popuptype ? './Images/send-interest.webp' : './Images/user-blocked.png'} alt='user photo' />
                </div>
                <div className={classes.ResetHeader}>
                    <h4>Are you sure ?</h4>
                    <p>Are you sure you want to {popuptype ? <span>send Interest to</span> : <span>block</span>} this user ?</p>
                </div>
                <div className={classes.FormDiv}>
                    <div className={classes.ButtonSection}>
                        <Button
                            type="submit"
                            className={` ${classes.FromBtnSubmit} `}
                            onClick={handleInterestPopupHide}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className={classes.SuccessFormButton}
                            onClick={confirmationsFun}
                            disabled={loading}
                        >
                            {loading && (
                                <Spinner
                                    className={classes.loginSpiner}
                                    animation="border"
                                    variant="light"
                                />
                            )}
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirMationsPopup