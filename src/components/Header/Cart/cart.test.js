import React, {ReactPortal} from "react";
import ReactDOM from "react-dom";
import Cart from "./index";

import Enzyme, { mount, ReactWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttribute, mockStore } from "../../../test";
import { Provider } from "react-redux";
import { TEST_CASES } from "../../../app-consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { MOCK_PRODUCTS, MOCK_PRODUCT } = TEST_CASES;
const defaultProps = {
  product: { ...MOCK_PRODUCT },
};

const initialStateObj = {
  cartReducer: { cart: [...MOCK_PRODUCTS] },
};

const setup = (store, props) => {  
  return mount(
    <Provider store={store}>
      <Cart {...props} {...defaultProps} />
    </Provider>
  );
};

describe("unit and snapshot tests for cart", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore({ ...initialStateObj });
    wrapper = setup(store);
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render 2 cart items", () => {
    findByTestAttribute(wrapper, "cart-wrapper").first().simulate("mouseOver");
    expect(findByTestAttribute(wrapper, "cart-item")).toHaveLength(2);
  });
});
