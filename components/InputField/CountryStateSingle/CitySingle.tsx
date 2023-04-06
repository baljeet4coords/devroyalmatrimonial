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
}

const CitySingle: React.FC<CitySingle> = ({
  title,
  defaultValueCountry,
  setSelectedCity,
  defaultValueState,
  defaultValueCity,
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

  // For removeing the selcted item if Does not Matter is selected

  const getClickedData = (item: ICity) => {
    setSelectedData(item.name);
    const getIndex = cityOfState.findIndex((obj) => obj.name === item.name);
    setSelectedCity(getIndex);
    setSearchInput("");
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
        setActiveList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef]);

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
            className={`${activeList ? classes.active : ""} ${
              classes.inputBoxVal
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
