import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromCart } from "../../../store/actions";
import Image from "../../Image";
import cx from "classnames";
import Modal from "../../Modal";

import "./cart.scss";

const Cart = (props) => {
  const { cart } = props;

  const [showDropdown, setShowDropdown] = React.useState(false);
  const [modalState, setModalState] = React.useState({
    visible: false,
    productId: null,
    productTitle: null,
  });

  const handleMouseOver = (isOver) => setShowDropdown(isOver);

  const onRemoveFromCart = (productId, productTitle) =>
    setModalState({ visible: true, productId, productTitle });

  const handleRemoveFromCart = () => {
    props.removeFromCart(modalState.productId);
    setModalState({ visible: false, productId: null });
  };

  const handleModalCancel = () => {
    setModalState({ visible: false, productId: null });
  };

  const modal = modalState.visible && (
    <Modal>
      <Modal.Header title= {modalState.productTitle} />
      <p>
        Ürünü silmek istediğinize emin misiniz?
      </p>
      <Modal.CTA>
        <div className="cart__modal-cta-container">
          <div
            className="cart__modal-cta cart__modal-cta-success"
            onClick={handleRemoveFromCart}
            data-test="cart-modal-accept"
          >
            EVET
          </div>
          <div
            className="cart__modal-cta cart__modal-cta-error"
            onClick={handleModalCancel}
            data-test="cart-modal-decline"
          >
            HAYIR
          </div>
        </div>
      </Modal.CTA>
    </Modal>
  );

  const cartItems = cart?.map((product, idx) => {
    return (
      <div
        key={product.id}
        className="cart__container-item"
        data-test="cart-item"
      >
        <div className="cart__container-item-image">
          <Image
            src={product.showcasePhoto}
            alt={product.title}
            width={40}
            height={60}
          />
        </div>
        <div className="cart__container-item__box">
          <span className="cart__container-item__box-title">
            {product.title}
          </span>
          <div
            className="cart__container-item__box-button"
            onClick={() => onRemoveFromCart(product.id, product.title)}
            data-test={`cart-remove-item-${idx}`}
          >
            Kaldır
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div
        className={cx("cart", {
          "cart--empty-cart": cart.length === 0,
        })}
        onMouseOver={() => handleMouseOver(true)}
        onMouseLeave={() => handleMouseOver(false)}
        data-test="cart-wrapper"
      >
        {cart.length > 0 && <div className="cart-count">{cart.length}</div>}
        <div
          className={cx("cart-button", {
            "cart-button--hide-border": showDropdown,
          })}
        >
          Sepetim
        </div>
        {cart.length > 0 && showDropdown && (
          <div className="cart__container">
            <div className="cart__container-item__white-bar" />
            {cartItems}
          </div>
        )}
      </div>
      {modal}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => {
      dispatch(removeFromCart(id));
    },
  };
};

Cart.propTypes = {
  cart: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
