import React from "react";
import PropTypes from "prop-types";
import useImageData from "../hooks/useImageData";
import style from "../../styles/Home.module.scss";
import useAnchor from "../hooks/useAnchor";
import { setImage } from "../posterSlice";
import { useDispatch } from "react-redux";

const WorkspaceImage = (props) => {
  const imageData = useImageData(props.id);
  const [anchor, setAnchor] = useAnchor();
  const dispatch = useDispatch();

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      className={style.moveable}
      src={imageData.src}
      style={imageData.style}
      alt=""
      draggable="false"
      onMouseDown={(e) => {
        const result = props.onMouseDown(e, props.id, "image");
        if (result) setAnchor({ type: "drop", position: result });
      }}
      onMouseMove={(e) => {
        if (anchor.x != null) {
          dispatch(
            setImage(imageData.id, {
              width: imageData.width + e.clientX - anchor.x,
              height: imageData.height + e.clientY - anchor.y,
            })
          );
          setAnchor({ type: "eventDrop", event: e });
        }
      }}
      onMouseUp={() => setAnchor({ type: "retrieve" })}
    ></img>
  );
};

export default WorkspaceImage;

WorkspaceImage.propTypes = {
  id: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};
