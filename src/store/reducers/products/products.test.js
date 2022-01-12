import productsReducer from "./index";
import { paginator } from "../../../utils";

import {
  FILTER_BY_CATEGORY,
  FILTER_BY_SEARCH,
  GET_ALL_PRODUCTS,
  SET_FILTERING_CATEGORIES,
  SET_PAGE,
  SORT_BY_FILTER,
  TEST_CASES,
} from "../../../app-consts";
const { PRODUCTS_INITIAL_STATE, MOCK_PRODUCTS } = TEST_CASES;

const state = {
  ...PRODUCTS_INITIAL_STATE,
  allProducts: MOCK_PRODUCTS,
  filteredProducts: [MOCK_PRODUCTS],
};

describe("unit tests for products reducer", () => {
  it("should return initial state object when state and action is undefined", () => {
    expect(productsReducer(undefined, {})).toEqual({
      ...PRODUCTS_INITIAL_STATE,
      filters: { ...PRODUCTS_INITIAL_STATE.filters, currentPage: 0 },
      brands: {},
      colors: {}
    });
  });

  it("should update the state by storing all the products in store", () => {
    const expectedAction = {
      type: GET_ALL_PRODUCTS,
      payload: { products: MOCK_PRODUCTS },
    };

    expect(productsReducer(PRODUCTS_INITIAL_STATE, expectedAction)).toEqual({
      ...PRODUCTS_INITIAL_STATE,
      allProducts: MOCK_PRODUCTS,
      filteredProducts: paginator(MOCK_PRODUCTS),
    });
  });

  it("should update the state by setting categories", () => {
    const expectedAction = {
      type: SET_FILTERING_CATEGORIES,
    };

    expect(productsReducer(state, expectedAction)).toEqual({
      ...state,
      brands: { apple: 1, samsung: 1 },
      colors: { red: 1, yellow: 1 },
    });
  });

  it("should update the state by filtering by search text", () => {
    const expectedAction = {
      type: FILTER_BY_SEARCH,
      payload: "prod",
    };

    expect(productsReducer(state, expectedAction)).toEqual({
      ...state,
      filteredProducts: [[MOCK_PRODUCTS[1]]],
      filters: { ...state.filters, searchText: "prod", currentPage: 0 },
    });
    expect(
      productsReducer(state, expectedAction).filteredProducts[0]
    ).toHaveLength(1);
  });

  it("should update the state by filtering by category", () => {
    const filters = { brand: "samsung", color: "" };
    const expectedAction = {
      type: FILTER_BY_CATEGORY,
      payload: filters,
    };

    expect(productsReducer(state, expectedAction)).toEqual({
      ...state,
      filteredProducts: [[MOCK_PRODUCTS[0]]],
      filters: { ...state.filters, ...filters, currentPage: 0 },
    });

    expect(
      productsReducer(state, expectedAction).filteredProducts[0]
    ).toHaveLength(1);
  });

  it("should update the state by sorting by filter", () => {
    const sortBy = "PRICE_DESCENDING";
    const expectedAction = {
      type: SORT_BY_FILTER,
      payload: sortBy,
    };

    expect(productsReducer(state, expectedAction)).toEqual({
      ...state,
      filteredProducts: [[...MOCK_PRODUCTS].reverse()],
      filters: { ...state.filters, sortBy },
    });
    expect(
      productsReducer(state, expectedAction).filteredProducts[0]
    ).toHaveLength(2);
  });

  it("should update the state by setting the page", () => {
    const page = 5;
    const expectedAction = {
      type: SET_PAGE,
      payload: page,
    };

    expect(productsReducer(state, expectedAction)).toEqual({
      ...state,
      filters: { ...state.filters, currentPage: page },
    });
  });
});
