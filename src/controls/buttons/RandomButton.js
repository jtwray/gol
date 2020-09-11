import React from "react";

export default function RandomButton({
  colsLen,
  rowsLen,
  setGen,
  setPopulated2dArray,
  populated2dArray,
}) {
  /**  populate the 2dimensional Array with random 1s & 0s */
  function randomizeGrid(rando) {
    for (let c = 0; c < colsLen; c++) {
      for (let r = 0; r < rowsLen; r++) {
        rando[r][c] = Math.floor(Math.random() * 2);
      }
    }
    setPopulated2dArray(rando);
    setGen(0);

    return rando;
  }
  return (
    <button
      onClick={() => randomizeGrid(populated2dArray)}
      style={{
        color: "gold",
        boxShadow: "1px 1px 1px 1px white,-1px -1px 1px 1px black",
        border: "solid 3px black",
        backgroundColor: "gold",
        textShadow: ".74px .74px 2.74px black,-.74px -.74px .74px white",
        fontSize: "3rem",
        width: "300px",
        height: "150px",
        padding: "1rem,2rem",
        margin: "1rem",
        borderRadius: "14px",
      }}
    >
      <span>Random Grid</span>
    </button>
  );
}
