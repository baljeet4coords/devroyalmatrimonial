import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./BlockedProfile.module.scss";
import { Footer, LoginHeader } from "../../components";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useDispatch } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import { useSelector } from "react-redux";
import { ICardViewResponse } from "../../types/short-Block-Interest";
import { selectblockListSuccess } from "../../ducks/userBlocklist/selectors";
import { blockListReq } from "../../ducks/userBlocklist/actions";
import PageHeading from "../../components/PageHeading";
import InterestRecivedCard from "../../components/InterestComponent/InterestRecivedCard";

const BlockedProfile: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const blocklistSuccessResponse = useSelector(selectblockListSuccess)
  const [blockListedUser, setBlockListedUser] = useState<ICardViewResponse[] | null>(blocklistSuccessResponse ? blocklistSuccessResponse?.blocklistCard.jsonResponse : []);

  const [Blocklisted_Id, setBlocklisted_Id] = useState<number[]>(blocklistSuccessResponse ? blocklistSuccessResponse?.blocklistedID?.jsonResponse : []);
  const [sendInterest, setSendInterest] = useState<number[]>([]);



  const handleBlockList_ID = (val: number) => {
    setBlocklisted_Id([...Blocklisted_Id, val])
  }


  useEffect(() => {
    if (blocklistSuccessResponse) {
      setBlockListedUser(blocklistSuccessResponse?.blocklistCard.jsonResponse);
      setBlocklisted_Id(blocklistSuccessResponse?.blocklistedID?.jsonResponse)
    }
  }, [blocklistSuccessResponse])

  useEffect(() => {
    dispatch(blockListReq({
      userId: userId ? userId : -1,
    }));
  }, [userId, dispatch,])



  const updateBlockListedUser = (id: number) => {
    const updatedShotListedID = Blocklisted_Id.filter((shotListedID) => {
      return shotListedID != id;
    })
    setBlocklisted_Id(updatedShotListedID);
    dispatch(blockListReq({
      userId: userId ? userId : -1,
    }));
  }

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        {!blockListedUser ?
          <ShortVisitorProfile
            title={"0 Blocked Profiles"}
            subtitle={"People you Block will appear here"}
          />
          :
          <>
            <PageHeading heading="Profile that you have Blocked show here !!" />

            <div className={classes.card_container}>
              {blockListedUser && blockListedUser.map((user) => {
                if (user.usercard.interest.Receive === 'S' && user.usercard.interest.Send === null) {
                  return (
                    <InterestRecivedCard userData={user?.usercard} userID={userId || 0} key={user.usercard.userid + user.usercard.user_RM_ID}  BlockedUser={Blocklisted_Id} setSendInterest={setSendInterest} setBlock={handleBlockList_ID} updateBlockListedUser={updateBlockListedUser} />
                  )
                } else {
                  return (
                    <ProfileCard userData={user?.usercard} userID={userId || 0} key={user.usercard.userid + user.usercard.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={Blocklisted_Id} setSendInterest={setSendInterest} setBlock={handleBlockList_ID} updateBlockListedUser={updateBlockListedUser} />
                  )
                }
              })}
            </div>
          </>
        }
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default BlockedProfile;
