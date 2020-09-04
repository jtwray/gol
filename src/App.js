import React, { useState, useEffect } from "react";
import Generations from "./Generations.js";
import Controls from "./Controls"
import Grid from "./Grid.js";
let tipURL=  'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#cite_note-1';
export default function App() {
  
  const [gen, setGen] = useState(0);
  let [populated2dArray, setPopulated2dArray] = useState();
  function updateBox(grid, c, r) {
    console.log(populated2dArray[c][r])
    grid[c][r] == 1 ? (grid[c][r] = 0) : (grid[c][r] = 1);

  }
  return (
    <>
      <section>
        <h1>The Game of Life</h1>
        <h2>
          <p>
            The Game of Life, also known simply as Life, is a cellular automaton
            devised by the British mathematician John Horton Conway in 1970.
            <span className="tooltip">[1]
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
<Controls  updateBox={updateBox} gen={gen} setGen={setGen} populated2dArray={populated2dArray} setPopulated2dArray={setPopulated2dArray}/>
      </section>

      <section>
        <Grid updateBox={updateBox} gen={gen} setGen={setGen} style={{ background: "purple" }} populated2dArray={populated2dArray} setPopulated2dArray={setPopulated2dArray}/>
      </section>
    </>
  );
}
