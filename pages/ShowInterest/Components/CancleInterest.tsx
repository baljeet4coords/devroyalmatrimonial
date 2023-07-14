import React, { useEffect, useState } from "react";
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

interface ShowInterestProps {
    key: number;
    userId?: number;
    data: ICardViewResponseInterest[] | null;
}


const CancleInterest: React.FC<ShowInterestProps> = ({ key, data, userId }) => {
    const [CancleInterestUser, setCancleInterestUser] = useState<ICardViewResponseInterest[] | null>(data);

    const [sendInterest, setSendInterest] = useState<number[]>([]);
    const [block, setBlock] = useState<number[]>([]);


    useEffect(() => {
        const cancleData = data && data?.filter((user) => { if (user.status === 'C') return user })
        setCancleInterestUser(cancleData);
    }, [data])



    const updateShortListedUser = (id: number) => {

        // const updatedShotListedID = Shortlisted_Id.filter((shotListedID) => {
        //     return shotListedID != id;
        // })
        // setShortlisted_Id(updatedShotListedID);

    }

    return (
        <React.Fragment key={key}>
            {!CancleInterestUser ?
                <ShortVisitorProfile title="0 Cancel Interest " subtitle="People you Cancel Interest will appear here" image="./Images/canel.png" />
                :
                <div className={classes.card_container}>
                    {CancleInterestUser && CancleInterestUser.map((user) => {
                        return (
                            <ProfileCard userData={user?.usercard} userID={userId || 0} key={user.userid + user?.usercard?.user_RM_ID} SendInterestUser={sendInterest} BlockedUser={[]} setSendInterest={setSendInterest} setBlock={setBlock} updateBlockListedUser={updateShortListedUser} />
                        )
                    })}
                </div>
            }
        </React.Fragment>
    );
};

export default CancleInterest;
