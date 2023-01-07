import React from "react";

import Settings from "../components/Settings";

const StartScreen = () => {
  return (
    <>
      <header>
        <p>
          <b>GitHub:</b> https://github.com/dBish6
        </p>
        <p>
          <b>Developer:</b> David Bishop
        </p>
      </header>
      <div className="startContainer">
        <h1>Redux Quiz App</h1>
        <Settings />
      </div>
    </>
  );
};

export default StartScreen;
