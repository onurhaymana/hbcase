import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { filterByCategory, sortByFilter } from "../../store/actions";
import { SORTING_FILTERS } from "../../app-consts";
import cx from "classnames";

import "./filtering-panel.scss";

const FilteringPanel = (props) => {
  const { filters, brandsList, colorsList } = props;
  const [activeFilters, setActiveFilters] = React.useState({ brand: "", color: "" });

  useEffect(() => {
    props.filterByCategory(activeFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

  const handleBrandSelection = (brand) =>
    setActiveFilters({
      ...activeFilters,
      brand: activeFilters.brand === brand ? "" : brand,
    });
  const handleColorSelection = (color) =>
    setActiveFilters({
      ...activeFilters,
      color: activeFilters.color === color ? "" : color,
    });

  const handleSortBy = (sortBy) =>
    props.sortByFilter(filters.sortBy === sortBy ? "" : sortBy);

  const brandItems =
    brandsList &&
    Object.keys(brandsList).map((brand) => {
      return (
        <li
          key={brand}
          data-test="filtering-panel-brand-item"
          className={cx("filtering-panel__category-list-item", {
            "filtering-panel__category-list-item--selected":
              activeFilters.brand,
          })}
          onClick={() => handleBrandSelection(brand)}
        >{`${brand} (${brandsList[brand]})`}</li>
      );
    });

  const colorItems =
    colorsList &&
    Object.keys(colorsList).map((color) => {
      return (
        <li
          key={color}
          data-test="filtering-panel-color-item"
          className={cx("filtering-panel__category-list-item", {
            "filtering-panel__category-list-item--selected":
              activeFilters.color,
          })}
          onClick={() => handleColorSelection(color)}
        >{`${color} (${colorsList[color]})`}</li>
      );
    });

  const sortingItems = Object.keys(SORTING_FILTERS).map((sort) => {
    return (
      <li
        key={sort}
        data-test="filtering-panel-sorting-item"
        className={cx("filtering-panel__category-list-item", {
          "filtering-panel__category-list-item--selected":
            filters.sortBy === sort,
        })}
        onClick={() => handleSortBy(sort)}
      >{`${SORTING_FILTERS[sort]}`}</li>
    );
  });

  return (
    <div className="filtering-panel">
      <div className="filtering-panel__category">
        <div className="filtering-panel__category-title">Renk</div>
        <ul className="filtering-panel__category-list">{colorItems}</ul>
      </div>
      <div className="filtering-panel__category">
        <div className="filtering-panel__category-title">Sıralama</div>
        <ul className="filtering-panel__category-list">{sortingItems}</ul>
      </div>
      <div className="filtering-panel__category">
        <div className="filtering-panel__category-title">Marka</div>
        <ul className="filtering-panel__category-list">{brandItems}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.productsReducer.filters,
    brandsList: state.productsReducer.brands,
    colorsList: state.productsReducer.colors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterByCategory: (filters) => {
      dispatch(filterByCategory(filters));
    },
    sortByFilter: (sortBy) => {
      dispatch(sortByFilter(sortBy));
    },
  };
};
FilteringPanel.propTypes = {
  filters: PropTypes.object,
  brandsList: PropTypes.object,
  colorsList: PropTypes.object,
  sortByFilter: PropTypes.func,
  filterByCategory: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteringPanel);
