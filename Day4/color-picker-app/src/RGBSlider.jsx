import React from "react";

const RGBSlider = ({ label, value, onChange, color }) => {
  return (
    <div style={styles.sliderContainer}>
      <label style={{ color }}>
        {label}: <strong>[{value}]</strong>
      </label>
      <input
        type="range"
        min="0"
        max="255"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ...styles.slider, accentColor: color }}
      />
    </div>
  );
};

const styles = {
  sliderContainer: {
    marginBottom: "1rem",
  },
  slider: {
    width: "100%",
  },
};

export default RGBSlider;
