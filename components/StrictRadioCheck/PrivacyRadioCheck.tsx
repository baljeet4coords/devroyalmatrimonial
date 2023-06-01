import React, { useState } from "react";
import Switch from "react-switch";
import classes from "./StrictRadio.module.scss";
interface PrivacyCheckProps {
    switchNameVal: string;
    handleSwitchToggle: (mess: string) => void;
    selectedSwitches: string[];
}
const PrivacyCheck: React.FC<PrivacyCheckProps> = ({
    switchNameVal,
    handleSwitchToggle,
    selectedSwitches,
}) => {

    return (
        <div className={classes.StrictWrapper}>
            {/* <h4 className="text-center text-danger mb-3">Strict Filters</h4> */}
            <div className={classes.StrictWrapper_section}>
                <div className={`${classes.Switch} ${classes.marTOP}`}>
                    <span>Public</span>
                    <Switch
                        className={classes.SwitctCusttom}
                        onChange={() => handleSwitchToggle(switchNameVal)}
                        checked={selectedSwitches?.includes(switchNameVal)}
                    />
                    <span>Private</span>
                </div>
            </div>
        </div>
    );
};

export default PrivacyCheck;