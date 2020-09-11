import React from "react";

export default function StopButton({ stopGame }) {
  return (
    <>
      <button
        style={{
          color: "firebrick",
          backgroundColor: "firebrick",
          fontSize: "3rem",
          width: "275px",
          height: "100px",
          padding: "1rem,2rem",
          margin: "1rem",
          borderRadius: "14px",
          textShadow: "-.74px .74px 2.7px darkred,-.77px -.7px .74px white",
          boxShadow:
            "-.7px 1.7px .7px .1px black, -1.7px 1.7px 1.7px .17px darkred",
        }}
        onClick={() => stopGame()}
      >
        <span>Stop</span>
      </button>
    </>
  );
}
