import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import classes from "../ProfileMatch/ProfileMatch.module.scss";
import { CustomButton, Footer, Header } from "../../components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectsearchByDataSuccess } from "../../ducks/searchByData/selectors";
import { ISearchByDataResponse } from "../../types/searchMatchmaking/searchMatchMaking";
import { searchByDataReq, searchByDataSuccess } from "../../ducks/searchByData/actions";
import { SearchByData } from "../../ducks/partnerPreferrence/types";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";
import { getUserId } from "../../ducks/auth/selectors";
import SearchProfileCard from "../../components/ProfileCard/SearchProfileCard";


const SearchResult: React.FC = () => {
  const router = useRouter();
  const { searchdata } = router.query;
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();
  const loginUserId = useSelector(getUserId);
  const searchDataResponse = useSelector(selectsearchByDataSuccess)

  let previousSearchPayload: SearchByData = {
    maxUserId: "",
    limit: "",
    viceVersaFlag: "",
    excludedUsers: ""
  };

  if (typeof searchdata === 'string') {
    previousSearchPayload = JSON.parse(searchdata);
  } else {
    previousSearchPayload = searchdata && searchdata.length > 0 ? JSON.parse(searchdata[0]) : {};
  }

  const [loading, setLoading] = useState(false);

  const [userSearchData, setSearchUserData] = useState(searchDataResponse)
  const [allUserData, setAllUserData] = useState<ISearchByDataResponse[]>(userSearchData?.jsonResponse || [])
  const [userAlreadyGetId, setUserAlreadyGetId] = useState<number[]>([]);
  const [maxUserId, setMaxUserId] = useState(-1);
  const [Shortlisted, setShortlisted] = useState<number[]>([]);
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [block, setBlock] = useState<number[]>([]);

  useEffect(() => {
    setSearchUserData(searchDataResponse)
    userSearchData?.jsonResponse && setAllUserData(userSearchData?.jsonResponse)
  }, [searchDataResponse, userSearchData])

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

  const handleBlockList_ID = (val: number) => {
    setBlock([...block, val])
  }


  const handleUpdatedsInterest = (id: number) => {
    const updatedSearchResult = allUserData.map((user) => {
      if (user.userid === id) {
        return {
          ...user,
          interest: {
            ...user.interest,
            Send: user.interest.Send != 'S' ? 'S' : 'C',
          },
        };
      }
      return user;
    });

    setTimeout(() => {
      setAllUserData(updatedSearchResult);
    }, 500);
  }


  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          {loginUserId ? <LoginHeader /> : <Header />}
          <h3>Search Results </h3>
        </Container>

        {allUserData && allUserData?.length < 1 ?
          < ShortVisitorProfile
            title={"No Search Result Found !!"}
            subtitle={"Search Data will apper here. "}
            image="/Images/search-not-found.png"
          />
          :
          <>
            <div className={classes.card_container}>
              {allUserData != null && allUserData && allUserData?.map((user) => {
                if (block != null && !block.includes(user.userid)) {
                  return (
                    <SearchProfileCard userData={user} userID={userId || 0} key={user.userid + user.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={block} setSendInterest={setSendInterest} setBlock={handleBlockList_ID} handleUpdateds={handleUpdatedsInterest} />
                  )
                }
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
          </>
        }
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default SearchResult