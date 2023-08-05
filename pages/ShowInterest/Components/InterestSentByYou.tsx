import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "./InerestSentRecive.module.scss";
import { Footer, LoginHeader } from "../../../components";
import { ICardViewResponseInterest } from "../../../types/short-Block-Interest";
import SendInterest from "./InterestSent/SendInterest";
import ReciveInterest from "./InterestSent/ReciveInterest";
import AcceptedInterestOFYou from "./InterestSent/AcceptedInterestofYou";
import DeclineInterestOfYou from "./InterestSent/DeclineInterestOfYou";





interface InterestSentByYouProps {
    userId?: number;
    data: ICardViewResponseInterest[] | null;
    handleUpdateds: (id: number) => void;
    handleBlockedUser: (val: number) => void;
    BlockedUser: number[];
    setSendInterest?: (val: number[]) => void;
    setBlock?: (val: number) => void;
    updateShortListedUser?: (val: number) => void;
    updateBlockListedUser?: (val: number) => void;
}

const InterestSentByYou: React.FC<InterestSentByYouProps> = ({ data, userId, handleUpdateds, BlockedUser, handleBlockedUser }) => {

    const [sentInterest, setSentInterest] = useState<ICardViewResponseInterest[] | null>(data || []);
    const [interestPage, setInterestPage] = useState<number>(1);
   
    const DataOnclick = (searchtype: number) => {
        return setInterestPage(searchtype);
    };


      useEffect(() => {
        if (data) {
          setSentInterest(data);
        }

      }, [data])


    const Components = [
        {
            Component: <SendInterest key={1} data={sentInterest} userId={userId} handleUpdateds={handleUpdateds} BlockedUser={BlockedUser} handleBlockedUser={handleBlockedUser} />,
            key: 1,
        },
        {
            Component: <AcceptedInterestOFYou key={2} data={sentInterest} userId={userId} handleUpdateds={handleUpdateds} BlockedUser={BlockedUser} handleBlockedUser={handleBlockedUser} />,
            key: 2,
        },
        {
            Component: <DeclineInterestOfYou key={2} data={sentInterest} userId={userId} BlockedUser={BlockedUser} handleBlockedUser={handleBlockedUser} />,
            key: 3,
        },
    ]

    const buttons = [
        {
            title: 'Interest Sent',
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
                {/* <div className={classes.componentMain}> */}
                    {
                        Components.map((component) => {
                            if (component.key === interestPage) {
                                return component.Component
                            }
                        })
                    }

                {/* </div> */}
            </div>
        </div>
    );
};

export default InterestSentByYou;
