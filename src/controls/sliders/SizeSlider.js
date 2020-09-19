import React from "react";

export default function SizeSlider({ gridSize,setGridSize}) {

    function handleGridSizeChange(event) {
        setGridSize(event.target.value);
      }
    

      let gridSizeDL = [25, 50, 75, 100, 125, 150, 175];
  return (
    <>
      <div className="slider" width="300px">
        <form>
          <label for="gridSizeRangeSlide">grid size: {gridSize || "stopped"}</label>
          <div
            className="sliderBox"
            style={{
              display: "inline",
              writingMode: "vertical-lr",
              maxWidth: "100%",
            }}
          >
            {gridSizeDL.map((option, i) => (
              <option key={`${option}_${i}`} value={option}>
                {option}
              </option>
            ))}
          </div>
          <input
            type="range"
            step="25"
            value={gridSize || 25}
            min="25"
            max="175"
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
