import React from "react";
import Box from "./Box.js";

export default function Row({  ri, gridSize,row,populated2dArray,updateBox }) {
  let rowHeight = 100 / gridSize;
  console.log({rowHeight})
  console.log({gridSize})
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: { rowHeight }
      }}
    >
      {row &&
        row.map((box, coli) => {
          return (
            <Box key={`row-${ri}_box-${coli}`}  box={box} gridSize={gridSize} ri={ri} coli={coli} populated2dArray={populated2dArray} updateBox={updateBox} />
          );
        })}
    </div>
  );
}
