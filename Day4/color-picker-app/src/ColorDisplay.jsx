import React from "react";

const ColorDisplay = ({ red, green, blue, hexColor }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(hexColor);
    alert(`Copied ${hexColor} to clipboard!`);
  };

  return (
    <div style={styles.wrapper}>
      <p>
        <strong>RGB:</strong> ({red}, {green}, {blue})
      </p>
      <p>
        <strong>HEX:</strong> {hexColor}
      </p>
      <button onClick={copyToClipboard} style={styles.button}>
        Copy Hex
      </button>

      <div
        style={{
          ...styles.colorBox,
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        }}
      ></div>
    </div>
  );
};

const styles = {
  wrapper: {
    textAlign: "center",
  },
  colorBox: {
    width: "100%",
    height: "100px",
    borderRadius: "8px",
    marginTop: "1rem",
    border: "1px solid #ccc",
  },
  button: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ColorDisplay;
