import React from 'react'
import classes from "./PageHeading.module.scss";


interface HeadingProps{
    heading:string;
}


const PageHeading: React.FC<HeadingProps> = ({heading}) => {
    return (
        <div className={classes.headingContainer}>
            <p className={classes.PageHeading}>
                {heading}
            </p>
        </div>
    )
}

export default PageHeading