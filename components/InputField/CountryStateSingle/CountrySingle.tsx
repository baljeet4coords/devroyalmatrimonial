import { Country, ICountry } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";

interface CountryProps {
  setSelectedCountry: (id: number) => void;
  defaultValueCountry?: number;
  title: string;
  setErrorState?: (details: boolean) => void;
  setErrorStateDefault?: (details: boolean) => void;
}

const CountrySingle: React.FC<CountryProps> = ({
  defaultValueCountry,
  setSelectedCountry,
  title,
  setErrorState,
  setErrorStateDefault,
}) => {
  const countries: ICountry[] = Country.getAllCountries();

  useEffect(() => {
    let Defaultcountry =
      (defaultValueCountry != (undefined && null) &&
        defaultValueCountry != -1 &&
        countries[defaultValueCountry - 1].name) ||
      "Select Country";
    setSelecedData(Defaultcountry);
  }, [defaultValueCountry]);

  const elementRef = useRef<HTMLDivElement>(null);
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICountry[]>(countries);
  const [searchInput, setSearchInput] = useState("");
  const [selecedData, setSelecedData] = useState(
    (defaultValueCountry != (undefined && null) &&
      defaultValueCountry != -1 &&
      countries[defaultValueCountry].name) ||
    "Select Country"
  );

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = countries.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // To add Does not Matter in cuntry ,state and city
  useEffect(() => {
    if (searchHostedArray[0].name == "Does Not Matter") {
      searchHostedArray.shift();
    }
  }, []);

  // For removeing the selcted item if Does not Matter is selected

  const getClickedData = (item: ICountry) => {
    setSelecedData(item.name);
    const getIndex = countries.findIndex((obj) => obj.name === item.name);
    setSearchInput("");
    UpdatesearchHostedArray(countries);
    activeList && setErrorState !== undefined && setErrorState(false);
    setErrorStateDefault && setErrorStateDefault(false);
    setTimeout(() => {
      setActiveList(false);
    }, 100);
    setSelectedCountry(getIndex + 1);
  };

  // To Find the country Which is get defaultValueCountry
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   Defaultcountry = countries[2].name;
  // }, []);

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
              <p>{selecedData}</p>
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
                      onClick={() => getClickedData(item)}
                      className={
                        item.name == selecedData ? classes.tabActive : ""
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

export default CountrySingle;
