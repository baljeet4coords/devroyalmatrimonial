import React from 'react'
import classes from "./TestProfileCard.module.scss";
import { CiCalendarDate } from 'react-icons/ci';
import { GoLocation } from 'react-icons/go';
import { MdBlock, MdLocationOn, MdStars } from 'react-icons/md';
import { GiBodyHeight, GiBriefcase, GiCottonFlower, GiGraduateCap, GiLovers, GiSpellBook } from 'react-icons/gi';
import { BsBagPlusFill } from 'react-icons/bs';
import { BiCalendar, BiHeartCircle } from 'react-icons/bi';
import { Button } from 'react-bootstrap';

const TestProfileCard = () => {
    return (
        <div className={classes.CardMain}>
            <div className={classes.profileSection}>
                <img className={classes.profile_Photo} src='http://localhost:3000/Images/profile_image.webp' alt='userphoto' />
                <h5 className={classes.name_Heading}>Sweta Singh</h5>
                <div>
                    <h5 className={classes.active_Status}>Active on :</h5>
                    <h5 className={classes.active_Status}> <span> 19-Feb-23 at 04:15pm</span></h5>
                </div>
            </div>
            <div className={classes.infoSection}>
                <div className={classes.info_Header}>
                    <h5 className={classes.name_Heading}>Basic Details</h5>
                    <p className={classes.id_Heading}>
                        #<span>WSYY4227</span>
                    </p>
                </div>
                <hr />

                <div className={classes.info_Details}>
                    <div className={classes.info_Tag_Section}>
                        <div className={classes.info_Tag}>
                            <GiBodyHeight />
                            <p>5ft 2in -157cms</p>
                        </div>
                        <div className={classes.info_Tag}>
                            <BiCalendar />
                            <p>35 Yrs</p>
                        </div>
                        <div className={classes.info_Tag}>
                            <MdLocationOn />
                            <p>New Delhi</p>
                        </div>
                        <div className={classes.info_Tag}>
                            <GiSpellBook />
                            <p>Hindu</p>
                        </div>
                        <div className={classes.info_Tag}>
                            <GiCottonFlower />
                            <p>Hindu: Arora</p>
                        </div>
                        <div className={classes.info_Tag}>
                            <GiGraduateCap />
                            <p>B.Sc</p>
                        </div>
                        <div className={classes.info_Tag}>
                            <GiBriefcase />
                            <p>Civil Services</p>
                        </div>
                        <div className={classes.info_Tag}>
                            <GiLovers />
                            <p>Never Married</p>
                        </div>
                    </div>

                    <div className={classes.mySelf}>
                        <p>
                            <span>
                                MySelf : {' '}
                            </span>
                            I You Can Copy And Paste The Essay Or Provide The Specific Details, And Ll Do My Best To Assist You.Id Be Happy To Help You With Your Friends Essay. However, Please Note You.Id Be Happy To Help You With Your Friends Essay. However, Please Note That As An AI Language Model.
                        </p>
                    </div>

                    <div className={classes.card_Button_Wrapper}>

                        <Button >
                            <BiHeartCircle />
                            Send Intrest
                        </Button>
                        <Button >
                            <MdStars />
                            Shortlist
                        </Button>
                        <Button >
                            <MdBlock />
                            Block
                        </Button>
                    </div>
                </div>
            </div>
            {/* <div className={classes.ActionSection}>

        </div> */}
        </div>
    )
}

export default TestProfileCard