import { FC } from "react";
import classes from "../Components/RightSectionMyProfile.module.scss";
import EditContact from "../../EditMyProfile/EditContact";
import { IoCallOutline } from "react-icons/io5";

interface MyComponentProps {
  EditDetails: boolean;
  setEditDetails: (details: boolean) => void;
  step1Response: any;
}
const RightSectionContactDetails: FC<MyComponentProps> = ({
  EditDetails,
  setEditDetails,
  step1Response,
}) => {
  const BasicDetails = {
    pin: false,
    pinValue: "",
    data: [
      {
        name: "Email id",
        value: step1Response?.emailid || "NA",
        verify: true,
        isVerify: false,
      },
      {
        name: "Alternate Email id",
        value: "NA",
      },
      {
        name: "Mobile No.",
        value: step1Response?.mobile || "NA",
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
          {!EditDetails && (
            <span className={classes.Edit} onClick={() => setEditDetails(true)}>
              {" "}
              Edit
            </span>
          )}
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
                        {item.isVerify ? "Verifyed" : "Verify "}{" "}
                      </span>
                    )}{" "}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <EditContact setEditDetails={setEditDetails} />
        )}
      </div>
    </>
  );
};

export default RightSectionContactDetails;
