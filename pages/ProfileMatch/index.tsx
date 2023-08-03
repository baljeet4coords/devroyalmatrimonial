import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import classes from "./ProfileMatch.module.scss";
import { CustomButton, Footer } from "../../components";
import { useDispatch } from "react-redux";
import { matchMakingReq, matchMakingSuccess } from "../../ducks/matchMaking/actions";
import { selectmatchMakingSuccess } from "../../ducks/matchMaking/selectors";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { getUserId } from "../../ducks/auth/selectors";
import axios from "axios";
import { blockListReq } from "../../ducks/userBlocklist/actions";
import { selectblockListSuccess } from "../../ducks/userBlocklist/selectors";
import { ICardResponse } from "../../types/cardResponse/cardResponse";
import PageHeading from "../../components/PageHeading";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";


const ProfileMatch: React.FC = () => {
  const matchMakingResponse = useSelector(selectmatchMakingSuccess);
  const getUserBlockList = useSelector(selectblockListSuccess);
  const limit = 5;


  const dispatch = useDispatch();
  const isReduxEmpty = matchMakingResponse?.jsonResponse ? matchMakingResponse.jsonResponse.length < 1 : true;


  const [userMatchData, setMatchUserData] = useState(matchMakingResponse)
  const [allUserData, setAllUserData] = useState<ICardResponse[]>(userMatchData?.jsonResponse ? userMatchData.jsonResponse : [])
  const [maxUserId, setMaxUserId] = useState(-1);
  const [userAlreadyGetId, setUserAlreadyGetId] = useState<number[]>([]);
  const [viceVersa, setViceVersa] = useState<number>(1);
  // const [Shortlisted, setShortlisted] = useState<number[]>([]);
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [block, setBlock] = useState<number[]>(getUserBlockList && getUserBlockList.blocklistedID.jsonResponse != null ? getUserBlockList?.blocklistedID?.jsonResponse : []);
  const userId = useSelector(getUserId);


  const handleBlockList_ID = (val: number) => {
    setBlock([...block, val])
  }


  useEffect(() => {
    if (userMatchData && userMatchData.jsonResponse) {
      userMatchData.jsonResponse.map((user) => {
        if (userAlreadyGetId !== null && !userAlreadyGetId.includes(user.userid)) {
          setUserAlreadyGetId((prevUserAlreadyGetId) => {
            if (prevUserAlreadyGetId !== null) {
              return [...prevUserAlreadyGetId, user.userid];
            } else {
              return [user.userid];
            }
          });
        }


        // to set maxuserid 
        let maxid = userAlreadyGetId != null ? Math.min(...userAlreadyGetId) : -1;
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
    dispatch(blockListReq({
      userId: userId
    }))
  }, [])



  useEffect(() => {

    isReduxEmpty && dispatch(matchMakingReq({
      userId: userId ? userId : -1,
      maxUserId: -1,
      limit: limit,
      viceVersa: 0,
      excludedUsers: JSON.stringify(userAlreadyGetId),
    }));


  }, [dispatch, block]);


  useEffect(() => {
    if (matchMakingResponse && matchMakingResponse.jsonResponse != null) {
      setMatchUserData(matchMakingResponse)
      setAllUserData(matchMakingResponse?.jsonResponse)
    }

    if (getUserBlockList?.blocklistedID?.jsonResponse != null) {
      setBlock(getUserBlockList?.blocklistedID?.jsonResponse);
      setUserAlreadyGetId(block)
    }

  }, [matchMakingResponse, getUserBlockList])



  const loadMoreHandler = () => {

    dispatch(matchMakingReq({
      userId: userId || 0,
      maxUserId: maxUserId,
      limit: limit,
      viceVersa: viceVersa,
      excludedUsers: JSON.stringify(userAlreadyGetId),
    }));


  }



  // to remove item from matchmaking when click on block 

  const handleUpDateBlockuser = async (mutationResult: any, id: number) => {

    dispatch(matchMakingSuccess(mutationResult));
    const updatedUserWithoutBlock = allUserData?.filter((user) => {
      return user.userid != id;
    })
    
    setAllUserData(updatedUserWithoutBlock)
  }



  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        {allUserData && allUserData?.length < 1 ?
          < ShortVisitorProfile
            title={"No Search Result Found !!"}
            subtitle={"Search Data will apper here. "}
            image="/Images/search-not-found.png"
          />
          :
          <>
            <PageHeading heading="Profile that match your desire partner Details show here !!" />
            <div className={classes.card_container}>
              {allUserData && allUserData != null && allUserData?.map((user) => {
                if (block != null && !block.includes(user.userid)) {
                  return (
                    <ProfileCard userData={user} userID={userId || 0} key={user.userid + user.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={block} setSendInterest={setSendInterest} setBlock={handleBlockList_ID} updateBlockListedUser={handleUpDateBlockuser} />
                  )
                }
              })}
            </div>
            {userMatchData && userMatchData?.output != -4000 && <div className="m-5 d-flex" >
              <CustomButton onClick={loadMoreHandler} >Load More </CustomButton>
            </div>}
          </>
        }
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ProfileMatch;
