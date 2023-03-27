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
  Convert: boolean;
}

const DoubleInput: React.FC<DoubleInputProps> = ({
  inputName,
  data,
  onDataFrom,
  onDataTo,
  defaultValueFrom,
  defaultValueTo,
  Convert,
}) => {
  const [activeList1, setActiveList1] = useState<boolean>(false);

  const [activeList2, setActiveList2] = useState<boolean>(false);

  data = Convert
    ? data.map((element) => String(Math.trunc(Number(element) * 0.0328).toFixed(0)))
    : data;

  const [FromData, setFromData] = useState<String[]>(data);
  const [ToData, setToData] = useState<String[]>(data);

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
    const modifData = Convert ? String((Number(data)*30.48).toFixed(0)) : data;
    console.log(modifData,"Modified data");
    
    updateHostedArray1(data);
    onDataFrom(modifData);
  };

  const getClickedData2 = (data: string) => {
    const modifData = Convert ? String((Number(data)*30.48).toFixed(0)) : data;
    console.log(modifData,"Modified data");
    
    updateHostedArray2(data);
    onDataTo(modifData);
  };

  //if User select From Value first then set Tovalue greater then FromValue
  useEffect(() => {
    const filterData = data.filter((val) => val >= SelectedData1);
    setToData(filterData);
  }, [SelectedData1]);

  //if User select To Value first then set FromValue Less then ToValue
  useEffect(() => {
    const filterData = data.filter((val) => val <= SelectedData2);
    setFromData(filterData);
  }, [SelectedData2]);

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
          {SelectedData1 ? SelectedData1 : `${inputName} Greater than`}
          <SlArrowDown />
          <div
            className={`${activeList1 ? classes.active : ""} ${
              classes.inputBoxVal
            }`}
          >
            <ul>
              {FromData.map((val, idd) => {
                return (
                  <li
                    key={idd}
                    onClick={() => getClickedData1(String(val))}
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
          {SelectedData2 ? SelectedData2 : `${inputName} Less than`}
          <SlArrowDown />
          <div
            className={`${activeList2 ? classes.active : ""} ${
              classes.inputBoxVal
            }`}
          >
            <ul>
              {ToData.map((val, idd) => {
                return (
                  <li
                    key={idd}
                    onClick={() => getClickedData2(String(val))}
                    className={SelectedData2 === val ? classes.tabActive : ""}
                  >
                    {ToData.length >= 1 ? (
                      <span>{val}</span>
                    ) : (
                      <span>No Data Found !!</span>
                    )}
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
