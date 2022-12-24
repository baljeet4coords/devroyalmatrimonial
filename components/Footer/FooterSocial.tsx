import {Container, Row, Col} from "react-bootstrap";
import classes from "./Footer.module.scss";
import {FaFacebookSquare, FaApple, FaInstagram, FaTwitter} from "react-icons/fa";

const FooterSocial = () =>{
    return(
        <>
        <div className={classes.Footer_dark_strip}>
                <Container className="w-75 px-0">
                    <Row>
                        <Col sm={12} md={4}>
                            <h4>App available on</h4>
                            <div className={classes.social_icons}>
                                <FaFacebookSquare className="me-2"/>
                                <FaApple/>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <h4>Follow us on</h4>
                            <div className={classes.social_icons}>
                                <FaFacebookSquare className="me-2"/>
                                <FaInstagram className="me-2"/>
                                <FaTwitter/>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <h4>Customer Service</h4>
                            <a href="#">help@matrimonial.com</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default FooterSocial;