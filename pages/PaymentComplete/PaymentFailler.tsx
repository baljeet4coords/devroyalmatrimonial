import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Footer, Header, LoginHeader } from '../../components';
import classes from "./PaymentComplete.module.scss";
import { getUserId } from '../../ducks/auth/selectors';
import { useSelector } from 'react-redux';
import { MemberShipCardContent } from '../../constants/MembershipCard';



const PaymentSuccessfull = () => {
    const userId = useSelector(getUserId);

    return (
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                    {userId ? <LoginHeader /> : <Header />}
                </Container>
                <div className={classes.card_container}>
                    <div className={classes.card_main}>
                        <div className={classes.ImageSection}>
                            <video muted src="/Images/failed.mp4" typeof='video/mp4' autoPlay loop={true}></video>
                        </div>
                        <div className={classes.card_HeadingError}>
                            <h4>Your Payment Failed !!</h4>
                            <p>Something went wrong.</p>
                            <p>Please try again</p>
                        </div>
                    </div>
                    <div className={classes.card_Right}>
                        <Image src='/Images/payment-failer.svg' alt='succcessfullyimagedone' />
                    </div>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default PaymentSuccessfull
