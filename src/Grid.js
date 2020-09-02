import React, { useState, useEffect } from "react";
import Box from "./Box.js";
import Row from "./Row.js";
import "./styles.css";

export default function Grid({ gen, setGen }) {
  let rowsLen = 20;
  let colsLen = 20;
  let [clicked, setClicked] = useState(true);
  const [interval, setIntervalState] = useState({ interval: +1000 });
  const [isRunning, setisRunning] = useState(false);
const[newTimeoutHandler,setnewTimeoutHandler]=useState(null)
  let [clear, setClear] = useState(true);
  let [random, setRandom] = useState(false);
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

  function setUpOnFirstLoad() {
    let myGrid = createDoubleArr(rowsLen, colsLen);
    // if (x == clear) {
    //   let populatedGrid = populateClearGrid(myGrid);
    //   setPopulated2dArray(populatedGrid);
    // }
    // if (x == random) {
    //   let populatedGrid = randomizeGrid(myGrid);
    //   setPopulated2dArray(populatedGrid);

    let populatedGrid = setPopulated2dArray(populateClearGrid(myGrid));
    return populatedGrid;
  }

  /** populate the grid with all 0s */
  function populateClearGrid(grid) {
    for (let c = 0; c < colsLen; c++) {
      for (let r = 0; r < rowsLen; r++) {
        grid[r][c] = 0;
      }
    }
    // console.table(grid);
    return grid;
  }

  // this.runIteration===

  // runIteration(){
  // console.log('running iteration');
  // let newBoard=makeEmptyBoard();

  // setRandomCells()
  // let handleTimeout= window.setTimeout(()=>{runIteration()},interval)
  // }
  // this.timeoutHandler===
  // let handleTimeout= window.setTimeout(()=>{runIteration()},interval)

  // this.runGame===
  function runGame() {
    setisRunning(true);
    runIteration();
  }

  // this.stopGame===
  function stopGame() {
    setisRunning(false);

    if (newTimeoutHandler == null) {
      return;
    }
    if (newTimeoutHandler) {
    setnewTimeoutHandler({newTimeoutHandler:  window.clearTimeout(newTimeoutHandler)});
     setnewTimeoutHandler({newTimeoutHandler:null}) ;
    }
  }

  // this.handleIntervalChange===

  function handleIntervalChange(event) {
    setIntervalState({ interval: event.target.value });
  }

  function clearGrid() {
    populateClearGrid(populated2dArray);
    setClear(true);
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
    setRandom(true);

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

  /** update the copyGrid and then overwrite the original with the updatedCopy
   *  set value for each cell of the cloned grid to 1 or 0
   * by referring to liveNeighborCount("LNC") of same cell in original grid
   * if LNC < 2 set cloned grid cell value = 0   * if LNC = 3 set cloned grid cell value = 1   * if LNC > 3  set cloned grid cell value = 0
   */
  function updateGrid(newGrid, prevGrid) {
    for (let r = 0; r < rowsLen; r++) {
      for (let c = 0; c < colsLen; c++) {
        let liveCnt = checkToroidalNeighbors(prevGrid, c, r);
        if (liveCnt < 2) {
          newGrid[r][c] = 0;
        }
        if (liveCnt === 3) {
          newGrid[r][c] = 1;
        }
        if (liveCnt > 3) {
          newGrid[r][c] = 0;
        }
      }
    }
    setPopulated2dArray(newGrid);
    setGen(gen + 1);
  }

  function runIteration() {
    console.log(gen);
    let [copiedArr] = copyDblArr(populated2dArray);

    let newTimeoutHandler = window.setTimeout(() => {
      runIteration()
      window.clearTimeout(newTimeoutHandler)
    }, +interval);

    updateGrid(copiedArr, populated2dArray)
  }

  function runSingleStep() {
    console.log(gen);
    let [copiedArr] = copyDblArr(populated2dArray);

    let newTimeoutHandler = window.setTimeout(() => {
      runIteration();
    }, +interval);
    updateGrid(copiedArr, populated2dArray);
    window.clearTimeout(newTimeoutHandler);
  }

  /** sideeffects */

  // useEffect(() => {
  //   setUpOnFirstLoad(randomizeGrid);

  //   setGen(0);
  // }, []);
  // useEffect(() => {
  //   if (clear) {
  //     setUpOnFirstLoad(populateClearGrid);
  //     setClear(false);
  //   }
  //   if (random) {
  //     setUpOnFirstLoad(randomizeGrid);
  //     setRandom(false);
  //   }
  //   setGen(0);
  // }, [clear, random]);

  //         let dl =[250,300,350,400,450,500,550,600,650,700,750,800,850,900,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000];
  //         let j= {};
  // j.key=null
  // dl.map((el, i)=>
  //   j.key=el,
  //   el =document.createElement("option"),
  //   el.textContent = dl[i],
  //   el.setAttribute("label", null),

  //   return(  lifeCycleRange.append(j)),
  // );
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
        <label>speed</label>
        <input
          type="range"
          step="50"
          value="500"
          min="250"
          max="2000"
          list="lifeCycleRange"
          id="lifeCyleRangeSlide"
        />
        <datalist
          id="lifeCycleRange"
          name="lifeCycleRange"
          type="datalist"
        ></datalist>
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
