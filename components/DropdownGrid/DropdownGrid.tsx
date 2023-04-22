import { FocusEvent, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import classes from "./Dropdown.module.scss";

interface Data {
  id?: string;
  val: string;
}
interface DropdownGridProps {
  title: string;
  data: {};
  nameid: string;
  selectedDataFn: ({ id, val }: { id?: string; val: string }) => void;
  defaultValue?: string;
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

  const findKeyByValue = (obj: any, value?: string): string => {
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
  const [selectedData, setSelectedData] = useState<Data>({
    id: defaultValue,
    val: "",
  });
  const [placeholderVal, setPlaceholderVal] = useState(
    findKeyByValue(data, defaultValue) || ""
  );

  const searchDataFunc = (query: any) => {
    const searched = Object.keys(data).filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedData(searched);
    setPlaceholderVal(query);
  };

  useEffect(() => {
    if (defaultValue) {
      selectedDataFn({ id: defaultValue, val: "" });
    }
  }, [defaultValue, selectedDataFn]);

  const getClickedData = (data: Data) => {
    setSelectedData(data);
    selectedDataFn(data);
    setPlaceholderVal(data.val);
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
            placeholder={"Select Option"}
            value={
              placeholderVal
                ? placeholderVal.split("-")[0].replaceAll("_", " ")
                : ""
            }
            onChange={(e) => searchDataFunc(e.target.value)}
            onClick={() => setActiveList(!activeList)}
            autoComplete="off"
            autoCorrect="off"
          />
        </li>
        <div
          className={`${activeList ? classes.active : ""} ${classes.inputBoxVal
            }`}
        >
          <ul>
            {searchedData.map((item) => {
              const [name, id] = item.split("-");
              const clearName = name
                .replace(/_/g, " ")
                .replace(/plus/g, "+ve")
                .replace(/negative/g, "-ve");
              return (
                <li
                  key={item}
                  onClick={() => {
                    const unixID = findidOFSelect(name);
                    getClickedData({
                      val: item,
                      id: String(unixID),
                    });
                  }}
                  className={
                    selectedData.id === item.split("-")[1]
                      ? classes.tabActive
                      : ""
                  }
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
