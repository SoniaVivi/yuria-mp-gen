import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../../styles/Toolkit.module.scss";
import {
  possiblePresets,
  setPreset,
  setStyle,
} from "../../slices/creditsSlice";
import fromCamelCase from "../../helpers/fromCamelCase";
import OptionsMenu from "../../OptionsMenu";
import toCamelCase from "../../helpers/toCamelCase";
import CreditsChild from "./CreditsChild";
import FormWrapper from "../shared/FormWrapper";
import NumberForm from "../../NumberForm";
import ColorForm from "../shared/ColorForm";
import SetFontForm from "../shared/SetFontForm";

const CreditsTab = () => {
  const {
    style: creditsStyle,
    preset: currentPreset,
    possibleKeys: presetKeys,
  } = useSelector((state) => state.credits);
  const creditPresets = useMemo(
    () => (possiblePresets ? possiblePresets.map((s) => fromCamelCase(s)) : []),
    []
  );
  const dispatch = useDispatch();

  return (
    <div className={style["credits-tab"]}>
      <div className={style["credits-name"]}>
        <OptionsMenu
          options={
            currentPreset != null ? [...creditPresets, "Clear"] : creditPresets
          }
          setOptionFunc={(selected) =>
            selected != "Clear"
              ? dispatch(setPreset(toCamelCase(selected)))
              : dispatch(setPreset(null))
          }
          current={fromCamelCase(currentPreset ?? "Select Preset")}
          className={style.active}
        />
      </div>
      <FormWrapper name="Width">
        <NumberForm
          value={creditsStyle.width}
          onChange={(mutator) =>
            dispatch(setStyle({ width: mutator(creditsStyle.width) }))
          }
        />
      </FormWrapper>
      <FormWrapper name="Height">
        <NumberForm
          value={creditsStyle.height}
          onChange={(mutator) =>
            dispatch(setStyle({ height: mutator(creditsStyle.height) }))
          }
        />
      </FormWrapper>
      <FormWrapper name="Z-Index">
        <NumberForm
          value={creditsStyle.zIndex}
          min={1}
          max={99999}
          onChange={(mutator) =>
            dispatch(setStyle({ zIndex: mutator(creditsStyle.zIndex) }))
          }
        />
      </FormWrapper>
      <FormWrapper name="Rotate">
        <NumberForm
          value={creditsStyle.rotate}
          min={null}
          max={null}
          onChange={(mutator) =>
            dispatch(setStyle({ rotate: mutator(creditsStyle.rotate) }))
          }
        />
      </FormWrapper>
      <SetFontForm
        fontFamily={creditsStyle.fontFamily}
        setFontFamily={(font) =>
          dispatch(
            setStyle({
              fontFamily: font,
            })
          )
        }
        fontSize={creditsStyle.fontSize}
        setFontSize={(mutator) =>
          dispatch(setStyle({ fontSize: mutator(creditsStyle.fontSize) }))
        }
        textAlign={creditsStyle.textAlign}
        setTextAlign={(clicked) =>
          dispatch(
            setStyle({
              textAlign: clicked.toLowerCase(),
            })
          )
        }
      />
      <FormWrapper name="Color">
        <ColorForm
          color={creditsStyle.color}
          onChange={(color) => dispatch(setStyle({ color }))}
        />
      </FormWrapper>
      <ul>
        {presetKeys.map((option) => (
          <li key={option}>
            <CreditsChild presetName={option} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreditsTab;
