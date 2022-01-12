import {
  GET_ALL_PRODUCTS,
  FILTER_BY_SEARCH,
  FILTER_BY_CATEGORY,
  SORT_BY_FILTER,
  SET_PAGE,
  SET_FILTERING_CATEGORIES,
  TEST_CASES,
} from "../../../app-consts";
import {
  getAllProducts,
  setFilteringCategories,
  filterBySearch,
  filterByCategory,
  sortByFilter,
  setPage,
} from "./index";

const { MOCK_FILTERS, MOCK_PRODUCTS } = TEST_CASES;

describe("unit tests for product actions", () => {
  it("should create an action for getting all the products", () => {
    const expectedAction = {
      type: GET_ALL_PRODUCTS,
      payload: MOCK_PRODUCTS,
    };
    expect(getAllProducts(MOCK_PRODUCTS)).toEqual(expectedAction);
  });

  it("should create an action for setting filtering categories", () => {
    expect(setFilteringCategories().type).toEqual(SET_FILTERING_CATEGORIES);
  });

  it("should create an action for filtering by search", () => {
    const expectedAction = {
      type: FILTER_BY_SEARCH,
      payload: MOCK_FILTERS.searchText,
    };
    expect(filterBySearch(MOCK_FILTERS.searchText)).toEqual(expectedAction);
  });

  it("should create an action for filtering by category", () => {
    const filterObj = {
      brand: MOCK_FILTERS.brand,
      color: MOCK_FILTERS.color,
    };
    const expectedAction = {
      type: FILTER_BY_CATEGORY,
      payload: filterObj,
    };
    expect(filterByCategory(filterObj)).toEqual(expectedAction);
  });

  it("should create an action for sorting by filter", () => {
    const expectedAction = {
      type: SORT_BY_FILTER,
      payload: MOCK_FILTERS.sortBy,
    };
    expect(sortByFilter(MOCK_FILTERS.sortBy)).toEqual(expectedAction);
  });

  it("should create an action for setting page", () => {
    const expectedAction = {
      type: SET_PAGE,
      payload: MOCK_FILTERS.currentPage,
    };
    expect(setPage(MOCK_FILTERS.currentPage)).toEqual(expectedAction);
  });
});
