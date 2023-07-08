import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import classes from "./ProfileMatch.module.scss";
import { CustomButton, Footer } from "../../components";
import { useDispatch } from "react-redux";
import { matchMakingReq } from "../../ducks/matchMaking/actions";
import { selectmatchMakingSuccess } from "../../ducks/matchMaking/selectors";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { getUserId } from "../../ducks/auth/selectors";
import axios from "axios";


const ProfileMatch: React.FC = () => {
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
  const limit = 50;
  const userId = useSelector(getUserId);
  // const userId = 473;

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
        let maxid = Math.min(...userAlreadyGetId);
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


  // useEffect(() => {


  // }, [userId])

  useEffect(() => {

    const response = () => axios.post(
      `${process.env.NEXT_PUBLIC_URL}/blockUser/getUserBlockList`,
      {
        userId: 413,
        bothSide: 'Y'
      }
    ).then((response) => {
      setBlock(response.data.jsonResponse);
      setUserAlreadyGetId([...block])
    }).catch((err) => {
      console.log(err);

    })
    response();

    isReduxEmpty && dispatch(matchMakingReq({
      userId: userId ? userId : -1,
      maxUserId: -1,
      limit: limit,
      viceVersa: 0,
      excludedUsers: JSON.stringify(userAlreadyGetId),
    }));


  }, [dispatch]);


  useEffect(() => {
    if (matchMakingResponse) {
      setMatchUserData(matchMakingResponse)
      setAllUserData(matchMakingResponse?.jsonResponse)
    }
  }, [matchMakingResponse])



  const loadMoreHandler = () => {

    dispatch(matchMakingReq({
      userId: userId || 0,
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
        </Container>
        <div className={classes.card_container}>
          {allUserData && allUserData.map((user) => {
            return (
              <ProfileCard userData={user} userID={userId || 0} key={user.userid + user.user_RM_ID} ShortlistedUser={Shortlisted} SendInterestUser={sendInterest} BlockedUser={block} setShortlisted={setShortlisted} setSendInterest={setSendInterest} setBlock={setBlock} />
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

export default ProfileMatch;
