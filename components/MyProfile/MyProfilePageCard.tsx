import { Container, Row, Col, Image, Button } from "react-bootstrap";
import classes from "./MyProfileCard.module.scss";
import HalfCircleProgressBar from "./HalfCircleProgressBar";
import { useState, useEffect } from "react";
import CustomButton from "../Button/CustomButton";
import { IPartnerDetailsInterestResponse, IPartnerDetailsP1Response, IPartnerDetailsPrivacyResponse } from "../../types/PartnerDetails/partnerDetails";

interface Step1DataResponse {
  step1Response: IPartnerDetailsP1Response | null | undefined;
  AuthSuccess: any;
  onPreviewAlbum: () => void;
  profileCompliteScore: number | undefined;
  privacySetting?: IPartnerDetailsPrivacyResponse | null;
  interestResponse?: IPartnerDetailsInterestResponse | null;
}

const MyProfilePageCard: React.FC<Step1DataResponse> = ({
  step1Response,
  onPreviewAlbum,
  AuthSuccess,
  profileCompliteScore,
  interestResponse,
  privacySetting
}) => {
  const blurredPhotoUrl = './Images/blured-img.webp';
  // const [showGallery, setShowGallery] = useState<boolean>(false);
  const [profileCompliteScorePersent, setProfileCompliteScorePersent] = useState<number>(profileCompliteScore && profileCompliteScore * 100 || -1)

  const showGalleryClickHandler = () => {
    // setShowGallery(!showGallery);
    onPreviewAlbum();
  };

  useEffect(() => {
    profileCompliteScore && setProfileCompliteScorePersent(profileCompliteScore * 100)
  }, [profileCompliteScore])

  function getKeyByValue(value: string, enumObject: any) {
    for (const [key, val] of Object.entries(enumObject)) {
      if (val === value) {
        return key.replaceAll("_", " ");
      }
    }
  }




  const reptNameHide = () => <>{step1Response?.fullname.slice(0, 3)}<span>{'*'.repeat(8)}</span></>;


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
        <span className="text-lowercase ">{startuserName.toLocaleLowerCase()}</span>
        <span className="text-lowercase ">{hiddenPlaceholder}</span>
        <span className="text-lowercase ">
          {email.slice(atIndex, email.length).toLocaleLowerCase()} {/* Display the domain part of the email */}
        </span>
      </>
    );
  }

  const reptPhoneHide = () => {
    const mobileNumber = step1Response?.mobile.toLocaleString(); // Convert the mobile number to a string
    const hiddenDigits = mobileNumber && mobileNumber.slice(6); // Get the portion of the number to hide
    const hiddenPlaceholder = hiddenDigits && 'X'.repeat(hiddenDigits.length); // Create a placeholder of asterisks with the same length

    return (
      <>
        <span>{hiddenPlaceholder}</span>
        {mobileNumber && mobileNumber.slice(-3)} {/* Display the last 4 digits of the mobile number */}
      </>
    );
  };


  const ShowNameONConditions = step1Response && step1Response?.fullname.length > 16
    ? (step1Response?.fullname).toLocaleLowerCase().substring(0, 15).concat('...')
    : step1Response?.fullname.toLocaleLowerCase();

  const ShowEmainONConditions = step1Response && step1Response?.emailid.length > 16
    ? (step1Response?.emailid).substring(0, step1Response.emailid.indexOf('@') + 4).concat('...')
    : step1Response?.emailid.toLocaleLowerCase();



  return (
    <Container className={classes.cardWrapper}>
      <Row className={classes.mobileRow}>
        <Col sm={3} md={4} lg={3} className={`${classes.Profile_section} p-0 d-flex justify-content-end`}>
          <Image
            src={privacySetting ? privacySetting?.privacy_show_photo === 'P'
              ? `http://dev.royalmatrimonial.com/api/${step1Response?.photo}`
              : interestResponse?.Send === 'A' || interestResponse?.Recieve === 'A' || interestResponse?.Recieve === 'S'
                ?
                interestResponse?.Send === 'D' || interestResponse?.Recieve === 'D'
                  ? blurredPhotoUrl
                  : `http://dev.royalmatrimonial.com/api/${step1Response?.photo}`

                : blurredPhotoUrl
              : `${process.env.NEXT_PUBLIC_URL}/${step1Response?.photo}`
            }
            className={classes.mobileAvatar}
            alt="avatar"
          />
        </Col>
        <Col sm={5} md={8} lg={6} className={classes.cardInfo}>
          <div className={`${classes.MyProfileMiddle} `}>
            <div className={classes.MiddleLeft}>
              <div>
                <p className={classes.MiddleLeftHeading}>
                  Name : <span> {
                    privacySetting
                      ? privacySetting?.privacy_show_name === 'P'
                        ? ShowNameONConditions
                        : interestResponse?.Send === 'A' || interestResponse?.Recieve === 'A' || interestResponse?.Recieve === 'S'
                          ? interestResponse?.Send === 'D' || interestResponse?.Recieve === 'D'
                            ? reptNameHide()
                            : ShowNameONConditions
                          : reptNameHide()
                      : ShowNameONConditions
                  }</span>{" "}
                </p>
                <p className={classes.MiddleLeftHeading}>
                  RM ID : <span>{AuthSuccess?.user_RM_ID || "NA"} </span>{" "}
                </p>
                <p className={classes.MiddleLeftHeading}>
                  Mobile No : <span> {privacySetting
                    ? privacySetting?.privacy_show_contact === 'P' ?
                      step1Response?.mobile
                      : interestResponse?.Send === 'A' || interestResponse?.Recieve === 'A' || interestResponse?.Recieve === 'S'
                        ? interestResponse?.Send === 'D' || interestResponse?.Recieve === 'D'
                          ? reptPhoneHide()
                          : step1Response?.mobile
                        : reptPhoneHide()
                    : step1Response?.mobile
                  } </span>{" "}
                </p>
                <p className={`${classes.MiddleLeftHeading} `}>
                  Email Id : <span className="text-lowercase">
                    {privacySetting
                      ? privacySetting?.privacy_show_contact === 'P' ?
                        ShowEmainONConditions
                        : interestResponse?.Send === 'A' || interestResponse?.Recieve === 'A' || interestResponse?.Recieve === 'S'
                          ? interestResponse?.Send === 'D' || interestResponse?.Recieve === 'D'
                            ? reptEmailHide()
                            : ShowEmainONConditions
                          : reptEmailHide()
                      : ShowEmainONConditions
                    } </span>{" "}
                </p>
              </div>

              <CustomButton onClick={showGalleryClickHandler}>
                Preview Album
              </CustomButton>
            </div>
          </div>
        </Col>
        <Col sm={4} md={12} lg={3} className={classes.rightBox}>
          {/* <div className={classes.RightPrograss}>
            25%
        </div> */}
          <HalfCircleProgressBar profileComplete={profileCompliteScorePersent} />
          <p className={classes.CompleteProfileHEd}>
            Profile Completion Status
          </p>
          {/* <p>Last edited on 06th Mar, 2023 </p> */}
          <p>Profile view : 0 </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfilePageCard;
