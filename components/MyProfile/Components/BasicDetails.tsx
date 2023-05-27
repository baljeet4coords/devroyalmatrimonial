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

interface MyComponentProps {
  setBasicDetails: (details: boolean) => void;
  step1Response: any;
}
const BasicDetails: FC<MyComponentProps> = ({
  step1Response,
  setBasicDetails,
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

  const BasicDetails = [
    {
      name: "Caste",
      vlaue: castGet(step1Response?.caste) || "NA",
    },
    {
      name: "Height",
      vlaue: HeightConvertr(step1Response?.height_cm) || "NA",
    },
    {
      name: "challenged",
      vlaue:
        getKeyByValue(String(step1Response?.challenged), Challenged) || "NA",
    },
    {
      name: "HIV",
      vlaue: step1Response?.hiv == 1 ? "Yes" : "No" || "NA",
    },
    {
      name: "mother tongue",
      vlaue:
        getKeyByValue(String(step1Response?.mother_tongue), MotherTongue) ||
        "NA",
    },
    {
      name: "Religion",
      vlaue: getKeyByValue(String(step1Response?.religion), Religion) || "NA",
    },

    {
      name: "Manglic",
      vlaue: getKeyByValue(String(step1Response?.manglik), Manglik) || "NA",
    },

    {
      name: "Profile Manage by",
      vlaue: `${step1Response?.gender == "M" ? "His" : "Her"
        } profile is managed by ${step1Response?.profile_for == "2" || step1Response?.profile_for == "3" ? "parents" : step1Response?.profile_for == "4" || step1Response?.profile_for == "5" ? "siblings" : getKeyByValue(String(step1Response?.profile_for), ProfileFor) || "NA"
        }`,
    },
  ];


  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUser />
            Basic Details
          </div>
          <span className={classes.Edit} onClick={() => setBasicDetails(true)}>
            Edit
          </span>
        </div>
        <div className={classes.Username}>
          <p>
            Full name{" "}
            <span> - {step1Response?.fullname || "NA"}</span>{" "}
          </p>
        </div>

        {/* <div className={classes.UserVerified}>
          <MdVerified />
          your profile verification is pending...
          <span>Get verified NOW</span>
        </div> */}
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
                      item.vlaue === "NA"
                        ? classes.input_Value_NotFilled
                        : classes.input_Value
                    }
                  >
                    {item.vlaue === "NA" ? "Not Field in" : item.vlaue}{" "}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BasicDetails;
