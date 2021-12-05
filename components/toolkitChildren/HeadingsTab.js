import React from "react";
import { useDispatch } from "react-redux";
import useHeadingData from "../hooks/useHeadingData";
import { addTitle, setHeading } from "../posterSlice";
import style from "../../styles/Toolkit.module.scss";

const HeadingsTab = () => {
  const headings = useHeadingData();
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <div className={style.heading}>
          <h3>Title</h3>
          <button
            className="plus-sign"
            onClick={() => dispatch(addTitle())}
          ></button>
        </div>
        <ul>
          {headings.map((data) => (
            <li key={data.id}>
              <input
                type="text"
                value={data.text}
                onChange={(e) =>
                  dispatch(setHeading(data.id, { text: e.target.value }))
                }
              ></input>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeadingsTab;
