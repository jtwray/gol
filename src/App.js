import React, { useState, useEffect } from "react";
import Generations from "./Generations.js";
import Controls from "./Controls";
import Grid from "./Grid.js";
import Row from "./Row.js";
let tipURL =
  "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#cite_note-1";

export default function App() {
  const [gen, setGen] = useState(0);

  let [populated2dArray, setPopulated2dArray] = useState();
  const [gridSize, setGridSize] = useState(20);

  function updateBox(grid, r, c) {
    console.log(populated2dArray[r][c], { r }, { c });
    grid[r][c] === 1 ? (grid[r][c] = 0) : (grid[r][c] = 1);
    let updatedCell = grid[r][c];

    console.log({ updatedCell }, "updatedCell", updatedCell);
    setPopulated2dArray([
      ...populated2dArray.map((row) => {
        let newRow = [...row];
        if (row != r) {
          return [...newRow];
        } else {
          return [...newRow, (row[c] = updatedCell)];
        }
      }),
    ]);
  }

  return (
    <>
      <h1>The Game of Life</h1>
      <section className="about">
        <h2>
          <p>
            The Game of Life, also known simply as Life, is a cellular automaton
            devised by the British mathematician John Horton Conway in 1970.
            <span className="tooltip">
              [1]
              <span className="tooltiptext">
                https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#cite_note-1
              </span>
            </span>
            It is a zero-player game, meaning that its evolution is determined
            by its initial state, requiring no further input. It is Turing
            complete and can simulate a universal constructor or any other
            Turing machine. One interacts with the Game of Life by creating an
            initial configuration and observing how it evolves.
          </p>
        </h2>
        <Controls
          className="section--Controls"
          updateBox={updateBox}
          gen={gen}
          setGen={setGen}
          gridSize={gridSize}
          setGridSize={setGridSize}
          populated2dArray={populated2dArray}
          setPopulated2dArray={setPopulated2dArray}
        />
      </section>

      <section className="section--Grid">
        <Grid
          updateBox={updateBox}
          gen={gen}
          setGen={setGen}
          gridSize={gridSize}
          setGridSize={setGridSize}
          populated2dArray={populated2dArray}
          setPopulated2dArray={setPopulated2dArray}
        />
      </section>
    </>
  );
}
