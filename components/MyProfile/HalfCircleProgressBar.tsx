import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface MyProfileProgress {
  profileComplete?: number;
}

const HalfCircleProgressBar: React.FC<MyProfileProgress> = ({ profileComplete }) => {
  const percentage = profileComplete ? profileComplete : 0;
  return (
    <div style={{ width: 160, height: 160 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: "butt",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `rgba(216, 32, 32, ${percentage / 100})`,
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};
export default HalfCircleProgressBar;
