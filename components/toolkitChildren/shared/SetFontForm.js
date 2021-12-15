import React from "react";
import NumberForm from "../../NumberForm";
import PropTypes from "prop-types";
import OptionsMenu from "../../OptionsMenu";
import FormWrapper from "../shared/FormWrapper";

const SetFontForm = (props) => {
  const fontNames = {
    Godzilla: "Godzilla",
    Orbitron: "Orbitron",
    "Doom (Left)": "Doom Left",
    "Doom (Right)": "Doom Right",
    "Doom Outline (Left)": "Doom Outline Left",
    "Doom Outline (Right)": "Doom Outline Right",
    Roboto: "Roboto",
    Lato: "Lato",
    "Tall Dark And Handsome": "Tall Dark And Handsome",
    Arvo: "Arvo",
    Antonio: "Antonio",
    Ubuntu: "Ubuntu",
  };

  return (
    <>
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
            "Tall Dark And Handsome",
            "Arvo",
            "Antonio",
            "Ubuntu",
          ]}
          setOptionFunc={(selected) => props.setFontFamily(fontNames[selected])}
          current={props.fontFamily}
        />
      </FormWrapper>
      <FormWrapper name="Font Size">
        <NumberForm value={props.fontSize} onChange={props.setFontSize} />
      </FormWrapper>
      <FormWrapper name="Text Align">
        <OptionsMenu
          options={["Start", "Center", "End", "Justify"]}
          setOptionFunc={props.setTextAlign}
          current={`${props.textAlign
            .slice(0, 1)
            .toUpperCase()}${props.textAlign.slice(1)}`}
        />
      </FormWrapper>
    </>
  );
};

export default SetFontForm;

SetFontForm.propTypes = {
  fontFamily: PropTypes.string.isRequired,
  setFontFamily: PropTypes.func.isRequired,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setFontSize: PropTypes.func.isRequired,
  textAlign: PropTypes.string.isRequired,
  setTextAlign: PropTypes.func.isRequired,
};
