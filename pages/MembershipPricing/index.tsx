import React from 'react';
import { Container } from 'react-bootstrap';
import { Footer, Header, LoginHeader } from '../../components';
import classes from "./MembershipPricing.module.scss";
import MembershipCard from '../../components/MemberShipCard/MembershipCard';
import { getUserId } from '../../ducks/auth/selectors';
import { useSelector } from 'react-redux';

const MemberShipCardContent = [
    {
        id: 1,
        cardlogo: '/Images/silver-membership.png',
        Bestoffer: true,
        title: 'Silver',
        price: 1500,
        durrations: 'Per Month',
        featurs: [
            'Browse Profiles.',
            'Shortlist & Send Interest.',
        ],
        colorValue: ['#b7bac670', '#b3b7c2']
    },
    {
        id: 2,
        cardlogo: '/Images/gold-membership.png',
        Bestoffer: false,
        title: 'Gold',
        price: 2500,
        durrations: 'Per Month',
        featurs: [
            'Browse Profiles.',
            'Shortlist & Send Interest.',
            'Message and chat with unlimited users.',
            'Get up to 3x more matches daily.',
        ],
        colorValue: ['#f0c75970', '#de952954']
    },
    {
        id: 3,
        cardlogo: '/Images/exclusive.png',
        Bestoffer: true,
        title: 'Premium',
        price: 5000,
        durrations: 'Per Month',
        featurs: [
            'Browse Profiles.',
            'Shortlist & Send Interest.',
            'Message and chat with unlimited users.',
            'Get up to 3x more matches daily.',
            'Unlock access to advanced search.',
            'View contact details.',
            'Make unlimited voice and video calls.'
        ],
        colorValue: ['#70e5fe70', '#55c1ed6b']
    },
]

const MembershipPricing = () => {
    const userId = useSelector(getUserId);

    return (
        <React.Fragment>
            <div className={classes.bg}>
                <Container fluid className={classes.background_header}>
                    {userId ? <LoginHeader /> : <Header />}
                </Container>
                <div className={classes.card_container}>
                    {
                        MemberShipCardContent.map((card) => {
                            return <MembershipCard card={card} key={card.id} />
                        })
                    }
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default MembershipPricing