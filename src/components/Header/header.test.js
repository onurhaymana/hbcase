import React from "react";
import Header from "./index";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props) => {
  return shallow(<Header {...props} />);
};

describe("snapshot test for header", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
