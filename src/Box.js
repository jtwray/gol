import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function Box({
  box,
  gridSize,
  coli,
  ri,
  populated2dArray,
  updateBox,
  isRunning
}) {
  let boxWidth = 100 / gridSize;
  let fontSize = `${boxWidth * 20}%`;
  return (
    <div
      className="box"
      style={{
        fontSize,
        width: `${boxWidth}`,
        ...(box === 1 && { background: "black", color: "yellow" }),
        ...(box === 0 && { background: "yellow", color: "black" })
      }}
      onClick={() => {
        !isRunning && updateBox(populated2dArray, ri, coli);
      }}
    >
      {box}
    </div>
  );
}
