import { Country, ICountry } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";
import { IoClose } from "react-icons/io5";

interface CountryProps {
  defaultCountry: number[];
  onChangeCountry: (country: number[]) => void;
}

interface ModifiedDataCountry {
  currency: string;
  flag: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  phonecode: string;
  name: string;
}
const CountryMultiple: React.FC<CountryProps> = ({
  defaultCountry,
  onChangeCountry,
}) => {
  const countries: ICountry[] = Country.getAllCountries();
  const elementRef = useRef<HTMLDivElement>(null);
  const [countriesIds, setCountriesIds] = useState<number[]>(defaultCountry);
  const [HostedArray, updateHostedArray] = useState<ICountry[]>(
    countries.filter((_, index) => defaultCountry.includes(index))
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICountry[]>(countries);
  const [searchInput, setSearchInput] = useState("");

  // To add Does not Matter in cuntry ,state and city
  useEffect(() => {
    if (searchHostedArray[0].name != "Does Not Matter") {
      const DoesNotMatter: ModifiedDataCountry = {
        name: "Does Not Matter",
        isoCode: "DNM",
        flag: "DNM",
        phonecode: "DNM",
        currency: "DNM",
        latitude: "DNM",
        longitude: "DNM",
      };
      searchHostedArray.unshift(DoesNotMatter);
    }
  }, []);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = countries.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // For removeing the selcted item if Does not Matter is selected
  const DoesNotMatterHandle = () => {
    // console.log(countriesIds,"DoesNotMatterHandle Before");

    if (countriesIds.length > 0 && countriesIds.includes(0)) {
      // console.log("DoesNotMatterHandle After");

      setCountriesIds([]);
      setCountriesIds([0]);
      updateHostedArray([searchHostedArray[0]]);
    }
  };
  const getClickedData = useCallback(
    (country: ICountry, countryIndex: number) => {
      if (!HostedArray.some((item) => Object.is(item, country))) {
        console.log(countriesIds, "countriesIds Before getclicked");
        setCountriesIds((pre) => [...pre, countryIndex]);
        updateHostedArray((prevArray) => [...prevArray, country]);
        console.log(countriesIds, "countriesIds after getclicked");
        DoesNotMatterHandle();
        setSearchInput("");
        UpdatesearchHostedArray(countries);
      }
      onChangeCountry([...countriesIds, countryIndex]);
    },
    [HostedArray, countriesIds, onChangeCountry]
  );

  const getClickedDeleteData = (isoCode: string, item: ModifiedDataCountry) => {
    const itemname = String(item.name);
    const getIndex = searchHostedArray.findIndex(
      (obj) => obj.name === itemname
    );
    console.log(countriesIds, "Before");

    const contryidsCode = countriesIds.filter((item) => item !== getIndex);
    const newArray = HostedArray.filter((item) => item.isoCode !== isoCode);
    updateHostedArray(newArray);
    setCountriesIds(contryidsCode);
    console.log(countriesIds, "After");
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
                  <IoClose
                    onClick={() => getClickedDeleteData(item.isoCode, item)}
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
              {searchHostedArray.length > 1 ? (
                searchHostedArray.map((item, index) => {
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

export default CountryMultiple;
