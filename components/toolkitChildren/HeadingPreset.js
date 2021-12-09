import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addHeading } from "../posterSlice";

const HeadingPreset = (props) => {
  const dispatch = useDispatch();
  const { headingType, displayText, ...containerProps } = props;

  return (
    <div {...containerProps}>
      <span>
        {displayText.slice(0, 1).toUpperCase() +
          displayText.slice(1).toLowerCase()}
      </span>
      <button
        className="plus-sign clickable"
        onClick={() => dispatch(addHeading(headingType))}
      ></button>
    </div>
  );
};

export default HeadingPreset;

HeadingPreset.propTypes = {
  displayText: PropTypes.string.isRequired,
  headingType: PropTypes.string.isRequired,
};
