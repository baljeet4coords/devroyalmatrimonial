import {Container, Row, Col} from "react-bootstrap";
import classes from "./Footer.module.scss";

const Footer_Rights = () => {
    return (
        <>
        <div className={`${classes.All_Rights} w-100`}>
            <Container>
                <Row>
                    <Col sm={12}>
                        <p>All rights reserved © 2016 Jeevansathi Internet Services.</p>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Footer_Rights;