import { Col } from "react-bootstrap";
import React from "react";
import classes from "./RightSection.module.scss";
import HalfCircleProgressBar from "../../../../components/MyProfile/HalfCircleProgressBar";

interface RightSectionProps {
  profileComplete: number;
  title?: string;
}

const RightSection: React.FC<RightSectionProps> = ({
  profileComplete,
  title,
}) => {
  return (
    <Col sm={12} md={2} className={classes.right_section}>
      {/* <h3 className="my-3">Profile Completion</h3>
      <HalfCircleProgressBar profileComplete={profileComplete} /> */}
      <h6 className="my-4">{title}</h6>
      <h3 className="my-3">WHY REGISTER</h3>
      <i className={classes.icon1}></i>
      <span>Lakhs of Genuine Profiles</span>
      <i className={classes.icon2}></i>
      <span>Many Verified by Personal Visit</span>
      <i className={classes.icon3}></i>
      <span>Secure & Family Friendly</span>
      <i className={classes.icon4}></i>
      <span>Strict Privacy Control</span>
    </Col>
  );
};

export default RightSection;
