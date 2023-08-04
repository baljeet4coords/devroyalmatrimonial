import React, { FC, useEffect, useRef, useState } from 'react'
import classes from "./ProfileCard.module.scss";
import { MdBlock, MdLocationOn, MdStars } from 'react-icons/md';
import { GiBodyHeight, GiBriefcase, GiCottonFlower, GiGraduateCap, GiLovers, GiSpellBook } from 'react-icons/gi';
import { BiCalendar, BiHeartCircle } from 'react-icons/bi';
import { Button, Image } from 'react-bootstrap';
import { useSendInterest } from '../../hooks/useSendInterest/useSendInterest';
import { useBlockUser } from '../../hooks/useBlockUser/useBlockUser';
import { useShortlist } from '../../hooks/useSortlisted/useShortlist';
import { EducationTypeAndVal, MaritalStatus, Occupation, Religion } from '../../types/enums';
import { CastListArray } from '../../constants/CastListArray';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { matchMakingSuccess } from '../../ducks/matchMaking/actions';
import { City, Country, ICity, ICountry, IState, State } from 'country-state-city';
import { ICardResponse } from '../../types/cardResponse/cardResponse';
import ConfirMationsPopup from '../ConfirmationsPopup';
import { searchByDataSuccess } from '../../ducks/searchByData/actions';

interface MyComponentProps {
    userData: ICardResponse;
    userID: number;
    key: string;
    SendInterestUser: number[];
    BlockedUser: number[];
    setSendInterest: (val: number[]) => void;
    setBlock?: (val: number) => void;
    handleUpdateds?: (val: number) => void;
}

