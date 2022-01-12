import React from "react";
import Layout from "./index";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props) => {
  return shallow(<Layout {...props} />);
};

describe("snapshot test for header", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({children: <div>test</div>});
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
