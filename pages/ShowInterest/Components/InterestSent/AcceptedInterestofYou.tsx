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
    handleBlockedUser: (val: number) => void;
    data: ICardViewResponseInterest[] | null;
    handleUpdateds?: (id: number) => void;
}


const AcceptedInterestOFYou: React.FC<ComponentsProps> = ({ key, data, userId, BlockedUser, handleBlockedUser,handleUpdateds }) => {
    const [AcceptedInterestUser, setAcceptedInterestUser] = useState<ICardViewResponseInterest[] | null>(data);

    const [sendInterest, setSendInterest] = useState<number[]>([]);



    useEffect(() => {
        const AcceptedData = data && data?.filter((user) => {
            if (user?.status === 'S'
                && user?.usercard?.interest?.Receive === 'A')
                return user
        })
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
            {!AcceptedInterestUser || AcceptedInterestUser.length < 1 ?
                <div className={classes.componentMain}>
                    <ShortVisitorProfile title="0 Interest Accepted " subtitle="Interest that you Accept will appear here" image="/Images/accept_request.svg" />
                </div>
                :
                <>
                    <PageHeading heading="Your interest has been accepted by these profiles !!" />

                    <div className={classes.card_container}>
                        {AcceptedInterestUser && AcceptedInterestUser.map((user) => {
                            if (user.usercard) {
                                return (
                                    <ProfileCard userData={user?.usercard} userID={userId || 0} key={user?.userid + user?.usercard?.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={BlockedUser} setBlock={handleBlockedUser} setSendInterest={setSendInterest} updateBlockListedUser={updateShortListedUser} handleUpdateds={handleUpdateds} />
                                )
                            }
                        })}
                    </div>
                </>
            }
        </React.Fragment>
    );
};

export default AcceptedInterestOFYou;
