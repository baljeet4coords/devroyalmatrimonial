import { Container, Row, Col, Image } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader/Loginheader";
import ProfileCard from "../../components/ProfileCard";
import classes from "./ProfileMatch.module.scss";
import React from 'react';
import { Footer } from "../../components";




const ProfileMatch: React.FC = () => {
    return(
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                    <LoginHeader />
                </Container>
                <ProfileCard />
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default ProfileMatch;