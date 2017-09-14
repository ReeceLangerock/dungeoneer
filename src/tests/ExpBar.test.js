import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, find, render, simulate } from "enzyme";
import enzymeSerializer from "enzyme-to-json/serializer";

import { ExpBar } from "./../components/ExpBar";

expect.addSnapshotSerializer(enzymeSerializer);
describe("ExpBar", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ExpBar />, div);
  });

  let component;
  let props;

  beforeEach(() => {
    props = {
      currentHealth: 10,
      maxHealth: 100
    };
    component = mount(<ExpBar {...props} />);
  });

  it("displays correct current and max health", () => {
    expect(component.props().currentHealth).toEqual(10);
    expect(component.props().maxHealth).toEqual(100);
  });

  it("matches snapshot", () => {
    const comp = shallow(<ExpBar {...props} />);
    expect(comp).toMatchSnapshot();
  });
});
