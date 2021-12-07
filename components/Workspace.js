import React from "react";
import PropTypes from "prop-types";
import { useRef, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeading } from "./posterSlice";
import Heading from "./workspaceChildren/Heading";

const Workspace = (props) => {
  const headingsIds = useSelector((state) =>
    Object.keys(state.poster.headings)
  );
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

  const fromEventSetAnchor = (e, id) => {
    setAnchor({
      type: "drop",
      position: {
        x: e.clientX - e.target.offsetLeft - containerRef.current.offsetLeft,
        y: e.clientY - e.target.offsetTop,
      },
    });
    setSelectedElem(id);
  };

  return (
    <div
      ref={containerRef}
      className={props.className}
      style={{
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height,
      }}
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
      {headingsIds.map((id) => (
        <Heading id={id} key={id} setAnchor={fromEventSetAnchor} />
      ))}
    </div>
  );
};

export default Workspace;

Workspace.propTypes = {
  className: PropTypes.string,
};
