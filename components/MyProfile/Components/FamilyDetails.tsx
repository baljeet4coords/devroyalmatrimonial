import { FC, useEffect, useState } from "react";
import { BsPinAngle } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import classes from "./GlobalDetails.module.scss";
import {
  FamilStatus,
  FamilyIncome,
  FamilyType,
  FathersProfession,
  MothersProfession,
} from "../../../types/enums";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import { BortherSisterCount } from "../../../types/enums";

interface MyComponentProps {
  setFamilyDetails: (details: boolean) => void;
  step4Response: any;
}
const FamilydetailsInfo: FC<MyComponentProps> = ({
  step4Response,
  setFamilyDetails,
}) => {
  function getKeyByValue(value: string, enumObject: any) {
    for (const [key, val] of Object.entries(enumObject)) {
      if (val === value) {
        return key.replaceAll("_", " ");
      }
    }
  }

  const countries: ICountry[] = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState<string>(
    step4Response?.family_native_country != (undefined && null)
      ? countries[step4Response?.family_native_country].isoCode
      : "IN"
  );

  useEffect(() => {
    if (countries[0].name === "Does Not Matter") {
      countries.shift();
    }
  }, []);

  const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
  const [stateCode, setStateCode] = useState<string>(
    step4Response?.family_native_state != (undefined && null)
      ? stateOfCountry[step4Response?.family_native_state]?.isoCode
      : "AS"
  );

  const cityOfState: ICity[] = City.getCitiesOfState(countryCode, stateCode);

  useEffect(() => {
    step4Response?.family_native_country !== undefined &&
      countries[step4Response?.family_native_country] !== undefined &&
      setCountryCode(countries[step4Response?.family_native_country]?.isoCode);
    step4Response?.family_native_state != undefined &&
      stateOfCountry[step4Response?.family_native_state] !== undefined &&
      step4Response?.family_native_state >= 0 &&
      setStateCode(stateOfCountry[step4Response?.family_native_state]?.isoCode);
    // console.log(countryCode , State.getStatesOfCountry("AW"),stateCode,stateOfCountry);

  }, [
    countryCode,
    stateCode,
    cityOfState,
    step4Response?.family_native_country,
    step4Response?.family_native_state,
  ]);

  function getCountry() {
    return (
      step4Response?.family_native_country !== (undefined || null) && countries[step4Response?.family_native_country]?.name
    );
  }
  function getState() {
    return (
      step4Response?.family_native_state !== (undefined || null) && stateOfCountry[step4Response?.family_native_state]?.name
    );
  }
  function getCity() {
    return step4Response?.family_native_city !== (undefined || null) && cityOfState[step4Response?.family_native_city]?.name;
  }

  const BasicDetails = {
    pin: true,
    pinValue: "Living with Parents?",
    data: [
      {
        name: "Father's Occupation",
        value:
          getKeyByValue(String(step4Response?.Father), FathersProfession) ||
          "NA",
      },
      {
        name: "Mother's Occupation",
        value:
          getKeyByValue(String(step4Response?.Mother), MothersProfession) ||
          "NA",
      },
      {
        name: "Sister(s)",
        value: getKeyByValue(String(step4Response?.Sister), BortherSisterCount) || "NA",
      },
      {
        name: "Brother(s)",
        value: getKeyByValue(String(step4Response?.Brother), BortherSisterCount) || "NA",
      },
      {
        name: "Gothra",
        value: step4Response?.Gothra || "NA",
      },
      {
        name: "Family Status",
        value:
          getKeyByValue(String(step4Response?.Family_Status), FamilStatus) ||
          "NA",
      },
      {
        name: "Family Income",
        value:
          getKeyByValue(String(step4Response?.Family_Income), FamilyIncome) ||
          "NA",
      },
      {
        name: "Family Type",
        value:
          getKeyByValue(String(step4Response?.Family_Type), FamilyType) || "NA",
      },
      {
        name: "Family Native Country",
        value: getCountry() || "NA",
      },
      {
        name: "Family Native State ",
        value: getState() || "NA",
      },
      {
        name: "Family Native City",
        value: getCity() || "NA",
      },
      {
        name: "Living With Parents",
        value: step4Response?.living_with_parents == 1 ? "Yes" : step4Response?.living_with_parents == 2 ? "No" : "NA",
      },
    ],
  };
  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUsers />
            Family Details
          </div>
          <span className={classes.Edit} onClick={() => setFamilyDetails(true)}>
            Edit
          </span>
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

export default FamilydetailsInfo;
