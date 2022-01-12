import React from "react";
import PropTypes from "prop-types";

import "./search-bar.scss";
import { connect } from "react-redux";
import { filterBySearch } from "../../../store/actions";

const SearchBar = (props) => {
  const { placeholder } = props;

  const [searchText, setSearchText] = React.useState("");
  const handleSearchText = (e) => {
    const input = e.target.value;
    setSearchText(input);
    if (input.length > 2) {
      props.filterBySearch(input);
    } else {
      props.filterBySearch("");
    }
  };
  return (
    <div>
      <input
        data-test="search-bar-input"
        className="search-bar"
        placeholder={placeholder}
        value={searchText}
        onChange={handleSearchText}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterBySearch: (text) => {
      dispatch(filterBySearch(text));
    },
  };
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: "Arama yap",
};

export default connect(null, mapDispatchToProps)(SearchBar);
