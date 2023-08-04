import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ShowInterest.module.scss";
import { Footer, LoginHeader } from "../../components";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { shortListReq } from "../../ducks/userShortList/actions";
import { useDispatch } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import { useSelector } from "react-redux";
import { ICardViewResponseInterest } from "../../types/short-Block-Interest";
import { blockListReq } from "../../ducks/userBlocklist/actions";
import { selectblockListSuccess } from "../../ducks/userBlocklist/selectors";
import SendInterest from "./Components/InterestSent/SendInterest";
import { showInterestReq } from "../../ducks/showInterest/actions";
import { selectshowInterestSuccess } from "../../ducks/showInterest/selectors";
import ReciveInterest from "./Components/InterestSent/ReciveInterest";
import AcceptedInterest from "./Components/InterestSent/AcceptedInterest";
import DeclineInterest from "./Components/InterestSent/DeclineInterest";
import { selectshortListSuccess } from "../../ducks/userShortList/selectors";
import InterestSentByYou from "./Components/InterestSentByYou";
import InterestReciveToYou from "./Components/InterestRecivedToYou";

const ShowInterest: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const showInterestSuccessResponse = useSelector(selectshowInterestSuccess)

  const blocklistSuccessResponse = useSelector(selectblockListSuccess)

  const shortlistSuccessResponse = useSelector(selectshortListSuccess)

  const [sentInterest, setSentInterest] = useState<ICardViewResponseInterest[] | null>(showInterestSuccessResponse?.sentInterestCard ? showInterestSuccessResponse?.sentInterestCard.jsonResponse : []);
  const [reciveInterest, setReciveInterest] = useState<ICardViewResponseInterest[] | null>(showInterestSuccessResponse?.reciveInterestCard ? showInterestSuccessResponse?.reciveInterestCard.jsonResponse : []);
  const [interestPage, setInterestPage] = useState<number>(1);
  const [Blocklisted_Id, setBlocklisted_Id] = useState<number[]>(blocklistSuccessResponse ? blocklistSuccessResponse?.blocklistedID?.jsonResponse : []);
  const [Shortlisted_Id, setShortlisted_Id] = useState<number[]>(shortlistSuccessResponse ? shortlistSuccessResponse?.shotlistedID?.jsonResponse : []);

  const DataOnclick = (searchtype: number) => {
    return setInterestPage(searchtype);
  };


  useEffect(() => {
    if (showInterestSuccessResponse?.sentInterestCard) {
      setSentInterest(showInterestSuccessResponse?.sentInterestCard.jsonResponse);
    }
    if (showInterestSuccessResponse?.reciveInterestCard) {
      setReciveInterest(showInterestSuccessResponse?.reciveInterestCard?.jsonResponse)
    }

    if (blocklistSuccessResponse) {
      setBlocklisted_Id(blocklistSuccessResponse?.blocklistedID?.jsonResponse)
    }
    if (shortlistSuccessResponse) {
      setShortlisted_Id(shortlistSuccessResponse?.shotlistedID?.jsonResponse)
    }

  }, [showInterestSuccessResponse, blocklistSuccessResponse, shortlistSuccessResponse])


  useEffect(() => {
    dispatch(showInterestReq({
      userId: userId ? userId : -1,
    }));
    dispatch(blockListReq({
      userId: userId ? userId : -1,
    }));

  }, [userId, dispatch,])




  const handleInterest = (id: number) => { 
       
    dispatch(showInterestReq({
      userId: userId ? userId : -1,
    }));
    dispatch(blockListReq({
      userId: userId ? userId : -1,
    }));
  }

  const handleBlockedUser = (id: number) => {
    if (Blocklisted_Id?.includes(id)) {
      const updatedBlocklist = Blocklisted_Id.filter((blocked_ID) => blocked_ID != id)

      setBlocklisted_Id(updatedBlocklist)
    } else {
      Blocklisted_Id && setBlocklisted_Id([...Blocklisted_Id, id])
    }
  }

  const Components = [
    {
      Component: <InterestSentByYou data={sentInterest} userId={userId} handleUpdateds={handleInterest} BlockedUser={Blocklisted_Id} handleBlockedUser={handleBlockedUser} />,
      key: 1,
    },
    {
      Component: <InterestReciveToYou data={reciveInterest} userId={userId} handleUpdateds={handleInterest} BlockedUser={Blocklisted_Id} handleBlockedUser={handleBlockedUser} />,
      key: 2,
    }
  ]

  const buttons = [
    {
      title: 'Interest Sent by you',
      key: 1
    },
    {
      title: ' Interest Received to you',
      key: 2
    }
  ]


  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>

        <div className={`${classes.search_main}`}>
          <Row className={`${classes.tabSection} row`}>
            {buttons.map((button) => {
              return <>
                <button onClick={() => DataOnclick(button.key)} className={`${classes.TabButton}
                 ${interestPage === button.key && classes.TabButtonActive} `}>
                  {button.title}
                </button>
              </>
            })
            }
          </Row>
        </div>

        {
          Components.map((component) => {
            if (component.key === interestPage) {
              return component.Component
            }
          })
        }

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ShowInterest;
