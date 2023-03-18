import React, { useState } from "react";
import Switch from "react-switch";
import CustomButton from "../Button/CustomButton";
import { Col, Row } from "react-bootstrap";

interface StrictRadioCheckProps {
  onSetFilters: (filters: string[]) => void;
}
const StrictRadioCheck: React.FC<StrictRadioCheckProps> = ({
  onSetFilters,
}) => {
  const [selectedSwitches, setSelectedSwitches] = useState<string[]>([]);
  const switches = [
    "height",
    "country",
    "state",
    "city",
    "education",
    "occupation",
    "annual_income",
    "children_status",
    "mother_tongue",
    "religion",
    "caste",
    "residentialstatus",
    "manglik",
    "diet",
    "smoking",
    "drinking",
    "readytosettleabroad",
    "challenged",
    "hiv",
  ];

  const handleSwitchToggle = (switchValue: string) => {
    const newSelectedSwitches = selectedSwitches.includes(switchValue)
      ? selectedSwitches.filter(
          (selectedSwitch) => selectedSwitch !== switchValue
        )
      : [...selectedSwitches, switchValue];
    setSelectedSwitches(newSelectedSwitches);
  };

  const onHandleSetFilters = (event: any) => {
    event.preventDefault();
    onSetFilters(selectedSwitches);
  };
  return (
    <div>
      <h4 className="text-center text-danger mb-3">Strict Filters</h4>
      <Row>
        {switches.map((switchValue) => (
          <Col sm={6} key={switchValue} className="mb-3">
            <Switch
              onChange={() => handleSwitchToggle(switchValue)}
              checked={selectedSwitches.includes(switchValue)}
            />
            {switchValue}
          </Col>
        ))}
      </Row>
      {selectedSwitches.length > 0 && (
        <div className="d-flex justify-content-between">
          <CustomButton onClick={() => setSelectedSwitches([])}>
            Remove all filters
          </CustomButton>
          <CustomButton onClick={onHandleSetFilters}>Set Filters</CustomButton>
        </div>
      )}
    </div>
  );
};

export default StrictRadioCheck;
