import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import { useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";

interface CitySingle {
  title: string;
  defaultValueCountry?: number;
  defaultValueState?: number;
  defaultValueCity?: number;
  setSelectedCity: (id: number) => void;
  setErrorState?: (details: boolean) => void;
}

const CitySingle: React.FC<CitySingle> = ({
  title,
  defaultValueCountry,
  setSelectedCity,
  defaultValueState,
  defaultValueCity,
  setErrorState
}) => {
  const countries: ICountry[] = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState<string>(
    defaultValueCountry != (undefined && null)
      ? countries[defaultValueCountry].isoCode
      : "IN"
  );

  const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
  const [stateCode, setStateCode] = useState<string>(
    defaultValueState != (undefined && null)
      ? stateOfCountry[defaultValueState]?.isoCode
      : "AS"
  );

  const cityOfState: ICity[] = City.getCitiesOfState(countryCode, stateCode);

  useEffect(() => {
    if (defaultValueState != undefined) {
      const timeout = setTimeout(() => {
        UpdatesearchHostedArray(cityOfState);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [stateCode]);

  const elementRef = useRef<HTMLDivElement>(null);
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedData, setSelectedData] = useState(
    (defaultValueCity != (undefined && null) &&
      cityOfState[defaultValueCity]?.name) ||
    "Select City"
  );
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICity[]>(cityOfState);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = cityOfState.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // useEffect(() => {
  //   setSelectedData(
  //     (defaultValueCity != (undefined && null) &&
  //       cityOfState[defaultValueCity]?.name) ||
  //       "Select City"
  //   );
  // }, [cityOfState]);

  // For removeing the selcted item if Does not Matter is selected

  useEffect(() => {
    defaultValueCountry !== undefined &&
      countries[defaultValueCountry] !== undefined &&
      setCountryCode(countries[defaultValueCountry].isoCode);
    defaultValueState != undefined &&
      stateOfCountry[defaultValueState] !== undefined &&
      defaultValueState >= 0 &&
      setStateCode(stateOfCountry[defaultValueState].isoCode);
    UpdatesearchHostedArray(cityOfState);
    defaultValueCity != undefined &&
      defaultValueCity >= 0 &&
      cityOfState[defaultValueCity] !== undefined &&
      setSelectedData(cityOfState[defaultValueCity]?.name);
  }, [
    countryCode,
    stateCode,
    defaultValueCountry,
    defaultValueState,
    // selectedData,
  ]);

  const getClickedData = (item: ICity) => {
    setSelectedData(item.name);
    const getIndex = cityOfState.findIndex((obj) => obj.name === item.name);
    setSelectedCity(getIndex);
    setSearchInput("");
    activeList && setErrorState !== undefined && setErrorState(true);
    UpdatesearchHostedArray(cityOfState);
    setTimeout(() => {
      setActiveList(false);
    }, 100);
  };

  // To Find the country Which is get defaultValueState
  useEffect(() => {
    if (defaultValueCountry != undefined) {
      setCountryCode(
        countries[defaultValueCountry && defaultValueCountry].isoCode
      );
    }
    if (defaultValueState != undefined) {
      setStateCode(
        defaultValueState ? stateOfCountry[defaultValueState]?.isoCode : "AS"
      );
      // setSelecedData("Select City");
    }
  }, [countries, defaultValueCountry, defaultValueState, stateOfCountry]);

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

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasMounted) {
        setSelectedData("Select City");
      } else {
        setHasMounted(true);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [stateCode, countryCode]);

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
                      key={item.name + index}
                      onClick={() => getClickedData(item)}
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

export default CitySingle;
