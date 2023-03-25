import React, { useState } from "react";
import Switch from "react-switch";
import classes from "./StrictRadio.module.scss";
interface StrictRadioCheckProps {
  onSetFilters: (filters: string[]) => void;
  defaultValue: string[];
}
const StrictRadioCheck: React.FC<StrictRadioCheckProps> = ({
  onSetFilters,
  defaultValue,
}) => {
  const [selectedSwitches, setSelectedSwitches] =
    useState<string[]>(defaultValue);
  const switches = [
    "Age",
    "height",
    "country",
    "state",
    "city",
    "education",
    "occupation",
    "annual_income",
    "Marital_Status",
    "religion",
    "mother_tongue",
    "caste",
    "residentialstatus",
    "manglik",
    "diet",
    "smoking",
    "drinking",
    "settleabroad",
    "challenged",
    "Children_Status",
  ];
  const marTOP = [
    "country",
    "state",
    "city",
    "education",
    "occupation",
    "Marital_Status",
    "mother_tongue",
    "religion",
    "caste",
    "residentialstatus",
    "manglik",
    "Children_Status",
    "challenged",
  ];

  const handleSwitchToggle = (switchValue: string) => {
    const newSelectedSwitches = selectedSwitches.includes(switchValue)
      ? selectedSwitches.filter(
          (selectedSwitch) => selectedSwitch !== switchValue
        )
      : [...selectedSwitches, switchValue];
    setSelectedSwitches(newSelectedSwitches);
  };

  return (
    <div className={classes.StrictWrapper}>
      <h4 className="text-center text-danger mb-3">Strict Filters</h4>
      <div className={classes.StrictWrapper_section}>
        {switches.map((switchValue) => (
          <div
            key={switchValue}
            className={
              marTOP.includes(switchValue)
                ? `${classes.Switch} ${classes.marTOP} `
                : `${classes.Switch} ${classes.mart5} `
            }
          >
            <span>Good to have</span>
            <Switch
              className={classes.SwitctCusttom}
              onChange={() => handleSwitchToggle(switchValue)}
              checked={selectedSwitches.includes(switchValue)}
            />
            <span>Must To have</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrictRadioCheck;
