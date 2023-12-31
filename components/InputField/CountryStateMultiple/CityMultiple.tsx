import { City, ICity } from "country-state-city";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";
import { IoClose } from "react-icons/io5";

interface CityMultiple {
  onChangeCity: (city: number[]) => void;
  defaultCity: number[];
}
interface ModifiedDataCity {
  countryCode: string;
  latitude?: string | null;
  longitude?: string | null;
  name: string;
  stateCode: string;
}
const CityMultiple: React.FC<CityMultiple> = ({
  onChangeCity,
  defaultCity,
}) => {
  const DoesNotMatter: ModifiedDataCity = useMemo(() => {
    return {
      name: "Does Not Matter",
      countryCode: "DNM",
      stateCode: "DNM",
      latitude: "DNM",
      longitude: "DNM",
    };
  }, []);

  const cityOfState: ICity[] = useMemo(() => {
    return [DoesNotMatter, ...(City.getCitiesOfCountry("IN") || [])];
  }, [DoesNotMatter]);
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [citiesIds, setCitiesIds] = useState<number[]>(defaultCity);
  const [HostedArray, updateHostedArray] = useState<ICity[]>(
    cityOfState.filter((_, index) => defaultCity.includes(index))
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICity[]>(cityOfState);

  const [searchInput, setSearchInput] = useState("");
  const [stateSize, setSize] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 767);
    });
    window.dispatchEvent(new Event("resize"));
  }, []);

  useEffect(() => {
    if (searchHostedArray[0]?.name != "Does Not Matter") {
      searchHostedArray.unshift(DoesNotMatter);
    }
  }, [DoesNotMatter, searchHostedArray]);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = cityOfState.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // For removeing the selcted item if Does not Matter is selected
  useEffect(() => {
    onChangeCity(citiesIds);
  }, [citiesIds]);

  const getClickedData = useCallback(
    (city: ICity) => {
      const getIndex = cityOfState.findIndex((obj) => obj.name === city.name);
      if (getIndex == 0) {
        // For removeing the selcted item if Does not Matter is selected
        setCitiesIds([0]);
        updateHostedArray([city]);
        setTimeout(() => {
          setActiveList(false);
        }, 0);
      } else {
        if (!HostedArray.some((item) => Object.is(item, city))) {
          setCitiesIds(citiesIds.filter((indx) => indx > 0));
          updateHostedArray(HostedArray.filter((item) => item.stateCode != "DNM"));
          setCitiesIds((prev) => [...prev, getIndex]);
          updateHostedArray((prevArray) => [...prevArray, city]);
        }
        setSearchInput("");
        UpdatesearchHostedArray(cityOfState);
        inputRef.current?.focus();
      }
    },
    [HostedArray, citiesIds, cityOfState, onChangeCity]
  );

  const getClickedDeleteData = (city: string, item: ModifiedDataCity) => {
    const itemname = String(item.name);
    const getIndex = searchHostedArray.findIndex(
      (obj) => obj.name === itemname
    );
    const cityidsCode = citiesIds.filter((item) => item !== getIndex);
    const newArray = HostedArray.filter((item) => item.name !== city);
    updateHostedArray(newArray);
    setCitiesIds(cityidsCode);
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
        <label>Preferred Indian City</label>
        <div
          className={classes.inputBox}
          onClick={() => {
            setActiveList(true);
          }}
        >
          {activeList && (
            <div className={classes.inputbox_Sections}>
              <input
                type="text"
                placeholder={HostedArray.length < 1 ? "Select Some Options" : ""}
                value={searchInput}
                onChange={(e) => searchDataFunc(e.target.value)}
                ref={inputRef}
                autoFocus
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
                  <li key={item.countryCode + item.name + item.stateCode}>
                    <span>{item.name}</span>
                    <IoClose
                      onClick={() => getClickedDeleteData(item.name, item)}
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
                      key={item.countryCode + item.name + item.stateCode}
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

export default CityMultiple;
