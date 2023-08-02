import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ProfileVisitor.module.scss";
import { LoginHeader, Footer, CustomButton } from "../../components";
import { useDispatch } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import { useSelector } from "react-redux";
import { profileVisitorReq, profileVisitorSuccess } from "../../ducks/profileVisitors/actions";
import { selectprofileVisitorSuccess } from "../../ducks/profileVisitors/selectors";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";
import PageHeading from "../../components/PageHeading";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { IProfileVisitorsResponse } from "../../types/ProfileVisitor/profileVisitors";
import { selectblockListSuccess } from "../../ducks/userBlocklist/selectors";
import { blockListReq } from "../../ducks/userBlocklist/actions";

const ProfileVisitor: React.FC = () => {
  const limit = 10;
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const getUserBlockList = useSelector(selectblockListSuccess);
  const profileVisitorSuccessResponse = useSelector(selectprofileVisitorSuccess);
  const isReduxEmpty = profileVisitorSuccessResponse?.jsonResponse ? profileVisitorSuccessResponse.jsonResponse.length < 1 : true;
  const [allUserData, setAllUserData] = useState<IProfileVisitorsResponse[]>(profileVisitorSuccessResponse?.jsonResponse ? profileVisitorSuccessResponse?.jsonResponse : [])
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [maxUserId, setMaxUserId] = useState(-1);
  const [block, setBlock] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    dispatch(profileVisitorReq({
      userId: userId ? userId : -1,
      maxVisitorId: maxUserId,
      limit: limit,
    }));
    dispatch(blockListReq({
      userId: userId
    }))
  }, [userId, dispatch])



  useEffect(() => {

    if (profileVisitorSuccessResponse?.jsonResponse) {
      setAllUserData(profileVisitorSuccessResponse.jsonResponse)
    }

    if (allUserData) {
      allUserData.map((user) => {
        let maxid = Math.max(maxUserId, user.visitorid);
        setMaxUserId(maxid);
      });
    }

    if (getUserBlockList?.blocklistedID) {
      setBlock(getUserBlockList?.blocklistedID?.jsonResponse || [])
    }

  }, [allUserData, getUserBlockList, profileVisitorSuccessResponse]);



  const handleBlockList_ID = (val: number) => {
    if (block.includes(val)) {
      const updatedBlockID = block.filter((id) => id != val)
      setBlock(updatedBlockID)
    } else {
      setBlock([...block, val])
    }
  }


  const handleUpDateBlockuser = (mutationResult: any, id: number) => {
    // dispatch(profileVisitorSuccess(mutationResult));
  }



  const loadMoreHandler = () => {
    setLoading(true)
    const updatedPayload = {
      userId: userId ? userId : -1,
      maxVisitorId: maxUserId,
      limit: limit,
    }
    dispatch(profileVisitorReq(updatedPayload));
    setLoading(false)
  }

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>
        {profileVisitorSuccessResponse?.jsonResponse != null && profileVisitorSuccessResponse?.jsonResponse.length < 1 ?
          < ShortVisitorProfile
            title={"No Profile Visitor Found !!"}
            subtitle={"Profile Visitor will apper here. "}
            image="/Images/profile_visitor.png"
          />
          :
          <>
            <PageHeading heading="Profile that visit your profile will appear here !!" />
            <div className={classes.card_container}>
              {profileVisitorSuccessResponse?.jsonResponse != null && profileVisitorSuccessResponse?.jsonResponse.map((user) => {
                if (user.usercard) {
                  return (
                    <ProfileCard userData={user?.usercard} userID={userId || 0} key={user?.userid + user?.usercard?.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={block} setSendInterest={setSendInterest} setBlock={handleBlockList_ID} updateBlockListedUser={handleUpDateBlockuser} />
                  )
                }
              })}
            </div>

            {profileVisitorSuccessResponse && profileVisitorSuccessResponse?.output >= limit &&
              <div className="m-5 d-flex" >
                <CustomButton onClick={loadMoreHandler} >
                  {loading && (
                    <Spinner
                      className={classes.loginSpiner}
                      animation="border"
                      variant="light"
                    />
                  )}
                  Load More </CustomButton>
              </div>}
          </>
        }
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default ProfileVisitor;
