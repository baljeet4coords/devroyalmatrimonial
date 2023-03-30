import classes from "./DoubleInput.module.scss";
import React, { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";

interface HeightFromToProps {
  inputName: string;
  data: string[];
  onDataFrom: (data: string) => void;
  onDataTo: (data: string) => void;
  defaultValueFrom: string;
  defaultValueTo: string;
}

const HeightFromTo: React.FC<HeightFromToProps> = ({
  inputName,
  data,
  onDataFrom,
  onDataTo,
  defaultValueFrom,
  defaultValueTo,
}) => {
  const [activeList1, setActiveList1] = useState<boolean>(false);

  const [activeList2, setActiveList2] = useState<boolean>(false);

  const [FromData, setFromData] = useState<String[]>(data);
  const [ToData, setToData] = useState<String[]>(data);

  const [SelectedData1, updateHostedArray1] = useState<string>();
  // typeof defaultValueFrom === "number"
  //   ? convertToFeetAndInches(+defaultValueFrom / 30.48)
  //   : ""

  const [SelectedData2, updateHostedArray2] = useState<string>();

  const openList = (data: { condition: boolean; query: string }) => {
    if (data.query === "firstinp") setActiveList1(data.condition);
    if (data.query === "secondinp") setActiveList2(data.condition);
  };

  //   1 foot is equal to 30.48 centimeters (cm).
  //   1 inch is equal to 2.54 centimeters (cm).

  const DefaultHeightConvert = (val: number) => {
    const totalInches = val / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    const formattedHeight = `${feet}' ${inches}"`;
    return formattedHeight;
  };

  useEffect(() => {
    defaultValueFrom != (null && undefined) && updateHostedArray1(DefaultHeightConvert(Number(defaultValueFrom)));
    defaultValueTo != (null && undefined) && updateHostedArray2(DefaultHeightConvert(Number(defaultValueTo)));
  }, []);

  const getClickedData1 = (data: string) => {
    const feet = data.split(" ")[0].split("'")[0];
    const inche = data.split(" ")[1].split('"')[0];
    console.log((+feet * 30.48 + +inche * 2.54).toFixed(0));

    updateHostedArray1(data);
    onDataFrom(String(+feet * 30.48 + +inche * 2.54));
  };

  const getClickedData2 = (data: string) => {
    const feet = data.split(" ")[0].split("'")[0];
    const inche = data.split(" ")[1].split('"')[0];

    const Heightin_cm = (+feet * 30.48 + +inche * 2.54).toFixed(0);
    console.log();
    updateHostedArray2(data);
    onDataTo(String(Heightin_cm));
  };

  useEffect(() => {

    if (SelectedData1) {
      const filteredList = data.filter((height) => {
        // Convert the height string to inches for comparison
        const heightInInches =
          parseInt(height) * 12 + parseInt(height.split("' ")[1]);
        const heightArray = SelectedData1.split("' ");
        const feet = parseInt(heightArray[0]);
        const inches = parseInt(heightArray[1]);
        const minInches = feet * 12 + inches; // Minimum height in inches

        // Return true if height is greater than minimum height
        return heightInInches > minInches;
      });
      setToData(filteredList);
    }
    if (SelectedData2) {
      const filteredList = data.filter((height) => {
        // Convert the height string to inches for comparison
        const heightInInches =
          parseInt(height) * 12 + parseInt(height.split("' ")[1]);
        const heightArray = SelectedData2.split("' ");
        const feet = parseInt(heightArray[0]);
        const inches = parseInt(heightArray[1]);
        const minInches = feet * 12 + inches; // Minimum height in inches

        // Return true if height is greater than minimum height
        return heightInInches < minInches;
      });
      setFromData(filteredList);
    }
  }, [SelectedData1, SelectedData2]);

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
          {SelectedData1 ? SelectedData1 : `Height Greater than`}
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
                    <span>{val} </span>
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
          {SelectedData2 ? SelectedData2 : `Height Less than`}
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

export default HeightFromTo;
