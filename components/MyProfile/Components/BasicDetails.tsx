import { FC } from "react";
import { FiUser } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import classes from "./GlobalDetails.module.scss";
import {
  Challenged,
  Manglik,
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

  function HeightConvertr(cmHeight: number) {
    const [feet, cm] = (cmHeight / 30.48).toFixed(2).split(".");
    return `${feet} ' ${cm}`;
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
      vlaue: `${
        step1Response?.gender == "M" ? "His" : "Her"
      } profile is managed by ${
        getKeyByValue(String(step1Response?.profile_for), ProfileFor) || "NA"
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
            <span> - {step1Response?.profile_handlername || "NA"}</span>{" "}
          </p>
        </div>

        <div className={classes.UserVerified}>
          <MdVerified />
          your profile verification is pending...
          <span>Get verified NOW</span>
        </div>
        <div className={classes.Userdetails}>
          {BasicDetails.map((item) => {
            return (
              <>
                <div className={classes.UserdetailsSec} key={item.name}>
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
