import { FC } from "react";
import { BsPinAngle } from "react-icons/bs";
import { CiPillsBottle1 } from "react-icons/ci";
import classes from "./GlobalDetails.module.scss";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
}
const LifeStyleDetails: FC<MyComponentProps> = ({ setEditDetails }) => {
  const BasicDetails = {
    pin: true,
    pinValue: "Open to pets?",
    data: [
      {
        name: "Diet",
        value: "Vegetarian",
      },
      {
        name: "Smoking",
        value: "Occasionally",
      },
      {
        name: "drinking",
        value: "NA",
      },
      {
        name: "Love pets",
        value: "yes",
      },
      {
        name: "Owns House",
        value: "no",
      },
      {
        name: "Owns car",
        value: "yes",
      },
      {
        name: "Blood group",
        value: "NA",
      },
      {
        name: "Thalassemia",
        value: "NA",
      },
    ],
  };
  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <CiPillsBottle1 />
            LifeStyle
          </div>
          <span className={classes.Edit} onClick={() => setEditDetails(true)}>
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

export default LifeStyleDetails;
