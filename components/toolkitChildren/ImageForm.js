import React from "react";
import style from "../../styles/ImageForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setBackground, setImageForm } from "../slices/canvasSlice";
import { addImage } from "../slices/imagesSlice";

const ImageForm = () => {
  const dispatch = useDispatch();
  const formType = useSelector((state) => state.canvas.imageForm);

  return (
    <div
      className={style.container}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onClick={() => dispatch(setImageForm(null))}
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
              if (formType == "image") {
                dispatch(addImage(fr.result));
              } else if (formType == "canvas") {
                dispatch(setBackground({ data: fr.result }));
              }
              dispatch(setImageForm(null));
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
