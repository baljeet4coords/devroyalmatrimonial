import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import ProfileCard from "../../components/ProfileCard";
import classes from "./ProfileMatch.module.scss";
import { Footer } from "../../components";
import TestProfileCard from "../../components/ProfileCard/TestProfileCard";
import { useDispatch } from "react-redux";
import { matchMakingReq } from "../../ducks/matchMaking/actions";
import { selectmatchMakingSuccess } from "../../ducks/matchMaking/selectors";
import { useSelector } from "react-redux";

const ProfileMatch: React.FC = () => {
  const matchMakingResponse = useSelector(selectmatchMakingSuccess);
  // console.log(matchMakingResponse);


  const [userMatchData, setMatchUserData] = useState(matchMakingResponse?.jsonResponse || null)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(matchMakingReq({
      userId: 344,
      maxUserId: -1,
      limit: 5,
      viceVersa: 1,
      excludedUsers: ['101'],
    }));
  }, [dispatch]);

  useEffect(() => {
    matchMakingResponse?.jsonResponse && setMatchUserData(matchMakingResponse?.jsonResponse)
  }, [matchMakingResponse])


  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        {/* <h1 className="text-center text-danger py-5 my-5">
          This Feature Is Coming Soon!
        </h1> */}
        {/* <ProfileCard /> */}
        <TestProfileCard userMatchData={userMatchData} />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ProfileMatch;
