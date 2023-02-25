import { Container, Row, Col, Image } from "react-bootstrap";
import LoginrHeader from "../../components/LoginHeader/Loginheader";
import ProfileCard from "../../components/ProfileCard";
import classes from "./ProfileMatch.module.scss";
import React from 'react';




const ProfileMatch: React.FC = () => {
    return(
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                    <LoginrHeader />
                </Container>
                <ProfileCard />
            </div>
        </React.Fragment>
    )
}

export default ProfileMatch;