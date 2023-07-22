import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import classes from "../ProfileMatch/ProfileMatch.module.scss";
import { CustomButton, Footer } from "../../components";
import TestProfileCard from "../../components/ProfileCard/ProfileCard";
import { useDispatch } from "react-redux";
import { matchMakingReq } from "../../ducks/matchMaking/actions";
import { selectmatchMakingSuccess } from "../../ducks/matchMaking/selectors";
import { useSelector } from "react-redux";
import { ICardResponse } from "../../types/cardResponse/cardResponse";
import { useRouter } from "next/router";
import { selectsearchByDataSuccess } from "../../ducks/searchByData/selectors";
import { ISearchByDataResponse } from "../../types/searchMatchmaking/searchMatchMaking";
import { searchByDataReq } from "../../ducks/searchByData/actions";
import { SearchByData } from "../../ducks/partnerPreferrence/types";

const userId = 480;

// gir id 413

const SearchResult: React.FC = () => {
  const router = useRouter();
  const { searchdata } = router.query;
  const dispatch = useDispatch();
  const searchDataResponse = useSelector(selectsearchByDataSuccess)

  let previousSearchPayload: SearchByData = searchdata ? JSON.parse(searchdata) : {};
  // const [previousSearchPayload, setPreviousSearchPayload] = useState(searchdata);

  const [loading, setLoading] = useState(false);

  const [userSearchData, setSearchUserData] = useState(searchDataResponse)
  const [allUserData, setAllUserData] = useState<ISearchByDataResponse[]>(userSearchData?.jsonResponse || [])
  const [userAlreadyGetId, setUserAlreadyGetId] = useState<number[]>([]);
  const [maxUserId, setMaxUserId] = useState(-1);
  const [Shortlisted, setShortlisted] = useState<number[]>([]);
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [block, setBlock] = useState<number[]>([]);

  useEffect(() => {
    if (userSearchData && userSearchData.jsonResponse) {
      userSearchData.jsonResponse.map((user) => {
        if (!userAlreadyGetId.includes(user.userid)) {
          setUserAlreadyGetId((prevUserAlreadyGetId) => [
            ...prevUserAlreadyGetId,
            user.userid,
          ]);
        }

        let maxid = Math.min(...userAlreadyGetId);
        setMaxUserId(maxid);
      });

    }
  }, [userSearchData, userAlreadyGetId, userSearchData?.output]);

  useEffect(() => {
    if (searchDataResponse) {
      setSearchUserData(searchDataResponse)
      searchDataResponse?.jsonResponse && setAllUserData(searchDataResponse?.jsonResponse)
    }
  }, [searchDataResponse])


  const loadMoreHandler = () => {
    setLoading(true)
    if (previousSearchPayload) {
      const updatedPayload = {
        ...previousSearchPayload,
        maxUserId: String(maxUserId),
        excludedUsers: JSON.stringify(userAlreadyGetId)
      }
      dispatch(searchByDataReq(updatedPayload));
      setLoading(false)
    }
  }

  userSearchData && console.log(userSearchData?.output, +previousSearchPayload?.limit);

  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
          <h3>Search Results </h3>
        </Container>
        <div className={classes.card_container}>
          {allUserData != null && allUserData && allUserData?.map((user) => {
            return (
              <ProfileCard userData={user} userID={userId} key={user.userid + user.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={block} updateShortListedUser={() => { }} setSendInterest={setSendInterest} setBlock={() => { }} />
            )
          })}
        </div>
        {userSearchData && userSearchData?.output >= +previousSearchPayload?.limit &&
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
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default SearchResult