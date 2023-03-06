import React from 'react';
import { Container} from "react-bootstrap";
import LoginrHeader from "../../components/LoginHeader/Loginheader";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ProfileVisitor.module.scss";
import { Footer, Header } from "../../components";
import { isLogin } from "../api/hello";
import ShortVisitorProfile from '../../components/ShortVisitorProfile';


const ProfileVisitor: React.FC = () => {
    return(
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                   {!isLogin ? <LoginrHeader /> : <Header />}
                </Container>
                <ShortVisitorProfile title={"0 All Profile Visitors"} subtitle={"People who visited your profile in the last week will appear here"} />
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default ProfileVisitor;