import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImageForm } from "../posterSlice";
import ImagesChild from "./ImagesChild";
import style from "../../styles/Toolkit.module.scss";

const ImagesTab = () => {
  const imageIds = useSelector((state) => Object.keys(state.poster.images));
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
