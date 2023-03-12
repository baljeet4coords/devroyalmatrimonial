import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "./ProfileCard.module.scss";
import {AiFillLock} from "react-icons/ai";
import {GoVerified} from "react-icons/go";
import {BiMessageCheck} from "react-icons/bi";
import {MdContactPhone} from "react-icons/md";
import {BsChat, BsStarFill, BsFlag} from "react-icons/bs";
import {TbHistory} from "react-icons/tb";
import {ImShare, ImBlocked} from "react-icons/im";


const ProfilePageCard: React.FC = () => {
    return(
            <Container className={classes.cardWrapper}>
                <Row>
                    <Col sm={3} md={4} lg={3} className="p-0 d-flex justify-content-end">
                        <Image src="https://hospital.vallhebron.com/sites/hospital/files/styles/curriculum/public/AVATAR-home.jpg?itok=7-n4HvCf" alt="avatar"/>
                    </Col>
                    <Col sm={6} md={8} lg={6} className={classes.cardInfo}>
                        <div className={`${classes.NameDetails} border-bottom border-dark pb-2`}>
                            <span>Sweta Singh </span>
                            <small className="pe-2">(WSYY4227)</small>
                            {/* <span className={classes.lockIcon}><AiFillLock/></span>  */}
                            <span className={classes.tickIcon}><GoVerified/></span> 
                            <small>1Last seen on 19-Feb-23</small>
                        </div>
                        <ul>
                            <li>29, 5&apos; 5&quot;</li>
                            <li>MBA/PGDM, B.E/B.Tech</li>
                            <li>New Delhi</li>
                            <li>Analyst</li>
                            <li>Chandravanshi Kahar</li>
                            <li>Rs. 10 - 15 Lakh per Annum</li>
                            <li>Hindi-Delhi</li>
                            <li>Never Married</li>
                        </ul>
                        <div className={classes.profileCardIiconSection}>
                            <span><TbHistory/></span>
                            <span><ImShare/></span>
                            <span><ImBlocked/></span>
                            <span><BsFlag/></span>
                        </div>
                    </Col>
                    <Col sm={3} md={12} lg={3} className={classes.rightBox}>
                        <p><BiMessageCheck/>Send Interest</p>
                        <p><MdContactPhone/>View Contacts</p>
                        <p><BsChat/>Chat</p>
                        <p><BsStarFill/>Shortlisted</p>
                    </Col>
                </Row>    
            </Container> 
    )
}


export default ProfilePageCard;