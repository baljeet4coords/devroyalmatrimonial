import { State, IState, Country, ICountry } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";

interface StateProps {
  title: string;
  defaultValueCountry?: number;
  defaultValueState?: number;
  setSelectedState: (id: number) => void;
  setErrorState?: (details: boolean) => void;
}

const StateSingle: React.FC<StateProps> = ({
  title,
  defaultValueCountry,
  setSelectedState,
  defaultValueState,
  setErrorState,
}) => {
  const countries: ICountry[] = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState<string>(
    defaultValueCountry != (undefined && null)
      ? countries[defaultValueCountry - 1].isoCode
      : "IN"
  );
  const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
  const elementRef = useRef<HTMLDivElement>(null);
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchHostedArray, UpdatesearchHostedArray] = useState<IState[]>(
    State.getStatesOfCountry(countryCode)
  );

  const [selectedData, setSelectedData] = useState("Select State");
  useEffect(() => {
    defaultValueCountry != undefined &&
      setCountryCode(countries[defaultValueCountry - 1].isoCode);
    UpdatesearchHostedArray(State.getStatesOfCountry(countryCode));
    defaultValueState != undefined &&
      stateOfCountry[defaultValueState] != undefined &&
      setSelectedData(stateOfCountry[defaultValueState - 1].name);
  }, [defaultValueState, defaultValueCountry, countries, countryCode]);

  // useEffect(() => {
  //   if (
  //     defaultValueCountry != undefined &&
  //     typeof defaultValueCountry == "number"
  //   ) {
  //     setCountryCode(countries[defaultValueCountry].isoCode);
  //     UpdatesearchHostedArray(
  //       State.getStatesOfCountry(countries[defaultValueCountry].isoCode)
  //     );
  //   }
  // }, [countries, countryCode, defaultValueCountry]);

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasMounted) {
        setSelectedData("Select State");
      } else {
        setHasMounted(true);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [countryCode]);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = stateOfCountry.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // For removeing the selcted item if Does not Matter is selected

  const getClickedData = (item: IState) => {
    setTimeout(() => {
      setActiveList(false);
    }, 50);
    setSelectedData(item.name);
    const getIndex = stateOfCountry.findIndex((obj) => obj.name === item.name);
    setSelectedState(getIndex + 1);
    setSearchInput("");
    UpdatesearchHostedArray(stateOfCountry);
  };

  // To Find the country Which is get defaultValueState
  useEffect(() => {
    if (defaultValueCountry != undefined) {
      setCountryCode(
        countries[defaultValueCountry ? defaultValueCountry : 0].isoCode
      );
    }
  }, [countries, defaultValueCountry]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (elementRef.current && !elementRef?.current?.contains(event.target)) {
        activeList && setErrorState !== undefined && setErrorState(true);
        setActiveList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, activeList]);

  return (
    <>
      <div className={classes.singleBox} ref={elementRef}>
        <label>{title}</label>
        <div className={classes.inputBox} onClick={() => setActiveList(true)}>
          <ul>
            {activeList ? (
              <input
                type="text"
                value={searchInput}
                onChange={(e) => searchDataFunc(e.target.value)}
              />
            ) : (
              <p>{selectedData}</p>
            )}
          </ul>
          <div
            className={`${activeList ? classes.active : ""} ${classes.inputBoxVal
              }`}
            ref={elementRef}
          >
            <ul>
              {searchHostedArray.length > 0 ? (
                searchHostedArray?.map((item, index) => {
                  return (
                    <li
                      key={item.isoCode}
                      onClick={() => {
                        setActiveList(false);
                        getClickedData(item);
                      }}
                      className={
                        item.name == selectedData ? classes.tabActive : ""
                      }
                    >
                      <span>{item?.name}</span>
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

export default StateSingle;
