import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Box({box}) {
  
  return (
    <div
      style={{
        display: "inline-block",
        textAlign: "center",
        width: "5%",
        height: "100%",
        color: "grey",
        background: "yellow",
        border: "black solid 1px",
        ...((box === 1 && { color: "white", background: "black" }) ||
          (box === 0 && { color: "black" }))
      }}
  
    >
      {box}
    </div>
  );
}
