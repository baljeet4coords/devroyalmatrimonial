import { useState } from "react";
import classes from "../Components/RightSectionMyProfile.module.scss";
import RightSectionContactDetails from "./RightSecContactDetails";
import {
  RightSectionHoroScopeMatch,
  RightSectionHoroScopeNotMatch,
} from "./RightSecHoroScope";
import { IPartnerDetailsInterestResponse, IPartnerDetailsPrivacyResponse } from "../../../types/PartnerDetails/partnerDetails";

interface RightSectionProp {
  myProfileObject: any;
  privacySetting?: IPartnerDetailsPrivacyResponse | null;
  interestResponse?: IPartnerDetailsInterestResponse | null;
}
const MyProfileRightSec: React.FC<RightSectionProp> = ({ myProfileObject, privacySetting, interestResponse }) => {
  const [editContact, setEditContact] = useState<boolean>(false);
  const [editHoroscopeMatch, setEditHoroscopeMatch] = useState<boolean>(false);
  const [editHoroscopeNotMatch, setEditHoroscopeNotMatch] =
    useState<boolean>(false);

  const step1Response = myProfileObject?.step1.jsonResponse;
  const step5Response = myProfileObject?.step5.jsonResponse;

  return (
    <>
      <RightSectionContactDetails
        EditDetails={editContact}
        setEditDetails={setEditContact}
        step1Response={step1Response}
        privacySetting={privacySetting}
        interestResponse={interestResponse}
      />

      <div className={classes.emptyDiv}></div>

      <RightSectionHoroScopeMatch
        EditDetails={editHoroscopeMatch}
        setEditDetails={setEditHoroscopeMatch}
        step1Response={step1Response}
        step5Response={step5Response}
      />
      <hr />
      <RightSectionHoroScopeNotMatch
        EditDetails={editHoroscopeMatch}
        setEditDetails={setEditHoroscopeMatch}
        step1Response={step1Response}
        step5Response={step5Response}
      />
    </>
  );
};

export default MyProfileRightSec;
