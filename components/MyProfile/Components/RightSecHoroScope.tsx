import { FC, useEffect, useState } from "react";
import classes from "../Components/RightSectionMyProfile.module.scss";
import { CiCreditCard1 } from "react-icons/ci";
import EditHoroscopeNotMatch from "../../EditMyProfile/EditHoroscopeNotMatch";
import CustomButton from "../../Button/CustomButton";
import EditHoroscopeMatch from "../../EditMyProfile/EditHoroscopeMatch";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import { Manglik } from "../../../types/enums";

interface MyComponentProps {
  EditDetails: boolean;
  setEditDetails: (details: boolean) => void;
  step1Response: any;
  step5Response: any;
}
// const HoroScopeD = {
//   Match: [
//     {
//       name: "Date of Bitrh",
//       value: "Fer 13,1992",
//     },
//     {
//       name: "Place of Birth",
//       value: "NA",
//     },
//     {
//       name: "Time of Birth",
//       value: "NA",
//     },
//   ],
//   NotMatch: [
//     {
//       name: "Sun Sign",
//       value: "NA",
//     },
//     {
//       name: "Rashi/Moon sign",
//       value: "NA",
//     },
//     {
//       name: "Nakshatra",
//       value: "NA",
//     },
//     {
//       name: "Manglic",
//       value: "Non-Manglic",
//     },
//     {
//       name: "Horoscope Privacy",
//       value: "NA",
//     },
//   ],
// };

export const RightSectionHoroScopeMatch: FC<MyComponentProps> = ({
  EditDetails,
  setEditDetails,
  step1Response,
  step5Response,
}) => {
  const countries: ICountry[] = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState<string>(
    step5Response?.pobCountry != (undefined && null)
      ? countries[step5Response?.pobCountry].isoCode
      : "IN"
  );

  const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
  const [stateCode, setStateCode] = useState<string>(
    step5Response?.pobState != (undefined && null)
      ? stateOfCountry[step5Response?.pobState]?.isoCode
      : "AS"
  );

  const cityOfState: ICity[] = City.getCitiesOfState(countryCode, stateCode);

  useEffect(() => {
    if (countries[0].name === "Does Not Matter") {
      countries.shift();
    }
  }, []);

  useEffect(() => {
    step5Response?.pobCountry !== (undefined || null) &&
      countries[step5Response?.pobCountry] !== undefined &&
      setCountryCode(countries[step5Response?.pobCountry]?.isoCode);
    step5Response?.pobState != undefined &&
      stateOfCountry[step5Response?.pobState] !== undefined &&
      step5Response?.pobState >= 0 &&
      setStateCode(stateOfCountry[step5Response?.pobState]?.isoCode);
  }, [
    countryCode,
    stateCode,
    cityOfState,
    countries,
    stateOfCountry,
    step5Response?.pobCountry,
    step5Response?.pobState,
  ]);

  function getCountry() {
    return (
      step5Response?.pobCountry !== (undefined || null) && countries[step5Response?.pobCountry]?.name
    );
  }
  function getState() {
    return (
      step5Response?.pobState !== (undefined || null) && stateOfCountry[step5Response?.pobState]?.name
    );
  }
  function getCity() {
    return step5Response?.pobCity !== (undefined || null) && cityOfState[step5Response?.pobCity]?.name;
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dob = step1Response && step1Response?.dob.split("-");
  const dobYear = dob && dob[0];
  let dobmonth = dob && dob[1];
  const dobDay = dob && dob[2].split(" ")[0];
  const timpOFBirth_H = dob && dob[2].split(" ")[1].split(":")[0];
  const timpOFBirth_M = dob && dob[2].split(" ")[1].split(":")[1];
  if (dobmonth < 10) {
    dobmonth = dobmonth?.split("0")[1];
  }

  const HoroScopeDMatch = [
    {
      name: "Date of Bitrh",
      value: ` ${months[dobmonth - 1]} ${dobDay} ${dobYear}` || "NA",
    },
    {
      name: "Birth Country",
      value: getCountry() || "NA",
    },
    {
      name: "Birth State ",
      value: getState() || "NA",
    },
    {
      name: "Birth City",
      value: getCity() || "NA",
    },
    {
      name: "Time of Birth",
      value: `${timpOFBirth_H <= 12
        ? timpOFBirth_H
        : timpOFBirth_H <= 21
          ? `0 ${timpOFBirth_H - 12}`
          : timpOFBirth_H - 12 || "NA"
        }  - ${timpOFBirth_M || "NA"} ${timpOFBirth_H <= 12 ? "AM" : "PM"}`,
    },
  ];
  return (
    <>
      <div className={classes.rghtSec}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <CiCreditCard1 />
            Horoscope Details
          </div>
          {!EditDetails && (
            <span className={classes.Edit} onClick={() => setEditDetails(true)}>
              {" "}
              Edit
            </span>
          )}
        </div>
        {!EditDetails ? (
          <ul>
            {HoroScopeDMatch.map((item) => {
              return (
                <li key={item.name}>
                  <p>{item.name}</p>
                  <p
                    className={
                      item.value === "NA"
                        ? classes.input_Value_NotFilled
                        : classes.input_Value
                    }
                  >
                    {item.value === "NA" ? "Not Field in" : item.value}{" "}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <EditHoroscopeMatch setEditDetails={setEditDetails} />
        )}

        <CustomButton onClick={() => console.log("tab")}>
          Unlock Janampatri
        </CustomButton>
      </div>
    </>
  );
};

export const RightSectionHoroScopeNotMatch: FC<MyComponentProps> = ({
  EditDetails,
  setEditDetails,
  step1Response,
  step5Response,
}) => {
  function getKeyByValue(value: string, enumObject: any) {
    for (const [key, val] of Object.entries(enumObject)) {
      if (val === value) {
        return key.replaceAll("_", " ");
      }
    }
  }

  const HoroScopeDNotMatch = [
    {
      name: "Sun Sign",
      value: "NA",
    },
    {
      name: "Rashi/Moon sign",
      value: "NA",
    },
    {
      name: "Nakshatra",
      value: "NA",
    },
    {
      name: "Manglic",
      value: getKeyByValue(String(step1Response?.manglik), Manglik),
    },
    {
      name: "Horoscope Privacy",
      value: "NA",
    },
  ];

  return (
    <>
      <div className={classes.rghtSec}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.input_Value}>
            Horoscope match is not necessary
          </div>
          {!EditDetails && (
            <span className={classes.Edit} onClick={() => setEditDetails(true)}>
              {" "}
              Edit
            </span>
          )}
        </div>
        {!EditDetails ? (
          <ul>
            {HoroScopeDNotMatch.map((item) => {
              return (
                <li key={item.name}>
                  <p>{item.name}</p>
                  <p
                    className={
                      item.value === "NA"
                        ? classes.input_Value_NotFilled
                        : classes.input_Value
                    }
                  >
                    {item.value === "NA" ? "Not Field in" : item.value}{" "}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <EditHoroscopeNotMatch setEditDetails={setEditDetails} />
        )}
      </div>
    </>
  );
};
