import React from "react";
import classes from "./index.module.css";
const Index: React.FC = () => {
  return (
    <div className={classes.root}>
      <div className={`neu-concave ${classes.circle}`}>
        <div className={classes.innerCircle}>
          <p className={classes.timeText}>00:04</p>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div className={`neu-convex ${classes.button}`}></div>
        <div className={`neu-concave ${classes.button}`}></div>
        <div className={`neu-concave ${classes.button}`}></div>
      </div>
    </div>
  );
};

export default Index;
