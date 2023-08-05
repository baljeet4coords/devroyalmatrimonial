import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { Header, ImageGallery, LoginHeader } from '../../components';
import classes from "./PartnerMatchProfile.module.scss";
import { Col, Container, Modal, Row } from 'react-bootstrap';
import MyProfilePageCard from '../../components/MyProfile/MyProfilePageCard';
import { myProfileReq } from '../../ducks/myProfile/actions';
import { useDispatch } from 'react-redux';
import { selectmyProfileSuccess } from '../../ducks/myProfile/selectors';
import { getUserId, selectAuthSuccess } from '../../ducks/auth/selectors';
import { useSelector } from 'react-redux';
import { AboutMeDetails, BasicDetails, EducationAndCareer, FamilydetailsInfo, LifeStyleDetails, MyProfileRightSec } from '../../components/MyProfile/Components';
import MatchingDetails from './Components/MatchingDetails';
import { selectPartnerPrefSuccess } from '../../ducks/partnerPreferrence/selectors';
import { partnerPrefReq } from '../../ducks/partnerPreferrence/actions';
import { partnerDetailsReq } from '../../ducks/PartnerDetailsss/actions';
import { selectpartnerDetailsSuccess } from '../../ducks/PartnerDetailsss/selectors';
import { IPartnerDetailsInterestResponse, IPartnerDetailsP1Response, IPartnerDetailsP2Response, IPartnerDetailsP3Response, IPartnerDetailsP4Response, IPartnerDetailsP5Response, IPartnerDetailsPrivacyResponse } from '../../types/PartnerDetails/partnerDetails';


