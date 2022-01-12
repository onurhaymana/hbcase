import { SORTING_FILTERS } from "../app-consts";

export const sorter = (sortBy) => (a, b) => {
  const sortingCriteria = SORTING_FILTERS[sortBy];

  if (SORTING_FILTERS.NEWEST_FIRST === sortingCriteria) {
    return a.createdDate > b.createdDate ? 1 : -1;
  } else if (SORTING_FILTERS.OLDEST_FIRST === sortingCriteria) {
    return a.createdDate < b.createdDate ? 1 : -1;
  } else if (SORTING_FILTERS.PRICE_ASCENDING === sortingCriteria) {
    return a.salePrice > b.salePrice ? 1 : -1;
  } else if (SORTING_FILTERS.PRICE_DESCENDING === sortingCriteria) {
    return a.salePrice < b.salePrice ? 1 : -1;
  } else {
    return a.id > b.id ? 1 : -1;
  }
};

export const paginator = (arr) => {
  return arr.reduce(
    (r, e, i) => (i % 12 ? r[r.length - 1].push(e) : r.push([e])) && r,
    []
  );
};

export const flattenArray = (arr) => {
  return [].concat.apply([], arr);
};

export const priceFormat = (value, prefix = "", suffix = " TL") =>
  `${prefix}${value.toFixed(2).replace(".", ",")}${suffix}`;
