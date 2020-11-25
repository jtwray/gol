import React from "react";

export default function SizeSlider({ gridSize, setGridSize }) {
  function handleGridSizeChange(event) {
    setGridSize(event.target.value);
  }

  let gridSizeDL = [15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <>
      <div className="slider" width="300px">
        <form>
          <label for="gridSizeRangeSlide">
            grid size: {gridSize || "stopped"}
          </label>
          <div className="sliderOptions">
            {gridSizeDL.map((option, i) => (
              <option key={`${option}_${i}`} value={option}>
                {option}
              </option>
            ))}
          </div>
          <input
            type="range"
            step="5"
            value={gridSize || 15}
            min="15"
            max="50"
            list="gridSizeRange"
            id="gridSizeRangeSlide"
            name="gridSizeRangeSlide"
            onChange={(event) => handleGridSizeChange(event)}
          />
          <datalist
            id="gridSizeRange"
            name="gridSizeRange"
            type="datalist"
          ></datalist>
        </form>
      </div>
    </>
  );
}
