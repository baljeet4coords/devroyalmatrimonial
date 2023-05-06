import { FC } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { BsBook, BsMusicNoteBeamed, BsPinAngle } from "react-icons/bs";
import { CiBasketball, CiPillsBottle1 } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import { SlPlane } from "react-icons/sl";
import classes from "./GlobalDetails.module.scss";

interface MyComponentProps {
  setEditDetails: (details: boolean) => void;
}
const LikeDetails: FC<MyComponentProps> = ({ setEditDetails }) => {
  const BasicDetails = {
    pin: false,
    pinValue: "",
    data: [
      {
        name: <IoColorPaletteOutline size={"25px"} />,
        value: "NA",
      },
      {
        name: <BsMusicNoteBeamed />,
        value: "NA",
      },
      {
        name: <BsBook />,
        value: "NA",
      },
      {
        name: <BiMoviePlay />,
        value: "NA",
      },
      {
        name: <SlPlane />,
        value: "NA",
      },
      {
        name: <CiBasketball />,
        value: "NA",
      },
    ],
  };
  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <AiOutlineHeart />
            Your Likes
          </div>
          <span className={classes.Edit} onClick={() => setEditDetails(true)}>
            Edit
          </span>
        </div>
        <div className={classes.Userdetails}>
          {BasicDetails.data.map((item, index) => {
            return (
                <div className={classes.UserdetailsSec} key={index}>
                  <p className={classes.input_Name}>{item.name}</p>
                  <p
                    className={
                      item.value === "NA"
                        ? classes.input_Value_NotFilled
                        : classes.input_Value
                    }
                  >
                    {item.value === "NA" ? "Not Field in" : item.value}
                  </p>
                </div>
            );
          })}
        </div>
        {/* {BasicDetails.pin && (
          <div className={classes.pin}>
            <BsPinAngle />
            {BasicDetails.pinValue}
          </div>
        )} */}
      </div>
    </>
  );
};

export default LikeDetails;
