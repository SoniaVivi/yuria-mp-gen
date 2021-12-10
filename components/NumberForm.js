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
    (/^-?[0-9]\d*(\.\d+)?$/.test(val) || val == "") &&
    withinLimits(formatNumber(val))
      ? props.onChange(() => formatNumber(val))
      : null;
  const valueStepFunc =
    (change = 1) =>
    () =>
      props.onChange((prev) => {
        const newVal = parseFloat(prev) + change;
        return withinLimits(newVal) ? newVal : prev;
      });
  const withinLimits = (val) => {
    const value = parseFloat(val);
    if (
      (props?.min && value < props.min) ||
      (props?.max && value > props.max)
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className={style.wrapper}>
      <input
        value={props.value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <div className="divider vertical"></div>
      <div className={style["arrow-wrapper"]}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Arrow onClick={valueStepFunc()} className={style.rotate} />
        <div className="divider"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Arrow onClick={valueStepFunc(-1)} className={style["arrow-icon"]} />
      </div>
    </div>
  );
};

export default NumberForm;

NumberForm.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
