import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import classes from "./CastDropdown.module.scss";

interface Data {
  id?: string;
  val: string;
}
interface DropdownGridProps {
  title: string;
  data: { id: number; caste: string }[];
  nameid: string;
  selectedDataFn: ({ id, val }: Data) => void;
  defaultValue?: string;
}
const CastListDropDown: React.FC<DropdownGridProps> = ({
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

  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchedData, setSearchedData] = useState(data);
  const [selectedData, setSelectedData] = useState<Data>({
    id: defaultValue,
    val: "",
  });
  const [placeholderVal, setPlaceholderVal] = useState(
    findKeyByValue(data, defaultValue) || ""
  );

  const searchDataFunc = (query: any) => {
    const searched = data.filter((item) =>
      item.caste.toLowerCase().includes(query.toLowerCase())
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
              placeholderVal &&
              placeholderVal.split("-")[0].replaceAll("_", " ")
            }
            onChange={(e) => searchDataFunc(e.target.value)}
            onClick={() => setActiveList(true)}
          />
        </li>
        <div
          className={`${activeList ? classes.active : ""} ${
            classes.inputBoxVal
          }`}
        >
          <ul>
            {searchedData.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    getClickedData({
                      val: item.caste,
                      id: String(item.id),
                    });
                  }}
                  className={selectedData.val === item.caste ? classes.tabActive : ""}
                >
                  <span>{item.caste}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CastListDropDown;
