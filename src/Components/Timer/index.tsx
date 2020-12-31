import React from "react";
import classes from "./index.module.css";
import { ReactComponent as Play } from "../../Assets/play.svg";
import { ReactComponent as Pause } from "../../Assets/pause.svg";
import { ReactComponent as Reset } from "../../Assets/reset.svg";
const dimensions = 30;
const Index: React.FC = () => {
  return (
    <div className={classes.root}>
      <div className={`neu-concave ${classes.circle}`}>
        <div className={classes.innerCircle}>
          <p className={classes.timeText}>00:04</p>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div className={`neu-convex ${classes.button}`}>
          <Play width={dimensions} height={dimensions} />
        </div>
        <div className={`neu-concave ${classes.button}`}>
          <Pause width={dimensions - 5} height={dimensions - 5} />
        </div>
        <div className={`neu-concave ${classes.button}`}>
          <Reset width={dimensions} height={dimensions} />
        </div>
      </div>
    </div>
  );
};

export default Index;
