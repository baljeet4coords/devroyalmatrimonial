import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CasteMultiple.module.scss";
import { IoClose } from "react-icons/io5";
import {
  CastListArray,
  ICastListArray,
} from "../../../constants/CastListArray";

interface CastMultiple {
  onChangeCaste: (caste: number[]) => void;
  defaultValues: number[];
}
interface ModifiedDataState {
  id: number;
  caste: string;
}
const CasteMultiple: React.FC<CastMultiple> = ({
  onChangeCaste,
  defaultValues,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const DoesNotMatter: ModifiedDataState = {
    id: 0,
    caste: "Does Not Matter",
  };
  const ListOfCaste: ICastListArray[] = [DoesNotMatter, ...CastListArray];
  const [castesIds, setCastesIds] = useState<number[]>(defaultValues);
  const [HostedArray, updateHostedArray] = useState<ICastListArray[]>(
    CastListArray.filter((_, index) => defaultValues.includes(index))
  );
  const [activeList, setActiveList] = useState<boolean>(false);

  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICastListArray[]>(ListOfCaste);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchHostedArray[0].caste != "Does Not Matter") {
      searchHostedArray.unshift(DoesNotMatter);
    }
  }, []);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = ListOfCaste.filter((item) =>
      item.caste.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // For removeing the selcted item if Does not Matter is selected
  useEffect(() => {
    if (castesIds.length > 1 && castesIds.includes(0)) {
      setCastesIds([0]);
      updateHostedArray([searchHostedArray[0]]);
    }
  }, [castesIds]);

  const getClickedData = useCallback(
    (caste: ICastListArray) => {
      const getIndex = ListOfCaste.findIndex(
        (obj) => obj.caste === caste.caste
      );
      if (!HostedArray.some((item) => Object.is(item, caste))) {
        setCastesIds((prev) => [...prev, getIndex]);
        updateHostedArray((prevArray) => [...prevArray, caste]);
        setSearchInput("");
        UpdatesearchHostedArray(ListOfCaste);
      }
      onChangeCaste([...castesIds, getIndex]);
    },
    [HostedArray, castesIds, onChangeCaste]
  );
  const getClickedDeleteData = (id: number, item: ModifiedDataState) => {
    const itemname = String(item.caste);
    const getIndex = searchHostedArray.findIndex(
      (obj) => obj.caste === itemname
    );
    const casteidsCode = castesIds.filter((item) => item !== getIndex);
    const newArray = HostedArray.filter((item) => item.id !== id);
    updateHostedArray(newArray);
    setCastesIds(casteidsCode);
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
                  <IoClose
                    onClick={() => getClickedDeleteData(item.id, item)}
                  />
                </li>
              );
            })}
            <li className={classes.blankInput}>
              <input
                type="text"
                placeholder={
                  HostedArray.length < 1 ? "Select Some Options" : ""
                }
                value={searchInput}
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
                    onClick={() => getClickedData(item)}
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
