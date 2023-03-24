import React, { useState, ChangeEvent, useEffect } from "react";
import { Form } from "react-bootstrap";

interface CastDataListProps {
  options: { religion: string; list: { id: number; cast: string }[] }[];
  selectedOption: (id: string) => void;
  defaultValue?: number;
}
const CastDataList: React.FC<CastDataListProps> = ({
  options,
  selectedOption,
  defaultValue,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
    selectedOption(event.target.value);
  };

  useEffect(() => {
    const defaultResult = () => {
      const result = options.find((obj) => {
        return obj.list.some((item) => item.id === defaultValue);
      });
      if (result) {
        const resultObj = result.list.find((item) => item.id === defaultValue);
        return resultObj?.cast;
      }
      return "";
    };
    if (defaultResult()) {
      setInputValue(defaultResult() ?? "");
    }
  }, [defaultValue, options]);

  const matchingOptions = options.map((option) =>
    option.list.filter((item) =>
      item.cast.toLowerCase().includes(inputValue.toLowerCase())
    )
  );

  return (
    <>
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
    </>
  );
};

export default CastDataList;
