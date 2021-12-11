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
