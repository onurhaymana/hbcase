export const MOCK_PRODUCT = {
  id: 1,
  title: "title",
  showcasePhoto: "photo link",
  createdDate: "date",
  brand: "samsung",
  color: "yellow",
  listingPrice: 3,
  salePrice: 1,
};

export const MOCK_PRODUCTS = [
  MOCK_PRODUCT,
  {
    ...MOCK_PRODUCT,
    id: 2,
    title: "product",
    brand: "apple",
    color: "red",
    salePrice: 2,
  },
];

export const MOCK_FILTERS = {
  searchText: "prod",
  brand: "samsund",
  color: "red",
  sortBy: "NEWEST_FIRST",
  currentPage: 2,
};

export const CART_INITIAL_STATE = {
  cart: [],
};

export const PRODUCTS_INITIAL_STATE = {
  allProducts: [],
  filteredProducts: [],
  filters: {
    searchText: "",
    brand: "",
    color: "",
    sortBy: "",
    currentPage: 1,
  },
  brands: {
    samsung: "samsung",
  },
  colors: {
    Sarı: "Sarı",
  },
};
