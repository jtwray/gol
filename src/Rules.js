import React from "react";

export default function Rules() {
  return (
    <>
      <ul className="rules">
        <li>
          If a live cell has 2 or 3 living neighbors it will stay alive for the
          next generation
        </li>
        <li>
          If a dead cell has 3 living neighbors it will come to life for the
          next generation
        </li>
        <li>
          If a live cell has 4 living neighbors it will die before the next
          generation as if by overpopulation
        </li>
        <li>
          If a live cell has 1 or fewer living neighbors it will die before the
          next generation as if by starvation
        </li>
      </ul>
    </>
  );
}
