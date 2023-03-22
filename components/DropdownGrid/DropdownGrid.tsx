import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import classes from "./Dropdown.module.scss";

interface Data {
  val: string;
  id: string;
}
interface DropdownGridProps {
  title: string;
  data: {};
  nameid: string;
  selectedDataFn: (val: Data) => void;
  defaultValue?: number;
}
const DropdownGridSingleSelect: React.FC<DropdownGridProps> = ({
  title,
  data,
  nameid,
  selectedDataFn,
  defaultValue,
}) => {
  const findKeyByValue = (obj: any, value: number): string => {
    for (let key in obj) {
      if (obj[key] === String(value)) {
        return key;
      }
    }
    return "";
  };

  const combinedData = Object.entries(data).map(
    ([key, value]) => `${key}-${value}`
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchedData, setSearchedData] = useState<string[]>(combinedData);
  const [selectedData, setSelectedData] = useState<Data>({ id: "", val: "" });

  const ref = useRef<any>();
  const elementRef = useRef<HTMLDivElement>(null);

  const searchDataFunc = (query: any) => {
    const searched = Object.keys(data).filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedData(searched);
  };

  const getClickedData = (data: Data) => {
    setSelectedData(data);
    selectedDataFn(data);
    setActiveList(false);
  };

  const findidOFSelect = (name: string) => {
    for (const [key, value] of Object.entries(data)) {
      if (key === name) {
        return value;
      }
    }
    return name;
  };

  // for Blood group value change

  useEffect(() => {
    let splitSelectVAL;

    if (selectedData.val.charAt(selectedData.val.length - 1) !== "-") {
      splitSelectVAL = selectedData.val.split("-")[0];
    }

    const idx = selectedData.id;
    switch (splitSelectVAL) {
      case "A_plus":
        setSelectedData({
          id: idx,
          val: "A +ve",
        });
        break;
      case "B_plus":
        setSelectedData({
          id: idx,
          val: "B +ve",
        });
        break;
      case "O_plus":
        setSelectedData({
          id: idx,
          val: "O +ve",
        });
        break;
      case "AB_plus":
        setSelectedData({
          id: idx,
          val: "AB +ve",
        });
        break;
      case "A_negative":
        setSelectedData({
          id: idx,
          val: "A neg",
        });
        break;
      case "B_negative":
        setSelectedData({
          id: idx,
          val: "B neg",
        });
        break;
      case "O_negative":
        setSelectedData({
          id: idx,
          val: "O neg",
        });
        break;

      case "AB_negative":
        setSelectedData({
          id: idx,
          val: "AB neg",
        });
        break;
    }
  }, [activeList]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (elementRef.current && !elementRef?.current?.contains(event.target)) {
        setActiveList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef]);

  return (
    <div className={classes.singleBox} ref={elementRef}>
      <Form.Label>{title}</Form.Label>
      <div className={classes.inputBox}>
        <li className={classes.blankInput}>
          <Form.Control
            type="text"
            name={nameid}
            placeholder={
              selectedData.val.split("-")[0].replaceAll("_", " ") ||
              (defaultValue && findKeyByValue(data, defaultValue)) ||
              "Select Option"
            }
            defaultValue={
              selectedData?.val &&
              selectedData.val.split("-")[0].replaceAll("_", " ")
            }
            onChange={(e) => searchDataFunc(e.target.value)}
            onClick={() => setActiveList(true)}
            id={"dropGridInput"}
          />
        </li>
        {activeList && (
          <div className={`${classes.active}  ${classes.inputBoxVal}`}>
            <ul>
              {searchedData.map((item) => {
                const [name, id] = item.split("-");
                return (
                  <li
                    key={id + name}
                    onClick={() => {
                      const unixID = findidOFSelect(name);
                      getClickedData({
                        val: item,
                        id: unixID,
                      });
                    }}
                    className={
                      selectedData.val === item ? classes.tabActive : ""
                    }
                  >
                    <span>{name.replaceAll("_", " ")}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownGridSingleSelect;
