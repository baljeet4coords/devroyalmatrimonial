import { FC } from "react";
import classes from "../Components/RightSectionMyProfile.module.scss";
import EditContact from "../../EditMyProfile/EditContact";
import { IoCallOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import EditHoroscopeNotMatch from "../../EditMyProfile/EditHoroscopeNotMatch";
import CustomButton from "../../Button/CustomButton";
import EditHoroscopeMatch from "../../EditMyProfile/EditHoroscopeMatch";

interface MyComponentProps {
  EditDetails: boolean;
  setEditDetails: (details: boolean) => void;
}
const HoroScopeD = {
  Match: [
    {
      name: "Date of Bitrh",
      value: "Fer 13,1992",
    },
    {
      name: "Place of Birth",
      value: "NA",
    },
    {
      name: "Time of Birth",
      value: "NA",
    },
  ],
  NotMatch: [
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
      value: "Non-Manglic",
    },
    {
      name: "Horoscope Privacy",
      value: "NA",
    },
  ],
};
export const RightSectionHoroScopeMatch: FC<MyComponentProps> = ({
  EditDetails,
  setEditDetails,
}) => {
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
            {HoroScopeD.Match.map((item) => {
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
}) => {
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
            {HoroScopeD.NotMatch.map((item) => {
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
