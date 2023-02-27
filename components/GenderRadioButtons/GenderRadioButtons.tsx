import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Gender } from "../../types/enums";

interface GenderRadioButtons {
  selectedGender: string;
  onChangeGender: (gender: string) => void;
}
const GenderRadioButtons: React.FC<GenderRadioButtons> = ({
  onChangeGender,
  selectedGender,
}) => {
  return (
    <Form.Group>
      <Form.Label>Gender</Form.Label>
      <div className="d-flex">
        <Form.Check
          type="radio"
          name="gender"
          id={Gender.Male}
          value={Gender.Male}
          label="Male"
          checked={selectedGender === Gender.Male}
          onChange={(event) => onChangeGender(event.target.value)}
          className="me-3"
        />
        <Form.Check
          type="radio"
          name="gender"
          id={Gender.Female}
          value={Gender.Female}
          label="Female"
          checked={selectedGender === Gender.Female}
          onChange={(event) => onChangeGender(event.target.value)}
        />
      </div>
    </Form.Group>
  );
};

export default GenderRadioButtons;
