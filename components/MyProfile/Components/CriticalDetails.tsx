import { FiUserX } from "react-icons/fi";
import { FC } from "react";
import classes from "./GlobalDetails.module.scss";
import { MaritalStatus } from "../../../types/enums";

interface MyComponentProps {
  setCriticalDetails: (details: boolean) => void;
  step1Response: any;
}
const CriticalDetials: FC<MyComponentProps> = ({
  step1Response,
  setCriticalDetails,
}) => {
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

  const dateNow = new Date();

  const nowYear = dateNow.getFullYear();
  const dob = step1Response && step1Response?.dob.split("-");
  const dobYear = dob && dob[0];
  let dobmonth = dob && dob[1];
  const dobDay = dob && dob[2].split(" ")[0];
  if (dobmonth < 10) {
    dobmonth = dobmonth.split("0")[1];
  }

  function getKeyByValue(value: string, enumObject: any) {
    for (const [key, val] of Object.entries(enumObject)) {
      if (val === value) {
        return key;
      }
    }
  }

  const MaritalKey = getKeyByValue(
    String(step1Response?.marital_status),
    MaritalStatus
  );

  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUserX />
            Critical Fields
            <span className={classes.DetailsTypeLeft_subHeading}>
              - Can be edit only once in lifetime
            </span>
          </div>
          <span
            className={classes.Edit}
            onClick={() => setCriticalDetails(true)}
          >
            Edit
          </span>
        </div>
        <div className={classes.Userdetails}>
          <div className={classes.UserdetailsSec}>
            <p className={classes.input_Name}>Age</p>
            <p className={classes.input_Value}>
              {`${nowYear - dobYear ||"NA"} ( ${dobDay}th ${
                months[dobmonth - 1]
              } ${dobYear}  ) ` }
            </p>
          </div>
          <div className={classes.UserdetailsSec}>
            <p className={classes.input_Name}>Marital Status</p>
            <p className={classes.input_Value}>
              {MaritalKey?.replaceAll("_", " ") || "NA"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriticalDetials;
