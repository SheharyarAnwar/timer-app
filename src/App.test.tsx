import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import ReactDOM from "react-dom";
import Timer from "./Components/Timer/index";
const container = shallow(<App />);
describe("App", () => {
  it("Renders Without Crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
  it("should render the Timer Component", () => {
    expect(container.containsMatchingElement(<Timer />)).toEqual(true);
  });
});
