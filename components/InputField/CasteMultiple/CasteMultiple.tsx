import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CasteMultiple.module.scss";
import { IoClose } from "react-icons/io5";
import {
  CastListArray,
  ICastListArray,
} from "../../../constants/CastListArray";

interface CityMultiple {
  onChangeCaste: (caste: number[]) => void;
  defaultValues: number[];
}
const CasteMultiple: React.FC<CityMultiple> = ({
  onChangeCaste,
  defaultValues,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [castesIds, setCastesIds] = useState<number[]>(defaultValues);
  const [HostedArray, updateHostedArray] = useState<ICastListArray[]>(
    CastListArray.filter((_, index) => defaultValues.includes(index))
  );
  const [activeList, setActiveList] = useState<boolean>(false);

  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICastListArray[]>(CastListArray);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = CastListArray.filter((item) =>
      item.caste.toLowerCase().includes(query.toLowerCase())
    );
    UpdatesearchHostedArray(searchHostedArrays);
  };

  const getClickedData = useCallback(
    (caste: ICastListArray, casteIndex: number) => {
      if (!HostedArray.some((item) => Object.is(item, caste))) {
        setCastesIds((prev) => [...prev, casteIndex]);
        updateHostedArray((prevArray) => [...prevArray, caste]);
      }
      onChangeCaste([...castesIds, casteIndex]);
    },
    [HostedArray, castesIds, onChangeCaste]
  );
  const getClickedDeleteData = (id: number) => {
    const newArray = HostedArray.filter((item) => item.id !== id);
    updateHostedArray(newArray);
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
    <>
      <div className={classes.singleBox} ref={elementRef}>
        <label>Caste</label>
        <div className={classes.inputBox}>
          <ul
            onClick={() => {
              setActiveList(true);
            }}
          >
            {HostedArray.map((item) => {
              return (
                <li key={item.id}>
                  <span>{item.caste}</span>
                  <IoClose onClick={() => getClickedDeleteData(item.id)} />
                </li>
              );
            })}
            <li className={classes.blankInput}>
              <input
                type="text"
                placeholder={
                  HostedArray.length < 1 ? "Select Some Options" : ""
                }
                onChange={(e) => {
                  searchDataFunc(e.target.value);
                }}
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
              {searchHostedArray.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => getClickedData(item, index)}
                    className={
                      HostedArray.includes(item) ? classes.tabActive : ""
                    }
                  >
                    <span>{item.caste}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasteMultiple;
