import React from "react";
import ReactDOM from "react-dom";
import FilteringPanel from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttribute, mockStore } from "../../test";
import { Provider } from "react-redux";
import { TEST_CASES } from "../../app-consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const initialStateObj = {
  productsReducer: { ...TEST_CASES.PRODUCTS_INITIAL_STATE },
};
const setup = (store, props) => {
  return mount(
    <Provider store={store}>
      <FilteringPanel {...props} />
    </Provider>
  );
};

describe("unit and snapshot tests for filtering panel", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore({ ...initialStateObj });
    wrapper = setup(store);
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render 4 sorting filters", () => {
    expect(
      findByTestAttribute(wrapper, "filtering-panel-sorting-item")
    ).toHaveLength(4);
  });
  it("should render 1 color filter", () => {
    expect(
      findByTestAttribute(wrapper, "filtering-panel-color-item")
    ).toHaveLength(1);
  });
  it("should render 1 brand filter", () => {
    expect(
      findByTestAttribute(wrapper, "filtering-panel-brand-item")
    ).toHaveLength(1);
  });
  it("should update state on brand filter click", () => {
    findByTestAttribute(wrapper, "filtering-panel-brand-item")
      .first()
      .simulate("click");
    const state = store.getState();
    expect(state.productsReducer.filters.brand).toEqual("samsung");
  });
  it("should update state on color filter click", () => {
    findByTestAttribute(wrapper, "filtering-panel-color-item")
      .first()
      .simulate("click");
    const state = store.getState();
    expect(state.productsReducer.filters.color).toEqual("Sarı");
  });
  it("should update state on sorting filter click", () => {
    findByTestAttribute(wrapper, "filtering-panel-sorting-item")
      .first()
      .simulate("click");
    const state = store.getState();
    expect(state.productsReducer.filters.sortBy).toEqual("PRICE_ASCENDING");
  });
});
