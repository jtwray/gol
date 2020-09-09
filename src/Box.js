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
    if (boxIsAlive) {
      boxRef.current.classList.add("liveCell");
      boxRef.current.textContent='1';
      box=1;
    }
    if (!boxIsAlive) {
      boxRef.current.classList.remove("liveCell");
    }
  }
  useEffect(() => {

    if (boxIsAlive) {
      boxRef.current.classList.add("liveCell");
      console.log("livebox")
    }    
    if (!boxIsAlive) {
      boxRef.current.classList.remove("liveCell");
    }
  }, [box, boxIsAlive]);

  return (
    <div
      ref={boxRef}
      className="box"
      style={{
        width: `${gridSize}`
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
