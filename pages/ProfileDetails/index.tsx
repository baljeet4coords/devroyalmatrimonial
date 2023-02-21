import { Container, Row, Col, Image } from "react-bootstrap";
import LoginrHeader from "../../components/LoginHeader/Loginheader";
import React, { useState, useRef, useEffect } from 'react';
import classes from "./ProfileDetails.module.scss";
import ProfileCard from "./Component";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSchool } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { ImBook } from "react-icons/im";
import { GiMusicalNotes } from "react-icons/gi";
import { SiJfrogbintray } from "react-icons/si";
import { IoColorPaletteOutline } from "react-icons/io5";
import { RiTShirtLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { MdPeopleAlt, MdNightlife } from "react-icons/md";
import CustomButton from "../../components/Button/CustomButton";

const ProfileDetails: React.FC = () => {
    return (
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                    <LoginrHeader />
                </Container>
                <ProfileCard />
                <Container className={classes.detailsWrapper}>
                    <Row>
                        <Col sm={9} className="p-0">
                            <div className={classes.tabsStyle}>
                                <div>
                                    <CgProfile />
                                    <span>About Her</span>
                                </div>
                                <div>
                                    <MdOutlineSchool />
                                    <span>Education & Career</span>
                                </div>
                                <div>
                                    <CgProfile />
                                    <span>Family Details</span>
                                </div>
                                <div>
                                    <SlPeople />
                                    <span>Desired Partner</span>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <div className={classes.aboutCont}>
                                    <h4>Her profile is managed by Parent</h4>
                                    <p>We come from a upper middle class family and I am from Bihar but settled in Delhi since 3 decades. I am serving in Indian Air force and my wife is a homemaker. My daughter is a very kind heart , down to earth and a simple person working in Hyderabad as a senior technology operations analyst. she love travelling and listening to music. she is strong believer in equality amongst all of us. She is financially independent and a highly capable person. She would love to work/study abroad.</p>
                                    <h4>About her Family</h4>
                                    <p>We are family 4 with modern values. I work in Indian Air Force currently posted in Delhi. My wife is a homemaker. I have 1 son who is currently working in American Express Gurgaon.</p>
                                    <h4>Education</h4>
                                    <p>she has completed her education from different parts of the country namely Assam, Delhi, Pune, Hyderabad, Sikkim Manipal(Distance learning )</p>
                                    <h4>Occupation</h4>
                                    <p>She has total of 7yrs of experience in IT sector. she started working with IBM as Security Delivery Specialist (Hyderabad ). Now she is working with Wells Fargo as Senior Technology Operations Analyst (Hyderabad ).</p>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <div className={classes.eduCont}>
                                    <span><ImBook />Education & Career</span>
                                    <ul>
                                        <li>
                                            <p>Highest Education</p>
                                            <p>MBA/PGDM</p>
                                        </li>
                                        <li>
                                            <p>School Name</p>
                                            <p>Kendriya Vidhyalaya Pune</p>
                                        </li>
                                        <li>
                                            <p>UG Degree</p>
                                            <p>B.E/B.Tech</p>
                                        </li>
                                        <li>
                                            <p>PG Degree</p>
                                            <p>MBA/PGDM</p>
                                        </li>
                                        <li>
                                            <p>UG College</p>
                                            <p>St Peters Engineering College JNTU Hyderabad</p>
                                        </li>
                                        <li>
                                            <p>PG College</p>
                                            <p>Sikkim Manipal University</p>
                                        </li>
                                        <li>
                                            <p>Other UG Degree</p>
                                            <p>Not filled in</p>
                                        </li>
                                        <li>
                                            <p>Other PG Degree</p>
                                            <p>Not filled in</p>
                                        </li>
                                        <li>
                                            <p>Employed In</p>
                                            <p>Private Sector</p>
                                        </li>
                                        <li>
                                            <p>Occupation</p>
                                            <p>Analyst</p>
                                        </li>
                                        <li>
                                            <p>Organization Name</p>
                                            <p>Wells Fargo India Solutions Private Limited</p>
                                        </li>
                                        <li>
                                            <p>Annual Income</p>
                                            <p>Rs. 10 - 15 Lakh per Annum</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <div className={classes.eduCont}>
                                    <span><MdPeopleAlt />Family Details</span>
                                    <ul>
                                        <li>
                                            <p>Mother's Occupation</p>
                                            <p>Housewife</p>
                                        </li>
                                        <li>
                                            <p>Father's Occupation</p>
                                            <p>Army/Armed Forces</p>
                                        </li>
                                        <li>
                                            <p>Sister(s)</p>
                                            <p>0 sister</p>
                                        </li>
                                        <li>
                                            <p>Brother(s)</p>
                                            <p>1 brother of which 0 married</p>
                                        </li>
                                        <li>
                                            <p>Gothra</p>
                                            <p>bhardwaj</p>
                                        </li>
                                        <li>
                                            <p>Gothra (maternal)</p>
                                            <p>Not filled in</p>
                                        </li>
                                        <li>
                                            <p>Family Status</p>
                                            <p>Upper Middle</p>
                                        </li>
                                        <li>
                                            <p>Family Income</p>
                                            <p>Rs. 35 - 50 Lakh per Annum</p>
                                        </li>
                                        <li>
                                            <p>Family Type</p>
                                            <p>Nuclear Family</p>
                                        </li>
                                        <li>
                                            <p>Family Values</p>
                                            <p>Moderate</p>
                                        </li>
                                        <li>
                                            <p>Family based out of</p>
                                            <p>New Delhi, Delhi, India</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <div className={classes.eduCont}>
                                    <span><MdNightlife />Lifestyle</span>
                                    <ul>
                                        <li>
                                            <p>Habits</p>
                                            <p>Non Vegetarian, Doesn't drink, Doesn't smoke</p>
                                        </li>
                                        <li>
                                            <p>Assets</p>
                                            <p>Owns a house, Owns a car</p>
                                        </li>
                                        <li>
                                            <p>Languages Known</p>
                                            <p>English, Hindi</p>
                                        </li>
                                        <li>
                                            <p>Blood Group</p>
                                            <p>Not filled in</p>
                                        </li>
                                        <li>
                                            <p>Special Cases</p>
                                            <p>Disability - None</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <div className={classes.familyCont}>
                                    <span><FaRegHeart />She Likes</span>
                                    <div className={classes.controlDiv}>
                                        <p><IoColorPaletteOutline/>Photography</p>
                                        <p><SiJfrogbintray/>Movies, Watching television, Travel / Sightseeing, Net surfing</p>
                                        <p><GiMusicalNotes/>Old film songs</p>
                                        <p><RiTShirtLine/>Trendy - in line with the latest fashion</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3} className="p-0">
                            <div className={classes.rghtSec}>
                                <div className="d-flex justify-content-between pb-4">
                                    <span className="d-flex align-items-end">Guna Match</span>
                                    <span className={classes.gunaNo}>16/36</span>
                                </div>
                                <p className="text-left">Get a detailed analysis of guna match score, manglik & bhakut dosh analysis and lots more</p>
                                <CustomButton onClick={() => console.log("tab")}>
                                    Get Kundli Milan
                                </CustomButton>
                                <CustomButton onClick={() => console.log("tab")}>
                                    Know More
                                </CustomButton>
                                <ul>
                                    <li>
                                        <p>Place of Birth</p>
                                        <p>Sasaram, Bihar, India</p>
                                    </li>
                                    <li>
                                        <p>Date of Birth</p>
                                        <p>Oct 15, 1993</p>
                                    </li>
                                    <li>
                                        <p>Time of Birth</p>
                                        <p>14 hrs:17 mins</p>
                                    </li>
                                    <li>
                                        <p>Horoscope match is not necessary</p>
                                    </li>
                                    <li>
                                        <p>Sun sign</p>
                                        <p>Libra</p>
                                    </li>
                                    <li>
                                        <p>Rashi/Moon Sign</p>
                                        <p>Kanya Rashi (Non Manglik)</p>
                                    </li>
                                    <li>
                                        <p>Nakshatra</p>
                                        <p>Don't Know Nakshatra</p>
                                    </li>
                                    <li>
                                        <p>Manglik</p>
                                        <p>Non Manglik</p>
                                    </li>
                                </ul>
                                <CustomButton onClick={() => console.log("tab")}>
                                    View Horoscope
                                </CustomButton>
                                <CustomButton onClick={() => console.log("tab")}>

                                    Check Kundli Report
                                </CustomButton>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


export default ProfileDetails;

