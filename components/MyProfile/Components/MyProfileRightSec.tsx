import { CiCreditCard1 } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import CustomButton from "../../Button/CustomButton";
import classes from "../Components/RightSectionMyProfile.module.scss";
// import CustomButton from "../../../../components/Button/CustomButton";

const MyProfileRightSec: React.FC = () => {
  const BasicDetails = {
    pin: false,
    pinValue: "",
    data: [
      {
        name: "Email id",
        value: "singhsinghsud@gamil.com",
        verify: true,
        isVerify: false,
      },
      {
        name: "Alternate Email id",
        value: "NA",
      },
      {
        name: "Mobile No.",
        value: "+91-9540494428",
        verify: true,
        isVerify: true,
      },
      {
        name: "Alternate Number",
        value: "NA",
      },
      {
        name: "Landline No.",
        value: "NA",
      },
      {
        name: "Suitable time to call",
        value: "NA",
      },
      {
        name: "Contact Address",
        value: "NA",
      },
      {
        name: "Parent's Address",
        value: "NA",
      },
    ],
  };
  const HoroScopeD = {
    Match: [
      {
        name: "Date of Bitrh",
        value: "Fer 13,1992",
      },
      {
        name: "Place of Birth",
        value: "NA",
      },
      {
        name: "Time of Birth",
        value: "NA",
      },
    ],
    NotMatch: [
      {
        name: "Sun Sign",
        value: "NA",
      },
      {
        name: "Rashi/Moon sign",
        value: "NA",
      },
      {
        name: "Nakshatra",
        value: "NA",
      },
      {
        name: "Manglic",
        value: "Non-Manglic",
      },
      {
        name: "Horoscope Privacy",
        value: "NA",
      },
    ],
  };
  // const HoroScopreNotNecessary = {

  // }
  return (
    <>
      <div className={classes.rghtSec}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <IoCallOutline />
            Contact Details
          </div>
          <span className={classes.Edit}> Edit</span>
        </div>
        <ul>
          {BasicDetails.data.map((item) => {
            return (
              <li key={item.name}>
                <p>{item.name}</p>
                <p className={classes.verify}>
                  {item.value}{" "}
                  {item.verify && (
                    <span
                      className={
                        !item.isVerify
                          ? classes.isverifyTrued
                          : classes.isverifyFalse
                      }
                    >
                      {item.isVerify ? "Verifyed" : "Verify "}{" "}
                    </span>
                  )}{" "}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes.emptyDiv}></div>
      <div className={classes.rghtSec}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <CiCreditCard1 />
            Horoscope Details
          </div>
          <span className={classes.Edit}> Edit</span>
        </div>
        <ul>
          {HoroScopeD.Match.map((item) => {
            return (
              <li key={item.name}>
                <p>{item.name}</p>
                <p
                  className={
                    item.value === "NA"
                      ? classes.input_Value_NotFilled
                      : classes.input_Value
                  }
                >
                  {item.value === "NA" ? "Not Field in" : item.value}{" "}
                </p>
              </li>
            );
          })}
        </ul>
        <CustomButton onClick={() => console.log("tab")}>
          Unlock Janampatri
        </CustomButton>
      </div>
      <hr />
      <div className={classes.rghtSec}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.input_Value}>
            Horoscope match is not necessary
          </div>
          <span className={classes.Edit}> Edit</span>
        </div>
        <ul>
          {HoroScopeD.NotMatch.map((item) => {
            return (
              <li key={item.name}>
                <p>{item.name}</p>
                <p
                  className={
                    item.value === "NA"
                      ? classes.input_Value_NotFilled
                      : classes.input_Value
                  }
                >
                  {item.value === "NA" ? "Not Field in" : item.value}{" "}
                </p>
              </li>
            );
          })}
        </ul>
        {/* <CustomButton onClick={() => console.log("tab")}>
          Unlock Janampatri
        </CustomButton> */}
      </div>
    </>
  );
};

export default MyProfileRightSec;
