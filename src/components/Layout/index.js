import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";

import "./layout.scss";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="content">
        <div className="content__container">{children}</div>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
