import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, find, render, simulate } from "enzyme";
import enzymeSerializer from "enzyme-to-json/serializer";

import { PlayerInfoContainer } from "./../components/PlayerInfoContainer";

expect.addSnapshotSerializer(enzymeSerializer);
describe("PlayerInfoContainer", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<PlayerInfoContainer />, div);
  });

  let component;
  let props;

  beforeEach(() => {
    props = {
      level: 0,
      dungeon: 0,
      attack: 7,
      weapon: "stick"
    };
    component = mount(<PlayerInfoContainer {...props} />);
  });

  // it('displays correct generation count', () => {
  //   expect(component.text()).toEqual('10')
  // })

  it('receives a correct props', () => {
    expect(component.props().level).toEqual(0)
    expect(component.props().dungeon).toEqual(0)
    expect(component.props().attack).toEqual(7)
    expect(component.props().weapon).toEqual('stick')
  })

  it("matches snapshot", () => {
    const comp = shallow(<PlayerInfoContainer {...props} />);
    expect(comp).toMatchSnapshot();
  });
});
