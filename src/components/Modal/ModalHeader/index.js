import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./modal-header.scss";

function ModalHeader(props) {
  const { title, className } = props;

  return <div className={cx("modal__header", className)}>{title}</div>;
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ModalHeader;
