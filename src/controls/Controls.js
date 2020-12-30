import React, { useState, useEffect, useRef } from "react";
import Box from "../Box.js";
import Row from "../Row.js";
import "../styles.css";
import StartButton from "./buttons/StartButton.js";
import ClearButton from "./buttons/ClearButton.js";
import RandomButton from "./buttons/RandomButton.js";
import StopButton from "./buttons/StopButton.js";
import SingleStepButton from "./buttons/SingleStepButton";
import SizeSlider from "./sliders/SizeSlider";
import SpeedSlider from "./sliders/SpeedSlider";
import Presets from "./Presets.js";

export default function Controls({
  gen,
  setGen,
  gridSize,
  setGridSize,
  setPopulated2dArray,
  populated2dArray
}) {
  let rowsLen = gridSize;
  let colsLen = gridSize;
  const [intervalState, setIntervalState] = useState(1);
  const [isRunning, setisRunning] = useState(false);
  const [Box, setBox] = useState(null);

  useEffect(() => {
    setPopulated2dArray(populateClearGrid(createDoubleArr(rowsLen, colsLen)));
  }, [gridSize]);

  function updateCell(grid, r, c) {
    if (grid[r][c] == 1) {
      grid[r][c] = 0;
    }
    if (grid[r][c] == 0) {
      grid[r][c] = 1;
    }
  }

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

  /** return both an exact clone of and the original randomly populated, 2dimensional Array  */
  function copyDblArr(arr) {
    let newArr = [...arr.map((r) => [...r])];
    return [newArr, arr];
  }

  /**  for a single grid cell-- return a count of all adjacent & living cells [alive = cell has value of 1]   */
  function checkToroidalNeighbors(prevG, col, row) {
    let liveCNT = 0;
    for (let tY = -1; tY <= 1; tY++) {
      for (let tX = -1; tX <= 1; tX++) {
        let relativeY = (tY + row + rowsLen) % rowsLen;
        let relativeX = (tX + col + colsLen) % colsLen;
        liveCNT += prevG[relativeY][relativeX];
      }
    }
    liveCNT -= prevG[row][col];
    return liveCNT;
  }

  function checkGridComplete() {
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

      if (isRunning && sameCellsLen === totalCells) {
        setIntervalState(null);
        setisRunning(false);
        window.alert("complete");
        return [newGrid, prevGrid];
      }
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
    let [newGrid] = checkGridComplete();
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
    }, [isRunning, delay]);
  }

  useInterval(() => updateGrid(), intervalState);

  useEffect(() => {
    setPopulated2dArray(populateClearGrid(createDoubleArr(rowsLen, colsLen)));
  }, [gridSize]);

  // <--------------DOM ELEMENTS JSX-------------------->
  return (
    <>
      <h2>generation:{gen}</h2>
      <SpeedSlider
        intervalState={intervalState}
        setIntervalState={setIntervalState}
      />
      <SizeSlider gridSize={gridSize} setGridSize={setGridSize} />
      <StartButton setisRunning={setisRunning} />
      <SingleStepButton runSingleStep={runSingleStep} />
      <StopButton
        setisRunning={setisRunning}
        setIntervalState={setIntervalState}
      />
      <ClearButton
        populateClearGrid={populateClearGrid}
        populated2dArray={populated2dArray}
        setGen={setGen}
        setGridSize={setGridSize}
        gridSize={gridSize}
      />
      <RandomButton
        colsLen={colsLen}
        rowsLen={rowsLen}
        setPopulated2dArray={setPopulated2dArray}
        setGen={setGen}
        populated2dArray={populated2dArray}
        populated2dArray={populated2dArray}
      />
      <Presets
        populated2dArray={populated2dArray}
        gridSize={gridSize}
        colsLen={colsLen}
        rowsLen={rowsLen}
      />
    </>
  );
}
