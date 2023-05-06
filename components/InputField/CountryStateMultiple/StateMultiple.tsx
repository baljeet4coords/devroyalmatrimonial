import { State, IState } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";
import { IoClose } from "react-icons/io5";

interface StateMultipleProps {
  onChangeState: (state: number[]) => void;
  defaultState: number[];
}

interface ModifiedDataState {
  countryCode: string;
  latitude?: string | null | undefined;
  longitude?: string | null | undefined;
  name: string;
  isoCode: string;
}
const StateMultiple: React.FC<StateMultipleProps> = ({
  onChangeState,
  defaultState,
}) => {
  const DoesNotMatter: ModifiedDataState = {
    name: "Does Not Matter",
    isoCode: "DNM",
    countryCode: "DNM",
    latitude: "DNM",
    longitude: "DNM",
  };
  const stateOfCountry: IState[] = [
    DoesNotMatter,
    ...State.getStatesOfCountry("IN"),
  ];
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [statesIds, setStatesIds] = useState<number[]>(defaultState);
  const [HostedArray, updateHostedArray] = useState<IState[]>(
    stateOfCountry.filter((_, index) => defaultState.includes(index))
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<IState[]>(stateOfCountry);

  const [searchInput, setSearchInput] = useState("");
  const [stateSize, setSize] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 767);
    });
    window.dispatchEvent(new Event("resize"));
  }, []);


  useEffect(() => {
    // for adding does not matter in state list
    if (searchHostedArray[0].name != "Does Not Matter") {
      searchHostedArray.unshift(DoesNotMatter);
    }
  }, []);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = stateOfCountry.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  useEffect(() => {
    onChangeState(statesIds);
  }, [statesIds]);

  const getClickedData = useCallback(
    (state: IState) => {
      const getIndex = stateOfCountry.findIndex(
        (obj) => obj.name === state.name
      );

      if (getIndex == 0) {
        // For removeing the selcted item if Does not Matter is selected
        setStatesIds([0]);
        updateHostedArray([state]);
        setTimeout(() => {
          setActiveList(false);
        }, 0);
      } else {
        if (!HostedArray.some((item) => Object.is(item, state))) {
          setStatesIds(statesIds.filter((indx) => indx > 0));
          updateHostedArray(
            HostedArray.filter((item) => item.isoCode != "DNM")
          );
          setStatesIds((prev) => [...prev, getIndex]);
          updateHostedArray((prevArray: IState[]) => [...prevArray, state]);
        }
      }
      UpdatesearchHostedArray(stateOfCountry);
      setSearchInput("");
      inputRef.current?.focus();
    },
    [HostedArray, onChangeState, statesIds]
  );
  const getClickedDeleteData = (isoCode: string, item: ModifiedDataState) => {
    const itemname = String(item.name);
    const getIndex = searchHostedArray.findIndex(
      (obj) => obj.name === itemname
    );
    const stateidsCode = statesIds.filter((item) => item !== getIndex);
    const newArray = HostedArray.filter((item) => item.isoCode !== isoCode);
    updateHostedArray(newArray);
    setStatesIds(stateidsCode);
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

  function HandleCloseDropdown (){
    setTimeout(() => {
      setActiveList(false)
    }, 50);
  }

  return (
    <>
      <div className={classes.singleBox} ref={elementRef}>
        <label>Preferred Indian State</label>
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
           {stateSize&&   <div onClick={HandleCloseDropdown}>
                <IoClose />close
              </div>}
            </div>

          )}
          <ul className={activeList ? classes.ul_maxh_64 : ""}>
            {HostedArray.length > 0
              ? HostedArray.map((item) => {
                return (
                  <li key={item.isoCode}>
                    <span>{item.name}</span>
                    <IoClose
                      onClick={() => getClickedDeleteData(item.isoCode, item)}
                    />
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
                searchHostedArray.map((item, index) => {
                  return (
                    <li
                      key={item.countryCode + item.isoCode + item.name}
                      onClick={() => getClickedData(item)}
                      className={
                        HostedArray.includes(item) ? classes.tabActive : ""
                      }
                    >
                      <span>{item.name}</span>
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
    </>
  );
};

export default StateMultiple;
