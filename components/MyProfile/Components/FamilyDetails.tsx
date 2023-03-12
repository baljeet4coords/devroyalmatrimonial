import { FC } from "react";
import { BsPinAngle } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import classes from "./GlobalDetails.module.scss";

interface MyComponentProps {
  setFamilyDetails: (details: boolean) => void;
}
const FamilydetailsInfo:FC<MyComponentProps> = ({ setFamilyDetails }) => {
  const BasicDetails = {
    pin: true,
    pinValue: "Living with Parents?",
    data: [
      {
        name: "Mother's Occupation",
        value: "Service-Private",
      },
      {
        name: "Father's Occupation",
        value: "Retired",
      },
      {
        name: "Sister(s)",
        value: "2 sisters of which 1 married",
      },
      {
        name: "Brother(s)",
        value: "2 sisters of which 0 married",
      },
      {
        name: "Gothra",
        value: "NA",
      },
      {
        name: "Gothra (maternal)",
        value: "NA",
      },
      {
        name: "Family Status",
        value: "NA",
      },
      {
        name: "Family Income",
        value: "NA",
      },
      {
        name: "Family Type",
        value: "NA",
      },
      {
        name: "Family Values",
        value: "NA",
      },
      {
        name: "Family Based out of",
        value: "India",
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
          <span
            className={classes.Edit}
            onClick={() => setFamilyDetails(true)}
          >
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
        {BasicDetails.pin && (
          <div className={classes.pin}>
            <BsPinAngle />
            {BasicDetails.pinValue}
          </div>
        )}
      </div>
    </>
  );
};

export default FamilydetailsInfo;
