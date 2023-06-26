import React, { FC, useEffect, useState } from 'react'
import classes from "./ProfileCard.module.scss";
import { MdBlock, MdLocationOn, MdStars } from 'react-icons/md';
import { GiBodyHeight, GiBriefcase, GiCottonFlower, GiGraduateCap, GiLovers, GiSpellBook } from 'react-icons/gi';
import { BiCalendar, BiHeartCircle } from 'react-icons/bi';
import { Button, Image } from 'react-bootstrap';
import { IMatchMakingResponse } from '../../types/matchmaking/matchmaking';
import { useSendInterest } from '../../hooks/useSendInterest/useSendInterest';
import { useBlockUser } from '../../hooks/useBlockUser/useBlockUser';
import { useShortlist } from '../../hooks/useSortlisted/useShortlist';
import { EducationTypeAndVal, MaritalStatus, Occupation, Religion } from '../../types/enums';
import { CastListArray } from '../../constants/CastListArray';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { matchMakingSuccess } from '../../ducks/matchMaking/actions';
import { City, Country, ICity, ICountry, IState, State } from 'country-state-city';

interface MyComponentProps {
    userData: IMatchMakingResponse;
    userID: number;
    key: string;
    ShortlistedUser: number[];
    SendInterestUser: number[];
    BlockedUser: number[];
    setShortlisted: (val: number[]) => void;
    setSendInterest: (val: number[]) => void;
    setBlock: (val: number[]) => void;
}

const TestProfileCard: FC<MyComponentProps> = ({ userData, userID, key, ShortlistedUser, SendInterestUser, BlockedUser, setShortlisted, setSendInterest, setBlock }) => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { useSendInterestMutation, SendInterestQuery } = useSendInterest();
    const { useShortlistMutation, ShortlistQuery } = useShortlist();
    const { useBlockUserMutation, BlockUserQuery } = useBlockUser();



    const countries: ICountry[] = Country.getAllCountries();
    const [countryCode, setCountryCode] = useState<string>(
        countries[userData?.country].isoCode
    );

    useEffect(() => {
        if (countries[0].name === "Does Not Matter") {
            countries.shift();
        }
    }, []);

    const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
    const [stateCode, setStateCode] = useState<string>(
        stateOfCountry[userData?.state]?.isoCode
    );
    const cityOfState: ICity[] = City.getCitiesOfState(countryCode, stateCode);


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
            status: !userData.shortlist ? 'Y' : 'N'
        });
        dispatch(matchMakingSuccess(mutationResult));
    }


    const handleSendInterest = async (id: number) => {
        const mutationResult = await useSendInterestMutation.mutateAsync({
            fromUserid: userID,
            toUserid: id,
            status: !SendInterestUser.includes(id) ? 'S' : 'C'
        });
        if (mutationResult?.output && mutationResult?.output > 0) {
            if (!SendInterestUser.includes(id)) {
                setSendInterest((pre: number[]) => [...pre, id])
            } else {
                setSendInterest(SendInterestUser.filter((userid) => {
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
            status: !BlockedUser.includes(id) ? 'Y' : 'N'
        });
        if (mutationResult?.output && mutationResult?.output > 0) {
            if (!BlockedUser.includes(id)) {
                setBlock((pre) => [...pre, id])
            } else {
                setBlock(BlockedUser.filter((userid) => {
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



    function getCity() {
        return `${cityOfState[userData?.city]?.name} , ${stateOfCountry[userData.state]?.isoCode} , ${countries[userData.country]?.isoCode}` ;
    }


    const ull = userData.user_last_login && userData?.user_last_login.split("-");
    const getUserLastTimeLogin = ull && ull[2].split(' ')[1].split(':');
    const ullYear = ull && ull[0];
    let ullMonth = ull && ull[1];
    const ullDay = ull && ull[2].split(" ")[0];

    return (
        <>
            <div className={classes.CardMain} key={key}  >
                < div className={classes.profileSection} onClick={(e) => { e?.preventDefault(), router.push(`/PartnerMatchProfile?uid=${userData.userid + userData.user_RM_ID}`) }}>
                    <Image className={classes.profile_Photo} src={`https://beta.royalmatrimonial.com/api/${userData.photo}`} alt='userName' />
                    <div className={classes.profiler_Name}>

                        <h5 className={classes.name_Heading}>{userData.fullname.length > 16 ? (userData.fullname).toLocaleLowerCase().substring(0, 15).concat('...') : userData.fullname.toLocaleLowerCase()} </h5>
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
                            #<span>{userData.user_RM_ID}</span>
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
                                <p>{HeightConvertr(userData.height_cm) || "NA"} - {userData.height_cm}cms</p>
                            </div>
                            <div className={classes.info_Tag}>
                                <div>
                                    <BiCalendar />
                                </div>
                                {/* <p>23 Yrs</p> */}
                                <p>{userData.dob ? nowYear - Number(userData.dob.split("-")[0]) : 'Na'} Yrs</p>
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
                            <div className={classes.button_section}>
                                <Button onClick={() => handleSendInterest(userData.userid)} className={SendInterestUser.includes(userData.userid) ? classes.activebtn : ''}>
                                    <BiHeartCircle className={SendInterestUser.includes(userData.userid) ? classes.activesvg : ''} />
                                    {SendInterestUser.includes(userData.userid) ? 'Intrest Send' : 'Send Intrest'}
                                </Button>
                                <Button className={userData.shortlist ? classes.activebtn : ''} onClick={() => handleSortlisted(userData.userid)}>
                                    <MdStars className={userData.shortlist ? classes.activesvg : ''} />
                                    {userData.shortlist ? 'Shortlisted' : 'Shortlist'}
                                </Button>
                                <Button className={BlockedUser.includes(userData.userid) ? classes.activebtn : ''} onClick={() => handleBlock(userData.userid)}>

                                    <MdBlock className={BlockedUser.includes(userData.userid) ? classes.activesvg : ''} />
                                    {BlockedUser.includes(userData.userid) ? 'Blocked' : 'Block'}
                                </Button>
                            </div>
                            <div className={classes.profileMatchSection}>
                                <Image className={classes.profileMatch} src='Images/matchProfile2.svg' alt='profile Match' />
                                <span>{(userData.matching_score * 100 / 21).toFixed(1)} %</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default TestProfileCard