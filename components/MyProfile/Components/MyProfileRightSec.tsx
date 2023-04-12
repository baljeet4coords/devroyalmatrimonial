import { useState } from "react";
import classes from "../Components/RightSectionMyProfile.module.scss";
import RightSectionContactDetails from "./RightSecContactDetails";
import {
  RightSectionHoroScopeMatch,
  RightSectionHoroScopeNotMatch,
} from "./RightSecHoroScope";

interface RightSectionProp {
  myProfileObject: any;
}
const MyProfileRightSec: React.FC<RightSectionProp> = ({ myProfileObject }) => {
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
