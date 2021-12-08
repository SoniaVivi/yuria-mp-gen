import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addHeading } from "../posterSlice";

const HeadingPreset = (props) => {
  const dispatch = useDispatch();

  return (
    <div {...props}>
      <span>
        {props.text.slice(0, 1).toUpperCase() +
          props.text.slice(1).toLowerCase()}
      </span>
      <button
        className="plus-sign clickable"
        onClick={() => dispatch(addHeading(props.headingType))}
      ></button>
    </div>
  );
};

export default HeadingPreset;

HeadingPreset.propTypes = {
  text: PropTypes.string.isRequired,
  headingType: PropTypes.string.isRequired,
};
