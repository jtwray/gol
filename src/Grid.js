import React, { useState, useEffect, useRef } from "react";
import Box from "./Box.js";
import Row from "./Row.js";
import "./styles.css";

export default function Grid({
  gen,
  setGen,
  populated2dArray,
  gridSize,
  updateBox
}) {
  return (
    <section>
      <div
        className="Grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "600px",
          height: "600px",
          border: "solid black 2rem",
          boxSizing: "border-box"
        }}
      >
        {populated2dArray &&
          populated2dArray.map((row, ri) => (
            <Row
              key={`row-${ri}`}
              ri={ri}
              gridSize={gridSize}
              row={row}
              populated2dArray={populated2dArray}
              updateBox={updateBox}
            />
          ))}
      </div>
    </section>
  );
}
