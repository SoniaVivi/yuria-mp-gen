import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/Toolkit.module.scss";

const FormWrapper = (props) => {
  return (
    <div className={style["options-menu-container"]}>
      <span>{props.name}:</span>
      {props.children}
    </div>
  );
};

export default FormWrapper;

FormWrapper.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};
