import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../shared/FormWrapper";
import fromCamelCase from "../../helpers/fromCamelCase";
import { setOption } from "../../slices/creditsSlice";
import style from "../../../styles/Toolkit.module.scss";

const CreditsChild = (props) => {
  const presetName =
    props.presetName.constructor == String
      ? props.presetName
      : props.presetName[0];
  const presetValue = useSelector(
    (state) => state.credits.presetOptions[presetName]
  );
  const dispatch = useDispatch();
  const setPresetArrayValue = (newVal, i) => {
    let values = [...presetValue];
    values[i] = newVal;
    dispatch(setOption({ [presetName]: [...values] }));
  };
  const removeArrayValue = (i) => {
    let values = [...presetValue];
    values.splice(i, 1);
    dispatch(setOption({ [presetName]: [...values] }));
  };

  if (props.presetName.constructor == String) {
    return (
      <FormWrapper name={fromCamelCase(presetName)}>
        <input
          type="text"
          className={style.text}
          value={presetValue ?? ""}
          onChange={(e) =>
            dispatch(setOption({ [presetName]: e.target.value }))
          }
        />
      </FormWrapper>
    );
  } else if (props.presetName.constructor == Array) {
    return (
      <div className={style["array-form-container"]}>
        <div className={style["option-name"]}>
          {fromCamelCase(presetName)}
          <button
            className="plus-sign clickable"
            onClick={() =>
              dispatch(
                setOption({ [presetName]: [...(presetValue ?? []), ""] })
              )
            }
          ></button>
        </div>
        <ul className={style["array-form"]}>
          {presetValue
            ? presetValue.map((leadName, i) => (
                <li key={i}>
                  <input
                    type="text"
                    className={style.text}
                    value={leadName ?? ""}
                    onChange={(e) => setPresetArrayValue(e.target.value, i)}
                  />
                  <button
                    className="minus-sign clickable"
                    onClick={() => removeArrayValue(i)}
                  ></button>
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
};

export default CreditsChild;

CreditsChild.propTypes = {
  presetName: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
};
