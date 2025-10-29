import React, { useState } from "react";
import RGBSlider from "./RGBSlider";
import ColorDisplay from "./ColorDisplay";

const ColorPicker = () => {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(100);
  const [blue, setBlue] = useState(50);

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase();

  const hexColor = rgbToHex(red, green, blue);

  return (
    <div style={styles.container}>
      <h2>Color Picker</h2>

      <RGBSlider label="Red" value={red} onChange={setRed} color="red" />
      <RGBSlider label="Green" value={green} onChange={setGreen} color="green" />
      <RGBSlider label="Blue" value={blue} onChange={setBlue} color="blue" />

      <ColorDisplay red={red} green={green} blue={blue} hexColor={hexColor} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1.5rem",
    borderRadius: "10px",
    background: "#ffffffff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
};

export default ColorPicker;
