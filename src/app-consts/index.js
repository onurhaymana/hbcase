import * as testConsts from "./test-consts";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const SORT_BY_FILTER = "SORT_BY_FILTER";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_SEARCH = "FILTER_BY_SEARCH";
export const SET_PAGE = "SET_PAGE";

export const SET_FILTER = "SET_FILTER";
export const SET_FILTERING_CATEGORIES = "SET_FILTERING_CATEGORIES";

export const SORTING_FILTERS = {
  PRICE_ASCENDING: "En Düşük Fiyat",
  PRICE_DESCENDING: "En Yüksek Fiyat",
  NEWEST_FIRST: "En Yeniler (A-Z)",
  OLDEST_FIRST: "En Yeniler (Z-A)",
};

export const TEST_CASES = {
  ...testConsts,
};
