import React from "react";
import { useDispatch } from "react-redux";
import useHeadingData from "../hooks/useHeadingData";
import { addTitle, setHeading } from "../posterSlice";
import style from "../../styles/Toolkit.module.scss";
import OptionsMenu from "../OptionsMenu";
import FormWrapper from "./FormWrapper";
import NumberForm from "../NumberForm";

const HeadingsTab = () => {
  const headings = useHeadingData();
  const dispatch = useDispatch();
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

  return (
    <div>
      <div className={style["heading-section"]}>
        <div className={style.heading}>
          <h3>Title</h3>
          <button
            className="plus-sign clickable"
            onClick={() => dispatch(addTitle())}
          ></button>
        </div>
        <ul>
          {headings.map((data) => (
            <li key={data.id}>
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
                    dispatch(
                      setHeading(data.id, { fontSize: mutator(data.fontSize) })
                    )
                  }
                />
              </FormWrapper>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeadingsTab;
