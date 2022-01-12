/* eslint-disable eqeqeq */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPage } from "../../../store/actions";

import "./paginator.scss";

function Paginator(props) {
  const { filteredProducts, currentPage } = props;
  const pageCount = filteredProducts.length;

  const handleNext = () => {
    pageCount > currentPage + 1 && props.setPage(currentPage + 1);
  };

  const handlePrevious = () => {
    currentPage > 0 && props.setPage(currentPage - 1);
  };

  const handleSetPage = (page) => {
    props.setPage(page);
  };

  const pages = [...Array(pageCount).keys()].map((x) => ++x);

  const pageItems = pages.map((page, index) => {
    return (
      <div
        data-test={`paginator-page-item-${index + 1}`}
        className={`paginator-item ${currentPage + 1 == page ? 'active' : ''}`}
        onClick={() => handleSetPage(page - 1)}
        key={index}
      >
        {page}
      </div>
    );
  });
  return (
    <div className="paginator">
      <div
        data-test="paginator-previous"
        className="paginator-item"
        onClick={handlePrevious}
      >
        {"<"}
      </div>
      <div data-test="paginator-wrapper" className="paginator-wrapper">{pageItems}</div>
      <div
        data-test="paginator-next"
        className="paginator-item"
        onClick={handleNext}
      >
        {">"}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    filteredProducts: state.productsReducer.filteredProducts,
    currentPage: state.productsReducer.filters.currentPage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (page) => {
      dispatch(setPage(page));
    },
  };
};

Paginator.propTypes = {
  filteredProducts: PropTypes.array,
  currentPage: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);