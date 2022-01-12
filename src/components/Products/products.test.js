import React from "react";
import Products from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { findByTestAttribute, mockStore } from "../../test";
import { TEST_CASES } from "../../app-consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { PRODUCTS_INITIAL_STATE, MOCK_PRODUCTS } = TEST_CASES;

const initialStateObj = {
  productsReducer: {
    ...PRODUCTS_INITIAL_STATE,
    allProducts: MOCK_PRODUCTS,
    filteredProducts: [MOCK_PRODUCTS],
    filters: {
      ...PRODUCTS_INITIAL_STATE,
      currentPage: 0,
    },
  },
};

const setup = (initialState = { ...initialStateObj }, props) => {
  const store = mockStore(initialState);
  return mount(
    <Provider store={store}>
      <Products {...props} />
    </Provider>
  );
};

describe("unit and snapshot tests for products", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("should render 2 product cards", () => {
    expect(
      findByTestAttribute(wrapper, "products-card-wrapper").children().length
    ).toBe(2);
  });
});
