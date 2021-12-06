import React from "react";
import PropTypes from "prop-types";
import style from "../styles/NumberForm.module.scss";
import Arrow from "./svgs/Arrow";

const NumberForm = (props) => {
  const formatNumber = (value) => {
    if (!value.match(/\./)) {
      return Number(value);
    } else if (value[value.length - 1] == ".") {
      return `${value}00`;
    } else {
      return value;
    }
  };
  const setValue = (val) =>
    /^\d+$/.test(val) || val == ""
      ? props.onChange(() => formatNumber(val))
      : null;
  const valueStepFunc =
    (change = 1) =>
    () =>
      props.onChange((prev) => parseFloat(prev) + change);

  return (
    <div className={style.wrapper}>
      <input
        value={props.value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <div className={style["divider-vertical"]}></div>
      <div className={style["arrow-wrapper"]}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Arrow onClick={valueStepFunc()} className={style.rotate} />
        <div className={style.divider}></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Arrow onClick={valueStepFunc(-1)} className={style["arrow-icon"]} />
      </div>
    </div>
  );
};

export default NumberForm;

NumberForm.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
