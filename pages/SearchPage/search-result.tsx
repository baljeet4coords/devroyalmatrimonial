import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import ProfileCard from "../../components/ProfileCard";
import classes from "../ProfileMatch/ProfileMatch.module.scss";
import { CustomButton, Footer } from "../../components";
import TestProfileCard from "../../components/ProfileCard/ProfileCard";
import { useDispatch } from "react-redux";
import { matchMakingReq } from "../../ducks/matchMaking/actions";
import { selectmatchMakingSuccess } from "../../ducks/matchMaking/selectors";
import { useSelector } from "react-redux";

const limit = 5;
const userId = 397;

// gir id 413

const SearchResult: React.FC = () => {
  const matchMakingResponse = useSelector(selectmatchMakingSuccess);
  const isReduxEmpty = matchMakingResponse?.jsonResponse ? matchMakingResponse.jsonResponse.length < 1 : true;
  const dispatch = useDispatch();


  const [userMatchData, setMatchUserData] = useState(matchMakingResponse)
  const [allUserData, setAllUserData] = useState(userMatchData?.jsonResponse)
  const [maxUserId, setMaxUserId] = useState(-1);
  const [userAlreadyGetId, setUserAlreadyGetId] = useState<number[]>([]);
  const [viceVersa, setViceVersa] = useState<number>(1);
  const [Shortlisted, setShortlisted] = useState<number[]>([]);
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [block, setBlock] = useState<number[]>([]);

  useEffect(() => {
    if (userMatchData && userMatchData.jsonResponse) {
      userMatchData.jsonResponse.map((user) => {
        if (!userAlreadyGetId.includes(user.userid)) {
          setUserAlreadyGetId((prevUserAlreadyGetId) => [
            ...prevUserAlreadyGetId,
            user.userid,
          ]);
        }

        // to set maxuserid 
        let maxid = Math.max(...userAlreadyGetId);
        setMaxUserId(maxid);
      });

    }
    // to update viceVersa 
    if (userMatchData != null) {
      if (userMatchData?.output === -1000 || userMatchData?.output === -3000) {
        setViceVersa(0);
      }
      if (userMatchData?.output === -2000 || userMatchData?.output === -4000) {
        setViceVersa(1)
      }
    }

  }, [userMatchData, userAlreadyGetId, userMatchData?.output]);

  useEffect(() => {
    isReduxEmpty && dispatch(matchMakingReq({
      userId: userId,
      maxUserId: -1,
      limit: limit,
      viceVersa: viceVersa,
      excludedUsers: JSON.stringify(userAlreadyGetId),
    }));

  }, [dispatch]);


  useEffect(() => {
    matchMakingResponse && setMatchUserData(matchMakingResponse)
    setAllUserData(matchMakingResponse?.jsonResponse)
  }, [matchMakingResponse])



  const loadMoreHandler = () => {

    dispatch(matchMakingReq({
      userId: userId,
      maxUserId: maxUserId,
      limit: limit,
      viceVersa: viceVersa,
      excludedUsers: JSON.stringify(userAlreadyGetId),
    }));


  }

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
          <h3>Search Results </h3>
        </Container>
        <div className={classes.card_container}>
          {allUserData && allUserData.map((user) => {
            return (
              //@ts-ignore
              <TestProfileCard userData={user} userID={userId} key={user.userid + user.user_RM_ID} ShortlistedUser={Shortlisted} SendInterestUser={sendInterest} BlockedUser={block} setShortlisted={setShortlisted} setSendInterest={setSendInterest} setBlock={setBlock} />
            )
          })}
        </div>
        {userMatchData && userMatchData?.output != -4000 && <div className="m-5 d-flex" >
          <CustomButton onClick={loadMoreHandler} >Load More </CustomButton>
        </div>}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default SearchResult