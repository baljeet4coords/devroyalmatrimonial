import Carousel from "react-bootstrap/Carousel";
import {Image, Container, Row, Col} from "react-bootstrap";
import classes from "./Footer.module.scss";

const Footer_Client = () => {
    return (
        <>
        <Container>
            <Carousel className={`${classes.carousel_pos} w-50 m-auto`}>
                <Carousel.Item>
                    <Row>
                        <Col sm={12} className="d-flex justify-content-center">
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                        </Col>
                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row>
                        <Col sm={12} className="d-flex justify-content-center">
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                        </Col>
                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row>
                        <Col sm={12} className="d-flex justify-content-center">
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                            <Image src="./Images/office-paperclip.png" className={classes.client_Image}/>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
        </Container>
    </>
    )
}

export default Footer_Client;