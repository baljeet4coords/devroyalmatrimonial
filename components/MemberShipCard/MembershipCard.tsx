import React from "react";
import classes from "./MenbershipCard.module.scss";
import { Image } from "react-bootstrap";
import { BsCheck2, BsCheckCircle, BsStars } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import CustomButton from "../Button/CustomButton";
const MembershipCard = () => {
  return (
    <div className={classes.MCardContainer}>
      <div className={classes.MHeaderSec}>
        <Image src="/Images/exclusive.png" alt="pacage-type" />

        <div className={classes.MOfferType}>
          <BsStars className={classes.MOfferTypeImg} />
          <span>Best offer</span>
        </div>
      </div>
      <div className={classes.MCardHeadingSec}>
        <h3>Premium</h3>
        <p>For large team & corprate</p>
      </div>

      <div className={classes.MCardPriceSec}>
        <span className={classes.MCardPriceRS}>RS 2500</span>
        <span className={classes.MCardPriceDurrations}> / Per Month</span>
      </div>
      <hr />

      <div className={classes.MCardFeatureSec}>
        <p className={classes.MCardFeatureHeading}>Features</p>
        <div className={classes.MCardFeatureList}>
          <p>
            <FcCheckmark /> Browse Profiles{" "}
          </p>
          <p>
            <FcCheckmark />
            Shortlist & Send Interest{" "}
          </p>
          <p>
            <FcCheckmark />
            Message and chat with unlimited users{" "}
          </p>
          <p>
            <FcCheckmark />
            Get up to 3x more matches daily{" "}
          </p>
          <p>
            <FcCheckmark />
            Unlock access to advanced search{" "}
          </p>
          <p>
            <FcCheckmark /> View contact details
          </p>
          <p>
            <FcCheckmark />
            Make unlimited voice and video calls{" "}
          </p>
        </div>
      </div>

      <div  className={classes.MCardButtonSec}>
        <CustomButton onClick={() => { }}>
          Upgrade
        </CustomButton>

        <p>Contact Sale</p>
      </div>
    </div>
  );
};

export default MembershipCard;
