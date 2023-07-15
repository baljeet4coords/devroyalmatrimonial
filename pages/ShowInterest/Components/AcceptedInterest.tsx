import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "./Interest.module.scss";
import { ICardViewResponse, ICardViewResponseInterest } from "../../../types/short-Block-Interest";
import ShortVisitorProfile from "../../../components/ShortVisitorProfile";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";

interface ShowInterestProps {
    key: number;
    userId?: number;
    BlockedUser: number[];
    handleBlockedUser: (val: number) => void;
    data: ICardViewResponseInterest[] | null;
}


const AcceptedInterest: React.FC<ShowInterestProps> = ({ key, data, userId,BlockedUser,handleBlockedUser }) => {
    const [AcceptedInterestUser, setAcceptedInterestUser] = useState<ICardViewResponseInterest[] | null>(data);

    const [sendInterest, setSendInterest] = useState<number[]>([]);



    useEffect(() => {
        const AcceptedData = data && data?.filter((user) => { if (user.status === 'S' && user.usercard.interest.Send === 'A') return user })
        setAcceptedInterestUser(AcceptedData);
    }, [data])



    const updateShortListedUser = (id: number) => {

        // const updatedShotListedID = Shortlisted_Id.filter((shotListedID) => {
        //     return shotListedID != id;
        // })
        // setShortlisted_Id(updatedShotListedID);

    }

    return (
        <React.Fragment key={key}>
            {!AcceptedInterestUser || AcceptedInterestUser.length < 1  ?
                <ShortVisitorProfile title="0 Interest Accepted " subtitle="Interest that you Accept will appear here" image="./Images/accept_request.svg" />
                :
                <div className={classes.card_container}>
                    {AcceptedInterestUser && AcceptedInterestUser.map((user) => {
                        return (
                            <ProfileCard userData={user?.usercard} userID={userId || 0} key={user.userid + user?.usercard?.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={BlockedUser} setBlock={handleBlockedUser} setSendInterest={setSendInterest}  updateBlockListedUser={updateShortListedUser} />
                        )
                    })}
                </div>
            }
        </React.Fragment>
    );
};

export default AcceptedInterest;
