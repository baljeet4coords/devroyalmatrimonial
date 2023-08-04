import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "../Interest.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserId } from "../../../../ducks/auth/selectors";
import { selectshortListSuccess } from "../../../../ducks/userShortList/selectors";
import { shortListReq } from "../../../../ducks/userShortList/actions";
import { ICardViewResponse, ICardViewResponseInterest } from "../../../../types/short-Block-Interest";
import ShortVisitorProfile from "../../../../components/ShortVisitorProfile";
import ProfileCard from "../../../../components/ProfileCard/ProfileCard";
import PageHeading from "../../../../components/PageHeading";

interface ShowInterestProps {
    key: number;
    userId?: number;
    data: ICardViewResponseInterest[] | null;
    handleUpdateds: (id: number) => void;
    handleBlockedUser: (val: number) => void;
    BlockedUser: number[];
}


const SendInterest: React.FC<ShowInterestProps> = ({ key, data, userId, handleUpdateds, BlockedUser, handleBlockedUser }) => {
    const [sentInterestUser, setSentInterestUser] = useState<ICardViewResponseInterest[] | null>(data);

    const [sendInterest, setSendInterest] = useState<number[]>([]);

    useEffect(() => {
        const cancleData = data && data?.filter((user) => {
            if (user.status === 'S'
                && user?.usercard?.interest?.Send === "S"
                && user?.usercard?.interest?.Receive != "A"
                && user?.usercard?.interest?.Receive != "D")
                return user
        })
        setSentInterestUser(cancleData);
    }, [data])



    const updateShortListedUser = (id: number) => {

        // const updatedShotListedID = Shortlisted_Id.filter((shotListedID) => {
        //     return shotListedID != id;
        // })
        // setShortlisted_Id(updatedShotListedID);

    }

    return (
        <React.Fragment key={key}>
            {!sentInterestUser || sentInterestUser.length < 1 ?
                <div className={classes.componentMain}>
                    <ShortVisitorProfile title="0 Sent Interest " subtitle="People you Send Interest will appear here" />
                </div>

                :
                // <div className={classes.card_container_main}>
                <>
                    <PageHeading heading=" you have sent interest to these profile !!" />

                    {sentInterestUser && sentInterestUser.map((user) => {
                        if (user.usercard) {
                            return (
                                <ProfileCard userData={user?.usercard} userID={userId || 0} key={user?.userid + user?.usercard?.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={BlockedUser} setBlock={handleBlockedUser} setSendInterest={setSendInterest} updateBlockListedUser={updateShortListedUser} handleUpdateds={handleUpdateds} />
                            )
                        }
                    })}
                </>
                // </div>
            }
        </React.Fragment>
    );
};

export default SendInterest;
