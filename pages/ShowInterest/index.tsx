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
import { selectshortListSuccess } from "../../ducks/userShortList/selectors";
import { ICardViewResponse, ICardViewResponseInterest } from "../../types/short-Block-Interest";
import { blockListReq } from "../../ducks/userBlocklist/actions";
import { selectblockListSuccess } from "../../ducks/userBlocklist/selectors";
import { read } from "fs";
import SendInterest from "./Components/SendInterest";
import { showInterestReq, showInterestSuccess } from "../../ducks/showInterest/actions";
import { selectshowInterestSuccess } from "../../ducks/showInterest/selectors";
import CancleInterest from "./Components/CancleInterest";
import ReciveInterest from "./Components/ReciveInterest";
import AcceptedInterest from "./Components/AcceptedInterest";
import DeclineInterest from "./Components/DeclineInterest";

const ShowInterest: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const showInterestSuccessResponse = useSelector(selectshowInterestSuccess)
  const [sentInterest, setSentInterest] = useState<ICardViewResponseInterest[] | null>(showInterestSuccessResponse?.sentInterestCard ? showInterestSuccessResponse?.sentInterestCard.jsonResponse : []);
  const [reciveInterest, setReciveInterest] = useState<ICardViewResponseInterest[] | null>(showInterestSuccessResponse?.reciveInterestCard ? showInterestSuccessResponse?.reciveInterestCard.jsonResponse : []);
  const [interestPage, setInterestPage] = useState<number>(1);

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

  }, [showInterestSuccessResponse])

  useEffect(() => {
    dispatch(showInterestReq({
      userId: userId ? userId : -1,
    }));
  }, [userId, dispatch,])


  const Components = [
    {
      Component: <SendInterest key={1} data={sentInterest} userId={userId} />,
      key: 1,
    },
    {
      Component: <CancleInterest key={2} data={sentInterest} userId={userId} />,
      key: 2,
    },
    {
      Component:<ReciveInterest key={3} data={reciveInterest} userId={userId} />, 
      key: 3,
    },
    {
      Component: <AcceptedInterest key={4} data={reciveInterest} userId={userId} />,
      key: 4,
    },
    {
      Component: <DeclineInterest key={5} data={reciveInterest} userId={userId} />,
      key: 5,
    }
  ]

  const buttons = [
    {
      title: 'Send Interest',
      key: 1
    },
    {
      title: ' Cancel Interest',
      key: 2
    },
    {
      title: ' Receive Interest',
      key: 3
    },
    {
      title: 'Accepted Interest',
      key: 4
    },
    {
      title: 'Decline Interest',
      key: 5
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
                <button onClick={() => DataOnclick(button.key)} className={`${classes.TabButton} ${interestPage === button.key && classes.TabButtonActive} `}>
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
