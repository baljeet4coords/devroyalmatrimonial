import React from 'react';
import classes from './MatchingDetails.module.scss'
import { Image } from 'react-bootstrap';

const MatchingDetails = () => {
    return (
        <div className={classes.MainWrapper}>
            <h3>Profile Comparison</h3>
            <div className={classes.ComparisonMain}>
                <div className={classes.ComparisonProfileInfo}>
                    <h4>Matching Field</h4>

                    <p><div></div> Age</p>
                    <p><div></div> Age</p>
                </div>
                <div className={classes.ComparisonProfile1}>
                    <h4>Your Profile</h4>
                    <p> 18-22</p>
                </div>
                <div className={classes.ComparisonProfile2}>
                    <h4>Rzayak Singh Oberoi</h4>

                    <div>
                        <Image src="./done.svg" width={23} height={23} alt="done" className="pe-1" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MatchingDetails