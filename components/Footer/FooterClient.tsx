import Carousel from "react-bootstrap/Carousel";
import {Image, Container, Row, Col} from "react-bootstrap";
import classes from "./Footer.module.scss";

const FooterClient = () => {
    return (
        <>
        <Container>
            <Carousel className={`${classes.carousel_pos} w-50 m-auto`}>
                <Carousel.Item>
                    <Row>
                        <Col sm={12} className="d-flex justify-content-center">
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                        </Col>
                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row>
                        <Col sm={12} className="d-flex justify-content-center">
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                        </Col>
                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row>
                        <Col sm={12} className="d-flex justify-content-center">
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                            <Image src="./Images/99acres-logo.jpg" className={classes.client_Image} alt="clients"/>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
        </Container>
    </>
    )
}

export default FooterClient;