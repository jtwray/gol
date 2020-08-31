import React, { useState, useEffect } from "react";
import Box from "./Box.js";
import Row from "./Row.js";
import "./styles.css";

export default function Grid({ gen, setGen }) {
  let rowsLen = 20;
  let colsLen = 20;
  let [generationCount, setgenerationCount] = useState(0);
  // const[populated2dArray,setPopulated2dArray]=useState( Array.from({length: rowsLen},()=> Array.from({length: colsLen}, () => 0)))
  let [populated2dArray, setPopulated2dArray] = useState(
    populateClearGrid(createDoubleArr(rowsLen, colsLen))
  );
  // let [populated2dArray, setPopulated2dArray] = useState(
  //   populateDblArr(createDoubleArr(rowsLen, colsLen))
  // );
  // console.table("line11, populated2dArray",populated2dArray)

  /** create a 2dimensional array */
  function createDoubleArr(rowsLen, colsLen) {
    let arr = Array.from({ length: rowsLen });
    for (let r = 0; r < rowsLen; r++) {
      arr[r] = Array.from({ length: colsLen });
    }
    // console.log("line18", "Grid has undefined values ");
    // console.table(arr);
    return arr;
  }

  function setUpOnFirstLoad() {
    console.table(
      "line37*************************populated2dArray",
      populated2dArray
    );
    let myGrid = createDoubleArr(rowsLen, colsLen);
    let myClearGrid = populateClearGrid(myGrid);
    let myRandoGrid = populateDblArr(myClearGrid);
    let [myCopiedGrid, myOGRandoGrid] = copyDblArr(myRandoGrid);

    // setPopulated2dArray([...myCopiedGrid.map((r) => [...r])]);
    console.table("line43*************************myCopiedGrid", myCopiedGrid);
    console.table("myOriginalrandomGrid", myOGRandoGrid);
    setPopulated2dArray(myOGRandoGrid);
    console.table(
      "line46*************************populated2dArray",
      populated2dArray
    );
  }

  /** populate the grid with all 0s */
  function populateClearGrid(grid) {
    for (let c = 0; c < colsLen; c++) {
      for (let r = 0; r < rowsLen; r++) {
        grid[r][c] = 0;
      }
    }
    // console.log("line29 Grid Cleared");
    // console.table(grid);
    return grid;
  }

  /**  populate the 2dimensional Array with random 1s & 0s */
  function populateDblArr(rando) {
    for (let c = 0; c < colsLen; c++) {
      for (let r = 0; r < rowsLen; r++) {
        rando[r][c] = Math.floor(Math.random() * 2);
      }
    }
    // console.log("line42 Grid Randomized");
    // console.table(rando);
    return rando;
  }

  /** return both an exact clone of and the original randomly populated, 2dimensional Array  */
  function copyDblArr(arr) {
    let newArr = [...arr.map((r) => [...r])];
    return [newArr, arr];
  }

  /** return af count of neighbors with value 1 for a single grid cell   */
  function checkToroidalNeighbors(prevG, col, row) {
    let liveCNT = 0;

    for (let tY = -1; tY <= 1; tY++) {
      for (let tX = -1; tX <= 1; tX++) {
        let relativeX = (tX + col + colsLen) % colsLen;
        let relativeY = (tY + row + rowsLen) % rowsLen;
        if (prevG[relativeY][relativeX] === 1) {
          liveCNT++;
        }
      }
    }
    liveCNT -= prevG[col][row];
    return liveCNT;
  }

  /** update the copyGrid and then overwrite the original with the updatedCopy
   *  set value for each cell of the cloned grid to 1 or 0
   * by referring to liveNeighborCount("LNC") of same cell in original grid
   * if LNC < 2 set cloned grid cell value = 0   * if LNC = 3 set cloned grid cell value = 1   * if LNC > 3  set cloned grid cell value = 0
   */
  function updateGrid(newGridd, prevGrid) {
    console.table("tuck this is updateGridnewGridd", newGridd);
    for (let r = 0; r < rowsLen; r++) {
      for (let c = 0; c < colsLen; c++) {
        let liveCnt = checkToroidalNeighbors([...prevGrid], c, r);
        if (liveCnt < 2 || liveCnt > 3) {
          newGridd[r][c] = 0;
        }
        if (liveCnt === 3) {
          newGridd[r][c] = 1;
        }
      }
    }
    setgenerationCount(generationCount+1);
    setPopulated2dArray(newGridd);
    // console.log("line105 => UpdateGrid by LiveNeighborsCount", "new generation #:", generationCount);
    // console.table(newGrid);
  }

  function gol(populated2dArray) {
    let [copiedArr, og_Arr] = copyDblArr(populated2dArray);
    updateGrid(copiedArr, og_Arr);
  }

  function setRandomGrid(grid) {
    let populatedGrid = populateDblArr(grid);
    // console.table( populatedGrid );
    // console.log('line119=> populatedGrid ');
    setPopulated2dArray(populatedGrid);
  }

  function stopGenerationCount() {
    setgenerationCount(0);
    console.log({ generationCount });
  }

  function startGenerationCount() {
    setgenerationCount(generationCount + 1);
    console.log({ generationCount });
  }

  let [clicked, setClicked] = useState(true);

  useEffect(() => {
    setUpOnFirstLoad();
  }, []);
  useEffect(() => {
    gol(populated2dArray);
  }, [clicked]);
  // useEffect(() => {
  //   if (generationCount === 0) {
  //     setPopulated2dArray(populateClearGrid(empty2dArray));
  //   }
  //   if (generationCount > 0) {
  //     let T = setInterval(gol(populated2dArray), 1000);
  //     return clearInterval(T);
  //   }
  // }, [generationCount]);

  // let emptyDoubleArr = createDoubleArr(rowsLen, colsLen);
  // let fullDblArr = populateDR(emptyDoubleArr);
  // let [newGrid,generation] = copyDR(fullDblArr);

  // let empty2dArray =
  // setPopulated2dArray(populateClearGrid(createDoubleArr(rowsLen, colsLen)));
  return (
    <>
      <h2>generation:{generationCount}</h2>
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
            <Row key={`row-${ri}`} ri={ri} row={row} />
          ))}
      </div>
      <button onClick={() => setClicked(!clicked)}>
        click to [+] generation
      </button>
      <div>{clicked}</div>
      <button
        onClick={() => startGenerationCount()}
        style={{
          color: "black",
          fontSize: "3rem",
          padding: "1rem,3rem",
          margin: "1rem",
          borderRadius: "14px"
        }}
      >
        <span>Start</span>
      </button>
      <button
        onClick={() => stopGenerationCount()}
        style={{
          color: "red",
          fontSize: "3rem",
          padding: "1rem,3rem",
          margin: "1rem",
          borderRadius: "14px"
        }}
      >
        <span>Stop</span>
      </button>

      <button
        onClick={() => populateClearGrid(populated2dArray)}
        style={{
          color: "gold",
          boxShadow: "1px 1px 1px 1px white,-1px -1px 1px 1px black",
          border: "solid 3px black",
          backgroundColor: "gold",
          textShadow: ".4px .4px .4px white,-.4px -.4px .4px black",
          fontSize: "3rem",
          padding: "1rem,3rem",
          margin: "1rem",
          borderRadius: "14px"
        }}
      >
        <span>Clear</span>
      </button>
      <button
        onClick={()=>setRandomGrid(populated2dArray)}
        style={{
          color: "gold",
          boxShadow: "1px 1px 1px 1px white,-1px -1px 1px 1px black",
          border: "solid 3px black",
          backgroundColor: "gold",
          textShadow: ".4px .4px .4px black,-.4px -.4px .4px white",
          fontSize: "3rem",
          padding: "1rem,3rem",
          margin: "1rem",
          borderRadius: "14px"
        }}
      >
        <span>Random Grid</span>
      </button>
    </>
  );
}
