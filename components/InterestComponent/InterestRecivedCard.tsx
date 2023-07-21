import React, { FC, useEffect, useRef, useState } from 'react'
import classes from "./InterestRecivedCard.module.scss";
import { GiBodyHeight, GiBriefcase, GiCottonFlower, GiGraduateCap, GiLovers, GiSpellBook } from 'react-icons/gi';
import { BiCalendar, BiHeartCircle } from 'react-icons/bi';
import { Button, Image } from 'react-bootstrap';
import { EducationTypeAndVal, MaritalStatus, Occupation, Religion } from '../../types/enums';
import { CastListArray } from '../../constants/CastListArray';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { City, Country, ICity, ICountry, IState, State } from 'country-state-city';
import { ICardResponse } from '../../types/cardResponse/cardResponse';
import { useAcceptDecline } from '../../hooks/useAcceptDeclineInterest/useAcceptDeclineInterest';
import { MdCancel, MdLocationOn } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
interface MyComponentProps {
    userData: ICardResponse;
    userID?: number;
    key: string;
    handleUpdateds: (val: number) => void;
}

const InterestRecivedCard: FC<MyComponentProps> = ({ userData, userID, key, handleUpdateds }) => {
    const router = useRouter()
    const { useAcceptDeclineMutation, AcceptDeclineQuery } = useAcceptDecline();
    const dispatch = useDispatch();

    const blurredPhotoUrl = './Images/blured-img.webp';
    const imageRef = useRef<HTMLImageElement>(null);


    const countries: ICountry[] = Country.getAllCountries();
    const [btn, setbtn] = useState(false);
    const [countryCode, setCountryCode] = useState<string>(
        userData?.country ? countries[userData?.country - 1].isoCode : ''
    );

    useEffect(() => {
        if (countries[0].name === "Does Not Matter") {
            countries.shift();
        }
    }, []);


    const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
    const [stateCode, setStateCode] = useState<string>(
        stateOfCountry[userData?.state - 1]?.isoCode
    );
    // const cityOfState: ICity[] = City.getCitiesOfState(countryCode, stateCode);
    const allCitiesOfCountry: ICity[] = City.getCitiesOfCountry(countryCode) || [];

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



    const convertFrom24To12Format = (time24: any) => {
        const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const period = +sHours < 12 ? 'am' : 'pm';
        const hours = +sHours % 12 || 12;

        return `${hours}:${minutes} ${period}`;
    }



    function getCity() {
        return `${allCitiesOfCountry[userData?.city - 1]?.name} , ${stateOfCountry[userData?.state - 1]?.isoCode} , ${countries[userData?.country - 1]?.isoCode}`;
    }


    const ull = userData?.user_last_login && userData?.user_last_login.split("-");
    const getUserLastTimeLogin = ull && ull[2].split(' ')[1].split(':');
    const ullYear = ull && ull[0];
    let ullMonth = ull && ull[1];
    const ullDay = ull && ull[2].split(" ")[0];


    const reptNameHide = () => <>{userData?.fullname.slice(0, 3)}<span>{'*'.repeat(8)}</span></>;




    const handleInterestAcceptDecline = async (id: number) => {

        const mutationResult = await useAcceptDeclineMutation.mutateAsync({
            fromUserid: userID,
            toUserid: userData.userid,
            status: id === 1 ? 'A' : 'D'
        });
        if (mutationResult.output === 1) {
            handleUpdateds(1);
        }
    }



    return (
        <>
            <div className={classes.CardMain} key={key}  >

                < div className={classes.profileSection} onClick={(e) => { e?.preventDefault(), router.push(`/PartnerMatchProfile?uid=${userData?.userid + userData?.user_RM_ID}`) }}>
                    <Image className={`${classes.profile_Photo} `} src={userData?.privacy_photo === 'I' && userData?.interest?.Send != 'A' ? blurredPhotoUrl : `https://beta.royalmatrimonial.com/api/${userData?.photo}`} alt="Profile Photo" ref={imageRef} />
                    <div className={classes.profiler_Name}>

                        <h5 className={`${classes.name_Heading} `}>
                            {userData?.privacy_name === 'I' && userData?.interest?.Send != 'A'
                                ? reptNameHide()
                                : userData?.fullname.length > 16
                                    ? (userData?.fullname).toLocaleLowerCase().substring(0, 15).concat('...')
                                    : userData?.fullname.toLocaleLowerCase()
                            }
                        </h5>
                        <div>
                            <h5 className={classes.active_Status}>Active on :</h5>
                            <h5 className={classes.active_Status}>{ullYear ? <span>{`${ullDay}-${months[Number(ullMonth) - 1]}-${ullYear} `} at {getUserLastTimeLogin ? convertFrom24To12Format(`${getUserLastTimeLogin[0]}:${getUserLastTimeLogin[1]}`) : 'Na'}</span> : <span>Na :Na at Na</span>} </h5>
                        </div>
                    </div>
                </div >
                <div className={classes.infoSection}>
                    <div className={classes.info_Header}>
                        <h5 className={classes.name_Heading}>Basic Details</h5>
                        <p className={classes.id_Heading}>
                            #<span>{userData?.user_RM_ID}</span>
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
                                <p>{HeightConvertr(userData?.height_cm) || "NA"} - {userData?.height_cm}cms</p>
                            </div>
                            <div className={classes.info_Tag}>
                                <div>
                                    <BiCalendar />
                                </div>
                                <p>{userData?.dob ? nowYear - Number(userData?.dob.split("-")[0]) : 'Na'} Yrs</p>
                            </div>
                            <div className={classes.info_Tag}>
                                <div>
                                    <MdLocationOn />
                                </div>
                                <p>{getCity()}</p>
                            </div>
                            <div className={classes.info_Tag}>
                                <div>
                                    <GiSpellBook />
                                </div>
                                <p>{getKeyByValue(String(userData?.religion), Religion) ||
                                    "NA"}</p>
                            </div>
                            <div className={classes.info_Tag}>
                                <div>
                                    <GiCottonFlower />
                                </div>
                                <p>{castGet(userData?.caste) || "NA"}</p>
                            </div>
                            <div className={classes.info_Tag}>
                                <div>
                                    <GiGraduateCap />
                                </div>
                                <p>{getKeyByValue(String(userData?.education), EducationTypeAndVal) ||
                                    "NA"}</p>
                            </div>
                            <div className={classes.info_Tag}>
                                <div>
                                    <GiBriefcase />
                                </div>
                                <p>{getKeyByValue(String(userData?.occupation), Occupation) ||
                                    "NA"}</p>
                            </div>
                            <div className={classes.info_Tag}>
                                <div>
                                    <GiLovers />
                                </div>
                                <p>{getKeyByValue(String(userData?.marital_status), MaritalStatus) ||
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
                            <div className={classes.profileMatchSection}>
                                <Image className={classes.profileMatch} src='Images/matchProfile2.svg' alt='profile Match' />
                                <span>{(userData?.matching_score * 100 / 21).toFixed(1)} %</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}

export default InterestRecivedCard
