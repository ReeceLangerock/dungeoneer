import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, find, render, simulate } from "enzyme";
import enzymeSerializer from "enzyme-to-json/serializer";

import { DungeonTile } from "./../components/DungeonTile";

expect.addSnapshotSerializer(enzymeSerializer);
describe("DungeonTile", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DungeonTile />, div);
  });

  let component;
  let props;

  beforeEach(() => {
    props = {
      alive: true
    };
    component = mount(<DungeonTile {...props} />);
  });

  // it("receives an alive prop", () => {
  //   expect(component.props().alive).toEqual(true);
  // });

  it("matches snapshot", () => {
    const comp = shallow(<DungeonTile {...props} />);
    expect(comp).toMatchSnapshot();
  });
});
