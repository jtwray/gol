import React from "react";
import Box from "./Box.js";

export default function Row({ row ,ri }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "5%"
      }}
    >
      {row&&
        row.map((box,i) => {
        
        return(
        <Box key={`row-${ri}_box-${i}`} box={box} />
        )
      })
      }
    </div>
  );
}
