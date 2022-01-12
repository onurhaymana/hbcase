import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sortByFilter } from "../../store/actions";
import { SORTING_FILTERS } from "../../app-consts";

import SelectBox from "../SelectBox";
import "./search-results-bar.scss";

const SearchResultsBar = (props) => {
  const { filters } = props;

  const handleSortSelection = (sortBy) => {
    props.sortByFilter(sortBy);
  };

  return (
    <div className="search-results-bar">
      <div>
        <div className="search-results-bar-title">iPhone iOS cep telefonu</div>
        {filters.searchText && (
          <>
            <span className="search-results-bar-subtitle">
              Aranan Kelime:&nbsp;
            </span>
            <span className="search-results-bar-subtitle-text">
              {filters.searchText}
            </span>
          </>
        )}
      </div>
      <div>
        <SelectBox
          options={Object.keys(SORTING_FILTERS).map((sortBy) => ({
            value: sortBy,
            name: SORTING_FILTERS[sortBy],
          }))}
          persistPlaceholder
          placeholder="Sıralama"
          onChange={handleSortSelection}
          value={filters.sortBy}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.productsReducer.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sortByFilter: (sortBy) => {
      dispatch(sortByFilter(sortBy));
    },
  };
};
SearchResultsBar.propTypes = {
  filters: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsBar);
