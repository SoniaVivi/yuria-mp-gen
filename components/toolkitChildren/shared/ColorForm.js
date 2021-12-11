import React, { useState } from "react";
import PropTypes from "prop-types";
import { HexColorInput, HexColorPicker } from "react-colorful";
import style from "../../../styles/ColorForm.module.scss";
import Droplet from "../../svgs/Droplet";
import onOutsideClick from "../../helpers/onOutsideClick";

const ColorForm = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className={style.wrapper}>
      <HexColorInput color={props.color} onChange={props.onChange} />
      <button
        onClick={(e) => {
          setShowColorPicker((prevState) => !prevState);
          onOutsideClick(
            () => setShowColorPicker(false),
            e,
            e.target.parentNode.parentNode
          );
        }}
      >
        <Droplet className={style.droplet} />
      </button>
      <div className={showColorPicker ? style.menu : "hidden"}>
        <HexColorPicker color={props.color} onChange={props.onChange} />
      </div>
    </div>
  );
};

export default ColorForm;

ColorForm.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
