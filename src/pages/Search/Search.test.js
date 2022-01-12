import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";

import { Provider } from "react-redux";
import { findByTestAttribute, mockStore } from "../../test";
import { TEST_CASES } from "../../app-consts";

import Search from "./index";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (initialState = {}, props) => {
  const store = mockStore(initialState);
  return mount(
    <Provider store={store}>
      <Search {...props} />
    </Provider>
  );
};

describe("unit and snapshot tests for search page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ cartReducer: { cart: TEST_CASES.MOCK_PRODUCTS } });
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("should render non-empty component", () => {
    const inputComponent = findByTestAttribute(wrapper, "search-page-wrapper");
    expect(inputComponent.length).toBe(1);
  });
  it("should render search results bar component", () => {
    const inputComponent = findByTestAttribute(
      wrapper,
      "search-results-bar-component"
    );
    expect(inputComponent).toBeDefined();
  });
  it("should render filtering panel component", () => {
    const inputComponent = findByTestAttribute(
      wrapper,
      "filtering-panel-component"
    );
    expect(inputComponent).toBeDefined();
  });
  it("should render products component", () => {
    const inputComponent = findByTestAttribute(wrapper, "products-component");
    expect(inputComponent).toBeDefined();
  });
});
