import React from "react";
import Switch from "react-switch";
import classes from "./StrictRadio.module.scss";

interface PrivacyState {
    showPhoto: string;
    showContact: string;
    showName: string;
}

interface PrivacyCheckProps {
    switchNameVal: keyof PrivacyState;
    handleSwitchToggle: (val: keyof PrivacyState) => void;
    selectedSwitches: PrivacyState;
}

const PrivacyCheck: React.FC<PrivacyCheckProps> = ({
    switchNameVal,
    handleSwitchToggle,
    selectedSwitches,
}) => {
    return (
        <div className={`${classes.StrictWrapper} ${classes.privacyWrapper}`}>
            <div className={classes.StrictWrapper_section}>
                <div className={`${classes.Switch} ${classes.marTOP}`}>
                    <span>Public</span>
                    <Switch
                        className={classes.SwitctCusttom}
                        onChange={() => handleSwitchToggle(switchNameVal)}
                        checked={selectedSwitches[switchNameVal] !== "P"}
                    />
                    <span>Based on Interest</span>
                </div>
            </div>
        </div>
    );
};

export default PrivacyCheck;
