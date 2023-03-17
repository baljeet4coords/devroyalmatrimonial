import { FiUserX } from "react-icons/fi";
import { FC } from "react";
import classes from "./GlobalDetails.module.scss";

interface MyComponentProps {
  setCriticalDetails: (details: boolean) => void;
}
const CriticalDetials: FC<MyComponentProps> = ({ setCriticalDetails }) => {
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
            <p className={classes.input_Value}>31 (13th Feb 1992)</p>
          </div>
          <div className={classes.UserdetailsSec}>
            <p className={classes.input_Name}>Marital Status</p>
            <p className={classes.input_Value}>Never Married</p>
          </div>  
        </div>
      </div>
    </>
  );
};

export default CriticalDetials;
