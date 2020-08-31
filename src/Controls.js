import React from "react";

export default function Controls() {
  function setRandomGrid(grid) {
    let populatedGrid = populateDblArr(grid);
    console.log({ populatedGrid });
    setPopulated2dArray(populatedGrid);
  }
  function stopGenerationCount() {
    setgenerationCount(0);
    console.log({ generationCount });
  }
  function startGenerationCount() {
    setgenerationCount(1);
    console.log({ generationCount });
  }

  
  /** populate the grid with all 0s */
  function populateClearGrid(grid) {
    for (c = 0; c < colsLen; c++) {
      for (r = 0; r < rowsLen; r++) {
        grid[r][c] = 0;
      }
    }
    return grid;
  }

  return (
    <section>
      <h2>Controls</h2>
    </section>
  );
}
