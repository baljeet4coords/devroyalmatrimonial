import React, { FC, useEffect, useState } from 'react'
import classes from "./TestProfileCard.module.scss";
import { MdBlock, MdLocationOn, MdStars } from 'react-icons/md';
import { GiBodyHeight, GiBriefcase, GiCottonFlower, GiGraduateCap, GiLovers, GiSpellBook } from 'react-icons/gi';
import { BiCalendar, BiHeartCircle } from 'react-icons/bi';
import { Button, Image, Spinner } from 'react-bootstrap';
import { IMatchMakingResponse } from '../../types/matchmaking/matchmaking';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// import { useSelector } from 'react-redux';
// import { getUserId } from '../../ducks/auth/selectors';
import { useSendInterest } from '../../hooks/useSendInterest/useSendInterest';
import { useBlockUser } from '../../hooks/useBlockUser/useBlockUser';
import { useShortlist } from '../../hooks/useSortlisted/useShortlist';
import { MaritalStatus, Occupation, Religion } from '../../types/enums';
import { CastListArray } from '../../constants/CastListArray';

interface MyComponentProps {
    userMatchData: IMatchMakingResponse[] | null | undefined;
    userID: number;
}

const TestProfileCard: FC<MyComponentProps> = ({ userMatchData, userID }) => {
    const [Shortlisted, setShortlisted] = useState<number[]>([]);
    const [sendInterest, setSendInterest] = useState<number[]>([]);
    const [block, setBlock] = useState<number[]>([]);
    const { useSendInterestMutation, SendInterestQuery } = useSendInterest();
    const { useShortlistMutation, ShortlistQuery } = useShortlist();
    const { useBlockUserMutation, BlockUserQuery } = useBlockUser();
    // const userId = useSelector(getUserId);
    const dateNow = new Date();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const nowYear = dateNow.getFullYear();


    // to get height inn feet cm 
    function HeightConvertr(cmHeight: number) {
        const totalInches = cmHeight / 2.54;
        const feet = Math.floor(totalInches / 12).toString();
        const remainingInches = (totalInches % 12).toFixed(0);
        return `${feet} ' ${remainingInches} ft`;
    }


    //to get value by key 
    function getKeyByValue(value: string, enumObject: any) {
        for (const [key, val] of Object.entries(enumObject)) {
            if (val === value) {
                return key.replaceAll("_", " ");
            }
        }
    }

    //to get cast
    function castGet(idd: number) {
        const castname = CastListArray.map((cast) => {
            if (cast.id === String(idd)) {
                return cast.caste;
            }
        });

        return castname;
    }




    const handleSortlisted = async (id: number) => {
        const mutationResult = await useShortlistMutation.mutateAsync({
            userId: userID,
            useridShortlist: id,
            status: !Shortlisted.includes(id) ? 'Y' : 'N'
        });
        if (mutationResult?.output && mutationResult?.output > 0) {
            if (!Shortlisted.includes(id)) {
                setShortlisted((pre) => [...pre, id])
            } else {
                setShortlisted(Shortlisted.filter((userid) => {
                    userid != id
                }))
            }
        } else {
            alert('failed to shortlist user !!!')
        }
    }


    const handleSendInterest = async (id: number) => {
        const mutationResult = await useSendInterestMutation.mutateAsync({
            fromUserid: userID,
            toUserid: id,
            status: !sendInterest.includes(id) ? 'S' : 'C'
        });
        if (mutationResult?.output && mutationResult?.output > 0) {
            if (!sendInterest.includes(id)) {
                setSendInterest((pre) => [...pre, id])
            } else {
                setSendInterest(sendInterest.filter((userid) => {
                    userid != id
                }))
            }
        } else {
            alert('interest not send')
        }
    }


    const handleBlock = async (id: number) => {
        const mutationResult = await useBlockUserMutation.mutateAsync({
            userId: userID,
            userIdToBlock: id,
            status: !block.includes(id) ? 'Y' : 'N'
        });
        if (mutationResult?.output && mutationResult?.output > 0) {
            if (!block.includes(id)) {
                setBlock((pre) => [...pre, id])
            } else {
                setBlock(block.filter((userid) => {
                    userid != id
                }))
            }
        } else {
            alert('Failed to Block user !!!')
        }
    }

    const convertFrom24To12Format = (time24: any) => {
        const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const period = +sHours < 12 ? 'am' : 'pm';
        const hours = +sHours % 12 || 12;

        return `${hours}:${minutes} ${period}`;
    }

    return (
        <>
            {userMatchData && userMatchData.map((user) => {
                const ull = user.user_last_login && user?.user_last_login.split("-");
                const getUserLastTimeLogin = ull && ull[2].split(' ')[1].split(':');
                const ullYear = ull && ull[0];
                let ullMonth = ull && ull[1];
                const ullDay = ull && ull[2].split(" ")[0];
                // if (Number(dobmonth) < 10) {
                //     dobmonth = dobmonth?.split("0")[1];
                // }
                return (<div className={classes.CardMain} key={user.userid + user.user_RM_ID}>
                    <div className={classes.profileSection}>
                        <Image className={classes.profile_Photo} src={`https://beta.royalmatrimonial.com/api/${user.photo}`} alt='userName' />
                        <div className={classes.profiler_Name}>

                            <h5 className={classes.name_Heading}>{user.fullname.length > 16 ? (user.fullname).toLocaleLowerCase().substring(0, 15).concat('...') : user.fullname.toLocaleLowerCase()} </h5>
                            <div>
                                <h5 className={classes.active_Status}>Active on :</h5>
                                <h5 className={classes.active_Status}>{ullYear ? <span>{`${ullDay}-${months[Number(ullMonth) - 1]}-${ullYear} `} at {getUserLastTimeLogin ? convertFrom24To12Format(`${getUserLastTimeLogin[0]}:${getUserLastTimeLogin[1]}`) : 'Na'}</span> : <span>Na :Na at Na</span> } </h5>
                            </div>
                        </div>
                    </div>
                    <div className={classes.infoSection}>
                        <div className={classes.info_Header}>
                            <h5 className={classes.name_Heading}>Basic Details</h5>
                            <p className={classes.id_Heading}>
                                #<span>{user.user_RM_ID}</span>
                            </p>
                        </div>
                        <hr className="dotted" />
                        <div className={classes.info_Details}>
                            <div className={classes.info_Tag_Section}>
                                <div className={classes.info_Tag}>
                                    <div>
                                        <GiBodyHeight />
                                    </div>
                                    {/* <p>5ft 11in -157cms</p> */}
                                    <p>{HeightConvertr(user.height_cm) || "NA"} - {user.height_cm}cms</p>
                                </div>
                                <div className={classes.info_Tag}>
                                    <div>
                                        <BiCalendar />
                                    </div>
                                    {/* <p>23 Yrs</p> */}
                                    <p>{user.dob ? nowYear - Number(user.dob.split("-")[0]) : 'Na'} Yrs</p>
                                </div>
                                <div className={classes.info_Tag}>
                                    <div>
                                        <MdLocationOn />
                                    </div>
                                    <p>New Delhi</p>
                                </div>
                                <div className={classes.info_Tag}>
                                    <div>
                                        <GiSpellBook />
                                    </div>
                                    <p>{getKeyByValue(String(user?.religion), Religion) ||
                                        "NA"}</p>
                                </div>
                                <div className={classes.info_Tag}>
                                    <div>
                                        <GiCottonFlower />
                                    </div>
                                    <p>{castGet(user?.caste) || "NA"}</p>
                                </div>
                                <div className={classes.info_Tag}>
                                    <div>
                                        <GiGraduateCap />
                                    </div>
                                    <p>MS Engineering</p>
                                </div>
                                <div className={classes.info_Tag}>
                                    <div>
                                        <GiBriefcase />
                                    </div>
                                    <p>{getKeyByValue(String(user?.occupation), Occupation) ||
                                        "NA"}</p>
                                </div>
                                <div className={classes.info_Tag}>
                                    <div>
                                        <GiLovers />
                                    </div>
                                    <p>{getKeyByValue(String(user?.marital_status), MaritalStatus) ||
                                        "NA"}</p>
                                </div>
                            </div>

                            <div className={classes.mySelf}>
                                <p>
                                    <span>
                                        MySelf : {' '}
                                    </span>
                                    I You Can Copy And Paste The Essay Or Do My Best To Assist You.Id Be Happy To Help You With Your Friends Essay. However, Please Note You.Id Be Happy To Help  An AI Language Model....
                                </p>
                            </div>

                            <div className={classes.card_Button_Wrapper}>
                                <div className={classes.button_section}>
                                    <Button onClick={() => handleSendInterest(user.userid)} className={sendInterest.includes(user.userid) ? classes.activebtn : ''}>
                                        <BiHeartCircle className={sendInterest.includes(user.userid) ? classes.activesvg : ''} />
                                        {sendInterest.includes(user.userid) ? 'Intrest Send' : 'Send Intrest'}
                                    </Button>
                                    <Button className={Shortlisted.includes(user.userid) ? classes.activebtn : ''} onClick={() => handleSortlisted(user.userid)}>
                                        <MdStars className={Shortlisted.includes(user.userid) ? classes.activesvg : ''} />
                                        {Shortlisted.includes(user.userid) ? 'Shortlisted' : 'Shortlist'}
                                    </Button>
                                    <Button className={block.includes(user.userid) ? classes.activebtn : ''} onClick={() => handleBlock(user.userid)}>

                                        <MdBlock className={block.includes(user.userid) ? classes.activesvg : ''} />
                                        {block.includes(user.userid) ? 'Blocked' : 'Block'}
                                    </Button>
                                </div>
                                <div className={classes.profileMatchSection}>
                                    <Image className={classes.profileMatch} src='Images/matchProfile2.svg' alt='profile Match' />
                                    <span>87 %</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            })}
            {/* {userMatchData?.map((i) => i.fullname)} */}
        </>
    )
}

export default TestProfileCard