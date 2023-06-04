import _ from "lodash";
import classes from "./SingleInput.module.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

interface MyComponentProps {
  inputName: string;
  data: {};
  isFromRegistered?: boolean;
  onChange: (data: string[]) => void;
  defaultValues: string[];
}

const SingleInput: React.FC<MyComponentProps> = ({
  inputName,
  data,
  onChange,
  defaultValues,
  isFromRegistered,
}) => {
  const combinedData = Object?.entries(data).map(
    ([key, value]) => `${key}-${value}`
  );

  const [HostedArray, updateHostedArray] = useState<string[]>(
    defaultValues || []
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [stateSize, setSize] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 767);
    });
    window.dispatchEvent(new Event("resize"));
  }, []);

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
    const modifiedQuery = query.replace(/ /g, "_");
    const searchHostedArrays = combinedData.filter((item) =>
      item.toLowerCase().includes(modifiedQuery.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  const getClickedData = ({ val, id }: { val: string; id: string }) => {
    const getIndex = String(combinedData.indexOf(val));
    if (getIndex == "0") {
      updateHostedArray(["0"]);
      setTimeout(() => {
        setActiveList(false);
      }, 0);
    } else {
      if (HostedArray.indexOf(getIndex) === -1) {
        updateHostedArray(HostedArray.filter((indx) => indx > "0"));
        updateHostedArray((prevArray) => [...prevArray, getIndex]);
      }
    }
    UpdatesearchHostedArray(combinedData);
    setSearchInput("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    onChange(HostedArray);
  }, [HostedArray]);

  const getClickedDeleteData = (id: number) => {
    const newArray = HostedArray.filter((item) => +item !== id);
    updateHostedArray(newArray);
  };

  function HandleCloseDropdown() {
    setTimeout(() => {
      setActiveList(false)
    }, 50);
  }

  return (
    <React.Fragment>
      <div
        className={`${isFromRegistered && classes.singleBoxReg} ${classes.singleBox
          }`}
        ref={elementRef}
      >
        <label>{inputName}</label>
        <div className={classes.inputBox} onClick={() => setActiveList(true)}>
          {activeList && (
            <div className={classes.inputbox_Sections}>
              <input
                type="text"
                placeholder={HostedArray.length < 1 ? "Select Some Options" : ""}
                value={searchInput}
                onChange={(e) => searchDataFunc(e.target.value)}
                ref={inputRef}
              />
              {stateSize && <div onClick={HandleCloseDropdown}>
                <IoClose />close
              </div>}
            </div>

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
            className={`${activeList ? classes.active : ""} ${classes.inputBoxVal
              }`}
            ref={elementRef}
          >
            <ul>
              {searchHostedArray.length > 0 ? (
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
                        _.map(HostedArray, String).includes(id) ? classes.tabActive : ""
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
