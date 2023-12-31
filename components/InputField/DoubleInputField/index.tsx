import classes from "./DoubleInput.module.scss";
import React, { useState, useEffect, useRef } from "react";
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
  const elementRef1 = useRef<HTMLDivElement>(null);
  const elementRef2 = useRef<HTMLDivElement>(null);
  const [activeList1, setActiveList1] = useState<boolean>(false);

  const [activeList2, setActiveList2] = useState<boolean>(false);

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
    updateHostedArray1(data);
    onDataFrom(data);
  };

  const getClickedData2 = (data: string) => {
    updateHostedArray2(data);
    onDataTo(data);
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        elementRef1.current &&
        !elementRef1?.current?.contains(event.target)
      ) {
        setActiveList1(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef1]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        elementRef2.current &&
        !elementRef2?.current?.contains(event.target)
      ) {
        setActiveList2(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef2]);

  return (
    <React.Fragment>
      <div className={classes.twoBox}>
        <label>{inputName}</label>
        <div
          className={classes.inputBox}
          onClick={() =>
            openList({ condition: !activeList1, query: "firstinp" })
          }
          ref={elementRef1}
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
          ref={elementRef2}
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
