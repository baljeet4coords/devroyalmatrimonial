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

    const DataOnclick = (searchtype: number) => {
        return setInterestPage(searchtype);
    };


    const Components = [
        {
            Component: <ReciveInterest key={3} data={data} userId={userId} handleUpdateds={handleUpdateds} BlockedUser={BlockedUser} handleBlockedUser={handleBlockedUser}  />,
            key: 1,
        },
        {
            Component: <AcceptedInterest key={2} data={data} userId={userId} BlockedUser={BlockedUser} handleBlockedUser={handleBlockedUser} handleUpdateds={handleUpdateds}  />,
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
