import React, { useState, useEffect, useRef, useCallback } from "react";
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
  populated2dArray,
  gridType
}) {
  let rowsLen = gridSize;
  let colsLen = gridSize;
  const [intervalState, setIntervalState] = useState(1);
  const [isRunning, setisRunning] = useState(false);
  const [Box, setBox] = useState(null);

  useEffect(() => {
    setPopulated2dArray(populateClearGrid(createDoubleArr(rowsLen, colsLen)));
  }, [gridSize]);

  const [rows, cols] = useCallback(
    (rowsLen) => {
      let rs = [];
      let cs = [];
      for (let r = 0; r < rowsLen; r++) {
        rs.push(0);
        cs.push(0);
      }
      return [rs, cs];
    },
    [rowsLen]
  );

  // initial gridHash  either all empty or randomized 0s & 1s
  // runs on 1st page load & if rows, cols, or gridType is updated

  const gridHash = useCallback(
    (rows, cols, gridType) => {
      let newGrid = {};
      if (gridType === "random") {
        for (let row in rows) {
          for (let col in cols) {
            let randomNum = Math.floor(Math.random() * 2);
            newGrid[`${row}_${col}`] = randomNum;
          }
        }
      }
      if (gridType === "empty") {
        for (let row in rows) {
          for (let col in cols) {
            newGrid[`${row}_${col}`] = 0;
          }
        }
      }
      return newGrid;
    },
    [rows, cols, gridType]
  );

  function checkNbrs(hash) {
    let hash2 = { ...hash };

    for (let box in hash) {
      let [row, col] = box.split("_");
      let liveNBRS;

      if (row == 0) {
        liveNBRS =
          hash[`${+row}_${+col - 1}`] +
          hash[`${+row + 1}_${+col - 1}`] +
          hash[`${+row + 1}_${+col}`] +
          hash[`${+row}_${+col + 1}`] +
          hash[`${+row + 1}_${+col + 1}`];
      } else if (row == rowsLen - 1) {
        liveNBRS =
          hash[`${+row - 1}_${+col - 1}`] +
          hash[`${+row}_${+col - 1}`] +
          hash[`${+row - 1}_${+col}`] +
          hash[`${+row - 1}_${+col + 1}`] +
          hash[`${+row}_${+col + 1}`];
      } else if (col == 0) {
        liveNBRS =
          hash[`${+row - 1}_${+col}`] +
          hash[`${+row + 1}_${+col}`] +
          hash[`${+row - 1}_${+col + 1}`] +
          hash[`${+row}_${+col + 1}`] +
          hash[`${+row + 1}_${+col + 1}`];
      } else if (col == colsLen - 1) {
        liveNBRS =
          hash[`${+row - 1}_${+col - 1}`] +
          hash[`${+row}_${+col - 1}`] +
          hash[`${+row + 1}_${+col - 1}`] +
          hash[`${+row - 1}_${+col}`] +
          hash[`${+row + 1}_${+col}`];
      } else {
        liveNBRS =
          hash[`${+row - 1}_${+col - 1}`] +
          hash[`${+row}_${+col - 1}`] +
          hash[`${+row + 1}_${+col - 1}`] +
          hash[`${+row - 1}_${+col}`] +
          hash[`${+row + 1}_${+col}`] +
          hash[`${+row - 1}_${+col + 1}`] +
          hash[`${+row}_${+col + 1}`] +
          hash[`${+row + 1}_${+col + 1}`];
      }

      if (liveNBRS == 3 || (hash[box] == 1 && liveNBRS == 2)) {
        hash2[box] = 1;
      } else {
        hash2[box] = 0;
      }
    }
    hash = { ...hash2 };
    return [hash];
  }

  const hashUpdated = checkNbrs(gridHash);

  return;
  <></>;
}
