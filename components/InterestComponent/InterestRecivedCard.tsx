import React, { useEffect, useState } from "react";
import classes from "./InterestRecivedCard.module.scss";
import { Button, Image, Table } from "react-bootstrap";
import { ICardViewResponseInterest } from "../../types/short-Block-Interest";
import { MdBlock, MdCancel } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";

interface ShowInterestProps {
    key: string;
    userId?: number;
    data: ICardViewResponseInterest;
}


const InterestRecivedCard: React.FC<ShowInterestProps> = ({ key, userId, data }) => {

    const [btn, setbtn] = useState(false);
    const dateNow = new Date();
    const nowYear = dateNow.getFullYear();


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

                <Table borderless responsive="sm" style={{margin:'0px'}} >
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{data.usercard.fullname}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>{data?.usercard?.dob ? nowYear - Number(data?.usercard?.dob.split("-")[0]) : 'Na'} Yrs</td>
                        </tr>
                    </tbody>
                </Table>



                <div className={classes.InterestBtnGroup}>
                    <Button className={classes.acceptBtn} onClick={() => setbtn(true)}>
                        <IoMdPersonAdd />
                        {!btn ? 'Accept Interest' : 'Interest Accepted'}
                    </Button>
                    <Button className={classes.declineBtn} onClick={() => setbtn(true)}>
                        <MdCancel />
                        {!btn ? 'Decline Interest' : 'Interest Declined'}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default InterestRecivedCard;
