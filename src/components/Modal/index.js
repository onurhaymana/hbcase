import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import ModalHeader from "./ModalHeader";
import ModalCTA from "./ModalCTA";

import "./modal.scss";

import { createPortal } from "react-dom";

const Modal = (props) => {
  const { children, className } = props;

  const ModalContainer = (
    <div className={cx("modal", className)}>
      <div className="modal__overlay" />
      <div className="modal__content">{children}</div>
    </div>
  );

  return createPortal(ModalContainer, document.getElementById("portal-root"));
};

Modal.Header = ModalHeader;
Modal.CTA = ModalCTA;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
