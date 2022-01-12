import React from "react";
import PropTypes from "prop-types";
import Image from "../../Image";
import cx from "classnames";

import "./product-card.scss";
import { connect } from "react-redux";
import { addToCart } from "../../../store/actions";
import { priceFormat } from "../../../utils";

const ProductCard = (props) => {
  const { product, cart } = props;
  const { id, showcasePhoto, title, brand, color, salePrice, listingPrice } =
    product;
  const is_discount = salePrice !== listingPrice;
  const discountRatio = Math.round(
    ((listingPrice - salePrice) / listingPrice) * 100
  );
  const isInCart = cart.some((product) => product.id === id);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const handleMouseOver = (isOver) => {
    setIsMouseOver(isOver);
  };

  return (
    <div
      key={id}
      data-test="product-card-wrapper"
      className="product-card"
      onMouseOver={() => handleMouseOver(true)}
      onMouseLeave={() => handleMouseOver(false)}
    >
      <div
        className={cx("product-card__image", {
          "product-card__image--hide-border": isMouseOver,
        })}
      >
        <Image src={showcasePhoto} alt={title} width={224} height={332} />
      </div>
      <div className="product-card__product">
        <div className="product-card__product-title">{title}</div>
        <div
          className={cx("product-card__product__properties", {
            "product-card__product__properties--hide": isMouseOver,
          })}
        >
          <div>
            <b>Marka:</b>&nbsp;{brand}
          </div>
          <div>
            <b>Renk:</b>&nbsp;{color}
          </div>
        </div>
        {isMouseOver ? (
          <div className="product-card__product__actions">
            <button
              data-test="product-card-add-to-cart"
              disabled={isInCart}
              onClick={(e) => props.addToCart(product)}
              className={cx("product-card__product__actions-button")}
            >
              {isInCart ? "Bu ürünü sepete ekleyemezsiniz." : "Sepete Ekle"}
            </button>
          </div>
        ) : (
          <div className="product-card__product__price">
            <div className="product-card__product__price-current">
              {priceFormat(salePrice, "TL")}
            </div>
            {is_discount && (
              <>
                <span className="product-card__product__price-old">
                  {priceFormat(listingPrice, "TL")}
                </span>
                <span className="product-card__product__price-discount">{`${discountRatio}%`}</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
  };
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isInCart: PropTypes.bool,
  cart: PropTypes.array,
};

ProductCard.defaultProps = {
  isInCart: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
