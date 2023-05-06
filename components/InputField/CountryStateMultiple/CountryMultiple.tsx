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
  const inputRef = useRef<HTMLInputElement>(null);
  const [countriesIds, setCountriesIds] = useState<number[]>(defaultCountry);
  const [HostedArray, updateHostedArray] = useState<ICountry[]>(
    countries.filter((_, index) => defaultCountry.includes(index))
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICountry[]>(countries);
  const [searchInput, setSearchInput] = useState("");
  const [stateSize, setSize] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 767);
    });
    window.dispatchEvent(new Event("resize"));
  }, []);

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
  useEffect(() => {
    onChangeCountry(countriesIds);
  }, [countriesIds]);

  const getClickedData = useCallback(
    (country: ICountry) => {
      const getIndex = countries.findIndex((obj) => obj.name === country.name);
      if (getIndex == 0) {
        setCountriesIds([0]);
        updateHostedArray([country]);
        setTimeout(() => {
          setActiveList(false);
        }, 0);
      } else {
        if (!HostedArray.some((item) => Object.is(item, country))) {
          setCountriesIds(countriesIds.filter((indx) => indx > 0));
          updateHostedArray(
            HostedArray.filter((item) => item.isoCode != "DNM")
          );
          setCountriesIds((pre) => [...pre, getIndex]);
          updateHostedArray((prevArray) => [...prevArray, country]);
        }
      }
      UpdatesearchHostedArray(countries);
      setSearchInput("");
      inputRef.current?.focus();
    },
    [HostedArray, countriesIds, onChangeCountry]
  );

  const getClickedDeleteData = (isoCode: string, item: ModifiedDataCountry) => {
    const itemname = String(item.name);
    const getIndex = searchHostedArray.findIndex(
      (obj) => obj.name === itemname
    );

    const contryidsCode = countriesIds.filter((item) => item !== getIndex);
    const newArray = HostedArray.filter((item) => item.isoCode !== isoCode);
    updateHostedArray(newArray);
    setCountriesIds(contryidsCode);
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

  function HandleCloseDropdown() {
    setTimeout(() => {
      setActiveList(false)
    }, 50);
  }
  return (
    <>
      <div className={classes.singleBox} ref={elementRef}>
        <label>Preferred Country</label>
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
              {stateSize && <div onClick={HandleCloseDropdown}>
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
                      key={item.isoCode}
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

export default CountryMultiple;
