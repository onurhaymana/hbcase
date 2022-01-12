import {
  GET_ALL_PRODUCTS,
  FILTER_BY_SEARCH,
  FILTER_BY_CATEGORY,
  SORT_BY_FILTER,
  SET_FILTERING_CATEGORIES,
  SET_PAGE,
} from "../../../app-consts";

import { flattenArray, paginator, sorter } from "../../../utils";

const initialState = {
  allProducts: JSON.parse(localStorage.getItem("products")) || [],
  filteredProducts: paginator(
    JSON.parse(localStorage.getItem("products")) || []
  ),
  filters: {
    searchText: "",
    brand: "",
    color: "",
    sortBy: "",
    currentPage: 0,
  },
  brands: {},
  colors: {},
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      localStorage.setItem("products", JSON.stringify(action.payload.products));
      return {
        ...state,
        allProducts: action.payload.products,
        filteredProducts: paginator(action.payload.products),
      };
    case SET_FILTERING_CATEGORIES:
      return {
        ...state,
        brands: flattenArray(state.filteredProducts).reduce(function (r, a) {
          r[a.brand] = r[a.brand] || 0;
          r[a.brand] += 1;
          return r;
        }, Object.create(null)),
        colors: flattenArray(state.filteredProducts).reduce(function (
          obj,
          product
        ) {
          obj[product.color] = obj[product.color] || 0;
          obj[product.color] += 1;
          return obj;
        },
        Object.create(null)),
      };
    case FILTER_BY_SEARCH:
      return {
        ...state,
        filteredProducts: paginator(
          state.allProducts.filter(
            (product) =>
              product.title
                .toLowerCase()
                .includes(action.payload.toLowerCase()) &&
              (!!state.filters.brand
                ? state.filters.brand === product.brand
                : true) &&
              (!!state.filters.color
                ? state.filters.color === product.color
                : true)
          )
        ),
        filters: {
          ...state.filters,
          searchText: action.payload,
          currentPage: 0,
        },
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        filteredProducts: paginator(
          [...state.allProducts]
            .filter(
              (product) =>
                product.title
                  .toLowerCase()
                  .includes(state.filters.searchText.toLowerCase()) &&
                (!!action.payload.brand
                  ? action.payload.brand === product.brand
                  : true) &&
                (!!action.payload.color
                  ? action.payload.color === product.color
                  : true)
            )
            .sort(sorter(state.filters.sortBy))
        ),
        filters: { ...state.filters, ...action.payload, currentPage: 0 },
      };
    case SORT_BY_FILTER:
      return {
        ...state,
        filteredProducts: paginator(
          flattenArray(state.filteredProducts).sort(sorter(action.payload))
        ),
        filters: { ...state.filters, sortBy: action.payload },
      };
    case SET_PAGE:
      return {
        ...state,
        filters: { ...state.filters, currentPage: action.payload },
      };
    default:
      return state;
  }
};

export default productsReducer;
