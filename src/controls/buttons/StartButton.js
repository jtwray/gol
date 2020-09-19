import React from "react";

export default function StartButton({ setisRunning }) {
  function runGame() {
    setisRunning(true);
  }
  return (
    <>
      {" "}
      <button
        style={{
          color: "lightgreen",
          backgroundColor: "lightgreen",
          fontSize: "3rem",
          width: "275px",
          height: "100px",
          padding: "1rem,2rem",
          margin: "1rem",
          borderRadius: "14px",
          textShadow: "-.74px .74px 2.7px green,-.77px -1.47px .73px white",
          boxShadow:
            "-.7px 1.7px .7px 1px black, -1.7px 1.7px 1.7px .17px green",
        }}
        onClick={() => runGame()}
      >
        <span>Start</span>
      </button>
    </>
  );
}
