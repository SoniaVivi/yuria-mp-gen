import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/Home.module.scss";
import { useDispatch } from "react-redux";
import { setHeading } from "../posterSlice";
import useHeadingData from "../hooks/useHeadingData";

const Heading = (props) => {
  const headingData = useHeadingData(props.id);
  const dispatch = useDispatch();

  return (
    <textarea
      key={headingData.id}
      type="text"
      style={headingData.style}
      className={style.moveable}
      value={headingData.text}
      onChange={(e) =>
        dispatch(setHeading(headingData.id, { text: e.target.value }))
      }
      onMouseDown={(e) => {
        props.setAnchor(e, props.id);
      }}
    ></textarea>
  );
};

export default Heading;

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  setAnchor: PropTypes.func.isRequired,
};
