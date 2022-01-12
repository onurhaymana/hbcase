import React from "react";
import SearchBar from "./SearchBar";

import "./header.scss";
import Cart from "./Cart";

const Header = () => {
  return (
    <div className="header">
      <div className="header__wrapper">
        <img
          alt="hepsiburada logo"
          src="images/logo.png"
          className="header__logo"
        />
        <SearchBar placeholder="25 milyon’dan fazla ürün içerisinde ara" />
        <Cart />
      </div>
    </div>
  );
};

export default Header;
