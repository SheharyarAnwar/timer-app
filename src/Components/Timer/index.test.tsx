import Timer from "./index";
import { shallow } from "enzyme";
import React from "react";

const container = shallow(<Timer />);
describe("Timer", () => {
  it("Should have 3 instances of Button", () => {
    // console.log(container.debug());
    expect(container.find("Button").length).toEqual(3);
  });
});
