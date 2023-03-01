import { Container, Row, Col, Image } from "react-bootstrap";
import LoginrHeader from "../../components/LoginHeader/Loginheader";
import React, { useState, useRef, useEffect } from 'react';
import classes from "./ProfileDetails.module.scss";
import ProfilePageCard from "./Components/Card";
import About from "./Components/About";
import Education from "./Components/Education";
import Family from "./Components/Family";
import DesiredSec from "./Components/DesiredSec";
import RightSection from "./Components/RightSection";

import { CgProfile } from "react-icons/cg";
import { MdOutlineSchool } from "react-icons/md";
import { SlPeople } from "react-icons/sl";




const ProfileDetails: React.FC = () => {
const aboutCont = useRef<HTMLDivElement>(null);
const eduCont = useRef<HTMLDivElement>(null);
const familyCont = useRef<HTMLDivElement>(null);
const desirCont = useRef<HTMLDivElement>(null);

const aboutLink = useRef<HTMLDivElement>(null);
const eduLink = useRef<HTMLDivElement>(null);
const familyLink = useRef<HTMLDivElement>(null);
const desirLink = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
          if (aboutCont.current && aboutLink.current) {
            const top = aboutCont.current.getBoundingClientRect().top;
            const bottom = aboutCont.current.getBoundingClientRect().bottom;
      
            if (top <= window.innerHeight && bottom > 120) {
              aboutLink.current.classList.add("activeBorder");
            } else {
              aboutLink.current.classList.remove("activeBorder");
            }
          } 
      
          if (eduCont.current && eduLink.current) {
            const top = eduCont.current.getBoundingClientRect().top;
            const bottom = eduCont.current.getBoundingClientRect().bottom;
      
            if (top < 120 && bottom > 120) {
            eduLink.current.classList.add("activeBorder");
            } else {
            eduLink.current.classList.remove("activeBorder");
            }
          }
      
          if (familyCont.current && familyLink.current) {
            const top = familyCont.current.getBoundingClientRect().top;
            const bottom = familyCont.current.getBoundingClientRect().bottom;
      
            if (top < 120 && bottom > 120) {
                familyLink.current.classList.add("activeBorder");
            } else {
                familyLink.current.classList.remove("activeBorder");
            }
          }
          if (desirCont.current && desirLink.current) {
            const top = desirCont.current.getBoundingClientRect().top;
            const bottom = desirCont.current.getBoundingClientRect().bottom;
      
            if (top < 120 && bottom > 120) {
                desirLink.current.classList.add("activeBorder");
            } else {
                desirLink.current.classList.remove("activeBorder");
            }
          }
        };
      
        window.addEventListener("scroll", handleScroll);
      
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    return (
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                    <LoginrHeader />
                </Container>
                <ProfilePageCard />
                <Container className={classes.detailsWrapper}>
                    <Row>
                        <Col sm={9} className="p-0">
                            <div className={classes.tabsStyle}>
                                <div className={classes.profileNavbar} ref={aboutLink} onClick={() => window.scrollTo(0, 600)}>
                                    <CgProfile />
                                    <span>About Her</span>
                                </div>
                                <div className={classes.profileNavbar} ref={eduLink} onClick={() => window.scrollTo(0, 1180)}>
                                    <MdOutlineSchool />
                                    <span>Education & Career</span>
                                </div>
                                <div className={classes.profileNavbar} ref={familyLink} onClick={() => window.scrollTo(0, 1650)}>
                                    <CgProfile />
                                    <span>FamilyCont</span>
                                </div>
                                <div className={classes.profileNavbar} ref={desirLink} onClick={() => window.scrollTo(0, 2830)}>
                                    <SlPeople />
                                    <span>Desired Partner</span>
                                </div>
                            </div>
                            <div ref={aboutCont}><About /></div>
                            <div ref={eduCont}><Education /></div>
                            <div ref={familyCont}><Family /></div>
                            <div ref={desirCont}><DesiredSec /></div>
                            <div className={classes.datecont}>
                                <p>Last updated on 15th Feb, 2023</p>
                            </div>
                        </Col>
                        <Col sm={3} className="p-0">
                            <RightSection/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


export default ProfileDetails;

