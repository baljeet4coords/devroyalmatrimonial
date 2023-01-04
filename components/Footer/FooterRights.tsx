import {Container, Row, Col} from "react-bootstrap";
import classes from "./Footer.module.scss";

const FooterRights = () => {
    return (
        <>
        <div className={`${classes.All_Rights} w-100`}>
            <Container>
                <Row>
                    <Col sm={12}>
                        <p>All rights reserved © 2023 Royal Matrimonial.</p>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default FooterRights;