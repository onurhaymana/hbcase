import React from "react";
import ReactDOM from "react-dom";
import Paginator from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttribute, mockStore } from "../../../test";
import { Provider } from "react-redux";
import { TEST_CASES } from "../../../app-consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { PRODUCTS_INITIAL_STATE, MOCK_PRODUCTS } = TEST_CASES;

const initialStateObj = {
  productsReducer: {
    ...PRODUCTS_INITIAL_STATE,
    allProducts: MOCK_PRODUCTS,
    filteredProducts: [MOCK_PRODUCTS, MOCK_PRODUCTS, MOCK_PRODUCTS],
    filters: {
      ...PRODUCTS_INITIAL_STATE,
      currentPage: 1,
    },
  },
};

const repeatNTimes = [Array(5).keys()];
const setup = (store, props) => {
  return mount(
    <Provider store={store}>
      <Paginator {...props} />
    </Provider>
  );
};

describe("unit and snapshot tests for paginator", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore({ ...initialStateObj });
    wrapper = setup(store);
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render 3 pages", () => {
    expect(
      findByTestAttribute(wrapper, "paginator-wrapper").children()
    ).toHaveLength(3);
  });

  it("should update state on next page click", () => {
    findByTestAttribute(wrapper, "paginator-next").first().simulate("click");
    const state = store.getState();
    expect(state.productsReducer.filters.currentPage).toEqual(2);
  });
  it("should update state on previous page click", () => {
    findByTestAttribute(wrapper, "paginator-previous")
      .first()
      .simulate("click");
    const state = store.getState();
    expect(state.productsReducer.filters.currentPage).toEqual(0);
  });

  it("should not update state when on next click at last page", () => {
    repeatNTimes.forEach((_) =>
      findByTestAttribute(wrapper, "paginator-next").first().simulate("click")
    );
    const state = store.getState();
    expect(state.productsReducer.filters.currentPage).toEqual(2);
  });
  it("should not update state when on previous click at first page", () => {
    repeatNTimes.forEach((i) =>
      findByTestAttribute(wrapper, "paginator-previous")
        .first()
        .simulate("click")
    );
    const state = store.getState();
    expect(state.productsReducer.filters.currentPage).toEqual(0);
  });

  it("should update state when clicked on page item", () => {
    findByTestAttribute(wrapper, "paginator-page-item-3")
      .first()
      .simulate("click");
    expect(store.getState().productsReducer.filters.currentPage).toEqual(2);
    findByTestAttribute(wrapper, "paginator-page-item-1")
      .first()
      .simulate("click");
    expect(store.getState().productsReducer.filters.currentPage).toEqual(0);
  });
});
