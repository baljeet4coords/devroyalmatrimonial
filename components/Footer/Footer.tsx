import {Container, Row, Col} from "react-bootstrap";
import classes from "./Footer.module.scss";
import FooterClient from "./FooterClient";
import FooterSocial from "./FooterSocial";
import FooterRights from "./FooterRights";

const Footer = () => {
    return(
    <>
            <div className={classes.Footer_dark}>
                <Container className={`${classes.footer_box} px-0`}>
                <Row>
                        <Col sm={12} md={3}>
                            <h4>Explore</h4>
                            <ul className={classes.Footer_lg_list}>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Advanced Search</a></li>
                                <li><a href="#">Success Stories</a></li>
                                <li><a href="#">Sitemap </a></li>
                                <li><a href="#">Create Horoscope</a></li>
                            </ul>
                        </Col>

                        <Col sm={12} md={3}>
                            <h4>Services</h4>
                            <ul className={classes.Footer_lg_list}>
                                <li><a href="#">Membership Options</a></li>
                                <li><a href="#">Royal Matrimonial Careers</a></li>
                            </ul>
                        </Col>

                        <Col sm={12} md={3}>
                            <h4>Help</h4>
                            <ul className={classes.Footer_lg_list}>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Feedback / Queries</a></li>
                                <li><a href="#">Royal Matrimonial Centers</a></li>
                            </ul>
                        </Col>

                        <Col sm={12} md={3}>
                            <h4>Legal</h4>
                            <ul className={classes.Footer_lg_list}>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Fraud Alert</a></li>
                                <li><a href="#">Terms of use</a></li>
                                <li><a href="#">3rd party terms of use</a></li>
                                <li><a href="#">Privacy policy</a></li>
                                <li><a href="#">Privacy features</a></li>
                                <li><a href="#">Summons / Notices</a></li>
                                <li><a href="#">Grievances</a></li>
                            </ul>
                        </Col>
                </Row>
                </Container>
            </div>
            <FooterSocial/>
            <FooterRights/>
    </>
    )
}

export default Footer;