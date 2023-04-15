import { Col } from "react-bootstrap";
import classes from "./RightSection.module.scss";
const RightSection: React.FC = () => {
  return (
    <Col sm={12} md={2} className={classes.right_section}>
      <Progress type="circle" strokeWidth={3} percent={70} />
      <h3>WHY REGISTER</h3>
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
