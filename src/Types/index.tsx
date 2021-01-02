export interface ButtonProps {
  //   children: React.ReactNode;
  onClick: (type: ButtonTypes) => void;
  type: ButtonTypes;
}
export type ButtonTypes = "stop" | "start" | "reset";
export interface Time {
  minutes: number;
  seconds: number;
  centiSeconds: number;
}
