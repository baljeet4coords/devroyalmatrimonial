import classes from "./SingleInput.module.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

interface MyComponentProps {
  inputName: string;
  data: {};
  onChange: (data: string[]) => void;
  defaultValues: string[];
}

const SingleInput: React.FC<MyComponentProps> = ({
  inputName,
  data,
  onChange,
  defaultValues,
}) => {
  const combinedData = Object?.entries(data).map(
    ([key, value]) => `${key}-${value}`
  );

  const [HostedArray, updateHostedArray] = useState<string[]>(
    defaultValues || []
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (HostedArray.includes("0") && HostedArray.length > 1) {
      updateHostedArray(["0"]);
    }
  }, [HostedArray]);

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

  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<string[]>(combinedData);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = combinedData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  const getClickedData = useCallback(
    ({ val, id }: { val: string; id: string }) => {
      const getIndex = String(combinedData.indexOf(val));
      if (HostedArray.indexOf(id) === -1) {
        updateHostedArray((prevArray) => [...prevArray, getIndex]);
        onChange([...HostedArray, getIndex]);
        setSearchInput("");
        UpdatesearchHostedArray(combinedData);
      }
    },
    [HostedArray, onChange]
  );
  const getClickedDeleteData = (id: number) => {
    const newArray = HostedArray.filter((item) => +item !== id);
    updateHostedArray(newArray);
  };

  return (
    <React.Fragment>
      <div className={classes.singleBox} ref={elementRef}>
        <label>{inputName}</label>
        <div className={classes.inputBox} onClick={() => setActiveList(true)}>
          {activeList && (
            <input
              type="text"
              placeholder={HostedArray.length < 1 ? "Select Some Options" : ""}
              value={searchInput}
              onChange={(e) => searchDataFunc(e.target.value)}
            />
          )}
          <ul className={activeList ? classes.ul_maxh_64 : ""}>
            {HostedArray.length > 0
              ? HostedArray.map((uid: string) => {
                  const [name, id] = combinedData[+uid].split("-");
                  return (
                    <li key={id}>
                      <span>{name.replaceAll("_", " ")}</span>
                      <IoClose onClick={() => getClickedDeleteData(+uid)} />
                    </li>
                  );
                })
              : !activeList && <span>Select Some Options</span>}
          </ul>
          <div
            className={`${activeList ? classes.active : ""} ${
              classes.inputBoxVal
            }`}
            ref={elementRef}
          >
            <ul>
              {searchHostedArray.length > 1 ? (
                searchHostedArray.map((item) => {
                  const [name, id] = item.split("-");
                  return (
                    <li
                      key={item}
                      onClick={() =>
                        getClickedData({
                          val: item,
                          id,
                        })
                      }
                      className={
                        HostedArray.includes(id) ? classes.tabActive : ""
                      }
                    >
                      <span>{name.replaceAll("_", " ")}</span>
                    </li>
                  );
                })
              ) : (
                <span>No Data Found</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleInput;
