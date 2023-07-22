import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "./InerestSentRecive.module.scss";
import { Footer, LoginHeader } from "../../../components";
import { ICardViewResponseInterest } from "../../../types/short-Block-Interest";
import SendInterest from "./InterestSent/SendInterest";
import ReciveInterest from "./InterestSent/ReciveInterest";
import AcceptedInterest from "./InterestSent/AcceptedInterest";
import DeclineInterest from "./InterestSent/DeclineInterest";





interface InterestReciveToYouProps {
    userId?: number;
    data: ICardViewResponseInterest[] | null;
    handleUpdateds: (id: number) => void;
    handleBlockedUser: (val: number) => void;
    BlockedUser: number[];
}

const InterestReciveToYou: React.FC<InterestReciveToYouProps> = ({ data, userId, handleUpdateds, BlockedUser, handleBlockedUser }) => {
    const [interestPage, setInterestPage] = useState<number>(1);

    //   const [sentInterest, setSentInterest] = useState<ICardViewResponseInterest[] | null>(showInterestSuccessResponse?.sentInterestCard ? showInterestSuccessResponse?.sentInterestCard.jsonResponse : []);
    //   const [reciveInterest, setReciveInterest] = useState<ICardViewResponseInterest[] | null>(showInterestSuccessResponse?.reciveInterestCard ? showInterestSuccessResponse?.reciveInterestCard.jsonResponse : []);
    //   const [Blocklisted_Id, setBlocklisted_Id] = useState<number[]>(blocklistSuccessResponse ? blocklistSuccessResponse?.blocklistedID?.jsonResponse : []);
    //   const [Shortlisted_Id, setShortlisted_Id] = useState<number[]>(shortlistSuccessResponse ? shortlistSuccessResponse?.shotlistedID?.jsonResponse : []);

    const DataOnclick = (searchtype: number) => {
        return setInterestPage(searchtype);
    };


    //   useEffect(() => {
    //     if (showInterestSuccessResponse?.sentInterestCard) {
    //       setSentInterest(showInterestSuccessResponse?.sentInterestCard.jsonResponse);
    //     }
    //     if (showInterestSuccessResponse?.reciveInterestCard) {
    //       setReciveInterest(showInterestSuccessResponse?.reciveInterestCard?.jsonResponse)
    //     }

    //     if (blocklistSuccessResponse) {
    //       setBlocklisted_Id(blocklistSuccessResponse?.blocklistedID?.jsonResponse)
    //     }
    //     if (shortlistSuccessResponse) {
    //       setShortlisted_Id(shortlistSuccessResponse?.shotlistedID?.jsonResponse)
    //     }

    //   }, [showInterestSuccessResponse, blocklistSuccessResponse, shortlistSuccessResponse])


    //   useEffect(() => {
    //     dispatch(showInterestReq({
    //       userId: userId ? userId : -1,
    //     }));


    //     dispatch(blockListReq({
    //       userId: userId ? userId : -1,
    //     }));

    //   }, [userId, dispatch,])




    //   const handleInterest = (id: number) => {
    //     dispatch(showInterestReq({
    //       userId: userId ? userId : -1,
    //     }));
    //   }

    //   const handleBlockedUser = (id: number) => {
    //     if (Blocklisted_Id?.includes(id)) {
    //       const updatedBlocklist = Blocklisted_Id.filter((blocked_ID) => blocked_ID != id)

    //       setBlocklisted_Id(updatedBlocklist)
    //     } else {
    //       Blocklisted_Id && setBlocklisted_Id([...Blocklisted_Id, id])
    //     }
    //   }

    const Components = [
        {
            Component: <ReciveInterest key={3} data={data} userId={userId} handleUpdateds={() => { }} />,
            key: 1,
        },
        {
            Component: <AcceptedInterest key={2} data={data} userId={userId} BlockedUser={BlockedUser} handleBlockedUser={handleBlockedUser} />,
            key: 2,
        },
        {
            Component: <DeclineInterest key={2} data={data} userId={userId} BlockedUser={BlockedUser} handleBlockedUser={handleBlockedUser} />,
            key: 3,
        },
    ]

    const buttons = [
        {
            title: 'Interest Recived',
            key: 1
        },
        {
            title: ' Interest Accepted',
            key: 2
        },
        {
            title: ' Interest Declined',
            key: 3
        }
    ]





    return (
        <div className={classes.interestSentRecive}>
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
                <div className={classes.componentMain}>
                    {
                        Components.map((component) => {
                            if (component.key === interestPage) {
                                return component.Component
                            }
                        })
                    }

                </div>
            </div>
        </div>
    );
};

export default InterestReciveToYou;
