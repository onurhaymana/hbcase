import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Layout from "../../components/Layout";
import productsData from "../../products.json";
import Products from "../../components/Products";
import { getAllProducts, setFilteringCategories } from "../../store/actions";
import { connect } from "react-redux";
import FilteringPanel from "../../components/FilteringPanel";
import SearchResultsBar from "../../components/SearchResultsBar";

import "./search.scss";

const Search = (props) => {
  useEffect(() => {
    props.getAllProducts(productsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout data-test="search-page-wrapper">
      <>
        <SearchResultsBar data-test="search-results-bar-component" />
        <div className="search__container">
          <FilteringPanel data-test="filtering-panel-component" />
          <Products data-test="products-component" />
        </div>
      </>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredProducts: state.productsReducer.filteredProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: (products) => {
      dispatch(getAllProducts(products));
    },
    setFilteringCategories: () => {
      dispatch(setFilteringCategories());
    },
  };
};
Search.propTypes = {
  filteredProducts: PropTypes.array,
  getAllProducts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
