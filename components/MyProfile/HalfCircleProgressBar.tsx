import React, { useState, useEffect } from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";

const HalfCircleProgressBar: React.FC = () => {
  const [progressVal, setProgressVal] = useState<number>(35);

  return (
    <>
      <SemiCircleProgressBar
        stroke={"#50397a"}
        strokeWidth={20}
        percentage={progressVal}
        showPercentValue={true}
      />
    </>
  );
};
export default HalfCircleProgressBar;
