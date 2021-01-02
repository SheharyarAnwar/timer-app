import Timer from "./index";
import { mount, ReactWrapper, shallow } from "enzyme";
import React from "react";
import { debug } from "console";

describe("Timer", () => {
  let container: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    return (container = mount(<Timer />));
  });
  afterEach(() => container.unmount());
  it("invokes startTimer when the start button is clicked", () => {
    const spy = jest.spyOn(console, "log");
    container
      .find("Button")
      .findWhere((n) => n.prop("type") === "start")
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith("started-timer");
  });
  it("invokes stop when the stop button is clicked", () => {
    const spy = jest.spyOn(console, "log");
    container
      .find("Button")
      .findWhere((n) => n.prop("type") === "stop")
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith("stopped-timer");
  });
  it("invokes reset when the reset button is clicked", () => {
    const spy = jest.spyOn(console, "log");
    container
      .find("Button")
      .findWhere((n) => n.prop("type") === "reset")
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith("reseted-timer");
  });
});
