import React from 'react';
import classes from './MatchingDetails.module.scss'
import { Image } from 'react-bootstrap';

const MatchingDetails = () => {
    return (
        <div className={classes.MainWrapper}>
            <h3>Profile Comparison</h3>
            <div className={classes.ComparisonMain}>
                <div className={classes.ComparisonProfile1}>
                    {/* <Image className={classes.ComparisonProfile} src='https://beta.royalmatrimonial.com/api/uploads/365/1682857042000.jpeg' alt='yourprofile' />
                    <h4>Divyani Pahwa</h4> */}
                </div>
                <div className={classes.ComparisonProfileInfo}>
                </div>
                <div className={classes.ComparisonProfile2}>
                    {/* <Image className={classes.ComparisonProfile} src='https://beta.royalmatrimonial.com/api/uploads/404/1685780330725.jpeg' alt='yourprofile' />
                    <h4>Munna Bhiya</h4> */}
                </div>
            </div>

        </div>
    )
}

export default MatchingDetails