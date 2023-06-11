import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import classes from './Privacy.module.scss'
import PrivacyCheck from '../StrictRadioCheck/PrivacyRadioCheck';
import ActionCustomButton from '../Button/ActionCustomButton';
import { BsInfoCircleFill } from 'react-icons/bs';


interface PrivacyState {
    showPhoto: string;
    showContact: string;
    showName: string;
}

interface ComponentProps {
    privacy: boolean;
    privacyModalLoading: boolean;
    selectedSwitches: PrivacyState;
    handleClose: () => void;
    handleSwitchChange: (val: keyof PrivacyState) => void;
    handlePrivacySave: (selectedSwitches: PrivacyState) => void;
}
const PrivacyModal: React.FC<ComponentProps> = ({ handleSwitchChange, privacyModalLoading, selectedSwitches, handleClose, privacy, handlePrivacySave }) => {



    return (
        <Modal show={privacy} >
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title>Privacy Settings</Modal.Title>
            </Modal.Header>
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
                                handleSwitchToggle={handleSwitchChange}
                                switchNameVal="showName"
                                selectedSwitches={selectedSwitches}
                            />
                        </div>
                        <div className={classes.privacy_row}>
                            <h5>Contact</h5>
                            <PrivacyCheck
                                handleSwitchToggle={handleSwitchChange}
                                switchNameVal="showContact"
                                selectedSwitches={selectedSwitches}
                            />
                        </div>
                        <div className={classes.privacy_row}>
                            <h5>Photo</h5>
                            <PrivacyCheck
                                handleSwitchToggle={handleSwitchChange}
                                switchNameVal="showPhoto"
                                selectedSwitches={selectedSwitches}
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
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <ActionCustomButton onClick={() => handlePrivacySave(selectedSwitches)}>
                    Save Changes
                </ActionCustomButton>
            </Modal.Footer>
        </Modal>
    )
}

export default PrivacyModal