import React, { use, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./Interest.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserId } from "../../../ducks/auth/selectors";
import { selectshortListSuccess } from "../../../ducks/userShortList/selectors";
import { shortListReq } from "../../../ducks/userShortList/actions";
import { ICardViewResponse, ICardViewResponseInterest } from "../../../types/short-Block-Interest";
import ShortVisitorProfile from "../../../components/ShortVisitorProfile";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import InterestRecivedCard from "../../../components/InterestComponent/InterestRecivedCard";

interface ShowInterestProps {
    key: number;
    userId?: number;
    data: ICardViewResponseInterest[] | null;
}


const ReciveInterest: React.FC<ShowInterestProps> = ({ key, data, userId }) => {
    const [reciveInterestUser, setReciveInterestUser] = useState<ICardViewResponseInterest[] | null>(data);

    const [sendInterest, setSendInterest] = useState<number[]>([]);
    const [block, setBlock] = useState<number[]>([]);

    useEffect(() => {
        const cancleData = data && data?.filter((user) => { if (user.status === 'S' && user.usercard.interest.Send === null) return user })
        setReciveInterestUser(cancleData);
    }, [data])



    const updateShortListedUser = (id: number) => {

        // const updatedShotListedID = Shortlisted_Id.filter((shotListedID) => {
        //     return shotListedID != id;
        // })
        // setShortlisted_Id(updatedShotListedID);

    }

    return (
        <React.Fragment key={key}>
            {!reciveInterestUser || reciveInterestUser.length < 1 ?
                <ShortVisitorProfile title="0 Interst Recive " subtitle="People Who Sent you Interest will appear here" image="./Images/interest_recive.svg" />
                :
                <div className={classes.card_container_main}>
                    {reciveInterestUser && reciveInterestUser.map((user) => {
                        return (
                            // <ProfileCard userData={user?.usercard} userID={userId || 0} key={user.userid + user?.usercard?.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={[]} setSendInterest={setSendInterest} setBlock={setBlock} updateBlockListedUser={updateShortListedUser} />
                            <InterestRecivedCard userId={user.userid} key={user?.userid + user?.usercard?.user_RM_ID} data={user} />
                        )
                    })}
                </div>
            }
        </React.Fragment>
    );
};

export default ReciveInterest;
