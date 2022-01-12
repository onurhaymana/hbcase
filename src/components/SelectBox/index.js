import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./select-box.scss";

function SelectBox(props) {
  const { persistPlaceholder, placeholder, options, value } = props;

  const [showDropdown, setShowDropdown] = React.useState(false);

  const useClickOutside = (ref, callback) => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    });
  };

  const ref = useRef();
  useClickOutside(ref, ()=>setShowDropdown(false));

  const handleClick = (e, value = "") => {
    showDropdown && props.onChange(value);
    setShowDropdown(!showDropdown);
  };

  const dropdownItems = options.map((item, index) => {
    return (
      <li
        className={cx("select-box__dropdown-item", {
          "select-box__dropdown-item--selected": item.value === value,
        })}
        key={index}
        value={item.value}
        data-test="selectbox-dropdown-item"
        onClick={(e) => handleClick(e, item.value)}
      >
        {item.name}
      </li>
    );
  });

  return (
    <div className="select-box" ref={ref}>
      <div
        className="select-box__button"
        data-test="selectbox-button"
        onClick={(e) => setShowDropdown(!showDropdown)}
      >
        {persistPlaceholder ? placeholder : value}
        <img
          className="select-box__button-icon"
          src="/images/dropdown-icon.png"
          alt="arrow"
        />
      </div>
      {showDropdown && (
        <ul data-test="selectbox-dropdown" className="select-box__dropdown">
          {dropdownItems}
        </ul>
      )}
    </div>
  );
}

SelectBox.propTypes = {
  persistPlaceholder: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SelectBox.defaultProps = {
  persistPlaceholder: false,
};

export default SelectBox;
