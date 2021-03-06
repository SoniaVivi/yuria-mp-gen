import React, { useState } from "react";
import HeadingsTab from "./toolkitChildren/headingsTab/HeadingsTab";
import style from "../styles/Toolkit.module.scss";
import TabButton from "./toolkitChildren/TabButton";
import ImagesTab from "./toolkitChildren/imagesTab/ImagesTab";
import CanvasTab from "./toolkitChildren/canvasTab/CanvasTab";
import CreditsTab from "./toolkitChildren/creditsTab/CreditsTab";

const Toolkit = () => {
  const [activeTab, setActiveTab] = useState("headings");
  const currentTab = () => {
    switch (activeTab) {
      case "headings":
        return <HeadingsTab />;
      case "images":
        return <ImagesTab />;
      case "canvas":
        return <CanvasTab />;
      case "credits":
        return <CreditsTab />;
    }
  };

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
          tabName="canvas"
          activeTab={activeTab}
        />
        <TabButton
          onClick={setActiveTab}
          tabName="credits"
          activeTab={activeTab}
        />
      </div>
      {currentTab()}
    </div>
  );
};

export default Toolkit;
