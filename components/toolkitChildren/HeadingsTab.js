import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTitle } from "../posterSlice";
import style from "../../styles/Toolkit.module.scss";
import HeadingChild from "./HeadingChild";

const HeadingsTab = () => {
  const headingsIds = useSelector((state) =>
    Object.keys(state.poster.headings)
  );
  const dispatch = useDispatch();

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
          {headingsIds.map((id) => (
            <HeadingChild id={id} key={id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeadingsTab;
