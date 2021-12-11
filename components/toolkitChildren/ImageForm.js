import React from "react";
import style from "../../styles/ImageForm.module.scss";
import { useDispatch } from "react-redux";
import { toggleImageForm } from "../slices/canvasSlice";
import { addImage } from "../slices/imagesSlice";

const ImageForm = () => {
  const dispatch = useDispatch();

  return (
    <div
      className={style.container}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onClick={() => dispatch(toggleImageForm())}
    >
      <div
        className={style.wrapper}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (e.dataTransfer.files.length != 1) {
            return console.log("Cannot drop more nor less than 1 files");
          } else if (file.name.match(/(\.png|\.jpe?g)$/)) {
            let fr = new FileReader();
            fr.onload = () => {
              dispatch(addImage(fr.result));
              dispatch(toggleImageForm());
            };
            fr.readAsDataURL(file);
          }
        }}
      >
        <span>Drop image here</span>
      </div>
    </div>
  );
};

export default ImageForm;
