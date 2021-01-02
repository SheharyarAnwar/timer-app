import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./index.module.css";
import Button from "../Button/index";
import { ReactComponent as Play } from "../../Assets/play.svg";
import { ReactComponent as Pause } from "../../Assets/pause.svg";
import { ReactComponent as Reset } from "../../Assets/reset.svg";
import { ButtonTypes, Time } from "../../Types";

const dimensions = 30;
const svgProps = {
  width: dimensions,
  height: dimensions,
};
const Index: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [timerState, setTimerState] = useState<ButtonTypes>();
  const [time, setTime] = useState<Time>({
    minutes: 0,
    seconds: 0,
    centiSeconds: 0,
  });
  const [timeOuts, setTimeOuts] = useState<any>();
  useLayoutEffect(() => {
    const toBeAnimated = [outerRef.current, innerRef.current];
    (toBeAnimated as any[]).forEach((val, i) => {
      val
        ?.animate(
          [
            {
              transform: "translateY(-100%) translateX(-50%) rotate(0deg)",
            },
            {
              transform: "translateY(-100%) translateX(-50%) rotate(360deg)",
            },
          ],
          {
            easing: "linear",
            iterations: Infinity,
            duration: i === 0 ? 1000 : 1000 * 60,
            pseudoElement: "::before",
          }
        )
        .pause();
    });
  }, []);

  const startTimer = () => {
    document.getAnimations().forEach((val) => val.play());
    const x = setInterval(() => {
      setTime((prev) => ({
        minutes: (prev.minutes + 0.01 / 60) % 60,
        seconds: (prev.seconds + 0.01) % 60,
        centiSeconds: (prev.centiSeconds + 1) % 100,
      }));
    }, 10);
    setTimeOuts(x);
  };
  const stopTimer = () => {
    window.clearInterval(timeOuts);
    document.getAnimations().forEach((val) => {
      val.pause();
    });
  };
  const resetTimer = () => {
    window.clearInterval(timeOuts);
    setTime({ seconds: 0, minutes: 0, centiSeconds: 0 });
    document.getAnimations().forEach((val) => val.cancel());
  };
  // console.log("rendered");
  const trimDisplayText = (val: number) => {
    const xNum = val.toString().split(".")[0];
    return parseInt(xNum).toLocaleString("en-US", {
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
  const renderButtons = useMemo(
    () =>
      renderedButtonTypes.map((val, i) => {
        const style = `neu-${val === timerState ? "convex" : "concave"}`;
        return (
          <Button key={i} onClick={buttonClicked} style={style} type={val}>
            {svgArray[i]}
          </Button>
        );
      }),
    [timerState]
  );
  return (
    <div className={classes.root}>
      <div ref={outerRef} className={`neu-concave ${classes.circle}`}>
        <div ref={innerRef} className={classes.innerCircle}>
          <p className={classes.timeText}>
            {`${trimDisplayText(time.minutes)}:${trimDisplayText(
              time.seconds
            )}:${trimDisplayText(time.centiSeconds)}`}
          </p>
        </div>
      </div>
      <div className={classes.buttonContainer}>{renderButtons}</div>
    </div>
  );
};
Index.displayName = "Timer";
export default Index;
