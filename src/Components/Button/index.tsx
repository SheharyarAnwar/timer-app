import React from "react";
import { ButtonProps } from "../../Types";
import classes from "./index.module.css";

const Index: React.FC<ButtonProps> = ({ children, onClick, type, style }) => {
  return (
    <div onClick={() => onClick(type)} className={`${style} ${classes.button}`}>
      {children}
    </div>
  );
};
Index.displayName = "Button";
export default Index;
