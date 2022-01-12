import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttribute, mockStore } from "../../../test";
import { Provider } from "react-redux";
import { TEST_CASES } from "../../../app-consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const {PRODUCTS_INITIAL_STATE} = TEST_CASES

const initialStateObj = {
  productsReducer: {
    ...PRODUCTS_INITIAL_STATE,
  },
};

const defaultProps = {placeholder: "Testing is fun!"}

const repeatNTimes = [Array(5).keys()]
const setup = (store, props) => {
  return mount(
    <Provider store={store}>
      <SearchBar {...props} />
    </Provider>
  );
};

describe("unit and snapshot tests for search bar", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore({...initialStateObj});
    wrapper = setup(store, {...defaultProps});
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  
  it("should display placeholder prop", () => {
    expect(findByTestAttribute(wrapper, "search-bar-input").first().props().placeholder).toEqual(defaultProps.placeholder)
  });

  it("should update the state when more than 2 characters typed", () => {
    findByTestAttribute(wrapper, "search-bar-input").first().simulate('change', { target: { value: 'Tes' } })
    expect(
        store.getState().productsReducer.filters.searchText
    ).toEqual("Tes");

    findByTestAttribute(wrapper, "search-bar-input").first().simulate('change', { target: { value: 'Test' } })
    expect(
        store.getState().productsReducer.filters.searchText
    ).toEqual("Test");
  });
  
  it("should not update the state when less than or equal to 2 characters typed", () => {
    findByTestAttribute(wrapper, "search-bar-input").first().simulate('change', { target: { value: 'Te' } })
    expect(
        store.getState().productsReducer.filters.searchText
    ).toEqual("");
    findByTestAttribute(wrapper, "search-bar-input").first().simulate('change', { target: { value: 'T' } })
    expect(
        store.getState().productsReducer.filters.searchText
    ).toEqual("");
  });
  
});
