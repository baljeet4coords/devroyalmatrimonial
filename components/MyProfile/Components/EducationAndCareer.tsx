import { FC, useEffect, useState } from "react";
import { BiBook } from "react-icons/bi";
import { BsPinAngle } from "react-icons/bs";
import classes from "./GlobalDetails.module.scss";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import {
  AnnualIncomeProfile,
  EducationTypeAndVal,
  Occupation,
  ResidentialStatus,
} from "../../../types/enums";

interface MyComponentProps {
  setEudcationAndCareer: (details: boolean) => void;
  step2Response: any;
  EditHide: boolean;
}
const EducationAndCareer: FC<MyComponentProps> = ({
  setEudcationAndCareer,
  step2Response,
  EditHide
}) => {
  const countries: ICountry[] = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState<string>(
    step2Response?.country != (undefined && null)
      ? countries[step2Response?.country-1].isoCode
      : "IN"
  );

  useEffect(() => {
    if (countries[0].name === "Does Not Matter") {
      countries.shift();
    }
  }, []);

  const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
  const [stateCode, setStateCode] = useState<string>(
    step2Response?.state != (undefined && null)
      ? stateOfCountry[step2Response?.state-1]?.isoCode
      : "AS"
  );
  const cityOfState: ICity[] = City.getCitiesOfState(countryCode, stateCode);
  const allCitiesOfCountry: ICity[] =City.getCitiesOfCountry(countryCode) || [];

  useEffect(() => {
    step2Response?.country !== undefined &&
      countries[step2Response?.country] !== undefined &&
      setCountryCode(countries[step2Response?.country-1].isoCode);
    step2Response?.state != undefined &&
      stateOfCountry[step2Response?.state] !== undefined &&
      step2Response?.state >= 0 &&
      setStateCode(stateOfCountry[step2Response?.state-1].isoCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, stateCode, step2Response?.country, step2Response?.state]);

  function getCountry() {
    return step2Response?.country !== (undefined || null) && countries[step2Response?.country-1]?.name;
  }
  function getState() {
    return step2Response?.state !== (undefined || null) && stateOfCountry[step2Response?.state-1]?.name;
  }
  function getCity() {
    return step2Response?.city !== (undefined || null) && allCitiesOfCountry[step2Response?.city-1]?.name;
  }

  function getKeyByValue(value: string, enumObject: any) {
    for (const [key, val] of Object.entries(enumObject)) {
      if (val === value) {
        return key.replaceAll("_", " ");
      }
    }
  }

  const BasicDetails = {
    pin: true,
    pinValue: "Intersted in setting aborad?",
    data: [
      {
        name: "Country",
        value: getCountry() || "NA",
      },
      {
        name: "State",
        value: getState() || "NA",
      },
      {
        name: "City",
        value: getCity() || "NA",
      },
      {
        name: "Residential Status",
        value:
          getKeyByValue(
            String(step2Response?.residentialstatus),
            ResidentialStatus
          ) || "NA",
      },
      {
        name: "Ready to Settle Aboard",
        value: step2Response?.readytosettleabroad == 1 ? "Yes" : "No" || "NA",
      },
      {
        name: "Higest Education",
        value:
          getKeyByValue(
            String(step2Response?.education),
            EducationTypeAndVal
          ) || "NA",
      },
      {
        name: "Annual Income",
        value:
          getKeyByValue(
            String(step2Response?.annual_income),
            AnnualIncomeProfile
          ) || "NA",
      },

      {
        name: "College Name",
        value: step2Response?.College || "NA",
      },
      {
        name: "Occupation",
        value:
          getKeyByValue(String(step2Response?.occupation), Occupation) || "NA",
      },
    ],
  };
  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <BiBook />
            Education & Career
          </div>
          {
            EditHide ? null :
              <span className={classes.Edit} onClick={() => setEudcationAndCareer(true)}>
                Edit
              </span>
          }
        </div>
        <div className={classes.Userdetails}>
          {BasicDetails.data.map((item) => {
            return (
              <>
                <div className={classes.UserdetailsSec} key={item.name}>
                  <p className={classes.input_Name}>{item.name}</p>
                  <p
                    className={
                      item.value === "NA"
                        ? classes.input_Value_NotFilled
                        : classes.input_Value
                    }
                  >
                    {item.value === "NA" ? "Not Field in" : item.value}{" "}
                  </p>
                </div>
              </>
            );
          })}
        </div>
        {/* {BasicDetails.pin && (
          <div className={classes.pin}>
            <BsPinAngle />
            {BasicDetails.pinValue}
          </div>
        )} */}
      </div>
    </>
  );
};

export default EducationAndCareer;
