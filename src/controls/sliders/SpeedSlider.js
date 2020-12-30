import React from "react";

export default function SpeedSlider({ intervalState, setIntervalState }) {
  function handleIntervalSlideChange(event) {
    setIntervalState(event.target.value);
    console.log({ intervalState });
  }
  let min,
    stepSize = 0.25;
  let dl = ["1/4", "1/2", "0.75", "1.0", "1.25", "1.5", "1.75", "2.0"];
  let the_real_dl = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <div width="100px" className="slider">
        <form>
          <label for="lifeCycleRangeSpeedSlide">
            {" "}
            speed: {intervalState || "stopped"}x
          </label>
          <div className="sliderOptions">
            {dl.map((option, i) => (
              <option
                width="10px"
                height="10px"
                key={`${option}_${i}`}
                value={option}
              >
                {option}
              </option>
            ))}
          </div>
          <input
            type="range"
            step={stepSize}
            value={intervalState || 1.0}
            min={stepSize}
            max="2.0"
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
