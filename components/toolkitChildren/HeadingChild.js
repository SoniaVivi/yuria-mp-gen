import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setHeading } from "../posterSlice";
import OptionsMenu from "../OptionsMenu";
import FormWrapper from "./FormWrapper";
import NumberForm from "../NumberForm";
import ColorForm from "./ColorForm";
import useHeadingData from "../hooks/useHeadingData";

const HeadingChild = (props) => {
  const data = useHeadingData(props.id);
  const fontNames = {
    Godzilla: "Godzilla",
    Orbitron: "Orbitron",
    "Doom (Left)": "Doom Left",
    "Doom (Right)": "Doom Right",
    "Doom Outline (Left)": "Doom Outline Left",
    "Doom Outline (Right)": "Doom Outline Right",
    Roboto: "Roboto",
    Lato: "Lato",
    Arvo: "Arvo",
    Antonio: "Antonio",
    Ubuntu: "Ubuntu",
  };
  const dispatch = useDispatch();

  return (
    <li>
      <textarea
        type="text"
        value={data.text}
        onChange={(e) =>
          dispatch(setHeading(data.id, { text: e.target.value }))
        }
      ></textarea>
      <FormWrapper name="Font Family">
        <OptionsMenu
          options={[
            "Godzilla",
            "Orbitron",
            "Doom (Left)",
            "Doom (Right)",
            "Doom Outline (Left)",
            "Doom Outline (Right)",
            "Roboto",
            "Lato",
            "Arvo",
            "Antonio",
            "Ubuntu",
          ]}
          setOptionFunc={(font) =>
            dispatch(
              setHeading(data.id, {
                fontFamily: fontNames[font],
              })
            )
          }
          current={data.fontFamily}
        />
      </FormWrapper>
      <FormWrapper name="Text Align">
        <OptionsMenu
          options={["Start", "Center", "End", "Justify"]}
          setOptionFunc={(clicked) =>
            dispatch(
              setHeading(data.id, {
                textAlign: clicked.toLowerCase(),
              })
            )
          }
          current={`${data.textAlign
            .slice(0, 1)
            .toUpperCase()}${data.textAlign.slice(1)}`}
        />
      </FormWrapper>
      <FormWrapper name="Font Size">
        <NumberForm
          value={data.fontSize}
          onChange={(mutator) =>
            dispatch(setHeading(data.id, { fontSize: mutator(data.fontSize) }))
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
