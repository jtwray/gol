import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Box({box,gridSize,coli,ri,populated2dArray,updateBox}) {

let boxWidth=100/gridSize

  
  return (
    <div
      style={{
        display: "inline-block",
        textAlign: "center",
        width: `${gridSize}`,
        height: "100%",
        color: "grey",
        background: "yellow",
        border: "black solid 1px",
        ...((box === 1 && { color: "yellow", background:  `black` }) ||
          (box === 0 && { color: `black` }))
      }}
  onClick={()=>{updateBox(populated2dArray,coli,ri)}}
    >
      {box}
    </div>
  );
}
