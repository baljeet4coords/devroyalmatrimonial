import HomeImage from "../../components/HomeImage/HomeImage";
import { Col, Container, Row, Image } from "react-bootstrap";
import classes from "./LandingPage.module.scss";
import { Header } from "../../components";
import DemoCarousel from "./LandingPageSlider";
import BrowserLink from "../../components/BrowserLink/BrowserLinks";
import HomeForm from "../../components/HomeForm/Form";
import HomeCard from "../../components/Cards/Cards";
import CustomButton from "../../components/Button/CustomButton";
import Footer from "../../components/Footer/FooterMain"
import { cardItems } from "../../components/Cards/card";

const LandingPage: React.FC = () => {

    return (
        <>
        <Header /> 
        <HomeImage />
        <Container className={`${classes.Home_Page_Wrapper} px-0`}>
            <Row className={`${classes.firstTopBox} mb-5`}>
            <Col sm={12} md={6}>
            <div className={classes.Home_heading}>
                <h1>Now, chat for free!</h1>
                <span>Finding your perfect match just became easier</span>
            </div>
            </Col>
            <Col sm={12} md={6}>
            <HomeForm/>
            </Col> 
            </Row>
            <Row className={classes.Home_white_body}>
                <span>MORE THAN 20 YEARS OF</span>
                <h1>Bringing People <strong>Together</strong></h1>
                <Col sm={12} md={4}>
                    <Image 
                    src="./Images/group_pic.png" 
                    alt="group_pice"
                    />
                    <h3>100% Manually Screened Profiles</h3>
                    <p>Search by location, community, profession & more from lakhs of active profiles</p>
                </Col>
                <Col sm={12} md={4}>
                    <Image 
                    src="./Images/group_pic.png" 
                    alt="group_pice"
                    />
                    <h3>100% Manually Screened Profiles</h3>
                    <p>Search by location, community, profession & more from lakhs of active profiles</p>
                </Col>
                <Col sm={12} md={4}>
                    <Image 
                    src="./Images/group_pic.png" 
                    alt="group_pice"
                    />
                    <h3>100% Manually Screened Profiles</h3>
                    <p>Search by location, community, profession & more from lakhs of active profiles</p>
                </Col>
            </Row>

            <Row className={classes.Home_dark_body}>
            <span>MEET FROM HOME</span>
            <h1>Impress them Over the <strong>Distance</strong></h1>
            <Col sm={12} md={6}>
                <div className="mb-5">
                <h3>Royal Matrimonial Match Hour</h3>
                <p>Register to join an online event to connect with members of your community in a short time</p>
                </div>
                <div className="mb-5">
                <h3>Royal Matrimonial Match Hour</h3>
                <p>Register to join an online event to connect with members of your community in a short time</p>
                </div>
                <div className="mb-5">
                <h3>Royal Matrimonial Match Hour</h3>
                <p>Register to join an online event to connect with members of your community in a short time</p>
                </div>
            </Col>
            <Col sm={12} md={6}>
                <div className={classes.landing_scroll_images}>
                <Image src="./Images/landing_image_1.svg" alt="pic"/>
                <Image src="./Images/landing_image_2.svg" alt="pic"/>
                <Image src="./Images/landing_image_3.svg" alt="pic"/>
                </div>
            </Col>
            </Row>
            <Row className={classes.Home_white_body}>
            <span>THREE SIMPLE STEPS TO</span>
            <h1>Find the <strong>One for You</strong></h1>
            <Col sm={12} md={4}>
                <Image src="./Images/office-paperclip.png" alt="pic"/>
                <p><strong>01.</strong> Define Your Partner Preferences</p>
            </Col>
            <Col sm={12} md={4}>
                <Image src="./Images/office-paperclip.png" alt="pic"/>
                <p><strong>01.</strong> Define Your Partner Preferences</p>
            </Col>
            <Col sm={12} md={4}>
                <Image src="./Images/office-paperclip.png" alt="pic"/>
                <p><strong>01.</strong> Define Your Partner Preferences</p>
            </Col>
            <CustomButton onClick={() => console.log("tab")}>Get Started</CustomButton>
            </Row>

            <Row className={classes.Home_dark_body}>
            <h1 className="text-center"><strong>Membership</strong> Plans</h1>
            <p className="text-center">Upgrade your plan as per your customized requirements. With a paid membership, you can seamlessly connect with your prospects and get more responses. Here are some key benefits:</p>
                <Col sm={12} md={6} className="mb-2">
                <HomeCard onTitle={cardItems[0]}/>
                </Col>
                <Col sm={12} md={6} className="mb-2">
                <HomeCard onTitle={cardItems[1]}/>
                </Col>
            </Row>
            <Row><div className={classes.card_bottom}></div></Row>
            <Row className={classes.Home_white_body}>
                <div className={classes.services_box}>
                <span className="text-center">PERSONALISED MATCH-MAKING SERVICE</span>
                <h1 className="text-center">Introducing <strong>Exclusive</strong></h1>
                <CustomButton onClick={() => console.log("tab")}>Get Started</CustomButton>
                </div>
                <Col sm={12} md={4} className={classes.services_border}>
                    <h3>Meet Your Relationship Manager</h3>
                    <p>Connect with our highly experienced advisor who manages your profile.</p>
                </Col> 
                
                <Col sm={12} md={4} className={classes.services_border}>
                    <h3>Meet Your Relationship Manager</h3>
                    <p>Connect with our highly experienced advisor who manages your profile.</p>
                </Col> 
                <Col sm={12} md={4} className={classes.services_border}>
                    <h3>Meet Your Relationship Manager</h3>
                    <p>Connect with our highly experienced advisor who manages your profile.</p>
                </Col> 
            </Row>
            <Row className={classes.Home_dark_body}>
            <span>LAKHS OF HAPPY COUPLES</span>
            <h1>Matched by <strong>Royal Matrimonial</strong></h1>
            <DemoCarousel />
            </Row>
            <Row className={classes.Home_colord_body}>
            <Col sm={12} md={6}>
            <div className={classes.content}>
            <span>STAY CONNECTED WITH</span>
            <h1>Royal Matrimonial Apps</h1>
            <p>Access quick & simple search, instant updates and a great user experience on your phone. Download our apps rated best in the online matrimony segment.</p>
            <Image src="./Images/store_icons.png" className="img-fluid" alt="pic"/>
            
            <p><strong>Click here</strong> to view more about Apps</p>
            </div>
            </Col>
            <Col sm={12} md={6}>
            <Image src="./Images/mobile_app_pic.png" className="img-fluid" alt="pic"/>
            </Col>
            </Row>
            <Row className={classes.Home_dark_body}>
            <span>BE FOUND</span>
            <h1><strong>Royal Matrimonial</strong></h1>
            <p>Royalmatrimonial.com is one of the leading and most trusted matrimony websites in India. Making happy marriages happen since 1998, Royal Matrimonial understands the importance of choosing the right partner for marriage, especially in the Indian cultural setup. It believes in providing the most secure and convenient matchmaking experience to all its members by ensuring 100% screening,exclusive privacy options, photo protection features and verification of phone numbers and more information. While the online matrimonial site connects millions of people directly, Royal Matrimonial also maintains a dedicated Customer Care team and offers offline Match Point Centers across the country, for deeper and personal interaction with prospective brides, grooms and /or families.</p>
            <p>Please note: Royal Matrimonial is only meant for users with a bonafide intent to enter into a matrimonial alliance and is not meant for users interested in dating only. Royal Matrimonial platform should not be used to post any obscene material, such actions may lead to permanent deletion of the profile used to upload such content.</p>
            </Row>
            <Row className={`${classes.Home_white_body} text-center`}>
            <span>BROWSE</span>
            <h1><strong>Matrimonial</strong>Profiles by</h1>
            <BrowserLink/>
            </Row>
        </Container>    
        <Footer/>
        </>
    )
}

export default LandingPage;