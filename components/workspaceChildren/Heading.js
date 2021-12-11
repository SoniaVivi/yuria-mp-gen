import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/Home.module.scss";
import { useDispatch } from "react-redux";
import useHeadingData from "../hooks/useHeadingData";
import useAnchor from "../hooks/useAnchor";
import { setHeading } from "../slices/headingsSlice";

const Heading = (props) => {
  const headingData = useHeadingData(props.id);
  const [anchor, setAnchor] = useAnchor();
  const dispatch = useDispatch();

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
        const result = props.onMouseDown(e, props.id, "heading");
        if (result) setAnchor({ type: "drop", position: result });
      }}
      onMouseLeave={() => setAnchor({ type: "retrieve" })}
      onMouseMove={(e) => {
        if (anchor.x != null) {
          dispatch(
            setHeading(headingData.id, {
              width: headingData.width + e.clientX - anchor.x,
              height: headingData.height + e.clientY - anchor.y,
            })
          );
          setAnchor({ type: "eventDrop", event: e });
        }
      }}
      onMouseUp={() => setAnchor({ type: "retrieve" })}
    ></textarea>
  );
};

export default Heading;

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};
