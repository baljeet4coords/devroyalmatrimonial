import React from 'react';
import { Container } from 'react-bootstrap';
import { Footer, Header, LoginHeader } from '../../components';
import classes from "./MembershipPricing.module.scss";
import MembershipCard from '../../components/MemberShipCard/MembershipCard';
import { getUserId } from '../../ducks/auth/selectors';
import { useSelector } from 'react-redux';

const MembershipPricing = () => {
  const userId = useSelector(getUserId);

    return (
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                {userId ? <LoginHeader /> : <Header />}
                </Container>
                <div className={classes.card_container}>
                    <MembershipCard />
                    <MembershipCard />
                    <MembershipCard />
                    <MembershipCard />
                    <MembershipCard />
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default MembershipPricing