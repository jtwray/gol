import React, { useState, useEffect } from "react";
import Generations from "./Generations.js";
import Grid from "./Grid.js";

export default function App() {
  const [gen, setGen] = useState(0);
  return (
    <>
      {/* <Generations gen={gen} setGen={setGen} /> */}
      <Grid gen={gen} setGen={setGen} style={{ background:"purple" }} />
    </>
  );
}
