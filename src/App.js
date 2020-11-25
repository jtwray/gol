import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import Rules from "./Rules";
import About from "./About";
import Controls from "./controls/Controls";
import Grid from "./Grid.js";

export default function App() {
  const [gen, setGen] = useState(0);
  const [populated2dArray, setPopulated2dArray] = useState();
  const [gridSize, setGridSize] = useState(50);

  function updateBox(grid, r, c) {
    grid[r][c] === 1 ? (grid[r][c] = 0) : (grid[r][c] = 1);
    let updatedCell = grid[r][c];
    setPopulated2dArray([
      ...populated2dArray.map((row) => {
        let newRow = [...row];
        if (row !== r) {
          return [...newRow];
        } else {
          return [...newRow, (row[c] = updatedCell)];
        }
      })
    ]);
  }

  let header = {
    display: "flex",
    color: "red"
  };

  return (
    <>
      <div style={header} className="header">
        <h1>The Game of Life</h1>
        <nav>
          <Link to="/">LIFE</Link>
          <Link to="/rules">RULES</Link>
          <Link to="/about">ABOUT</Link>
        </nav>
      </div>

      <Route exact path="/rules" component={Rules} />
      <Route exact path="/about" component={About} />

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
        <Route exact path="/">
          {" "}
          <Grid
            updateBox={updateBox}
            gen={gen}
            setGen={setGen}
            gridSize={gridSize}
            setGridSize={setGridSize}
            populated2dArray={populated2dArray}
            setPopulated2dArray={setPopulated2dArray}
          />
        </Route>
      </section>
    </>
  );
}
