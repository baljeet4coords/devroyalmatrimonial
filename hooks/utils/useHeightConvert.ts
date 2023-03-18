import React, { useState, ChangeEvent } from "react";

export const useHeightConverter = () => {
  const [feet, setFeet] = useState<string>("");
  const [cm, setCm] = useState<string>("");

  const handleFeetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFeet(event.target.value);
    setCm(feetToCm(event.target.value));
  };

  const handleCmChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCm(event.target.value);
    setFeet(cmToFeet(event.target.value));
  };

  const feetToCm = (feet: string) => {
    const cm = +feet * 30.48;
    return cm.toFixed(2);
  };

  const cmToFeet = (cm: string) => {
    const feet = +cm / 30.48;
    return feet.toFixed(2);
  };

  return { feet, cm, setCm, handleFeetChange, handleCmChange };
};
