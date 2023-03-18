import { Country, ICountry } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";
import { IoClose } from "react-icons/io5";

interface CountryProps {
  defaultCountry: string;
  onChangeCountry: (country: number[]) => void;
}
const CountryMultiple: React.FC<CountryProps> = ({
  defaultCountry,
  onChangeCountry,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [countriesIds, setCountriesIds] = useState<number[]>([]);
  const [HostedArray, updateHostedArray] = useState<ICountry[]>([]);
  const [activeList, setActiveList] = useState<boolean>(false);
  const countries: ICountry[] = Country.getAllCountries();
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICountry[]>(countries);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = countries.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    UpdatesearchHostedArray(searchHostedArrays);
  };

  const getClickedData = useCallback(
    (country: ICountry, countryIndex: number) => {
      if (!HostedArray.some((item) => Object.is(item, country))) {
        setCountriesIds((prev) => [...prev, countryIndex]);
        updateHostedArray((prevArray) => [...prevArray, country]);
      }
      onChangeCountry([...countriesIds, countryIndex]);
    },
    [HostedArray, countriesIds, onChangeCountry]
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
        <label>Preferred Country</label>
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
                    key={item.isoCode}
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

export default CountryMultiple;
