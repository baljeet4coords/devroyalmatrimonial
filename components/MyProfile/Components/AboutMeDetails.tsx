import { FC } from "react";
import { FiUser } from "react-icons/fi";
import classes from "./GlobalDetails.module.scss";

interface MyComponentProps {
  setAboutMeDetails: (details: boolean) => void;
  step5Response: any;
}
const AboutMeDetails: FC<MyComponentProps> = ({
  step5Response,
  setAboutMeDetails,
}) => {
  const BasicDetails = [
    {
      name: "About my family",
      vlaue: step5Response?.about_family || "NA",
    },
    {
      name: "About Career",
      vlaue: step5Response?.about_career || "NA",
    },
    {
      name: "About Education",
      vlaue: step5Response?.about_education || "NA",
    },
  ];
  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUser />
            About Me
          </div>
          <span
            className={classes.Edit}
            onClick={() => setAboutMeDetails(true)}
          >
            Edit
          </span>
        </div>
        <div className={classes.userDiscription}>
          <p>{step5Response?.basic_intro || "NA"}</p>
        </div>
        <div className={classes.Userdetails}>
          {BasicDetails.map((item) => {
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutMeDetails;
