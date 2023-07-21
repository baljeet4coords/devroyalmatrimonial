import { FC } from "react";
import classes from "../Components/RightSectionMyProfile.module.scss";
import EditContact from "../../EditMyProfile/EditContact";
import { IoCallOutline } from "react-icons/io5";
import { IPartnerDetailsInterestResponse, IPartnerDetailsPrivacyResponse } from "../../../types/PartnerDetails/partnerDetails";

interface MyComponentProps {
  EditDetails: boolean;
  setEditDetails: (details: boolean) => void;
  step1Response: any;
  privacySetting?: IPartnerDetailsPrivacyResponse | null;
  interestResponse?: IPartnerDetailsInterestResponse | null;
}
const RightSectionContactDetails: FC<MyComponentProps> = ({
  EditDetails,
  setEditDetails,
  step1Response,
  privacySetting,
  interestResponse
}) => {


  const reptEmailHide = () => {
    const email = step1Response?.emailid; // Retrieve the email address from step1Response object

    if (!email) {
      return null; // Return null if the email is null or undefined
    }

    const startuserName = email.slice(0, 4);
    const atIndex = email.indexOf('@'); // Find the index of the '@' symbol in the email address
    const username = email.slice(0, atIndex); // Get the username part of the email
    const hiddenPlaceholder = '*'.repeat(username.length - 5); // Create a placeholder of asterisks with the same length

    return (
      <>
        <span className="text-lowercase ">{startuserName.toLocaleLowerCase()} {hiddenPlaceholder}
          {email.slice(atIndex, email.length).toLocaleLowerCase()}
        </span>
      </>
    );
  }

  const reptPhoneHide = () => {
    const mobileNumber = step1Response?.mobile.toLocaleString(); // Convert the mobile number to a string
    const hiddenDigits = mobileNumber && mobileNumber.slice(6); // Get the portion of the number to hide
    const hiddenPlaceholder = hiddenDigits && '*'.repeat(hiddenDigits.length); // Create a placeholder of asterisks with the same length

    return (
      <>
        <span>{hiddenPlaceholder}
        {mobileNumber && mobileNumber.slice(-3)} {/* Display the last 4 digits of the mobile number */}
        </span>
      </>
    );
  };


  const BasicDetails = {
    pin: false,
    pinValue: "",
    data: [
      {
        name: "Email id",
        value: privacySetting?.privacy_show_contact === 'I' && interestResponse?.Send != 'A'
          ? reptEmailHide()
            : step1Response && step1Response?.emailid.length > 22
              ? (step1Response?.emailid).substring(0, step1Response.emailid.indexOf('@') + 4).concat('...')
            : step1Response?.emailid.toLocaleLowerCase()
        ,
        verify: true,
        isVerify: false,
      },
      {
        name: "Alternate Email id",
        value: "NA",
      },
      {
        name: "Mobile No.",
        value: privacySetting?.privacy_show_contact === 'I' && interestResponse?.Send != 'A'
          ? reptPhoneHide()
          : step1Response?.mobile
        ,
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


  return (
    <>
      <div className={classes.rghtSec}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <IoCallOutline />
            Contact Details
          </div>
          {/* {!EditDetails && (
            <span className={classes.Edit} onClick={() => setEditDetails(true)}>
              {" "}
              Edit
            </span>
          )} */}
        </div>
        {!EditDetails ? (
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
                        {/* {item.isVerify ? "Verified" : "Verify "}{" "} */}
                      </span>
                    )}{" "}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <EditContact step1Response={step1Response} setEditDetails={setEditDetails} />
        )}
      </div>
    </>
  );
};

export default RightSectionContactDetails;
