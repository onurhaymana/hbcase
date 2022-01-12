import React from "react";
import SelectBox from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttribute, checkProps } from "../../test";
import { SORTING_FILTERS } from "../../app-consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const defaultProps = {
  options: Object.keys(SORTING_FILTERS),
  onChange: jest.fn,
};
const setup = (props) => {
  return mount(<SelectBox {...props} {...defaultProps} />);
};

describe("unit and snapshot tests for selectbox", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should not render dropdown items", () => {
    expect(
      findByTestAttribute(wrapper, "selectbox-dropdown-item")
    ).toHaveLength(0);
  });

  it("should render 4 dropdown items", () => {
    findByTestAttribute(wrapper, "selectbox-button").first().simulate("click");
    expect(
      findByTestAttribute(wrapper, "selectbox-dropdown-item")
    ).toHaveLength(4);
  });

  it("should update state on dropdown click", () => {
    findByTestAttribute(wrapper, "selectbox-button").first().simulate("click");
    expect(findByTestAttribute(wrapper, "selectbox-dropdown").length).toBe(1);
  });

  it("should not throw warning with expected props", () => {
    checkProps(SelectBox, defaultProps);
  });
});
