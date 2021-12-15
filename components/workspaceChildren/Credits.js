import React, { useEffect } from "react";
import PropTypes from "prop-types";
import style from "../../styles/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useAnchor from "../hooks/useAnchor";
import { generateCredits, setStyle } from "../slices/creditsSlice";

const Credits = (props) => {
  const [anchor, setAnchor] = useAnchor();
  const { preset, style: creditsStyle } = useSelector((state) => state.credits);
  const canvasWidth = useSelector((state) => state.canvas.size.width);
  const creditsString = useSelector((state) => generateCredits(state));
  const dispatch = useDispatch();
  useEffect(
    () => dispatch(setStyle({ width: canvasWidth, height: 100 })),
    [canvasWidth, dispatch]
  );

  if (preset) {
    return (
      <div
        className={style.moveable}
        style={{
          ...creditsStyle,
          top: `${creditsStyle.top}px`,
          left: `${creditsStyle.left}px`,
          width: `${creditsStyle.width}px`,
          height: `${creditsStyle.height}px`,
          transform: `rotate(${creditsStyle.rotate}deg)`,
        }}
        onMouseDown={(e) => {
          const result = props.onMouseDown(e, -1, "credits");
          if (result) setAnchor({ type: "drop", position: result });
        }}
        onMouseLeave={() => setAnchor({ type: "retrieve" })}
        onMouseMove={(e) => {
          if (anchor.x != null) {
            dispatch(
              setStyle({
                width: creditsStyle.width + e.clientX - anchor.x,
                height: creditsStyle.height + e.clientY - anchor.y,
              })
            );
            setAnchor({ type: "eventDrop", event: e });
          }
        }}
        onMouseUp={() => setAnchor({ type: "retrieve" })}
      >
        {(creditsString ?? "").split("\n").map((str, i) => (
          <pre
            key={i}
            className="no-select no-click"
            style={{
              fontFamily: creditsStyle.fontFamily,
              fontSize: creditsStyle.fontSize,
            }}
          >
            {str}
          </pre>
        ))}
      </div>
    );
  }
  return null;
};

export default Credits;

Credits.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
};
