import { FC } from "react";
import { BiBook } from "react-icons/bi";
import { BsPinAngle } from "react-icons/bs";
import classes from "./GlobalDetails.module.scss";

interface MyComponentProps {
  setEudcationAndCareer: (details: boolean) => void;
}
const EducationAndCareer: FC<MyComponentProps> = ({
  setEudcationAndCareer,
}) => {
  const BasicDetails = {
    pin: true,
    pinValue: "Intersted in setting aborad?",
    data: [
      {
        name: "Country",
        value: "NA",
      },
      {
        name: "State",
        value: "NA",
      },
      {
        name: "City",
        value: "NA",
      },
      {
        name: "Residential Status",
        value: "NA",
      },
      {
        name: "Ready to Settle Aboard",
        value: "yes",
      },
      {
        name: "Higest Education",
        value: "M.S.(Engineering)",
      },
      {
        name: "Employed In",
        value: "Private Sector",
      },
      {
        name: "Annual Income",
        value: "Rs. 1-2 Lakh",
      },

      {
        name: "Other UG Degree",
        value: "NA",
      },
      {
        name: "Other PG Degree",
        value: "NA",
      },

      {
        name: "Occupation",
        value: "Admin Professional",
      },
      {
        name: "Organization Name",
        value: "NA",
      },
    ],
  };
  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <BiBook />
            Education & Career
          </div>
          <span
            className={classes.Edit}
            onClick={() => setEudcationAndCareer(true)}
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

export default EducationAndCareer;
