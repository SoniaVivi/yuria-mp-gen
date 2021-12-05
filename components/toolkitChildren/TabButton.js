import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/Toolkit.module.scss";

const TabButton = (props) => {
  return (
    <button
      className={`${style.tab} ${
        props.activeTab == props.tabName.toLowerCase()
          ? style["active-tab"]
          : null
      }`}
      onClick={() => props.onClick(props.tabName.toLowerCase())}
    >
      {props.tabName.slice(0, 1).toUpperCase() + props.tabName.slice(1)}
    </button>
  );
};

export default TabButton;

TabButton.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
