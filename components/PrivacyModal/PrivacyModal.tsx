import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import classes from './Privacy.module.scss'
import PrivacyCheck from '../StrictRadioCheck/PrivacyRadioCheck';
import ActionCustomButton from '../Button/ActionCustomButton';

interface CopmonentProps {
    privacy: boolean;
    selectedSwitches: string[];
    handleClose: () => void;
    handleSwitchChange: (val: string) => void;
    handlePrivacySave: (val: string[]) => void;
}
const PrivacyModal: React.FC<CopmonentProps> = ({ handleSwitchChange, selectedSwitches, handleClose, privacy, handlePrivacySave }) => {



    return (
        <Modal show={privacy} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Privacy Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={classes.BodyMain}>
                    <div className={classes.privacy_Info}>
                        Choose your privacy settings to control who can access your information. Your details, including photos, phone number, and email .
                    </div>

                    <div className={classes.privacy_row}>
                        <h5>Phone No</h5>
                        <PrivacyCheck
                            handleSwitchToggle={handleSwitchChange}
                            switchNameVal="phoneNo"
                            selectedSwitches={selectedSwitches}
                        />
                    </div>
                    <div className={classes.privacy_row}>
                        <h5>Email</h5>
                        <PrivacyCheck
                            handleSwitchToggle={handleSwitchChange}
                            switchNameVal="email"
                            selectedSwitches={selectedSwitches}
                        />
                    </div>
                    <div className={classes.privacy_row}>
                        <h5>Photo</h5>
                        <PrivacyCheck
                            handleSwitchToggle={handleSwitchChange}
                            switchNameVal="photo"
                            selectedSwitches={selectedSwitches}
                        />
                    </div>
                </div>
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