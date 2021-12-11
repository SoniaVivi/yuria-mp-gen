import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ImagesChild from "./ImagesChild";
import style from "../../../styles/Toolkit.module.scss";
import { toggleImageForm } from "../../slices/canvasSlice";

const ImagesTab = () => {
  const imageIds = useSelector((state) => Object.keys(state.image));
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className={`${style["add-image-button"]} clickable hover`}
        onClick={() => dispatch(toggleImageForm())}
      >
        Add Image
      </button>
      <ul>
        {imageIds.map((id) => (
          <ImagesChild key={id} id={id} />
        ))}
      </ul>
    </div>
  );
};

export default ImagesTab;
