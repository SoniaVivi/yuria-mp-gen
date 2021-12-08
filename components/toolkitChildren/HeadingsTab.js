import React from "react";
import { useSelector } from "react-redux";
import style from "../../styles/Toolkit.module.scss";
import HeadingChild from "./HeadingChild";
import HeadingPreset from "./HeadingPreset";

const HeadingsTab = () => {
  const headingsIds = useSelector((state) =>
    Object.keys(state.poster.headings)
  );

  return (
    <div>
      <div className={style["heading-section"]}>
        <div className={style["heading-presets"]}>
          <h3>Presets</h3>
          <HeadingPreset
            text="title"
            headingType="title"
            className={style["preset-option"]}
          />
          <HeadingPreset
            text="subheading"
            headingType="subheading"
            className={style["preset-option"]}
          />
        </div>
        <ul>
          {headingsIds.map((id) => (
            <HeadingChild id={id} key={id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeadingsTab;
