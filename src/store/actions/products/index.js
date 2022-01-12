import {
  GET_ALL_PRODUCTS,
  FILTER_BY_SEARCH,
  FILTER_BY_CATEGORY,
  SORT_BY_FILTER,
  SET_PAGE,
  SET_FILTERING_CATEGORIES,
} from "../../../app-consts";

export const getAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: products,
  };
};

export const setFilteringCategories = () => {
  return {
    type: SET_FILTERING_CATEGORIES,
  };
};

export const filterBySearch = (text) => {
  return {
    type: FILTER_BY_SEARCH,
    payload: text,
  };
};

export const filterByCategory = (filters) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: filters,
  };
};

export const sortByFilter = (sortBy) => {
  return {
    type: SORT_BY_FILTER,
    payload: sortBy,
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};
