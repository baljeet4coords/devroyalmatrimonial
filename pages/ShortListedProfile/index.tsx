import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ShortListedProfile.module.scss";
import { Footer, LoginHeader } from "../../components";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { shortListReq } from "../../ducks/userShortList/actions";
import { useDispatch } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import { useSelector } from "react-redux";
import { selectshortListSuccess } from "../../ducks/userShortList/selectors";
import { ICardViewResponse } from "../../types/short-Block-Interest";
import { blockListReq } from "../../ducks/userBlocklist/actions";
import { selectblockListSuccess } from "../../ducks/userBlocklist/selectors";
import PageHeading from "../../components/PageHeading";

const ShortlistedProfile: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const shortlistSuccessResponse = useSelector(selectshortListSuccess)
  const blocklistSuccessResponse = useSelector(selectblockListSuccess)
  const [shortListedUser, setShortListedUser] = useState<ICardViewResponse[] | null>(shortlistSuccessResponse ? shortlistSuccessResponse?.shortlistCard.jsonResponse : []);

  const [Shortlisted_Id, setShortlisted_Id] = useState<number[]>(shortlistSuccessResponse ? shortlistSuccessResponse?.shotlistedID?.jsonResponse : []);
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [blockList, setBlockList] = useState(blocklistSuccessResponse?.blocklistedID.jsonResponse != null ? blocklistSuccessResponse?.blocklistedID.jsonResponse : []);
  const [block, setBlock] = useState<number[]>([]);


  const handleShortList_ID = (val: number) => {
    setShortlisted_Id([...Shortlisted_Id, val])
  }



  useEffect(() => {
    if (shortlistSuccessResponse) {
      setShortListedUser(shortlistSuccessResponse?.shortlistCard.jsonResponse);
      setShortlisted_Id(shortlistSuccessResponse?.shotlistedID?.jsonResponse)
    }
    if (blocklistSuccessResponse) {
      setBlockList(blocklistSuccessResponse?.blocklistedID.jsonResponse != null ? blocklistSuccessResponse?.blocklistedID.jsonResponse : [])
    }
  }, [shortlistSuccessResponse, blocklistSuccessResponse])

  useEffect(() => {
    dispatch(shortListReq({
      userId: userId ? userId : -1,
    }));
    dispatch(blockListReq({
      userId: userId ? userId : -1,
    }))
  }, [userId, dispatch,])



  const updateShortListedUser = (id: number) => {

    const updatedShotListedID = Shortlisted_Id.filter((shotListedID) => {
      return shotListedID != id;
    })
    setShortlisted_Id(updatedShotListedID);
    dispatch(shortListReq({
      userId: userId ? userId : -1,
    }));
    dispatch(blockListReq({
      userId: userId ? userId : -1,
    }))
  }

  const shortlistedProfilesComponent = () => {
    return <ShortVisitorProfile
      title={"0 Shortlisted Profiles"}
      subtitle={"People you shortlist will appear here"}
    />
  };




  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>

        {
          shortListedUser === null &&
          shortlistedProfilesComponent()
        }

        {shortListedUser && shortListedUser?.length < 1 && shortListedUser?.every(value => blockList.includes(value.userid)) ?
          < ShortVisitorProfile
            title={"0 Shortlisted Profiles"}
            subtitle={"People you shortlist will appear here"}
          />
          :
          shortListedUser != null &&
          <>
            <PageHeading heading="Profile that you have shorlist show here !!" />
            <div className={classes.card_container}>
              {shortListedUser && shortListedUser.map((user) => {
                if (blockList && !blockList.includes(user.userid)) {
                  return (
                    <ProfileCard userData={user?.usercard} userID={userId || 0} key={user.usercard.userid + user.usercard.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={block} setSendInterest={setSendInterest} setBlock={handleShortList_ID} updateShortListedUser={updateShortListedUser} />
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

export default ShortlistedProfile;
