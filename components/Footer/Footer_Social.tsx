import {Container, Row, Col, Image} from "react-bootstrap";
import classes from "./Footer.module.scss";


const Footer_Social = () =>{
    return(
        <>
        <div className={classes.Footer_dark_strip}>
                <Container className="w-75 px-0">
                    <Row>
                        <Col sm={12} md={4} className={classes.Footer_lg_col}>
                            <h4>App available on</h4>
                        </Col>
                        <Col sm={12} md={4} className={classes.Footer_lg_col}>
                            <h4>Follow us on</h4>
                        </Col>
                        <Col sm={12} md={4} className={classes.Footer_lg_col}>
                            <h4>Customer Service</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Footer_Social;