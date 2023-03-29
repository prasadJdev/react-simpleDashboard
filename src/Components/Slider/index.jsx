import React, { memo, useCallback, useState, useEffect, useMemo } from "react";
import { render } from "react-dom";

const RangeSlider = memo(
  ({ classes, label, onChange, value, ...sliderProps }) => {
    const [sliderVal, setSliderVal] = useState(0);
    const [mouseState, setMouseState] = useState(null);

    useEffect(() => {
      setSliderVal(value);
    }, [value]);

    const changeCallback = (e) => {
      setSliderVal(e.target.value);
    };

    useEffect(() => {
      if (mouseState === "up") {
        onChange(sliderVal);
      }
    }, [mouseState]);
    console.log("RENDER");
    return (
      <div className="range-slider">
        <p>{label}</p>
        <h3>value: {sliderVal}</h3>
        <input
          type="range"
          value={sliderVal}
          {...sliderProps}
          className={`slider ${classes}`}
          id="myRange"
          onChange={changeCallback}
          onMouseDown={() => setMouseState("down")}
          onMouseUp={() => setMouseState("up")}
        />
      </div>
    );
  }
);

// export default RangeSlider;

export const Slider = () => {
  const [parentVal, setParentVal] = useState(10);

  const sliderValueChanged = useCallback((val) => {
    console.log("NEW VALUE", val);
    setParentVal(val);
  });

  const sliderProps = useMemo(
    () => ({
      min: 0,
      max: 100,
      value: parentVal,
      step: 2,
      label: "This is a reusable slider",
      onChange: (e) => sliderValueChanged(e),
    }),
    [parentVal]
  );

  return (
    <div>
      <h1>PARENT VALUE: {parentVal}</h1>
      <RangeSlider {...sliderProps} classes="additional-css-classes" />
    </div>
  );
};
