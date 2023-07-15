import React, { useEffect, useState } from "react";
import classes from "./InterestRecivedCard.module.scss";
import { Button, Image, Table } from "react-bootstrap";
import { ICardViewResponseInterest } from "../../types/short-Block-Interest";
import { MdBlock, MdCancel } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { useAcceptDecline } from "../../hooks/useAcceptDeclineInterest/useAcceptDeclineInterest";

interface ShowInterestProps {
    key: string;
    userId?: number;
    data: ICardViewResponseInterest;
    handleUpdateds: (id: number) => void;
}


const InterestRecivedCard: React.FC<ShowInterestProps> = ({ key, userId, data,handleUpdateds }) => {

    const [btn, setbtn] = useState(false);
    const dateNow = new Date();
    const nowYear = dateNow.getFullYear();
    const { useAcceptDeclineMutation, AcceptDeclineQuery } = useAcceptDecline();

    const handleInterestAcceptDecline = async (id: number) => {

        const mutationResult = await useAcceptDeclineMutation.mutateAsync({
            fromUserid: userId,
            toUserid: data.userid,
            status: id === 1 ? 'A' : 'D'
        });
        if(mutationResult.output ===1){
            handleUpdateds(1);
        }
    }


    return (
        <>
            <div className={classes.card_container} key={key}>
                <Image className={`${classes.profile_Photo} `} src={`https://beta.royalmatrimonial.com/api/${data?.usercard?.photo}`} alt="Profile Photo" />

                {/* <div className={classes.profileInfoSec}>
                    <div className={classes.profile_Name}>
                        <h6>Name</h6>
                        <p>{data.usercard.fullname} </p>
                    </div>
                    <div className={classes.profile_Name}>
                        <h6>Age</h6>
                        <p>{data?.usercard?.dob ? nowYear - Number(data?.usercard?.dob.split("-")[0]) : 'Na'} Yrs</p>
                    </div>
                </div> */}

                <Table borderless responsive="sm" style={{ margin: '0px' }} >
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{data.usercard.fullname.toLowerCase()}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>{data?.usercard?.dob ? nowYear - Number(data?.usercard?.dob.split("-")[0]) : 'Na'} Yrs</td>
                        </tr>
                    </tbody>
                </Table>



                <div className={classes.InterestBtnGroup}>
                    <Button className={classes.acceptBtn} onClick={() => handleInterestAcceptDecline(1)}>
                        <IoMdPersonAdd />
                        {!btn ? 'Accept Interest' : 'Interest Accepted'}
                    </Button>
                    <Button className={classes.declineBtn} onClick={() => handleInterestAcceptDecline(2)}>
                        <MdCancel />
                        {!btn ? 'Decline Interest' : 'Interest Declined'}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default InterestRecivedCard;
