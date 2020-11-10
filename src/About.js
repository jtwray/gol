import React from "react";

export default function Rules() {
  return (
    <>
      <ul className="about">
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970.
        <span className="tooltip">
          [1]
          <span className="tooltiptext">
            https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#cite_note-1
          </span>
        </span>
        <li>
          One interacts with the Game of Life by creating an initial
          configuration and observing how it evolves.
        </li>
        <li>
          It is a zero-player game, meaning that its evolution is determined by
          its initial state, requiring no further input.
        </li>
        <li>
          It is Turing complete and can simulate a universal constructor or any
          other Turing machine.
        </li>
        <li>
          There is are entire volumes of patterns and lifecycles that have been
          discovered discussed and iterated upon for literal human generations
          since the inception of John Conway's Game of life.
        </li>
        <li>
          Some of the my favorite examples of these patterns have been
          documented running on youtube video. I found the following rather
          intriguing and got very happily lost inside of deep and detailed
          discussions realted to their existnce, iterance and general nature.
        </li>
      </ul>
    </>
  );
}
