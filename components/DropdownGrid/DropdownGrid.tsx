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
  const elementRef = useRef<HTMLDivElement>(null);
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

  const searchDataFunc = (query: any) => {
    const searched = Object.keys(data).filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedData(searched);
  };

  const InputTypeDataFun = (val: string) => {
    if (val.length > 1) {
      getClickedData({
        val: val,
        id: val,
      });
      setActiveList(false);
    }
  };

  const getClickedData = (data: Data) => {
    setSelectedData(data);
    selectedDataFn(data);
    ref.current.value = "";
    console.log(selectedData);
  };

  return (
    <div className={classes.singleBox} ref={elementRef}>
      <Form.Label>{title}</Form.Label>
      <div
        className={classes.inputBox}
        onClick={() => setActiveList(!activeList)}
      >
        <li className={classes.blankInput}>
          <Form.Control
            type="text"
            name={nameid}
            placeholder={
              selectedData.val.split("-")[0] ||
              (defaultValue && findKeyByValue(data, defaultValue)) ||
              "Select Option"
            }
            defaultValue={selectedData.val}
            ref={ref}
            onBlur={(e) => InputTypeDataFun(e.target.value)}
            onChange={(e) => searchDataFunc(e.target.value)}
          />
        </li>
        <div
          className={`${activeList ? classes.active : ""} ${
            classes.inputBoxVal
          }`}
        >
          <ul>
            {searchedData.map((item) => {
              const [name, id] = item.split("-");
              const clearName = name
                .replace(/_/g, " ")
                .replace(/plus/g, "+")
                .replace(/negative/g, "-");
              return (
                <li
                  key={item}
                  onClick={() =>
                    getClickedData({
                      val: item,
                      id,
                    })
                  }
                  className={selectedData.val === item ? classes.tabActive : ""}
                >
                  <span>{clearName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownGridSingleSelect;
