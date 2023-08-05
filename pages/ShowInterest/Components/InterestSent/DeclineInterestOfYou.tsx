import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "../Interest.module.scss";
import { ICardViewResponse, ICardViewResponseInterest } from "../../../../types/short-Block-Interest";
import ShortVisitorProfile from "../../../../components/ShortVisitorProfile";
import ProfileCard from "../../../../components/ProfileCard/ProfileCard";
import PageHeading from "../../../../components/PageHeading";

interface ComponentsProps {
    key: number;
    userId?: number;
    BlockedUser: number[];
    data: ICardViewResponseInterest[] | null;
    handleBlockedUser: (id: number) => void;
}


const DeclineInterestOfYou: React.FC<ComponentsProps> = ({ key, data, userId, BlockedUser, handleBlockedUser }) => {
    const [DeclineInterestUser, setDeclineInterestUser] = useState<ICardViewResponseInterest[] | null>(data);

    const [sendInterest, setSendInterest] = useState<number[]>([]);


    useEffect(() => {
        const AcceptedData = data && data?.filter((user) => {
            if (user?.status === 'S'
                && user?.usercard?.interest?.Receive === 'D')
                return user
        })
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
            {!DeclineInterestUser || DeclineInterestUser.length < 1 ?
                <div className={classes.componentMain}>
                    <ShortVisitorProfile title="0 Interest Decline" subtitle="People you Reject Interest will appear here" image="/Images/Reject_interest.svg " />
                </div>
                :
                <>
                    <PageHeading heading="Your Interest Has Been Decline By These Profiles !! !!" />
                    <div className={classes.card_container}>
                        {DeclineInterestUser && DeclineInterestUser.map((user) => {
                            if (user.usercard) {
                                return (
                                    <ProfileCard userData={user?.usercard} userID={userId || 0} key={user?.userid + user?.usercard?.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={BlockedUser} setBlock={handleBlockedUser} setSendInterest={setSendInterest} updateBlockListedUser={updateShortListedUser} />
                                )
                            }
                        })}
                    </div>
                </>
            }
        </React.Fragment>
    );
};

export default DeclineInterestOfYou;
