import React, { useState, useEffect, useRef } from "react";
import Box from "./Box.js";
import Row from "./Row.js";
import "./styles.css";

export default function Grid({ gen, setGen }) {
  let rowsLen = 20;
  let colsLen = 20;
  const [intervalState, setIntervalState] = useState(null);
  const [isRunning, setisRunning] = useState(false);
  let [populated2dArray, setPopulated2dArray] = useState(
    populateClearGrid(createDoubleArr(rowsLen, colsLen))
  );

  /** create a 2dimensional array */
  function createDoubleArr(rowsLen, colsLen) {
    let arr = Array.from({ length: rowsLen });
    for (let r = 0; r < rowsLen; r++) {
      arr[r] = Array.from({ length: colsLen });
    }
    return arr;
  }

  /** populate the grid with all 0s */
  function populateClearGrid(grid) {
    for (let c = 0; c < colsLen; c++) {
      for (let r = 0; r < rowsLen; r++) {
        grid[r][c] = 0;
      }
    }
    return grid;
  }
  function runGame() {
    setisRunning(true);
  }

  // this.stopGame===
  function stopGame() {
    setisRunning(false);
    setIntervalState(null);
  }

  // this.handleIntervalChange===

  function handleIntervalSlideChange(event) {
    setIntervalState( event.target.value);
    console.log({ intervalState });
  }

  function clearGrid() {
    populateClearGrid(populated2dArray);
    setGen(0);
    console.log("line29 Grid Cleared");
  }

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
        liveCNT += prevG[relativeY][relativeX];
      }
    }
    liveCNT -= prevG[col][row];
    return liveCNT;
  }
  function checkGrid() {
    let [newGrid, prevGrid] = updateCells();
    let sameCells = [];
    let sameCellsLen = 0;
    let totalCells = rowsLen * colsLen;

    for (let r = 0; r < rowsLen; r++) {
      for (let c = 0; c < colsLen; c++) {
        let cell = { r, c };
        if (newGrid[r][c] === prevGrid[r][c]) {
          sameCells.push(cell);
          sameCellsLen += 1;
        }
      }
    }

    if (newGrid === prevGrid || sameCellsLen === totalCells) {
      window.alert("complete");
      console.table(newGrid, prevGrid);
      console.log({ sameCellsLen, totalCells });
      setIntervalState(null);
      setisRunning(false);

    }
    return [newGrid, prevGrid];
  }
  /** update the copyGrid and then overwrite the original with the updatedCopy
   *  set value for each cell of the cloned grid to 1 or 0
   * by referring to liveNeighborCount("LNC") of same cell in original grid
   * if LNC < 2 set cloned grid cell value = 0   * if LNC = 3 set cloned grid cell value = 1   * if LNC > 3  set cloned grid cell value = 0
   */
  function updateCells() {
    let [newGrid, prevGrid] = copyDblArr(populated2dArray);
    for (let r = 0; r < rowsLen; r++) {
      for (let c = 0; c < colsLen; c++) {
        let liveCnt = checkToroidalNeighbors(prevGrid, c, r);
        if (liveCnt < +2) {
          newGrid[r][c] = 0;
        }
        if (liveCnt === +3) {
          newGrid[r][c] = +1;
        }
        if (liveCnt > +3) {
          newGrid[r][c] = 0;
        }
      }
    }
    return [newGrid, prevGrid];
  }
  function updateGrid() {
    let [newGrid] = checkGrid();
    setPopulated2dArray(newGrid);
    setGen(gen + 1);
  }

  function RunIteration() {
    console.log(gen);
    useInterval(updateGrid(), intervalState);
  }

  function runSingleStep() {
    console.log(gen);
    let [copiedArr] = copyDblArr(populated2dArray);
    let newTimeoutHandler = window.setTimeout(() => {
      RunIteration();
    }, +intervalState);
    updateGrid(copiedArr, populated2dArray);
    window.clearTimeout(newTimeoutHandler);
  }
  /** sideeffects */

  function useInterval(callback, delay) {
    let id;
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    });
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (isRunning) {
        id = setInterval(tick, delay);
        return () => {
          clearInterval(id);
        };
      }
    }, [delay]);
    // return [id]
  }

  useInterval(() => updateGrid(), intervalState);


  let dl = [500, 750, 1000, 1250, 1500, 1750, 2000];

  return (
    <>
      <h2>generation:{gen}</h2>
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

      <div>
        <form>
          <label>speed:{intervalState||"stopped"}</label>
          <div
            className="sliderBox"
            style={{
              display: "inline",
              writingMode: "vertical-lr",
              maxWidth: "100%"
            }}
          >
            {dl.map((option, i) => (
              <option key={`${option}_${i}`} value={option}>
                {option}
              </option>
            ))}
          </div>
          <input
            type="range"
            step="250"
            value={intervalState||null}
            min="250"
            max="2000"
            list="lifeCycleRange"
            id="lifeCyleRangeSlide"
            onChange={(event)=>handleIntervalSlideChange(event)}
          />
          <datalist
            id="lifeCycleRange"
            name="lifeCycleRange"
            type="datalist"
          ></datalist>
        </form>
      </div>

      <button
        style={{
          color: "lightgreen",
          backgroundColor: "lightgreen",
          fontSize: "3rem",
          width: "275px",
          height: "100px",
          padding: "1rem,2rem",
          margin: "1rem",
          borderRadius: "14px",
          textShadow: "-.74px .74px 2.7px green,-.77px -1.47px .73px white",
          boxShadow:
            "-.7px 1.7px .7px 1px black, -1.7px 1.7px 1.7px .17px green"
        }}
        onClick={() => runGame()}
      >
        <span>Start</span>
      </button>
      <button
        style={{
          color: "lightgreen",
          backgroundColor: "lightgreen",
          fontSize: "3rem",
          width: "275px",
          height: "100px",
          padding: "1rem,2rem",
          margin: "1rem",
          borderRadius: "14px",
          textShadow: "-.74px .74px 2.7px green,-.77px -1.47px .73px white",
          boxShadow:
            "-.7px 1.7px .7px 1px black, -1.7px 1.7px 1.7px .17px green"
        }}
        onClick={() => runSingleStep()}
      >
        <span>SingleStep</span>
      </button>

      <button
        style={{
          color: "firebrick",
          backgroundColor: "firebrick",
          fontSize: "3rem",
          width: "275px",
          height: "100px",
          padding: "1rem,2rem",
          margin: "1rem",
          borderRadius: "14px",
          textShadow: "-.74px .74px 2.7px darkred,-.77px -.7px .74px white",
          boxShadow:
            "-.7px 1.7px .7px .1px black, -1.7px 1.7px 1.7px .17px darkred"
        }}
        onClick={() => stopGame()}
      >
        <span>Stop</span>
      </button>

      <button
        style={{
          color: "gold",
          boxShadow: "1px 1px 1px 1px white,-1px -1px 1px 1px black",
          border: "solid 3px black",
          backgroundColor: "gold",
          textShadow: "-.74px -.74px .4px white,-.74px .74px 2.74px black",
          fontSize: "3rem",
          width: "275px",
          height: "100px",
          padding: "1rem,2rem",
          margin: "1rem",
          borderRadius: "14px"
        }}
        onClick={() => clearGrid()}
      >
        <span>Clear</span>
      </button>

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
          borderRadius: "14px"
        }}
      >
        <span>Random Grid</span>
      </button>
    </>
  );
}