const SearchProfileCard: FC<MyComponentProps> = ({ userData, userID, key, SendInterestUser, BlockedUser, setBlock, setSendInterest, handleUpdateds }) => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { useSendInterestMutation, SendInterestQuery } = useSendInterest();
    const { useShortlistMutation, ShortlistQuery } = useShortlist();
    const { useBlockUserMutation, BlockUserQuery } = useBlockUser();
    const [shortlistUser, setShortlistedUser] = useState(userData?.shortlist === 1 ? true : false);
    const [interestPopup, setInterestPopup] = useState<boolean>(false);
    const [blockPopup, setBlockPopup] = useState<boolean>(false);
    const [cardId, setCardId] = useState<number>(-1);
    const [loading, setLoading] = useState(false);


    const blurredPhotoUrl = '/Images/blured-img.webp';
    const matchProfile = '/Images/matchProfile2.svg';

    const imageRef = useRef<HTMLImageElement>(null);


    const countries: ICountry[] = Country.getAllCountries();
    const [countryCode, setCountryCode] = useState<string>(
        userData?.country ? countries[userData?.country - 1].isoCode : ''
    );

    useEffect(() => {
        if (countries[0].name === "Does Not Matter") {
            countries.shift();
        }
    }, []);

    useEffect(() => {
        setShortlistedUser(userData?.shortlist === 1 ? true : false)
    }, [userData]);



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




    const handleSortlisted = async (id: number) => {
        setLoading(true);
        setShortlistedUser(!shortlistUser)
        const mutationResult = await useShortlistMutation.mutateAsync({
            userId: userID,
            useridShortlist: id,
            status: !userData?.shortlist ? 'Y' : 'N'
        });
        if (mutationResult.output === 1) {
            handleUpdateds && handleUpdateds(id);
        }
        setLoading(false);
    }


    const handleSendInterest = async () => {
        setLoading(true);
        const mutationResult = await useSendInterestMutation.mutateAsync({
            fromUserid: userID,
            toUserid: cardId,
            status: userData?.interest.Send != 'S' ? 'S' : 'C'
        });
        dispatch(searchByDataSuccess(mutationResult as any));
        if (mutationResult.apiResponse.output === 1) {
            handleUpdateds && handleUpdateds(cardId);
        }
        setInterestPopup(false);
        setLoading(false);

    }


    const handleBlock = async () => {
        setLoading(true);
        const mutationResult = await useBlockUserMutation.mutateAsync({
            userId: userID,
            userIdToBlock: cardId,
            status: !BlockedUser?.includes(cardId) ? 'Y' : 'N'
        });
        console.log(mutationResult, 'mutationResult');

        if (mutationResult.output === 1) {
            handleUpdateds && handleUpdateds(cardId);
            setBlock && setBlock(cardId);
            setBlockPopup(false);
            setLoading(false);
        } else {
            setBlockPopup(false);
            setLoading(false);
        }
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


    const reptNameHide = () => <>{userData?.fullname.slice(0, 3).toLocaleLowerCase()}<span>{'*'.repeat(8)}</span></>;


    const handleInterestPopupHide = () => {
        setInterestPopup(false);
    }

    const handleBlockPopupHide = () => {
        setBlockPopup(false);
    }



    const handleInterestPopupShow = (id: number) => {
        setInterestPopup(true);
        setCardId(id);

    }
    const handleBlockPopupShow = (id: number) => {
        setBlockPopup(true);
        setCardId(id);
    }

    const ShowNameONConditions = userData?.fullname.length > 16
        ? (userData?.fullname).toLocaleLowerCase().substring(0, 15).concat('...')
        : userData?.fullname.toLocaleLowerCase();


    return (
        <>
            <div className={classes.CardMain} key={key}  >

                < div className={classes.profileSection} onClick={(e) => { e?.preventDefault(), router.push(`/PartnerMatchProfile?uid=${userData?.userid + userData?.user_RM_ID}`) }}>
                    <Image className={`${classes.profile_Photo} `}
                        src={userData?.privacy_photo === 'P'
                            ? `${process.env.NEXT_PUBLIC_URL}/${userData?.photo}`
                            : userData?.interest?.Send === 'A' || userData?.interest?.Receive === 'A' ?
                                `${process.env.NEXT_PUBLIC_URL}/${userData?.photo}`
                                : blurredPhotoUrl
                        } alt="Profile Photo" ref={imageRef} />
                    <div className={classes.profiler_Name}>

                        <h5 className={`${classes.name_Heading} `}>

                            {userData?.privacy_photo === 'P'
                                ? ShowNameONConditions
                                : userData?.interest?.Send === 'A' || userData?.interest?.Receive === 'A' ?
                                    ShowNameONConditions
                                    : reptNameHide()}
                        </h5>
                        <div>
                            <h5 className={classes.active_Status}>Last Active on :</h5>
                            <h5 className={classes.active_Status}>{ullYear ? <span>{`${ullDay}-${months[Number(ullMonth) - 1]}-${ullYear} `} </span> : <span>Na :Na at Na</span>} </h5>
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

                        {userData?.basic_intro &&
                            <div className={classes.mySelf}>
                                <p>
                                    <span>
                                        MySelf : {' '}
                                    </span>
                                    {userData?.basic_intro.length > 175 ? userData?.basic_intro.slice(0, 175) + '...' : userData?.basic_intro}
                                </p>
                            </div>
                        }

                        <div className={classes.card_Button_Wrapper}>
                            <div className={classes.button_section}>
                                <Button disabled={
                                    BlockedUser?.includes(userData?.userid)
                                    || userData?.interest?.Receive === 'D' || userData?.interest?.Receive === 'S' || userData?.interest?.Send === 'D'
                                    || userData?.interest?.Receive === 'A' || userData?.interest?.Send === 'A'}
                                    onClick={() => handleInterestPopupShow(userData?.userid)}
                                    className={userData?.interest.Send === 'S' || userData?.interest?.Receive === 'S' ? classes.activebtn : ''}>
                                    <BiHeartCircle className={userData?.interest.Send === 'S' || userData?.interest?.Receive === 'S' ? classes.activesvg : ''} />
                                    {
                                        userData?.interest.Send === 'S' || userData?.interest?.Receive === 'A'
                                            ? userData?.interest?.Receive === 'A' || userData?.interest.Send === 'A'
                                                ? 'Interest Accepted'
                                                : userData?.interest?.Receive === 'D' || userData?.interest?.Send === 'D'
                                                    ? 'Interest Declined'
                                                    : 'Interest Sent'
                                            : userData?.interest?.Receive === 'S' && userData?.interest?.Send != 'D'
                                                ? 'Interest Recived'
                                                : userData?.interest?.Send === 'D'
                                                    ? 'Interest Declined'
                                                    : 'Send Interest'
                                    }
                                </Button>
                                <Button disabled={BlockedUser?.includes(userData?.userid)} className={shortlistUser ? classes.activebtn : ''} onClick={() => handleSortlisted(userData?.userid)}>
                                    <MdStars className={shortlistUser ? classes.activesvg : ''} />
                                    {shortlistUser ? 'Shortlisted' : 'Shortlist'}
                                </Button>
                                <Button className={BlockedUser?.includes(userData?.userid) ? classes.activebtn : ''} onClick={() => handleBlockPopupShow(userData?.userid)}>
                                    <MdBlock className={BlockedUser?.includes(userData?.userid) ? classes.activesvg : ''} />
                                    {BlockedUser?.includes(userData?.userid) ? 'Unblock' : 'Block'}
                                </Button>
                            </div>
                            <div className={classes.profileMatchSection}>
                                <Image className={classes.profileMatch} src={matchProfile} alt='profile Match' />
                                <span>{(userData?.matching_score * 100 / 21).toFixed(1)} %</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            {interestPopup && <ConfirMationsPopup loading={loading} confirmationsFun={handleSendInterest} handleInterestPopupHide={handleInterestPopupHide} index={0} title={userData?.interest.Send != 'S' ? 'Send Interest' : 'Recall Interest'} />}
            {blockPopup && <ConfirMationsPopup loading={loading} confirmationsFun={handleBlock} handleInterestPopupHide={handleBlockPopupHide} index={1} title={BlockedUser?.includes(userData?.userid) ? 'Unblock' : 'Block'} />}
        </>
    )
}

export default SearchProfileCard

