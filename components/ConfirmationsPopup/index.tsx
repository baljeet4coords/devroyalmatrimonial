import React, { useState } from 'react'
import classes from "./Confirmaton.module.scss";
import { Button, Form, Image, Spinner } from 'react-bootstrap';

type ComponentProps = {
    confirmationsFun: () => void;
    handleInterestPopupHide: () => void;
    loading: boolean;
    index: number;
    title: string;
}

const ConfirMationsPopup: React.FC<ComponentProps> = ({ confirmationsFun, handleInterestPopupHide, loading, index, title }) => {

    const contentPopup = [
        {
            img: '/Images/send-interest.webp',
            content: 'send Interest to'
        },
        {
            img: '/Images/user-blocked.png',
            content: 'block'
        },
        {
            img: '/Images/accept_interest.webp',
            content: 'accept interest of'
        },
        {
            img: '/Images/decline_interest.webp',
            content: 'decline interest of'
        },
        {
            img: '/Images/recall_Interest.png',
            content: 'recall interest of'
        },
    ]



    return (
        <div className={classes.modal_form}>
            <div className={classes.ResetForm} >

                <div className={classes.ImageSection}>
                    <Image src={contentPopup[index]?.img} alt={contentPopup[index]?.content} />
                </div>
                <div className={classes.ResetHeader}>
                    <h4>Are you sure ?</h4>
                    <p>Are you sure you want to <span>{title} </span> this user ?</p>
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