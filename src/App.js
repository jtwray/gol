import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import Rules from "./Rules";
import About from "./About";
import Generations from "./Generations.js";
import Controls from "./controls/Controls";
import Grid from "./Grid.js";
import Row from "./Row.js";
let tipURL =
  "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#cite_note-1";

export default function App() {
  const [gen, setGen] = useState(0);

  let [populated2dArray, setPopulated2dArray] = useState();
  const [gridSize, setGridSize] = useState(50);

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
      })
    ]);
  }

  return (
    <>
      <nav>
        <Link to="/">LIFE</Link>
        <Link to="/rules">RULES</Link>
        <Link to="/about">ABOUT</Link>
      </nav>
      <Route exact path="/" component={Grid} />
      <Route exact path="/rules" component={Rules} />
      <Route exact path="/about" component={About} />
      <h1>The Game of Life</h1>
      <section className="about">
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
