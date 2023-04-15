import { Col } from "react-bootstrap";
import React, { useEffect } from "react";
import classes from "./RightSection.module.scss";
import HalfCircleProgressBar from "../../../../components/MyProfile/HalfCircleProgressBar";
import { useDispatch } from "react-redux";
import { step5 } from "../../../../ducks/regiserUser/step5/actions";
import { useSelector } from "react-redux";
import { getUserId } from "../../../../ducks/auth/selectors";
import { selectStep5Success } from "../../../../ducks/regiserUser/step5/selectors";
import { selectStep4Success } from "../../../../ducks/regiserUser/step4/selectors";
import { selectStep3Success } from "../../../../ducks/regiserUser/step3/selectors";
import { selectStep2Success } from "../../../../ducks/regiserUser/step2/selectors";
import { selectStep1Success } from "../../../../ducks/regiserUser/step1/selectors";
import { step4 } from "../../../../ducks/regiserUser/step4/actions";
import { step3 } from "../../../../ducks/regiserUser/step3/actions";
import { step2 } from "../../../../ducks/regiserUser/step2/actions";
import { step1 } from "../../../../ducks/regiserUser/step1/actions";


const RightSection: React.FC = () => {


  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const stepFiveDefaultValues = useSelector(selectStep5Success);
  const jsonData5 = stepFiveDefaultValues;

  const stepFourDefaultValues = useSelector(selectStep4Success);
  const jsonData4 = stepFourDefaultValues;

  const stepThreeDefaultValues = useSelector(selectStep3Success);
  const jsonData3 = stepThreeDefaultValues;

  const stepTwoDefaultValues = useSelector(selectStep2Success);
  const jsonData2 = stepTwoDefaultValues;

  const stepOneDefaultValues = useSelector(selectStep1Success);
  const jsonData1 = stepOneDefaultValues;

  useEffect(() => {
    dispatch(step5({ actionType: "v", userId: userId }));
    dispatch(step4({ actionType: "v", userId: userId }));
    // dispatch(step3({ actionType: "v", userId: userId })); 
    // dispatch(step2({ actionType: "v", userId: userId }));
    // dispatch(step1({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);

  let profileComplete;

  console.log(jsonData5, jsonData4, jsonData3, jsonData2, jsonData1);
  if (jsonData5 !== (null) && jsonData5.jsonResponse != null) {
    profileComplete = 100;
    console.log(jsonData5, "jsonData5");
  } else if (jsonData4 !== (null) && jsonData4.jsonResponse != null) {
    profileComplete = 80;
    console.log(jsonData4, "jsonData4");
  } else if (jsonData3 !== (null) && jsonData3.jsonResponse != null) {
    profileComplete = 60;
    console.log(jsonData3, "jsonData3");
  } else if (jsonData2 !== (null) && jsonData2.jsonResponse != null) {
    profileComplete = 40;
    console.log(jsonData2, "jsonData2");
  } else if (jsonData1 !== null && jsonData1.jsonResponse != null) {
    profileComplete = 20;
    console.log(jsonData1, "jsonData1");
  } else {
    profileComplete = 0;
  }





  return (
    <Col sm={12} md={2} className={classes.right_section}>
      <HalfCircleProgressBar profileComplete={profileComplete} />
      <h3 className="mt-3">WHY REGISTER</h3>
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
