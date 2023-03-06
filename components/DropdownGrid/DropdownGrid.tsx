import { FormikConsumer } from "formik";
import { useRef, useState } from "react";
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
}
const DropdownGridSingleSelect: React.FC<DropdownGridProps> = ({
  title,
  data,
  nameid,
}) => {
  const combinedData = Object.entries(data).map(
    ([key, value]) => `${key}-${value}`
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchedData, setSearchedData] = useState<string[]>(combinedData);
  const [selectedData, setSelectedData] = useState<Data>({ id: "", val: "" });
  // console.log(selectedData);
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
      <Form.Label>{title}</Form.Label>
      <div
        className={classes.inputBox}
        onClick={() => setActiveList(!activeList)}
      >
        <li className={classes.blankInput}>
          <Form.Control
            type="text"
            name={nameid}
            placeholder={selectedData.val || "Select Some Options"}
            ref={ref}
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
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
              // console.log(item);

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
