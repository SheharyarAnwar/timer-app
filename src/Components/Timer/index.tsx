import React, { useEffect, useMemo, useState } from "react";
import classes from "./index.module.css";
import Button from "../Button/index";
import { ReactComponent as Play } from "../../Assets/play.svg";
import { ReactComponent as Pause } from "../../Assets/pause.svg";
import { ReactComponent as Reset } from "../../Assets/reset.svg";
import { ButtonTypes } from "../../Types";

const dimensions = 30;
const svgProps = {
  width: dimensions,
  height: dimensions,
};
const Index: React.FC = () => {
  const [timerState, setTimerState] = useState<ButtonTypes>();
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [centiSeconds, setCentiSeconds] = useState<number>(0);

  const startTimer = () => {
    setMinutes(1);
    setSeconds(1);
    setCentiSeconds(1);
  };
  const stopTimer = () => {
    console.log("Stopped");
    setMinutes((prev) => prev);
    setSeconds((prev) => prev);
    setCentiSeconds((prev) => prev);
  };
  const resetTimer = () => {};

  const trimDisplayText = (val: number) => {
    return val.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  useEffect(() => {
    switch (timerState) {
      case "start":
        startTimer();
        break;
      case "stop":
        stopTimer();
        break;
      case "reset":
        resetTimer();
        break;
      default:
        return;
    }
  }, [timerState]);

  useEffect(() => {
    if (timerState === "stop") {
      return;
    }
    setTimeout(() => {
      setMinutes((prev) => prev + 1);
    }, 60000);
  }, [minutes, timerState]);
  useEffect(() => {
    if (timerState === "stop") {
      return;
    }
    if (seconds == 59) {
      setSeconds(0);
    }
    setTimeout(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, [seconds, timerState]);
  useEffect(() => {
    if (timerState === "stop") {
      return;
    }
    if (centiSeconds === 99) {
      setCentiSeconds(0);
    }
    setTimeout(() => {
      setCentiSeconds((prev) => prev + 1);
    }, 10);
  }, [centiSeconds, timerState]);

  const buttonClicked = (type: ButtonTypes) => {
    if (timerState === type) {
      return;
    }
    setTimerState(type);
  };

  const svgArray = useMemo(
    () => [
      <Play {...svgProps} />,
      <Pause {...svgProps} />,
      <Reset {...svgProps} />,
    ],
    []
  );
  const renderedButtonTypes: Array<ButtonTypes> = useMemo(
    () => ["start", "stop", "reset"],
    []
  );
  const renderButtons = renderedButtonTypes.map((val, i) => {
    return (
      <Button key={i} onClick={buttonClicked} type={val}>
        {svgArray[i]}
      </Button>
    );
  });
  return (
    <div className={classes.root}>
      <div className={`neu-concave ${classes.circle}`}>
        <div className={classes.innerCircle}>
          <p className={classes.timeText}>{`${trimDisplayText(
            minutes
          )}:${trimDisplayText(seconds)}:${trimDisplayText(centiSeconds)}`}</p>
        </div>
      </div>
      <div className={classes.buttonContainer}>{renderButtons}</div>
    </div>
  );
};
Index.displayName = "Timer";
export default Index;
