import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import FormWrapper from "../shared/FormWrapper";
import NumberForm from "../../NumberForm";
import ColorForm from "../shared/ColorForm";
import useHeadingData from "../../hooks/useHeadingData";
import style from "../../../styles/Toolkit.module.scss";
import { removeHeading, setHeading } from "../../slices/headingsSlice";
import SetFontForm from "../shared/SetFontForm";

const HeadingChild = (props) => {
  const data = useHeadingData(props.id);
  const dispatch = useDispatch();

  return (
    <li className={style["heading-child"]}>
      <textarea
        type="text"
        className={style.text}
        value={data.text}
        onChange={(e) =>
          dispatch(setHeading(data.id, { text: e.target.value }))
        }
      ></textarea>
      <button
        className="delete clickable"
        onClick={() => dispatch(removeHeading(data.id))}
      ></button>
      <FormWrapper name="Width">
        <NumberForm
          value={data.width}
          onChange={(mutator) =>
            dispatch(setHeading(data.id, { width: mutator(data.width) }))
          }
        />
      </FormWrapper>
      <FormWrapper name="Height">
        <NumberForm
          value={data.height}
          onChange={(mutator) =>
            dispatch(setHeading(data.id, { height: mutator(data.height) }))
          }
        />
      </FormWrapper>
      <SetFontForm
        fontFamily={data.fontFamily}
        setFontFamily={(font) =>
          dispatch(
            setHeading(data.id, {
              fontFamily: font,
            })
          )
        }
        fontSize={data.fontSize}
        setFontSize={(mutator) =>
          dispatch(setHeading(data.id, { fontSize: mutator(data.fontSize) }))
        }
        textAlign={data.textAlign}
        setTextAlign={(clicked) =>
          dispatch(
            setHeading(data.id, {
              textAlign: clicked.toLowerCase(),
            })
          )
        }
      />
      <FormWrapper name="Z-Index">
        <NumberForm
          value={data.zIndex}
          min={1}
          max={99999}
          onChange={(mutator) =>
            dispatch(setHeading(data.id, { zIndex: mutator(data.zIndex) }))
          }
        />
      </FormWrapper>
      <FormWrapper name="Rotate">
        <NumberForm
          value={data.rotate}
          min={null}
          max={null}
          onChange={(mutator) =>
            dispatch(setHeading(data.id, { rotate: mutator(data.rotate) }))
          }
        />
      </FormWrapper>
      <FormWrapper name="Color">
        <ColorForm
          color={data.color}
          onChange={(color) => dispatch(setHeading(data.id, { color }))}
        />
      </FormWrapper>
    </li>
  );
};

export default HeadingChild;

HeadingChild.propTypes = {
  id: PropTypes.string.isRequired,
};
