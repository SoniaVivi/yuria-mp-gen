import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import style from "../../../styles/ImagesChild.module.scss";
import FormWrapper from "../shared/FormWrapper";
import NumberForm from "../../NumberForm";
import { setImage } from "../../posterSlice";
import FiltersForm from "./FiltersForm";

const ImagesChild = (props) => {
  const imageData = useSelector((state) => state.poster.images[props.id]);
  const dispatch = useDispatch();

  return (
    <li className={style.container}>
      <div className={style.wrapper}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageData.data} alt="" className={style.preview} />
        </div>
        <div>
          <FormWrapper name="Width">
            <NumberForm
              value={imageData.width}
              onChange={(mutator) =>
                dispatch(
                  setImage(imageData.id, { width: mutator(imageData.width) })
                )
              }
            />
          </FormWrapper>
          <FormWrapper name="Height">
            <NumberForm
              value={imageData.height}
              onChange={(mutator) =>
                dispatch(
                  setImage(imageData.id, { height: mutator(imageData.height) })
                )
              }
            />
          </FormWrapper>
          <FormWrapper name="Z-Index">
            <NumberForm
              value={imageData.zIndex}
              min={1}
              max={99999}
              onChange={(mutator) =>
                dispatch(
                  setImage(imageData.id, { zIndex: mutator(imageData.zIndex) })
                )
              }
            />
          </FormWrapper>
          <FormWrapper name="Rotate">
            <NumberForm
              value={imageData.rotate}
              min={null}
              max={null}
              onChange={(mutator) =>
                dispatch(
                  setImage(imageData.id, { rotate: mutator(imageData.rotate) })
                )
              }
            />
          </FormWrapper>
        </div>
      </div>
      <FiltersForm id={props.id} />
    </li>
  );
};

export default ImagesChild;

ImagesChild.propTypes = {
  id: PropTypes.string.isRequired,
};
