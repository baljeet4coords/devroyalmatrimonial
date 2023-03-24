import classes from "./DoubleInput.module.scss";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";

interface DoubleInputProps {
  inputName: string;
  data: string[];
  onDataFrom: (data: string) => void;
  onDataTo: (data: string) => void;
  defaultValueFrom: string;
  defaultValueTo: string;
}

const DoubleInput: React.FC<DoubleInputProps> = ({
  inputName,
  data,
  onDataFrom,
  onDataTo,
  defaultValueFrom,
  defaultValueTo,
}) => {
  const [activeList1, setActiveList1] = useState<boolean>(false);

  const [activeList2, setActiveList2] = useState<boolean>(false);

  const [SelectedData1, updateHostedArray1] = useState<string>(
    defaultValueFrom || ""
  );

  const [SelectedData2, updateHostedArray2] = useState<string>(
    defaultValueTo || ""
  );

  const openList = (data: { condition: boolean; query: string }) => {
    if (data.query === "firstinp") setActiveList1(data.condition);
    if (data.query === "secondinp") setActiveList2(data.condition);
  };
  const getClickedData1 = (data: string) => {
    updateHostedArray1(data);
    onDataFrom(data);
  };

  const getClickedData2 = (data: string) => {
    updateHostedArray2(data);
    onDataTo(data);
  };

  return (
    <React.Fragment>
      <div className={classes.twoBox}>
        <label>{inputName}</label>
        <div
          className={classes.inputBox}
          onClick={() =>
            openList({ condition: !activeList1, query: "firstinp" })
          }
        >
          {SelectedData1 ? SelectedData1 : "From"}
          <SlArrowDown />
          <div
            className={`${activeList1 ? classes.active : ""} ${
              classes.inputBoxVal
            }`}
          >
            <ul>
              {data.map((val, idd) => {
                return (
                  <li
                    key={idd}
                    onClick={() => getClickedData1(val)}
                    className={SelectedData1 === val ? classes.tabActive : ""}
                  >
                    <span>{val}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div
          className={classes.inputBox}
          onClick={() =>
            openList({ condition: !activeList2, query: "secondinp" })
          }
        >
          {SelectedData2 ? SelectedData2 : "To"}
          <SlArrowDown />
          <div
            className={`${activeList2 ? classes.active : ""} ${
              classes.inputBoxVal
            }`}
          >
            <ul>
              {data.map((val, idd) => {
                return (
                  <li
                    key={idd}
                    onClick={() => getClickedData2(val)}
                    className={SelectedData2 === val ? classes.tabActive : ""}
                  >
                    <span>{val}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DoubleInput;
