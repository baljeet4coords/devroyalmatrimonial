import React, { useState, useEffect } from "react";
import classes from "./HeightFeetToCmSingle.module.scss";
import { Form } from "react-bootstrap";

interface Props {
  label: string;
  defaultValue?: number;
  onHeightChange: (height: number | null) => void;
}

function HeightInput(props: Props) {
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  const [centimeters, setCentimeters] = useState<number>(
    props.defaultValue ?? 0
  );

  useEffect(() => {
    if (centimeters !== null) {
      const totalInches = centimeters / 2.54;
      const feet = Math.floor(totalInches / 12).toString();
      const remainingInches = (totalInches % 12).toFixed(0);
      setFeet(feet);
      setInches(remainingInches);
    } else {
      setFeet("");
      setInches("");
    }
    props.onHeightChange(centimeters);
  }, [centimeters, props]);

  const handleFeetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeet(event.target.value);
    const feetValue = parseInt(event.target.value) || 0;
    const inchesValue = parseInt(inches) || 0;
    setCentimeters(feetValue * 30.48 + inchesValue * 2.54);
  };

  const handleInchesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInches(event.target.value);
    const inchesValue = parseInt(event.target.value) || 0;
    const feetValue = parseInt(feet) || 0;
    setCentimeters(feetValue * 30.48 + inchesValue * 2.54);
  };

  const handleCentimetersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const centimeters = parseFloat(event.target.value) || 0;
    setCentimeters(centimeters);
  };

  return (
    <Form.Group className="mb-0">
      <Form.Label className={`${classes.heightlabel} mb-2`}>{props.label}</Form.Label>

      <div className="d-flex align-items-center">
        <Form.Control
          type="number"
          min="0"
          placeholder="Feet"
          value={feet}
          onChange={handleFeetChange}
          className={classes.heightInput}
        />
        <span className="text-muted px-0 mx-2">ft</span>
        <Form.Control
          type="number"
          min="0"
          max="11"
          placeholder="Inches"
          value={inches}
          onChange={handleInchesChange}
          className={classes.heightInput}
        />
        <span className="text-muted px-0 mx-2">in</span>
        <Form.Control
          type="number"
          min="0"
          placeholder="Centimeters"
          value={String(Math.ceil(+centimeters)) ?? ""}
          onChange={handleCentimetersChange}
          className={classes.heightInput}
        />
        <span className="text-muted px-0 mx-2">cm</span>
      </div>
    </Form.Group>
  );
}

export default HeightInput;
