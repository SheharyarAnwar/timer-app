import React from "react";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import Button from "./index";
import ReactDOM from "react-dom";
import { ReactComponent as Play } from "../../Assets/play.svg";
import { ReactComponent as Pause } from "../../Assets/pause.svg";
import { ReactComponent as Reset } from "../../Assets/reset.svg";
let container: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
let mounted: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
const buttonComp = (
  <Button
    children={<Play /> || <Pause /> || <Reset />}
    onClick={jest.fn()}
    type={"reset" || "start" || "reset"}
  />
);
beforeEach(() => {
  container = shallow(buttonComp);
  mounted = mount(buttonComp);
});
afterEach(() => {
  mounted.unmount();
});
describe("Button", () => {
  it("Renders Without Crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(buttonComp, div);
  });
  it("Should Render One Div", () => {
    expect(container.find("div").length).toBe(1);
  });
  it("Div Should Have One SVG as Child", () => {
    expect(container.find("div").children.length).toBe(1);
    expect(mounted.find("svg").length).toBe(1);
  });
  it("Should Recieve SVG As Prop Child", () => {
    expect(container.prop("children")).toStrictEqual(
      <Play /> || <Reset /> || <Pause />
    );
  });
});
