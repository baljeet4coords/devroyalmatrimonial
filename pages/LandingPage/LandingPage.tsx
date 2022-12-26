import HomeImage from "../../components/HomeImage/HomeImage";
import { Col, Container, Row, Image } from "react-bootstrap";
import classes from "./LandingPage.module.scss";
import { Header } from "../../components";
import HomeForm from "../../components/HomeForm/Form";
import HomeCard from "../../components/Cards/Cards";
import CustomButton from "../../components/Button/CustomButton";
import Footer from "../../components/Footer/FooterMain"


const LandingPage: React.FC = () => {
    return (
        <>
        <Header /> 
        <HomeImage />
        <Container className={`${classes.Home_Page_Wrapper} w-75 px-0`}>
            <Row className="mb-5">
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
                <h3>Jeevansathi Match Hour</h3>
                <p>Register to join an online event to connect with members of your community in a short time</p>
                </div>
                <div className="mb-5">
                <h3>Jeevansathi Match Hour</h3>
                <p>Register to join an online event to connect with members of your community in a short time</p>
                </div>
                <div className="mb-5">
                <h3>Jeevansathi Match Hour</h3>
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
                <Col sm={12} md={6}>
                <HomeCard/>
                </Col>
                <Col sm={12} md={6}>
                <HomeCard/>
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
            <h1>Impress them Over the <strong>Distance</strong></h1>
            </Row>
        </Container>
        <Footer/>
        </>
    )
}

export default LandingPage;