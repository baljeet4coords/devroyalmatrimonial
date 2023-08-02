import { FC } from "react";
import { FiUser } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import classes from "./GlobalDetails.module.scss";
import {
  Challenged,
  Manglik,
  MaritalStatus,
  MotherTongue,
  ProfileFor,
  Religion,
} from "../../../types/enums";
import { CastListArray } from "../../../constants/CastListArray";
import { IPartnerDetailsInterestResponse, IPartnerDetailsPrivacyResponse } from "../../../types/PartnerDetails/partnerDetails";

interface MyComponentProps {
  setBasicDetails: (details: boolean) => void;
  step1Response: any;
  EditHide?: boolean;
  privacySetting?: IPartnerDetailsPrivacyResponse | null;
  interestResponse?: IPartnerDetailsInterestResponse | null;
}
const BasicDetails: FC<MyComponentProps> = ({
  step1Response,
  setBasicDetails,
  EditHide,
  privacySetting,
  interestResponse
}) => {
  function getKeyByValue(value: string, enumObject: any) {
    for (const [key, val] of Object.entries(enumObject)) {
      if (val === value) {
        return key.replaceAll("_", " ");
      }
    }
  }


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

  const dateNow = new Date();
  const nowYear = dateNow.getFullYear();
  const dob = step1Response && step1Response?.dob.split("-");
  const dobYear = dob && dob[0];
  let dobmonth = dob && dob[1];
  const dobDay = dob && dob[2].split(" ")[0];
  if (dobmonth < 10) {
    dobmonth = dobmonth?.split("0")[1];
  }


  function HeightConvertr(cmHeight: number) {
    const totalInches = cmHeight / 2.54;
    const feet = Math.floor(totalInches / 12).toString();
    const remainingInches = (totalInches % 12).toFixed(0);
    return `${feet} ' ${remainingInches}`;
  }
  function castGet(idd: number) {
    const castname = CastListArray.map((cast) => {
      if (cast.id === String(idd)) {
        return cast.caste;
      }
    });

    return castname;
  }


  const reptNameHide = () => <>{step1Response?.fullname.slice(0, 3)}<span>{'*'.repeat(8)}</span></>;


  const BasicDetails = [
    {
      name: "Caste",
      vlaue: castGet(step1Response?.caste) || "Na",
    },
    {
      name: "Height",
      vlaue: HeightConvertr(step1Response?.height_cm) || "Na",
    },
    {
      name: "challenged",
      vlaue:
        getKeyByValue(String(step1Response?.challenged), Challenged) || "Na",
    },
    {
      name: "HIV",
      vlaue: step1Response?.hiv == 1 ? "Yes" : "No" || "Na",
    },
    {
      name: "mother tongue",
      vlaue:
        getKeyByValue(String(step1Response?.mother_tongue), MotherTongue) ||
        "Na",
    },
    {
      name: "Religion",
      vlaue: getKeyByValue(String(step1Response?.religion), Religion) || "Na",
    },

    {
      name: "Manglic",
      vlaue: getKeyByValue(String(step1Response?.manglik), Manglik) || "Na",
    },

    {
      name: "Profile Manage by",
      vlaue: `${step1Response?.gender == "M" ? "His" : "Her"
        } profile is managed by ${step1Response?.profile_for == "2" || step1Response?.profile_for == "3" ? "parents" : step1Response?.profile_for == "4" || step1Response?.profile_for == "5" ? "siblings" : getKeyByValue(String(step1Response?.profile_for), ProfileFor) || "Na"
        }`,
    },
  ];


  const ShowNameONConditions = step1Response && step1Response?.fullname.length > 16
    ? (step1Response?.fullname).toLocaleLowerCase().substring(0, 15).concat('...')
    : step1Response?.fullname.toLocaleLowerCase();


  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUser />
            Basic Details
          </div>
          {
            EditHide ? null :
              <span className={classes.Edit} onClick={() => setBasicDetails(true)}>
                Edit
              </span>
          }
        </div>
        <div className={classes.Username}>
          <p>
            Full name{" "}
            <span> - {
              privacySetting
                ? privacySetting?.privacy_show_name === 'P'
                  ? ShowNameONConditions
                  : interestResponse?.Send === 'A' || interestResponse?.Recieve === 'A' || interestResponse?.Recieve === 'S'
                    ? interestResponse?.Send === 'D' || interestResponse?.Recieve === 'D'
                      ? reptNameHide()
                      : ShowNameONConditions
                    : reptNameHide()
                : ShowNameONConditions
            }</span>{" "}
          </p>
        </div>
        <div className={classes.Userdetails}>
          <div className={classes.UserdetailsSec}>
            <p className={classes.input_Name}>Age</p>
            <p className={classes.input_Value}>
              {`${nowYear - dobYear || "NA"} ( ${dobDay}th ${months[dobmonth - 1]
                } ${dobYear}  ) `}
            </p>
          </div>
          <div className={classes.UserdetailsSec}>
            <p className={classes.input_Name}>Marital Status</p>
            <p className={classes.input_Value}>
              {getKeyByValue(
                String(step1Response?.marital_status),
                MaritalStatus
              ) || "NA"}
            </p>
          </div>
        </div>
        <div className={classes.Userdetails}>
          {BasicDetails.map((item, index) => {
            return (
              <>
                <div className={classes.UserdetailsSec} key={item.name + index}>
                  <p className={classes.input_Name}>{item.name}</p>
                  <p
                    className={
                      item.vlaue === "Na"
                        ? classes.input_Value_NotFilled
                        : classes.input_Value
                    }
                  >
                    {item.vlaue === "Na" ? "Not Field in" : item.vlaue}{" "}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div >
    </>
  );
};

export default BasicDetails;
