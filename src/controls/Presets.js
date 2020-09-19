import React from "react";

export default function Presets({
  populated2dArray,
  gridSize,
  colsLen,
  rowsLen,
}) {


  function handleSelectPreset(event) {
    let chosen = presetCollection.filter(
      (preset) => preset.name == event.target.value
    );
    console.log("line70 chosen", chosen[0].data);
    console.log("line69", event.target.value);
    if (event.target.value == "Gosper Glider Gun" && gridSize < 35) {
      return alert(
        "Grid must be at least 40cells wide to create The Gosper Glider Gun"
      );
    }
    setPreset(populated2dArray, chosen[0].data);
  }
  //loop through the grid
  //loop through the preset array of objects
  // for i in preset array set i in grid to true or 1
  function setPreset(grid, preset) {
    let presetLen = preset.length;
    let midPntCol = Math.floor(colsLen / 2);
    let midPntRow = Math.floor(rowsLen / 2);
    preset.map((p) => {
      let [x, y] = p;
      return (grid[x + midPntRow][y + midPntCol] = 1);
    });
  }
  //create a button for each preset
  // clicking the button will setPopulated2dArray to the preset selected
  // calls setPreset(currentGrid,selectedPreset)
  //create a dropdown with options for each preset
  let presetCollection = [
    { name: "Clear", data: [] },
    {
      name: "Phoenix",
      data: [
        [0, 5],
        [1, 3],
        [1, 5],
        [2, 7],
        [3, 1],
        [3, 2],
        [4, 7],
        [4, 8],
        [5, 2],
        [6, 4],
        [6, 6],
        [7, 4],
      ],
    },
    {
      name: "XKCD RIP John Conway  ",
      data: [
        [2, 0],
        [3, 0],
        [4, 0],
        [2, 1],
        [4, 1],
        [2, 2],
        [4, 2],
        [3, 3],
        [0, 4],
        [2, 4],
        [3, 4],
        [4, 4],
        [1, 5],
        [3, 5],
        [5, 5],
        [3, 6],
        [6, 6],
        [2, 7],
        [4, 7],
        [2, 8],
        [4, 8],
      ],
    },
    {
      name: "Glider",
      data: [
        [1, 0],
        [2, 1],
        [2, 2],
        [1, 2],
        [0, 2],
      ],
    },
    {
      name: "Small Exploder",
      data: [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 3],
        [2, 1],
        [2, 2],
      ],
    },
    {
      name: "Exploder",
      data: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [2, 0],
        [2, 4],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
    },
    {
      name: "10 Cell Row",
      data: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [8, 0],
        [9, 0],
      ],
    },
    {
      name: "Lightweight spaceship",
      data: [
        [0, 1],
        [0, 3],
        [1, 0],
        [2, 0],
        [3, 0],
        [3, 3],
        [4, 0],
        [4, 1],
        [4, 2],
      ],
    },
    {
      name: "Tumbler",
      data: [
        [0, 3],
        [0, 4],
        [0, 5],
        [1, 0],
        [1, 1],
        [1, 5],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [5, 0],
        [5, 1],
        [5, 5],
        [6, 3],
        [6, 4],
        [6, 5],
      ],
    },
    {
      name: "Gosper Glider Gun",
      data: [
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        [8, 3],
        [8, 4],
        [9, 2],
        [9, 4],
        [10, 2],
        [10, 3],
        [16, 4],
        [16, 5],
        [16, 6],
        [17, 4],
        [18, 5],
        [22, 1],
        [22, 2],
        [23, 0],
        [23, 2],
        [24, 0],
        [24, 1],
        [24, 12],
        [24, 13],
        [25, 12],
        [25, 14],
        [26, 12],
        [34, 0],
        [34, 1],
        [35, 0],
        [35, 1],
        [35, 7],
        [35, 8],
        [35, 9],
        [36, 7],
        [37, 8],
      ],
    },
  ];
  let presetCollectionLen = presetCollection.length;

  return (
    <section>
      <h2>Presets</h2>
      <select onChange={(e) => handleSelectPreset(e)}>
        {
          presetCollection.map((preset) => (
            <option
              name={preset.name}
              key={`${preset.name}__${presetCollection.indexOf(preset)}`}
              value={preset.name}
            >
              {preset.name}
            </option>
          ))
        }
      </select>
    </section>
  );
}
