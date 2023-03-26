import React, { useState } from "react";
import Switch from "react-switch";
import classes from "./StrictRadio.module.scss";
interface StrictRadioCheckProps {
  switchNameVal: string;
  handleSwitchToggle :   (mess: string) => void;
  selectedSwitches : string[];
}
const StrictRadioCheck: React.FC<StrictRadioCheckProps> = ({
  switchNameVal,
  handleSwitchToggle,
  selectedSwitches,
}) => {
 
  return (
    <div className={classes.StrictWrapper}>
      {/* <h4 className="text-center text-danger mb-3">Strict Filters</h4> */}
      <div className={classes.StrictWrapper_section}>
        <div className={`${classes.Switch} ${classes.marTOP}`}>
          <span>Good to have</span>
          <Switch
            className={classes.SwitctCusttom}
            onChange={() => handleSwitchToggle(switchNameVal)}
            checked={selectedSwitches?.includes(switchNameVal)}
          />
          <span>Must To have</span>
        </div>
      </div>
    </div>
  );
};

export default StrictRadioCheck;
