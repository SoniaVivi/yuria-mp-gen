import React from "react";
import PropTypes from "prop-types";
import { useRef, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeading } from "./posterSlice";
import style from "../styles/Home.module.scss";
import useHeadingData from "./hooks/useHeadingData";

const Workspace = (props) => {
  const headings = useHeadingData();
  const { width, height } = useSelector((state) => state.poster.size);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [selectedElem, setSelectedElem] = useState(null);
  const [anchor, setAnchor] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "drop":
          return action.position;
        case "retrieve":
          return { x: null, y: null };
      }
    },
    { x: null, y: null }
  );

  return (
    <div
      ref={containerRef}
      className={props.className}
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseMove={(e) =>
        selectedElem !== null
          ? dispatch(
              setHeading(selectedElem, {
                top: e.clientY - anchor.y,
                left: e.clientX - containerRef.current.offsetLeft - anchor.x,
              })
            )
          : null
      }
      onMouseUp={() => {
        setSelectedElem(null);
        setAnchor({ type: "retrieve" });
      }}
    >
      {headings.map((headingData) => {
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
              setAnchor({
                type: "drop",
                position: {
                  x:
                    e.clientX -
                    e.target.offsetLeft -
                    containerRef.current.offsetLeft,
                  y: e.clientY - e.target.offsetTop,
                },
              });
              setSelectedElem(headingData.id);
            }}
          ></textarea>
        );
      })}
    </div>
  );
};

export default Workspace;

Workspace.propTypes = {
  className: PropTypes.string,
};
