import React, { use, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "../Interest.module.scss";
import { ICardViewResponse, ICardViewResponseInterest } from "../../../../types/short-Block-Interest";
import ShortVisitorProfile from "../../../../components/ShortVisitorProfile";
import ProfileCard from "../../../../components/ProfileCard/ProfileCard";
import InterestRecivedCard from "../../../../components/InterestComponent/InterestRecivedCard";
import PageHeading from "../../../../components/PageHeading";

interface ShowInterestProps {
    key: number;
    userId?: number;
    data: ICardViewResponseInterest[] | null;
    handleUpdateds: (id: number) => void;
}


const ReciveInterest: React.FC<ShowInterestProps> = ({ key, data, userId, handleUpdateds }) => {
    const [reciveInterestUser, setReciveInterestUser] = useState<ICardViewResponseInterest[] | null>(data);

    const [sendInterest, setSendInterest] = useState<number[]>([]);
    const [block, setBlock] = useState<number[]>([]);

    useEffect(() => {
        const cancleData = data && data?.filter((user) => {
            if (user?.status === 'S'
                && user?.usercard?.interest?.Send === null)
                return user
        })
        setReciveInterestUser(cancleData);
    }, [data])


    return (
        <React.Fragment key={key}>
            {!reciveInterestUser || reciveInterestUser.length < 1 ?
                <div className={classes.componentMain}>
                    <ShortVisitorProfile title="0 Interst Recive " subtitle="People Who Sent you Interest will appear here" image="./Images/interest_recive.svg" />
                </div>
                :
                <>
                    <PageHeading heading="You have recived interest these profile !!" />
                    <div className={`${classes.card_container_main} ${classes.flexrowMar} `}>
                        {reciveInterestUser && reciveInterestUser.map((user) => {
                            return (
                                <InterestRecivedCard userID={userId} key={user?.userid + user?.usercard?.user_RM_ID} userData={user.usercard} handleUpdateds={handleUpdateds} />
                            )
                        })}
                    </div>
                </>
            }
        </React.Fragment>
    );
};

export default ReciveInterest;
