import { Col, Container, Row, Image } from "react-bootstrap";
import { useState, useRef , useEffect } from "react";
import classes from "./LandingPage.module.scss";
import { Header, Footer, HomeImage } from "../../components";
import DemoCarousel from "../../components/Carousel/DemoCarousel";
import BrowserLink from "../../components/BrowserLink/BrowserLinks";
import HomeForm from "../../components/HomeForm/Form";
import HomeCard from "../../components/Cards/Cards";
import CustomButton from "../../components/Button/CustomButton";
import { cardItems } from "../../components/Cards/card";

const LandingPage: React.FC = () => {
  const ref = useRef(null);
  const refTab = useRef(null);

  const [activeId, setActiveId] = useState<string>();

  console.log(activeId);
  
  const refineScroll = (scrollVal: any) => {
    const refCapture: any = ref.current;
    refCapture.scroll({ top: scrollVal, behavior: "smooth" });
  };
  const headimage = "cover_img_free_chat.jpg";
  return (
    <>
      <Header />
      <HomeImage addBackground={headimage}/>
      <Container className={`${classes.Home_Page_Wrapper} px-0`}>
        <Row className={`${classes.firstTopBox} pb-4`}>
          <Col sm={12} md={6} className="d-flex align-items-center">
            <div className={classes.Home_heading}>
              <h1>Now, chat for free!</h1>
              <span>Finding your perfect match just became easier</span>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <HomeForm />
          </Col>
        </Row>
        <Row className={classes.Home_white_body}>
          <span>MORE THAN 20 YEARS OF</span>
          <h1>
            Uniting Compatible <strong>Soulmates</strong>
          </h1>
          <Col sm={12} md={4} className="text-center">
            <Image
              src="./Images/icons/digi-screen-profile.gif"
              alt="group_pice"
            />
            <h3>Diligently Screened Profiles </h3>
            <p>
              Choose a perfect life partner from a wide range of screened
              profiles using customized filters on religion, community,
              location, hobbies, profession and more.{" "}
            </p>
          </Col>
          <Col sm={12} md={4} className="text-center">
            <Image src="./Images/icons/in-person-verify.gif" alt="group_pice" />
            <h3>In-person verification </h3>
            <p>
              Exclusive range of profiles that have been personally
              authenticated by our agents
            </p>
          </Col>
          <Col sm={12} md={4} className="text-center">
            <Image src="./Images/icons/privacy.gif" alt="group_pice" />
            <h3>Right To Privacy</h3>
            <p>
              Protect contact details and photo/ videos from unauthorized access
            </p>
          </Col>
        </Row>

        <Row className={classes.Home_dark_body}>
          <h1>
            Overcome the distance on our <strong>Platform</strong>
          </h1>
          <Col sm={12} md={6}>
            <div
              className={`${classes.scrollBox}`}
              style={{opacity: `${activeId === "0" ? 1 : activeId === undefined ? 1 : 0.5}`}}
              ref={refTab}
              onClick={() => [refineScroll(0), setActiveId("0")]}
            >
              <Image
                src="./Images/landing_image_1.png"
                alt="pic"
                className={classes.responsiveImage}
              />
              <h3>RMS matchmaking Events in hotels </h3>
              <p>
                Register and participate in our real time matchmaking events,
                organized in hotels. Success rate 90%.{" "}
              </p>
            </div>
            <div
              className={`${classes.scrollBox} `}
              style={{opacity: `${activeId === "476" ? 1 : activeId === undefined ? 1 : 0.5}`}}
              onClick={() => [refineScroll(476), setActiveId("476")]}
            >
              <Image
                src="./Images/landing_image_2.png"
                alt="pic"
                className={classes.responsiveImage}
              />
              <h3>RMS matchmaking Online Events </h3>
              <p>
                Register and interact with members of your community in our real
                time online matchmaking events through video conferences.
              </p>
            </div>
            <div
              className={`${classes.scrollBox} `}
              style={{opacity: `${activeId === "1029" ? 1 : activeId === undefined ? 1 : 0.5}`}}
              onClick={() => [refineScroll(1029), setActiveId("1029")]}
            >
              <Image
                src="./Images/landing_image_3.png"
                alt="pic"
                className={classes.responsiveImage}
              />
              <h3>Real-time communications </h3>
              <p>
                Our voice and video calling facilities enable you to conduct
                secure conversations without disclosing your contact details.{" "}
              </p>
            </div>
            <div
              className={`${classes.scrollBox}`}
              style={{opacity: `${activeId === "906" ? 1 : activeId === undefined ? 1 : 0.5}`}}
              onClick={() => [refineScroll(0), setActiveId("0")]}
            >
              <h3>Intro Video</h3>
              <p>
                Enhance your profile with a video introduction to talk about
                yourself, your hobbies, interests and partner preferences.
              </p>
            </div>
          </Col>
          <Col sm={12} md={6} className="align-self-center">
            <div className={classes.landing_scroll_images} ref={ref}>
              <Image src="./Images/landing_image_1.png" alt="pic" />
              <Image src="./Images/landing_image_2.png" alt="pic" />
              <Image src="./Images/landing_image_3.png" alt="pic" />
            </div>
          </Col>
        </Row>
        <Row className={classes.Home_white_body}>
          <span>You are 3 Steps away from Finding your Soulmate</span>
          <h1>
            Find the <strong>One for You</strong>
          </h1>
          <Col sm={12} md={4} className="text-center">
            <Image src="./Images/icons/register-user.gif" alt="pic" />
            <p>Register yourself and define partner preferences </p>
          </Col>
          <Col sm={12} md={4} className="text-center">
            <Image src="./Images/icons/recommendation.gif" alt="pic" />
            <p>Browse profiles based on recommendations </p>
          </Col>
          <Col sm={12} md={4} className="text-center">
            <Image src="./Images/icons/send-interest.gif" alt="pic" />
            <p>Send and Accept interests </p>
          </Col>
          <CustomButton onClick={() => console.log("tab")}>
            Get Started
          </CustomButton>
        </Row>

        <Row className={classes.Home_dark_body}>
          <h1 className="text-center">
            <strong>Membership</strong> Packages
          </h1>
          <p className="text-center">
            Choose your membership package as per your preferences and
            requirements. Get more responses and hassle-free interaction with
            paid packages. Perks of Paid Membership is as follows:{" "}
          </p>
          <Row className={classes.carResponsive}>
          <Col
            lg={6}
            className="mb-2 d-flex justify-content-end align-self-center homeCardScroll"
          >
            <HomeCard onTitle={cardItems[0]} />
          </Col>
          <Col lg={6} className="mb-2 homeCardScroll">
            <HomeCard onTitle={cardItems[1]} onlistHeight={true} />
          </Col>
          </Row>
        </Row>
        <Row>
          <div className={classes.card_bottom}></div>
        </Row>
        <Row className={classes.Home_white_body}>
          <div className={classes.services_box_container}>
            <div className={classes.services_box}></div>
            <p>
              Customised Matchmaking Mediator Service through dedicated
              Relationship Manager
            </p>
            <h1>
              Mediator <strong>Service</strong>
            </h1>
            <CustomButton onClick={() => console.log("tab")}>
              Get Connected
              </CustomButton>
            </div>
          <Col sm={12} md={4} className="text-center py-3">
            <Image src="./Images/icons/relationship-manager.gif" alt="pic" />
            <h3>Your Relationship Manager is waiting for you</h3>
            <p>
              Get in touch with our highly experienced consultant who will
              assist in finding a perfect life partner.
            </p>
          </Col>

          <Col sm={12} md={4} className="text-center py-3">
            <Image src="./Images/icons/express-yourself.gif" alt="pic" />
            <h3>Express your preferences</h3>
            <p>
              In-depth discussion with our consultant in order to understand
              your sentiments and partner preferences.
            </p>
          </Col>
          <Col sm={12} md={4} className="text-center py-3">
            <Image src="./Images/icons/schedule-meeting.gif" alt="pic" />
            <h3>Schedule meetings</h3>
            <p>
              We shortlist candidates matching your preferences and schedule
              meetings among interested parties.
            </p>
          </Col>
        </Row>
        <Row className={classes.Home_dark_body}>
          <span>LAKHS OF HAPPY COUPLES</span>
          <h1>
            Matched by <strong>Royal Matrimonial</strong>
          </h1>
          <DemoCarousel />
        </Row>
        <Row className={classes.Home_colord_body}>
          <Col sm={12} md={6}>
            <div className={classes.content}>
              <span>Stay Tunned Through</span>
              <h1>Whatsapp</h1>
              <p>
                With a great mobile experience, receive instant notifications
                and enjoy an excellent user experience. Join us now and take
                advantage of our best rated matrimonial society.
              </p>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <Image
              src="./Images/mobile_app_pic.png"
              className="img-fluid"
              alt="pic"
            />
          </Col>
        </Row>
        <Row className={classes.Home_dark_body}>
          <span>Unable to find a perfect life partner?</span>
          <h1>
            <strong>Your search is over!</strong>
          </h1>
          <p>
            Welcome to Royal Matrimonial Services. It is a one stop platform for
            all the eligible singles who are seeking a compatible partner. With
            100% client satisfaction we have become India’s most esteemed
            matchmaking bureau headquartered in Punjabi Bagh, Delhi.
          </p>
          <p>
            Established in 2006, Royal Matrimonial Services offers matchmaking
            services through its large authenticated database of brides and
            grooms. We believe in providing a matchmaking platform while
            ensuring profile authentication, respecting privacy options, photo
            and video protections, verification of mobile numbers and other data
            protection.
          </p>
          <p>
            Along with the online platform, we also have a physical presence in
            Punjabi Bagh, Delhi where we have a set of experienced and dedicated
            customer care teams who exclusively understand the client’s
            preferences and play the role of mediator between the interested
            parties.
          </p>
          <p>
            We also conduct online through video conferencing and offline events
            in hotels where families of particular communities participate and
            interact.
          </p>
          <p>
            We believe that matches are made in heaven and we consider it as our
            duty to unite them on earth. So, what are you waiting for? Let’s
            find your soulmate!
          </p>
          <p>
            Please note- this website is intended for users who have a bona fide
            intention to enter into a matrimonial world, and are not intended to
            use it primarily for dating. Also, posting of obscene content on
            this platform may result in the permanent deletion of the user’s
            account.
          </p>
        </Row>
        <Row className={`${classes.Home_white_body} text-center`}>
          <span>BROWSE</span>
          <h1>
            <strong>Matrimonial</strong>Profiles by
          </h1>
          <BrowserLink />
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
