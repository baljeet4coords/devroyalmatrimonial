import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "./Interest.module.scss";
import { ICardViewResponse, ICardViewResponseInterest } from "../../../types/short-Block-Interest";
import ShortVisitorProfile from "../../../components/ShortVisitorProfile";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";

interface ShowInterestProps {
    key: number;
    userId?: number;
    data: ICardViewResponseInterest[] | null;
}


const DeclineInterest: React.FC<ShowInterestProps> = ({ key, data, userId }) => {
    const [DeclineInterestUser, setDeclineInterestUser] = useState<ICardViewResponseInterest[] | null>(data);

    const [sendInterest, setSendInterest] = useState<number[]>([]);
    const [block, setBlock] = useState<number[]>([]);


    useEffect(() => {
        const AcceptedData = data && data?.filter((user) => { if (user.status === 'S' && user.usercard.interest.Send === 'C') return user })
        setDeclineInterestUser(AcceptedData);
    }, [data])



    const updateShortListedUser = (id: number) => {

        // const updatedShotListedID = Shortlisted_Id.filter((shotListedID) => {
        //     return shotListedID != id;
        // })
        // setShortlisted_Id(updatedShotListedID);

    }

    return (
        <React.Fragment key={key}>
            {!DeclineInterestUser ?
                <ShortVisitorProfile title="0 Interest Decline" subtitle="People you Reject Interest will appear here" image="./Images/Reject_interest.svg " />
                :
                <div className={classes.card_container}>
                    {DeclineInterestUser && DeclineInterestUser.map((user) => {
                        return (
                            <ProfileCard userData={user?.usercard} userID={userId || 0} key={user.userid + user?.usercard?.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={[]} setSendInterest={setSendInterest} setBlock={setBlock} updateBlockListedUser={updateShortListedUser} />
                        )
                    })}
                </div>
            }
        </React.Fragment>
    );
};

export default DeclineInterest;
