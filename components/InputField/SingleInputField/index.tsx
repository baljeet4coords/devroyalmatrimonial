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
    const searchHostedArrays = Object.keys(data).filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    UpdatesearchHostedArray(searchHostedArrays);
  };

  const getClickedData = useCallback(
    ({ val, id }: { val: string; id: string }) => {
      if (HostedArray.indexOf(id) === -1)
        updateHostedArray((prevArray) => [...prevArray, id]);
      onChange([...HostedArray, id]);
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
        <div className={classes.inputBox}>
          <ul onClick={() => setActiveList(true)}>
            {HostedArray.map((uid: string) => {
              const [name, id] = combinedData[+uid].split("-");
              return (
                <li key={id}>
                  <span>{name}</span>
                  <IoClose onClick={() => getClickedDeleteData(+uid)} />
                </li>
              );
            })}
            <li className={classes.blankInput}>
              <input
                type="text"
                placeholder={
                  HostedArray.length < 1 ? "Select Some Options" : ""
                }
                onChange={(e) => searchDataFunc(e.target.value)}
              />
            </li>
          </ul>
          <div
            className={`${activeList ? classes.active : ""} ${
              classes.inputBoxVal
            }`}
            ref={elementRef}
          >
            <ul>
              {searchHostedArray.map((item) => {
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
                    <span>{name}</span>
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

export default SingleInput;
