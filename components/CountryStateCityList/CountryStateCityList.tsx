import { useEffect, useState } from "react";
import classes from "./CountryStateCity.module.scss";
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from "country-state-city";

interface CountryStateCitlyListProps {
  title?: string;
  setSelectedCountry: (id: number) => void;
  setSelectedState: (id: number) => void;
  setSelectedCity: (id: number) => void;
  defaultValueCountry?: number;
  defaultValueState?: number;
  defaultValueCity?: number;
}
const CountryStateCitlyList: React.FC<CountryStateCitlyListProps> = ({
  title,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  defaultValueCountry,
  defaultValueState,
  defaultValueCity,
}) => {
  const countries: ICountry[] = Country.getAllCountries();
  const defaultCountry = countries.find(
    (item) =>
      (defaultValueCountry && countries[defaultValueCountry].isoCode) ||
      item.isoCode === "IN"
  );

  const [countryCode, setCountryCode] = useState<string>(
    (defaultValueCountry && countries[defaultValueCountry].isoCode) || "IN"
  );
  const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
  const [stateCode, setStateCode] = useState<string>(
    (defaultValueState && stateOfCountry[defaultValueState]?.isoCode) || "AS"
  );

  const cityOfState: ICity[] = City.getCitiesOfState(countryCode, stateCode);

  const countryFn = (e: any) => {
    const [id, name] = e.target.value.split("-");
    setCountryCode(name);
    setSelectedCountry(+id);
  };
  const stateFn = (e: any) => {
    const [id, name] = e.target.value.split("-");
    setStateCode(name);
    setSelectedState(+id);
  };
  const cityFn = (e: any) => {
    const [id] = e.target.value.split("-");
    setSelectedCity(+id);
  };

  return (
    <>
      <div className={classes.CSC_wrapper}>
        <label>{`${title} Country`}</label>
        <select onChange={(e) => countryFn(e)}>
          <option value={""}>Select Country</option>
          {countries.map((country, index) => {
            return (
              <option key={index} value={`${index}-${country.isoCode}`}>
                {country.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={classes.CSC_wrapper}>
        <label>{`${title} State`}</label>
        <select onChange={(e) => stateFn(e)}>
          {stateOfCountry.map((state, index) => {
            return (
              <option key={index} value={`${index}-${state.isoCode}`}>
                {state.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={classes.CSC_wrapper}>
        <label>{`${title} City`}</label>
        <select onChange={(e) => cityFn(e)}>
          {cityOfState.map((city, index) => {
            return (
              <option key={index} value={`${index}-${city.name}`}>
                {city.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default CountryStateCitlyList;
