import React from "react";
import ProductCard from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttribute, mockStore, checkProps } from "../../../test";
import { Provider } from "react-redux";
import { TEST_CASES } from "../../../app-consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
  product: { ...TEST_CASES.MOCK_PRODUCT },
};

const initialStateObj = {
  cartReducer: { cart: [] },
};

const repeatNTimes = [Array(5).keys()];

const setup = (store, props) => {
  return mount(
    <Provider store={store}>
      <ProductCard {...props} {...defaultProps} />
    </Provider>
  );
};

describe("unit and snapshot tests for product card", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore({ ...initialStateObj });
    wrapper = setup(store);
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render add to cart button on hover", () => {
    findByTestAttribute(wrapper, "product-card-wrapper")
      .first()
      .simulate("mouseOver");
    expect(
      findByTestAttribute(wrapper, "product-card-add-to-cart").length
    ).toBe(1);
  });

  it("should update the cart when clicked to add to cart button", () => {
    findByTestAttribute(wrapper, "product-card-wrapper")
      .first()
      .simulate("mouseOver");
    findByTestAttribute(wrapper, "product-card-add-to-cart")
      .first()
      .simulate("click");

    const state = store.getState();
    expect(state.cartReducer.cart.length).toBe(1);
    expect(state.cartReducer.cart[0]).toEqual({ ...TEST_CASES.MOCK_PRODUCT });
  });
  it("should not add to the cart on multiple clicks", () => {
    findByTestAttribute(wrapper, "product-card-wrapper")
      .first()
      .simulate("mouseOver");
    repeatNTimes.forEach((i) =>
      findByTestAttribute(wrapper, "product-card-add-to-cart")
        .first()
        .simulate("click")
    );

    const state = store.getState();
    expect(state.cartReducer.cart.length).toBe(1);
    expect(state.cartReducer.cart[0]).toEqual({ ...TEST_CASES.MOCK_PRODUCT });
  });

  it("should not throw warning with expected props", () => {
    checkProps(ProductCard, defaultProps);
  });
});
