import React from "react";
import PropTypes from "prop-types";

import "./image.scss";

const Image = (props) => {
  const { src, alt, width, height } = props;
  return (
    <div
      className="image"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img className="image__product" src={src} alt={alt} />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Image;
