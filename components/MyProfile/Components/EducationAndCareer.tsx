import { BiBook } from "react-icons/bi";
import { BsPinAngle } from "react-icons/bs";
import classes from "./GlobalDetails.module.scss";

const EducationAndCareer: React.FC = () => {
  const BasicDetails = {
    pin: true,
    pinValue: "Intersted in setting aborad?",
    data: [
      {
        name: "Higest Education",
        value: "M.S.(Engineering)",
      },
      {
        name: "School Name",
        value: "NA",
      },
      {
        name: "UG College",
        value: "B.E/B.Tech",
      },
      {
        name: "PG College",
        value: "NA",
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
        name: "Employed In",
        value: "Private Sector",
      },
      {
        name: "Occupation",
        value: "Admin Professional",
      },
      {
        name: "Organization Name",
        value: "NA",
      },
      {
        name: "Annual Income",
        value: "Rs. 1-2 Lakh",
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
          <span className={classes.Edit}> Edit</span>
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
        {BasicDetails.pin && <div className={classes.pin}>
          <BsPinAngle />
          {BasicDetails.pinValue}
        </div>}
      </div>
    </>
  );
};

export default EducationAndCareer;
