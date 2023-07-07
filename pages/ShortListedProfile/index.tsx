import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ShortListedProfile.module.scss";
import { Footer, LoginHeader } from "../../components";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const ShortlistedProfile: React.FC = () => {
  // const [userMatchData, setMatchUserData] = useState(matchMakingResponse)
  // const [allUserData, setAllUserData] = useState(userMatchData?.jsonResponse)
  const [maxUserId, setMaxUserId] = useState(-1);
  const [userAlreadyGetId, setUserAlreadyGetId] = useState<number[]>([]);
  const [viceVersa, setViceVersa] = useState<number>(1);
  const [Shortlisted, setShortlisted] = useState<number[]>([]);
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [block, setBlock] = useState<number[]>([]);
  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        <ShortVisitorProfile
          title={"0 Shortlisted Profiles"}
          subtitle={"People you shortlist will appear here"}
        />
        {/* <ProfileCard userData={user} userID={userId} key={user.userid + user.user_RM_ID} ShortlistedUser={Shortlisted} SendInterestUser={sendInterest} BlockedUser={block} setShortlisted={setShortlisted} setSendInterest={setSendInterest} setBlock={setBlock} /> */}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ShortlistedProfile;
