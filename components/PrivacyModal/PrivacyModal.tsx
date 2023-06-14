import React, { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import classes from './Privacy.module.scss'
import PrivacyCheck from '../StrictRadioCheck/PrivacyRadioCheck';
import ActionCustomButton from '../Button/ActionCustomButton';
import { BsInfoCircleFill } from 'react-icons/bs';
import axios from 'axios';
import { getUserId, selectAuthSuccess } from '../../ducks/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../ducks/auth/actions';
import { LoginJsonResponse } from '../../ducks/auth/types';


interface PrivacyState {
    showPhoto: string;
    showContact: string;
    showName: string;
}

interface ComponentProps {
    privacy: boolean;
    handleClose: () => void;
    privacyset: (val: boolean) => void;
    nullesVal?: boolean;
}
const PrivacyModal: React.FC<ComponentProps> = ({ handleClose, privacy, privacyset, nullesVal }) => {
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    const [privacyModalLoading, setPrivacyModalLoading] = useState(false);


    const persist = useSelector(selectAuthSuccess)
    const persistJsonResponse = persist?.jsonResponse;

    const [privacyState, setPrivacyState] = useState({
        showPhoto: persistJsonResponse?.privacy_show_photo === "I" ? "I" : "P",
        showContact: persistJsonResponse?.privacy_show_contact === "I" ? "I" : "P",
        showName: persistJsonResponse?.privacy_show_name === "I" ? "I" : "P",
    })

    const [privacyStateTemp, setPrivacyStateTemp] = useState({
        showPhoto: persistJsonResponse?.privacy_show_photo === "I" ? "I" : "P",
        showContact: persistJsonResponse?.privacy_show_contact === "I" ? "I" : "P",
        showName: persistJsonResponse?.privacy_show_name === "I" ? "I" : "P",
    })


    useEffect(() => {
        setPrivacyStateTemp({
            showPhoto: persistJsonResponse?.privacy_show_photo === "I" ? "I" : "P",
            showContact: persistJsonResponse?.privacy_show_contact === "I" ? "I" : "P",
            showName: persistJsonResponse?.privacy_show_name === "I" ? "I" : "P",
        })
        setPrivacyState({
            showPhoto: persistJsonResponse?.privacy_show_photo === "I" ? "I" : "P",
            showContact: persistJsonResponse?.privacy_show_contact === "I" ? "I" : "P",
            showName: persistJsonResponse?.privacy_show_name === "I" ? "I" : "P",
        })
    }, [persistJsonResponse])


    const modalClose = () => {
        handleClose();
        setPrivacyState(privacyStateTemp);
    }

    const handleSwitchToggle = (switchValue: keyof typeof privacyState) => {
        const updatedState = { ...privacyState };
        updatedState[switchValue] = updatedState[switchValue] === 'P' ? 'I' : 'P';
        setPrivacyState(updatedState);
    };

    const handlePrivacySave = async () => {
        setPrivacyModalLoading(true);
        const privacyUpdateRes = await axios.post(`${process.env.NEXT_PUBLIC_URL}/privacy/updatePrivacy`,
            { ...privacyState, userId })

        const updatedPersist = {
            ...persist,
            jsonResponse: {
                ...persist?.jsonResponse,
                privacy_show_contact: privacyUpdateRes.data.jsonResponse.privacy_show_contact,
                privacy_show_name: privacyUpdateRes.data.jsonResponse.privacy_show_name,
                privacy_show_photo: privacyUpdateRes.data.jsonResponse.privacy_show_photo
            }
        };

        dispatch(loginSuccess(updatedPersist as LoginJsonResponse));

        privacyUpdateRes?.data?.output === 1 && (privacyset(false), setPrivacyModalLoading(false));

    };




    return (
        <Modal show={privacy} >
            {nullesVal ?
                <Modal.Header>
                    <Modal.Title>Privacy Settings</Modal.Title>
                </Modal.Header>
                : <Modal.Header closeButton onHide={modalClose}>
                    <Modal.Title>Privacy Settings</Modal.Title>
                </Modal.Header>
            }

            <Modal.Body>
                {privacyModalLoading ?
                    <div className={classes.loadingWrapper}>
                        <Spinner as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true" />
                        Loading...
                    </div>
                    :
                    <div className={classes.BodyMain}>
                        <div className={classes.privacy_Info}>
                            Choose your privacy settings to control who can access your information. Your details, including photos, phone number, and email .
                        </div>

                        <div className={classes.privacy_row}>
                            <h5>Name</h5>
                            <PrivacyCheck
                                handleSwitchToggle={handleSwitchToggle}
                                switchNameVal="showName"
                                selectedSwitches={privacyState}
                            />
                        </div>
                        <div className={classes.privacy_row}>
                            <h5>Contact</h5>
                            <PrivacyCheck
                                handleSwitchToggle={handleSwitchToggle}
                                switchNameVal="showContact"
                                selectedSwitches={privacyState}
                            />
                        </div>
                        <div className={classes.privacy_row}>
                            <h5>Photo</h5>
                            <PrivacyCheck
                                handleSwitchToggle={handleSwitchToggle}
                                switchNameVal="showPhoto"
                                selectedSwitches={privacyState}
                            />
                        </div>
                        <div className={classes.BasedInfo}>
                            <p>
                                <span><BsInfoCircleFill /></span>
                                <span className={classes.InfoAbout}>Based on Interest : </span>
                                <span>nobody can see your details unless the user shows interest in your profile and you accept it.</span>
                            </p>

                        </div>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalClose}>
                    Close
                </Button>
                {/* {!nullesVal && <Button variant="secondary" onClick={modalClose}>
                    Close
                </Button>} */}
                <ActionCustomButton onClick={handlePrivacySave}>
                    Save Changes
                </ActionCustomButton>
            </Modal.Footer>
        </Modal>
    )
}

export default PrivacyModal