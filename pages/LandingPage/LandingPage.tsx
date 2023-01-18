import { Col, Container, Row, Image } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import classes from "./LandingPage.module.scss";
import { Header, Footer, HomeImage } from "../../components";
import DemoCarousel from "./LandingPageSlider";
import BrowserLink from "../../components/BrowserLink/BrowserLinks";
import HomeForm from "../../components/HomeForm/Form";
import HomeCard from "../../components/Cards/Cards";
import CustomButton from "../../components/Button/CustomButton";
import { useInView, InView } from "react-intersection-observer";

import { cardItems } from "../../components/Cards/card";

const LandingPage: React.FC = () => {
  const ref = useRef(null);
  const refTab = useRef(null);
  console.log(refTab);

  // const listenScrollEvent = (event:any) => {
  //     console.log('scrollTop: ', event.currentTarget.scrollTop);
  //     console.log('offsetHeight: ', event.currentTarget.offsetHeight);
  // }
  const [isActive, setActive] = useState(false);
  // const ToggleClass = () => {
  //   setActive(!isActive);
  //  };
  const refineScroll = (scrollVal: any) => {
    // to run scroll uncomment below line
    // ref.current.scroll({top: scrollVal, behavior: 'smooth'});
    setActive(!isActive);
    // this.currentTarget.classList.toggle('toggle');
  };
  const headimage = "cover_img_free_chat.jpg";
  return (
    <>
      <Header />
      <HomeImage addBackground={headimage} />
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
            Bringing People <strong>Together</strong>
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
          <span>MEET FROM HOME</span>
          <h1>Overcome the distance on our platform</h1>
          <Col sm={12} md={6} className="py-5 pe-5">
            <div
              className={`mb-5 me-5 ${classes.scrollBox}`}
              ref={refTab}
              onClick={() => refineScroll(0)}
            >
              <h3>RMS matchmaking Events in hotels </h3>
              <p className="me-5">
                Register and participate in our real time matchmaking events,
                organized in hotels. Success rate 90%.{" "}
              </p>
            </div>
            <div
              className={`mb-5 me-5 ${classes.scrollBox}`}
              onClick={() => refineScroll(476)}
            >
              <h3>RMS matchmaking Online Events </h3>
              <p className="me-5">
                Register and interact with members of your community in our real
                time online matchmaking events through video conferences.
              </p>
            </div>
            <div
              className={`mb-5 me-5 ${classes.scrollBox}`}
              onClick={() => refineScroll(906)}
            >
              <h3>Real-time communications </h3>
              <p className="me-5">
                Our voice and video calling facilities enable you to conduct
                secure conversations without disclosing your contact details.{" "}
              </p>
            </div>
            <div
              className={`mb-5 me-5 ${classes.scrollBox}`}
              onClick={() => refineScroll(906)}
            >
              <h3>Intro Video</h3>
              <p className="me-5">
                Enhance your profile with a video introduction to talk about
                yourself, your hobbies, interests and partner preferences.
              </p>
            </div>
          </Col>
          <Col sm={12} md={6}>
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
          <Col
            lg={6}
            className="mb-2 d-flex justify-content-end align-self-center"
          >
            <HomeCard onTitle={cardItems[0]} />
          </Col>
          <Col lg={6} className="mb-2">
            <HomeCard onTitle={cardItems[1]} onlistHeight={1.25} />
          </Col>
        </Row>
        <Row>
          <div className={classes.card_bottom}></div>
        </Row>
        <Row className={classes.Home_white_body}>
          <div className={classes.services_box}>
            <span>
              Customised Matchmaking Mediator Service through dedicated
              Relationship Manager
            </span>
            <h1>
              Introducing <strong>Exclusive</strong>
            </h1>
            <CustomButton onClick={() => console.log("tab")}>
              Exclusive
            </CustomButton>
          </div>
          <Col sm={12} md={4} className="text-center py-5">
            <Image src="./Images/icons/relationship-manager.gif" alt="pic" />
            <h3>Your Relationship Manager is waiting for you</h3>
            <p>
              Get in touch with our highly experienced consultant who will
              assist in finding a perfect life partner.
            </p>
          </Col>

          <Col sm={12} md={4} className="text-center py-5">
            <Image src="./Images/icons/express-yourself.gif" alt="pic" />
            <h3>Express your preferences</h3>
            <p>
              In-depth discussion with our consultant in order to understand
              your sentiments and partner preferences.
            </p>
          </Col>
          <Col sm={12} md={4} className="text-center py-5">
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
              {/* <Image
                src="./Images/store_icons.png"
                className="img-fluid"
                alt="pic"
              /> */}
              {/* 
              <p>
                <strong>Click here</strong> to view more about Apps
              </p> */}
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
