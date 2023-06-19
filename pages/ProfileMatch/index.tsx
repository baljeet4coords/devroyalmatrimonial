import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import ProfileCard from "../../components/ProfileCard";
import classes from "./ProfileMatch.module.scss";
import { CustomButton, Footer } from "../../components";
import TestProfileCard from "../../components/ProfileCard/TestProfileCard";
import { useDispatch } from "react-redux";
import { matchMakingReq } from "../../ducks/matchMaking/actions";
import { selectmatchMakingSuccess } from "../../ducks/matchMaking/selectors";
import { useSelector } from "react-redux";

const ProfileMatch: React.FC = () => {
  const matchMakingResponse = useSelector(selectmatchMakingSuccess);


  const [userMatchData, setMatchUserData] = useState(matchMakingResponse)
  const dispatch = useDispatch();
  const [maxUserId, setMaxUserId] = useState(-1);

  useEffect(() => {
    dispatch(matchMakingReq({
      userId: 397,
      maxUserId: -1,
      limit: 5,
      viceVersa: 1,
      excludedUsers: ['101'],
    }));
  }, [dispatch]);


  useEffect(() => {
    matchMakingResponse && setMatchUserData(matchMakingResponse)
  }, [matchMakingResponse])

  useEffect(() => {
    const maxid = userMatchData?.jsonResponse != null ? userMatchData?.jsonResponse[userMatchData?.jsonResponse.length - 1].userid : -1;
    setMaxUserId(maxid);
    if(userMatchData && userMatchData.output <0){
      setMaxUserId(-1)
    }
  }, [userMatchData])


  const loadMoreHandler = () => {

    dispatch(matchMakingReq({
      userId: 397,
      maxUserId: maxUserId,
      limit: 5,
      viceVersa: userMatchData != undefined ? userMatchData.output === -1000 || userMatchData.output === -3000 ? 0 : 1 : 1,
      excludedUsers: ['101'],
    }));


  }

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
        <TestProfileCard userMatchData={userMatchData?.jsonResponse} />
        {userMatchData && userMatchData?.output != -4000 && <div className="m-5 d-flex" >
          <CustomButton onClick={loadMoreHandler}>Load More </CustomButton>
        </div>}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ProfileMatch;
