import { useRef, useState } from "react";
import classes from "./Dropdown.module.scss";

interface Data {
  val: string;
  id: string;
}
interface DropdownGridProps {
  title: string;
  data: {};
}
const DropdownGridSingleSelect: React.FC<DropdownGridProps> = ({
  title,
  data,
}) => {
  const combinedData = Object.entries(data).map(
    ([key, value]) => `${key}-${value}`
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchedData, setSearchedData] = useState<string[]>(combinedData);
  const [selectedData, setSelectedData] = useState<Data>({ id: "", val: "" });
  console.log(selectedData);
  const ref = useRef<any>();

  const searchDataFunc = (query: any) => {
    const searched = Object.keys(data).filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedData(searched);
  };

  const getClickedData = (data: Data) => {
    setSelectedData(data);
    ref.current.value = "";
  };
  return (
    <div className={classes.singleBox}>
      <label>{title}</label>
      <div
        className={classes.inputBox}
        onClick={() => setActiveList(!activeList)}
      >
        <li className={classes.blankInput}>
          <input
            type="text"
            placeholder={selectedData.val || "Select Some Options"}
            ref={ref}
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
              const id = item.split("-")[1];
              return (
                <li
                  key={id}
                  onClick={() =>
                    getClickedData({
                      val: item,
                      id,
                    })
                  }
                  className={selectedData.val === item ? classes.tabActive : ""}
                >
                  <span>{item}</span>
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
