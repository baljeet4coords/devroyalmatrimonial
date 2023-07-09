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
import { IShortListResponse } from "../../types/short-Block-Interest";

const ShortlistedProfile: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const shortlistSuccessResponse = useSelector(selectshortListSuccess)
  const [shortListedUser, setShortListedUser] = useState<IShortListResponse[] | null>(shortlistSuccessResponse ? shortlistSuccessResponse?.shortlistCard.jsonResponse : []);

  const [Shortlisted_Id, setShortlisted_Id] = useState<number[]>(shortlistSuccessResponse ? shortlistSuccessResponse?.shotlistedID?.jsonResponse : []);
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [block, setBlock] = useState<number[]>([]);



  useEffect(() => {
    if (shortlistSuccessResponse) {
      setShortListedUser(shortlistSuccessResponse?.shortlistCard.jsonResponse);
      setShortlisted_Id( shortlistSuccessResponse?.shotlistedID?.jsonResponse)
    }
  }, [shortlistSuccessResponse])

  useEffect(() => {
    dispatch(shortListReq({
      userId: userId ? userId : -1,
    }));
  }, [userId, dispatch,])



  const updataShortListedUser = (id: number) => {
    console.log(id,'id');
    
    const updatedShotListedID = Shortlisted_Id.filter((shotListedID) => {
      return shotListedID != id;
    })
    setShortlisted_Id(updatedShotListedID);
    dispatch(shortListReq({
      userId: userId ? userId : -1,
    }));
  }

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        {!shortListedUser ?
          <ShortVisitorProfile
            title={"0 Shortlisted Profiles"}
            subtitle={"People you shortlist will appear here"}
          />
          :
          <div className={classes.card_container}>
            {shortListedUser && shortListedUser.map((user) => {
              return (
                <ProfileCard userData={user?.usercard} userID={userId || 0} key={user.usercard.userid + user.usercard.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={block} setSendInterest={setSendInterest} setBlock={setBlock} updataShortListedUser={updataShortListedUser} />
              )
            })}
          </div>
        }
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ShortlistedProfile;
