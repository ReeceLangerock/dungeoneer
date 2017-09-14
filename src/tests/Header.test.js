import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, find, render, simulate } from "enzyme";
import enzymeSerializer from "enzyme-to-json/serializer";

import { Header } from "./../components/Header";

expect.addSnapshotSerializer(enzymeSerializer);
describe("Header", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header />, div);
  });

  let component;
  let props;

  beforeEach(() => {
    props = {
      generationCount: 10
    };
    component = mount(<Header />);
  });

  it("matches snapshot", () => {
    const comp = shallow(<Header />);
    expect(comp).toMatchSnapshot();
  });
});
