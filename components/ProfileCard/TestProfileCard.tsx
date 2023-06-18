import React, { FC, useEffect, useState } from 'react'
import classes from "./TestProfileCard.module.scss";
import { MdBlock, MdLocationOn, MdStars } from 'react-icons/md';
import { GiBodyHeight, GiBriefcase, GiCottonFlower, GiGraduateCap, GiLovers, GiSpellBook } from 'react-icons/gi';
import { BiCalendar, BiHeartCircle } from 'react-icons/bi';
import { Button, Image } from 'react-bootstrap';
import { IMatchMakingResponse } from '../../types/matchmaking/matchmaking';


interface MyComponentProps {
    userMatchData: IMatchMakingResponse[] | null;
}

const TestProfileCard: FC<MyComponentProps> = ({ userMatchData }) => {
    // const [MatchUserData, setMatchUserData] = useState(!Array.isArray(userMatchData) ? JSON.stringify(userMatchData) : userMatchData)
    const [Shortlisted, setShortlisted] = useState(false);
    const [block, setBlock] = useState(false);
    const [sendInterest, setSendInterest] = useState(false);

    useEffect(() => {
        if (!Array.isArray(userMatchData)) { JSON.stringify(userMatchData) }
    }, [userMatchData])

    console.log(userMatchData);

    return (
        <>
            {userMatchData && userMatchData.map((user) => {
                return <>
                    <div className={classes.CardMain} key={user.userid}>
                        <div className={classes.profileSection}>
                            <Image className={classes.profile_Photo} src={`https://beta.royalmatrimonial.com/api/${user.photo}`} alt='userName' />
                            <div className={classes.profiler_Name}>

                                <h5 className={classes.name_Heading}>{user.fullname}</h5>
                                <div>
                                    <h5 className={classes.active_Status}>Active on :</h5>
                                    <h5 className={classes.active_Status}> <span> 19-Feb-23 at 04:15pm</span></h5>
                                </div>
                            </div>
                        </div>
                        <div className={classes.infoSection}>
                            <div className={classes.info_Header}>
                                <h5 className={classes.name_Heading}>Basic Details</h5>
                                <p className={classes.id_Heading}>
                                    #<span>{user.userRMID}</span>
                                </p>
                            </div>
                            <hr className="dotted" />
                            <div className={classes.info_Details}>
                                <div className={classes.info_Tag_Section}>
                                    <div className={classes.info_Tag}>
                                        <div>
                                            <GiBodyHeight />
                                        </div>
                                        <p>5ft 11in -157cms</p>
                                    </div>
                                    <div className={classes.info_Tag}>
                                        <div>
                                            <BiCalendar />
                                        </div>
                                        <p>35 Yrs</p>
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
                                        <p>Buddhist</p>
                                    </div>
                                    <div className={classes.info_Tag}>
                                        <div>
                                            <GiCottonFlower />
                                        </div>
                                        <p>Hindu: Brahmin Chittpavan Kokanastha</p>
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
                                        <p>Civil Services</p>
                                    </div>
                                    <div className={classes.info_Tag}>
                                        <div>
                                            <GiLovers />
                                        </div>
                                        <p>Never Married</p>
                                    </div>
                                </div>

                                <div className={classes.mySelf}>
                                    <p>
                                        <span>
                                            MySelf : {' '}
                                        </span>
                                        I You Can Copy And Paste The Essay Or Provide The Specific Details, And Ll Do My Best To Assist You.Id Be Happy To Help You With Your Friends Essay. However, Please Note You.Id Be Happy To Help You With Your Friends Essay. However, Please Note That As An AI Language Model....
                                    </p>
                                </div>

                                <div className={classes.card_Button_Wrapper}>

                                    <Button onClick={() => setSendInterest(!sendInterest)} className={sendInterest ? classes.activebtn : ''}>
                                        <BiHeartCircle className={sendInterest ? classes.activesvg : ''} />
                                        {sendInterest ? 'Intrest Send' : 'Send Intrest'}
                                    </Button>
                                    <Button className={Shortlisted ? classes.activebtn : ''} onClick={() => setShortlisted(!Shortlisted)}>
                                        <MdStars className={Shortlisted ? classes.activesvg : ''} />
                                        {Shortlisted ? 'Shortlisted' : 'Shortlist'}
                                    </Button>
                                    <Button className={block ? classes.activebtn : ''} onClick={() => setBlock(!block)}>
                                        <MdBlock className={block ? classes.activesvg : ''} />
                                        {block ? 'Blocked' : 'Block'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            })}
            {/* {userMatchData?.map((i) => i.fullname)} */}
        </>
    )
}

export default TestProfileCard