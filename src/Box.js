import React, { useState, useEffect,useRef } from "react";
import "./styles.css";

export default function Box({
  box,
  gridSize,
  coli,
  ri,
  populated2dArray,
  updateBox
}) {
  const boxRef = React.useRef();
  const [boxIsAlive, setBoxIsAlive] = useState(false);
  let boxWidth = 100 / gridSize;

  function checkBoxColor(box) {
    console.log(
      "boxColorline17",
      { box },
      "boxRef.current.classList",
      boxRef.current.classList
    );
    if (box === 1) {
      boxRef.current.classList.add("liveCell");
    }
    if (box === 0) {
      boxRef.current.classList.remove("liveCell");
    }
  }
  useEffect(() => {

   if(box===1) {
      boxRef.current.classList.add("liveCell");
      console.log("livebox")
    }    
    if (box === 0) {
      boxRef.current.classList.remove("liveCell");
    }
  }, [box, boxIsAlive]);

  return (
    <div
      ref={boxRef}
      className="box"
      style={{
        display: "inline-block",
        textAlign: "center",
        width: `${gridSize}`,
        height: "100%",
        color: "grey",
        background: "yellow",
        border: "black solid 1px",
        ...((box === 1 && { color: "yellow", background: `black` }) ||
          (box === 0 && { color: `black` }))
      }}
      onClick={() => {
        updateBox(populated2dArray, ri,coli);
        setBoxIsAlive(!boxIsAlive);
      }}
    >
      {box}
    </div>
  );
}
