import { State, IState } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";
import { IoClose } from "react-icons/io5";

interface StateMultipleProps {
  onChangeState: (state: number[]) => void;
  defaultState: number[];
}
const StateMultiple: React.FC<StateMultipleProps> = ({
  onChangeState,
  defaultState,
}) => {
  const stateOfCountry: IState[] = State.getStatesOfCountry("IN");
  const elementRef = useRef<HTMLDivElement>(null);
  const [statesIds, setStatesIds] = useState<number[]>(defaultState);
  const [HostedArray, updateHostedArray] = useState<IState[]>(
    stateOfCountry.filter((_, index) => defaultState.includes(index))
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<IState[]>(stateOfCountry);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = stateOfCountry.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    UpdatesearchHostedArray(searchHostedArrays);
  };

  const getClickedData = useCallback(
    (state: IState, stateIndex: number) => {
      if (!HostedArray.some((item) => Object.is(item, state))) {
        setStatesIds((prev) => [...prev, stateIndex]);
        updateHostedArray((prevArray: IState[]) => [...prevArray, state]);
      }
      onChangeState([...statesIds, stateIndex]);
    },
    [HostedArray, onChangeState, statesIds]
  );
  const getClickedDeleteData = (isoCode: string) => {
    const newArray = HostedArray.filter((item) => item.isoCode !== isoCode);
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
        <label>Preferred State</label>
        <div className={classes.inputBox}>
          <ul
            onClick={() => {
              setActiveList(true);
            }}
          >
            {HostedArray.map((item) => {
              return (
                <li key={item.isoCode}>
                  <span>{item.name}</span>
                  <IoClose onClick={() => getClickedDeleteData(item.isoCode)} />
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
                    key={item.countryCode + item.isoCode + item.name}
                    onClick={() => getClickedData(item, index)}
                    className={
                      HostedArray.includes(item) ? classes.tabActive : ""
                    }
                  >
                    <span>{item.name}</span>
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

export default StateMultiple;
