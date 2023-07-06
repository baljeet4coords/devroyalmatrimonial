import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { ImageGallery, LoginHeader } from '../../components';
import classes from "./PartnerMatchProfile.module.scss";
import { Col, Container, Row } from 'react-bootstrap';
import MyProfilePageCard from '../../components/MyProfile/MyProfilePageCard';
import { myProfileReq } from '../../ducks/myProfile/actions';
import { useDispatch } from 'react-redux';
import { selectmyProfileSuccess } from '../../ducks/myProfile/selectors';
import { selectAuthSuccess } from '../../ducks/auth/selectors';
import { useSelector } from 'react-redux';
import { AboutMeDetails, BasicDetails, EducationAndCareer, FamilydetailsInfo, LifeStyleDetails, MyProfileRightSec } from '../../components/MyProfile/Components';
import MatchingDetails from './Components/MatchingDetails';


const PartnerMatchProfile: React.FC = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { uid } = router.query;
    const partnerId = String(uid).split('RM')[0];

    const dispatch = useDispatch();
    const myProfileObject = useSelector(selectmyProfileSuccess);
    const AuthSuccess = useSelector(selectAuthSuccess);
    const step1Response = myProfileObject?.step1.jsonResponse;
    const step2Response = myProfileObject?.step2.jsonResponse;
    const step3Response = myProfileObject?.step3.jsonResponse;
    const step4Response = myProfileObject?.step4.jsonResponse;
    const step5Response = myProfileObject?.step5.jsonResponse;
    const profileCompliteScore = myProfileObject?.profileCompletionScore?.overallScore;
    const galleryRef = useRef<HTMLDivElement>(null);

    const [showGallery, setShowGallery] = useState<boolean>(false);


    const [buttonType, setButtonType] = useState<number>(1);


    useEffect(() => {
        dispatch(myProfileReq({ actionType: "v", userId: Number(partnerId) }));
    }, [dispatch, partnerId]);

    const onPreviewAlbum = (visible: boolean) => {
        setShowGallery(visible);
        if (galleryRef.current === null) {
            window.innerWidth <= 667
                ? window.scrollTo(0, 1000)
                : window.scrollTo(0, 700);
        }
    };

    const handleSwitchTabs = (val: number) => {
        setButtonType(val)
    }


    return (
        <div className={classes.bg}>
            <LoginHeader />
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
            />
            <Container className={classes.detailsWrapper}>
                {showGallery ? (
                    <ImageGallery galleryRef={galleryRef} images={[]} EditHide={true} />
                ) : (
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
                                    <MyProfileRightSec myProfileObject={myProfileObject} />
                                </Col>
                            </Row>
                            :
                            <Row style={{
                                width: "100%",
                                margin: 'auto'
                            }}>
                                <Col xl={12} className="p-0">
                                    <MatchingDetails />
                                </Col>
                            </Row>
                        }
                    </>
                )}
            </Container>

        </div >
    )
}

export default PartnerMatchProfile