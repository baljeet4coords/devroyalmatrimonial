import { City, ICity } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";
import { IoClose } from "react-icons/io5";

interface CityMultiple {
  onChangeCity: (city: number[]) => void;
  defaultCity: number[];
}
const CityMultiple: React.FC<CityMultiple> = ({
  onChangeCity,
  defaultCity,
}) => {
  const cityOfState: ICity[] = City.getCitiesOfCountry("IN") || [];
  const elementRef = useRef<HTMLDivElement>(null);
  const [citiesIds, setCitiesIds] = useState<number[]>(defaultCity);
  const [HostedArray, updateHostedArray] = useState<ICity[]>(
    cityOfState.filter((_, index) => defaultCity.includes(index))
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICity[]>(cityOfState);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = cityOfState.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    UpdatesearchHostedArray(searchHostedArrays);
  };

  const getClickedData = useCallback(
    (city: ICity, cityIndex: number) => {
      if (!HostedArray.some((item) => Object.is(item, city))) {
        setCitiesIds((prev) => [...prev, cityIndex]);
        updateHostedArray((prevArray) => [...prevArray, city]);
      }
      onChangeCity([...citiesIds, cityIndex]);
    },
    [HostedArray, citiesIds, onChangeCity]
  );
  const getClickedDeleteData = (city: string) => {
    const newArray = HostedArray.filter((item) => item.name !== city);
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
        <label>Preferred City</label>
        <div className={classes.inputBox}>
          <ul
            onClick={() => {
              setActiveList(true);
            }}
          >
            {HostedArray.map((item) => {
              return (
                <li key={item.countryCode + item.name + item.stateCode}>
                  <span>{item.name}</span>
                  <IoClose onClick={() => getClickedDeleteData(item.name)} />
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
                    key={item.countryCode + item.name + item.stateCode}
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

export default CityMultiple;
