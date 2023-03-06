import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Gender } from "../../types/enums";
import classes from "./GenderInput.module.scss"

interface GenderRadioButtons {
  selectedGender: string;
  onChangeGender: (gender: string) => void;
}
const GenderRadioButtons: React.FC<GenderRadioButtons> = ({
  onChangeGender,
  selectedGender,
}) => {
  return (
    <Form.Group className={classes.gender_Section_Mob}>
      <Form.Label>Gender</Form.Label>
      <div className={`${classes.gender_main}  d-flex`}>
        <Form.Check
          type="radio"
          name="gender"
          id={Gender.Male}
          value={Gender.Male}
          label="Male"
          checked={selectedGender === Gender.Male}
          onChange={(event) => onChangeGender(event.target.value)}
          className={classes.Gender_from_input}
        />
        <Form.Check
          type="radio"
          name="gender"
          id={Gender.Female}
          value={Gender.Female}
          label="Female"
          checked={selectedGender === Gender.Female}
          onChange={(event) => onChangeGender(event.target.value)}
          className={classes.Gender_from_input}
        />
      </div>
    </Form.Group>
  );
};

export default GenderRadioButtons;
