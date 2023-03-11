import { FC } from "react";
import { FiUser } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import classes from "./GlobalDetails.module.scss";


interface MyComponentProps {
  setBasicDetails: (details: boolean) => void;
}
const BasicDetails:FC<MyComponentProps> = ({ setBasicDetails }) => {
  const BasicDetails = [
    {
      name: "Height",
      vlaue: "5'11",
    },
    {
      name: "Religion",
      vlaue: "Hindu",
    },
    {
      name: "mother tongue",
      vlaue: "Hindi-Delhi",
    },
    {
      name: "anual income",
      vlaue: "Rs 1-2 Lakh",
    },
    {
      name: "Location",
      vlaue: "Ambikapur",
    },
    {
      name: "Caste",
      vlaue: "Adi Dravida",
    },
    {
      name: "Profile Manage by",
      vlaue: "His profile is managed by self",
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
          <span
            className={classes.Edit}
            onClick={() => setBasicDetails(true)}
          >
            Edit
          </span>
        </div>
        <div className={classes.Username}>
          <p>
            Full name <span> - Himanshu Singh</span>{" "}
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
                  <p className={classes.input_Value}>{item.vlaue} </p>
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
