import { Country, ICountry } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";

interface CountryProps {
  setSelectedCountry: (id: number) => void;
  defaultValueCountry?: number;
}

const CountrySingle: React.FC<CountryProps> = ({
  defaultValueCountry,
  setSelectedCountry,
}) => {
  const countries: ICountry[] = Country.getAllCountries();
  const elementRef = useRef<HTMLDivElement>(null);
  const [countryCode, setCountryCode] = useState<string>(
    (defaultValueCountry && countries[defaultValueCountry].isoCode) || "IN"
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICountry[]>(countries);
  const [searchInput, setSearchInput] = useState("");

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = countries.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // For removeing the selcted item if Does not Matter is selected

  const getClickedData = (item: string) => console.log(item);

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
        <div className={classes.inputBox} onClick={() => setActiveList(true)}>
          <ul className={activeList ? classes.ul_maxh_64 : ""}>
            {/* {   Country.map((item) => {
                  return (
                    <li key={item.isoCode}>
                      <span>{item.name}</span>
                      <IoClose onClick={() => {}} />
                    </li>
                  );
                })} */}
          </ul>
          <div
            className={`${activeList ? classes.active : ""} ${
              classes.inputBoxVal
            }`}
            ref={elementRef}
          >
            <ul>
              {searchHostedArray.length > 1 ? (
                searchHostedArray?.map((item, index) => {
                  return (
                    <li
                      key={item.isoCode}
                      onClick={() => getClickedData(item.isoCode)}
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

export default CountrySingle;
