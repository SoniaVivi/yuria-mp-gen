import React, { useState } from "react";
import PropTypes from "prop-types";
import onOutsideClick from "./helpers/onOutsideClick";

const OptionsMenu = (props) => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div
      className={`dropdown-container ${props.className ?? ""} ${
        showEditor ? "active" : ""
      }`}
      onClick={() => setShowEditor((prevState) => !prevState)}
    >
      <span
        className={`no-select current clickable ${showEditor ? "active" : ""}`}
        onClick={(e) => {
          onOutsideClick(() => setShowEditor(false), e, "parent");
        }}
      >
        {props.current}
      </span>
      <div className={`dropdown ${showEditor ? "visible" : "hidden"}`}>
        {props.options
          .filter(
            (option) => option.toLowerCase() != props.current.toLowerCase()
          )
          .map((option) => (
            <button
              key={option}
              className="clickable"
              onClick={() => props.setOptionFunc(option)}
            >
              {option}
            </button>
          ))}
      </div>
    </div>
  );
};

export default OptionsMenu;

OptionsMenu.propTypes = {
  options: PropTypes.array.isRequired,
  setOptionFunc: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  className: PropTypes.string,
};
