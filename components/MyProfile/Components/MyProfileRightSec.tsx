import { useState } from "react";
import classes from "../Components/RightSectionMyProfile.module.scss";
import RightSectionContactDetails from "./RightSecContactDetails";
import {
  RightSectionHoroScopeMatch,
  RightSectionHoroScopeNotMatch,
} from "./RightSecHoroScope";

const MyProfileRightSec: React.FC = () => {
  const [editContact, setEditContact] = useState<boolean>(false);
  const [editHoroscopeMatch, setEditHoroscopeMatch] = useState<boolean>(false);
  const [editHoroscopeNotMatch, setEditHoroscopeNotMatch] =
    useState<boolean>(false);

  return (
    <>
      <RightSectionContactDetails
        EditDetails={editContact}
        setEditDetails={setEditContact}
      />

      <div className={classes.emptyDiv}></div>

      <RightSectionHoroScopeMatch
        EditDetails={editHoroscopeMatch}
        setEditDetails={setEditHoroscopeMatch}
      />
      <hr />
      <RightSectionHoroScopeNotMatch
        EditDetails={editHoroscopeNotMatch}
        setEditDetails={setEditHoroscopeNotMatch}
      />
    </>
  );
};

export default MyProfileRightSec;
