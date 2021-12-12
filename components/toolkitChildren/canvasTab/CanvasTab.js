import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../../styles/Toolkit.module.scss";
import NumberForm from "../../NumberForm";
import { setBackground, setImageForm, setSize } from "../../slices/canvasSlice";
import FormWrapper from "../shared/FormWrapper";
import OptionsMenu from "../../OptionsMenu";
import FiltersForm from "../shared/FiltersForm";

const CanvasTab = () => {
  const canvasData = useSelector((state) => state.canvas);
  const dispatch = useDispatch();
  const sizes = {
    Contain: "contain",
    Cover: "cover",
    Auto: "auto",
  };
  const repeatOptions = {
    "Along X-Axis": "repeat-x",
    "Along Y-axis": "repeat-y",
    Repeat: "repeat",
    Space: "space",
    Round: "round",
    "No Repeat": "no-repeat",
  };

  return (
    <div>
      <div className={style["heading-section"]}>
        <button
          className={`${style["add-image-button"]} clickable hover`}
          onClick={() => dispatch(setImageForm("canvas"))}
        >
          Add Background
        </button>
        {canvasData.background.data ? (
          <button
            className={`${style["add-image-button"]} clickable hover`}
            onClick={() => dispatch(setBackground({ data: null }))}
          >
            Remove Background
          </button>
        ) : null}
        <FormWrapper name="Width">
          <NumberForm
            value={canvasData.size.width}
            onChange={(mutator) =>
              dispatch(setSize({ width: mutator(canvasData.size.width) }))
            }
          />
        </FormWrapper>
        <FormWrapper name="Height">
          <NumberForm
            value={canvasData.size.height}
            onChange={(mutator) =>
              dispatch(setSize({ height: mutator(canvasData.size.height) }))
            }
          />
        </FormWrapper>
        <FormWrapper name="Background Fit">
          <OptionsMenu
            options={Object.keys(sizes)}
            setOptionFunc={(fit) =>
              dispatch(
                setBackground({
                  size: sizes[fit],
                })
              )
            }
            current={Object.keys(sizes).find(
              (key) => sizes[key] == canvasData.background.size
            )}
          />
        </FormWrapper>
        <FormWrapper name="Background Fit">
          <OptionsMenu
            options={Object.keys(repeatOptions)}
            setOptionFunc={(selected) =>
              dispatch(
                setBackground({
                  repeat: repeatOptions[selected],
                })
              )
            }
            current={Object.keys(repeatOptions).find(
              (key) => repeatOptions[key] == canvasData.background.repeat
            )}
          />
        </FormWrapper>
        <FiltersForm id={"canvas"} defaultText="Add Canvas Filter" />
      </div>
    </div>
  );
};

export default CanvasTab;
