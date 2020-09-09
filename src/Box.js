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
  let boxWidth = 100 / gridSize;
  // const boxRef = React.useRef();
  // const [boxIsAlive, setBoxIsAlive] = useState(box?true:false);

  // function checkBoxColor(box) {

  //   if (boxIsAlive) {
  //     boxRef.current.classList.add("liveCell");

  //     box=1;
  //   }
  //   if (!boxIsAlive) {
  //     boxRef.current.classList.remove("liveCell");
  //   }
  // }
  // useEffect(() => {

  //   if (boxIsAlive) {
  //     boxRef.current.classList.add("liveCell");
  //     console.log("livebox")
  //   }    
  //   if (!boxIsAlive) {
  //     boxRef.current.classList.remove("liveCell");
  //   }
  // }, [box, boxIsAlive]);

  return (
    <div
      // ref={boxRef}
      className="box"
      style={{
        width: `${gridSize}`,
        ...(box===1&&{background:'black',color:'yellow'}),
        ...(box===0&&{background:'yellow',color:'black'})
      }}
      onClick={() => {
        updateBox(populated2dArray, ri,coli);
        // setBoxIsAlive(!boxIsAlive);
      }}
    >
      {box}
    </div>
  );
}
