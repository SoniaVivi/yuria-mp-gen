import React from "react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeading, setImage } from "./posterSlice";
import Heading from "./workspaceChildren/Heading";
import WorkspaceImage from "./workspaceChildren/WorkspaceImage";
import clickWithinEdge from "./helpers/clickWithinEdge";
import useAnchor from "./hooks/useAnchor";

const Workspace = (props) => {
  const headingsIds = useSelector((state) =>
    Object.keys(state.poster.headings)
  );
  const imagesIds = useSelector((state) => Object.keys(state.poster.images));
  const { width, height } = useSelector((state) => state.poster.size);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [selectedElem, setSelectedElem] = useState(null);
  const [anchor, setAnchor] = useAnchor();

  const fromEventSetAnchor = (e, id, type) => {
    setAnchor({
      type: "drop",
      position: {
        x: e.clientX - e.target.offsetLeft - containerRef.current.offsetLeft,
        y: e.clientY - e.target.offsetTop,
      },
    });
    setSelectedElem({ id, type });
  };

  const childOnMouseDown = (e, id, type) => {
    if (!clickWithinEdge(e)) {
      fromEventSetAnchor(e, id, type);
    } else {
      return { x: e.clientX, y: e.clientY };
    }
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
      onMouseMove={(e) => {
        if (!selectedElem) return;
        const coords = {
          top: e.clientY - anchor.y,
          left: e.clientX - containerRef.current.offsetLeft - anchor.x,
        };

        if (selectedElem.type == "heading") {
          dispatch(setHeading(selectedElem.id, coords));
        } else if (selectedElem.type == "image") {
          dispatch(setImage(selectedElem.id, coords));
        }
      }}
      onMouseUp={() => {
        setSelectedElem(null);
        setAnchor({ type: "retrieve" });
      }}
    >
      {headingsIds.map((id) => (
        <Heading id={id} key={id} onMouseDown={childOnMouseDown} />
      ))}
      {imagesIds.map((id) => (
        <WorkspaceImage id={id} key={id} onMouseDown={childOnMouseDown} />
      ))}
    </div>
  );
};

export default Workspace;

Workspace.propTypes = {
  className: PropTypes.string,
};
