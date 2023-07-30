import React, { useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { Footer, Header, LoginHeader } from '../../components';
import classes from "./MemberShipCheckout.module.scss";
import { getUserId } from '../../ducks/auth/selectors';
import { useSelector } from 'react-redux';
import { MemberShipCardContent } from '../../constants/MembershipCard';
import { useRouter } from 'next/router';
import MembershipCard from '../../components/MemberShipCard/MembershipCard';

interface cardType {
    id: number,
    cardlogo: string,
    Bestoffer: boolean,
    title: string,
    price: number,
    durrations: string,
    featurs: string[]
    colorValue: string[]
}


const MemberShipCheckout = () => {
    const router = useRouter();
    const userId = useSelector(getUserId);
    const [card, setCard] = useState<any>();
    const { packagetype } = router.query;
    const taxes = 110;
    const gst = 60;

    useEffect(() => {
        packagetype && MemberShipCardContent.map((card) => {
            if (card.title === packagetype) {
                setCard(card)
            }
        })
    }, [packagetype])

    return (
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                    {userId ? <LoginHeader /> : <Header />}
                </Container>
                <div className={classes.card_container}>
                    <div className={classes.card_left}>
                        {card && <MembershipCard card={card} key={card.id} isUpgrade={false} />}
                    </div>

                    <div className={classes.card_right}>
                        <div className={classes.CheckoutImgSec}>
                            <Image className={classes.ImageCheckout} src={'/Images/membership-checkout-plane.png'} alt='membership-checkout-plane' />
                        </div>
                        <div className={classes.CheckoutDetails}>
                            <div className={classes.CheckoutDetailsDiv}>
                                <p>SubTotal : </p>
                                <span>{card?.price} <span className={classes.CheckoutDetailsDurations}>/ Rs</span>  </span>
                            </div>
                            <div className={classes.CheckoutDetailsDiv}>
                                <p>Texs : </p>
                                <span>{taxes}<span className={classes.CheckoutDetailsDurations}>/ Rs</span>  </span>
                            </div>
                            <div className={classes.CheckoutDetailsDiv}>
                                <p>Gst : </p>
                                <span>{gst} <span className={classes.CheckoutDetailsDurations}>/ Rs</span>  </span>
                            </div>
                            <div className={classes.CheckoutDetailsTotal}>
                                <p>Total : </p>
                                <span>
                                    {card?.price + gst + taxes}
                                    <span className={classes.CheckoutDetailsDurations}>/ Rs</span>  </span>
                            </div>
                        </div>
                        <div className={classes.buttonSections}>
                            <button className={classes.customButton} onClick={() => { }}>
                                Proceed
                            </button>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default MemberShipCheckout