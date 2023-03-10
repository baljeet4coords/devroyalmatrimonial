import React, { useState, ChangeEvent } from "react";
import classes from "./CastDataList.module.scss";
import { Form } from "react-bootstrap";

interface CastDataListProps {
  options: { religion: string; list: { id: number; cast: string }[] }[];
  selectedOption: (id: string) => void;
}
const CastDataList: React.FC<CastDataListProps> = ({
  options,
  selectedOption,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
    selectedOption(event.target.value);
  };

  const matchingOptions = options.map((option) =>
    option.list.filter((item) =>
      item.cast.toLowerCase().includes(inputValue.toLowerCase())
    )
  );

  return (
    <div className={classes.singleBox}>
      <Form.Control
        type="text"
        value={inputValue}
        onChange={handleChange}
        list="options"
      />
      <datalist id="options">
        {matchingOptions.map((option) => {
          if (option.length) {
            return option.map((item) => (
              <option key={item.id} value={`${item.id}-${item.cast}`} />
            ));
          }
          return null;
        })}
      </datalist>
    </div>
  );
};

export default CastDataList;