const PartnerMatchProfile: React.FC = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { uid } = router.query;
    const partnerId = String(uid).split('RM')[0];
    const userId = useSelector(getUserId);

    const dispatch = useDispatch();
    const partnerPreferrenceResponse = useSelector(selectPartnerPrefSuccess);
    const partnerDetailsResponse = useSelector(selectpartnerDetailsSuccess);


    const myProfileObject = useSelector(selectmyProfileSuccess);
    const AuthSuccess = useSelector(selectAuthSuccess);
    const [step1Response, setstep1Response] = useState<IPartnerDetailsP1Response | null>(partnerDetailsResponse?.jsonResponse.step1 != undefined ? partnerDetailsResponse?.jsonResponse.step1 : null)
    const [step2Response, setstep2Response] = useState<IPartnerDetailsP2Response | null>(partnerDetailsResponse?.jsonResponse.step2 != undefined ? partnerDetailsResponse?.jsonResponse.step2 : null)
    const [step3Response, setstep3Response] = useState<IPartnerDetailsP3Response | null>(partnerDetailsResponse?.jsonResponse.step3 != undefined ? partnerDetailsResponse?.jsonResponse.step3 : null)
    const [step4Response, setstep4Response] = useState<IPartnerDetailsP4Response | null>(partnerDetailsResponse?.jsonResponse.step4 != undefined ? partnerDetailsResponse?.jsonResponse.step4 : null)
    const [step5Response, setstep5Response] = useState<IPartnerDetailsP5Response | null>(partnerDetailsResponse?.jsonResponse.step5 != undefined ? partnerDetailsResponse?.jsonResponse.step5 : null)
    const [interest, setInterest] = useState<IPartnerDetailsInterestResponse | null>(partnerDetailsResponse?.jsonResponse.interest != undefined ? partnerDetailsResponse?.jsonResponse.interest : null)
    const [privacyResponse, setprivacyResponse] = useState<IPartnerDetailsPrivacyResponse | null>(partnerDetailsResponse?.jsonResponse.Privacy != undefined ? partnerDetailsResponse?.jsonResponse.Privacy : null)

    useEffect(() => {

        partnerDetailsResponse?.jsonResponse.step1 && setstep1Response(partnerDetailsResponse?.jsonResponse.step1)
        partnerDetailsResponse?.jsonResponse.step2 && setstep2Response(partnerDetailsResponse?.jsonResponse.step2)
        partnerDetailsResponse?.jsonResponse.step3 && setstep3Response(partnerDetailsResponse?.jsonResponse.step3)
        partnerDetailsResponse?.jsonResponse.step4 && setstep4Response(partnerDetailsResponse?.jsonResponse.step4)
        partnerDetailsResponse?.jsonResponse.step5 && setstep5Response(partnerDetailsResponse?.jsonResponse.step5)
        partnerDetailsResponse?.jsonResponse.interest && setInterest(partnerDetailsResponse?.jsonResponse.interest)
        partnerDetailsResponse?.jsonResponse.Privacy && setprivacyResponse(partnerDetailsResponse?.jsonResponse.Privacy)
        partnerDetailsResponse?.jsonResponse.Privacy && console.log(partnerDetailsResponse?.jsonResponse.Privacy, partnerDetailsResponse?.jsonResponse.Privacy);

    }, [partnerDetailsResponse])


    const profileCompliteScore = myProfileObject?.profileCompletionScore?.overallScore;

    const [showGallery, setShowGallery] = useState<boolean>(false);


    const [buttonType, setButtonType] = useState<number>(1);

    const PartnerPreferenceJson = partnerPreferrenceResponse?.jsonResponse;

    useEffect(() => {
        dispatch(partnerPrefReq({ actionType: "v", userId: userId }));
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(partnerDetailsReq({ userId: userId, partnerId: Number(partnerId) }));
    }, [dispatch, userId, partnerId]);

    useEffect(() => {
        dispatch(myProfileReq({ actionType: "v", userId: Number(partnerId) }));
    }, [dispatch, partnerId]);

    const onPreviewAlbum = () => {
        setShowGallery(!showGallery);
    };

    const handleSwitchTabs = (val: number) => {
        setButtonType(val)
    }

    const modalClose = () => {
        setShowGallery(!showGallery);
    }


    //for gallery header

    const reptNameHide = () => <>{step1Response?.fullname && step1Response?.fullname.slice(0, 3)}<>{'*'.repeat(8) + ("`s Photos").toLocaleLowerCase()}</></>;


    const ShowNameONConditions = step1Response?.fullname && step1Response?.fullname?.length > 16
        ? step1Response?.fullname?.toLocaleLowerCase().substring(0, 15).concat('...') + "'s" + ' Photos'
        : step1Response?.fullname?.toLocaleLowerCase() + "'s" + ' Photos';



    return (
        <div className={classes.bg}>
            {userId ? <LoginHeader /> : <Header />}
            <Container fluid className={classes.background_header}
                style={
                    {
                        background: `url(./Images/cover-image-register.jpg) no-repeat center center`,
                    }
                }
            >
            </Container>
            <MyProfilePageCard
                step1Response={step1Response}
                onPreviewAlbum={onPreviewAlbum}
                AuthSuccess={AuthSuccess?.jsonResponse}
                profileCompliteScore={profileCompliteScore}
                privacySetting={privacyResponse}
                interestResponse={interest}
            />
            <Container className={classes.detailsWrapper}>
                {/* {showGallery ? (
                    <ImageGallery userProfilerName={step1Response?.fullname} galleryRef={galleryRef} images={[]} EditHide={true} privacySetting={privacyResponse}
                        interestResponse={interest} />
                ) : ( */}
                <>
                    <Row className={`${classes.tabSection} row`}>
                        <button onClick={() => handleSwitchTabs(1)} className={`${classes.TabButton} ${buttonType === 1 && classes.TabButtonActive} `}>
                            Details
                        </button>
                        <button onClick={() => handleSwitchTabs(2)} className={`${classes.TabButton} ${buttonType === 2 && classes.TabButtonActive} `}>
                            Profile Comparison
                        </button>
                    </Row>
                    {buttonType == 1 ?
                        <Row style={{
                            width: "100%",
                            margin: 'auto'
                        }}>
                            <Col sm={9} md={8} className="p-0">
                                <BasicDetails
                                    step1Response={step1Response}
                                    EditHide={true}
                                    setBasicDetails={setShowGallery}
                                    privacySetting={privacyResponse}
                                    interestResponse={interest}
                                />
                                <hr />
                                <AboutMeDetails
                                    step5Response={step5Response}
                                    setAboutMeDetails={setShowGallery}
                                    EditHide={true}
                                />
                                <hr />
                                <EducationAndCareer
                                    step2Response={step2Response}
                                    setEudcationAndCareer={setShowGallery}
                                    EditHide={true}
                                />

                                <hr />
                                <FamilydetailsInfo
                                    step4Response={step4Response}
                                    setFamilyDetails={setShowGallery}
                                    EditHide={true}
                                />
                                <hr />

                                <LifeStyleDetails
                                    step3Response={step3Response}
                                    setEditDetails={setShowGallery}
                                    EditHide={true}

                                />

                            </Col>
                            <Col sm={3} md={4} className="p-0">
                                <MyProfileRightSec myProfileObject={myProfileObject} privacySetting={privacyResponse}
                                    interestResponse={interest} />
                            </Col>
                        </Row>
                        :
                        <Row style={{
                            width: "100%",
                            margin: 'auto'
                        }}>
                            <Col xl={12} className="p-0">
                                <MatchingDetails partnerProfileAllData={myProfileObject} PartnerPreferenceJson={PartnerPreferenceJson} privacySetting={privacyResponse}
                                    interestResponse={interest} />
                            </Col>
                        </Row>
                    }
                </>
                {/* )} */}
            </Container>

            {
                showGallery && (
                    <Modal className={classes.galleryModel} show={showGallery} size="lg" centered scrollable >
                        <Modal.Header closeButton onHide={modalClose}>
                            <Modal.Title className={classes.galleryModel_title}>
                                {step1Response?.fullname
                                    ? privacyResponse
                                        ? privacyResponse?.privacy_show_name === 'P'
                                            ? ShowNameONConditions
                                            : interest?.Send === 'A' || interest?.Recieve === 'A' || interest?.Recieve === 'S'
                                                ? interest?.Send === 'D' || interest?.Recieve === 'D'
                                                    ? reptNameHide()
                                                    : ShowNameONConditions
                                                : reptNameHide()
                                        : ShowNameONConditions
                                    : 'Your Photos'}
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ImageGallery userProfilerName={step1Response?.fullname} EditHide={true} privacySetting={privacyResponse}
                                interestResponse={interest} />
                        </Modal.Body>
                    </Modal>
                )}
        </div >

    )
}

export default PartnerMatchProfile