import React from "react";

export default function SpeedSlider({ intervalState, setIntervalState }) {

  function handleIntervalSlideChange(event) {
    setIntervalState(event.target.value);
    console.log({ intervalState });
  }
  
  let dl = [250, 500, 750, 1000, 1250, 1500, 1750, 2000];
  return (
    <>
      <div className="slider">
        <form>
          <label for="lifeCycleSpeedSlide">speed:{intervalState || "stopped"}</label>
          <div
            className="sliderBox"
            style={{
              display: "inline",
              writingMode: "vertical-lr",
              maxWidth: "100%",
            }}
          >
            {dl.map((option, i) => (
              <option key={`${option}_${i}`} value={option}>
                {option}
              </option>
            ))}
          </div>
          <input
            type="range"
            step="250"
            value={intervalState || 500}
            min="250"
            max="2000"
            list="lifeCycleSpeedRange"
            id="lifeCyleRangeSpeedSlide"
            name="lifeCyleRangeSpeedSlide"
            onChange={(event) => handleIntervalSlideChange(event)}
          />
          <datalist
            id="lifeCycleSpeedRange"
            name="lifeCycleSpeedRange"
            type="datalist"
          ></datalist>
        </form>
      </div>
    </>
  );
}
