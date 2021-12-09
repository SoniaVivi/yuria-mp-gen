import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "../../styles/Home.module.scss";
import { useDispatch } from "react-redux";
import { setHeading } from "../posterSlice";
import useHeadingData from "../hooks/useHeadingData";
import getLocalCoords from "../helpers/getLocalCoords";

const Heading = (props) => {
  const headingData = useHeadingData(props.id);
  const [anchor, setAnchor] = useState({ x: null, y: null });
  const dispatch = useDispatch();

  const withinEdge = (e) => {
    const data = getLocalCoords(e);
    return (
      data.x <= data.width * 0.1 ||
      data.x >= data.width * 0.9 ||
      data.y <= data.height * 0.1 ||
      data.y >= data.height * 0.9
    );
  };

  return (
    <textarea
      key={headingData.id}
      type="text"
      style={headingData.style}
      className={style.moveable}
      value={headingData.text}
      spellCheck="false"
      onChange={(e) =>
        dispatch(setHeading(headingData.id, { text: e.target.value }))
      }
      onMouseDown={(e) => {
        if (!withinEdge(e)) {
          props.setAnchor(e, props.id);
        } else {
          setAnchor({ x: e.clientX, y: e.clientY });
        }
      }}
      onMouseMove={(e) => {
        if (anchor.x != null) {
          dispatch(
            setHeading(headingData.id, {
              width: headingData.width + e.clientX - anchor.x,
              height: headingData.height + e.clientY - anchor.y,
            })
          );
          setAnchor({ x: e.clientX, y: e.clientY });
        }
      }}
      onMouseUp={() => setAnchor({ x: null, y: null })}
    ></textarea>
  );
};

export default Heading;

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  setAnchor: PropTypes.func.isRequired,
};
