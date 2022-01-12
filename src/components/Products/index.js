import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./products.scss";
import ProductCard from "./ProductCard";
import { connect } from "react-redux";
import { setFilteringCategories } from "../../store/actions";
import Paginator from "./Paginator";

const Products = (props) => {
  const { filteredProducts, currentPage } = props;

  useEffect(() => {
    filteredProducts[currentPage] && props.setFilteringCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts]);

  const productCards = filteredProducts[currentPage]?.map((product, index) => {
    return <ProductCard key={index} product={product} />;
  });

  const isThereNoItems = filteredProducts[0]?.length === 0 || filteredProducts.length === 0

  return (
    <div>
      <div data-test="products-card-wrapper" className="products__cards">
        {productCards}
      </div>
      { !isThereNoItems && <Paginator />}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    filteredProducts: state.productsReducer.filteredProducts,
    currentPage: state.productsReducer.filters.currentPage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFilteringCategories: () => {
      dispatch(setFilteringCategories());
    },
  };
};
Products.propTypes = {
  data: PropTypes.array,
  currentPage: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
