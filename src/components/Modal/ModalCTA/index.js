import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./modal-cta.scss";

function ModalCTA(props) {
  const { children, className } = props;

  return (
    <div
      className={cx("modal__cta", className)}
      style={{ gridTemplateColumns: `repeat(${children?.length}, auto)` }}
    >
      {children}
    </div>
  );
}

ModalCTA.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

export default ModalCTA;
