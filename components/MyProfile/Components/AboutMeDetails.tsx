import { FC } from "react";
import { FiUser } from "react-icons/fi";
import classes from "./GlobalDetails.module.scss";

interface MyComponentProps {
  setAboutMeDetails: (details: boolean) => void;
}
const AboutMeDetails:FC<MyComponentProps> = ({ setAboutMeDetails }) => {
  const BasicDetails = [
    {
      name: "Discribe yourself in 5 words",
      vlaue: "NA",

    },
    {
      name: "About my family",
      vlaue: "NA",

    },
    {
      name: "Education",
      vlaue: "NA",
    },
    {
      name: "Occupation",
      vlaue: "NA",
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam, ipsam unde cum placeat dignissimos a pariatur temporibus, natus aspernatur totam repudiandae! Sit tenetur, qui optio provident est ipsam ipsum, dicta reiciendis aliquid distinctio commodi quidem? Velit voluptatum et tempora, quod ad aperiam, labore earum dolores dignissimos nesciunt eius itaque! 
          </p>
        </div>
        <div className={classes.Userdetails}>
          {BasicDetails.map((item) => {
            return (
                <div className={classes.UserdetailsSec} key={item.name}>
                  <p className={classes.input_Name}>{item.name}</p>
                  <p className={item.vlaue === "NA" ? classes.input_Value_NotFilled : classes.input_Value}>{item.vlaue === "NA" ? "Not Field in" : item.vlaue} </p>
                </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutMeDetails;
