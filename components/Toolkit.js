import React, { useState } from "react";
import HeadingsTab from "./toolkitChildren/HeadingsTab";
import style from "../styles/Toolkit.module.scss";
import TabButton from "./toolkitChildren/TabButton";

const Toolkit = () => {
  const [activeTab, setActiveTab] = useState("headings");

  return (
    <div className={style.toolkit}>
      <div className={style["tab-container"]}>
        <TabButton
          onClick={setActiveTab}
          tabName="headings"
          activeTab={activeTab}
        />
        <TabButton
          onClick={setActiveTab}
          tabName="images"
          activeTab={activeTab}
        />
        <TabButton
          onClick={setActiveTab}
          tabName="credits"
          activeTab={activeTab}
        />
      </div>
      {activeTab == "headings" ? <HeadingsTab /> : null}
    </div>
  );
};

export default Toolkit;
